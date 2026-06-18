import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "crypto";

/**
 * OTP 코드 해싱 (pepper = FESTIVAL_OTP_SECRET).
 * 평문 코드는 DB에 저장하지 않고 해시만 저장한다.
 */
export function hashOtp(phone: string, code: string): string {
  const secret = process.env.FESTIVAL_OTP_SECRET || "";
  return createHmac("sha256", secret).update(`${phone}:${code}`).digest("hex");
}

/** 6자리 숫자 OTP 생성. */
export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/**
 * 본인 조회 세션 쿠키 값 서명/검증 (인증된 연락처를 담는 단기 토큰).
 * 형식: `${phone}.${exp}.${hmac}`
 */
export function signSession(phone: string, ttlSeconds: number): string {
  const secret = process.env.FESTIVAL_OTP_SECRET || "";
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = `${phone}.${exp}`;
  const sig = createHmac("sha256", secret).update(body).digest("hex");
  return `${body}.${sig}`;
}

/** 세션 쿠키 검증 → 유효하면 phone, 아니면 null. */
export function verifySession(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [phone, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  const secret = process.env.FESTIVAL_OTP_SECRET || "";
  const expected = createHmac("sha256", secret).update(`${phone}.${exp}`).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return phone;
}
