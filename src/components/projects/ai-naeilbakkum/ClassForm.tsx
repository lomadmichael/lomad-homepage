"use client";

import { useActionState, type ReactNode } from "react";
import { submitClassForm, type ClassFormState } from "@/lib/ainb-class-action";
import { CLASS_BRING, CLASS_DATETIME, CLASS_PLACE } from "@/lib/ainb-class-config";

const initial: ClassFormState = { success: false, message: "" };

const LABEL = "font-[family-name:var(--font-noto)] text-[15px] font-bold text-text block mb-2";
const INPUT =
  "w-full border border-border px-4 py-3 font-[family-name:var(--font-noto)] text-[16px] text-text bg-bg focus:border-text outline-none";

/** 일시·장소·준비물 — 페이지 상단과 완료 화면에서 같이 쓴다 */
export function ClassInfo() {
  const rows: [string, ReactNode][] = [
    ["일시", CLASS_DATETIME],
    ["장소", CLASS_PLACE],
    [
      "준비물",
      <ul key="bring" className="space-y-1">
        {CLASS_BRING.map((b) => (
          <li key={b}>· {b}</li>
        ))}
      </ul>,
    ],
  ];
  return (
    <dl className="border border-border divide-y divide-border text-left">
      {rows.map(([k, v]) => (
        <div key={k} className="flex gap-4 px-5 py-4">
          <dt className="font-[family-name:var(--font-noto)] text-[15px] font-black text-text w-[56px] shrink-0">
            {k}
          </dt>
          <dd className="font-[family-name:var(--font-noto)] text-[15px] font-normal leading-[1.8] text-text">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ClassForm() {
  const [state, formAction, pending] = useActionState(submitClassForm, initial);
  const prev = state.values;

  if (state.success) {
    return (
      <div className="border-2 border-text px-6 py-12 text-center">
        <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
          Done
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-3">
          {state.message}
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text mb-7">
          {state.duplicate
            ? "이 연락처로 이미 신청이 접수되어 있습니다. 다시 신청하지 않으셔도 됩니다."
            : "아래 일정에 맞춰 와 주세요."}
        </p>
        <ClassInfo />
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <label className="block">
        <span className={LABEL}>이름</span>
        <input
          name="name"
          required
          maxLength={30}
          autoComplete="name"
          defaultValue={prev?.name}
          className={INPUT}
        />
      </label>
      <label className="block">
        <span className={LABEL}>연락처</span>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-1234-5678"
          defaultValue={prev?.phone}
          className={INPUT}
        />
      </label>

      {state.message && !state.success && (
        <p className="border border-[#C0392B] bg-[#FDECEA] text-[#8E2A20] px-4 py-3 font-[family-name:var(--font-noto)] text-[15px] leading-[1.7]">
          {state.message}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="w-full py-4 bg-text text-bg font-[family-name:var(--font-noto)] text-[16px] font-black disabled:opacity-40"
        >
          {pending ? "신청 중…" : "신청하기"}
        </button>
        <p className="mt-3 font-[family-name:var(--font-noto)] text-[14px] leading-[1.7] text-text text-center">
          입력하신 이름과 연락처는 교육 안내 연락에만 사용합니다.
        </p>
      </div>
    </form>
  );
}
