"use client";

import { useActionState } from "react";
import { submitSurfForm, type SurfFormState } from "@/lib/ainb-surf-action";

const initial: SurfFormState = { success: false, message: "" };

const EXPERIENCES = [
  { value: "none", label: "경험 없음" },
  { value: "beginner", label: "초보 (1~3번)" },
  { value: "experienced", label: "4번 이상" },
];

const GEARS = [
  { value: "suit", label: "슈트 착용 희망", hint: "몸에 맞는 사이즈로 준비해 드립니다" },
  { value: "rashguard", label: "래쉬가드 착용", hint: "본인 래쉬가드를 입고 참여합니다" },
];

const LABEL = "font-[family-name:var(--font-noto)] text-[13px] font-bold block mb-2";
const INPUT =
  "w-full border border-border px-4 py-3 font-[family-name:var(--font-noto)] text-[15px] bg-bg focus:border-text outline-none";

export default function SurfForm() {
  const [state, formAction, pending] = useActionState(submitSurfForm, initial);
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
        <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
          알려주신 키·몸무게에 맞춰 장비를 준비하겠습니다.
          <br />
          내용을 바꾸시려면 같은 번호로 다시 제출하시면 됩니다.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-7 underline font-bold font-[family-name:var(--font-noto)] text-[14px]"
        >
          다시 작성하기
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      {/* 본인 확인 */}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className={LABEL}>성명</span>
          <input name="name" required autoComplete="name" defaultValue={prev?.name} className={INPUT} />
        </label>
        <label className="block">
          <span className={LABEL}>휴대전화</span>
          <input
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-1234-5678"
            defaultValue={prev?.phone}
            className={INPUT}
          />
        </label>
      </div>

      {/* 성별 */}
      <div>
        <span className={LABEL}>성별</span>
        <div className="grid grid-cols-2 gap-3">
          {["남", "여"].map((g) => (
            <label
              key={g}
              className="flex items-center justify-center gap-2 border border-border px-4 py-3 cursor-pointer has-[:checked]:border-text has-[:checked]:border-2 font-[family-name:var(--font-noto)] text-[15px]"
            >
              <input
                type="radio"
                name="gender"
                value={g}
                required
                defaultChecked={prev?.gender === g}
                className="accent-[#1A1A1A]"
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 키 · 몸무게 */}
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className={LABEL}>키 (cm)</span>
          <input
            name="height"
            required
            inputMode="numeric"
            placeholder="170"
            defaultValue={prev?.height}
            className={INPUT}
          />
        </label>
        <label className="block">
          <span className={LABEL}>몸무게 (kg)</span>
          <input
            name="weight"
            required
            inputMode="numeric"
            placeholder="65"
            defaultValue={prev?.weight}
            className={INPUT}
          />
        </label>
      </div>
      <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub -mt-4">
        슈트와 보드 사이즈를 맞추기 위해서만 사용하고, 프로그램이 끝나면 폐기합니다.
      </p>

      {/* 서핑 경험 */}
      <div>
        <span className={LABEL}>서핑 경험</span>
        <div className="space-y-3">
          {EXPERIENCES.map((e) => (
            <label
              key={e.value}
              className="flex items-center gap-3 border border-border px-4 py-3 cursor-pointer has-[:checked]:border-text has-[:checked]:border-2 font-[family-name:var(--font-noto)] text-[15px]"
            >
              <input
                type="radio"
                name="experience"
                value={e.value}
                required
                defaultChecked={prev?.experience === e.value}
                className="accent-[#1A1A1A]"
              />
              <span>{e.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 슈트 여부 */}
      <div>
        <span className={LABEL}>슈트 착용 여부</span>
        <div className="space-y-3">
          {GEARS.map((g) => (
            <label
              key={g.value}
              className="flex items-start gap-3 border border-border px-4 py-3 cursor-pointer has-[:checked]:border-text has-[:checked]:border-2"
            >
              <input
                type="radio"
                name="gear"
                value={g.value}
                required
                defaultChecked={prev?.gear === g.value}
                className="accent-[#1A1A1A] mt-1"
              />
              <span className="font-[family-name:var(--font-noto)] text-[15px]">
                {g.label}
                <span className="block text-[13px] text-text-sub mt-0.5">{g.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 비고 */}
      <label className="block">
        <span className={LABEL}>비고</span>
        <textarea
          name="note"
          rows={3}
          placeholder="요청사항이 있으면 적어주세요."
          defaultValue={prev?.note}
          className={`${INPUT} resize-none`}
        />
      </label>

      {state.message && !state.success && (
        <p className="border border-[#C0392B] bg-[#FDECEA] text-[#8E2A20] px-4 py-3 font-[family-name:var(--font-noto)] text-[14px] leading-[1.7]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 bg-text text-bg font-[family-name:var(--font-noto)] text-[16px] font-black disabled:opacity-40"
      >
        {pending ? "제출 중…" : "서핑 참가 신청하기"}
      </button>
    </form>
  );
}
