-- 2026 양양송이연어축제 「영수증 리워드 커스텀 티셔츠 만들기」 접수·회차권
-- 대상: forma Supabase (inzedtnpbwxwihlvsvhl) — Supabase SQL Editor 에서 1회 실행.
-- 설계: docs/superpowers/specs/2026-10-06-customhouse-songi-entry-design.md
--
-- 접근 방식은 기존 ecology 스키마와 동일하다:
--   · 데이터는 비공개 스키마 `customhouse` 에 둔다 (PostgREST 노출 스키마에 추가하지 않는다).
--   · 앱(service_role)은 public.customhouse_* RPC(security definer)로만 접근한다.
--   → Dashboard 의 "Exposed schemas" 설정 변경이 필요 없다.
--
-- 모든 회차 날짜는 KST 기준 date, 시각은 정수 시(10~17).

create schema if not exists customhouse;

-- ───────────────────────────── 테이블 ─────────────────────────────

create table if not exists customhouse.registrations (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  code              text not null,                         -- 접수번호 A-001
  phone             text not null,                         -- 대표 휴대폰(숫자만)
  rep_name          text not null,
  participants      jsonb not null default '[]'::jsonb,    -- [{name, gender, age}]
  party_size        int  not null check (party_size between 1 and 200),
  receipts          jsonb not null default '[]'::jsonb,    -- [{amount, store}]
  receipt_total     int  not null check (receipt_total >= 0),
  status            text not null default 'pending'
                    check (status in ('pending','approved','checked_in','no_show','cancelled')),
  slot_date         date,
  slot_hour         int check (slot_hour between 0 and 23),
  approved_at       timestamptz,
  checked_in_at     timestamptz,
  reminder_group_id text,
  consent_at        timestamptz not null,
  guardian_consent  boolean not null default false,       -- 만 14세 미만 법정대리인 동의
  via               text not null default 'self' check (via in ('self','proxy')),
  note              text
);

comment on table customhouse.registrations is
  '송이연어축제 커스텀하우스 영수증 리워드 접수. 행사 종료 후 7일 내(2026-10-25까지) customhouse_purge 로 파기';

-- 1인 1회: 취소 제외 대표 번호 유일
create unique index if not exists customhouse_reg_phone_active_uniq
  on customhouse.registrations (phone) where status <> 'cancelled';
create unique index if not exists customhouse_reg_code_uniq
  on customhouse.registrations (code);
create index if not exists customhouse_reg_slot_idx
  on customhouse.registrations (slot_date, slot_hour, status);
create index if not exists customhouse_reg_status_idx
  on customhouse.registrations (status, created_at);

create table if not exists customhouse.otp (
  phone         text primary key,
  code_hash     text,
  expires_at    timestamptz,
  attempts      int not null default 0,
  last_sent_at  timestamptz,
  window_start  timestamptz,
  window_count  int not null default 0
);

create table if not exists customhouse.stats_snapshots (
  id          bigserial primary key,
  created_at  timestamptz not null default now(),
  data        jsonb not null
);

alter table customhouse.registrations   enable row level security;
alter table customhouse.otp             enable row level security;
alter table customhouse.stats_snapshots enable row level security;

revoke all on schema customhouse from public, anon, authenticated;
revoke all on all tables in schema customhouse from public, anon, authenticated;
grant usage on schema customhouse to service_role;
grant all on all tables in schema customhouse to service_role;
grant all on all sequences in schema customhouse to service_role;

-- ───────────────────────────── OTP ─────────────────────────────

-- 인증번호 저장 + 발송 제한 (재발송 쿨다운, 시간당 최대 횟수). 원자적.
-- 반환: {ok:true} | {ok:false, reason:'cooldown'|'hourly', retry_after:초}
create or replace function public.customhouse_otp_request(
  p_phone text, p_code_hash text, p_ttl int, p_cooldown int, p_max_per_hour int)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare r customhouse.otp%rowtype;
