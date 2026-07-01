# 남대천 생태체험 자체 접수 시스템 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 구글폼을 대체하는 자체 접수 시스템을 `lomad-homepage`에 내장한다 — 접수/대기/취소/본인조회(OTP)/관리자 명단 + 알림톡(미승인 시 SMS 자동 대체) + 전날 리마인더.

**Architecture:** 기존 현남 페스티벌 접수 스택을 이식한다. forma Supabase(`inzedtnpbwxwihlvsvhl`)에 격리 `ecology` 스키마 + `SECURITY DEFINER` RPC(공개 `ecology_*`), `src/lib/solapi.ts`·OTP 서명 패턴 재사용, Next 서버 액션. 정원=회차당 어린이 12명, **전부-아니면-대기**, 취소 시 대기 자동 승급. 동시성은 `pg_advisory_xact_lock(hashtext('ecology:'||session_key))`로 회차 단위 직렬화.

**Tech Stack:** Next 16.2.2 (App Router, server actions), React 19 (`useActionState`), Supabase JS(service_role, `server-only`), SOLAPI, Tailwind v4(사이트 폼 토큰).

> **테스트 정책 (이 코드베이스에 맞춘 TDD 적응):** 이 프로젝트엔 테스트 프레임워크가 없다(package.json 확인). 따라서 각 태스크 검증은 (1) SQL RPC → `execute_sql`로 시나리오 검증, (2) TypeScript → `npm run build`(=`next build`) 통과 + 프리뷰 런타임 확인으로 대신한다. 테스트 러너를 새로 설치하지 않는다(YAGNI).

> **경로 주의:** Bash 도구의 cwd는 `C:\Users\hongk\Desktop\ClaudeCode`. lomad-homepage 명령은 `cd lomad-homepage && ...` 로 실행. 모든 파일 경로는 `lomad-homepage/` 기준.

> **참조 원본(그대로 읽어 패턴 복제):** `src/lib/festival-db.ts`, `src/lib/festival-otp.ts`, `src/lib/festival-sms.ts`, `src/lib/solapi.ts`, `src/app/projects/hyeonnam-festival/register/page.tsx`, `.../my/{page.tsx,OtpGate.tsx,actions.ts}`, `.../admin/{page.tsx,AdminLogin.tsx,actions.ts}`.

---

## 파일 구조

| 파일 | 책임 |
|---|---|
| (Supabase) `ecology` 스키마 + RPC | 데이터·정원·대기·승급·OTP (격리) |
| `src/lib/ecology-config.ts` | 오픈 플래그·회차 5개·정원·장소 상수 |
| `src/lib/ecology-templates.ts` (재작성) | 회차 라벨 헬퍼 (7-8월) |
| `src/lib/ecology-sms.ts` (신규) | 접수확정/대기/승급/OTP/리마인더 발송 함수 |
| `src/lib/ecology-db.ts` (신규) | RPC 래퍼 + 타입 |
| `src/lib/ecology-otp.ts` (신규) | OTP 해시/세션 서명 (ECOLOGY_OTP_SECRET) |
| `src/lib/ecology-action.ts` (신규) | 접수 서버 액션 |
| `src/components/projects/ecology/RegisterForm.tsx` (신규) | 접수 폼(클라이언트) |
| `src/app/ecology/register/page.tsx` (신규) | 접수 페이지(서버) |
| `src/app/ecology/my/{page.tsx,OtpGate.tsx,actions.ts}` (신규) | 본인조회·취소 |
| `src/app/ecology/admin/{page.tsx,AdminLogin.tsx,actions.ts}` (신규) | 관리자 명단 |
| `src/app/ecology/admin/export/route.ts` (신규) | CSV export |
| `src/app/api/ecology/cron/reminder/route.ts` (신규) | 전날 리마인더 cron |
| `vercel.json` (수정) | crons 추가 |
| `src/components/projects/EcologyWetlandWater.tsx` (수정) | CTA → /ecology/register |
| `src/app/api/ecology/registered/route.ts` (삭제) | 구 FormPay 웹훅 폐기 |

---

## Task 1: Supabase `ecology` 스키마 + RPC

**Files:**
- Supabase 프로젝트 `inzedtnpbwxwihlvsvhl` (MCP `apply_migration`)

- [ ] **Step 1: 스키마·테이블 마이그레이션 적용**

MCP `apply_migration`, name=`ecology_schema_init`:

```sql
create schema if not exists ecology;

create table if not exists ecology.registration (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guardian_name text not null,
  phone text not null,
  session_key text not null,
  status text not null default 'confirmed' check (status in ('confirmed','waitlist','cancelled')),
  note text,
  cancelled_at timestamptz
);
create index if not exists idx_ecology_reg_session on ecology.registration(session_key, status);
create index if not exists idx_ecology_reg_phone on ecology.registration(phone);

create table if not exists ecology.child (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references ecology.registration(id) on delete cascade,
  name text not null,
  age int not null
);
create index if not exists idx_ecology_child_reg on ecology.child(registration_id);

create table if not exists ecology.otp (
  phone text primary key,
  code_hash text not null,
  expires_at timestamptz not null
);
```

- [ ] **Step 2: `ecology_availability` RPC 적용**

MCP `apply_migration`, name=`ecology_rpc_availability`:

```sql
create or replace function public.ecology_availability()
returns table(session_key text, confirmed int, waitlist int)
language sql security definer set search_path to '' as $$
  select r.session_key,
         coalesce(sum(case when r.status='confirmed' then cc.n else 0 end),0)::int,
         coalesce(sum(case when r.status='waitlist'  then cc.n else 0 end),0)::int
  from ecology.registration r
  join lateral (select count(*)::int n from ecology.child c where c.registration_id = r.id) cc on true
  where r.status in ('confirmed','waitlist')
  group by r.session_key;
$$;
```

- [ ] **Step 3: `ecology_submit` RPC 적용 (전부-아니면-대기 + 회차 락)**

MCP `apply_migration`, name=`ecology_rpc_submit`:

```sql
create or replace function public.ecology_submit(payload jsonb)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare
  v_reg_id uuid;
  v_session text := payload->>'session_key';
  v_cap int := coalesce((payload->>'capacity')::int, 12);
  v_children jsonb := coalesce(payload->'children','[]'::jsonb);
  v_nchild int := jsonb_array_length(v_children);
  v_cur int;
  v_status text;
  v_child jsonb;
begin
  if v_session is null or v_nchild = 0 then
    raise exception 'invalid payload';
  end if;

  perform pg_advisory_xact_lock(hashtext('ecology:' || v_session));

  select count(*) into v_cur
  from ecology.child c
  join ecology.registration r on r.id = c.registration_id
  where r.session_key = v_session and r.status = 'confirmed';

  if v_cur + v_nchild <= v_cap then v_status := 'confirmed'; else v_status := 'waitlist'; end if;

  insert into ecology.registration(guardian_name, phone, session_key, status, note)
  values (payload->>'guardian_name', payload->>'phone', v_session, v_status, nullif(payload->>'note',''))
  returning id into v_reg_id;

  for v_child in select * from jsonb_array_elements(v_children)
  loop
    insert into ecology.child(registration_id, name, age)
    values (v_reg_id, v_child->>'name', (v_child->>'age')::int);
  end loop;

  return jsonb_build_object('registration_id', v_reg_id, 'status', v_status, 'session_key', v_session);
end;
$$;
```

- [ ] **Step 4: `ecology_cancel` RPC 적용 (다중 대기 승급)**

MCP `apply_migration`, name=`ecology_rpc_cancel`:

