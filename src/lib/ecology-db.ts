import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

export interface EcologyChild {
  name: string;
  age: number;
}
export interface EcologyRegistrationRow {
  id: string;
  created_at: string;
  guardian_name: string;
  phone: string;
  session_key: string;
  status: "confirmed" | "waitlist" | "cancelled";
  note: string | null;
  children: EcologyChild[];
}
export interface EcologyAvailabilityRow {
  session_key: string;
  confirmed: number;
  waitlist: number;
}
export interface EcologySubmitInput {
  guardian_name: string;
  phone: string;
  session_key: string;
  note: string;
  children: EcologyChild[];
}
export interface EcologySubmitResult {
  registration_id: string;
  status: "confirmed" | "waitlist";
  session_key: string;
}
export interface EcologyPromoted {
  phone: string;
  name: string;
  session_key: string;
}
export interface EcologyCancelResult {
  cancelled: boolean;
  promoted: EcologyPromoted[];
}

export async function getAvailability(): Promise<EcologyAvailabilityRow[]> {
  const { data, error } = await db().rpc("ecology_availability");
  if (error) throw new Error(`ecology_availability: ${error.message}`);
  return (data ?? []).map(
    (r: { session_key: string; confirmed: number; waitlist: number }) => ({
      session_key: r.session_key,
      confirmed: Number(r.confirmed),
      waitlist: Number(r.waitlist),
    }),
  );
}
export function availabilityMap(
  rows: EcologyAvailabilityRow[],
): Record<string, { confirmed: number; waitlist: number }> {
  const m: Record<string, { confirmed: number; waitlist: number }> = {};
  for (const r of rows) m[r.session_key] = { confirmed: r.confirmed, waitlist: r.waitlist };
  return m;
}
export async function submitRegistration(
  input: EcologySubmitInput,
  capacity: number,
): Promise<EcologySubmitResult> {
  const payload = { ...input, capacity };
  const { data, error } = await db().rpc("ecology_submit", { payload });
  if (error) throw new Error(`ecology_submit: ${error.message}`);
  return data as EcologySubmitResult;
}
export async function lookupByPhone(phone: string): Promise<EcologyRegistrationRow[]> {
  const { data, error } = await db().rpc("ecology_lookup", { p_phone: phone });
  if (error) throw new Error(`ecology_lookup: ${error.message}`);
  return (data ?? []) as EcologyRegistrationRow[];
}
export async function cancelRegistration(regId: string): Promise<EcologyCancelResult> {
  const { data, error } = await db().rpc("ecology_cancel", { p_registration_id: regId });
  if (error) throw new Error(`ecology_cancel: ${error.message}`);
  return data as EcologyCancelResult;
}
export async function adminList(): Promise<EcologyRegistrationRow[]> {
  const { data, error } = await db().rpc("ecology_admin_list");
  if (error) throw new Error(`ecology_admin_list: ${error.message}`);
  return (data ?? []) as EcologyRegistrationRow[];
}
export async function otpSet(phone: string, codeHash: string, ttl: number): Promise<void> {
  const { error } = await db().rpc("ecology_otp_set", {
    p_phone: phone,
    p_code_hash: codeHash,
    p_ttl: ttl,
  });
  if (error) throw new Error(`ecology_otp_set: ${error.message}`);
}
export async function otpVerify(phone: string, codeHash: string): Promise<boolean> {
  const { data, error } = await db().rpc("ecology_otp_verify", {
    p_phone: phone,
    p_code_hash: codeHash,
  });
  if (error) throw new Error(`ecology_otp_verify: ${error.message}`);
  return data === true;
}
