"use client";

import { useActionState } from "react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { submitContact, type ContactFormState } from "./action";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const INQUIRY_TYPES = [
  "프로그램 참여",
  "협업 문의",
  "제작 문의",
  "기타",
];

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContact, initialState);

  return (
    <main>
      <PageHero
        titleEn="CONTACT"
        subtitleKr="협업, 프로그램 참여, 제작 관련 문의를 남겨주세요."
      />

      <FadeIn>
        <section className="max-w-[640px] mx-auto px-[60px] pb-[120px]">
          {/* Status message */}
          {state.message && (
            <div
              className={`mb-6 p-4 text-[13px] font-[family-name:var(--font-noto)] font-medium ${
                state.success
                  ? "bg-[#A8C4A0]/20 text-[#3a6b3a]"
                  : "bg-[#C4A8A8]/20 text-[#6b3a3a]"
              }`}
            >
              {state.message}
            </div>
          )}

          <form action={formAction}>
            {/* 2x2 grid top */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
                  이름 *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none"
                />
              </div>
              <div>
                <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none"
                />
              </div>
              <div>
                <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
                  이메일 *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none"
                />
              </div>
              <div>
                <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
                  소속
                </label>
                <input
                  type="text"
                  name="organization"
                  className="w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none"
                />
              </div>
            </div>

            {/* 문의 유형 */}
            <div className="mb-4">
              <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
                문의 유형
              </label>
              <select
                name="type"
                className="w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none appearance-none cursor-pointer"
              >
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 문의 내용 */}
            <div className="mb-8">
              <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
                문의 내용 *
              </label>
              <textarea
                name="content"
                required
                className="w-full bg-input-bg min-h-[140px] px-3 py-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none resize-y"
              />
            </div>

            <Button variant="primary" type="submit">
              문의하기
            </Button>
          </form>
        </section>
      </FadeIn>
    </main>
  );
}
