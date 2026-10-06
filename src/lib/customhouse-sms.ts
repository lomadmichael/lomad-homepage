import "server-only";
import { createHmac, randomBytes } from "crypto";
import { BASE_PATH, isTestMode, kstIso, reminderTime } from "@/lib/customhouse-config";
import { otpText, reminderText, ticketText } from "@/lib/customhouse-messages";
import { signTicket } from "@/lib/customhouse-otp";

// SOLAPI 직접 호출 (일반 문자 + 그룹 예약발송).
// - CUSTOMHOUSE_TEST_MODE=1 또는 SOLAPI_TEST_MODE=true 면 실제 호출 없이 콘솔 로그만(드라이런).
// - env 값은 반드시 trim (끝 개행이 섞이면 HMAC 인증이 깨져 전부 실패).
// - 예약발송은 그룹 플로우만 가능: POST groups → PUT messages → POST schedule(+09:00).
//   취소는 DELETE groups/{gid}/schedule. 한 그룹엔 수신자 1명만 넣는다(중복 수신번호 실패 방지).

const API = "https://api.solapi.com";

function env(name: string): string {
  return (process.env[name] || "").trim();
}
function dryRun(): boolean {
  return isTestMode() || env("SOLAPI_TEST_MODE") === "true";
}

export interface SmsResult {
  ok: boolean;
  dryRun?: boolean;
  groupId?: string;
  error?: string;
}

function authHeader(): string {
  const key = env("SOLAPI_API_KEY");
  const secret = env("SOLAPI_API_SECRET");
  const date = new Date().toISOString();
  const salt = randomBytes(16).toString("hex");
  const signature = createHmac("sha256", secret).update(date + salt).digest("hex");
  return `HMAC-SHA256 apiKey=${key}, date=${date}, salt=${salt}, signature=${signature}`;
}

function credsError(): string | null {
  if (!env("SOLAPI_API_KEY") || !env("SOLAPI_API_SECRET")) return "SOLAPI 키 미설정";
  if (!sender()) return "SOLAPI_SENDER 미설정";
  return null;
}
function sender(): string {
  return env("SOLAPI_SENDER").replace(/\D/g, "");
}

async function call(method: string, path: string, body?: unknown): Promise<unknown> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Authorization: authHeader() },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  let data: unknown = text;
  try {
    data = JSON.parse(text);
  } catch {}
  if (!res.ok) throw new Error(`SOLAPI ${method} ${path} → ${res.status} ${typeof data === "string" ? data : JSON.stringify(data)}`);
  return data;
}

/** 즉시 발송 1건. 길이에 따라 SOLAPI 가 SMS/LMS 자동 판별. */
async function sendNow(to: string, text: string, tag: string): Promise<SmsResult> {
  const phone = to.replace(/\D/g, "");
  if (dryRun()) {
    console.log(`[customhouse-sms DRY-RUN] ${tag} → ${phone}\n${text}`);
    return { ok: true, dryRun: true };
  }
  const ce = credsError();
  if (ce) {
    console.error(`[customhouse-sms] ${tag} skipped: ${ce}`);
    return { ok: false, error: ce };
  }
  try {
    await call("POST", "/messages/v4/send", { message: { to: phone, from: sender(), text } });
    return { ok: true };
  } catch (e) {
    console.error(`[customhouse-sms] ${tag} failed:`, e);
    return { ok: false, error: String(e) };
  }
}

export function ticketLink(regId: string): string {
  const site = (env("CUSTOMHOUSE_SITE_URL") || "https://lomadcoop.com").replace(/\/$/, "");
  return `${site}${BASE_PATH}/ticket?t=${signTicket(regId)}`;
}

/** ① 인증번호 */
export async function sendOtpSms(phone: string, code: string): Promise<SmsResult> {
  return sendNow(phone, otpText(code), "OTP");
}

/** ② 회차권 */
export async function sendTicketSms(p: {
  phone: string;
  regId: string;
  repName: string;
  date: string;
  hour: number;
  partySize: number;
  code: string;
}): Promise<SmsResult> {
  const text = ticketText({
    repName: p.repName,
    date: p.date,
    hour: p.hour,
    partySize: p.partySize,
    code: p.code,
    link: ticketLink(p.regId),
  });
  return sendNow(p.phone, text, `TICKET ${p.code}`);
}

/**
 * ③ 10분 전 알림 예약. 승인 시각이 회차 시작 −12분 이후면 생략(null 반환).
 * 수신자 1명짜리 그룹을 만들어 예약한다.
 */
export async function scheduleReminderSms(p: {
  phone: string;
  regId: string;
  date: string;
  hour: number;
  now?: Date;
}): Promise<SmsResult | null> {
  const at = reminderTime(p.date, p.hour, p.now ?? new Date());
  if (!at) return null;
  const phone = p.phone.replace(/\D/g, "");
  const text = reminderText({ hour: p.hour, link: ticketLink(p.regId) });
  const scheduledDate = kstIso(at);
  if (dryRun()) {
    const gid = `DRYRUN-${randomBytes(6).toString("hex")}`;
    console.log(`[customhouse-sms DRY-RUN] REMINDER group=${gid} at ${scheduledDate} → ${phone}\n${text}`);
    return { ok: true, dryRun: true, groupId: gid };
  }
  const ce = credsError();
  if (ce) {
    console.error(`[customhouse-sms] REMINDER skipped: ${ce}`);
    return { ok: false, error: ce };
  }
  let gid: string | undefined;
  try {
    const g = (await call("POST", "/messages/v4/groups", {})) as { groupId?: string; _id?: string };
    gid = g.groupId || g._id;
    if (!gid) throw new Error("groupId 없음");
    await call("PUT", `/messages/v4/groups/${gid}/messages`, {
      messages: [{ to: phone, from: sender(), text }],
    });
    await call("POST", `/messages/v4/groups/${gid}/schedule`, { scheduledDate });
    return { ok: true, groupId: gid };
  } catch (e) {
    console.error(`[customhouse-sms] REMINDER failed (group ${gid ?? "-"}):`, e);
    return { ok: false, groupId: gid, error: String(e) };
  }
}

/** 예약 알림 취소 (회차 변경·취소·노쇼). 이미 발송됐거나 없는 그룹이면 실패해도 무시. */
export async function cancelReminderSms(groupId: string | null | undefined): Promise<SmsResult> {
  if (!groupId) return { ok: true };
  if (groupId.startsWith("DRYRUN-") || dryRun()) {
    console.log(`[customhouse-sms DRY-RUN] CANCEL REMINDER group=${groupId}`);
    return { ok: true, dryRun: true };
  }
  const ce = credsError();
  if (ce) return { ok: false, error: ce };
  try {
    await call("DELETE", `/messages/v4/groups/${groupId}/schedule`);
    return { ok: true };
  } catch (e) {
    console.warn(`[customhouse-sms] cancel reminder ${groupId} failed (무시):`, e);
    return { ok: false, error: String(e) };
  }
}