```sql
create or replace function public.ecology_cancel(p_registration_id uuid)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare
  v_session text; v_old text; v_cap int := 12; v_cur int;
  v_promo_id uuid; v_promo_name text; v_promo_phone text;
  v_promoted jsonb := '[]'::jsonb;
begin
  select session_key, status into v_session, v_old
  from ecology.registration where id = p_registration_id for update;

  if not found or v_old not in ('confirmed','waitlist') then
    return jsonb_build_object('cancelled', false, 'promoted', '[]'::jsonb);
  end if;

  update ecology.registration set status = 'cancelled', cancelled_at = now()
  where id = p_registration_id;

  if v_old = 'confirmed' then
    perform pg_advisory_xact_lock(hashtext('ecology:' || v_session));
    loop
      select count(*) into v_cur
      from ecology.child c
      join ecology.registration r on r.id = c.registration_id
      where r.session_key = v_session and r.status = 'confirmed';

      select r.id, r.guardian_name, r.phone into v_promo_id, v_promo_name, v_promo_phone
      from ecology.registration r
      where r.session_key = v_session and r.status = 'waitlist'
        and (select count(*) from ecology.child c where c.registration_id = r.id) <= (v_cap - v_cur)
      order by r.created_at asc
      limit 1
      for update;

      exit when not found;

      update ecology.registration set status = 'confirmed' where id = v_promo_id;
      v_promoted := v_promoted || jsonb_build_object(
        'phone', v_promo_phone, 'name', v_promo_name, 'session_key', v_session);
    end loop;
  end if;

  return jsonb_build_object('cancelled', true, 'promoted', v_promoted);
end;
$$;
```

- [ ] **Step 5: `ecology_lookup` / `ecology_admin_list` RPC 적용**

MCP `apply_migration`, name=`ecology_rpc_lookup`:

```sql
create or replace function public.ecology_lookup(p_phone text)
returns jsonb language sql security definer set search_path to '' as $$
  select coalesce(jsonb_agg(x order by x->>'created_at' desc), '[]'::jsonb) from (
    select jsonb_build_object(
      'id', r.id, 'created_at', r.created_at, 'guardian_name', r.guardian_name,
      'phone', r.phone, 'session_key', r.session_key, 'status', r.status, 'note', r.note,
      'children', coalesce((select jsonb_agg(jsonb_build_object('name', c.name, 'age', c.age))
                            from ecology.child c where c.registration_id = r.id), '[]'::jsonb)
    ) as x
    from ecology.registration r
    where r.phone = p_phone and r.status <> 'cancelled'
  ) s;
$$;

create or replace function public.ecology_admin_list()
returns jsonb language sql security definer set search_path to '' as $$
  select coalesce(jsonb_agg(x order by x->>'session_key', x->>'created_at'), '[]'::jsonb) from (
    select jsonb_build_object(
      'id', r.id, 'created_at', r.created_at, 'guardian_name', r.guardian_name,
      'phone', r.phone, 'session_key', r.session_key, 'status', r.status, 'note', r.note,
      'children', coalesce((select jsonb_agg(jsonb_build_object('name', c.name, 'age', c.age))
                            from ecology.child c where c.registration_id = r.id), '[]'::jsonb)
    ) as x
    from ecology.registration r
    where r.status <> 'cancelled'
  ) s;
$$;
```

- [ ] **Step 6: `ecology_otp_set` / `ecology_otp_verify` RPC 적용**

MCP `apply_migration`, name=`ecology_rpc_otp`:

```sql
create or replace function public.ecology_otp_set(p_phone text, p_code_hash text, p_ttl int)
returns void language sql security definer set search_path to '' as $$
  insert into ecology.otp(phone, code_hash, expires_at)
  values (p_phone, p_code_hash, now() + make_interval(secs => p_ttl))
  on conflict (phone) do update set code_hash = excluded.code_hash, expires_at = excluded.expires_at;
$$;

create or replace function public.ecology_otp_verify(p_phone text, p_code_hash text)
returns boolean language plpgsql security definer set search_path to '' as $$
declare v_ok boolean := false;
begin
  delete from ecology.otp where phone = p_phone and code_hash = p_code_hash and expires_at > now()
  returning true into v_ok;
  return coalesce(v_ok, false);
end;
$$;
```

- [ ] **Step 7: RPC 정원/대기/승급 시나리오 검증 (execute_sql)**

`execute_sql`로 실행하고 결과를 눈으로 확인한다:

```sql
-- 12명 채우기: 어린이 10명 confirmed
select public.ecology_submit('{"guardian_name":"테스트A","phone":"01000000001","session_key":"2026-07-11","capacity":12,"children":[{"name":"a1","age":8},{"name":"a2","age":9},{"name":"a3","age":8},{"name":"a4","age":9},{"name":"a5","age":8},{"name":"a6","age":9},{"name":"a7","age":8},{"name":"a8","age":9},{"name":"a9","age":8},{"name":"a10","age":9}]}'::jsonb);
-- 남은 2석에 어린이 3명 → 전부-아니면-대기 => waitlist
select public.ecology_submit('{"guardian_name":"테스트B","phone":"01000000002","session_key":"2026-07-11","capacity":12,"children":[{"name":"b1","age":8},{"name":"b2","age":9},{"name":"b3","age":8}]}'::jsonb);
select * from public.ecology_availability() where session_key='2026-07-11';   -- confirmed 10, waitlist 3
-- A 취소 → 10석 반환 → B(3명) 자동 승급
select public.ecology_cancel((select id from ecology.registration where guardian_name='테스트A'));
select * from public.ecology_availability() where session_key='2026-07-11';   -- confirmed 3, waitlist 0
-- 정리
delete from ecology.registration where session_key='2026-07-11';
```

기대: availability가 (10,3) → 취소 후 (3,0). 어긋나면 RPC 수정 후 재검증.

- [ ] **Step 8: 커밋 (마이그레이션은 Supabase에 적용됨 — 코드 변경 없음, 다음 태스크부터 커밋)**

Supabase 마이그레이션은 원격 반영 완료. 별도 git 커밋 없음.

---

## Task 2: `ecology-config.ts`

**Files:**
- Create: `lomad-homepage/src/lib/ecology-config.ts`

- [ ] **Step 1: 설정 파일 작성**

```ts
// 남대천 생태체험 자체 접수 설정.
// 회차가 바뀌면 SESSIONS/PLACE만 갱신하고 SUBMISSIONS_OPEN 토글.

/** true 로 바꾸면 접수 페이지 폼 + 서버 액션이 열린다. 오픈 시 이 값만 바꾸고 배포. */
export const SUBMISSIONS_OPEN = false;

/** 회차당 어린이 정원. */
export const CAPACITY = 12;

/** 집결지 / 체험지 / 문의. */
export const PLACE = "양양군 평생학습관 (양양읍 안산1길 36)";
export const EXPERIENCE_SITE = "남대천 (양양군 서면 용천리 일원)";
export const INQUIRY_TEL = "010-9542-3775";

export interface EcologySession {
  key: string;   // ecology_submit/lookup 의 session_key
  label: string; // 사람이 읽는 일시
}

export const SESSIONS: EcologySession[] = [
  { key: "2026-07-11", label: "7월 11일(토) 오전 10:00–12:00" },
  { key: "2026-07-18", label: "7월 18일(토) 오전 10:00–12:00" },
  { key: "2026-07-25", label: "7월 25일(토) 오전 10:00–12:00" },
  { key: "2026-08-01", label: "8월 1일(토) 오전 10:00–12:00" },
  { key: "2026-08-08", label: "8월 8일(토) 오전 10:00–12:00" },
];

export function sessionLabel(key: string): string {
  return SESSIONS.find((s) => s.key === key)?.label ?? key;
}
```

