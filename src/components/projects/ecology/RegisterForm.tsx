"use client";

import { useActionState, useState } from "react";
import { submitEcology, type EcologyFormState } from "@/lib/ecology-action";
import { SESSIONS, CAPACITY } from "@/lib/ecology-config";

const initial: EcologyFormState = { success: false, message: "" };

interface ChildRow {
  name: string;
  age: string;
}

export default function RegisterForm({
  availability,
}: {
  availability: Record<string, { confirmed: number; waitlist: number }>;
}) {
  const [state, formAction, pending] = useActionState(submitEcology, initial);
  const [children, setChildren] = useState<ChildRow[]>([{ name: "", age: "" }]);

  const childrenJson = JSON.stringify(
    children.map((c) => ({ name: c.name.trim(), age: Number(c.age) })),
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
      <input type="hidden" name="children_json" value={childrenJson} />

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

      {/* 보호자 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="guardian_name" label="보호자 이름" required />
        <Field name="phone" label="휴대폰 번호" placeholder="010-1234-5678" required inputMode="tel" />
      </div>

      {/* 어린이 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-1">
          참가 어린이
        </legend>
        <p className="text-[12px] text-text-muted mb-3">
          초등학생 이상만 참가할 수 있어요. 형제자매는 + 버튼으로 추가하세요.
        </p>
        <div className="space-y-2">
          {children.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={c.name}
                placeholder="이름"
                onChange={(e) =>
                  setChildren((p) => p.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                }
                className="flex-1 bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
              />
              <input
                value={c.age}
                placeholder="만 나이"
                inputMode="numeric"
                onChange={(e) =>
                  setChildren((p) =>
                    p.map((x, j) => (j === i ? { ...x, age: e.target.value.replace(/\D/g, "") } : x)),
                  )
                }
                className="w-24 bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
              />
              {children.length > 1 && (
                <button
                  type="button"
                  onClick={() => setChildren((p) => p.filter((_, j) => j !== i))}
                  className="w-11 h-11 border border-border text-text-muted hover:text-[#b45309]"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setChildren((p) => [...p, { name: "", age: "" }])}
          className="mt-2 text-[12px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text px-3 py-2 hover:bg-text hover:text-bg"
        >
          + 어린이 추가
        </button>
      </fieldset>

      {/* 비고 */}
      <div>
        <label className="font-[family-name:var(--font-noto)] text-[14px] font-black block mb-2">
          요청사항 (선택)
        </label>
        <textarea
          name="note"
          rows={2}
          className="w-full bg-input-bg px-3 py-2 text-[14px] border border-border outline-none focus:border-text"
        />
      </div>

      {/* 동의 */}
      <label className="flex items-start gap-2 text-[13px] text-text-sub">
        <input type="checkbox" name="consent" className="accent-text mt-1" />
        <span>
          개인정보 수집·이용에 동의합니다. (수집 항목: 보호자명·연락처·어린이 이름·나이 / 목적:
          접수·안내 / 보유: 프로그램 종료 후 파기)
        </span>
      </label>

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
  inputMode?: "tel";
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
