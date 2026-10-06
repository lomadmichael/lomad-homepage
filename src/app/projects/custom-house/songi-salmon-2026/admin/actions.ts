"use server";

import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_PATH,
  ADMIN_TTL,
  PRICE_UNIT,
  canReleaseNoShow,
  codePrefix,
  hourLabel,
  isTestMode,
  isValidMobile,
  maxPartySize,
  normalizePhone,
  resizeParticipants,
  todayKst,
  validateApplication,
  type Participant,
  type Receipt,
  type RegStatus,
} from "@/lib/customhouse-config";
import { getRegistration, submitRegistration, updatePending } from "@/lib/customhouse-db";
import { checkAdminPassword, isAdmin, makeAdminToken } from "@/lib/customhouse-auth";
import { assignAndNotify, changeStatus, checkOtp, issueOtp } from "@/lib/customhouse-flow";
import { signProxy, verifyProxy } from "@/lib/customhouse-otp";

const ADMIN_PATH = ADMIN_COOKIE_PATH;

function back(tab: string, msg: string, ok: boolean, extra: Record<string, string> = {}): never {
  const qs = new URLSearchParams({ tab, msg, ok: ok ? "1" : "0", ...extra });
  redirect(`${ADMIN_PATH}?${qs.toString()}`);
}

// ── 로그인 ──
export interface LoginState {
  error?: string;
}
export async function adminLoginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const pw = ((formData.get("password") as string | null) ?? "").trim();
  if (!checkAdminPassword(pw)) return { error: "비밀번호가 올바르지 않아요." };
  const store = await cookies();
  store.set(ADMIN_COOKIE, makeAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ADMIN_COOKIE_PATH,
    maxAge: ADMIN_TTL,
  });
  redirect(ADMIN_PATH);
}

export async function adminLogoutAction(): Promise<void> {
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: ADMIN_COOKIE_PATH });
  redirect(ADMIN_PATH);
}

// ── 승인 (금액·인원 수정 포함) ──
export async function approveAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect(ADMIN_PATH);
  const id = String(formData.get("id") ?? "");
  const hour = Number(formData.get("hour"));
  const q = String(formData.get("q") ?? "");
  if (!id || !Number.isInteger(hour)) back("pending", "회차를 선택해 주세요.", false, { q });

  const amounts = formData.getAll("amount").map((v) => Math.floor(Number(String(v).replace(/\D/g, "")) || 0));
  const stores = formData.getAll("store").map((v) => String(v));
  const receipts: Receipt[] = amounts
    .map((amount, i) => ({ amount, store: stores[i] ? stores[i] : null }))
    .filter((r) => r.amount > 0);
  const extra = Math.floor(Number(String(formData.get("extra_amount") ?? "").replace(/\D/g, "")) || 0);
  if (extra > 0) receipts.push({ amount: extra, store: "데스크 추가" });
  const total = receipts.reduce((s, r) => s + r.amount, 0);
  const party = Math.floor(Number(formData.get("party_size")));

  let msg = "";
  let ok = false;
  try {
    const reg = await getRegistration(id);
    if (!reg) back("pending", "접수를 찾을 수 없어요.", false, { q });
    if (reg.status !== "pending") back("pending", `${reg.code}: 이미 처리된 접수예요.`, false, { q });
    if (!Number.isInteger(party) || party < 1) back("pending", `${reg.code}: 인원을 확인해 주세요.`, false, { q });
    if (party > maxPartySize(total)) {
      back("pending", `${reg.code}: 합계 ${total.toLocaleString()}원 → 최대 ${maxPartySize(total)}명 (${PRICE_UNIT.toLocaleString()}원당 1명)`, false, { q });
    }
    const changed =
      total !== reg.receipt_total ||
      party !== reg.party_size ||
      JSON.stringify(receipts) !== JSON.stringify(reg.receipts);
    if (changed) {
      const u = await updatePending({
        id,
        receipts,
        receiptTotal: total,
        partySize: party,
        participants: resizeParticipants(reg.participants, party),
      });
      if (!u.ok) back("pending", `${reg.code}: 수정 실패 (${u.reason})`, false, { q });
    }
    const r = await assignAndNotify({ id, hour, allowed: ["pending"] });
    msg = r.message;
    ok = r.ok;
  } catch (e) {
    unstable_rethrow(e);
    console.error("[customhouse] approve failed:", e);
    msg = "승인 처리 중 오류가 났어요.";
  }
  back("pending", msg, ok, ok ? {} : { q });
}

