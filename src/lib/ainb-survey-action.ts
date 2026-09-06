"use server";

import { submitSurvey } from "@/lib/ainb-survey-db";
import { SURVEY_ITEMS } from "@/lib/ainb-survey-config";

export interface SurveyFormState {
  success: boolean;
  message: string;
}

function score(v: string | null): number | null {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 5 ? n : null;
}

export async function submitSurveyForm(
  _prev: SurveyFormState,
  formData: FormData,
): Promise<SurveyFormState> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const name = get("name");
  if (!name) return { success: false, message: "성명을 입력해 주세요." };

  const ratings: Record<string, number> = {};
  const missing: string[] = [];
  for (const item of SURVEY_ITEMS) {
    const s = score(get(`r_${item.key}`));
    if (s === null) {
      // 참여하지 않은 프로그램은 건너뛸 수 있게 한다.
      if (get(`r_${item.key}`) === "skip") continue;
      missing.push(item.label);
      continue;
    }
    ratings[item.key] = s;
  }
  if (missing.length) {
    return {
      success: false,
      message: `아직 답하지 않은 항목이 있습니다 — ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? ` 외 ${missing.length - 3}개` : ""}`,
    };
  }

  const overall = score(get("overall"));
  if (overall === null) return { success: false, message: "전반적인 만족도를 선택해 주세요." };

  const liveIntent = score(get("live_intent"));
  if (liveIntent === null) {
    return { success: false, message: "이 지역에서 생활해보고 싶은 마음이 들었는지 선택해 주세요." };
  }

  const liveReason = get("live_reason");
  if (!liveReason) return { success: false, message: "그렇게 생각하신 이유를 적어 주세요." };

  try {
    await submitSurvey({
      name,
      ratings,
      overall,
      recommend: score(get("recommend")),
      live_intent: liveIntent,
      live_reason: liveReason,
      best: get("best"),
      improve: get("improve"),
      advice: get("advice"),
      free_note: get("free_note"),
    });
    return { success: true, message: "설문에 응해주셔서 감사합니다." };
  } catch (e) {
    console.error("[ainb-survey] submit failed:", e);
    return { success: false, message: "제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
