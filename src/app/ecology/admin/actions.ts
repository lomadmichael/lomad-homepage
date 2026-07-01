"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { makeToken, ADMIN_COOKIE, ADMIN_COOKIE_PATH, ADMIN_TTL } from "./auth";

export interface AdminLoginState {
  error?: string;
}

export async function adminLogin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const pw = (formData.get("password") as string | null) ?? "";
  const expected = process.env.ECOLOGY_ADMIN_PASSWORD || "";
  if (!expected || pw !== expected) return { error: "비밀번호가 올바르지 않습니다." };
  const store = await cookies();
  store.set(ADMIN_COOKIE, makeToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ADMIN_COOKIE_PATH,
    maxAge: ADMIN_TTL,
  });
  redirect("/ecology/admin");
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: ADMIN_COOKIE_PATH });
  redirect("/ecology/admin");
}
