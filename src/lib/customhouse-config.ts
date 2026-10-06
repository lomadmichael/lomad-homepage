// 2026 양양송이연어축제 — 「영수증 리워드 커스텀 티셔츠 만들기」 접수·회차권 설정.
// 설계: docs/superpowers/specs/2026-10-06-customhouse-songi-entry-design.md
//
// ⚠️ 이 파일은 클라이언트 컴포넌트에서도 import 하므로 server-only 를 붙이지 않는다.
//    (환경변수 읽는 isTestMode()는 서버에서만 호출할 것 — 클라이언트에선 항상 false)
//
// 모든 날짜·시각은 KST(Asia/Seoul, UTC+9, 서머타임 없음) 기준으로 계산한다.

/** 행사일 (KST). */
export const EVENT_DATES = ["2026-10-16", "2026-10-17", "2026-10-18"] as const;
/** 회차 시작 시각(정각, KST). 10~17시 8회차. */
export const SLOT_HOURS = [10, 11, 12, 13, 14, 15, 16, 17] as const;
/** 회차당 정원(인원 기준). 리허설 실측 후 하향 가능. */
export const SLOT_CAPACITY = 50;
/** 영수증 합계 단가 — 합계 ÷ 이 값(내림) = 최대 인원. */
export const PRICE_UNIT = 30_000;
/** 접수 오픈 시각(시). */
export const REG_OPEN_HOUR = 10;
/** 접수 마감: 마지막 회차(17시) 시작 + 10분. */
export const REG_CLOSE_HOUR = 17;
export const REG_CLOSE_MINUTE = 10;
/** 회차 시작 후 이 시간(분)까지 배정 가능 / 이 시간 이후 노쇼 해제 가능. */
export const GRACE_MINUTES = 10;
/** 알림 문자: 회차 시작 N분 전. */
export const REMINDER_LEAD_MINUTES = 10;
/** 승인 시각이 회차 시작 −N분 이후면 알림 생략. */
export const REMINDER_SKIP_MINUTES = 12;
/** 참여자 수 UI 상한 (정원 이상은 어차피 배정 불가). */
export const MAX_PARTY_HARD = SLOT_CAPACITY;

export const PLACE = "송이연어축제장 내 커스텀 티셔츠 제작 체험 부스";
export const BOOTH_NAME = "영수증 리워드 커스텀 티셔츠 만들기";
export const PURGE_DEADLINE = "2026-10-25";

export const BASE_PATH = "/projects/custom-house/songi-salmon-2026";

/** 손님 세션 쿠키 (OTP 인증 후). */
export const SESSION_COOKIE = "ch_songi_session";
export const SESSION_TTL = 60 * 60 * 24 * 4; // 4일 (행사 3일 + 여유)
/** 관리자 쿠키. */
export const ADMIN_COOKIE = "ch_songi_admin";
export const ADMIN_COOKIE_PATH = `${BASE_PATH}/admin`;
export const ADMIN_TTL = 60 * 60 * 12;

export const OTP_TTL_SECONDS = 300;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_MAX_SENDS_PER_HOUR = 5;
export const OTP_MAX_VERIFY_ATTEMPTS = 5;

export type RegStatus = "pending" | "approved" | "checked_in" | "no_show" | "cancelled";
export type Gender = "남" | "여";

export interface Participant {
  name: string;
  gender: Gender | null;
  age: number | null;
}
export interface Receipt {
  amount: number;
  store: string | null;
}

/** 회차별 색 (회차권·현황판 공통). 배경색 / 글자색. */
export const SLOT_COLORS: Record<number, { bg: string; fg: string }> = {
  10: { bg: "#E07F74", fg: "#FFFFFF" },
  11: { bg: "#E8A845", fg: "#262120" },
  12: { bg: "#7FA36B", fg: "#FFFFFF" },
  13: { bg: "#4F8FB0", fg: "#FFFFFF" },
  14: { bg: "#8C4A42", fg: "#FFFFFF" },
  15: { bg: "#B57BA6", fg: "#FFFFFF" },
  16: { bg: "#3E6E5C", fg: "#FFFFFF" },
  17: { bg: "#262120", fg: "#F5EEDF" },
};

/** 서버 전용: CUSTOMHOUSE_TEST_MODE=1 이면 날짜·시간 제한 해제 + 문자 드라이런. */
export function isTestMode(): boolean {
  return (process.env.CUSTOMHOUSE_TEST_MODE || "").trim() === "1";
}

// ─────────────────────────── KST 시간 유틸 ───────────────────────────

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

export interface KstParts {
  date: string; // YYYY-MM-DD
  hour: number;
  minute: number;
}

