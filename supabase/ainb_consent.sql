-- 「바들바들 현남생활 - Ai 내일바꿈」 참가 동의서
-- Supabase SQL Editor 에서 1회 실행한다.
--
-- ⚠️ 주민등록번호는 애플리케이션에서 AES-256-GCM 으로 암호화한 뒤 저장한다(rrn_enc).
--    평문은 DB 어디에도 남기지 않는다. 보험 가입이 끝나면 purge 함수로 즉시 파기한다.

create table if not exists public.ainb_consents (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  -- 참가자 식별
  cohort         text not null check (cohort in ('1기', '2기')),
  name           text not null,                 -- 신청 시 성명(본인 확인용)
  phone          text not null,                 -- 숫자만 저장
  email          text,

  -- 보험 가입 정보
  insured_name   text not null,                 -- 보험 가입용 이름
  address        text not null,                 -- 보험 가입용 주소
  rrn_enc        text,                          -- 주민등록번호 (AES-256-GCM, iv:tag:cipher)
  rrn_purged_at  timestamptz,                   -- 파기 시각

  -- 환불 계좌
  refund_account text not null,                 -- 은행/계좌번호/예금주

  -- 동의 항목 (네이버 폼 문항 순서)
  consent_privacy   boolean not null default false,  -- 1. 개인정보 수집·이용
  consent_program   boolean not null default false,  -- 2. 프로그램 숙지·일정 동의
  consent_insurance boolean not null default false,  -- 3. 여행자 보험 가입
  consent_media     boolean not null default false,  -- 7. 사진·영상 촬영
  consent_refund    boolean not null default false,  -- 8. 참가비 환불 조건
  consent_selfrisk  boolean not null default false,  -- 10. 자율 프로그램 사고 본인 책임
  consent_rules     boolean not null default false,  -- 11. 이용수칙·준수사항

  note           text
);

comment on table public.ainb_consents is 'Ai 내일바꿈 참가 동의서 (보험 가입·참가비 환불용)';
comment on column public.ainb_consents.rrn_enc is 'AES-256-GCM 암호문. 보험 가입 후 ainb_purge_rrn() 으로 파기';

create unique index if not exists ainb_consents_phone_cohort_uniq
  on public.ainb_consents (phone, cohort);
create index if not exists ainb_consents_created_idx
  on public.ainb_consents (created_at desc);

-- 갱신 시각 자동 반영
create or replace function public.ainb_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists ainb_consents_touch on public.ainb_consents;
create trigger ainb_consents_touch
  before update on public.ainb_consents
  for each row execute function public.ainb_touch_updated_at();

-- RLS: service_role(서버) 외 접근 차단. 정책을 만들지 않으므로 anon/authenticated 는 전부 거부된다.
alter table public.ainb_consents enable row level security;
revoke all on public.ainb_consents from anon, authenticated;

-- 주민등록번호 일괄 파기 (보험 가입 완료 후 실행)
create or replace function public.ainb_purge_rrn(p_ids uuid[] default null)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  update public.ainb_consents
     set rrn_enc = null,
         rrn_purged_at = now()
   where rrn_enc is not null
     and (p_ids is null or id = any(p_ids));
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function public.ainb_purge_rrn(uuid[]) from public, anon, authenticated;
