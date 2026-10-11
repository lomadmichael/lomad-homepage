import "server-only";
import { sendAlimtalk, type SendResult } from "@/lib/solapi";
import {
  ADMIN_ALERT_PHONE,
  INQUIRY_TEL,
  MEETING_POINT,
  MY_URL,
  SUPPLIES,
  sessionLabel,
} from "@/lib/festeco-config";

const HEAD = "[로마드협동조합] 송이연어축제 남대천 생태탐방";

/**
 * 발송 스위치 — FESTECO_SMS_ENABLED=true 일 때만 실제 발송.
 * 문안은 형님 승인 전이므로 기본은 꺼짐: 콘솔에만 찍고 건너뛴다.
 */
export function festecoSmsEnabled(): boolean {
  return (process.env.FESTECO_SMS_ENABLED || "").trim() === "true";
}

async function send(to: string, templateId: string, text: string): Promise<SendResult> {
  if (!festecoSmsEnabled()) {
    console.log(`[festeco-sms] 비활성(FESTECO_SMS_ENABLED≠true) — 발송 생략: ${templateId} → ${to}\n${text}`);
    return { success: false, channel: "skipped", reason: "FESTECO_SMS_ENABLED off" };
  }
  return sendAlimtalk({ to, templateId, variables: {}, fallbackText: text });
}

/** 신청 확정 문자 본문. */
export function applicationText(p: {
  guardianName: string;
  sessionKey: string;
  adults: number;
  children: number;
  total: number;
}): string {
  return [
    HEAD,
    `${p.guardianName}님, 사전예약이 확정되었습니다.`,
    "",
    `회차: ${sessionLabel(p.sessionKey)}`,
    `인원: 성인 ${p.adults}명 · 어린이 ${p.children}명 (총 ${p.total}명)`,
    `집결: ${MEETING_POINT}`,
    "",
    "출발 10분 전까지 93번 부스에 도착해 주세요. 출발 5분 전까지 도착하지 않으면 현장 대기자에게 자리가 배정될 수 있습니다.",
    `준비물: ${SUPPLIES}`,
    "",
    `확인·취소: ${MY_URL}`,
    `문의·취소 연락: ${INQUIRY_TEL}`,
  ].join("\n");
}

export async function sendApplicationSms(p: {
  phone: string;
  guardianName: string;
  sessionKey: string;
  adults: number;
  children: number;
  total: number;
}) {
  return send(p.phone, "TMPL_FESTECO_APPLICATION", applicationText(p));
}

/** OTP 인증코드 문자 본문. */
export function otpText(code: string): string {
  return `${HEAD}\n본인조회 인증번호 ${code} (5분 내 입력). 타인에게 알려주지 마세요.`;
}

export async function sendOtpSms(phone: string, code: string) {
  return send(phone, "TMPL_FESTECO_OTP", otpText(code));
}

/** 관리자(로마드) 접수 알림 본문. */
export function adminText(p: {
  guardianName: string;
  phone: string;
  sessionKey: string;
  adults: number;
  children: number;
  total: number;
  remaining: number | null;
}): string {
  return [
    `[송이연어축제 생태탐방 접수] ${sessionLabel(p.sessionKey)}`,
    `${p.guardianName}님 · 성인 ${p.adults} 어린이 ${p.children} (총 ${p.total}명)`,
    `연락처 ${p.phone}`,
    p.remaining === null ? "" : `사전예약 잔여 ${p.remaining}석`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendAdminSms(text: string) {
  return send(ADMIN_ALERT_PHONE, "TMPL_FESTECO_ADMIN", text);
}
