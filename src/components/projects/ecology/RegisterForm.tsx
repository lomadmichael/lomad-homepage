"use client";

import { useActionState, useState } from "react";
import { submitEcology, type EcologyFormState } from "@/lib/ecology-action";
import { SESSIONS, CAPACITY } from "@/lib/ecology-config";

const initial: EcologyFormState = { success: false, message: "" };

interface PartRow {
  name: string;
  age: string;
}

function categoryLabel(ageStr: string): string {
  const age = Number(ageStr);
  if (!Number.isFinite(age) || ageStr === "") return "";
  if (age >= 19) return "성인";
  if (age >= 14) return "만14세 이상";
  return "만14세 미만";
}

export default function RegisterForm({
  availability,
}: {
  availability: Record<string, { confirmed: number; waitlist: number }>;
}) {
  const [state, formAction, pending] = useActionState(submitEcology, initial);
  const [participants, setParticipants] = useState<PartRow[]>([{ name: "", age: "" }]);

  const participantsJson = JSON.stringify(
    participants.map((p) => ({ name: p.name.trim(), age: Number(p.age) })),
  );

  if (state.success) {
    return (
      <div className="border border-border bg-bg-soft p-8 text-center">
        <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#0B7A5A] mb-3">
          {state.result?.status === "confirmed" ? "Confirmed" : "Waitlisted"}
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-3">
          {state.result?.status === "confirmed" ? "접수가 확정되었습니다" : "대기로 접수되었습니다"}
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub leading-relaxed">
          {state.message}
        </p>
        <a href="/ecology/my" className="inline-block mt-6 text-[13px] underline">
          내 신청 조회하기 →
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="participants_json" value={participantsJson} />

      {/* 회차 선택 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-3">
          참여 회차
        </legend>
        <div className="space-y-2">
          {SESSIONS.map((s) => {
            const a = availability[s.key] ?? { confirmed: 0, waitlist: 0 };
            const remain = Math.max(0, CAPACITY - a.confirmed);
            const full = remain === 0;
            return (
              <label
                key={s.key}
                className="flex items-center gap-3 border border-border px-4 py-3 cursor-pointer hover:border-text text-[14px]"
              >
                <input type="radio" name="session_key" value={s.key} required className="accent-text" />
                <span className="flex-1">{s.label}</span>
                <span
                  className={`text-[12px] font-bold ${full ? "text-[#b45309]" : "text-[#0B7A5A]"}`}
                >
                  {full ? "대기접수 (마감)" : `잔여 ${remain}석`}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 신청자(대표) */}
      <div>
        <p className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-3">신청자 정보</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field name="guardian_name" label="신청자(대표) 이름" required />
          <Field name="phone" label="휴대폰 번호" placeholder="010-1234-5678" required inputMode="tel" />
        </div>
        <div className="mt-4">
          <Field name="email" label="이메일 (선택)" placeholder="확인·안내용" inputMode="email" />
        </div>
      </div>

      {/* 참가자 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-1">
          참가자
        </legend>
        <p className="text-[12px] text-text-muted mb-3">
          함께 참여하는 분을 모두 추가해 주세요 (동반 보호자 포함). 참가 어린이는 초등학생 이상입니다.
          <br />
          회차당 <strong>참가자 전원 {CAPACITY}명</strong>까지 접수됩니다.
        </p>
        <div className="space-y-2">
          {participants.map((p, i) => {
            const cat = categoryLabel(p.age);
            return (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={p.name}
                  placeholder="성명"
                  onChange={(e) =>
                    setParticipants((prev) =>
                      prev.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)),
                    )
                  }
                  className="flex-1 bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
                />
                <div className="relative">
                  <input
                    value={p.age}
                    placeholder="만 나이"
                    inputMode="numeric"
                    onChange={(e) =>
                      setParticipants((prev) =>
                        prev.map((x, j) =>
                          j === i ? { ...x, age: e.target.value.replace(/\D/g, "") } : x,
                        ),
                      )
                    }
                    className="w-28 bg-input-bg h-11 px-3 pr-14 text-[14px] border border-border outline-none focus:border-text"
                  />
                  {cat && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-text-muted pointer-events-none">
                      {cat}
                    </span>
                  )}
                </div>
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setParticipants((prev) => prev.filter((_, j) => j !== i))}
                    className="w-11 h-11 border border-border text-text-muted hover:text-[#b45309] shrink-0"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setParticipants((prev) => [...prev, { name: "", age: "" }])}
          className="mt-2 text-[12px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text px-3 py-2 hover:bg-text hover:text-bg"
        >
          + 참가자 추가
        </button>
      </fieldset>

      {/* 건강 특이사항 */}
      <div>
        <label className="font-[family-name:var(--font-noto)] text-[14px] font-black block mb-1">
          건강 특이사항 (선택)
        </label>
        <p className="text-[12px] text-text-muted mb-2">
          알레르기·복용약·활동 제한 등 안전상 참고할 사항. 없으면 비워두세요.
        </p>
        <textarea
          name="health_note"
          rows={2}
          className="w-full bg-input-bg px-3 py-2 text-[14px] border border-border outline-none focus:border-text"
        />
      </div>

      {/* 동의 */}
      <div className="space-y-3 border-t border-border pt-6">
        <Consent
          name="consent_privacy"
          required
          label="[필수] 개인정보 수집·이용 동의"
          desc="수집 항목: 신청자·참가자 성명, 만나이, 연락처, 이메일. 목적: 접수·안내·안전관리. 보유: 프로그램 종료 후 1년 이내 파기. 동의하지 않으면 참가가 제한됩니다."
        />
        <Consent
          name="consent_notice"
          required
          label="[필수] 안내사항 확인"
          desc="야외에서 진행되며 기상 상황에 따라 일정이 변경·취소될 수 있습니다. 운영진의 안전 안내를 준수하며, 본인 부주의로 인한 사고는 보상이 제한될 수 있습니다."
        />
        <Consent
          name="consent_media"
          label="[선택] 사진·영상 활용 및 양양군 제공 동의"
          desc="프로그램 중 촬영된 사진·영상을 성과보고·홍보에 활용하고, 성명·연락처 등을 양양군에 성과보고·운영 확인 목적으로 제공하는 데 동의합니다. 동의하지 않아도 참가할 수 있습니다."
        />
      </div>

      {state.message && !state.success && (
        <p className="text-[13px] text-[#b45309] font-[family-name:var(--font-noto)]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full h-12 bg-text text-bg font-[family-name:var(--font-noto)] font-black text-[15px] disabled:opacity-50"
      >
        {pending ? "접수 중…" : "접수하기"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  placeholder,
  inputMode,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  inputMode?: "tel" | "email";
}) {
  return (
    <div>
      <label className="font-[family-name:var(--font-noto)] text-[14px] font-black block mb-2">
        {label}
        {required && <span className="text-[#FF6B6B]"> *</span>}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
      />
    </div>
  );
}

function Consent({
  name,
  label,
  desc,
  required,
}: {
  name: string;
  label: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-2.5 text-[13px] text-text-sub cursor-pointer">
      <input type="checkbox" name={name} required={required} className="accent-text mt-1 shrink-0" />
      <span>
        <span className="font-semibold text-text">{label}</span>
        <br />
        {desc}
      </span>
    </label>
  );
}
