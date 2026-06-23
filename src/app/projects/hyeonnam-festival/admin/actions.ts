"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cancelSignup, cancelCamping } from "@/lib/festival-db";
import { signSession, verifySession } from "@/lib/festival-otp";
import { sendPromotionSms, sendCampingPromotionSms } from "@/lib/festival-sms";

const COOKIE = "festival_admin";
const COOKIE_PATH = "/projects/hyeonnam-festival/admin";
const TTL = 21600; // 6시간

export interface AdminLoginState {
  error?: string;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(COOKIE)?.value) === "admin";
}

export async function adminLogin(_prev: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const password = (formData.get("password") as string | null) ?? "";
  const expected = process.env.FESTIVAL_ADMIN_PASSWORD || "";
  if (!expected || password !== expected) {
    return { error: "비밀번호가 올바르지 않습니다." };
  }
  const store = await cookies();
  store.set(COOKIE, signSession("admin", TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: TTL,
  });
  redirect("/projects/hyeonnam-festival/admin");
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete({ name: COOKIE, path: COOKIE_PATH });
  redirect("/projects/hyeonnam-festival/admin");
}

/** 관리자 강제 취소 → 대기 1번 자동 승급 + 승급자 SMS. */
export async function adminCancel(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const signupId = (formData.get("signup_id") as string | null) ?? "";
  if (!signupId) return;
  try {
    const res = await cancelSignup(signupId);
    if (res.promoted) {
      await sendPromotionSms({
        phone: res.promoted.phone,
        name: res.promoted.name,
        key: res.promoted.key,
        slot: res.promoted.slot,
      });
    }
  } catch (e) {
    console.error("[festival] adminCancel failed:", e);
  }
  revalidatePath("/projects/hyeonnam-festival/admin");
}

/** 관리자 캠핑 취소 (등록 단위). 캠핑은 자동 승급 없음 — 수동 관리. */
export async function adminCancelCamping(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const regId = (formData.get("reg_id") as string | null) ?? "";
  if (!regId) return;
  try {
    const res = await cancelCamping(regId);
    if (res.promoted) await sendCampingPromotionSms(res.promoted);
  } catch (e) {
    console.error("[festival] adminCancelCamping failed:", e);
  }
  revalidatePath("/projects/hyeonnam-festival/admin");
}
