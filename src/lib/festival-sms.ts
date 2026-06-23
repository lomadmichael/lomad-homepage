import "server-only";
import { sendAlimtalk } from "@/lib/solapi";
import { experienceLabel } from "@/lib/festival-experiences";

/**
 * 페스티벌 SMS 3종. 알림톡 템플릿 미검수 상태이므로 TMPL_ placeholder + fallbackText
 * 경로로 일반 SMS 발송된다(solapi.ts 의 fallback 로직). SOLAPI_TEST_MODE=true 면 콘솔 로그만.
 */

type SignupItem = { participant: string; key: string; slot: string | null };

function summarize(items: SignupItem[]): string {
  // "길동(서핑), 길동(볼더링 7/4 오후 4시)" 형태
  return items.map((i) => `${i.participant}(${experienceLabel(i.key, i.slot)})`).join(", ");
}

/** 신청 확인 SMS — 확정/대기 항목 안내 포함. */
export async function sendConfirmSms(params: {
  phone: string;
  repName: string;
  confirmed: SignupItem[];
  waitlisted: SignupItem[];
  camping: { type: string; status: string } | null;
}) {
  const lines = [`[현남생활 페스티벌] ${params.repName}님, 참가 신청이 접수되었습니다.`];
  if (params.confirmed.length) lines.push(`✅ 확정: ${summarize(params.confirmed)}`);
  if (params.waitlisted.length) lines.push(`⏳ 대기: ${summarize(params.waitlisted)} (자리가 나면 순서대로 안내드립니다)`);
  if (params.camping) {
    const c = params.camping.type === "deck" ? "데크" : "노지";
    lines.push(`🏕 캠핑(${c}): ${params.camping.status === "confirmed" ? "확정" : "대기"}`);
  }
  lines.push("2026.7.4-5 · 양양 죽도·북분리. 캠핑 무료(양양군 농업기술센터 후원)이며 선셋 비치 테이블(2만원)만 현장 결제입니다. 자세한 안내는 추후 발송드립니다. — 로마드협동조합");

  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_FESTIVAL_CONFIRM",
    variables: {},
    fallbackText: lines.join("\n"),
  });
}

/** OTP 인증코드 SMS. */
export async function sendOtpSms(phone: string, code: string) {
  return sendAlimtalk({
    to: phone,
    templateId: "TMPL_FESTIVAL_OTP",
    variables: {},
    fallbackText: `[현남생활 페스티벌] 본인 조회 인증번호 ${code} (5분 내 입력). 타인에게 알려주지 마세요.`,
  });
}

/** 캠핑 대기자 승급 알림 SMS. */
export async function sendCampingPromotionSms(params: {
  phone: string;
  name: string;
  camping: string;
}) {
  const c = params.camping === "deck" ? "데크" : "노지";
  const fee = "캠핑은 무료입니다.";
  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_FESTIVAL_PROMOTE",
    variables: {},
    fallbackText: `[현남생활 페스티벌] ${params.name}님, 대기 중이던 캠핑(${c})이 확정되었습니다. ${fee} — 로마드협동조합`,
  });
}

/** 대기자 승급 알림 SMS. */
export async function sendPromotionSms(params: {
  phone: string;
  name: string;
  key: string;
  slot: string | null;
}) {
  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_FESTIVAL_PROMOTE",
    variables: {},
    fallbackText: `[현남생활 페스티벌] ${params.name}님, 대기 중이던 「${experienceLabel(params.key, params.slot)}」 자리가 나서 참가가 확정되었습니다. 체험비는 현장 결제입니다. — 로마드협동조합`,
  });
}
