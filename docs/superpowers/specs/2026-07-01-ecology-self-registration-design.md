# 남대천 생태체험 자체 접수 시스템 설계

- 날짜: 2026-07-01
- 대상 회차: 7-8월 「남대천 물속 생물 이야기」 (7/11·18·25, 8/1·8)
- 위치: `lomad-homepage` (Next.js), 라이브 lomadcoop.com
- 상태: 설계 승인 → 사양 확정 단계

## 배경 / 문제

지난 5·6월 생태체험 접수는 **Google Form + FormPay 웹훅**(`/api/ecology/registered`)으로
알림톡을 발송하는 구조였다. 문제:

- 접수 데이터가 외부(Google/FormPay)에 흩어져 정원·대기 관리가 수기.
- 톡투비즈 템플릿 미승인으로 실제 알림은 SMS fallback으로만 나갔고, 발송 트리거도 폼 제출 웹훅에 의존.
- 홈페이지 디자인과 단절(외부 폼으로 이탈).

**목표**: 구글폼을 걷어내고, 홈페이지에 내장된 자체 접수 시스템을 구축한다. 접수/대기/취소/본인조회/
관리자 명단과 알림톡(미승인 시 문자 자동 대체)까지 한 곳에서 처리한다.

기존 `lomad-homepage`의 **현남생활 페스티벌 자체 접수 시스템**(Supabase 격리 스키마 + RPC + SOLAPI + OTP)
을 레퍼런스로 그대로 이식한다.

## 목표 (In scope)

- 접수 폼: 회차 선택(잔여석 표시) · 보호자명·휴대폰 · 어린이(이름+나이, 다중) · 비고 · 개인정보 동의(필수)
- 정원/대기: 회차당 어린이 **12명**, 초과 시 대기 등록(전부-아니면-대기)
- 접수 즉시 **접수확정/대기 알림톡**(미승인 → SMS 자동 대체)
- 본인조회: 휴대폰 → 문자 OTP → 내 신청 확인 · **취소**
- 취소 시 대기 1순위 자동 승급 + 승급 알림
- **전날 리마인더 자동 발송**(Vercel cron, 매일 1회)
- 관리자 화면: 비밀번호 게이트 · 회차별 명단/현황 · CSV export
- 7-8월 랜딩(`EcologyWetlandWater`) CTA를 구글폼 → `/ecology/register`로 교체

## 비목표 (Out of scope)

- 결제(양양군 주최 무료 프로그램) — 없음
- 반(A/B) 선택 — 현장 진행팀이 분반. 폼은 날짜만 선택
- 다중 회차 동시 신청 — 1신청 = 1회차 (다른 날짜는 재신청)
- 지난 회차(5·6월) 페이지 변경 — 그대로 archived 유지

## 아키텍처

페스티벌 스택을 그대로 미러링한다.

- **DB**: 같은 forma Supabase 프로젝트(`inzedtnpbwxwihlvsvhl`)에 **격리된 `ecology` 스키마**.
  - 테이블은 API 미노출. 모든 접근은 `public.ecology_*` **security-definer RPC**로만.
  - 서버에서 `SUPABASE_SERVICE_ROLE_KEY`로만 접근(`server-only` import).
- **발송**: 기존 `src/lib/solapi.ts`(로마드협동조합 카카오 채널) 재사용.
- **OTP**: 기존 `src/lib/festival-otp.ts` 패턴 재사용(HMAC 해시, `FESTIVAL_OTP_SECRET` 공용).
- **접근 방식**: 서버 액션(공개 REST API 없음). cron만 예외적으로 보호된 라우트.
- **경로**: 안정 베이스 `/ecology` (회차가 바뀌어도 재사용).

### 신규/변경 파일

```
src/lib/ecology-config.ts        (신규) SUBMISSIONS_OPEN, SESSIONS[5], CAPACITY=12, PLACE
src/lib/ecology-db.ts            (신규) RPC 래퍼 (festival-db.ts 미러)
src/lib/ecology-action.ts        (신규) 서버 액션 (submit/lookup/cancel/otp)
src/lib/ecology-templates.ts     (변경) 7-8월 회차·장소·문구 + 대기/OTP/리마인더 템플릿
src/app/ecology/register/page.tsx        (신규) 접수 폼
src/app/ecology/register/RegisterForm.tsx(신규) 클라이언트 폼
src/app/ecology/my/page.tsx              (신규) 본인조회/취소
src/app/ecology/admin/page.tsx           (신규) 관리자 명단(비번 게이트)
src/app/ecology/admin/export/route.ts    (신규) CSV export
src/app/api/ecology/cron/reminder/route.ts (신규) 전날 리마인더 cron
src/components/projects/EcologyWetlandWater.tsx (변경) CTA → /ecology/register
vercel.json                       (변경) crons 항목 추가
src/app/api/ecology/registered/route.ts  (폐기) 구 FormPay 웹훅 — 구글폼 제거하므로 삭제
```

