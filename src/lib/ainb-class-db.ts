import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { CLASS_EVENT } from "@/lib/ainb-class-config";

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

export interface ClassSignup {
  id: string;
  created_at: string;
  event: string;
  name: string;
  phone: string;
}

/**
 * 신청 저장. 같은 행사·같은 번호가 이미 있으면(unique 위반 23505)
 * 새 행을 만들지 않고 duplicate: true 를 돌려준다.
 */
export async function submitClass(input: { name: string; phone: string }): Promise<{ duplicate: boolean }> {
  const { error } = await db()
    .from("ainb_class_signups")
    .insert({ event: CLASS_EVENT, name: input.name, phone: input.phone });
  if (error) {
    if (error.code === "23505") return { duplicate: true };
    throw error;
  }
  return { duplicate: false };
}

export async function listClass(): Promise<ClassSignup[]> {
  const { data, error } = await db()
    .from("ainb_class_signups")
    .select("*")
    .eq("event", CLASS_EVENT)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ClassSignup[];
}
