"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BASE_PATH,
  SESSION_COOKIE,
  SESSION_TTL,
  codePrefix,
  isTestMode,
  isValidMobile,
  normalizePhone,
  registrationGate,
  todayKst,
  validateApplication,
  type Participant,
  type Receipt,
} from "@/lib/customhouse-config";
import { findActiveByPhone, submitRegistration } from "@/lib/customhouse-db";
import { signSession } from "@/lib/customhouse-otp";
import { checkOtp, issueOtp } from "@/lib/customhouse-flow";
import { sessionPhone } from "@/lib/customhouse-auth";

export interface OtpRequestState {
  ok: boolean;
  error?: string;
  retryAfter?: number;
}

/** 인증번호 요청. purpose=apply 면 접수 시간 제한을 함께 확인한다. */
export async function requestOtpAction(input: { phone: string; purpose: "apply" | "lookup" }): Promise<OtpRequestState> {
  if (input.purpose === "apply") {
    const gate = registrationGate(new Date(), isTestMode());
    if (!gate.open) return { ok: false, error: gate.message };
  }
  const phone = normalizePhone(input.phone);
  if (!isValidMobile(phone)) return { ok: false, error: "휴대폰 번호를 다시 확인해 주세요." };
  return issueOtp(phone);
}

export interface VerifyState {
  ok: boolean;
  error?: string;
  existing?: { code: string; status: string } | null;
}

/** 인증번호 확인 → 세션 쿠키 발급. 이미 접수한 번호면 existing 반환. */
export async function verifyOtpAction(input: { phone: string; code: string }): Promise<VerifyState> {
  const phone = normalizePhone(input.phone);
  const code = (input.code || "").replace(/\D/g, "");
  if (!isValidMobile(phone) || code.length !== 6) return { ok: false, error: "인증번호 6자리를 입력해 주세요." };
  const err = await checkOtp(phone, code);
  if (err) return { ok: false, error: err };
  let existing: VerifyState["existing"] = null;
  try {
    const reg = await findActiveByPhone(phone);
    existing = reg ? { code: reg.code, status: reg.status } : null;
  } catch (e) {
    console.error("[customhouse] findActive failed:", e);
    return { ok: false, error: "잠시 후 다시 시도해 주세요." };
  }
  const store = await cookies();
  store.set(SESSION_COOKIE, signSession(phone, SESSION_TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: BASE_PATH,
    maxAge: SESSION_TTL,
  });
  return { ok: true, existing };
}

export interface SubmitState {
  ok: boolean;
  code?: string;
  duplicate?: boolean;
  error?: string;
}

/** 셀프 접수 제출. 휴대폰 번호는 세션 쿠키(인증 완료)에서만 가져온다. */
export async function submitApplicationAction(input: {
  privacyConsent: boolean;
  guardianConsent: boolean;
  participants: Participant[];
  receipts: Receipt[];
}): Promise<SubmitState> {
  const phone = await sessionPhone();
  if (!phone) return { ok: false, error: "휴대폰 인증이 만료됐어요. 처음부터 다시 해 주세요." };
  const gate = registrationGate(new Date(), isTestMode());
  if (!gate.open) return { ok: false, error: gate.message };
  if (!input.privacyConsent) return { ok: false, error: "개인정보 수집·이용에 동의해 주세요." };
  const v = validateApplication(input);
  if (!v.ok) return { ok: false, error: v.error };
  try {
    const r = await submitRegistration({
      phone,
      rep_name: v.value.participants[0].name,
      participants: v.value.participants,
      party_size: v.value.partySize,
      receipts: v.value.receipts,
      receipt_total: v.value.receiptTotal,
      code_prefix: codePrefix(todayKst()),
      guardian_consent: !!input.guardianConsent,
      via: "self",
    });
    if (!r.ok) return { ok: false, duplicate: true, error: "이미 참여하셨어요." };
    return { ok: true, code: r.code };
  } catch (e) {
    console.error("[customhouse] submit failed:", e);
    return { ok: false, error: "접수에 실패했어요. 잠시 후 다시 시도하거나 데스크에 문의해 주세요." };
  }
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete({ name: SESSION_COOKIE, path: BASE_PATH });
  redirect(BASE_PATH);
}
