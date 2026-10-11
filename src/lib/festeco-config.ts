// 양양송이연어축제 「남대천 생태탐방」 사전예약 설정.
// 정규 남대천 생태체험(ecology-config.ts)과 완전히 분리된 별도 프로그램 — 명단·정원·쿠키 공유 안 함.
// 클라이언트 컴포넌트에서도 import 하므로 server-only 금지.

export const PROGRAM_NAME = "양양송이연어축제 남대천 생태탐방";
export const HOST = "양양군";
export const ORGANIZER = "로마드협동조합";
export const FEE = "무료";
export const TARGET = "어린이 동반 가족 및 성인 누구나";
export const DURATION = "회차별 약 2시간";

export const INTRO =
  "숲과 물길을 따라 걷고, 놀이로 남대천의 생태 이야기를 배우는 프로그램. 생태관광지도사와 함께 자연을 관찰하고, 연어의 여행과 생태계의 연결을 알아봅니다.";

export const ACTIVITIES: { title: string; desc: string }[] = [
  { title: "숲과 물길 자연해설", desc: "숲·토양·빗물과 하천의 연결" },
  { title: "연어 한살이 윷놀이", desc: "성장·회귀 여정을 놀이로" },
  { title: "생태밧줄놀이", desc: "생물·물·숲의 연결 관계" },
];

/** 집결·접수·출발 장소 / 준비물 / 문의. */
export const MEETING_POINT = "양양송이연어축제장 93번 부스";
export const SUPPLIES = "편한 복장, 운동화, 모자, 개인 물병";
export const INQUIRY_TEL = "010-9542-3775";

/** 관리자(로마드) 접수 알림 수신처 — SMS만. */
export const ADMIN_ALERT_PHONE = "01095423775";

/** 회차당 사전예약 정원. 현장접수 5명은 별도 운영(이 숫자에 포함 안 됨). 관리자 페이지에서 회차별 오버라이드 가능. */
export const PRE_CAPACITY = 10;
export const ONSITE_CAPACITY = 5;
export const CAPACITY_INFO = "회차별 15명 내외 = 사전예약 10명 + 현장접수 5명";

/** 1건당 신청 가능 총 인원(성인+어린이). 한 사람이 회차 정원을 독점하지 않도록 5명. */
export const MAX_PER_APPLICATION = 5;

/** 마감 회차 표시 문구 — 그대로 노출. */
export const CLOSED_LABEL = "사전예약 마감 — 현장접수 별도 운영";

/** 본인 조회·취소 페이지 (문자에 들어가는 절대 URL). */
export const MY_URL = "https://lomadcoop.com/ecology/festival/my";

/** 참가자 안내 문구 — 신청 페이지·완료 화면에 그대로 노출. */
export const NOTICES: string[] = [
  "출발 10분 전까지 축제장 93번 부스에 도착해 주세요. 어린이는 보호자와 함께 참여하며, 편한 복장·운동화·모자·개인 물병을 준비해 주세요.",
  "사전예약자가 출발 5분 전까지 도착하지 않으면, 현장 대기자에게 자리가 배정될 수 있습니다.",
  "기상 및 현장 여건에 따라 일정과 동선이 조정될 수 있습니다.",
  "문의 및 예약 취소 연락: 010-9542-3775",
];

export interface FestecoSession {
  key: string; // festeco_* RPC 의 session_key
  round: string; // 회차 번호 라벨
  label: string; // 사람이 읽는 일시
  startsAt: string; // 시작 시각(KST) — 이후엔 본인 취소 버튼 숨김
  closesAt: string; // 사전예약 마감 = 전날 18:00 KST
}

export const SESSIONS: FestecoSession[] = [
  {
    key: "fest-1016-1",
    round: "1회",
    label: "10월 16일(금) 14:00~16:00",
    startsAt: "2026-10-16T14:00:00+09:00",
    closesAt: "2026-10-15T18:00:00+09:00",
  },
  {
    key: "fest-1017-1",
    round: "2회",
    label: "10월 17일(토) 10:00~12:00",
    startsAt: "2026-10-17T10:00:00+09:00",
    closesAt: "2026-10-16T18:00:00+09:00",
  },
  {
    key: "fest-1017-2",
    round: "3회",
    label: "10월 17일(토) 13:00~15:00",
    startsAt: "2026-10-17T13:00:00+09:00",
    closesAt: "2026-10-16T18:00:00+09:00",
  },
  {
    key: "fest-1017-3",
    round: "4회",
    label: "10월 17일(토) 15:00~17:00",
    startsAt: "2026-10-17T15:00:00+09:00",
    closesAt: "2026-10-16T18:00:00+09:00",
  },
  {
    key: "fest-1018-1",
    round: "5회",
    label: "10월 18일(일) 10:00~12:00",
    startsAt: "2026-10-18T10:00:00+09:00",
    closesAt: "2026-10-17T18:00:00+09:00",
  },
  {
    key: "fest-1018-2",
    round: "6회",
    label: "10월 18일(일) 14:00~16:00",
    startsAt: "2026-10-18T14:00:00+09:00",
    closesAt: "2026-10-17T18:00:00+09:00",
  },
];

export function findSession(key: string): FestecoSession | undefined {
  return SESSIONS.find((s) => s.key === key);
}

/** "1회 · 10월 16일(금) 14:00~16:00" */
export function sessionLabel(key: string): string {
  const s = findSession(key);
  return s ? `${s.round} · ${s.label}` : key;
}

/** 회차별 화면 표시용 상태 (서버에서 계산해 클라이언트로 전달). */
export interface FestecoSessionView {
  remaining: number;
  closed: boolean;
}
