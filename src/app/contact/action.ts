"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const org = formData.get("org") as string;
  const type = formData.get("type") as string;
  const content = formData.get("content") as string;

  if (!name || !email || !content) {
    return { success: false, message: "필수 항목을 입력해 주세요." };
  }

  const typeLabel: Record<string, string> = {
    program: "프로그램 참여",
    collaboration: "협업 문의",
    production: "제작 문의",
    other: "기타",
  };

  try {
    await resend.emails.send({
      from: "로마드 홈페이지 <onboarding@resend.dev>",
      to: "lomad.coop@gmail.com",
      subject: `[로마드 문의] ${typeLabel[type] || "기타"} - ${name}`,
      html: `
        <h2>로마드 홈페이지 문의</h2>
        <table style="border-collapse:collapse; width:100%; max-width:600px;">
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold; width:120px;">이름</td><td style="padding:8px; border:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">연락처</td><td style="padding:8px; border:1px solid #ddd;">${phone || "-"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">이메일</td><td style="padding:8px; border:1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">소속</td><td style="padding:8px; border:1px solid #ddd;">${org || "-"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold;">문의 유형</td><td style="padding:8px; border:1px solid #ddd;">${typeLabel[type] || "-"}</td></tr>
          <tr><td style="padding:8px; border:1px solid #ddd; font-weight:bold; vertical-align:top;">문의 내용</td><td style="padding:8px; border:1px solid #ddd; white-space:pre-wrap;">${content}</td></tr>
        </table>
      `,
    });

    return { success: true, message: "문의가 접수되었습니다. 감사합니다!" };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, message: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