## 데이터 모델 (`ecology` 스키마)

### 테이블

`ecology.registration`
| 컬럼 | 타입 | 비고 |
|---|---|---|
| id | uuid PK | |
| created_at | timestamptz | default now() |
| guardian_name | text | 보호자명 |
| phone | text | 숫자만 정규화 저장 (010…) |
| session_key | text | 회차 키 (예: `2026-07-11`) |
| status | text | `confirmed` \| `waitlist` \| `cancelled` |
| note | text null | 비고 |

`ecology.child`
| 컬럼 | 타입 | 비고 |
|---|---|---|
| id | uuid PK | |
| registration_id | uuid FK → registration | on delete cascade |
| name | text | 어린이 이름 |
| age | int | 만 나이 |

`ecology.otp`
| 컬럼 | 타입 | 비고 |
|---|---|---|
| phone | text PK | |
| code_hash | text | HMAC(sha256) |
| expires_at | timestamptz | |

### 정원 / 대기 규칙

- 회차 정원 = **어린이 12명** (confirmed 상태 registration의 child 수 합).
- 신청 처리(**전부-아니면-대기**): `현재 confirmed 어린이 수 + 이번 신청 어린이 수 ≤ 12` → `confirmed`, 아니면 `waitlist`.
- 취소 시: 해당 registration `cancelled` → 좌석 반환 → 같은 회차 `waitlist`를 **오래된 순서로 순회**하며
  잔여석에 **통째로 들어가는** 신청을 승급(`confirmed`). 승급된 신청에 알림 발송.
- 전화번호 정규화 필수(하이픈·`*`·공백 제거) — cert-manager 교훈(`feedback_cert_phone_normalize`) 반영.

### RPC (security-definer, public 스키마 노출)

- `ecology_availability()` → `[{ session_key, confirmed_children, waitlist_children }]`
- `ecology_submit(payload jsonb)` → `{ registration_id, status, session_key }`
  - payload: `{ guardian_name, phone, session_key, note, children:[{name,age}], capacity:12 }`
  - 정원 판정 후 registration+child insert, status 반환.
- `ecology_lookup(p_phone text)` → 해당 번호의 `registration[]`(child 포함, cancelled 제외 옵션)
- `ecology_cancel(p_registration_id uuid)` → `{ cancelled, promoted: {phone,name,session_key}|null }`
- `ecology_admin_list()` → 전 회차 registration+child (관리자용)
- `ecology_otp_set(p_phone, p_code_hash, p_ttl)` / `ecology_otp_verify(p_phone, p_code_hash)`

## 설정 (`ecology-config.ts`)

```ts
export const SUBMISSIONS_OPEN = false; // 오픈 시 true + 배포
export const CAPACITY = 12;            // 회차당 어린이 정원
export const PLACE = "양양군 평생학습관 (양양읍 안산1길 36)"; // 집결지
export const EXPERIENCE_SITE = "남대천 (양양군 서면 용천리 일원)"; // 체험지
export const INQUIRY_TEL = "010-9542-3775";
export const SESSIONS = [
  { key: "2026-07-11", label: "7월 11일(토) 오전 10:00–12:00" },
  { key: "2026-07-18", label: "7월 18일(토) 오전 10:00–12:00" },
  { key: "2026-07-25", label: "7월 25일(토) 오전 10:00–12:00" },
  { key: "2026-08-01", label: "8월 1일(토) 오전 10:00–12:00" },
  { key: "2026-08-08", label: "8월 8일(토) 오전 10:00–12:00" },
];
```

## 알림톡 / 문자 템플릿 (`ecology-templates.ts` 갱신)

미승인 상태이므로 `templateId`는 `TMPL_…` placeholder → `solapi.ts`가 자동 SMS fallback.
승인되면 각 키에 실제 ID만 교체.