- [ ] **Step 2: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 컴파일 성공(아직 미사용 export 경고 없음 — export라 OK).

- [ ] **Step 3: 커밋**

```bash
git -C lomad-homepage add src/lib/ecology-config.ts
git -C lomad-homepage commit -m "feat(ecology): 접수 설정(회차·정원·장소) 추가"
```

---

## Task 3: `ecology-templates.ts` 재작성 + `ecology-sms.ts`

**Files:**
- Modify(재작성): `lomad-homepage/src/lib/ecology-templates.ts`
- Create: `lomad-homepage/src/lib/ecology-sms.ts`

- [ ] **Step 1: `ecology-templates.ts` 전체 교체 (5·6월 잔재 제거, 헬퍼만 유지)**

```ts
// 남대천 생태체험 알림톡/문자 라벨 헬퍼.
// 실제 발송 함수는 ecology-sms.ts. 알림톡 템플릿 미승인 상태라 현재는 전부 SMS fallback.
export { sessionLabel } from "@/lib/ecology-config";
```

- [ ] **Step 2: `ecology-sms.ts` 작성 (festival-sms.ts 패턴)**

```ts
import "server-only";
import { sendAlimtalk } from "@/lib/solapi";
import { PLACE, EXPERIENCE_SITE, INQUIRY_TEL, sessionLabel } from "@/lib/ecology-config";

const HEAD = "[로마드협동조합] 남대천 생태체험";

/** 접수 확정/대기 안내 문자. */
export async function sendApplicationSms(params: {
  phone: string; guardianName: string; sessionKey: string; status: "confirmed" | "waitlist";
}) {
  const when = sessionLabel(params.sessionKey);
  const body = params.status === "confirmed"
    ? `${HEAD}\n${params.guardianName}님, 「물속 생물 이야기」 접수가 확정되었습니다.\n\n일시: ${when}\n집결: ${PLACE}\n체험: ${EXPERIENCE_SITE}\n\n물놀이 복장·물에서 신을 신발·수건·여벌 옷·물병을 챙겨오세요. 화장실/샤워/탈의 시설이 충분하지 않을 수 있습니다.\n문의: ${INQUIRY_TEL}`
    : `${HEAD}\n${params.guardianName}님, 「물속 생물 이야기」 신청이 대기로 접수되었습니다.\n\n일시: ${when}\n정원(회차당 12명)이 차서 대기 순번으로 등록되었으며, 자리가 나면 순서대로 문자로 안내드립니다.\n문의: ${INQUIRY_TEL}`;
  return sendAlimtalk({ to: params.phone, templateId: "TMPL_ECOLOGY_APPLICATION", variables: {}, fallbackText: body });
}

/** 대기 → 확정 승급 문자. */
export async function sendPromotionSms(params: { phone: string; name: string; sessionKey: string }) {
  const when = sessionLabel(params.sessionKey);
  const body = `${HEAD}\n${params.name}님, 대기 중이던 「물속 생물 이야기」 자리가 나서 접수가 확정되었습니다.\n\n일시: ${when}\n집결: ${PLACE}\n문의: ${INQUIRY_TEL}`;
  return sendAlimtalk({ to: params.phone, templateId: "TMPL_ECOLOGY_PROMOTE", variables: {}, fallbackText: body });
}

/** OTP 인증코드 문자. */
export async function sendOtpSms(phone: string, code: string) {
  return sendAlimtalk({
    to: phone, templateId: "TMPL_ECOLOGY_OTP", variables: {},
    fallbackText: `${HEAD}\n본인조회 인증번호 ${code} (5분 내 입력). 타인에게 알려주지 마세요.`,
  });
}

/** 전날 리마인더 문자. */
export async function sendReminderSms(params: { phone: string; guardianName: string; sessionKey: string }) {
  const when = sessionLabel(params.sessionKey);
  const body = `${HEAD}\n${params.guardianName}님, 내일 「물속 생물 이야기」에서 만나요!\n\n일시: ${when}\n집결: ${PLACE}\n준비물: 물놀이 복장·물에서 신을 신발·수건·여벌 옷·물병·모자\n기상 상황에 따라 일정이 조정될 수 있으며 변경 시 개별 안내드립니다.\n문의: ${INQUIRY_TEL}`;
  return sendAlimtalk({ to: params.phone, templateId: "TMPL_ECOLOGY_REMINDER", variables: {}, fallbackText: body });
}
```

- [ ] **Step 3: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공. (구 `ecology-templates.ts`를 import하던 `api/ecology/registered/route.ts`는 Task 10에서 삭제하므로, 지금 빌드가 깨지면 그 라우트를 먼저 삭제하고 재빌드.)

- [ ] **Step 4: 커밋**

```bash
git -C lomad-homepage add src/lib/ecology-templates.ts src/lib/ecology-sms.ts
git -C lomad-homepage commit -m "feat(ecology): 7-8월 알림톡/SMS 발송 함수(확정·대기·승급·OTP·리마인더)"
```

---

## Task 4: `ecology-otp.ts` + `ecology-db.ts`

**Files:**
- Create: `lomad-homepage/src/lib/ecology-otp.ts`
- Create: `lomad-homepage/src/lib/ecology-db.ts`

- [ ] **Step 1: `ecology-otp.ts` 작성 (festival-otp.ts 복제, 시크릿만 교체)**

```ts
import "server-only";
import { createHmac, randomInt, timingSafeEqual } from "crypto";

const SECRET = () => process.env.ECOLOGY_OTP_SECRET || process.env.FESTIVAL_OTP_SECRET || "";

export function hashOtp(phone: string, code: string): string {
  return createHmac("sha256", SECRET()).update(`${phone}:${code}`).digest("hex");
}
export function generateOtp(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}
export function signSession(phone: string, ttlSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = `${phone}.${exp}`;
  return `${body}.${createHmac("sha256", SECRET()).update(body).digest("hex")}`;
}
export function verifySession(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [phone, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  const expected = createHmac("sha256", SECRET()).update(`${phone}.${exp}`).digest("hex");
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return phone;
}
```

- [ ] **Step 2: `ecology-db.ts` 작성 (festival-db.ts 패턴)**

```ts
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

export interface EcologyChild { name: string; age: number; }
export interface EcologyRegistrationRow {
  id: string; created_at: string; guardian_name: string; phone: string;
  session_key: string; status: "confirmed" | "waitlist" | "cancelled"; note: string | null;
  children: EcologyChild[];
}
export interface EcologyAvailabilityRow { session_key: string; confirmed: number; waitlist: number; }
export interface EcologySubmitInput {
  guardian_name: string; phone: string; session_key: string; note: string; children: EcologyChild[];
}
export interface EcologySubmitResult {
  registration_id: string; status: "confirmed" | "waitlist"; session_key: string;
}
export interface EcologyPromoted { phone: string; name: string; session_key: string; }
export interface EcologyCancelResult { cancelled: boolean; promoted: EcologyPromoted[]; }

export async function getAvailability(): Promise<EcologyAvailabilityRow[]> {
  const { data, error } = await db().rpc("ecology_availability");
  if (error) throw new Error(`ecology_availability: ${error.message}`);
  return (data ?? []).map((r: { session_key: string; confirmed: number; waitlist: number }) => ({
    session_key: r.session_key, confirmed: Number(r.confirmed), waitlist: Number(r.waitlist),
  }));
}
export function availabilityMap(rows: EcologyAvailabilityRow[]): Record<string, { confirmed: number; waitlist: number }> {
  const m: Record<string, { confirmed: number; waitlist: number }> = {};
  for (const r of rows) m[r.session_key] = { confirmed: r.confirmed, waitlist: r.waitlist };
  return m;
}
export async function submitRegistration(input: EcologySubmitInput, capacity: number): Promise<EcologySubmitResult> {
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
  const { error } = await db().rpc("ecology_otp_set", { p_phone: phone, p_code_hash: codeHash, p_ttl: ttl });
  if (error) throw new Error(`ecology_otp_set: ${error.message}`);
}
export async function otpVerify(phone: string, codeHash: string): Promise<boolean> {
  const { data, error } = await db().rpc("ecology_otp_verify", { p_phone: phone, p_code_hash: codeHash });
  if (error) throw new Error(`ecology_otp_verify: ${error.message}`);
  return data === true;
}
```

