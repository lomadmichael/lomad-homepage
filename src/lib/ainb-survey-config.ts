/** 「Ai 내일바꿈」 1기 만족도 조사 문항 (2026. 9. 3.~9. 6. 실제 진행 프로그램 기준) */

export const SURVEY_COHORT = "1기";

export interface SurveyItem {
  key: string;
  label: string;
  hint?: string;
  day: string;
}

/** 5점 척도 프로그램 문항 */
export const SURVEY_ITEMS: SurveyItem[] = [
  { key: "orientation", label: "오리엔테이션 · 자기소개", day: "1일차" },
  { key: "ai_setup", label: "Ai 기본 세팅", hint: "계정 만들기, 도구 설치", day: "1일차" },
  { key: "running", label: "현남면 러닝", hint: "인구 어린이공원 출발", day: "2일차" },
  { key: "ai_basic", label: "Ai 기본 교육", day: "2일차" },
  { key: "mentor_tour", label: "멘토투어", hint: "지역 멘토와 함께한 로컬투어", day: "2일차" },
  { key: "goods", label: "현남생활 굿즈 만들기", day: "3일차" },
  { key: "surfing", label: "서핑 체험", hint: "죽도해변", day: "3일차" },
  { key: "ai_project", label: "Ai 교육 · 산출물 만들기", day: "3일차" },
  { key: "yoga", label: "요가", hint: "웨이브웍스", day: "3일차" },
  { key: "showcase", label: "산출물 · 현남생활 발표회", day: "4일차" },
  { key: "lodging", label: "숙소", day: "공통" },
];

export const SCALE = [1, 2, 3, 4, 5];

export const LIVE_INTENT_LABEL: Record<number, string> = {
  1: "전혀 들지 않았다",
  2: "별로 들지 않았다",
  3: "보통이다",
  4: "조금 들었다",
  5: "많이 들었다",
};

/** 생활 의향 점수에 따라 이유를 묻는 문구를 바꾼다. */
export function liveReasonPrompt(score: number): string {
  if (score >= 4) return "어떤 점이 그런 마음이 들게 했나요?";
  if (score <= 2) return "어떤 점이 걸림돌이 되었나요?";
  return "어떤 점이 마음을 정하기 어렵게 했나요?";
}

export function itemLabel(key: string): string {
  return SURVEY_ITEMS.find((i) => i.key === key)?.label ?? key;
}
