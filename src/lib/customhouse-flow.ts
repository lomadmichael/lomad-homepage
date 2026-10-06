import "server-only";
import {
  OTP_MAX_SENDS_PER_HOUR,
  OTP_MAX_VERIFY_ATTEMPTS,
  OTP_RESEND_COOLDOWN_SECONDS,
  OTP_TTL_SECONDS,
  SLOT_CAPACITY,
  hourLabel,
  isSlotAssignable,
  isTestMode,
  todayKst,
  type RegStatus,
} from "@/lib/customhouse-config";
import {
  assignSlot,
  getRegistration,
  otpRequest,
  otpVerify,
  setReminderGroup,
  setStatus,
} from "@/lib/customhouse-db";
import { generateOtp, hashOtp } from "@/lib/customhouse-otp";
import { cancelReminderSms, scheduleReminderSms, sendOtpSms, sendTicketSms } from "@/lib/customhouse-sms";

// 손님 액션·관리자 액션이 같이 쓰는 서버 로직.

export interface OtpIssueResult {
  ok: boolean;
  error?: string;
  retryAfter?: number;
}

/** 인증번호 생성·저장(발송 제한 포함)·발송. */
export async function issueOtp(phone: string): Promise<OtpIssueResult> {
  const code = generateOtp();
  try {
    const r = await otpRequest({
      phone,
      codeHash: hashOtp(phone, code),
      ttl: OTP_TTL_SECONDS,
      cooldown: OTP_RESEND_COOLDOWN_SECONDS,
      maxPerHour: OTP_MAX_SENDS_PER_HOUR,
    });
    if (!r.ok) {
      if (r.reason === "cooldown") {
        return { ok: false, retryAfter: r.retry_after, error: `${r.retry_after}초 뒤에 다시 받을 수 있어요.` };
      }
      const min = Math.max(1, Math.ceil(r.retry_after / 60));
      return {
        ok: false,
        retryAfter: r.retry_after,
        error: `인증번호 요청이 너무 많아요. ${min}분 뒤에 다시 시도해 주세요.`,
      };
    }
    const sent = await sendOtpSms(phone, code);
    if (!sent.ok) return { ok: false, error: "인증번호 발송에 실패했어요. 데스크에 문의해 주세요." };
  } catch (e) {
    console.error("[customhouse] issueOtp failed:", e);
    return { ok: false, error: "잠시 후 다시 시도해 주세요." };
  }
  return { ok: true };
}

/** 인증번호 확인. 성공 시 null, 실패 시 사용자 메시지. */
export async function checkOtp(phone: string, code: string): Promise<string | null> {
  try {
    const r = await otpVerify(phone, hashOtp(phone, code), OTP_MAX_VERIFY_ATTEMPTS);
    switch (r) {
      case "ok":
        return null;
      case "expired":
        return "인증번호가 만료됐어요. 다시 받아 주세요.";
      case "locked":
        return "입력 횟수를 넘었어요. 인증번호를 다시 받아 주세요.";
      case "none":
        return "인증번호를 먼저 받아 주세요.";
      default:
        return "인증번호가 맞지 않아요.";
    }
  } catch (e) {
    console.error("[customhouse] checkOtp failed:", e);
    return "잠시 후 다시 시도해 주세요.";
  }
}

export interface FlowResult {
  ok: boolean;
  message: string;
}

/**
 * 오늘 회차에 배정(승인 또는 재배정) + 회차권 문자 + 10분 전 알림 예약.
 * 재배정이면 기존 예약 알림을 취소하고 새로 예약한다.
 */
export async function assignAndNotify(p: {
  id: string;
  hour: number;
  allowed: RegStatus[];
  now?: Date;
}): Promise<FlowResult> {
  const now = p.now ?? new Date();
  const test = isTestMode();
  const date = todayKst(now);
  if (!isSlotAssignable(date, p.hour, now, test)) {
    return { ok: false, message: `${hourLabel(p.hour)} 회차는 배정 가능 시간(시작 +10분)이 지났어요.` };
  }
  const r = await assignSlot({ id: p.id, date, hour: p.hour, capacity: SLOT_CAPACITY, allowed: p.allowed });
  if (!r.ok) {
    if (r.reason === "full") {
      return {
        ok: false,
        message: `${hourLabel(p.hour)} 회차 좌석이 부족해요 (현재 ${r.seats}/${r.capacity}명).`,
      };
    }
    if (r.reason === "status_changed") return { ok: false, message: `이미 처리된 접수예요 (현재 상태: ${r.status}).` };
    return { ok: false, message: "접수를 찾을 수 없어요." };
  }

  // 기존 예약 알림 취소 (재배정)
  if (r.reminder_group_id) await cancelReminderSms(r.reminder_group_id);

  const reg = await getRegistration(p.id);
  if (!reg) return { ok: true, message: "배정 완료 (문자 발송 대상 조회 실패)" };

  const sameSlot = r.prev_status === "approved" && r.prev_date === date && r.prev_hour === p.hour;
  const notes: string[] = [];
  if (!sameSlot) {
    const t = await sendTicketSms({
      phone: reg.phone,
      regId: reg.id,
      repName: reg.rep_name,
      date,
      hour: p.hour,
      partySize: reg.party_size,
      code: reg.code,
    });
    if (!t.ok) notes.push("회차권 문자 실패");
  }
  const rem = await scheduleReminderSms({ phone: reg.phone, regId: reg.id, date, hour: p.hour, now });
  if (rem === null) notes.push("알림 생략(시작 12분 이내)");
  else if (!rem.ok) notes.push("알림 예약 실패");
  if (rem?.groupId && rem.ok) {
    try {
      await setReminderGroup(reg.id, rem.groupId);
    } catch (e) {
      console.error("[customhouse] setReminderGroup failed:", e);
    }
  }
  const verb = p.allowed.includes("pending") ? "승인" : "재배정";
  return {
    ok: true,
    message: `${reg.code} ${verb} → ${hourLabel(p.hour)} 회차 (${r.seats_after}/${SLOT_CAPACITY}명)${notes.length ? ` · ${notes.join(", ")}` : ""}`,
  };
}

/** 상태 변경 (입장/노쇼/취소/입장 취소) + 필요 시 예약 알림 취소. */
export async function changeStatus(id: string, status: RegStatus): Promise<FlowResult> {
  const r = await setStatus(id, status);
  if (!r.ok) return { ok: false, message: `처리할 수 없는 상태예요 (${r.status ?? r.reason}).` };
  if ((status === "no_show" || status === "cancelled") && r.reminder_group_id) {
    await cancelReminderSms(r.reminder_group_id);
  }
  const label: Partial<Record<RegStatus, string>> = {
    checked_in: "입장 처리",
    no_show: "노쇼 해제(좌석 반환)",
    cancelled: "취소",
    approved: "입장 취소",
  };
  return { ok: true, message: `${label[status] ?? status} 완료` };
}
