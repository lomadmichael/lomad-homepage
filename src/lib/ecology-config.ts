// 남대천 생태체험 자체 접수 설정.
// 회차가 바뀌면 SESSIONS/PLACE만 갱신하고 SUBMISSIONS_OPEN 토글.

/** true 로 바꾸면 접수 페이지 폼 + 서버 액션이 열린다. 오픈 시 이 값만 바꾸고 배포. */
export const SUBMISSIONS_OPEN = true;

/** 타임당 정원. */
export const CAPACITY = 15;

/** 집결지 / 체험지 / 문의. */
export const PLACE = "양양문화복지회관 앞 남대천 일원";
export const EXPERIENCE_SITE = "양양 남대천 일원";
export const INQUIRY_TEL = "010-9542-3775";

/** 관리자(로마드) 접수 알림 수신처 — 접수 들어올 때 문자+이메일 발송. */
export const ADMIN_ALERT_PHONE = "01095423775";
export const ADMIN_ALERT_EMAIL = "lomad.coop@gmail.com";

export interface EcologySession {
  key: string; // ecology_submit/lookup 의 session_key
  label: string; // 사람이 읽는 일시
}

// 11월 회차: 하루 1타임(오전) — session_key는 날짜+타임(-am) 규칙 유지 (리마인더 크론이 slice(0,10)으로 날짜만 사용).
export const SESSIONS: EcologySession[] = [
  { key: "2026-11-15-am", label: "11월 15일(일) 오전 10:00–12:00" },
  { key: "2026-11-22-am", label: "11월 22일(일) 오전 10:00–12:00" },
  { key: "2026-11-29-am", label: "11월 29일(일) 오전 10:00–12:00" },
];

/**
 * 날짜 자동 마감 — 체험일 1일 전까지 접수(체험 당일 0시 KST부터 마감).
 * session_key 앞 10자리(YYYY-MM-DD)로 판정. 서버 시각 기준으로만 호출할 것.
 */
export function isPastDeadline(key: string, now: number = Date.now()): boolean {
  const day = key.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  return now >= new Date(`${day}T00:00:00+09:00`).getTime();
}

export function sessionLabel(key: string): string {
  return SESSIONS.find((s) => s.key === key)?.label ?? key;
}
