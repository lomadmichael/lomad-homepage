import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

let _client: SupabaseClient | null = null;
function db(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

/* ── 주민등록번호 암·복호화 (AES-256-GCM) ─────────────────────────────
   평문은 DB 에 절대 저장하지 않는다. 키는 32바이트 hex(64자) 환경변수.
   생성:  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"        */
function encKey(): Buffer {
  const hex = (process.env.AINB_ENC_KEY || "").trim();
  if (!/^[0-9a-fA-F]{64}$/.test(hex)) {
    throw new Error("AINB_ENC_KEY 미설정 또는 형식 오류 (32바이트 hex 64자)");
  }
  return Buffer.from(hex, "hex");
}

export function encryptRrn(plain: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", encKey(), iv);
  const enc = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return [iv.toString("base64"), c.getAuthTag().toString("base64"), enc.toString("base64")].join(":");
}

export function decryptRrn(payload: string | null): string {
  if (!payload) return "";
  const [ivB64, tagB64, dataB64] = payload.split(":");
  if (!ivB64 || !tagB64 || !dataB64) return "";
  try {
    const d = createDecipheriv("aes-256-gcm", encKey(), Buffer.from(ivB64, "base64"));
    d.setAuthTag(Buffer.from(tagB64, "base64"));
    return Buffer.concat([d.update(Buffer.from(dataB64, "base64")), d.final()]).toString("utf8");
  } catch {
    return "(복호화 실패)";
  }
}

/* ── 타입 ────────────────────────────────────────────────────────── */
export type Cohort = "1기" | "2기";

export interface ConsentInput {
  cohort: Cohort;
  name: string;
  phone: string;
  email: string;
  insured_name: string;
  address: string;
  rrn: string;
  refund_account: string;
  consent_privacy: boolean;
  consent_program: boolean;
  consent_insurance: boolean;
  consent_media: boolean;
  consent_refund: boolean;
  consent_selfrisk: boolean;
  consent_rules: boolean;
  note: string;
}

export interface ConsentRow {
  id: string;
  created_at: string;
  updated_at: string;
  cohort: Cohort;
  name: string;
  phone: string;
  email: string | null;
  insured_name: string;
  address: string;
  rrn_enc: string | null;
  rrn_purged_at: string | null;
  refund_account: string;
  consent_privacy: boolean;
  consent_program: boolean;
  consent_insurance: boolean;
  consent_media: boolean;
  consent_refund: boolean;
  consent_selfrisk: boolean;
  consent_rules: boolean;
  note: string | null;
}

/* ── 제출 (같은 번호로 다시 내면 덮어쓴다 = 수정 제출) ───────────────── */
export async function submitConsent(input: ConsentInput): Promise<{ updated: boolean }> {
  const row = {
    cohort: input.cohort,
    name: input.name,
    phone: input.phone,
    email: input.email || null,
    insured_name: input.insured_name,
    address: input.address,
    rrn_enc: input.rrn ? encryptRrn(input.rrn) : null,
    rrn_purged_at: null,
    refund_account: input.refund_account,
    consent_privacy: input.consent_privacy,
    consent_program: input.consent_program,
    consent_insurance: input.consent_insurance,
    consent_media: input.consent_media,
    consent_refund: input.consent_refund,
    consent_selfrisk: input.consent_selfrisk,
    consent_rules: input.consent_rules,
    note: input.note || null,
  };

  const { data: existing } = await db()
    .from("ainb_consents")
    .select("id")
    .eq("phone", input.phone)
    .eq("cohort", input.cohort)
    .maybeSingle();

  if (existing?.id) {
    const { error } = await db().from("ainb_consents").update(row).eq("id", existing.id);
    if (error) throw new Error(`동의서 수정 실패: ${error.message}`);
    return { updated: true };
  }
  const { error } = await db().from("ainb_consents").insert(row);
  if (error) throw new Error(`동의서 저장 실패: ${error.message}`);
  return { updated: false };
}

/* ── 관리자 조회 ─────────────────────────────────────────────────── */
export async function listConsents(): Promise<ConsentRow[]> {
  const { data, error } = await db()
    .from("ainb_consents")
    .select("*")
    .order("cohort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`목록 조회 실패: ${error.message}`);
  return (data ?? []) as ConsentRow[];
}

/** 보험 가입 완료 후 주민등록번호 일괄 파기. ids 를 주지 않으면 전건. */
export async function purgeRrn(ids?: string[]): Promise<number> {
  const { data, error } = await db().rpc("ainb_purge_rrn", { p_ids: ids ?? null });
  if (error) throw new Error(`파기 실패: ${error.message}`);
  return Number(data ?? 0);
}
