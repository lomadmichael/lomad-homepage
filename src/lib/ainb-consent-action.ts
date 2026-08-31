"use server";

import { submitConsent, type Cohort } from "@/lib/ainb-consent-db";

export interface ConsentFormState {
  success: boolean;
  message: string;
  updated?: boolean;
}

const COHORTS = new Set<Cohort>(["1기", "2기"]);

/** 하이픈·공백 제거 후 010 계열 11자리(또는 10자리)인지 확인 */
function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[^0-9]/g, "");
  if (d.length === 10 && d.startsWith("10")) d = "0" + d;
  return /^01[016789]\d{7,8}$/.test(d) ? d : null;
}

/** 주민등록번호 13자리. 하이픈 유무 모두 허용 */
function normalizeRrn(raw: string): string | null {
  const d = raw.replace(/[^0-9]/g, "");
  return /^\d{13}$/.test(d) ? d : null;
}

export async function submitAinbConsent(
  _prev: ConsentFormState,
  formData: FormData,
): Promise<ConsentFormState> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();
  const on = (k: string) => formData.get(k) === "on";

  const cohort = get("cohort") as Cohort;
  const name = get("name");
  const phoneRaw = get("phone");
  const insuredName = get("insured_name") || name;
  const address = get("address");
  const rrnRaw = get("rrn");
  const refundAccount = get("refund_account");

  if (!COHORTS.has(cohort)) return { success: false, message: "참가 기수를 선택해 주세요." };
  if (!name) return { success: false, message: "성명을 입력해 주세요." };

  const phone = normalizePhone(phoneRaw);
  if (!phone) return { success: false, message: "휴대전화 번호를 정확히 입력해 주세요." };

  if (!address) return { success: false, message: "보험 가입을 위한 주소를 입력해 주세요." };

  const rrn = normalizeRrn(rrnRaw);
  if (!rrn) return { success: false, message: "주민등록번호 13자리를 정확히 입력해 주세요." };

  if (!refundAccount) return { success: false, message: "환불 계좌를 입력해 주세요." };

  // 필수 동의 (네이버 폼 문항 1·2·3·7·8·10·11)
  const consentPrivacy = on("consent_privacy");
  const consentProgram = on("consent_program");
  const consentInsurance = on("consent_insurance");
  const consentMedia = on("consent_media");
  const consentRefund = on("consent_refund");
  const consentSelfrisk = on("consent_selfrisk");
  const consentRules = on("consent_rules");

  const missing = [
    !consentPrivacy && "개인정보 수집·이용",
    !consentProgram && "프로그램 일정·내용",
    !consentInsurance && "여행자 보험 가입",
    !consentMedia && "사진·영상 촬영",
    !consentRefund && "참가비 환불 조건",
    !consentSelfrisk && "자율 프로그램 사고 책임",
    !consentRules && "이용수칙·준수사항",
  ].filter(Boolean);
  if (missing.length) {
    return { success: false, message: `다음 항목에 동의해 주세요 — ${missing.join(", ")}` };
  }

  try {
    const { updated } = await submitConsent({
      cohort,
      name,
      phone,
      email: get("email"),
      insured_name: insuredName,
      address,
      rrn,
      refund_account: refundAccount,
      consent_privacy: consentPrivacy,
      consent_program: consentProgram,
      consent_insurance: consentInsurance,
      consent_media: consentMedia,
      consent_refund: consentRefund,
      consent_selfrisk: consentSelfrisk,
      consent_rules: consentRules,
      note: get("note"),
    });
    return {
      success: true,
      updated,
      message: updated
        ? "이미 제출하신 내용이 있어 새로 입력하신 내용으로 수정했습니다."
        : "참가 동의서가 제출되었습니다.",
    };
  } catch (e) {
    console.error("[ainb-consent] submit failed:", e);
    return { success: false, message: "제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
