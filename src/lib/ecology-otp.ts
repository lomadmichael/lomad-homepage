import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "crypto";

const SECRET = () => process.env.ECOLOGY_OTP_SECRET || process.env.FESTIVAL_OTP_SECRET || "";

export function hashOtp(phone: string, code: string): string {
  return createHmac("sha256", SECRET()).update(`${phone}:${code}`).digest("hex");
}
export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}
export function signSession(phone: string, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = `${phone}.${exp}`;
  return `${body}.${createHmac("sha256", SECRET()).update(body).digest("hex")}`;
}
export function verifySession(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [phone, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  const expected = createHmac("sha256", SECRET()).update(`${phone}.${exp}`).digest("hex");
  const a = Buffer.from(sig),
    b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return phone;
}
