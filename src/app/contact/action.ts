"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const organization = formData.get("organization") as string;
  const type = (formData.get("type") as string) || "기타 문의";
  const content = formData.get("content") as string;

  if (!name || !email || !content) {
    return { success: false, message: "필수 항목을 입력해 주세요." };
  }

  try {
    await resend.emails.send({
      from: "로마드 홈페이지 <onboarding@resend.dev>",
      to: "lomad.coop@gmail.com",
      subject: `[로마드 의뢰] ${type} - ${name}`,
      html: `
        <h2>로마드 홈페이지 의뢰 접수</h2>
        <table style="border-collapse:collapse; width:100%; max-width:600px;">
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold; width:120px;">이름</td><td style="padding:8px; border:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">연락처</td><td style="padding:8px; border:1px solid #ddd;">${phone || "-"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">이메일</td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">소속</td><td style="padding:8px; border:1px solid #ddd;">${organization || "-"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">의뢰 유형</td><td style="padding:8px; border:1px solid #ddd;">${type}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold; vertical-align:top;">문의 내용</td><td style="padding:8px; border:1px solid #ddd; white-space:pre-wrap;">${content}</td></tr>
        </table>
      `,
    });

    return { success: true, message: "문의가 접수되었습니다. 감사합니다!" };
  } catch (error) {
    console.error("Email send failed:", error);
    return {
      success: false,
      message: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}
