"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { purgeRrn } from "@/lib/ainb-consent-db";
import { makeToken, verifyAdmin, checkPassword, ADMIN_COOKIE } from "./auth";

export interface AdminLoginState {
  error?: string;
}

export async function adminLogin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const pw = ((formData.get("password") as string | null) ?? "").trim();
  if (!checkPassword(pw)) return { error: "비밀번호가 올바르지 않습니다." };
  const store = await cookies();
  store.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/projects/ai-naeilbakkum/consent",
    maxAge: 60 * 60 * 8,
  });
  revalidatePath("/projects/ai-naeilbakkum/consent/admin");
  return {};
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  revalidatePath("/projects/ai-naeilbakkum/consent/admin");
}

export interface PurgeState {
  message?: string;
}

/** 보험 가입 완료 후 주민등록번호 전건 파기 */
export async function purgeAllRrn(_prev: PurgeState, formData: FormData): Promise<PurgeState> {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) return { message: "권한이 없습니다." };
  if ((formData.get("confirm") as string | null) !== "파기") {
    return { message: '확인란에 "파기" 를 정확히 입력해 주세요.' };
  }
  try {
    const n = await purgeRrn();
    revalidatePath("/projects/ai-naeilbakkum/consent/admin");
    return { message: `주민등록번호 ${n}건을 파기했습니다.` };
  } catch (e) {
    console.error("[ainb-consent] purge failed:", e);
    return { message: "파기 중 오류가 발생했습니다." };
  }
}