begin
  insert into customhouse.otp(phone) values (p_phone) on conflict (phone) do nothing;
  select * into r from customhouse.otp where phone = p_phone for update;

  if r.last_sent_at is not null and r.last_sent_at > now() - make_interval(secs => p_cooldown) then
    return jsonb_build_object('ok', false, 'reason', 'cooldown',
      'retry_after', ceil(extract(epoch from (r.last_sent_at + make_interval(secs => p_cooldown) - now())))::int);
  end if;

  if r.window_start is not null and r.window_start > now() - interval '1 hour' then
    if r.window_count >= p_max_per_hour then
      return jsonb_build_object('ok', false, 'reason', 'hourly',
        'retry_after', ceil(extract(epoch from (r.window_start + interval '1 hour' - now())))::int);
    end if;
    update customhouse.otp set window_count = window_count + 1 where phone = p_phone;
  else
    update customhouse.otp set window_start = now(), window_count = 1 where phone = p_phone;
  end if;

  update customhouse.otp
     set code_hash = p_code_hash,
         expires_at = now() + make_interval(secs => p_ttl),
         attempts = 0,
         last_sent_at = now()
   where phone = p_phone;
  return jsonb_build_object('ok', true);
end $$;

-- 인증번호 확인. 반환: 'ok' | 'none' | 'expired' | 'locked' | 'invalid'
-- 성공 시 코드 소모(재사용 불가). 실패 시 시도 횟수 증가, p_max_attempts 도달 시 잠금.
create or replace function public.customhouse_otp_verify(
  p_phone text, p_code_hash text, p_max_attempts int)
returns text language plpgsql security definer set search_path to '' as $$
declare r customhouse.otp%rowtype;
begin
  select * into r from customhouse.otp where phone = p_phone for update;
  if not found or r.code_hash is null then return 'none'; end if;
  if r.expires_at is null or r.expires_at < now() then return 'expired'; end if;
  if r.attempts >= p_max_attempts then return 'locked'; end if;
  if r.code_hash = p_code_hash then
    update customhouse.otp set code_hash = null, expires_at = null, attempts = 0 where phone = p_phone;
    return 'ok';
  end if;
  update customhouse.otp set attempts = attempts + 1 where phone = p_phone;
  if r.attempts + 1 >= p_max_attempts then return 'locked'; end if;
  return 'invalid';
end $$;

-- ───────────────────────────── 조회 ─────────────────────────────

create or replace function public.customhouse_get(p_id uuid)
returns jsonb language sql security definer set search_path to '' as $$
  select to_jsonb(r) from customhouse.registrations r where r.id = p_id;
$$;

-- 취소 제외 활성 접수 (1인 1회라 최대 1건)
create or replace function public.customhouse_find_active(p_phone text)
returns jsonb language sql security definer set search_path to '' as $$
  select to_jsonb(r) from customhouse.registrations r
   where r.phone = p_phone and r.status <> 'cancelled'
   order by r.created_at desc limit 1;
$$;

create or replace function public.customhouse_admin_list()
returns jsonb language sql security definer set search_path to '' as $$
  select coalesce(jsonb_agg(to_jsonb(r) order by r.created_at), '[]'::jsonb)
    from customhouse.registrations r;
$$;

-- 날짜별 회차 좌석 (approved + checked_in 인원 합). 개인정보 없음.
create or replace function public.customhouse_seats(p_date date)
returns table(slot_hour int, seats int) language sql security definer set search_path to '' as $$
  select r.slot_hour, coalesce(sum(r.party_size), 0)::int
    from customhouse.registrations r
   where r.slot_date = p_date and r.status in ('approved', 'checked_in')
   group by r.slot_hour;
$$;

-- ───────────────────────────── 접수 ─────────────────────────────

