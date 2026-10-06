import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "crypto";

// ecology-otp 와 같은 방식(HMAC 해시 + 서명 토큰). 비밀키는 별도 env 우선, 없으면 기존 키 재사용.
const SECRET = () =>
  (
    process.env.CUSTOMHOUSE_OTP_SECRET ||
    process.env.ECOLOGY_OTP_SECRET ||
    process.env.FESTIVAL_OTP_SECRET ||
    ""
  ).trim();

function hmac(body: string): string {
  const secret = SECRET();
  if (!secret) throw new Error("CUSTOMHOUSE_OTP_SECRET 미설정");
  return createHmac("sha256", secret).update(body).digest("hex");
}
function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function hashOtp(phone: string, code: string): string {
  return hmac(`ch-otp:${phone}:${code}`);
}
export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/** 손님 세션(휴대폰 인증 완료) 토큰: phone.exp.sig */
export function signSession(phone: string, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = `${phone}.${exp}`;
  return `${body}.${hmac(`ch-session:${body}`)}`;
}
export function verifySession(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [phone, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!/^\d{10,11}$/.test(phone)) return null;
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  try {
    return safeEqual(sig, hmac(`ch-session:${phone}.${exp}`)) ? phone : null;
  } catch {
    return null;
  }
}

/** 대리 접수용 단기 토큰 (관리자 화면에서 OTP 확인 → 제출까지). */
export function signProxy(phone: string): string {
  const exp = Math.floor(Date.now() / 1000) + 15 * 60;
  const body = `${phone}.${exp}`;
  return `${body}.${hmac(`ch-proxy:${body}`)}`;
}
export function verifyProxy(token: string | undefined | null): string | null {
  if (!token) return null;
  const [phone, expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!phone || !sig || !Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  try {
    return safeEqual(sig, hmac(`ch-proxy:${phone}.${exp}`)) ? phone : null;
  } catch {
    return null;
  }
}

/** 문자 링크용 회차권 토큰: regId.exp.sig(32hex). 2026-10-26 KST 까지 유효(파기 이후 무의미). */
const TICKET_EXP = Math.floor(new Date("2026-10-26T00:00:00+09:00").getTime() / 1000);
export function signTicket(regId: string): string {
  const exp = Math.max(TICKET_EXP, Math.floor(Date.now() / 1000) + 3 * 86400);
  const body = `${regId}.${exp}`;
  return `${body}.${hmac(`ch-ticket:${body}`).slice(0, 32)}`;
}
export function verifyTicket(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [id, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  try {
    return safeEqual(sig, hmac(`ch-ticket:${id}.${exp}`).slice(0, 32)) ? id : null;
  } catch {
    return null;
  }
}
