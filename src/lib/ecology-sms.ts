import "server-only";
import { sendAlimtalk } from "@/lib/solapi";
import { PLACE, EXPERIENCE_SITE, INQUIRY_TEL, sessionLabel } from "@/lib/ecology-config";

const HEAD = "[로마드협동조합] 남대천 생태체험";

/** 접수 확정/대기 안내 문자. */
export async function sendApplicationSms(params: {
  phone: string;
  guardianName: string;
  sessionKey: string;
  status: "confirmed" | "waitlist";
}) {
  const when = sessionLabel(params.sessionKey);
  const body =
    params.status === "confirmed"
      ? `${HEAD}\n${params.guardianName}님, 「물속 생물 이야기」 접수가 확정되었습니다.\n\n일시: ${when}\n집결: ${PLACE}\n체험: ${EXPERIENCE_SITE}\n\n물놀이 복장·물에서 신을 신발·수건·여벌 옷·물병을 챙겨오세요. 화장실/샤워/탈의 시설이 충분하지 않을 수 있습니다.\n문의: ${INQUIRY_TEL}`
      : `${HEAD}\n${params.guardianName}님, 「물속 생물 이야기」 신청이 대기로 접수되었습니다.\n\n일시: ${when}\n정원(회차당 12명)이 차서 대기 순번으로 등록되었으며, 자리가 나면 순서대로 문자로 안내드립니다.\n문의: ${INQUIRY_TEL}`;
  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_ECOLOGY_APPLICATION",
    variables: {},
    fallbackText: body,
  });
}

/** 대기 → 확정 승급 문자. */
export async function sendPromotionSms(params: { phone: string; name: string; sessionKey: string }) {
  const when = sessionLabel(params.sessionKey);
  const body = `${HEAD}\n${params.name}님, 대기 중이던 「물속 생물 이야기」 자리가 나서 접수가 확정되었습니다.\n\n일시: ${when}\n집결: ${PLACE}\n문의: ${INQUIRY_TEL}`;
  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_ECOLOGY_PROMOTE",
    variables: {},
    fallbackText: body,
  });
}

/** OTP 인증코드 문자. */
export async function sendOtpSms(phone: string, code: string) {
  return sendAlimtalk({
    to: phone,
    templateId: "TMPL_ECOLOGY_OTP",
    variables: {},
    fallbackText: `${HEAD}\n본인조회 인증번호 ${code} (5분 내 입력). 타인에게 알려주지 마세요.`,
  });
}

/** 전날 리마인더 문자. */
export async function sendReminderSms(params: {
  phone: string;
  guardianName: string;
  sessionKey: string;
}) {
  const when = sessionLabel(params.sessionKey);
  const body = `${HEAD}\n${params.guardianName}님, 내일 「물속 생물 이야기」에서 만나요!\n\n일시: ${when}\n집결: ${PLACE}\n준비물: 물놀이 복장·물에서 신을 신발·수건·여벌 옷·물병·모자\n기상 상황에 따라 일정이 조정될 수 있으며 변경 시 개별 안내드립니다.\n문의: ${INQUIRY_TEL}`;
  return sendAlimtalk({
    to: params.phone,
    templateId: "TMPL_ECOLOGY_REMINDER",
    variables: {},
    fallbackText: body,
  });
}
