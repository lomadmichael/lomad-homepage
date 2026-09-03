import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { TOUR_COHORT, TOURS } from "@/lib/ainb-tour-config";

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

export interface TourSignup {
  id: string;
  name: string;
  phone: string;
  tour_key: string;
  created_at: string;
  updated_at: string;
}

/** 투어별 신청 인원 */
export async function tourCounts(): Promise<Record<string, number>> {
  const { data, error } = await db()
    .from("ainb_tour_signups")
    .select("tour_key")
    .eq("cohort", TOUR_COHORT);
  if (error) throw error;
  const counts: Record<string, number> = {};
  for (const t of TOURS) counts[t.key] = 0;
  for (const row of data ?? []) {
    counts[row.tour_key as string] = (counts[row.tour_key as string] ?? 0) + 1;
  }
  return counts;
}

/** 전체 신청 내역 (관리자용) */
export async function listSignups(): Promise<TourSignup[]> {
  const { data, error } = await db()
    .from("ainb_tour_signups")
    .select("*")
    .eq("cohort", TOUR_COHORT)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as TourSignup[];
}

/** 이 사람이 이미 신청한 투어 */
export async function mySignup(phone: string): Promise<TourSignup | null> {
  const { data, error } = await db()
    .from("ainb_tour_signups")
    .select("*")
    .eq("cohort", TOUR_COHORT)
    .eq("phone", phone)
    .maybeSingle();
  if (error) throw error;
  return (data as TourSignup) ?? null;
}

export type SignupStatus = "created" | "changed" | "unchanged" | "full";

/** 정원을 넘기지 않도록 DB 함수로 원자적으로 등록한다. */
export async function signupTour(params: {
  name: string;
  phone: string;
  tourKey: string;
  capacity: number;
}): Promise<{ status: SignupStatus; taken: number }> {
  const { data, error } = await db().rpc("ainb_tour_signup", {
    p_cohort: TOUR_COHORT,
    p_name: params.name,
    p_phone: params.phone,
    p_tour: params.tourKey,
    p_capacity: params.capacity,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  return { status: row.status as SignupStatus, taken: row.taken as number };
}
