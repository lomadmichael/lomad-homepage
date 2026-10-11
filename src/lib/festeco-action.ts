"use server";

import { SESSIONS, MAX_PER_APPLICATION, findSession } from "@/lib/festeco-config";
import {
  getBooked,
  getSessionStates,
  effectiveCapacity,
  sessionView,
  submitRegistration,
} from "@/lib/festeco-db";
import { sendApplicationSms } from "@/lib/festeco-sms";
import { notifyAdmin } from "@/lib/festeco-admin-notify";

export interface FestecoFormState {
  success: boolean;
  message: string;
  result?: {
    session_key: string;
    adults: number;
    children: number;
    total: number;
  };
}

const VALID_SESSIONS = new Set(SESSIONS.map((s) => s.key));

function count(v: FormDataEntryValue | null): number {
  const n = Number(v);
  return Number.isInteger(n) ? n : NaN;
}

export async function submitFesteco(
  _prev: FestecoFormState,
  formData: FormData,
): Promise<FestecoFormState> {
  const guardian = (formData.get("guardian_name") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const session = (formData.get("session_key") as string | null)?.trim() ?? "";
  const adults = count(formData.get("adults"));
  const children = count(formData.get("children"));
  const consentPrivacy = (formData.get("consent_privacy") as string | null) === "on";
  const consentNotice = (formData.get("consent_notice") as string | null) === "on";

  if (!VALID_SESSIONS.has(session)) return { success: false, message: "참여 회차를 선택해 주세요." };
  if (!guardian || !phoneRaw) {
    return { success: false, message: "대표 신청자 이름과 연락처는 필수입니다." };
  }

  const phone = phoneRaw.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 11) {
    return { success: false, message: "유효한 연락처를 입력해 주세요." };
  }

  if (
    !Number.isFinite(adults) ||
    !Number.isFinite(children) ||
    adults < 0 ||
    children < 0 ||
    adults > MAX_PER_APPLICATION ||
    children > MAX_PER_APPLICATION
  ) {
    return { success: false, message: "참여 인원을 다시 확인해 주세요." };
  }
  const total = adults + children;
  if (total < 1) return { success: false, message: "참여 인원을 1명 이상 입력해 주세요." };
  if (total > MAX_PER_APPLICATION) {
    return { success: false, message: `1건당 최대 ${MAX_PER_APPLICATION}명까지 신청할 수 있습니다.` };
  }

  if (!consentPrivacy) return { success: false, message: "개인정보 수집·이용에 동의해 주세요." };
  if (!consentNotice) return { success: false, message: "안내사항 확인에 체크해 주세요." };

  // 마감 판정은 서버 시각 기준 (전날 18:00 / 관리자 마감 / 잔여 0)
  let capacity: number;
  try {
    const [booked, states] = await Promise.all([getBooked(), getSessionStates()]);
    const view = sessionView(session, booked, states);
    if (view.closed) {
      return { success: false, message: "선택하신 회차는 사전예약이 마감되었습니다. 현장접수는 별도 운영됩니다." };
    }
    if (total > view.remaining) {
      return { success: false, message: `잔여석(${view.remaining}석)을 초과했습니다.` };
    }
    capacity = effectiveCapacity(states[session]);
  } catch (e) {
    console.error("[festeco] availability check failed:", e);
    return { success: false, message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  let result;
  try {
    result = await submitRegistration(
      {
        session_key: session,
        phone,
        guardian_name: guardian,
        adults,
        children,
        consent_privacy: consentPrivacy,
        consent_notice: consentNotice,
      },
      capacity,
    );
  } catch (e) {
    console.error("[festeco] submit error:", e);
    return { success: false, message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  // RPC 가 동시 접수 경합까지 최종 판정 (정원은 DB 에서 원자적으로 확인)
  if (!result.ok) {
    if (result.reason === "full") {
      return {
        success: false,
        message: `잔여석(${Math.max(0, result.remaining ?? 0)}석)을 초과했습니다.`,
      };
    }
    if (result.reason === "duplicate") {
      return {
        success: false,
        message: "이 연락처로 같은 회차에 이미 신청하셨습니다. 내 신청 조회에서 확인해 주세요.",
      };
    }
    return { success: false, message: "선택하신 회차는 사전예약이 마감되었습니다. 현장접수는 별도 운영됩니다." };
  }

  const done = {
    session_key: result.session_key,
    adults: Number(result.adults),
    children: Number(result.children),
    total: Number(result.total),
  };

  try {
    await sendApplicationSms({
      phone,
      guardianName: guardian,
      sessionKey: done.session_key,
      adults: done.adults,
      children: done.children,
      total: done.total,
    });
  } catch (e) {
    console.error("[festeco] application SMS failed:", e);
  }

  // 관리자(로마드) 문자 알림 (실패해도 접수 성공 처리)
  try {
    await notifyAdmin({
      guardianName: guardian,
      phone,
      sessionKey: done.session_key,
      adults: done.adults,
      children: done.children,
      total: done.total,
    });
  } catch (e) {
    console.error("[festeco] admin notify failed:", e);
  }

  const s = findSession(done.session_key);
  return {
    success: true,
    message: s ? `${s.round} 사전예약이 확정되었습니다.` : "사전예약이 확정되었습니다.",
    result: done,
  };
}
