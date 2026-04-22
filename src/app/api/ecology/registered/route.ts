import { NextRequest, NextResponse } from "next/server";
import { sendAlimtalk } from "@/lib/solapi";
import {
  ECOLOGY_TEMPLATES,
  getApplicationConfirmedTemplateId,
  getSessionLabel,
} from "@/lib/ecology-templates";

/**
 * Webhook handler: FormPay에서 폼 제출 시 호출한다.
 *
 * 인증: X-Webhook-Secret 헤더가 FORMPAY_WEBHOOK_SECRET env var와 일치해야 함.
 *
 * Payload (최소 필수 필드):
 *   {
 *     "parentName": "홍길동",
 *     "parentPhone": "010-1234-5678",
 *     "session": "regular-may23-am"    // 세션 슬러그
 *   }
 *
 * FormPay가 실제 어떤 형태로 보내는지에 따라 필드 매핑은 조정 가능.
 *
 * 발송 주체: 로마드협동조합 카카오 비즈니스 채널 (SOLAPI_KAKAO_CHANNEL_ID).
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-webhook-secret");
  const expected = process.env.FORMPAY_WEBHOOK_SECRET;

  if (!expected) {
    console.error(
      "[ecology webhook] FORMPAY_WEBHOOK_SECRET env var not configured"
    );
    return NextResponse.json(
      { ok: false, error: "server misconfigured" },
      { status: 500 }
    );
  }

  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid json" },
      { status: 400 }
    );
  }

  const parsed = parsePayload(payload);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, error: "invalid payload", issue: parsed.issue },
      { status: 400 }
    );
  }

  const { parentName, parentPhone, session } = parsed.data;

  const template = ECOLOGY_TEMPLATES.application_confirmed;
  const templateId = getApplicationConfirmedTemplateId(session);
  const variables = template.buildVariables({
    parentName,
    session: getSessionLabel(session),
    place: "남대천 하구습지 (양양읍 송암리 502)",
    inquiry: "010-9542-3775",
  });

  const result = await sendAlimtalk({
    to: parentPhone,
    templateId,
    variables,
    fallbackText: template.fallbackText,
  });

  return NextResponse.json({
    ok: result.success,
    channel: result.channel,
    reason: result.reason,
  });
}

type ParsedPayload =
  | { ok: true; data: { parentName: string; parentPhone: string; session: string } }
  | { ok: false; issue: string };

function parsePayload(raw: unknown): ParsedPayload {
  if (!raw || typeof raw !== "object") {
    return { ok: false, issue: "body must be an object" };
  }
  const p = raw as Record<string, unknown>;

  // FormPay 가 어떤 형태로 보내든 대응. 루트 또는 data 래퍼 둘 다 허용.
  const src = (p.data && typeof p.data === "object")
    ? (p.data as Record<string, unknown>)
    : p;

  const parentName = pickString(src, ["parentName", "guardianName", "name"]);
  const parentPhone = pickString(src, ["parentPhone", "guardianPhone", "phone"]);
  const session = pickString(src, ["session", "round", "slot"]);

  if (!parentName) return { ok: false, issue: "parentName missing" };
  if (!parentPhone) return { ok: false, issue: "parentPhone missing" };
  if (!session) return { ok: false, issue: "session missing" };

  return { ok: true, data: { parentName, parentPhone, session } };
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}
