import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_TTL, SESSION_COOKIE } from "@/lib/customhouse-config";
import { verifySession } from "@/lib/customhouse-otp";

// 관리자: 비밀번호(CUSTOMHOUSE_ADMIN_PASSWORD) → 서명 쿠키. ecology admin 과 같은 방식, 쿠키·env 분리.

function adminSecret(): string {
  return (process.env.CUSTOMHOUSE_ADMIN_PASSWORD || "").trim();
}
function sign(exp: number): string {
  return createHmac("sha256", `ch-admin:${adminSecret()}`).update(`admin.${exp}`).digest("hex");
}

export function checkAdminPassword(pw: string): boolean {
  const expected = adminSecret();
  if (!expected) return false;
  const a = Buffer.from(pw),
    b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeAdminToken(): string {
  const exp = Math.floor(Date.now() / 1000) + ADMIN_TTL;
  return `${exp}.${sign(exp)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !adminSecret()) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const a = Buffer.from(sig ?? ""),
    b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}

/** 손님 세션 쿠키의 인증된 휴대폰 번호 (없으면 null). */
export async function sessionPhone(): Promise<string | null> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