export function kstParts(now: Date): KstParts {
  const s = new Date(now.getTime() + KST_OFFSET_MS);
  const y = s.getUTCFullYear();
  const m = String(s.getUTCMonth() + 1).padStart(2, "0");
  const d = String(s.getUTCDate()).padStart(2, "0");
  return { date: `${y}-${m}-${d}`, hour: s.getUTCHours(), minute: s.getUTCMinutes() };
}

export function todayKst(now: Date = new Date()): string {
  return kstParts(now).date;
}

/** 회차 시작 시각(절대 시각). */
export function slotStart(date: string, hour: number): Date {
  return new Date(`${date}T${String(hour).padStart(2, "0")}:00:00+09:00`);
}

/** "2026-10-16T09:50:00+09:00" 형식 (SOLAPI 예약 — 명시적 +09:00). */
export function kstIso(d: Date): string {
  const p = kstParts(d);
  const s = new Date(d.getTime() + KST_OFFSET_MS);
  const sec = String(s.getUTCSeconds()).padStart(2, "0");
  return `${p.date}T${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}:${sec}+09:00`;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
/** 날짜 문자열(YYYY-MM-DD)의 요일 — 하드코딩 금지, 항상 계산. */
export function weekdayKo(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

/** "10월 16일(금)" */
export function dateLabel(date: string): string {
  const [, m, d] = date.split("-").map(Number);
  return `${m}월 ${d}일(${weekdayKo(date)})`;
}

export function hourLabel(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function isEventDate(date: string): boolean {
  return (EVENT_DATES as readonly string[]).includes(date);
}

// ─────────────────────────── 규칙 ───────────────────────────

export function maxPartySize(receiptTotal: number): number {
  if (!Number.isFinite(receiptTotal) || receiptTotal <= 0) return 0;
  return Math.min(Math.floor(receiptTotal / PRICE_UNIT), MAX_PARTY_HARD);
}

export function receiptTotal(receipts: Receipt[]): number {
  return receipts.reduce((s, r) => s + (Number.isFinite(r.amount) && r.amount > 0 ? Math.floor(r.amount) : 0), 0);
}

export type GateResult =
  | { open: true }
  | { open: false; reason: "before_event" | "not_yet" | "closed_today" | "after_event"; message: string };

/** 셀프 접수 가능 여부: 행사일 10:00 ~ 17:10 (KST). 테스트 모드면 항상 열림. */
export function registrationGate(now: Date, testMode: boolean): GateResult {
  if (testMode) return { open: true };
  const { date, hour, minute } = kstParts(now);
  const first = EVENT_DATES[0];
  const last = EVENT_DATES[EVENT_DATES.length - 1];
  if (date < first) {
    return { open: false, reason: "before_event", message: `${dateLabel(first)} 10시에 열려요` };
  }
  if (date > last) {
    return { open: false, reason: "after_event", message: "축제가 끝났어요. 함께해 주셔서 고마워요!" };
  }
  if (!isEventDate(date)) {
    return { open: false, reason: "closed_today", message: "오늘은 운영하지 않아요" };
  }
  const mins = hour * 60 + minute;
  if (mins < REG_OPEN_HOUR * 60) {
    return { open: false, reason: "not_yet", message: "10시에 열려요" };
  }
  if (mins >= REG_CLOSE_HOUR * 60 + REG_CLOSE_MINUTE) {
    const idx = (EVENT_DATES as readonly string[]).indexOf(date);
    const next = EVENT_DATES[idx + 1];
    return {
      open: false,
      reason: "closed_today",
      message: next ? `오늘 접수는 마감됐어요. ${dateLabel(next)} 10시에 다시 열려요` : "접수가 모두 마감됐어요",
    };
  }
  return { open: true };
}

/** 회차 배정 가능: 회차 시작 + 10분 전까지. */
export function isSlotAssignable(date: string, hour: number, now: Date, testMode: boolean): boolean {
  if (testMode) return true;
  return now.getTime() < slotStart(date, hour).getTime() + GRACE_MINUTES * 60_000;
}

/** 노쇼 해제 가능: 회차 시작 + 10분 경과 후. */
export function canReleaseNoShow(date: string, hour: number, now: Date, testMode: boolean): boolean {
  if (testMode) return true;
  return now.getTime() >= slotStart(date, hour).getTime() + GRACE_MINUTES * 60_000;
}

/** 알림 예약 시각. 승인 시각이 회차 시작 −12분 이후면 null(생략). */
export function reminderTime(date: string, hour: number, approvedAt: Date): Date | null {
  const start = slotStart(date, hour).getTime();
  if (approvedAt.getTime() >= start - REMINDER_SKIP_MINUTES * 60_000) return null;
  return new Date(start - REMINDER_LEAD_MINUTES * 60_000);
}

/** 오늘 남은 좌석 ≥ 인원 인 가장 빠른 배정 가능 회차. 없으면 null. */
export function suggestSlot(
  date: string,
  seatsByHour: Record<number, number>,
  partySize: number,
  now: Date,
  testMode: boolean,
  capacity: number = SLOT_CAPACITY,
): number | null {
  for (const h of SLOT_HOURS) {
    if (!isSlotAssignable(date, h, now, testMode)) continue;
    if (capacity - (seatsByHour[h] ?? 0) >= partySize) return h;
  }
  return null;
}

/** 현재 진행 중인 회차(정각~다음 정각). 운영 시간 밖이면 null. */
export function currentSlotHour(now: Date): number | null {
  const { hour } = kstParts(now);
  return (SLOT_HOURS as readonly number[]).includes(hour) ? hour : null;
}

/** 접수번호 접두: 10/16=A, 10/17=B, 10/18=C, 그 외(리허설)=T. */
export function codePrefix(date: string): string {
  const idx = (EVENT_DATES as readonly string[]).indexOf(date);
  return idx >= 0 ? "ABC"[idx] : "T";
}

export function normalizePhone(raw: string): string {
  return (raw || "").replace(/\D/g, "");
}
export function isValidMobile(phone: string): boolean {
  return /^01[016789]\d{7,8}$/.test(phone);
}
export function formatPhone(phone: string): string {
  if (phone.length === 11) return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
  if (phone.length === 10) return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  return phone;
}

export const STATUS_LABEL: Record<RegStatus, string> = {
  pending: "승인 대기",
  approved: "회차 배정",
  checked_in: "입장 완료",
  no_show: "노쇼 해제",
  cancelled: "취소",
};

export interface ValidatedApplication {
  participants: Participant[];
  receipts: Receipt[];
  receiptTotal: number;
  partySize: number;
}

/** 접수 내용 검증 (클라이언트·서버 공용). 오류 메시지 또는 정제된 값. */
export function validateApplication(input: {
  participants: Participant[];
  receipts: Receipt[];
  guardianConsent: boolean;
}): { ok: true; value: ValidatedApplication } | { ok: false; error: string } {
  const receipts = (input.receipts || [])
    .map((r) => ({
      amount: Math.floor(Number(r.amount)),
      store: (r.store || "").trim().slice(0, 40) || null,
    }))
    .filter((r) => Number.isFinite(r.amount) && r.amount > 0);
  if (receipts.length === 0) return { ok: false, error: "영수증 금액을 입력해 주세요." };
  if (receipts.some((r) => r.amount > 10_000_000)) return { ok: false, error: "영수증 금액을 확인해 주세요." };
  const total = receiptTotal(receipts);
  const max = maxPartySize(total);
  if (max < 1) return { ok: false, error: `영수증 합계가 ${PRICE_UNIT.toLocaleString()}원 이상이어야 해요.` };

  const participants: Participant[] = [];
  for (const p of input.participants || []) {
    const name = (p.name || "").trim().slice(0, 30);
    const age = Number(p.age);
    if (!name) return { ok: false, error: "참여자 이름을 모두 입력해 주세요." };
    if (p.gender !== "남" && p.gender !== "여") return { ok: false, error: `${name}님의 성별을 선택해 주세요.` };
    if (!Number.isInteger(age) || age < 0 || age > 120) return { ok: false, error: `${name}님의 나이를 확인해 주세요.` };
    participants.push({ name, gender: p.gender, age });
  }
  if (participants.length < 1) return { ok: false, error: "참여자를 1명 이상 입력해 주세요." };
  if (participants.length > max) {
    return { ok: false, error: `영수증 합계 기준 최대 ${max}명까지 참여할 수 있어요.` };
  }
  if (participants.some((p) => (p.age ?? 99) < 14) && !input.guardianConsent) {
    return { ok: false, error: "만 14세 미만 참여자가 있어요. 법정대리인 동의에 체크해 주세요." };
  }
  return { ok: true, value: { participants, receipts, receiptTotal: total, partySize: participants.length } };
}

/** ISO 시각 → "10/16 14:03" (KST). */
export function formatKstTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = kstParts(d);
  const [, m, day] = p.date.split("-").map(Number);
  return `${m}/${day} ${String(p.hour).padStart(2, "0")}:${String(p.minute).padStart(2, "0")}`;
}

/** 승인 대기에서 인원 수정 시 참여자 목록 맞추기: 줄이면 뒤에서 자르고, 늘리면 '(현장추가)' 자리 채움. */
export function resizeParticipants(list: Participant[], size: number): Participant[] {
  const next = list.slice(0, size);
  while (next.length < size) next.push({ name: "(현장추가)", gender: null, age: null });
  return next;
}
