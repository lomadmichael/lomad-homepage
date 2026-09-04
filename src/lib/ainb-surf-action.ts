"use server";

import { submitSurf, type Experience, type Gear } from "@/lib/ainb-surf-db";
import { findParticipant } from "@/lib/ainb-tour-config";

export interface SurfValues {
  name: string;
  phone: string;
  gender: string;
  height: string;
  weight: string;
  experience: string;
  gear: string;
  note: string;
}

export interface SurfFormState {
  success: boolean;
  message: string;
  updated?: boolean;
  values?: SurfValues;
}

const EXPERIENCES = new Set<Experience>(["none", "beginner", "experienced"]);
const GEARS = new Set<Gear>(["suit", "rashguard"]);

function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[^0-9]/g, "");
  if (d.length === 10 && d.startsWith("10")) d = "0" + d;
  return /^01[016789]\d{7,8}$/.test(d) ? d : null;
}

export async function submitSurfForm(
  _prev: SurfFormState,
  formData: FormData,
): Promise<SurfFormState> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const values: SurfValues = {
    name: get("name"),
    phone: get("phone"),
    gender: get("gender"),
    height: get("height"),
    weight: get("weight"),
    experience: get("experience"),
    gear: get("gear"),
    note: get("note"),
  };
  const fail = (message: string): SurfFormState => ({ success: false, message, values });

  if (!values.name) return fail("성명을 입력해 주세요.");

  const phone = normalizePhone(values.phone);
  if (!phone) return fail("휴대전화 번호를 정확히 입력해 주세요. (예: 010-1234-5678)");

  const participant = findParticipant(phone);
  if (!participant) {
    return fail("참가자 명단에서 번호를 찾지 못했습니다. 신청서에 적으신 번호로 입력해 주세요.");
  }
  if (participant.name.replace(/\s/g, "") !== values.name.replace(/\s/g, "")) {
    return fail("성명과 휴대전화 번호가 일치하지 않습니다.");
  }

  if (values.gender !== "남" && values.gender !== "여") return fail("성별을 선택해 주세요.");

  const height = Number(values.height);
  if (!Number.isInteger(height) || height < 100 || height > 230) {
    return fail("키를 cm 단위 숫자로 입력해 주세요. (예: 170)");
  }

  const weight = Number(values.weight);
  if (!Number.isInteger(weight) || weight < 30 || weight > 200) {
    return fail("몸무게를 kg 단위 숫자로 입력해 주세요. (예: 65)");
  }

  if (!EXPERIENCES.has(values.experience as Experience)) return fail("서핑 경험을 선택해 주세요.");
  if (!GEARS.has(values.gear as Gear)) return fail("슈트 착용 여부를 선택해 주세요.");

  try {
    const { updated } = await submitSurf({
      name: participant.name,
      phone,
      gender: values.gender,
      height_cm: height,
      weight_kg: weight,
      experience: values.experience as Experience,
      gear: values.gear as Gear,
      note: values.note,
    });
    return {
      success: true,
      updated,
      message: updated
        ? "이미 제출하신 내용이 있어 새로 입력하신 내용으로 수정했습니다."
        : "서핑 참가 신청이 완료되었습니다.",
    };
  } catch (e) {
    console.error("[ainb-surf] submit failed:", e);
    return fail("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }
}
