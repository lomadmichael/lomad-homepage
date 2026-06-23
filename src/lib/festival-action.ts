"use server";

import { Resend } from "resend";
import { SUBMISSIONS_OPEN } from "@/lib/festival-config";
import { submitRegistration, type SubmitInput, type SubmitResult } from "@/lib/festival-db";
import { sendConfirmSms } from "@/lib/festival-sms";
import { EXPERIENCES, getExperience, experienceLabel } from "@/lib/festival-experiences";

// 키가 없으면(로컬 등) 이메일은 건너뛴다. 운영(Vercel)엔 RESEND_API_KEY 설정됨.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = "lomad.coop@gmail.com";

export interface FestivalFormState {
  success: boolean;
  message: string;
  result?: SubmitResult;
}

interface ParticipantInput {
  name: string;
  age: number;
  experiences: { key: string; slot: string | null }[];
}

const VALID_KEYS = new Set(EXPERIENCES.map((e) => e.key));

export async function submitFestival(
  _prev: FestivalFormState,
  formData: FormData,
): Promise<FestivalFormState> {
  if (!SUBMISSIONS_OPEN) {
    return {
      success: false,
      message: "정식 접수는 아직 시작되지 않았습니다. 오픈 일정은 별도 공지 예정입니다.",
    };
  }

  const repName = (formData.get("rep_name") as string | null)?.trim() ?? "";
  const phoneRaw = (formData.get("phone") as string | null)?.trim() ?? "";
  const region = (formData.get("region") as string | null)?.trim() ?? "";
  const campingRaw = (formData.get("camping") as string | null)?.trim() ?? "";
  const tentRaw = (formData.get("tent_rental") as string | null)?.trim() ?? "no";
  const note = (formData.get("note") as string | null)?.trim() ?? "";
  const participantsJson = (formData.get("participants_json") as string | null) ?? "[]";

  if (!repName || !phoneRaw || !region) {
    return { success: false, message: "본인 이름·연락처·참가지역은 필수입니다." };
  }

  const phone = phoneRaw.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 11) {
    return { success: false, message: "유효한 연락처를 입력해 주세요." };
  }

  const camping = campingRaw === "deck" || campingRaw === "noji" ? campingRaw : null;
  // 텐트 대여는 캠핑 신청 시에만 의미 있음 (수요 조사)
  const tentRental = camping !== null && tentRaw === "yes";

  let participants: ParticipantInput[];
  try {
    participants = JSON.parse(participantsJson);
  } catch {
    return { success: false, message: "참가자 정보를 다시 입력해 주세요." };
  }

  if (!Array.isArray(participants) || participants.length === 0) {
    return { success: false, message: "참가자를 최소 1명 추가해 주세요." };
  }

  // 참가자 검증 + 연령 제한 검사
  const cleaned: ParticipantInput[] = [];
  for (const p of participants) {
    const name = String(p?.name ?? "").trim();
    const age = Number(p?.age);
    if (!name) return { success: false, message: "참가자 이름을 모두 입력해 주세요." };
    if (!Number.isFinite(age) || age < 0 || age > 120) {
      return { success: false, message: `${name}님의 나이를 올바르게 입력해 주세요.` };
    }
    const exps = Array.isArray(p?.experiences) ? p.experiences : [];
    // 배타 그룹(서핑·SUP·랜드서핑·볼더링) 1인 1종목 제한
    const activityCount = exps.filter((e) => getExperience(e.key)?.exclusiveGroup === "activity").length;
    if (activityCount > 1) {
      return {
        success: false,
        message: `${name}님: 서핑·SUP·랜드서핑·볼더링은 한 분당 1종목만 신청할 수 있습니다.`,
      };
    }
    for (const e of exps) {
      if (!VALID_KEYS.has(e.key)) {
        return { success: false, message: "선택할 수 없는 체험이 포함되어 있습니다." };
      }
      const exp = getExperience(e.key)!;
      if (exp.slots && !e.slot) {
        return { success: false, message: `「${exp.label}」 참여 타임을 선택해 주세요.` };
      }
      if (typeof exp.minAge === "number" && age < exp.minAge) {
        return {
          success: false,
          message: `${name}님(만 ${age}세)은 「${experienceLabel(e.key, e.slot)}」 연령 조건(만 ${exp.minAge}세 이상)에 맞지 않습니다.`,
        };
      }
    }
    cleaned.push({
      name,
      age,
      experiences: exps.map((e) => ({ key: e.key, slot: e.slot ?? null })),
    });
  }

  // 중복 참가자 가드: 같은 이름+나이가 두 번 이상이면 차단 (정원 중복 점유 방지)
  const seen = new Set<string>();
  for (const p of cleaned) {
    const dupKey = `${p.name}|${p.age}`;
    if (seen.has(dupKey)) {
      return {
        success: false,
        message: `참가자 "${p.name}"(만 ${p.age}세)가 중복 입력되었습니다. 같은 분은 한 번만 추가해 주세요.`,
      };
    }
    seen.add(dupKey);
  }

  const input: SubmitInput = { rep_name: repName, phone, region, camping, tent_rental: tentRental, note, participants: cleaned };

  let result: SubmitResult;
  try {
    result = await submitRegistration(input);
  } catch (error) {
    console.error("[festival] submit error:", error);
    return { success: false, message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." };
  }

  // 관리자 이메일 + 신청자 SMS (실패해도 접수는 성공 처리)
  const totalPeople = cleaned.length;
  const adminRows = cleaned
    .map(
      (p) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;">${p.name} (만 ${p.age}세)</td><td style="padding:8px;border:1px solid #ddd;">${
          p.experiences.length ? p.experiences.map((e) => experienceLabel(e.key, e.slot)).join(", ") : "(체험 미신청)"
        }</td></tr>`,
    )
    .join("");
  const campingText = camping ? (camping === "deck" ? "데크(무료)" : "노지(무료)") : "미신청";
  const tentText = camping ? (tentRental ? "필요 (대여 희망)" : "직접 지참") : "-";

  try {
    await resend?.emails.send({
      from: "로마드 페스티벌 <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: `[현남생활 페스티벌 접수] ${repName} (참가자 ${totalPeople}명)`,
      html: `
        <h2 style="color:#0B1F3A;margin-bottom:4px;">현남생활 페스티벌 접수</h2>
        <p style="color:#666;font-size:13px;margin-top:0;">로마드 홈페이지 자동 접수</p>
        <table style="border-collapse:collapse;font-family:'Noto Sans KR',sans-serif;font-size:14px;">
          <tr><td style="padding:8px;border:1px solid #ddd;background:#FAF5EE;font-weight:bold;">신청자</td><td style="padding:8px;border:1px solid #ddd;">${repName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#FAF5EE;font-weight:bold;">연락처</td><td style="padding:8px;border:1px solid #ddd;">${phoneRaw}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#FAF5EE;font-weight:bold;">참가지역</td><td style="padding:8px;border:1px solid #ddd;">${region}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#FAF5EE;font-weight:bold;">캠핑</td><td style="padding:8px;border:1px solid #ddd;">${campingText}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#FAF5EE;font-weight:bold;">텐트 대여</td><td style="padding:8px;border:1px solid #ddd;">${tentText}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;background:#FAF5EE;font-weight:bold;">비고</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${note || "-"}</td></tr>
        </table>
        <h3 style="margin:16px 0 4px;">참가자 / 신청 체험</h3>
        <table style="border-collapse:collapse;font-family:'Noto Sans KR',sans-serif;font-size:14px;">${adminRows}</table>
        ${result.waitlisted.length ? `<p style="color:#b45309;">⏳ 대기 발생: ${result.waitlisted.map((w) => `${w.participant}-${experienceLabel(w.key, w.slot)}`).join(", ")}</p>` : ""}
      `,
    });
  } catch (e) {
    console.error("[festival] resend email failed:", e);
  }

  try {
    await sendConfirmSms({
      phone,
      repName,
      confirmed: result.confirmed,
      waitlisted: result.waitlisted,
      camping: result.camping,
    });
  } catch (e) {
    console.error("[festival] confirm SMS failed:", e);
  }

  const waitMsg = result.waitlisted.length
    ? " 일부 체험은 정원이 차서 대기로 접수되었으며, 자리가 나면 순서대로 안내드립니다."
    : "";
  return {
    success: true,
    message: `접수가 완료되었습니다. 잠시 후 확인 문자가 발송됩니다.${waitMsg} 캠핑은 무료(양양군 농업기술센터 후원)이며 선셋 비치 테이블(2만원)만 현장 결제입니다.`,
    result,
  };
}