// ── 재배정 ──
export async function reassignAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect(ADMIN_PATH);
  const id = String(formData.get("id") ?? "");
  const hour = Number(formData.get("hour"));
  if (!id || !Number.isInteger(hour)) back("slots", "회차를 선택해 주세요.", false);
  let msg = "";
  let ok = false;
  try {
    const r = await assignAndNotify({ id, hour, allowed: ["approved", "no_show"] });
    msg = r.message;
    ok = r.ok;
  } catch (e) {
    console.error("[customhouse] reassign failed:", e);
    msg = "재배정 중 오류가 났어요.";
  }
  back("slots", msg, ok, { h: String(hour) });
}

// ── 상태 변경 (입장 / 입장 취소 / 노쇼 해제 / 취소) ──
// 승인 폼 안의 [반려] 버튼용. 함수 formAction 버튼에는 React 가 name/value 를 실어 보내지 않아
// status 를 여기서 고정한다.
export async function rejectAction(formData: FormData): Promise<void> {
  formData.set("status", "cancelled");
  return statusAction(formData);
}

export async function statusAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) redirect(ADMIN_PATH);
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as RegStatus;
  const tab = String(formData.get("tab") ?? "slots");
  const q = String(formData.get("q") ?? "");
  if (!id || !["checked_in", "no_show", "cancelled", "approved"].includes(status)) back(tab, "잘못된 요청", false);
  let msg = "";
  let ok = false;
  try {
    const reg = await getRegistration(id);
    if (!reg) back(tab, "접수를 찾을 수 없어요.", false);
    if (status === "no_show") {
      if (!reg.slot_date || reg.slot_hour == null) back(tab, "회차가 없는 접수예요.", false);
      if (!canReleaseNoShow(reg.slot_date, reg.slot_hour, new Date(), isTestMode())) {
        back(tab, `${reg.code}: 노쇼 해제는 ${hourLabel(reg.slot_hour)} 회차 시작 10분 뒤부터 가능해요.`, false);
      }
    }
    const r = await changeStatus(id, status);
    msg = `${reg.code} ${r.message}`;
    ok = r.ok;
  } catch (e) {
    unstable_rethrow(e);
    console.error("[customhouse] status failed:", e);
    msg = "처리 중 오류가 났어요.";
  }
  back(tab, msg, ok, q ? { q } : {});
}

// ── 대리 접수 (스마트폰이 어려운 손님) ──
export interface ProxyOtpState {
  ok: boolean;
  error?: string;
  token?: string;
  existingCode?: string | null;
}

export async function proxyRequestOtpAction(input: { phone: string }): Promise<ProxyOtpState> {
  if (!(await isAdmin())) return { ok: false, error: "관리자 로그인이 필요해요." };
  const phone = normalizePhone(input.phone);
  if (!isValidMobile(phone)) return { ok: false, error: "휴대폰 번호를 확인해 주세요." };
  const r = await issueOtp(phone);
  return r.ok ? { ok: true } : { ok: false, error: r.error };
}

export async function proxyVerifyAction(input: { phone: string; code: string }): Promise<ProxyOtpState> {
  if (!(await isAdmin())) return { ok: false, error: "관리자 로그인이 필요해요." };
  const phone = normalizePhone(input.phone);
  const code = (input.code || "").replace(/\D/g, "");
  if (code.length !== 6) return { ok: false, error: "인증번호 6자리를 입력해 주세요." };
  const err = await checkOtp(phone, code);
  if (err) return { ok: false, error: err };
  return { ok: true, token: signProxy(phone) };
}

export interface ProxySubmitState {
  ok: boolean;
  error?: string;
  code?: string;
}

export async function proxySubmitAction(input: {
  token: string;
  privacyConsent: boolean;
  guardianConsent: boolean;
  participants: Participant[];
  receipts: Receipt[];
}): Promise<ProxySubmitState> {
  if (!(await isAdmin())) return { ok: false, error: "관리자 로그인이 필요해요." };
  const phone = verifyProxy(input.token);
  if (!phone) return { ok: false, error: "인증이 만료됐어요(15분). 인증번호를 다시 받아 주세요." };
  if (!input.privacyConsent) return { ok: false, error: "손님의 개인정보 수집·이용 동의를 확인해 주세요." };
  const v = validateApplication(input);
  if (!v.ok) return { ok: false, error: v.error };
  try {
    const r = await submitRegistration({
      phone,
      rep_name: v.value.participants[0].name,
      participants: v.value.participants,
      party_size: v.value.partySize,
      receipts: v.value.receipts,
      receipt_total: v.value.receiptTotal,
      code_prefix: codePrefix(todayKst()),
      guardian_consent: !!input.guardianConsent,
      via: "proxy",
    });
    if (!r.ok) {
      const ex = await getRegistration(r.id);
      return { ok: false, error: `이미 참여한 번호예요${ex ? ` (접수번호 ${ex.code})` : ""}.` };
    }
    return { ok: true, code: r.code };
  } catch (e) {
    console.error("[customhouse] proxy submit failed:", e);
    return { ok: false, error: "접수 저장에 실패했어요." };
  }
}
