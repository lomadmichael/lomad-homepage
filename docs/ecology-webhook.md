# 남대천 생태체험 접수 Webhook (FormPay → lomad-homepage)

FormPay 폼 제출 시 로마드협동조합 명의로 알림톡을 발송하기 위한 webhook 계약.

## 개요

```
[이용자 폼 제출]
   ↓
[FormPay Supabase 저장 + 선착순 마감 처리]
   ↓ POST webhook
[lomad-homepage /api/ecology/registered]
   ↓ SOLAPI (KAKAO_CHANNEL_ID = 로마드협동조합 채널)
[이용자 카톡: "로마드협동조합" 명의 접수 확정 알림]
```

## Endpoint

- **URL**: `POST https://lomadcoop.com/api/ecology/registered`
- **로컬 dev**: `POST http://localhost:3011/api/ecology/registered`
- **Content-Type**: `application/json`

## Authentication

`X-Webhook-Secret` 헤더가 필수. 값은 양측(FormPay + lomad-homepage)이 공유하는
임의 문자열(`openssl rand -hex 32` 권장).

- lomad-homepage 에서는 env var `FORMPAY_WEBHOOK_SECRET` 로 저장
- FormPay 대시보드의 webhook 설정에 동일 값을 입력해야 함
- 비밀값 불일치 → `401 unauthorized`
- 비밀값 미설정(env 누락) → `500 server misconfigured`

## Request payload

최소 필수 필드 3개. FormPay 가 기본 payload 와 약간 다른 스키마로 보내도 되도록
루트 레벨 또는 `data` 래퍼 둘 다 허용하고, 필드명은 몇 가지 별칭을 지원한다.

```json
{
  "parentName": "홍길동",
  "parentPhone": "010-1234-5678",
  "session": "regular-may23-am"
}
```

또는 FormPay 표준 래퍼 형태:

```json
{
  "formSlug": "ecology-wetland-registration",
  "submissionId": "...",
  "submittedAt": "2026-04-22T12:34:56Z",
  "data": {
    "parentName": "홍길동",
    "parentPhone": "010-1234-5678",
    "session": "regular-may23-am"
  }
}
```

### 필드 별칭 (FormPay 의 기본 필드 네이밍 호환)

| 의미 | 허용 키 |
|---|---|
| 보호자 이름 | `parentName`, `guardianName`, `name` |
| 보호자 연락처 | `parentPhone`, `guardianPhone`, `phone` |
| 희망 회차 | `session`, `round`, `slot` |

### 회차(`session`) 허용 값

`src/lib/ecology-templates.ts` 의 `SESSION_LABELS` 키와 일치해야 함.

| Session value | 사람이 보는 라벨 |
|---|---|
| `regular-may23-am` | 5월 23일(토) 오전반 10:00–12:00 |
| `regular-may23-pm` | 5월 23일(토) 오후반 14:00–16:00 |
| `regular-may30-am` | 5월 30일(토) 오전반 10:00–12:00 |
| `regular-may30-pm` | 5월 30일(토) 오후반 14:00–16:00 |

→ FormPay 폼의 라디오/드롭다운 `value` 를 **동일 키로 맞춰** 두면 매핑 불필요.
   라벨이 달라도 value 가 이 키와 일치하면 됨.

## Responses

| HTTP | 의미 | 다음 조치 |
|---|---|---|
| `200 { ok: true, channel: "alimtalk" }` | 알림톡 정상 발송 | 완료 |
| `200 { ok: true, channel: "sms" }` | 템플릿 미승인 → SMS 대체 발송 | 템플릿 검수 필요 |
| `200 { ok: true, channel: "skipped", reason: "test mode" }` | dev 모드 — 실제 발송 없음 | 정상 |
| `200 { ok: false, channel: "skipped", reason: "API keys not configured" }` | SOLAPI 키 없음 | env 설정 필요 |
| `400 { error: "invalid payload", issue: "..." }` | 필드 누락 | FormPay payload 확인 |
| `401 { error: "unauthorized" }` | webhook secret 불일치 | 비밀값 확인 |
| `500 { error: "server misconfigured" }` | env 누락 | FORMPAY_WEBHOOK_SECRET 설정 |

## 로컬 테스트

```bash
curl -X POST http://localhost:3011/api/ecology/registered \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: dev-local-secret-change-me" \
  -d '{
    "parentName": "홍길동",
    "parentPhone": "010-1234-5678",
    "session": "regular-may23-am"
  }'
```

`.env.local` 에 `SOLAPI_TEST_MODE=true` 면 실제 발송 없이 콘솔 로그만 찍힌다.

## 운영 전 체크리스트

- [ ] 로마드협동조합 카카오 비즈니스 채널 등록·승인
- [ ] 톡투비즈(SOLAPI) API_KEY + API_SECRET 발급 → Vercel env 등록
- [ ] `SOLAPI_SENDER` 등록 (발신용 SMS 번호)
- [ ] `SOLAPI_KAKAO_CHANNEL_ID` 등록 (= 로마드협동조합 pfId)
- [ ] 알림톡 템플릿 검수 신청 (접수 확정 / 전날 리마인더)
- [ ] 승인된 템플릿 ID 를 `src/lib/ecology-templates.ts` 의
      `APPROVED_APPLICATION_CONFIRMED_TEMPLATE_IDS` / `APPROVED_REMINDER_TEMPLATE_IDS` 에 입력
- [ ] `FORMPAY_WEBHOOK_SECRET` 운영값 생성 + FormPay 측에도 동일값 등록
- [ ] `SOLAPI_TEST_MODE=false` 로 전환
- [ ] 실제 폼으로 테스트 제출해서 내 번호로 알림톡 수신 확인

## B안 전환 시

FormPay 제품에 "BYO 카카오 채널" 기능이 추가되면:

1. FormPay 폼 설정에서 로마드협동조합 API_KEY / channelId / templateId 직접 등록
2. FormPay 가 직접 SOLAPI 호출 → 이 webhook 불필요
3. 이 라우트(`/api/ecology/registered`)는 제거하거나 백업 경로로 남겨둠
