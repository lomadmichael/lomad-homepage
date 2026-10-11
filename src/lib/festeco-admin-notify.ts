import "server-only";
import { getBooked, getSessionStates, effectiveCapacity } from "@/lib/festeco-db";
import { adminText, sendAdminSms } from "@/lib/festeco-sms";

/**
 * 접수 발생 시 로마드(관리자)에게 문자 알림 (이메일 없음).
 * 접수 자체는 이미 성공한 뒤 호출되므로, 여기서 실패해도 접수엔 영향 없음(호출부 try/catch).
 * FESTECO_SMS_ENABLED 가 꺼져 있으면 festeco-sms 에서 콘솔 로그로 대체된다.
 */
export async function notifyAdmin(p: {
  guardianName: string;
  phone: string;
  sessionKey: string;
  adults: number;
  children: number;
  total: number;
}) {
  // 잔여석(접수 반영 후 기준)
  let remaining: number | null = null;
  try {
    const [booked, states] = await Promise.all([getBooked(), getSessionStates()]);
    remaining = Math.max(0, effectiveCapacity(states[p.sessionKey]) - (booked[p.sessionKey] ?? 0));
  } catch {
    /* 잔여석 계산 실패는 무시 */
  }
  await sendAdminSms(adminText({ ...p, remaining }));
}
