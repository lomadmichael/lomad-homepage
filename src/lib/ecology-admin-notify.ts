import "server-only";
import { Resend } from "resend";
import { sendAlimtalk } from "@/lib/solapi";
import { getAvailability, type EcologyParticipant } from "@/lib/ecology-db";
import {
  sessionLabel,
  CAPACITY,
  ADMIN_ALERT_PHONE,
  ADMIN_ALERT_EMAIL,
} from "@/lib/ecology-config";

// 키가 없으면(로컬 등) 이메일은 건너뛴다. 운영(Vercel)엔 RESEND_API_KEY 설정됨.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * 접수 발생 시 로마드(관리자)에게 문자 + 이메일 알림.
 * 접수 자체는 이미 성공한 뒤 호출되므로, 여기서 실패해도 접수엔 영향 없음(호출부 try/catch).
 */
export async function notifyAdmin(p: {
  guardianName: string;
  phone: string;
  email: string;
  sessionKey: string;
  status: "confirmed" | "waitlist";
  participants: EcologyParticipant[];
  healthNote: string;
}) {
  const when = sessionLabel(p.sessionKey);
  const statusK = p.status === "confirmed" ? "확정" : "대기";
  const n = p.participants.length;

  // 잔여석(접수 반영 후 기준)
  let remainText = "";
  try {
    const av = await getAvailability();
    const row = av.find((a) => a.session_key === p.sessionKey);
    const confirmed = row?.confirmed ?? 0;
    remainText = `잔여 ${Math.max(0, CAPACITY - confirmed)}석`;
  } catch {
    /* 잔여석 계산 실패는 무시 */
  }

  // 1) 관리자 문자 (알림톡 미승인 → SMS fallback)
  const smsBody = [
    `[남대천 생태체험 접수] ${when}`,
    `${p.guardianName}님 외 ${n}명 · ${statusK}`,
    `연락처 ${p.phone}`,
    remainText,
  ]
    .filter(Boolean)
    .join("\n");
  await sendAlimtalk({
    to: ADMIN_ALERT_PHONE,
    templateId: "TMPL_ECOLOGY_ADMIN",
    variables: {},
    fallbackText: smsBody,
  });

  // 2) 관리자 이메일 (상세 내역)
  if (resend) {
    const rows = p.participants
      .map(
        (c) =>
          `<tr><td style="padding:6px 10px;border:1px solid #ddd;">${c.name}</td><td style="padding:6px 10px;border:1px solid #ddd;">만 ${c.age}세 · ${c.category ?? ""}</td></tr>`,
      )
      .join("");
    await resend.emails.send({
      from: "남대천 생태체험 <onboarding@resend.dev>",
      to: ADMIN_ALERT_EMAIL,
      subject: `[생태체험 접수] ${when} · ${p.guardianName} 외 ${n}명 (${statusK})`,
      html: `
        <h2 style="margin-bottom:4px;color:#2A3A1A;">남대천 생태체험 접수</h2>
        <p style="color:#666;font-size:13px;margin-top:0;">lomadcoop.com 자체 접수 · ${remainText}</p>
        <table style="border-collapse:collapse;font-family:'Noto Sans KR',sans-serif;font-size:14px;margin-bottom:12px;">
          <tr><td style="padding:6px 10px;border:1px solid #ddd;background:#F5EFE0;font-weight:bold;">회차</td><td style="padding:6px 10px;border:1px solid #ddd;">${when}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #ddd;background:#F5EFE0;font-weight:bold;">상태</td><td style="padding:6px 10px;border:1px solid #ddd;">${statusK}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #ddd;background:#F5EFE0;font-weight:bold;">신청자</td><td style="padding:6px 10px;border:1px solid #ddd;">${p.guardianName}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #ddd;background:#F5EFE0;font-weight:bold;">연락처</td><td style="padding:6px 10px;border:1px solid #ddd;">${p.phone}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #ddd;background:#F5EFE0;font-weight:bold;">이메일</td><td style="padding:6px 10px;border:1px solid #ddd;">${p.email || "-"}</td></tr>
          <tr><td style="padding:6px 10px;border:1px solid #ddd;background:#F5EFE0;font-weight:bold;">건강 특이사항</td><td style="padding:6px 10px;border:1px solid #ddd;white-space:pre-wrap;">${p.healthNote || "-"}</td></tr>
        </table>
        <h3 style="margin:8px 0 4px;">참가자 (${n}명)</h3>
        <table style="border-collapse:collapse;font-family:'Noto Sans KR',sans-serif;font-size:14px;">${rows}</table>
      `,
    });
  }
}