-- payload: {phone, rep_name, participants, party_size, receipts, receipt_total,
--           code_prefix, guardian_consent, via}
-- 반환: {ok:true, id, code} | {ok:false, reason:'duplicate', id}
create or replace function public.customhouse_submit(payload jsonb)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare
  v_phone  text := payload->>'phone';
  v_prefix text := coalesce(nullif(payload->>'code_prefix', ''), 'T');
  v_party  int  := (payload->>'party_size')::int;
  v_total  int  := (payload->>'receipt_total')::int;
  v_exist  uuid;
  v_seq    int;
  v_code   text;
  v_id     uuid;
begin
  if v_phone is null or length(v_phone) < 10 then raise exception 'invalid phone'; end if;
  if v_party < 1 or v_party * 30000 > v_total then raise exception 'party_size exceeds receipt total'; end if;
  if jsonb_array_length(payload->'participants') <> v_party then raise exception 'participants mismatch'; end if;

  -- 같은 번호 동시 제출 직렬화 + 접수번호 채번 직렬화
  perform pg_advisory_xact_lock(hashtext('customhouse_phone_' || v_phone));
  perform pg_advisory_xact_lock(hashtext('customhouse_code_' || v_prefix));

  select id into v_exist from customhouse.registrations
   where phone = v_phone and status <> 'cancelled' limit 1;
  if v_exist is not null then
    return jsonb_build_object('ok', false, 'reason', 'duplicate', 'id', v_exist);
  end if;

  select coalesce(max(split_part(code, '-', 2)::int), 0) + 1 into v_seq
    from customhouse.registrations where code like v_prefix || '-%';
  v_code := v_prefix || '-' || lpad(v_seq::text, 3, '0');

  insert into customhouse.registrations(
    code, phone, rep_name, participants, party_size, receipts, receipt_total,
    consent_at, guardian_consent, via)
  values (
    v_code, v_phone, payload->>'rep_name', payload->'participants', v_party,
    payload->'receipts', v_total, now(),
    coalesce((payload->>'guardian_consent')::boolean, false),
    coalesce(nullif(payload->>'via', ''), 'self'))
  returning id into v_id;

  return jsonb_build_object('ok', true, 'id', v_id, 'code', v_code);
exception when unique_violation then
  select id into v_exist from customhouse.registrations
   where phone = v_phone and status <> 'cancelled' limit 1;
  return jsonb_build_object('ok', false, 'reason', 'duplicate', 'id', v_exist);
end $$;

-- 승인 전(pending) 금액·인원 수정 (데스크). 인원 ≤ floor(합계/30000) 검증.
create or replace function public.customhouse_update_pending(
  p_id uuid, p_receipts jsonb, p_receipt_total int, p_party_size int, p_participants jsonb)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare v_status text;
begin
  select status into v_status from customhouse.registrations where id = p_id for update;
  if not found then return jsonb_build_object('ok', false, 'reason', 'not_found'); end if;
  if v_status <> 'pending' then return jsonb_build_object('ok', false, 'reason', 'status_changed'); end if;
  if p_party_size < 1 or p_party_size * 30000 > p_receipt_total then
    return jsonb_build_object('ok', false, 'reason', 'party_exceeds');
  end if;
  update customhouse.registrations
     set receipts = p_receipts, receipt_total = p_receipt_total,
         party_size = p_party_size, participants = p_participants
   where id = p_id;
  return jsonb_build_object('ok', true);
end $$;

-- ───────────────────────────── 회차 배정 (원자적) ─────────────────────────────

-- 승인(pending→approved) 또는 재배정(approved/no_show→approved).
-- 회차 단위 advisory lock + 접수 행 잠금 후, 해당 회차 좌석을 다시 계산해 정원 초과면 거부.
-- p_allowed: 허용되는 현재 상태 목록 (승인='{pending}', 재배정='{approved,no_show}')
-- 반환: {ok:true, prev_date, prev_hour, prev_status, reminder_group_id, seats_after}
--     | {ok:false, reason:'not_found'|'status_changed'|'full', seats, capacity}
create or replace function public.customhouse_assign(
  p_id uuid, p_date date, p_hour int, p_capacity int, p_allowed text[])
