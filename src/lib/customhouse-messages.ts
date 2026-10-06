// 문자 문안 3종 (설계 §4). 순수 함수 — 테스트 스크립트에서 직접 검증.
// ⚠️ 문안 변경 시 형님 검수 필요. 요일은 날짜에서 계산(weekdayKo) — 하드코딩 금지.
import { BOOTH_NAME, PLACE, hourLabel, weekdayKo } from "@/lib/customhouse-config";

/** ① 인증번호 (SMS) */
export function otpText(code: string): string {
  return `[송이연어축제 커스텀티셔츠] 인증번호 [${code}]를 입력해 주세요.`;
}

/** ② 회차권 (LMS) */
export function ticketText(p: {
  repName: string;
  date: string; // YYYY-MM-DD (KST)
  hour: number;
  partySize: number;
  code: string;
  link: string;
}): string {
  const [, m, d] = p.date.split("-").map(Number);
  return [
    `[${BOOTH_NAME}]`,
    `${p.repName}님, 회차권이 발급되었어요.`,
    ``,
    `■ 회차: ${m}월 ${d}일(${weekdayKo(p.date)}) ${hourLabel(p.hour)}`,
    `■ 인원: ${p.partySize}명 / 접수번호 ${p.code}`,
    `■ 장소: ${PLACE}`,
    ``,
    `회차 시작 10분이 지나도 오지 않으시면 자리가 다른 분께 넘어갈 수 있어요.`,
    `회차권 보기: ${p.link}`,
  ].join("\n");
}

/** ③ 10분 전 알림 (SMS/LMS) */
export function reminderText(p: { hour: number; link: string }): string {
  return [`[커스텀 티셔츠] ${hourLabel(p.hour)} 회차가 10분 뒤 시작돼요. 부스로 와 주세요!`, `회차권: ${p.link}`].join(
    "\n",
  );
}
