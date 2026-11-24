-- 협회원 대상 Ai 클래스 참가 신청 (기록용 — 운영 DB에는 이미 적용됨. 다시 실행하지 말 것)
create table if not exists public.ainb_class_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event text not null,
  name text not null,
  phone text not null,
  constraint ainb_class_signups_event_phone_key unique (event, phone)
);
alter table public.ainb_class_signups enable row level security;
