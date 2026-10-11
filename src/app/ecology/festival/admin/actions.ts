"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  makeToken,
  verifyAdmin,
  adminPassword,
  ADMIN_COOKIE,
  ADMIN_COOKIE_PATH,
  ADMIN_TTL,
} from "./auth";
import { setSessionOpen, setSessionCapacity } from "@/lib/festeco-db";
import { SESSIONS } from "@/lib/festeco-config";

export interface AdminLoginState {
  error?: string;
}

const VALID_SESSIONS = new Set(SESSIONS.map((s) => s.key));

export async function adminLogin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const pw = (formData.get("password") as string | null) ?? "";
  const expected = adminPassword();
  if (!expected || pw !== expected) return { error: "비밀번호가 올바르지 않습니다." };
  const store = await cookies();
  store.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ADMIN_COOKIE_PATH,
    maxAge: ADMIN_TTL,
  });
  redirect("/ecology/festival/admin");
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: ADMIN_COOKIE_PATH });
  redirect("/ecology/festival/admin");
}

/** 회차 오픈/마감 토글 (admin 전용). */
export async function setSessionOpenAction(formData: FormData): Promise<void> {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) return;
  const sessionKey = (formData.get("session_key") as string | null) ?? "";
  const open = (formData.get("open") as string | null) === "true";
  if (!VALID_SESSIONS.has(sessionKey)) return;
  try {
    await setSessionOpen(sessionKey, open);
  } catch (e) {
    console.error("[festeco] setSessionOpen failed:", e);
  }
  revalidatePath("/ecology/festival/admin");
  revalidatePath("/ecology/festival");
  revalidatePath("/ecology/festival/apply");
}

/** 회차 사전예약 정원 설정 (admin 전용). */
export async function setCapacityAction(formData: FormData): Promise<void> {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) return;
  const sessionKey = (formData.get("session_key") as string | null) ?? "";
  const cap = Number(formData.get("capacity"));
  if (!VALID_SESSIONS.has(sessionKey) || !Number.isFinite(cap) || cap < 0 || cap > 999) return;
  try {
    await setSessionCapacity(sessionKey, Math.floor(cap));
  } catch (e) {
    console.error("[festeco] setCapacity failed:", e);
  }
  revalidatePath("/ecology/festival/admin");
  revalidatePath("/ecology/festival");
  revalidatePath("/ecology/festival/apply");
}
