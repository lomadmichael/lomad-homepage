"use server";

import { Resend } from "resend";
import { sendAlimtalk } from "@/lib/solapi";
import { SUBMISSIONS_OPEN } from "@/lib/festival-config";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface FestivalFormState {
  success: boolean;
  message: string;
}

const ADMIN_EMAIL = "lomad.coop@gmail.com";

export async function submitFestival(
  _prev: FestivalFormState,
  formData: FormData,
): Promise<FestivalFormState> {
  // ─── 서버 측 차단 라인 ──────────────────────────────────────────
  // UI는 폼을 숨겼지만 캐시·직타·구버전 페이지 대비 서버에서도 막는다.
  if (!SUBMISSIONS_OPEN) {
    console.warn("[festival] submit blocked — pre-open period", {
      name: formData.get("name"),
      phone: formData.get("phone"),
    });
    return {
      success: false,
      message: "정식 접수는 아직 시작되지 않았습니다. 오픈 일정은 별도 공지 예정입니다.",
    };
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const day = (formData.get("day") as string | null)?.trim() ?? "";
  const region = (formData.get("region") as string | null)?.trim() ?? "";
  const transport = (formData.get("transport") as string | null)?.trim() ?? "";
  const adults = (formData.get("adults") as string | null)?.trim() ?? "0";
  const children = (formData.get("children") as string | null)?.trim() ?? "0";
  const programs = formData.getAll("programs").filter((p): p is string => typeof p === "string");
  const note = (formData.get("note") as string | null)?.trim() ?? "";

  if (!name || !phone || !day || !region || !transport) {
    return { success: false, message: "이름·연락처·참여일·참가 지역·이동방법은 필수입니다." };
  }

  // 전화번호 정규화 (숫자만)
  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return { success: false, message: "유효한 연락처를 입력해 주세요." };
  }

  const programsText = programs.length > 0 ? programs.join(", ") : "(신청 없음)";
  const peopleText = `성인 ${adults}명${Number(children) > 0 ? ` · 아동 ${children}명` : ""}`;
  const total = (Number(adults) || 0) + (Number(children) || 0);

  try {
    // 1) Resend 이메일 — 관리자 알림
    await resend.emails.send({
      from: "로마드 페스티벌 <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `[현남생활 페스티벌 접수] ${name} (총 ${total}명, ${day})`,
      html: `
        <h2 style="color:#0B1F3A; margin-bottom:8px;">현남생활 페스티벌 접수</h2>
        <p style="color:#666; font-size:13px; margin-top:0;">로마드 홈페이지를 통해 자동 접수됨</p>
        <table style="border-collapse:collapse; width:100%; max-width:640px; font-family: 'Noto Sans KR', sans-serif;">
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; width:120px; background:#FAF5EE;">이름</td><td style="padding:10px; border:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE;">연락처</td><td style="padding:10px; border:1px solid #ddd;">${phone}</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE;">참여일</td><td style="padding:10px; border:1px solid #ddd;">${day}</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE;">참가 지역</td><td style="padding:10px; border:1px solid #ddd;">${region}</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE;">이동방법</td><td style="padding:10px; border:1px solid #ddd;">${transport}</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE;">인원</td><td style="padding:10px; border:1px solid #ddd;">${peopleText} (총 ${total}명)</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE;">클래스 사전 신청</td><td style="padding:10px; border:1px solid #ddd;">${programsText}</td></tr>
          <tr><td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#FAF5EE; vertical-align:top;">비고</td><td style="padding:10px; border:1px solid #ddd; white-space:pre-wrap;">${note || "-"}</td></tr>
        </table>
      `,
    });

    // 2) SOLAPI — 신청자 확인 발송 (알림톡 템플릿 미검수 → SMS fallback)
    await sendAlimtalk({
      to: cleanPhone,
      templateId: "TMPL_FESTIVAL_CONFIRM", // placeholder → fallback to SMS
      variables: {
        "#{name}": name,
        "#{day}": day,
      },
      fallbackText:
        "[현남생활 페스티벌] #{name}님, 참가 신청이 접수되었습니다. 참여일: #{day} (2026.7.4-5, 양양 죽도·북분리). 자세한 일정·체험 안내는 추후 별도 발송드립니다. — 로마드협동조합",
    });

    return {
      success: true,
      message: "접수가 완료되었습니다. 잠시 후 확인 문자가 발송됩니다. 자세한 일정·체험 안내는 추후 알려드립니다.",
    };
  } catch (error) {
    console.error("[festival] submit error:", error);
    return {
      success: false,
      message: "접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}
