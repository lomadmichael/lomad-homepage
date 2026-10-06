import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Participant, Receipt, RegStatus } from "@/lib/customhouse-config";

// forma Supabase. 데이터는 비공개 스키마 customhouse, 접근은 public.customhouse_* RPC 로만.
// (SQL: supabase/customhouse.sql)

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = (process.env.SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await db().rpc(fn, args);
  if (error) throw new Error(`${fn}: ${error.message}`);
  return data as T;
}

export interface Registration {
  id: string;
  created_at: string;
  code: string;
  phone: string;
  rep_name: string;
  participants: Participant[];
  party_size: number;
  receipts: Receipt[];
  receipt_total: number;
  status: RegStatus;
  slot_date: string | null;
  slot_hour: number | null;
  approved_at: string | null;
  checked_in_at: string | null;
  reminder_group_id: string | null;
  consent_at: string;
  guardian_consent: boolean;
  via: "self" | "proxy";
  note: string | null;
}

// ── OTP ──
export type OtpRequestResult = { ok: true } | { ok: false; reason: "cooldown" | "hourly"; retry_after: number };
export async function otpRequest(p: {
  phone: string;
  codeHash: string;
  ttl: number;
  cooldown: number;
  maxPerHour: number;
}): Promise<OtpRequestResult> {
  return rpc<OtpRequestResult>("customhouse_otp_request", {
    p_phone: p.phone,
    p_code_hash: p.codeHash,
    p_ttl: p.ttl,
    p_cooldown: p.cooldown,
    p_max_per_hour: p.maxPerHour,
  });
}
export type OtpVerifyResult = "ok" | "none" | "expired" | "locked" | "invalid";
export async function otpVerify(phone: string, codeHash: string, maxAttempts: number): Promise<OtpVerifyResult> {
  return rpc<OtpVerifyResult>("customhouse_otp_verify", {
    p_phone: phone,
    p_code_hash: codeHash,
    p_max_attempts: maxAttempts,
  });
}

// ── 조회 ──
export async function getRegistration(id: string): Promise<Registration | null> {
  return (await rpc<Registration | null>("customhouse_get", { p_id: id })) ?? null;
}
export async function findActiveByPhone(phone: string): Promise<Registration | null> {
  return (await rpc<Registration | null>("customhouse_find_active", { p_phone: phone })) ?? null;
}
export async function adminList(): Promise<Registration[]> {
  return (await rpc<Registration[]>("customhouse_admin_list")) ?? [];
}
/** 날짜별 회차 좌석 맵 { hour: seats } */
export async function getSeats(date: string): Promise<Record<number, number>> {
  const rows = (await rpc<{ slot_hour: number; seats: number }[]>("customhouse_seats", { p_date: date })) ?? [];
  const m: Record<number, number> = {};
  for (const r of rows) if (r.slot_hour != null) m[Number(r.slot_hour)] = Number(r.seats);
  return m;
}

// ── 접수 ──
export type SubmitResult = { ok: true; id: string; code: string } | { ok: false; reason: "duplicate"; id: string };
export async function submitRegistration(payload: {
  phone: string;
  rep_name: string;
  participants: Participant[];
  party_size: number;
  receipts: Receipt[];
  receipt_total: number;
  code_prefix: string;
  guardian_consent: boolean;
  via: "self" | "proxy";
}): Promise<SubmitResult> {
  return rpc<SubmitResult>("customhouse_submit", { payload });
}

export type SimpleResult = { ok: true } | { ok: false; reason: string };
export async function updatePending(p: {
  id: string;
  receipts: Receipt[];
  receiptTotal: number;
  partySize: number;
  participants: Participant[];
}): Promise<SimpleResult> {
  return rpc<SimpleResult>("customhouse_update_pending", {
    p_id: p.id,
    p_receipts: p.receipts,
    p_receipt_total: p.receiptTotal,
    p_party_size: p.partySize,
    p_participants: p.participants,
  });
}

export type AssignResult =
  | {
      ok: true;
      prev_date: string | null;
      prev_hour: number | null;
      prev_status: RegStatus;
      reminder_group_id: string | null;
      seats_after: number;
    }
  | { ok: false; reason: "not_found" | "status_changed" | "full"; seats?: number; capacity?: number; status?: string };
export async function assignSlot(p: {
  id: string;
  date: string;
  hour: number;
  capacity: number;
  allowed: RegStatus[];
}): Promise<AssignResult> {
  return rpc<AssignResult>("customhouse_assign", {
    p_id: p.id,
    p_date: p.date,
    p_hour: p.hour,
    p_capacity: p.capacity,
    p_allowed: p.allowed,
  });
}

export type StatusResult = { ok: true; reminder_group_id: string | null } | { ok: false; reason: string; status?: string };
export async function setStatus(id: string, status: RegStatus): Promise<StatusResult> {
  return rpc<StatusResult>("customhouse_set_status", { p_id: id, p_status: status });
}
export async function setReminderGroup(id: string, groupId: string | null): Promise<void> {
  await rpc<null>("customhouse_set_reminder", { p_id: id, p_group_id: groupId });
}
