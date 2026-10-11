"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { otpSet, otpVerify, cancelRegistration, lookupByPhone } from "@/lib/festeco-db";
import { generateOtp, hashOtp, signSession, verifySession } from "@/lib/ecology-otp";
import { sendOtpSms, festecoSmsEnabled } from "@/lib/festeco-sms";
import { findSession } from "@/lib/festeco-config";
import { FESTECO_COOKIE, FESTECO_COOKIE_PATH } from "./session";

// 정규 /ecology/my(쿠키 ecology_my, path /ecology)와 이름·경로 모두 분리.
const SESSION_TTL = 1800;
const OTP_TTL = 300;

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

export interface OtpState {
  step: "phone" | "verify" | "error";
  phone?: string;
  message?: string;
  /** 문자 발송 비활성 상태 안내 (FESTECO_SMS_ENABLED≠true) */
  devNotice?: string;
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
    console.error("[festeco] requestOtp failed:", e);
    return { step: "error", message: "인증번호 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
  return {
    step: "verify",
    phone,
    devNotice: festecoSmsEnabled()
      ? undefined
      : "문자 발송 비활성 상태입니다 — 인증번호가 문자로 발송되지 않았습니다(서버 로그에만 기록).",
  };
}

export async function verifyOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  const code = ((formData.get("code") as string | null) ?? "").replace(/\D/g, "");
  if (!phone || !code) return { step: "verify", phone, message: "인증번호를 입력해 주세요." };
  let ok = false;
  try {
    ok = await otpVerify(phone, hashOtp(phone, code));
  } catch (e) {
    console.error("[festeco] verifyOtp failed:", e);
  }
  if (!ok) return { step: "verify", phone, message: "인증번호가 올바르지 않거나 만료되었습니다." };
  const store = await cookies();
  store.set(FESTECO_COOKIE, signSession(phone, SESSION_TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: FESTECO_COOKIE_PATH,
    maxAge: SESSION_TTL,
  });
  redirect("/ecology/festival/my");
}

export async function cancelMyRegistration(formData: FormData): Promise<void> {
  const regId = (formData.get("reg_id") as string | null) ?? "";
  const store = await cookies();
  const phone = verifySession(store.get(FESTECO_COOKIE)?.value);
  if (!phone || !regId) return;

  try {
    const regs = await lookupByPhone(phone);
    const reg = regs.find((r) => r.id === regId);
    if (!reg || reg.status !== "confirmed") return; // 소유권·상태 확인

    // 회차 시작 이후에는 본인 취소 불가 (서버 시각 기준)
    const s = findSession(reg.session_key);
    if (!s || Date.now() >= new Date(s.startsAt).getTime()) return;

    // RPC 가 phone 일치를 재확인하고, 취소분은 잔여석에 자동 반영
    await cancelRegistration(regId, phone);
  } catch (e) {
    console.error("[festeco] cancelMyRegistration failed:", e);
  }
  revalidatePath("/ecology/festival/my");
  revalidatePath("/ecology/festival");
}

export async function logoutMy(): Promise<void> {
  const store = await cookies();
  store.delete({ name: FESTECO_COOKIE, path: FESTECO_COOKIE_PATH });
  redirect("/ecology/festival/my");
}
