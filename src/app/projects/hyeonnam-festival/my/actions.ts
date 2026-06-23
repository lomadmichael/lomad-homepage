"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { otpSet, otpVerify, cancelSignup, changeCamping, addSignup, lookupByPhone } from "@/lib/festival-db";
import { buildCapacities, getExperience } from "@/lib/festival-experiences";
import { generateOtp, hashOtp, signSession, verifySession } from "@/lib/festival-otp";
import { sendOtpSms, sendPromotionSms, sendCampingPromotionSms } from "@/lib/festival-sms";

const COOKIE = "festival_my";
const COOKIE_PATH = "/projects/hyeonnam-festival";
const SESSION_TTL = 1800; // 30분
const OTP_TTL = 300; // 5분

export interface OtpState {
  step: "phone" | "verify" | "error";
  phone?: string;
  message?: string;
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

/** 1단계: 연락처로 인증코드 발송. */
export async function requestOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  if (phone.length < 10 || phone.length > 11) {
    return { step: "error", message: "유효한 연락처를 입력해 주세요." };
  }
  // 신청 내역이 없으면 굳이 발송하지 않음(존재 노출 방지 위해 메시지는 동일하게 유지 가능하나, UX 우선)
  const code = generateOtp();
  try {
    await otpSet(phone, hashOtp(phone, code), OTP_TTL);
    await sendOtpSms(phone, code);
  } catch (e) {
    console.error("[festival] requestOtp failed:", e);
    return { step: "error", message: "인증번호 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
  return { step: "verify", phone };
}

/** 2단계: 인증코드 확인 → 세션 쿠키 발급 후 조회 화면으로. */
export async function verifyOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  const code = ((formData.get("code") as string | null) ?? "").replace(/\D/g, "");
  if (!phone || !code) {
    return { step: "verify", phone, message: "인증번호를 입력해 주세요." };
  }
  let ok = false;
  try {
    ok = await otpVerify(phone, hashOtp(phone, code));
  } catch (e) {
    console.error("[festival] verifyOtp failed:", e);
  }
  if (!ok) {
    return { step: "verify", phone, message: "인증번호가 올바르지 않거나 만료되었습니다." };
  }
  const store = await cookies();
  store.set(COOKIE, signSession(phone, SESSION_TTL), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: SESSION_TTL,
  });
  redirect("/projects/hyeonnam-festival/my");
}

/** 인증된 본인의 체험 신청 취소 → 대기 1번 자동 승급 + 승급자 SMS. */
export async function cancelMySignup(formData: FormData): Promise<void> {
  const signupId = (formData.get("signup_id") as string | null) ?? "";
  const store = await cookies();
  const phone = verifySession(store.get(COOKIE)?.value);
  if (!phone || !signupId) return;

  // 소유권 확인: 이 연락처의 신청에 속한 signup 인지 검증
  const regs = await lookupByPhone(phone);
  const owns = regs.some((r) => r.participants.some((p) => p.signups.some((s) => s.id === signupId)));
  if (!owns) return;

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
    console.error("[festival] cancelMySignup failed:", e);
  }
  revalidatePath("/projects/hyeonnam-festival/my");
}

/** 인증된 본인의 캠핑 변경/취소 (신청안함="" / 데크 / 노지). 정원 재판정. */
export async function changeMyCamping(formData: FormData): Promise<void> {
  const regId = (formData.get("reg_id") as string | null) ?? "";
  const camping = ((formData.get("camping") as string | null) ?? "").trim();
  const store = await cookies();
  const phone = verifySession(store.get(COOKIE)?.value);
  if (!phone || !regId) return;
  if (camping !== "" && camping !== "deck" && camping !== "noji") return;

  // 소유권 확인: 이 연락처의 신청인지 검증
  const regs = await lookupByPhone(phone);
  if (!regs.some((r) => r.id === regId)) return;

  try {
    const res = await changeCamping(regId, camping, buildCapacities());
    if (res.promoted) await sendCampingPromotionSms(res.promoted);
  } catch (e) {
    console.error("[festival] changeMyCamping failed:", e);
  }
  revalidatePath("/projects/hyeonnam-festival/my");
}

/** 인증된 본인의 체험 추가 신청 (정원 판정·연령·1인1종목·중복 검증). */
export async function addMySignup(formData: FormData): Promise<void> {
  const participantId = (formData.get("participant_id") as string | null) ?? "";
  const exp = ((formData.get("exp") as string | null) ?? "").trim();
  if (!participantId || !exp) return;
  const [key, slotRaw] = exp.split("|");
  const slot = slotRaw ?? "";

  const store = await cookies();
  const phone = verifySession(store.get(COOKIE)?.value);
  if (!phone) return;

  // 소유권 + 참가자 정보(나이·기존 체험) 확인
  const regs = await lookupByPhone(phone);
  let age = -1;
  let signups: { experience_key: string; time_slot: string | null }[] = [];
  let owns = false;
  for (const r of regs) {
    for (const p of r.participants) {
      if (p.id === participantId) {
        owns = true;
        age = p.age;
        signups = p.signups;
      }
    }
  }
  if (!owns) return;

  const e = getExperience(key);
  if (!e) return;
  if (e.slots && !slot) return; // 타임 필수(볼더링)
  if (typeof e.minAge === "number" && age < e.minAge) return; // 연령 제한
  // 중복(활성 동일 체험)
  if (signups.some((s) => s.experience_key === key && (s.time_slot ?? "") === slot)) return;
  // 1인 1종목(배타 그룹) — 같은 그룹 이미 있으면 불가
  if (e.exclusiveGroup && signups.some((s) => getExperience(s.experience_key)?.exclusiveGroup === e.exclusiveGroup)) return;

  const caps = buildCapacities();
  const capKey = slot ? `${key}|${slot}` : key;
  const cap = caps[capKey] ?? 0;

  try {
    await addSignup(participantId, key, slot, cap);
  } catch (err) {
    console.error("[festival] addMySignup failed:", err);
  }
  revalidatePath("/projects/hyeonnam-festival/my");
}

export async function logoutMy(): Promise<void> {
  const store = await cookies();
  store.delete({ name: COOKIE, path: COOKIE_PATH });
  redirect("/projects/hyeonnam-festival/my");
}
