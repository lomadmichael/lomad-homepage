"use server";

import { SUBMISSIONS_OPEN, CAPACITY, SESSIONS } from "@/lib/ecology-config";
import {
  submitRegistration,
  getSessionStates,
  type EcologyParticipant,
  type EcologySubmitResult,
} from "@/lib/ecology-db";
import { sendApplicationSms } from "@/lib/ecology-sms";
import { notifyAdmin } from "@/lib/ecology-admin-notify";

export interface EcologyFormState {
  success: boolean;
  message: string;
  result?: EcologySubmitResult;
}

const VALID_SESSIONS = new Set(SESSIONS.map((s) => s.key));

/** 만나이 → 구분 자동 판정. */
function deriveCategory(age: number): string {
  if (age >= 19) return "성인";
  if (age >= 14) return "만14세이상";
  return "만14세미만";
}

export async function submitEcology(
  _prev: EcologyFormState,
  formData: FormData,
): Promise<EcologyFormState> {
  if (!SUBMISSIONS_OPEN) {
    return { success: false, message: "정식 접수는 아직 시작되지 않았습니다." };
  }

  const guardian = (formData.get("guardian_name") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const session = (formData.get("session_key") as string | null)?.trim() ?? "";
  const note = (formData.get("note") as string | null)?.trim() ?? "";
  const healthNote = (formData.get("health_note") as string | null)?.trim() ?? "";
  const consentPrivacy = (formData.get("consent_privacy") as string | null) === "on";
  const consentNotice = (formData.get("consent_notice") as string | null) === "on";
  const consentMedia = (formData.get("consent_media") as string | null) === "on";
  const participantsJson = (formData.get("participants_json") as string | null) ?? "[]";

  if (!guardian || !phoneRaw) return { success: false, message: "신청자 이름과 연락처는 필수입니다." };
  if (!VALID_SESSIONS.has(session)) return { success: false, message: "참여 회차를 선택해 주세요." };

  // 수동 마감된 회차 차단
  try {
    const states = await getSessionStates();
    if (states[session] === false) {
      return { success: false, message: "선택하신 회차는 접수가 마감되었습니다. 다른 회차를 선택해 주세요." };
    }
  } catch (e) {
    console.error("[ecology] session state check failed:", e);
  }

  if (!consentPrivacy) return { success: false, message: "개인정보 수집·이용에 동의해 주세요." };
  if (!consentNotice) return { success: false, message: "안내사항 확인에 체크해 주세요." };

  const phone = phoneRaw.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 11) {
    return { success: false, message: "유효한 연락처를 입력해 주세요." };
  }

  let participants: { name?: unknown; age?: unknown }[];
  try {
    participants = JSON.parse(participantsJson);
  } catch {
    return { success: false, message: "참가자 정보를 다시 입력해 주세요." };
  }
  if (!Array.isArray(participants) || participants.length === 0) {
    return { success: false, message: "참가자를 최소 1명 추가해 주세요." };
  }

  const cleaned: EcologyParticipant[] = [];
  for (const p of participants) {
    const name = String(p?.name ?? "").trim();
    const age = Number(p?.age);
    if (!name) return { success: false, message: "참가자 이름을 모두 입력해 주세요." };
    if (!Number.isFinite(age) || age < 6 || age > 100) {
      return {
        success: false,
        message: `${name}: 만 나이를 정확히 입력해 주세요. (참가 어린이는 초등학생 이상, 미취학 아동은 참가 불가)`,
      };
    }
    cleaned.push({ name, age, category: deriveCategory(age) });
  }

  let result: EcologySubmitResult;
  try {
    result = await submitRegistration(
      {
        guardian_name: guardian,
        phone,
        session_key: session,
        note,
        email,
        health_note: healthNote,
        consent_privacy: consentPrivacy,
        consent_notice: consentNotice,
        consent_media: consentMedia,
        participants: cleaned,
      },
      CAPACITY,
    );
  } catch (e) {
    console.error("[ecology] submit error:", e);
    return {
      success: false,
      message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }

  try {
    await sendApplicationSms({
      phone,
      guardianName: guardian,
      sessionKey: session,
      status: result.status,
    });
  } catch (e) {
    console.error("[ecology] application SMS failed:", e);
  }

  // 관리자(로마드) 알림 — 문자 + 이메일 (실패해도 접수 성공 처리)
  try {
    await notifyAdmin({
      guardianName: guardian,
      phone,
      email,
      sessionKey: session,
      status: result.status,
      participants: cleaned,
      healthNote,
    });
  } catch (e) {
    console.error("[ecology] admin notify failed:", e);
  }

  const msg =
    result.status === "confirmed"
      ? "접수가 확정되었습니다. 잠시 후 확인 문자가 발송됩니다."
      : "정원이 차서 대기로 접수되었습니다. 자리가 나면 순서대로 문자로 안내드립니다.";
  return { success: true, message: msg, result };
}
