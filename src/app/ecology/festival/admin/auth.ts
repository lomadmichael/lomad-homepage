import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

// "use server" 파일과 분리: verifyAdmin/makeToken 은 동기 헬퍼라
// 서버 액션 모듈(actions.ts)에 둘 수 없다(모든 export가 async여야 함).
// 비밀번호: FESTECO_ADMIN_PASSWORD, 없으면 정규 생태체험 관리자 비밀번호(ECOLOGY_ADMIN_PASSWORD).
// 쿠키는 정규 관리자(ecology_admin, /ecology/admin)와 분리.

const TTL = 60 * 60 * 8; // 8시간

export function adminPassword(): string {
  return process.env.FESTECO_ADMIN_PASSWORD || process.env.ECOLOGY_ADMIN_PASSWORD || "";
}

function sign(exp: number): string {
  return createHmac("sha256", adminPassword()).update(`festeco-admin.${exp}`).digest("hex");
}

export function makeToken(): string {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  return `${exp}.${sign(exp)}`;
}

export function verifyAdmin(token: string | undefined): boolean {
  if (!token || !adminPassword()) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig ?? ""),
    b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const ADMIN_COOKIE = "festeco_admin";
export const ADMIN_COOKIE_PATH = "/ecology/festival/admin";
export const ADMIN_TTL = TTL;
