"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { otpSet, otpVerify, cancelRegistration, lookupByPhone } from "@/lib/ecology-db";
import { generateOtp, hashOtp, signSession, verifySession } from "@/lib/ecology-otp";
import { sendOtpSms, sendPromotionSms } from "@/lib/ecology-sms";

const COOKIE = "ecology_my";
const COOKIE_PATH = "/ecology";
const SESSION_TTL = 1800;
const OTP_TTL = 300;

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

export interface OtpState {
  step: "phone" | "verify" | "error";
  phone?: string;
  message?: string;
}

export async function requestOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  if (phone.length < 10 || phone.length > 11) {
    return { step: "error", message: "유효한 연락처를 입력해 주세요." };
  }
  const code = generateOtp();
  try {
    await otpSet(phone, hashOtp(phone, code), OTP_TTL);
    await sendOtpSms(phone, code);
  } catch (e) {
    console.error("[ecology] requestOtp failed:", e);
    return { step: "error", message: "인증번호 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
  return { step: "verify", phone };
}

export async function verifyOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  const code = ((formData.get("code") as string | null) ?? "").replace(/\D/g, "");
  if (!phone || !code) return { step: "verify", phone, message: "인증번호를 입력해 주세요." };
  let ok = false;
  try {
    ok = await otpVerify(phone, hashOtp(phone, code));
  } catch (e) {
    console.error("[ecology] verifyOtp failed:", e);
  }
  if (!ok) return { step: "verify", phone, message: "인증번호가 올바르지 않거나 만료되었습니다." };
  const store = await cookies();
  store.set(COOKIE, signSession(phone, SESSION_TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: SESSION_TTL,
  });
  redirect("/ecology/my");
}

export async function cancelMyRegistration(formData: FormData): Promise<void> {
  const regId = (formData.get("reg_id") as string | null) ?? "";
  const store = await cookies();
  const phone = verifySession(store.get(COOKIE)?.value);
  if (!phone || !regId) return;

  const regs = await lookupByPhone(phone);
  if (!regs.some((r) => r.id === regId)) return; // 소유권 확인

  try {
    const res = await cancelRegistration(regId);
    for (const p of res.promoted) {
      await sendPromotionSms({ phone: p.phone, name: p.name, sessionKey: p.session_key });
    }
  } catch (e) {
    console.error("[ecology] cancelMyRegistration failed:", e);
  }
  revalidatePath("/ecology/my");
}

export async function logoutMy(): Promise<void> {
  const store = await cookies();
  store.delete({ name: COOKIE, path: COOKIE_PATH });
  redirect("/ecology/my");
}