- [ ] **Step 3: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git -C lomad-homepage add src/lib/ecology-otp.ts src/lib/ecology-db.ts
git -C lomad-homepage commit -m "feat(ecology): DB RPC 래퍼 + OTP 서명 유틸"
```

---

## Task 5: `ecology-action.ts` (접수 서버 액션)

**Files:**
- Create: `lomad-homepage/src/lib/ecology-action.ts`

- [ ] **Step 1: 서버 액션 작성 (festival-action.ts 패턴 · 어린이 검증)**

```ts
"use server";

import { SUBMISSIONS_OPEN, CAPACITY, SESSIONS } from "@/lib/ecology-config";
import { submitRegistration, type EcologyChild, type EcologySubmitResult } from "@/lib/ecology-db";
import { sendApplicationSms } from "@/lib/ecology-sms";

export interface EcologyFormState {
  success: boolean;
  message: string;
  result?: EcologySubmitResult;
}

const VALID_SESSIONS = new Set(SESSIONS.map((s) => s.key));

export async function submitEcology(_prev: EcologyFormState, formData: FormData): Promise<EcologyFormState> {
  if (!SUBMISSIONS_OPEN) {
    return { success: false, message: "정식 접수는 아직 시작되지 않았습니다." };
  }

  const guardian = (formData.get("guardian_name") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const session = (formData.get("session_key") as string | null)?.trim() ?? "";
  const note = (formData.get("note") as string | null)?.trim() ?? "";
  const consent = (formData.get("consent") as string | null) === "on";
  const childrenJson = (formData.get("children_json") as string | null) ?? "[]";

  if (!guardian || !phoneRaw) return { success: false, message: "보호자 이름과 연락처는 필수입니다." };
  if (!consent) return { success: false, message: "개인정보 수집·이용에 동의해 주세요." };
  if (!VALID_SESSIONS.has(session)) return { success: false, message: "참여 회차를 선택해 주세요." };

  const phone = phoneRaw.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 11) return { success: false, message: "유효한 연락처를 입력해 주세요." };

  let children: EcologyChild[];
  try {
    children = JSON.parse(childrenJson);
  } catch {
    return { success: false, message: "참가 어린이 정보를 다시 입력해 주세요." };
  }
  if (!Array.isArray(children) || children.length === 0) {
    return { success: false, message: "참가 어린이를 최소 1명 추가해 주세요." };
  }

  const cleaned: EcologyChild[] = [];
  for (const c of children) {
    const name = String(c?.name ?? "").trim();
    const age = Number(c?.age);
    if (!name) return { success: false, message: "어린이 이름을 모두 입력해 주세요." };
    if (!Number.isFinite(age) || age < 5 || age > 19) {
      return { success: false, message: `${name}: 만 나이를 올바르게 입력해 주세요. (미취학 아동은 안전상 참가 불가)` };
    }
    cleaned.push({ name, age });
  }

  let result: EcologySubmitResult;
  try {
    result = await submitRegistration({ guardian_name: guardian, phone, session_key: session, note, children: cleaned }, CAPACITY);
  } catch (e) {
    console.error("[ecology] submit error:", e);
    return { success: false, message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  try {
    await sendApplicationSms({ phone, guardianName: guardian, sessionKey: session, status: result.status });
  } catch (e) {
    console.error("[ecology] application SMS failed:", e);
  }

  const msg = result.status === "confirmed"
    ? "접수가 확정되었습니다. 잠시 후 확인 문자가 발송됩니다."
    : "정원이 차서 대기로 접수되었습니다. 자리가 나면 순서대로 문자로 안내드립니다.";
  return { success: true, message: msg, result };
}
```

- [ ] **Step 2: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공.

- [ ] **Step 3: 커밋**

```bash
git -C lomad-homepage add src/lib/ecology-action.ts
git -C lomad-homepage commit -m "feat(ecology): 접수 서버 액션(검증·정원 판정·확인 문자)"
```

---

## Task 6: 접수 폼 + 페이지 (`/ecology/register`)

**Files:**
- Create: `lomad-homepage/src/components/projects/ecology/RegisterForm.tsx`
- Create: `lomad-homepage/src/app/ecology/register/page.tsx`

- [ ] **Step 1: `RegisterForm.tsx` 작성 (클라이언트, useActionState)**

```tsx
"use client";

import { useActionState, useState } from "react";
import { submitEcology, type EcologyFormState } from "@/lib/ecology-action";
import { SESSIONS, CAPACITY } from "@/lib/ecology-config";

const initial: EcologyFormState = { success: false, message: "" };

interface ChildRow { name: string; age: string; }

export default function RegisterForm({ availability }: {
  availability: Record<string, { confirmed: number; waitlist: number }>;
}) {
  const [state, formAction, pending] = useActionState(submitEcology, initial);
  const [children, setChildren] = useState<ChildRow[]>([{ name: "", age: "" }]);

  const childrenJson = JSON.stringify(
    children.map((c) => ({ name: c.name.trim(), age: Number(c.age) })),
  );

  if (state.success) {
    return (
      <div className="border border-border bg-bg-soft p-8 text-center">
        <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#0B7A5A] mb-3">
          {state.result?.status === "confirmed" ? "Confirmed" : "Waitlisted"}
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-3">
          {state.result?.status === "confirmed" ? "접수가 확정되었습니다" : "대기로 접수되었습니다"}
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub leading-relaxed">{state.message}</p>
        <a href="/ecology/my" className="inline-block mt-6 text-[13px] underline">내 신청 조회하기 →</a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="children_json" value={childrenJson} />

      {/* 회차 선택 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-3">참여 회차</legend>
        <div className="space-y-2">
          {SESSIONS.map((s) => {
            const a = availability[s.key] ?? { confirmed: 0, waitlist: 0 };
            const remain = Math.max(0, CAPACITY - a.confirmed);
            const full = remain === 0;
            return (
              <label key={s.key} className="flex items-center gap-3 border border-border px-4 py-3 cursor-pointer hover:border-text text-[14px]">
                <input type="radio" name="session_key" value={s.key} required className="accent-text" />
                <span className="flex-1">{s.label}</span>
                <span className={`text-[12px] font-bold ${full ? "text-[#b45309]" : "text-[#0B7A5A]"}`}>
                  {full ? `대기접수 (마감)` : `잔여 ${remain}석`}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 보호자 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="guardian_name" label="보호자 이름" required />
        <Field name="phone" label="휴대폰 번호" placeholder="010-1234-5678" required inputMode="tel" />
      </div>

      {/* 어린이 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-1">참가 어린이</legend>
        <p className="text-[12px] text-text-muted mb-3">초등학생 이상만 참가할 수 있어요. 형제자매는 + 버튼으로 추가하세요.</p>
        <div className="space-y-2">
          {children.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={c.name} placeholder="이름"
                onChange={(e) => setChildren((p) => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                className="flex-1 bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
              />
              <input
                value={c.age} placeholder="만 나이" inputMode="numeric"
                onChange={(e) => setChildren((p) => p.map((x, j) => j === i ? { ...x, age: e.target.value.replace(/\D/g, "") } : x))}
                className="w-24 bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
              />
              {children.length > 1 && (
                <button type="button" onClick={() => setChildren((p) => p.filter((_, j) => j !== i))}
                  className="w-11 h-11 border border-border text-text-muted hover:text-[#b45309]">×</button>
              )}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setChildren((p) => [...p, { name: "", age: "" }])}
          className="mt-2 text-[12px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text px-3 py-2 hover:bg-text hover:text-bg">
          + 어린이 추가
        </button>
      </fieldset>

      {/* 비고 */}
      <div>
        <label className="font-[family-name:var(--font-noto)] text-[14px] font-black block mb-2">요청사항 (선택)</label>
        <textarea name="note" rows={2} className="w-full bg-input-bg px-3 py-2 text-[14px] border border-border outline-none focus:border-text" />
      </div>

      {/* 동의 */}
      <label className="flex items-start gap-2 text-[13px] text-text-sub">
        <input type="checkbox" name="consent" className="accent-text mt-1" />
        <span>개인정보 수집·이용에 동의합니다. (수집 항목: 보호자명·연락처·어린이 이름·나이 / 목적: 접수·안내 / 보유: 프로그램 종료 후 파기)</span>
      </label>

      {state.message && !state.success && (
        <p className="text-[13px] text-[#b45309] font-[family-name:var(--font-noto)]">{state.message}</p>
      )}

      <button type="submit" disabled={pending}
        className="w-full h-12 bg-text text-bg font-[family-name:var(--font-noto)] font-black text-[15px] disabled:opacity-50">
        {pending ? "접수 중…" : "접수하기"}
      </button>
    </form>
  );
}

function Field({ name, label, required, placeholder, inputMode }: {
  name: string; label: string; required?: boolean; placeholder?: string; inputMode?: "tel";
}) {
  return (
    <div>
      <label className="font-[family-name:var(--font-noto)] text-[14px] font-black block mb-2">
        {label}{required && <span className="text-[#FF6B6B]"> *</span>}
      </label>
      <input name={name} required={required} placeholder={placeholder} inputMode={inputMode}
        className="w-full bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text" />
    </div>
  );
}
```

- [ ] **Step 2: `register/page.tsx` 작성 (서버, festival register/page.tsx 패턴)**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/projects/ecology/RegisterForm";
import { SUBMISSIONS_OPEN, PLACE, EXPERIENCE_SITE } from "@/lib/ecology-config";
import { getAvailability, availabilityMap } from "@/lib/ecology-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "참가 신청 · 남대천 물속 생물 이야기 | LOMAD",
  description: "양양 남대천 생태체험 「물속 생물 이야기」 참가 신청 — 7-8월 정규 프로그램.",
  alternates: { canonical: "/ecology/register" },
  robots: { index: false },
};

export default async function EcologyRegisterPage() {
  let availability: Record<string, { confirmed: number; waitlist: number }> = {};
  if (SUBMISSIONS_OPEN) {
    try { availability = availabilityMap(await getAvailability()); }
    catch (e) { console.error("[ecology] availability fetch failed:", e); }
  }
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/projects/ecology-wetland-water" className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text">
            남대천 생태체험
          </Link>
          <Link href="/" className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text">LOMAD</Link>
        </div>
      </header>

      <div className="max-w-[680px] w-full mx-auto px-6 py-[48px] md:py-[64px]">
        <aside className="text-white p-6 md:p-7 mb-10" style={{ background: "linear-gradient(135deg, #2A3A1A 0%, #2E5461 100%)" }}>
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#E8A845] mb-2">Namdaecheon Eco</p>
          <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black mb-1 leading-tight">남대천 물속 생물 이야기</h2>
          <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/70 mb-5 italic">민물고기와 수서곤충을 직접 만나는 생태 체험</p>
          <div className="grid grid-cols-2 gap-y-3 gap-x-3 pt-5 border-t border-white/15 text-[12px]">
            <div><p className="text-white/50 text-[9px] tracking-[2px] uppercase font-bold mb-0.5">집결</p><p className="font-black">{PLACE}</p></div>
            <div><p className="text-white/50 text-[9px] tracking-[2px] uppercase font-bold mb-0.5">체험지</p><p className="font-black">{EXPERIENCE_SITE}</p></div>
          </div>
        </aside>

        {SUBMISSIONS_OPEN ? (
          <RegisterForm availability={availability} />
        ) : (
          <div className="border border-border bg-bg-soft p-8 md:p-12">
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#E8A845] mb-4">Coming Soon</p>
            <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black leading-tight mb-5">접수 준비 중입니다</h1>
            <p className="font-[family-name:var(--font-noto)] text-[15px] text-text-sub leading-[1.9]">정식 접수가 열리면 안내드립니다. 문의는 프로그램 페이지의 전화번호로 연락 주세요.</p>
            <Link href="/projects/ecology-wetland-water" className="inline-block mt-6 text-[13px] underline">프로그램 자세히 보기 →</Link>
          </div>
        )}
      </div>

      <footer className="border-t border-border py-6 text-center text-[11px] text-text-muted font-[family-name:var(--font-noto)]">
        © 2026 LOMAD Cooperative · 양양군 생태관광
      </footer>
    </main>
  );
}
```

- [ ] **Step 3: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공, `/ecology/register` 라우트 생성 로그.

- [ ] **Step 4: 커밋**

```bash
git -C lomad-homepage add src/components/projects/ecology/RegisterForm.tsx src/app/ecology/register/page.tsx
git -C lomad-homepage commit -m "feat(ecology): 접수 폼·페이지(/ecology/register)"
```

---

## Task 7: 본인조회·취소 (`/ecology/my`)

**Files:**
- Create: `lomad-homepage/src/app/ecology/my/actions.ts`
- Create: `lomad-homepage/src/app/ecology/my/OtpGate.tsx`
- Create: `lomad-homepage/src/app/ecology/my/page.tsx`

- [ ] **Step 1: `actions.ts` 작성 (festival my/actions.ts 패턴)**

```ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { otpSet, otpVerify, cancelRegistration, lookupByPhone } from "@/lib/ecology-db";
import { generateOtp, hashOtp, signSession, verifySession } from "@/lib/ecology-otp";
import { sendOtpSms, sendPromotionSms } from "@/lib/ecology-sms";

const COOKIE = "ecology_my";
const COOKIE_PATH = "/ecology";
const SESSION_TTL = 1800;
const OTP_TTL = 300;

function normalizePhone(raw: string): string { return raw.replace(/\D/g, ""); }

export interface OtpState { step: "phone" | "verify" | "error"; phone?: string; message?: string; }

export async function requestOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  if (phone.length < 10 || phone.length > 11) return { step: "error", message: "유효한 연락처를 입력해 주세요." };
  const code = generateOtp();
  try {
    await otpSet(phone, hashOtp(phone, code), OTP_TTL);
    await sendOtpSms(phone, code);
  } catch (e) {
    console.error("[ecology] requestOtp failed:", e);
    return { step: "error", message: "인증번호 발송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
  return { step: "verify", phone };
}

export async function verifyOtp(_prev: OtpState, formData: FormData): Promise<OtpState> {
  const phone = normalizePhone((formData.get("phone") as string | null) ?? "");
  const code = ((formData.get("code") as string | null) ?? "").replace(/\D/g, "");
  if (!phone || !code) return { step: "verify", phone, message: "인증번호를 입력해 주세요." };
  let ok = false;
  try { ok = await otpVerify(phone, hashOtp(phone, code)); } catch (e) { console.error("[ecology] verifyOtp failed:", e); }
  if (!ok) return { step: "verify", phone, message: "인증번호가 올바르지 않거나 만료되었습니다." };
  const store = await cookies();
  store.set(COOKIE, signSession(phone, SESSION_TTL), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: COOKIE_PATH, maxAge: SESSION_TTL,
  });
  redirect("/ecology/my");
}

export async function cancelMyRegistration(formData: FormData): Promise<void> {
  const regId = (formData.get("reg_id") as string | null) ?? "";
  const store = await cookies();
  const phone = verifySession(store.get(COOKIE)?.value);
  if (!phone || !regId) return;

  const regs = await lookupByPhone(phone);
  if (!regs.some((r) => r.id === regId)) return; // 소유권 확인

  try {
    const res = await cancelRegistration(regId);
    for (const p of res.promoted) {
      await sendPromotionSms({ phone: p.phone, name: p.name, sessionKey: p.session_key });
    }
  } catch (e) {
    console.error("[ecology] cancelMyRegistration failed:", e);
  }
  revalidatePath("/ecology/my");
}

export async function logoutMy(): Promise<void> {
  const store = await cookies();
  store.delete({ name: COOKIE, path: COOKIE_PATH });
  redirect("/ecology/my");
}
```

- [ ] **Step 2: `OtpGate.tsx` 작성 (festival my/OtpGate.tsx 패턴)**

먼저 원본을 읽어 구조를 그대로 복제하되, import를 `./actions`의 `requestOtp/verifyOtp`로 맞춘다:

```bash
sed -n '1,83p' lomad-homepage/src/app/projects/hyeonnam-festival/my/OtpGate.tsx
```

그런 다음 동일 구조로 작성(문구만 생태체험으로):

```tsx
"use client";

import { useActionState } from "react";
import { requestOtp, verifyOtp, type OtpState } from "./actions";

const initReq: OtpState = { step: "phone" };
const initVer: OtpState = { step: "verify" };

export default function OtpGate() {
  const [reqState, reqAction, reqPending] = useActionState(requestOtp, initReq);
  const sent = reqState.step === "verify";
  return (
    <div className="max-w-[420px]">
      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#E8A845] mb-3">My Registration</p>
      <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-6 leading-tight">내 신청 조회</h1>

      {!sent ? (
        <form action={reqAction} className="space-y-3">
          <input name="phone" inputMode="tel" placeholder="접수한 휴대폰 번호" required
            className="w-full bg-input-bg h-12 px-3 text-[15px] border border-border outline-none focus:border-text" />
          {reqState.step === "error" && <p className="text-[13px] text-[#b45309]">{reqState.message}</p>}
          <button disabled={reqPending} className="w-full h-12 bg-text text-bg font-black text-[15px] disabled:opacity-50">
            {reqPending ? "발송 중…" : "인증번호 받기"}
          </button>
        </form>
      ) : (
        <VerifyForm phone={reqState.phone!} />
      )}
    </div>
  );
}

function VerifyForm({ phone }: { phone: string }) {
  const [state, action, pending] = useActionState(verifyOtp, initVer);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="phone" value={phone} />
      <p className="text-[13px] text-text-sub">{phone} 로 인증번호를 보냈습니다.</p>
      <input name="code" inputMode="numeric" placeholder="인증번호 6자리" required
        className="w-full bg-input-bg h-12 px-3 text-[15px] tracking-[4px] border border-border outline-none focus:border-text" />
      {state.message && <p className="text-[13px] text-[#b45309]">{state.message}</p>}
      <button disabled={pending} className="w-full h-12 bg-text text-bg font-black text-[15px] disabled:opacity-50">
        {pending ? "확인 중…" : "확인"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: `page.tsx` 작성 (서버, OTP 세션 → 신청 목록 + 취소)**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { lookupByPhone, type EcologyRegistrationRow } from "@/lib/ecology-db";
import { verifySession } from "@/lib/ecology-otp";
import { sessionLabel } from "@/lib/ecology-config";
import OtpGate from "./OtpGate";
import { cancelMyRegistration, logoutMy } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "내 신청 조회 · 남대천 생태체험 | LOMAD",
  robots: { index: false },
  alternates: { canonical: "/ecology/my" },
};

const STATUS: Record<string, { text: string; cls: string }> = {
  confirmed: { text: "확정", cls: "text-[#0B7A5A]" },
  waitlist: { text: "대기", cls: "text-[#b45309]" },
};

export default async function EcologyMyPage() {
  const store = await cookies();
  const phone = verifySession(store.get("ecology_my")?.value);
  let regs: EcologyRegistrationRow[] = [];
  if (phone) {
    try { regs = await lookupByPhone(phone); } catch (e) { console.error("[ecology] my lookup failed:", e); }
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link href="/projects/ecology-wetland-water" className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text">남대천 생태체험</Link>
          {phone && (
            <form action={logoutMy}>
              <button className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text">로그아웃</button>
            </form>
          )}
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-[60px]">
        {!phone ? (
          <OtpGate />
        ) : (
          <div>
            <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-8 leading-tight">내 신청 내역</h1>
            {regs.length === 0 ? (
              <p className="text-[14px] text-text-sub">이 연락처로 접수된 신청이 없습니다.{" "}
                <Link href="/ecology/register" className="underline">참가 신청하기</Link>
              </p>
            ) : (
              <div className="space-y-6">
                {regs.map((r) => {
                  const st = STATUS[r.status];
                  return (
                    <div key={r.id} className="border border-border bg-bg-soft p-5 md:p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-3">
                        <div>
                          <span className="font-[family-name:var(--font-noto)] text-[16px] font-black">{r.guardian_name}</span>
                          <span className={`ml-2 text-[12px] font-bold ${st?.cls ?? ""}`}>· {st?.text ?? r.status}</span>
                        </div>
                        <form action={cancelMyRegistration}>
                          <input type="hidden" name="reg_id" value={r.id} />
                          <button className="text-[11px] text-text-muted hover:text-[#b45309] underline shrink-0">신청 취소</button>
                        </form>
                      </div>
                      <p className="text-[13px] text-text-sub mb-2">{sessionLabel(r.session_key)}</p>
                      <p className="text-[13px]">참가 어린이: {r.children.map((c) => `${c.name}(만 ${c.age}세)`).join(", ")}</p>
                    </div>
                  );
                })}
                <p className="text-[11px] text-text-muted italic">※ 확정 신청을 취소하면 대기 순번이 자동으로 확정되고 해당 분께 문자가 발송됩니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공, `/ecology/my` 생성.

- [ ] **Step 5: 커밋**

```bash
git -C lomad-homepage add src/app/ecology/my
git -C lomad-homepage commit -m "feat(ecology): 본인조회·취소(/ecology/my, OTP)"
```

---

## Task 8: 관리자 명단 (`/ecology/admin`)

**Files:**
- Create: `lomad-homepage/src/app/ecology/admin/actions.ts`
- Create: `lomad-homepage/src/app/ecology/admin/AdminLogin.tsx`
- Create: `lomad-homepage/src/app/ecology/admin/page.tsx`
- Create: `lomad-homepage/src/app/ecology/admin/export/route.ts`

> 먼저 원본 3파일을 읽어 쿠키/비번 게이트 방식을 그대로 복제한다:
> `sed -n '1,183p' lomad-homepage/src/app/projects/hyeonnam-festival/admin/page.tsx`,
> `admin/AdminLogin.tsx`, `admin/actions.ts`.

- [ ] **Step 1: `actions.ts` 작성 (비밀번호 → 서명 쿠키)**

```ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "ecology_admin";
const COOKIE_PATH = "/ecology/admin";
const TTL = 60 * 60 * 8; // 8시간

function sign(exp: number): string {
  const secret = process.env.ECOLOGY_ADMIN_PASSWORD || "";
  return createHmac("sha256", secret).update(`admin.${exp}`).digest("hex");
}
export function makeToken(): string {
  const exp = Math.floor(Date.now() / 1000) + TTL;
  return `${exp}.${sign(exp)}`;
}
export function verifyAdmin(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(exp);
  const a = Buffer.from(sig ?? ""), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface AdminLoginState { error?: string; }
export async function adminLogin(_prev: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const pw = (formData.get("password") as string | null) ?? "";
  const expected = process.env.ECOLOGY_ADMIN_PASSWORD || "";
  if (!expected || pw !== expected) return { error: "비밀번호가 올바르지 않습니다." };
  const store = await cookies();
  store.set(COOKIE, makeToken(), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: COOKIE_PATH, maxAge: TTL,
  });
  redirect("/ecology/admin");
}
export async function adminLogout(): Promise<void> {
  const store = await cookies();
  store.delete({ name: COOKIE, path: COOKIE_PATH });
  redirect("/ecology/admin");
}
```

- [ ] **Step 2: `AdminLogin.tsx` 작성**

```tsx
"use client";
import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "./actions";
const init: AdminLoginState = {};
export default function AdminLogin() {
  const [state, action, pending] = useActionState(adminLogin, init);
  return (
    <form action={action} className="max-w-[360px] mx-auto mt-[15vh] space-y-3">
      <h1 className="font-[family-name:var(--font-noto)] text-[20px] font-black mb-2">생태체험 관리자</h1>
      <input type="password" name="password" placeholder="관리자 비밀번호" required
        className="w-full bg-input-bg h-12 px-3 text-[15px] border border-border outline-none focus:border-text" />
      {state.error && <p className="text-[13px] text-[#b45309]">{state.error}</p>}
      <button disabled={pending} className="w-full h-12 bg-text text-bg font-black text-[15px] disabled:opacity-50">
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: `page.tsx` 작성 (회차별 현황 + 명단)**

```tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { adminList, type EcologyRegistrationRow } from "@/lib/ecology-db";
import { SESSIONS, CAPACITY, sessionLabel } from "@/lib/ecology-config";
import { verifyAdmin, adminLogout } from "./actions";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "생태체험 관리자 | LOMAD", robots: { index: false } };

export default async function EcologyAdminPage() {
  const store = await cookies();
  if (!verifyAdmin(store.get("ecology_admin")?.value)) {
    return <main className="min-h-screen bg-bg px-6"><AdminLogin /></main>;
  }

  let rows: EcologyRegistrationRow[] = [];
  try { rows = await adminList(); } catch (e) { console.error("[ecology] admin list failed:", e); }

  const bySession = (key: string) => rows.filter((r) => r.session_key === key);
  const childCount = (rs: EcologyRegistrationRow[], status: string) =>
    rs.filter((r) => r.status === status).reduce((n, r) => n + r.children.length, 0);

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-[family-name:var(--font-noto)] text-[15px] font-black">생태체험 접수 관리</span>
          <div className="flex items-center gap-4">
            <a href="/ecology/admin/export" className="text-[12px] underline">CSV 내보내기</a>
            <form action={adminLogout}><button className="text-[12px] text-text-muted underline">로그아웃</button></form>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-10 space-y-10">
        {SESSIONS.map((s) => {
          const rs = bySession(s.key);
          const conf = childCount(rs, "confirmed");
          const wait = childCount(rs, "waitlist");
          return (
            <section key={s.key}>
              <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-1">{sessionLabel(s.key)}</h2>
              <p className="text-[12px] text-text-sub mb-3">확정 {conf}/{CAPACITY}명 · 대기 {wait}명 · 신청 {rs.length}건</p>
              {rs.length === 0 ? (
                <p className="text-[13px] text-text-muted">신청 없음</p>
              ) : (
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="text-left text-text-muted border-b border-border">
                      <th className="py-2 pr-3">상태</th><th className="py-2 pr-3">보호자</th>
                      <th className="py-2 pr-3">연락처</th><th className="py-2 pr-3">어린이</th><th className="py-2">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rs.map((r) => (
                      <tr key={r.id} className="border-b border-border/50 align-top">
                        <td className="py-2 pr-3">{r.status === "confirmed" ? "확정" : "대기"}</td>
                        <td className="py-2 pr-3">{r.guardian_name}</td>
                        <td className="py-2 pr-3">{r.phone}</td>
                        <td className="py-2 pr-3">{r.children.map((c) => `${c.name}(${c.age})`).join(", ")}</td>
                        <td className="py-2 text-text-sub">{r.note ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
```

- [ ] **Step 4: `export/route.ts` 작성 (CSV, 관리자 쿠키 확인)**

```ts
import { cookies } from "next/headers";
import { adminList } from "@/lib/ecology-db";
import { sessionLabel } from "@/lib/ecology-config";
import { verifyAdmin } from "../actions";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await cookies();
  if (!verifyAdmin(store.get("ecology_admin")?.value)) {
    return new Response("unauthorized", { status: 401 });
  }
  const rows = await adminList();
  const header = ["회차", "상태", "보호자", "연락처", "어린이", "비고"];
  const esc = (s: string) => `"${(s ?? "").replace(/"/g, '""')}"`;
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push([
      esc(sessionLabel(r.session_key)),
      esc(r.status === "confirmed" ? "확정" : r.status === "waitlist" ? "대기" : r.status),
      esc(r.guardian_name), esc(r.phone),
      esc(r.children.map((c) => `${c.name}(만 ${c.age}세)`).join(" / ")),
      esc(r.note ?? ""),
    ].join(","));
  }
  const csv = "﻿" + lines.join("\r\n"); // BOM: 엑셀 한글 깨짐 방지
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="ecology-registrations.csv"`,
    },
  });
}
```

- [ ] **Step 5: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공, `/ecology/admin` 생성.

- [ ] **Step 6: 커밋**

```bash
git -C lomad-homepage add src/app/ecology/admin
git -C lomad-homepage commit -m "feat(ecology): 관리자 명단·현황·CSV(/ecology/admin)"
```

---

## Task 9: 전날 리마인더 cron

**Files:**
- Create: `lomad-homepage/src/app/api/ecology/cron/reminder/route.ts`
- Modify: `lomad-homepage/vercel.json`

- [ ] **Step 1: cron 라우트 작성**

`adminList`로 전체를 가져와 "내일" 회차의 confirmed 건에 리마인더 발송. 규모 작아 별도 발송로그 없이 1일 1회 실행.

```ts
import { adminList } from "@/lib/ecology-db";
import { sendReminderSms } from "@/lib/ecology-sms";

export const dynamic = "force-dynamic";

/** 내일(KST) 날짜를 YYYY-MM-DD 로 — cron이 UTC 09:00(=KST 18:00)에 도므로 KST 기준 +1일. */
function tomorrowKstKey(): string {
  const nowKst = new Date(Date.now() + 9 * 3600 * 1000);
  const t = new Date(nowKst.getTime() + 24 * 3600 * 1000);
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`;
}

export async function GET(request: Request) {
  const secret = process.env.ECOLOGY_CRON_SECRET;
  const auth = request.headers.get("authorization");
  const provided = request.headers.get("x-cron-secret") ?? (auth?.startsWith("Bearer ") ? auth.slice(7) : null);
  if (!secret || provided !== secret) {
    return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), { status: 401 });
  }

  const target = tomorrowKstKey();
  let sent = 0, failed = 0;
  try {
    const rows = await adminList();
    const todo = rows.filter((r) => r.session_key === target && r.status === "confirmed");
    for (const r of todo) {
      try {
        await sendReminderSms({ phone: r.phone, guardianName: r.guardian_name, sessionKey: r.session_key });
        sent++;
      } catch (e) { console.error("[ecology] reminder send failed:", e); failed++; }
    }
  } catch (e) {
    console.error("[ecology] reminder cron failed:", e);
    return new Response(JSON.stringify({ ok: false, error: "list failed" }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok: true, target, sent, failed }), {
    headers: { "Content-Type": "application/json" },
  });
}
```

- [ ] **Step 2: `vercel.json`에 cron 추가**

기존 `vercel.json`을 읽고 최상위에 `crons` 배열을 병합한다(다른 설정 보존):

```bash
cat lomad-homepage/vercel.json
```

`crons` 항목 추가 (예시 — 기존 키와 병합):

```json
{
  "crons": [
    { "path": "/api/ecology/cron/reminder", "schedule": "0 9 * * *" }
  ]
}
```

> Vercel cron은 시크릿 헤더를 자동 첨부하지 않으므로, 배포 후 Vercel 프로젝트의 Cron 설정에서 이 엔드포인트에 `Authorization: Bearer <ECOLOGY_CRON_SECRET>` 를 붙이도록 구성하거나, cron이 보내는 기본 `Authorization` 헤더(`Bearer ${CRON_SECRET}`)를 쓰려면 env 이름을 `CRON_SECRET`으로 맞춘다. 본 플랜은 `x-cron-secret` 또는 `Bearer`를 모두 허용하도록 라우트를 작성했다.

- [ ] **Step 3: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공.

- [ ] **Step 4: 커밋**

```bash
git -C lomad-homepage add src/app/api/ecology/cron/reminder/route.ts vercel.json
git -C lomad-homepage commit -m "feat(ecology): 전날 리마인더 cron"
```

---

## Task 10: 랜딩 CTA 연결 + 구 웹훅 삭제

**Files:**
- Modify: `lomad-homepage/src/components/projects/EcologyWetlandWater.tsx`
- Delete: `lomad-homepage/src/app/api/ecology/registered/route.ts`

- [ ] **Step 1: `EcologyWetlandWater.tsx`의 접수 URL 교체**

`FORMPAY_URL` 상수를 내부 경로로 바꾼다:

```
const FORMPAY_URL = "https://forms.gle/7bfM3x5Zhk55iQcz9"; // TODO: 7-8월 전용 접수 폼 확정되면 교체
```
→
```
const REGISTER_URL = "/ecology/register";
```

그리고 파일 내 `${FORMPAY_URL}` 3곳(INLINE_HTML의 hero CTA, prog-card CTA) + `href={FORMPAY_URL}`(React CTA-band) 을 모두 `REGISTER_URL`로 바꾼다. INLINE_HTML의 `target="_blank" rel="noopener noreferrer"`는 내부 링크이므로 **제거**(같은 탭 이동).

검증용 grep:

```bash
grep -n "FORMPAY_URL\|REGISTER_URL\|forms.gle" lomad-homepage/src/components/projects/EcologyWetlandWater.tsx
```
Expected: `forms.gle`/`FORMPAY_URL` 잔존 0건, `REGISTER_URL` 정의 1 + 사용 3.

- [ ] **Step 2: 구 FormPay 웹훅 라우트 삭제**

```bash
git -C lomad-homepage rm src/app/api/ecology/registered/route.ts
```

- [ ] **Step 3: 빌드 확인**

Run: `cd lomad-homepage && npm run build`
Expected: 성공. (구 라우트가 참조하던 옛 `ecology-templates` export가 사라져도 라우트 자체를 지웠으므로 문제 없음.)

- [ ] **Step 4: 커밋**

```bash
git -C lomad-homepage add -A src/components/projects/EcologyWetlandWater.tsx src/app/api/ecology
git -C lomad-homepage commit -m "feat(ecology): 랜딩 CTA를 자체 접수(/ecology/register)로 연결 · 구 웹훅 삭제"
```

---

## Task 11: 통합 검증 + 배포 체크리스트

**Files:** 없음 (운영 작업)

- [ ] **Step 1: 로컬 통합 검증 (SOLAPI_TEST_MODE)**

`.env.local`에 임시로 `SOLAPI_TEST_MODE=true`, `ECOLOGY_ADMIN_PASSWORD=test1234`, `SUBMISSIONS_OPEN`은 config에서 임시 true로.
> dev 서버가 tailwind 워크스페이스 루트 버그로 안 뜨면, `SUBMISSIONS_OPEN=true`로 두고 `npm run build && npm run start`(prod 서버)로 검증한다.

시나리오:
1. `/ecology/register` → 회차 선택·보호자·어린이 2명·동의 → 접수 → "확정" 화면.
2. 콘솔에 `[SOLAPI-TEST] SMS (fallback)` 로그로 확정 문자 확인.
3. `/ecology/my` → 같은 번호 OTP(콘솔 코드) → 내역 표시 → 취소 → 대기건 승급 로그 확인.
4. `/ecology/admin` → 비번 → 회차별 현황·명단 → CSV 다운로드 확인.
5. Supabase에서 테스트 레코드 삭제: `delete from ecology.registration where phone like '0100000%';`

- [ ] **Step 2: env 등록 (Vercel)**

신규: `ECOLOGY_ADMIN_PASSWORD`, `ECOLOGY_CRON_SECRET`. (기존 `SUPABASE_*`, `SOLAPI_*`, `FESTIVAL_OTP_SECRET`는 이미 있음 — `ECOLOGY_OTP_SECRET` 미설정 시 `FESTIVAL_OTP_SECRET`로 폴백.)
`SOLAPI_TEST_MODE`는 운영에서 미설정/false.

- [ ] **Step 3: 배포 + 오픈**

```bash
cd lomad-homepage && npm run build   # 최종 통과 확인
```
- main 푸시 → Vercel 배포 → 신규 env 등록 확인.
- 실서비스 스모크: `/ecology/register` 1건 접수 후 실제 문자 수신 확인.
- 오픈: `ecology-config.ts`의 `SUBMISSIONS_OPEN=true` 커밋·배포.

- [ ] **Step 4: 최종 커밋 (오픈 플래그)**

```bash
git -C lomad-homepage add src/lib/ecology-config.ts
git -C lomad-homepage commit -m "feat(ecology): 접수 오픈(SUBMISSIONS_OPEN=true)"
```

---

## Self-Review 결과 (작성자 점검)

- **스펙 커버리지**: 접수 폼(T6)·정원/대기(T1,T5)·확정/대기 알림(T3,T5)·본인조회 OTP·취소·자동승급(T1,T7)·전날 리마인더(T9)·관리자 명단/CSV(T8)·CTA 교체/웹훅 폐기(T10)·env(T11) — 스펙 항목 전부 태스크 매핑됨.
- **플레이스홀더**: 알림톡 `TMPL_*`는 미승인 의도된 placeholder(솔라피 자동 SMS fallback). 그 외 미완성 서술 없음.
- **타입 일관성**: `EcologyRegistrationRow`(children 포함)·`EcologySubmitResult{status}`·`EcologyCancelResult{promoted:[]}`가 db/action/page 전반에서 동일 사용. `sessionLabel`은 config에서 export, templates가 재-export.
- **참조 정합성**: `verifyAdmin`은 admin/actions.ts에서 export → page/export route에서 사용. `verifySession`은 ecology-otp.ts. RPC명(`ecology_submit/cancel/lookup/availability/admin_list/otp_set/otp_verify`)이 db 래퍼와 일치.
