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

export const SURF_COHORT = "1기";

export type Experience = "none" | "beginner" | "experienced";
export type Gear = "suit" | "rashguard";

export const EXPERIENCE_LABEL: Record<Experience, string> = {
  none: "경험 없음",
  beginner: "초보 (1~3번)",
  experienced: "4번 이상",
};

export const GEAR_LABEL: Record<Gear, string> = {
  suit: "슈트 착용 희망",
  rashguard: "래쉬가드 착용",
};

export interface SurfSignup {
  id: string;
  name: string;
  phone: string;
  gender: string;
  height_cm: number;
  weight_kg: number;
  experience: Experience;
  gear: Gear;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface SurfInput {
  name: string;
  phone: string;
  gender: string;
  height_cm: number;
  weight_kg: number;
  experience: Experience;
  gear: Gear;
  note: string;
}

/** 같은 번호로 다시 제출하면 기존 내용을 갱신한다. */
export async function submitSurf(input: SurfInput): Promise<{ updated: boolean }> {
  const { data: prev } = await db()
    .from("ainb_surf_signups")
    .select("id")
    .eq("cohort", SURF_COHORT)
    .eq("phone", input.phone)
    .maybeSingle();

  const row = { cohort: SURF_COHORT, ...input, note: input.note || null, updated_at: new Date().toISOString() };
  const { error } = await db()
    .from("ainb_surf_signups")
    .upsert(row, { onConflict: "phone,cohort" });
  if (error) throw error;
  return { updated: !!prev };
}

export async function listSurf(): Promise<SurfSignup[]> {
  const { data, error } = await db()
    .from("ainb_surf_signups")
    .select("*")
    .eq("cohort", SURF_COHORT)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as SurfSignup[];
}
