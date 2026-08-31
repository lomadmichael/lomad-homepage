import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

const TTL = 60 * 60 * 8; // 8시간

/** AINB_ADMIN_PASSWORD 미설정 시 생태체험 관리자 비밀번호를 공용으로 쓴다. */
function secret(): string {
  return process.env.AINB_ADMIN_PASSWORD || process.env.ECOLOGY_ADMIN_PASSWORD || "";
}

function sign(exp: number): string {
  return createHmac("sha256", secret()).update(`ainb.${exp}`).digest("hex");
}

export function makeToken(): string {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  return `${exp}.${sign(exp)}`;
}

export function verifyAdmin(token: string | undefined): boolean {
  if (!secret()) return false;
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const a = Buffer.from(sig ?? "");
  const b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(input: string): boolean {
  const s = secret();
  if (!s) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(s);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const ADMIN_COOKIE = "ainb_consent_admin";
