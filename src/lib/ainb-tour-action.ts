"use server";

import { sendAlimtalk } from "@/lib/solapi";
import { signupTour, mySignup } from "@/lib/ainb-tour-db";
import { findParticipant, tourByKey, TOUR_MEET, TOUR_MEET_ADDR, TOUR_TEL } from "@/lib/ainb-tour-config";

export interface TourFormState {
  success: boolean;
  message: string;
  /** 신청이 확정된 투어 키 */
  tourKey?: string;
  /** 정원이 차서 실패한 경우 다시 고르도록 */
  full?: boolean;
}

function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[^0-9]/g, "");
  if (d.length === 10 && d.startsWith("10")) d = "0" + d;
  return /^01[016789]\d{7,8}$/.test(d) ? d : null;
}

export async function submitTourChoice(
  _prev: TourFormState,
  formData: FormData,
): Promise<TourFormState> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const tourKey = get("tour_key");
  const nameInput = get("name");
  const phoneRaw = get("phone");

  const tour = tourByKey(tourKey);
  if (!tour) return { success: false, message: "투어를 선택해 주세요." };
  if (!nameInput) return { success: false, message: "성명을 입력해 주세요." };

  const phone = normalizePhone(phoneRaw);
  if (!phone) return { success: false, message: "휴대전화 번호를 정확히 입력해 주세요. (예: 010-1234-5678)" };

  const participant = findParticipant(phone);
  if (!participant) {
    return {
      success: false,
      message: "참가자 명단에서 번호를 찾지 못했습니다. 신청서에 적으신 번호로 입력해 주시고, 계속 안 되면 운영진에게 연락 주세요.",
    };
  }
  if (participant.name.replace(/\s/g, "") !== nameInput.replace(/\s/g, "")) {
    return { success: false, message: "성명과 휴대전화 번호가 일치하지 않습니다." };
  }

  try {
    const before = await mySignup(phone);
    const { status } = await signupTour({
      name: participant.name,
      phone,
      tourKey,
      capacity: tour.capacity,
    });

    if (status === "full") {
      return {
        success: false,
        full: true,
        message: `아쉽지만 「${tour.title}」 정원이 방금 마감되었습니다. 다른 투어를 선택해 주세요.`,
      };
    }

    if (status !== "unchanged") {
      await sendTourSms({ name: participant.name, phone, tourKey, changed: status === "changed" });
    }

    const changed = status === "changed" || (before && before.tour_key !== tourKey);
    return {
      success: true,
      tourKey,
      message: changed
        ? "신청하신 투어를 변경했습니다. 안내 문자를 보내드렸습니다."
        : status === "unchanged"
          ? "이미 같은 투어로 신청되어 있습니다."
          : "멘토투어 신청이 완료되었습니다. 안내 문자를 보내드렸습니다.",
    };
  } catch (e) {
    console.error("[ainb-tour] submit failed:", e);
    return { success: false, message: "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }
}

async function sendTourSms(params: {
  name: string;
  phone: string;
  tourKey: string;
  changed: boolean;
}) {
  const tour = tourByKey(params.tourKey);
  if (!tour) return;

  const program = tour.program.map((p) => `· ${p}`).join("\n");
  const feeLine =
    tour.fee > 0
      ? `\n■ 개인 부담\n${tour.feeLabel} ${tour.fee.toLocaleString()}원\n점심·카페 식음료비는 각자 부담입니다.`
      : `\n■ 개인 부담\n점심·카페 식음료비는 각자 부담입니다.`;

  const body = `[Ai 내일바꿈 1기] 멘토투어 ${params.changed ? "변경" : "신청"} 완료

${params.name}님, ${params.changed ? "선택하신 투어가 변경되었습니다." : "멘토투어 신청이 완료되었습니다."}

■ ${tour.title}
멘토 ${tour.mentor} (${tour.belong})

${program}
${feeLine}

■ 집합
${TOUR_MEET}
${TOUR_MEET_ADDR}

문의 ${TOUR_TEL}`;

  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_AINB_TOUR",
    variables: {},
    fallbackText: body,
  });
}
