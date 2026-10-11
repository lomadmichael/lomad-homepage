import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SESSIONS,
  PRE_CAPACITY,
  findSession,
  type FestecoSessionView,
} from "@/lib/festeco-config";

// 송이연어축제 생태탐방 전용 RPC(festeco_*) 래퍼. 정규 ecology-db.ts 와 같은 service-role 패턴.

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

export interface FestecoRegistrationRow {
  id: string;
  created_at: string;
  session_key: string;
  guardian_name: string;
  phone: string;
  adults: number;
  children: number;
  total: number;
  status: "confirmed" | "cancelled";
  consent_privacy: boolean;
  consent_notice: boolean;
  cancelled_at: string | null;
}
export interface FestecoSubmitInput {
  session_key: string;
  phone: string;
  guardian_name: string;
  adults: number;
  children: number;
  consent_privacy: boolean;
  consent_notice: boolean;
}
export type FestecoSubmitResult =
  | {
      ok: true;
      registration_id: string;
      session_key: string;
      adults: number;
      children: number;
      total: number;
    }
  | { ok: false; reason: "closed" | "duplicate" | "full"; remaining?: number };

/** 회차 상태 — 테이블에 없는 회차는 open, capacity null(=기본 정원). */
export interface FestecoSessionState {
  is_open: boolean;
  capacity: number | null;
}

/** 회차별 확정 인원(성인+어린이 합). */
export async function getBooked(): Promise<Record<string, number>> {
  const { data, error } = await db().rpc("festeco_availability");
  if (error) throw new Error(`festeco_availability: ${error.message}`);
  const m: Record<string, number> = {};
  for (const r of (data ?? []) as { session_key: string; booked: number }[]) {
    m[r.session_key] = Number(r.booked);
  }
  return m;
}
export async function getSessionStates(): Promise<Record<string, FestecoSessionState>> {
  const { data, error } = await db().rpc("festeco_session_states");
  if (error) throw new Error(`festeco_session_states: ${error.message}`);
  return (data ?? {}) as Record<string, FestecoSessionState>;
}

/** 회차 정원 = 관리자 오버라이드 ?? 기본 10. 현장접수 5명은 포함 안 함. */
export function effectiveCapacity(state: FestecoSessionState | undefined): number {
  const c = state?.capacity;
  return typeof c === "number" && Number.isFinite(c) ? c : PRE_CAPACITY;
}

/**
 * 회차 마감 판정 — 서버 시각(Date.now()) 기준. 클라이언트 시각은 믿지 않는다.
 * 마감 = 전날 18:00 경과 OR 관리자 마감 OR 잔여 0.
 */
export function sessionView(
  key: string,
  booked: Record<string, number>,
  states: Record<string, FestecoSessionState>,
  now: number = Date.now(),
): FestecoSessionView {
  const s = findSession(key);
  const st = states[key];
  const remaining = Math.max(0, effectiveCapacity(st) - (booked[key] ?? 0));
  const timeClosed = !s || now >= new Date(s.closesAt).getTime();
  const adminClosed = st?.is_open === false;
  return { remaining, closed: timeClosed || adminClosed || remaining === 0 };
}

/** 전 회차 표시 상태 한 번에. */
export async function getSessionViews(): Promise<Record<string, FestecoSessionView>> {
  const [booked, states] = await Promise.all([getBooked(), getSessionStates()]);
  const now = Date.now();
  const out: Record<string, FestecoSessionView> = {};
  for (const s of SESSIONS) out[s.key] = sessionView(s.key, booked, states, now);
  return out;
}

export async function submitRegistration(
  input: FestecoSubmitInput,
  capacity: number,
): Promise<FestecoSubmitResult> {
  const payload = { ...input, capacity };
  const { data, error } = await db().rpc("festeco_submit", { payload });
  if (error) throw new Error(`festeco_submit: ${error.message}`);
  return data as FestecoSubmitResult;
}
export async function lookupByPhone(phone: string): Promise<FestecoRegistrationRow[]> {
  const { data, error } = await db().rpc("festeco_lookup", { p_phone: phone });
  if (error) throw new Error(`festeco_lookup: ${error.message}`);
  return (data ?? []) as FestecoRegistrationRow[];
}
/** 본인 취소 — RPC 가 phone 일치 여부를 재확인. 반드시 OTP 로 검증된 번호를 넘길 것. */
export async function cancelRegistration(regId: string, phone: string): Promise<boolean> {
  const { data, error } = await db().rpc("festeco_cancel", {
    p_registration_id: regId,
    p_phone: phone,
  });
  if (error) throw new Error(`festeco_cancel: ${error.message}`);
  return data === true;
}
export async function adminList(): Promise<FestecoRegistrationRow[]> {
  const { data, error } = await db().rpc("festeco_admin_list");
  if (error) throw new Error(`festeco_admin_list: ${error.message}`);
  return (data ?? []) as FestecoRegistrationRow[];
}
/** 회차 오픈/마감 설정 (admin). */
export async function setSessionOpen(sessionKey: string, open: boolean): Promise<void> {
  const { error } = await db().rpc("festeco_set_session", {
    p_session_key: sessionKey,
    p_open: open,
  });
  if (error) throw new Error(`festeco_set_session: ${error.message}`);
}
/** 회차 정원 설정 (admin). */
export async function setSessionCapacity(sessionKey: string, capacity: number): Promise<void> {
  const { error } = await db().rpc("festeco_set_capacity", {
    p_session_key: sessionKey,
    p_capacity: capacity,
  });
  if (error) throw new Error(`festeco_set_capacity: ${error.message}`);
}

export async function otpSet(phone: string, codeHash: string, ttl: number): Promise<void> {
  const { error } = await db().rpc("festeco_otp_set", {
    p_phone: phone,
    p_code_hash: codeHash,
    p_ttl: ttl,
  });
  if (error) throw new Error(`festeco_otp_set: ${error.message}`);
}
export async function otpVerify(phone: string, codeHash: string): Promise<boolean> {
  const { data, error } = await db().rpc("festeco_otp_verify", {
    p_phone: phone,
    p_code_hash: codeHash,
  });
  if (error) throw new Error(`festeco_otp_verify: ${error.message}`);
  return data === true;
}

/** 서버 기준 현재 시각(ms) — 마감·취소 가능 여부 판정용. 클라이언트 시각은 쓰지 않는다. */
export function serverNow(): number {
  return Date.now();
}
