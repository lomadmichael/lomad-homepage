"use client";

import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import { PARTNERS } from "@/data/partners";
import { SERVICES } from "@/data/services";

const RECORD_IMAGES = [
  "/images/records/record-01.jpg",
  "/images/records/record-02.jpg",
  "/images/records/record-03.jpg",
  "/images/records/record-04.jpg",
  "/images/records/record-05.jpg",
  "/images/records/record-06.jpg",
];

// 사업영역별 배경 색상 테마 (리듬감)
const SERVICE_THEME: Record<
  string,
  { bg: string; label: string; numberColor: string }
> = {
  "stay-tourism": {
    bg: "bg-[#2C4A5E]",
    label: "text-white/60",
    numberColor: "text-white",
  },
  "education-startup": {
    bg: "bg-[color:var(--color-warm-beige,#F0EDE8)]",
    label: "text-text-muted",
    numberColor: "text-text",
  },
  "local-brand": {
    bg: "bg-[#1A1A1A]",
    label: "text-white/60",
    numberColor: "text-white",
  },
  partnership: {
    bg: "bg-white",
    label: "text-text-muted",
    numberColor: "text-text",
  },
};

export default function PartnersOutcomesPage() {
  return (
    <>
      <PageHero
        labelEn="Impact & Evidence"
        titleEn="PARTNERS & OUTCOMES"
        subtitleKr="함께 일해도 되는 조직이라는 신뢰는, 누구와 일했고 무엇이 남았는지로 증명됩니다."
      />

      {/* 1. IMPACT — Partners 로고 */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        <FadeIn>
          <section id="partners" className="py-[80px]">
            <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-[48px]">
              01 — IMPACT
            </p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center">
              {PARTNERS.map((partner) => (
                <div
                  key={partner.name}
                  className="relative h-[80px] md:h-[100px] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>

      {/* 2. Impact by Service Area — 사업영역별 임팩트 */}
      <section className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-[60px] pt-[80px] pb-[20px]">
          <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
            02 — Impact by Service Area
          </p>
          <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-5">
            사업영역별 임팩트
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub max-w-[640px] leading-relaxed mb-[60px]">
            각 사업영역이 어떤 지역 문제를 다루고, 어떤 방식으로 접근하며,
            어떤 성과와 사례로 이어졌는지 한눈에 확인하세요.
          </p>
        </div>

        {SERVICES.map((service, idx) => {
          const theme = SERVICE_THEME[service.id];
          const isDark =
            service.id === "stay-tourism" || service.id === "local-brand";

          return (
            <FadeIn key={service.id}>
              <section className={`w-full ${theme.bg} py-[80px]`}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
                  {/* 헤더 */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-12">
                    <div className="md:col-span-1">
                      <p
                        className={`font-[family-name:var(--font-karla)] text-[14px] font-extrabold tracking-[2px] ${theme.label}`}
                      >
                        0{idx + 1}
                      </p>
                    </div>
                    <div className="md:col-span-11">
                      <p
                        className={`font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase ${theme.label} mb-3`}
                      >
                        {service.titleEn}
                      </p>
                      <h3
                        className={`font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black leading-tight ${
                          isDark ? "text-white" : "text-text"
                        }`}
                      >
                        {service.titleKr}
                      </h3>
                    </div>
                  </div>

                  {/* Problem / Approach */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-[60px] md:ml-[calc(100%/12)]">
                    <div
                      className={`border-l-2 ${isDark ? "border-white/30" : "border-text"} pl-5`}
                    >
                      <p
                        className={`font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase ${theme.label} mb-3`}
                      >
                        Problem
                      </p>
                      <p
                        className={`font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] leading-[1.9] ${
                          isDark ? "text-white/85" : "text-text-sub"
                        }`}
                      >
                        {service.impact.problem}
                      </p>
                    </div>
                    <div
                      className={`border-l-2 ${isDark ? "border-white/30" : "border-text"} pl-5`}
                    >
                      <p
                        className={`font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase ${theme.label} mb-3`}
                      >
                        Approach
                      </p>
                      <p
                        className={`font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] leading-[1.9] ${
                          isDark ? "text-white/85" : "text-text-sub"
                        }`}
                      >
                        {service.impact.approach}
                      </p>
                    </div>
                  </div>

                  {/* Numbers */}
                  <div className="grid grid-cols-3 gap-4 md:gap-[16px] mb-[60px] md:ml-[calc(100%/12)]">
                    {service.impact.numbers.map((stat) => (
                      <div
                        key={stat.label}
                        className={`border ${
                          isDark
                            ? "border-white/20 bg-white/5"
                            : "border-border bg-white"
                        } text-center p-[24px] md:p-[32px]`}
                      >
                        <p
                          className={`font-[family-name:var(--font-karla)] text-[36px] md:text-[48px] font-bold leading-none mb-2 ${theme.numberColor}`}
                        >
                          <CountUp end={stat.end} suffix={stat.suffix ?? ""} />
                        </p>
                        <p
                          className={`font-[family-name:var(--font-noto)] text-[11px] md:text-[13px] leading-snug ${
                            isDark ? "text-white/70" : "text-text-sub"
                          }`}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Story */}
                  <div className="md:ml-[calc(100%/12)]">
                    <p
                      className={`font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase ${theme.label} mb-3`}
                    >
                      Representative Story
                    </p>
                    <h4
                      className={`font-[family-name:var(--font-noto)] text-[20px] md:text-[24px] font-black leading-snug mb-3 ${
                        isDark ? "text-white" : "text-text"
                      }`}
                    >
                      {service.impact.story.title}
                    </h4>
                    <p
                      className={`font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] max-w-[720px] ${
                        isDark ? "text-white/80" : "text-text-sub"
                      }`}
                    >
                      {service.impact.story.summary}
                    </p>

                    <div className="mt-6">
                      <Button
                        variant={isDark ? "white" : "primary"}
                        href={`/contact?type=${encodeURIComponent(service.inquiryType)}`}
                      >
                        {service.titleKr} 의뢰하기
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </FadeIn>
          );
        })}
      </section>

      {/* 3. Records */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        <FadeIn>
          <section
            id="records"
            className="py-[80px] border-t border-border"
          >
            <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
              03 — Records
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-3">
              기록과 아카이브
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px] max-w-[560px]">
              현장 사진, 보도자료, 결과보고서로 로마드의 활동을 남깁니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] mb-[48px]">
              {RECORD_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="relative h-[200px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`기록 ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <Button variant="primary" href="/contact">
              협업 문의하기
            </Button>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
