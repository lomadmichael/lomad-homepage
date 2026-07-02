// 남대천 생태체험 자체 접수 설정.
// 회차가 바뀌면 SESSIONS/PLACE만 갱신하고 SUBMISSIONS_OPEN 토글.

/** true 로 바꾸면 접수 페이지 폼 + 서버 액션이 열린다. 오픈 시 이 값만 바꾸고 배포. */
export const SUBMISSIONS_OPEN = true;

/** 회차당 어린이 정원. */
export const CAPACITY = 12;

/** 집결지 / 체험지 / 문의. */
export const PLACE = "양양군 평생학습관 (양양읍 안산1길 36)";
export const EXPERIENCE_SITE = "남대천 (양양군 서면 용천리 일원)";
export const INQUIRY_TEL = "010-9542-3775";

export interface EcologySession {
  key: string; // ecology_submit/lookup 의 session_key
  label: string; // 사람이 읽는 일시
}

export const SESSIONS: EcologySession[] = [
  { key: "2026-07-11", label: "7월 11일(토) 오전 10:00–12:00" },
  { key: "2026-07-18", label: "7월 18일(토) 오전 10:00–12:00" },
  { key: "2026-07-25", label: "7월 25일(토) 오전 10:00–12:00" },
  { key: "2026-08-01", label: "8월 1일(토) 오전 10:00–12:00" },
  { key: "2026-08-08", label: "8월 8일(토) 오전 10:00–12:00" },
];

export function sessionLabel(key: string): string {
  return SESSIONS.find((s) => s.key === key)?.label ?? key;
}
