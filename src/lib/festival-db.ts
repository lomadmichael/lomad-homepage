import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildCapacities } from "@/lib/festival-experiences";

/**
 * 현남생활 페스티벌 전용 Supabase 접근 계층 (forma 프로젝트, service_role).
 *
 * 모든 데이터 접근은 public.festival_* security-definer 함수(RPC)로만 한다.
 * festival 스키마 테이블은 API에 노출되지 않으며(완전 격리), service_role 키는
 * 서버에서만 사용한다(`server-only` import 로 클라이언트 번들 유입 차단).
 */

let _client: SupabaseClient | null = null;

function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 설정되지 않았습니다. (.env.local + Vercel)",
    );
  }
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

// ─── 타입 ────────────────────────────────────────────────
export interface AvailabilityRow {
  experience_key: string;
  time_slot: string | null;
  confirmed: number;
  waitlist: number;
}

export interface SignupRow {
  id: string;
  experience_key: string;
  time_slot: string | null;
  status: "confirmed" | "waitlist" | "cancelled";
}

export interface ParticipantRow {
  id: string;
  name: string;
  age: number;
  signups: SignupRow[];
}

export interface RegistrationRow {
  id: string;
  created_at: string;
  rep_name: string;
  phone: string;
  region: string;
  camping: "deck" | "noji" | null;
  camping_status: "confirmed" | "waitlist" | "cancelled" | null;
  tent_rental: boolean;
  note: string | null;
  participants: ParticipantRow[];
}

export interface SubmitInput {
  rep_name: string;
  phone: string;
  region: string;
  camping: "deck" | "noji" | null;
  tent_rental: boolean;
  note: string;
  participants: {
    name: string;
    age: number;
    experiences: { key: string; slot: string | null }[];
  }[];
}

export interface SubmitResult {
  registration_id: string;
  confirmed: { participant: string; key: string; slot: string | null }[];
  waitlisted: { participant: string; key: string; slot: string | null }[];
  camping: { type: string; status: "confirmed" | "waitlist" } | null;
}

export interface CancelResult {
  cancelled: boolean;
  promoted: { phone: string; name: string; key: string; slot: string | null } | null;
}

// ─── RPC 래퍼 ────────────────────────────────────────────
export async function getAvailability(): Promise<AvailabilityRow[]> {
  const { data, error } = await db().rpc("festival_get_availability");
  if (error) throw new Error(`get_availability: ${error.message}`);
  return (data ?? []) as AvailabilityRow[];
}

export async function submitRegistration(input: SubmitInput): Promise<SubmitResult> {
  const payload = { ...input, capacities: buildCapacities() };
  const { data, error } = await db().rpc("festival_submit", { payload });
  if (error) throw new Error(`submit: ${error.message}`);
  return data as SubmitResult;
}

export async function cancelSignup(signupId: string): Promise<CancelResult> {
  const { data, error } = await db().rpc("festival_cancel", { p_signup_id: signupId });
  if (error) throw new Error(`cancel: ${error.message}`);
  return data as CancelResult;
}

/** 캠핑 신청 취소 (등록 단위). 캠핑은 자동 승급이 없어 관리자 수동 처리. */
export async function cancelCamping(regId: string): Promise<{ cancelled: boolean; camping?: string }> {
  const { data, error } = await db().rpc("festival_cancel_camping", { p_reg_id: regId });
  if (error) throw new Error(`cancel_camping: ${error.message}`);
  return data as { cancelled: boolean; camping?: string };
}

export async function lookupByPhone(phone: string): Promise<RegistrationRow[]> {
  const { data, error } = await db().rpc("festival_lookup", { p_phone: phone });
  if (error) throw new Error(`lookup: ${error.message}`);
  return (data ?? []) as RegistrationRow[];
}

export async function adminList(): Promise<RegistrationRow[]> {
  const { data, error } = await db().rpc("festival_admin_list");
  if (error) throw new Error(`admin_list: ${error.message}`);
  return (data ?? []) as RegistrationRow[];
}

export async function otpSet(phone: string, codeHash: string, ttlSeconds: number): Promise<void> {
  const { error } = await db().rpc("festival_otp_set", {
    p_phone: phone,
    p_code_hash: codeHash,
    p_ttl: ttlSeconds,
  });
  if (error) throw new Error(`otp_set: ${error.message}`);
}

export async function otpVerify(phone: string, codeHash: string): Promise<boolean> {
  const { data, error } = await db().rpc("festival_otp_verify", {
    p_phone: phone,
    p_code_hash: codeHash,
  });
  if (error) throw new Error(`otp_verify: ${error.message}`);
  return data === true;
}

/** 가용 현황을 (key 또는 key|slot) → {confirmed, waitlist} 맵으로 변환. 캠핑은 camping_deck/noji 키. */
export function availabilityMap(rows: AvailabilityRow[]): Record<string, { confirmed: number; waitlist: number }> {
  const map: Record<string, { confirmed: number; waitlist: number }> = {};
  for (const r of rows) {
    const k = r.time_slot ? `${r.experience_key}|${r.time_slot}` : r.experience_key;
    map[k] = { confirmed: Number(r.confirmed), waitlist: Number(r.waitlist) };
  }
  return map;
}
