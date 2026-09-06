import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SURVEY_COHORT } from "@/lib/ainb-survey-config";

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

export interface SurveyResponse {
  id: string;
  name: string;
  ratings: Record<string, number>;
  overall: number;
  recommend: number | null;
  live_intent: number;
  live_reason: string | null;
  best: string | null;
  improve: string | null;
  advice: string | null;
  free_note: string | null;
  created_at: string;
}

export interface SurveyInput {
  name: string;
  ratings: Record<string, number>;
  overall: number;
  recommend: number | null;
  live_intent: number;
  live_reason: string;
  best: string;
  improve: string;
  advice: string;
  free_note: string;
}

export async function submitSurvey(input: SurveyInput): Promise<void> {
  const { error } = await db().from("ainb_survey_responses").insert({
    cohort: SURVEY_COHORT,
    name: input.name,
    ratings: input.ratings,
    overall: input.overall,
    recommend: input.recommend,
    live_intent: input.live_intent,
    live_reason: input.live_reason || null,
    best: input.best || null,
    improve: input.improve || null,
    advice: input.advice || null,
    free_note: input.free_note || null,
  });
  if (error) throw error;
}

export async function listSurvey(): Promise<SurveyResponse[]> {
  const { data, error } = await db()
    .from("ainb_survey_responses")
    .select("*")
    .eq("cohort", SURVEY_COHORT)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as SurveyResponse[];
}

/** 평균과 만족(4~5점) 비율 */
export function summarize(values: number[]): { avg: number; satisfied: number; n: number } {
  const n = values.length;
  if (!n) return { avg: 0, satisfied: 0, n: 0 };
  const avg = values.reduce((a, b) => a + b, 0) / n;
  const satisfied = (values.filter((v) => v >= 4).length / n) * 100;
  return { avg: Math.round(avg * 100) / 100, satisfied: Math.round(satisfied), n };
}
