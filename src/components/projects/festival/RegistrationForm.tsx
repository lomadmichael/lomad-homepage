"use client";

import { useActionState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { submitFestival, type FestivalFormState } from "@/lib/festival-action";

const initialState: FestivalFormState = {
  success: false,
  message: "",
};

const PROGRAMS = [
  "서퍼's 나이트",
  "랜드서핑 페스타",
  "로컬 쿠킹클래스",
  "블루 웰니스 (요가·명상·핸드팬)",
  "비치 러닝",
  "선셋 공동 새참",
  "트로트 DJ 파티",
  "불꽃 피날레",
];

export default function RegistrationForm() {
  const [state, formAction] = useActionState(submitFestival, initialState);

  if (state.success) {
    return (
      <div className="max-w-[560px] mx-auto py-[80px] text-center">
        <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-4">
          Registration Complete
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[32px] font-black mb-5 leading-snug">
          접수가 완료되었습니다
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub leading-relaxed mb-10">
          {state.message}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="primary" href="/projects/hyeonnam-festival">
            페스티벌 페이지로
          </Button>
          <Button variant="outline" href="/">
            로마드 홈
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[640px] mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/projects/hyeonnam-festival"
          className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text mb-4 inline-flex items-center gap-1"
        >
          ← Festival Home
        </Link>
        <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-3">
          Register
        </p>
        <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[40px] font-black mb-3 leading-tight">
          참가 신청
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[13px] md:text-[14px] text-text-sub leading-relaxed">
          입장 무료 · 일부 체험만 사전 예약 필요.
          <br />
          접수 후 자세한 일정 · 체험 안내가 별도 발송됩니다.
        </p>
      </div>

      {state.message && !state.success && (
        <div className="mb-6 p-4 text-[13px] font-[family-name:var(--font-noto)] font-medium bg-[#C4A8A8]/20 text-[#6b3a3a]">
          {state.message}
        </div>
      )}

      <form action={formAction}>
        {/* 이름·연락처 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="이름" required>
            <input type="text" name="name" required className={inputCls} />
          </Field>
          <Field label="연락처" required>
            <input type="tel" name="phone" required placeholder="010-1234-5678" className={inputCls} />
          </Field>
        </div>

        <Field label="참여일" required>
          <select name="day" required defaultValue="" className={`${inputCls} appearance-none cursor-pointer`}>
            <option value="" disabled>
              참여하실 날짜를 선택해 주세요
            </option>
            <option value="7/4(토) 메인 데이">7/4(토) 메인 데이</option>
            <option value="7/5(일) 캠핑객 위주">7/5(일) 캠핑객 위주</option>
            <option value="둘 다 (1박 2일 · 캠핑 숙박)">둘 다 (1박 2일 · 캠핑 숙박)</option>
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Field label="성인 인원">
            <input type="number" name="adults" min={0} max={20} defaultValue={1} className={inputCls} />
          </Field>
          <Field label="아동 인원">
            <input type="number" name="children" min={0} max={20} defaultValue={0} className={inputCls} />
          </Field>
        </div>

        {/* 관심 프로그램 */}
        <div className="mb-6">
          <p className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub mb-3">
            관심 있는 프로그램 (복수 선택)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {PROGRAMS.map((p) => (
              <label
                key={p}
                className="flex items-center gap-2 cursor-pointer text-[13px] font-[family-name:var(--font-noto)] py-1"
              >
                <input
                  type="checkbox"
                  name="programs"
                  value={p}
                  className="w-4 h-4 cursor-pointer accent-text"
                />
                <span>{p}</span>
              </label>
            ))}
          </div>
          <p className="text-[11px] text-text-muted italic mt-3">
            ※ 프로그램 라인업은 확정 후 별도 안내드립니다.
          </p>
        </div>

        <Field label="남기실 말씀 (선택)">
          <textarea
            name="note"
            className={`${inputCls} min-h-[100px] py-3 resize-y h-auto`}
            placeholder="알레르기 · 특이사항 · 문의사항 등"
          />
        </Field>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" type="submit">
            접수하기
          </Button>
          <Button variant="outline" href="/projects/hyeonnam-festival">
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
        {label} {required && <span className="text-[#FF6B6B]">*</span>}
      </label>
      {children}
    </div>
  );
}
