"use server";

import { submitClass } from "@/lib/ainb-class-db";

export interface ClassValues {
  name: string;
  phone: string;
}

export interface ClassFormState {
  success: boolean;
  message: string;
  /** 같은 번호로 이미 신청된 경우 */
  duplicate?: boolean;
  values?: ClassValues;
}

const NAME_MAX = 30;

/** ainb-surf-action 과 같은 규칙: 숫자만, 10자리 "10…"이면 앞에 0 */
function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[^0-9]/g, "");
  if (d.length === 10 && d.startsWith("10")) d = "0" + d;
  return /^01[016789]\d{7,8}$/.test(d) ? d : null;
}

export async function submitClassForm(
  _prev: ClassFormState,
  formData: FormData,
): Promise<ClassFormState> {
  const get = (k: string) => ((formData.get(k) as string | null) ?? "").trim();

  const values: ClassValues = { name: get("name"), phone: get("phone") };
  const fail = (message: string): ClassFormState => ({ success: false, message, values });

  if (!values.name) return fail("이름을 입력해 주세요.");
  if (values.name.length > NAME_MAX) return fail(`이름은 ${NAME_MAX}자 이내로 입력해 주세요.`);

  const phone = normalizePhone(values.phone);
  if (!phone) return fail("연락처를 정확히 입력해 주세요. (예: 010-1234-5678)");

  try {
    const { duplicate } = await submitClass({ name: values.name, phone });
    return duplicate
      ? { success: true, duplicate: true, message: "이미 신청되어 있습니다" }
      : { success: true, message: "신청이 완료되었습니다" };
  } catch (e) {
    console.error("[ainb-class] submit failed:", e);
    return fail("신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }
}
