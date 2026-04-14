"use client";

import { useActionState, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { submitContact, type ContactFormState } from "./action";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

const INQUIRY_TYPES = [
  "프로그램 운영 문의",
  "교육 프로그램 문의",
  "협업·용역 문의",
  "홈페이지 제작 문의",
  "기타 문의",
];

const PARTNER_TARGETS = [
  { titleEn: "Government", titleKr: "지자체·공공기관" },
  { titleEn: "Associations", titleKr: "협회·단체" },
  { titleEn: "Education", titleKr: "교육기관·연구기관" },
  { titleEn: "Private", titleKr: "민간 파트너·지역 브랜드" },
];

function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState(INQUIRY_TYPES[0]);

  // URL 쿼리 파라미터 ?type= 로 inquiryType 사전 선택
  useEffect(() => {
    const qType = searchParams.get("type");
    if (qType && INQUIRY_TYPES.includes(qType)) {
      setSelectedType(qType);
    }
  }, [searchParams]);

  return (
    <section className="max-w-[1000px] mx-auto px-6 md:px-[60px] pb-[120px]">
      {/* 함께 일하고 싶은 대상 */}
      <div className="mb-[60px]">
        <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
          Who We Work With
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[28px] font-black mb-6 leading-snug">
          함께 일하고 싶은 대상
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PARTNER_TARGETS.map((t) => (
            <div key={t.titleEn} className="pb-5 border-b border-border">
              <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-2">
                {t.titleEn}
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-black leading-snug">
                {t.titleKr}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 상태 메시지 */}
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

      <form action={formAction} className="max-w-[720px]">
        {/* 2x2 grid top */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

        {/* 의뢰 유형 */}
        <div className="mb-4">
          <label className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5">
            의뢰 유형 *
          </label>
          <select
            name="type"
            required
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
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
            className="w-full bg-input-bg min-h-[160px] px-3 py-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none resize-y"
            placeholder="프로젝트 배경, 기대하는 결과, 일정·예산 등을 자유롭게 적어주세요."
          />
        </div>

        <Button variant="primary" type="submit">
          문의하기
        </Button>
      </form>
    </section>
  );
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        labelEn="Inquiry"
        titleEn="CONTACT"
        subtitleKr="프로그램 운영, 교육 프로그램, 협업·용역, 홈페이지 제작 문의 — 의뢰 유형에 맞게 답변드립니다."
      />

      <FadeIn>
        <Suspense
          fallback={
            <div className="max-w-[640px] mx-auto px-6 md:px-[60px] pb-[120px] text-center py-[80px]">
              Loading...
            </div>
          }
        >
          <ContactForm />
        </Suspense>
      </FadeIn>
    </main>
  );
}
