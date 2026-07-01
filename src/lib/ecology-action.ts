"use server";

import { SUBMISSIONS_OPEN, CAPACITY, SESSIONS } from "@/lib/ecology-config";
import { submitRegistration, type EcologyChild, type EcologySubmitResult } from "@/lib/ecology-db";
import { sendApplicationSms } from "@/lib/ecology-sms";

export interface EcologyFormState {
  success: boolean;
  message: string;
  result?: EcologySubmitResult;
}

const VALID_SESSIONS = new Set(SESSIONS.map((s) => s.key));

export async function submitEcology(
  _prev: EcologyFormState,
  formData: FormData,
): Promise<EcologyFormState> {
  if (!SUBMISSIONS_OPEN) {
    return { success: false, message: "정식 접수는 아직 시작되지 않았습니다." };
  }

  const guardian = (formData.get("guardian_name") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const session = (formData.get("session_key") as string | null)?.trim() ?? "";
  const note = (formData.get("note") as string | null)?.trim() ?? "";
  const consent = (formData.get("consent") as string | null) === "on";
  const childrenJson = (formData.get("children_json") as string | null) ?? "[]";

  if (!guardian || !phoneRaw) return { success: false, message: "보호자 이름과 연락처는 필수입니다." };
  if (!consent) return { success: false, message: "개인정보 수집·이용에 동의해 주세요." };
  if (!VALID_SESSIONS.has(session)) return { success: false, message: "참여 회차를 선택해 주세요." };

  const phone = phoneRaw.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 11) {
    return { success: false, message: "유효한 연락처를 입력해 주세요." };
  }

  let children: EcologyChild[];
  try {
    children = JSON.parse(childrenJson);
  } catch {
    return { success: false, message: "참가 어린이 정보를 다시 입력해 주세요." };
  }
  if (!Array.isArray(children) || children.length === 0) {
    return { success: false, message: "참가 어린이를 최소 1명 추가해 주세요." };
  }

  const cleaned: EcologyChild[] = [];
  for (const c of children) {
    const name = String(c?.name ?? "").trim();
    const age = Number(c?.age);
    if (!name) return { success: false, message: "어린이 이름을 모두 입력해 주세요." };
    if (!Number.isFinite(age) || age < 5 || age > 19) {
      return {
        success: false,
        message: `${name}: 만 나이를 올바르게 입력해 주세요. (미취학 아동은 안전상 참가 불가)`,
      };
    }
    cleaned.push({ name, age });
  }

  let result: EcologySubmitResult;
  try {
    result = await submitRegistration(
      { guardian_name: guardian, phone, session_key: session, note, children: cleaned },
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

  const msg =
    result.status === "confirmed"
      ? "접수가 확정되었습니다. 잠시 후 확인 문자가 발송됩니다."
      : "정원이 차서 대기로 접수되었습니다. 자리가 나면 순서대로 문자로 안내드립니다.";
  return { success: true, message: msg, result };
}