returns jsonb language plpgsql security definer set search_path to '' as $$
declare
  r customhouse.registrations%rowtype;
  v_seats int;
begin
  perform pg_advisory_xact_lock(hashtext('customhouse_slot_' || p_date::text || '_' || p_hour::text));
  select * into r from customhouse.registrations where id = p_id for update;
  if not found then return jsonb_build_object('ok', false, 'reason', 'not_found'); end if;
  if not (r.status = any(p_allowed)) then
    return jsonb_build_object('ok', false, 'reason', 'status_changed', 'status', r.status);
  end if;

  select coalesce(sum(party_size), 0) into v_seats
    from customhouse.registrations
   where slot_date = p_date and slot_hour = p_hour
     and status in ('approved', 'checked_in') and id <> p_id;

  if v_seats + r.party_size > p_capacity then
    return jsonb_build_object('ok', false, 'reason', 'full', 'seats', v_seats, 'capacity', p_capacity);
  end if;

  update customhouse.registrations
     set status = 'approved', slot_date = p_date, slot_hour = p_hour,
         approved_at = coalesce(approved_at, now()), reminder_group_id = null
   where id = p_id;

  return jsonb_build_object('ok', true,
    'prev_date', r.slot_date, 'prev_hour', r.slot_hour, 'prev_status', r.status,
    'reminder_group_id', r.reminder_group_id, 'seats_after', v_seats + r.party_size);
end $$;

-- 상태 변경: checked_in(approved→) / no_show(approved→) / cancelled(pending·approved·no_show→)
-- 반환: {ok:true, reminder_group_id} | {ok:false, reason}
create or replace function public.customhouse_set_status(p_id uuid, p_status text)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare r customhouse.registrations%rowtype;
begin
  select * into r from customhouse.registrations where id = p_id for update;
  if not found then return jsonb_build_object('ok', false, 'reason', 'not_found'); end if;

  if p_status = 'checked_in' and r.status = 'approved' then
    update customhouse.registrations set status = 'checked_in', checked_in_at = now() where id = p_id;
  elsif p_status = 'no_show' and r.status = 'approved' then
    update customhouse.registrations set status = 'no_show', reminder_group_id = null where id = p_id;
  elsif p_status = 'cancelled' and r.status in ('pending', 'approved', 'no_show') then
    update customhouse.registrations set status = 'cancelled', reminder_group_id = null where id = p_id;
  elsif p_status = 'approved' and r.status = 'checked_in' then
    -- 입장 실수 되돌리기
    update customhouse.registrations set status = 'approved', checked_in_at = null where id = p_id;
  else
    return jsonb_build_object('ok', false, 'reason', 'status_changed', 'status', r.status);
  end if;
  return jsonb_build_object('ok', true, 'reminder_group_id', r.reminder_group_id);
end $$;

create or replace function public.customhouse_set_reminder(p_id uuid, p_group_id text)
returns void language sql security definer set search_path to '' as $$
  update customhouse.registrations set reminder_group_id = p_group_id where id = p_id;
$$;

-- ───────────────────────────── 통계·파기 ─────────────────────────────

