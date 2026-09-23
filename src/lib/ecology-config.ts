// 남대천 생태체험 자체 접수 설정.
// 회차가 바뀌면 SESSIONS/PLACE만 갱신하고 SUBMISSIONS_OPEN 토글.

/** true 로 바꾸면 접수 페이지 폼 + 서버 액션이 열린다. 오픈 시 이 값만 바꾸고 배포. */
export const SUBMISSIONS_OPEN = true;

/** 타임당 정원. */
export const CAPACITY = 15;

/** 집결지 / 체험지 / 문의. */
export const PLACE = "한국수산자원공단 동해생명자원센터 (양양군 손양면 동명로 119)";
export const EXPERIENCE_SITE = "양양 남대천 일대 · 연어전시관";
export const INQUIRY_TEL = "010-9542-3775";

/** 관리자(로마드) 접수 알림 수신처 — 접수 들어올 때 문자+이메일 발송. */
export const ADMIN_ALERT_PHONE = "01095423775";
export const ADMIN_ALERT_EMAIL = "lomad.coop@gmail.com";

export interface EcologySession {
  key: string; // ecology_submit/lookup 의 session_key
  label: string; // 사람이 읽는 일시
}

// 하루 2타임(오전/오후) — session_key는 날짜+타임(-am/-pm). 코드가 날짜로 파싱하지 않으므로 안전.
export const SESSIONS: EcologySession[] = [
  { key: "2026-10-03-am", label: "10월 3일(토) 오전 10:00–12:00" },
  { key: "2026-10-03-pm", label: "10월 3일(토) 오후 1:00–3:00" },
  { key: "2026-10-10-am", label: "10월 10일(토) 오전 10:00–12:00" },
  { key: "2026-10-10-pm", label: "10월 10일(토) 오후 1:00–3:00" },
  { key: "2026-10-24-am", label: "10월 24일(토) 오전 10:00–12:00" },
  { key: "2026-10-24-pm", label: "10월 24일(토) 오후 1:00–3:00" },
  { key: "2026-10-31-am", label: "10월 31일(토) 오전 10:00–12:00" },
  { key: "2026-10-31-pm", label: "10월 31일(토) 오후 1:00–3:00" },
];

export function sessionLabel(key: string): string {
  return SESSIONS.find((s) => s.key === key)?.label ?? key;
}