- `application_confirmed` — 접수 확정: 보호자명/일시/장소(평생학습관)/문의
- `application_waitlist` (신규) — 대기 등록: 보호자명/일시/대기 안내
- `waitlist_promoted` (신규) — 대기→확정 승급: 보호자명/일시/장소
- `otp` (신규) — 본인조회 인증번호 6자리
- `reminder_day_before` — 전날 리마인더: 보호자명/일시/장소/준비물

문구는 7-8월 물속 생물(물놀이 복장·물에서 신을 신발·수건·여벌옷·물병, 화장실/샤워/탈의 시설 부족 안내)로 갱신.

## 화면 / 플로우

기존 `ecology-wetland.css` 디자인 토큰 재사용(색·타이포 일관).

### `/ecology/register`
- `SUBMISSIONS_OPEN=false`면 "접수 준비 중" 안내만.
- 폼: 회차 라디오(각 항목에 잔여석/마감 표시) · 보호자명 · 휴대폰 · 어린이 목록(이름+나이, +추가/삭제) ·
  비고(선택) · 개인정보 수집·이용 동의(필수 체크).
- 제출 → `ecology-action.submit` → RPC → 결과 화면(확정/대기) + 알림톡·문자 발송.

### `/ecology/my`
- 휴대폰 입력 → OTP 문자 발송 → 6자리 입력 검증 → 서명 쿠키(`festival-otp.signSession` 재사용) →
  내 신청 목록(회차·어린이·상태) + **취소** 버튼.
- 취소 → `ecology_cancel` → 대기 자동 승급 + 승급자 알림.

### `/ecology/admin`
- `ECOLOGY_ADMIN_PASSWORD` 비교(쿠키/폼). 통과 시 회차별 현황(확정/대기 수) + 명단 테이블.
- `/ecology/admin/export` → CSV 다운로드(회차·보호자·연락처·어린이·상태).

### 전날 리마인더 cron
- `src/app/api/ecology/cron/reminder/route.ts` — `x-cron-secret` 또는 Vercel cron 헤더 검증.
- 매일 실행: `session_key == 내일 날짜`이고 `confirmed`인 registration에 리마인더 발송(중복발송 방지 플래그 선택).
- `vercel.json`에 `crons: [{ path: "/api/ecology/cron/reminder", schedule: "0 9 * * *" }]`
  (UTC 09:00 = KST 18:00, 회차 전날 저녁 발송).

## 환경변수

기존 재사용: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SOLAPI_API_KEY/SECRET/SENDER`,
`SOLAPI_KAKAO_CHANNEL_ID`, `SOLAPI_TEST_MODE`, `FESTIVAL_OTP_SECRET`.
**신규**: `ECOLOGY_ADMIN_PASSWORD`, `ECOLOGY_CRON_SECRET`.

## 롤아웃 순서

1. Supabase MCP `apply_migration`으로 `ecology` 스키마·테이블·RPC 생성(forma 프로젝트).
2. `ecology-config.ts`, `ecology-db.ts`, `ecology-templates.ts` 갱신/생성.
3. `ecology-action.ts` + 페이지(`register`/`my`/`admin`) 구현.
4. 리마인더 cron + `vercel.json`.
5. `EcologyWetlandWater` CTA를 `/ecology/register`로 교체(구 `FORMPAY_URL` 제거).
6. `SOLAPI_TEST_MODE=true`로 접수→확정/대기→취소→승급→리마인더 로컬 검증.
7. `next build` 통과 확인 → Vercel 배포 → 신규 env 등록 → `SUBMISSIONS_OPEN=true` 재배포.

## 테스트

- 정원 경계: 12명 정확히 채움 → 다음 신청 대기, 취소 시 승급.
- 전부-아니면-대기: 잔여 2석에 어린이 3명 신청 → 통째 대기.
- 전화번호 정규화: 하이픈/공백/`*` 포함 입력 → 매칭 정상.
- OTP: 잘못된 코드 거부, 만료 거부.
- 알림톡 미승인 → SMS fallback 확인(`SOLAPI_TEST_MODE`).
- 관리자 비번 오류 차단, CSV 정상.

## 미해결/후속

- 톡투비즈 알림톡 템플릿 검수 승인 → `templateId` 교체(승인 전까지 SMS).
- 개인정보 처리방침 링크 문구(동의 항목) — 기존 페스티벌 문구 재사용 가능한지 확인.
- 리마인더 중복발송 방지(발송 로그 컬럼) 필요 여부 — 규모 작아 우선 단순 실행, 필요 시 추가.