-- 개인정보 없는 집계 (취소 제외)
create or replace function public.customhouse_stats()
returns jsonb language sql security definer set search_path to '' as $$
  with regs as (
    select * from customhouse.registrations where status <> 'cancelled'
  ), people as (
    select r.status, r.slot_date, (p->>'gender') as gender,
           nullif(p->>'age', '')::int as age
      from regs r, jsonb_array_elements(r.participants) p
  )
  select jsonb_build_object(
    'generated_at', now(),
    'registrations', (select count(*) from regs),
    'participants', (select coalesce(sum(party_size), 0) from regs),
    'cancelled', (select count(*) from customhouse.registrations where status = 'cancelled'),
    'by_status', (select coalesce(jsonb_object_agg(status, jsonb_build_object('registrations', n, 'participants', ppl)), '{}'::jsonb)
                    from (select status, count(*) n, sum(party_size) ppl from regs group by status) s),
    'by_via', (select coalesce(jsonb_object_agg(via, n), '{}'::jsonb)
                 from (select via, count(*) n from regs group by via) s),
    'by_day_slot', (select coalesce(jsonb_agg(jsonb_build_object(
                        'date', slot_date, 'hour', slot_hour, 'registrations', n,
                        'participants', ppl, 'checked_in', ci, 'no_show', ns)
                        order by slot_date, slot_hour), '[]'::jsonb)
                      from (select slot_date, slot_hour, count(*) n, sum(party_size) ppl,
                                   sum(party_size) filter (where status = 'checked_in') ci,
                                   sum(party_size) filter (where status = 'no_show') ns
                              from regs where slot_date is not null
                             group by slot_date, slot_hour) s),
    'by_created_day', (select coalesce(jsonb_object_agg(d, jsonb_build_object('registrations', n, 'participants', ppl)), '{}'::jsonb)
                         from (select to_char(created_at at time zone 'Asia/Seoul', 'YYYY-MM-DD') d,
                                      count(*) n, sum(party_size) ppl
                                 from regs group by 1) s),
    'gender', (select coalesce(jsonb_object_agg(coalesce(gender, '미상'), n), '{}'::jsonb)
                 from (select gender, count(*) n from people group by gender) s),
    'age_band', (select coalesce(jsonb_object_agg(band, n), '{}'::jsonb)
                   from (select case
                                  when age is null then '미상'
                                  when age < 10 then '0-9'
                                  when age < 14 then '10-13'
                                  when age < 20 then '14-19'
                                  when age < 30 then '20대'
                                  when age < 40 then '30대'
                                  when age < 50 then '40대'
                                  when age < 60 then '50대'
                                  else '60세 이상' end band,
                                count(*) n
                           from people group by 1) s),
    'receipts', (select jsonb_build_object(
                    'total_amount', coalesce(sum(receipt_total), 0),
                    'avg_per_registration', coalesce(round(avg(receipt_total)), 0),
                    'receipt_count', coalesce(sum(jsonb_array_length(receipts)), 0))
                  from regs),
    'receipts_approved', (select jsonb_build_object(
                    'total_amount', coalesce(sum(receipt_total), 0),
                    'registrations', count(*))
                  from regs where status in ('approved', 'checked_in', 'no_show'))
  );
$$;

-- 파기: 통계 스냅샷 저장 → 접수·OTP 전부 삭제. p_confirm = 'PURGE' 일 때만 실행.
create or replace function public.customhouse_purge(p_confirm text)
returns jsonb language plpgsql security definer set search_path to '' as $$
declare v_snap bigint; v_regs int; v_otp int;
begin
  if p_confirm is distinct from 'PURGE' then raise exception 'confirm required'; end if;
  insert into customhouse.stats_snapshots(data) values (public.customhouse_stats()) returning id into v_snap;
  delete from customhouse.registrations where true; get diagnostics v_regs = row_count;
  delete from customhouse.otp where true; get diagnostics v_otp = row_count;
  return jsonb_build_object('snapshot_id', v_snap, 'deleted_registrations', v_regs, 'deleted_otp', v_otp);
end $$;

-- ───────────────────────────── 권한 ─────────────────────────────

do $$
declare f text;
begin
  foreach f in array array[
    'customhouse_otp_request(text,text,int,int,int)',
    'customhouse_otp_verify(text,text,int)',
    'customhouse_get(uuid)',
    'customhouse_find_active(text)',
    'customhouse_admin_list()',
    'customhouse_seats(date)',
    'customhouse_submit(jsonb)',
    'customhouse_update_pending(uuid,jsonb,int,int,jsonb)',
    'customhouse_assign(uuid,date,int,int,text[])',
    'customhouse_set_status(uuid,text)',
    'customhouse_set_reminder(uuid,text)',
    'customhouse_stats()',
    'customhouse_purge(text)'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to service_role', f);
  end loop;
end $$;
