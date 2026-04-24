"use client";

import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import { PARTNERS } from "@/data/partners";
import { OUTCOMES, OUTCOME_STORIES } from "@/data/outcomes";

const RECORD_IMAGES = [
  "/images/records/record-01.jpg",
  "/images/records/record-02.jpg",
  "/images/records/record-03.jpg",
  "/images/records/record-04.jpg",
  "/images/records/record-05.jpg",
  "/images/records/record-06.jpg",
];

export default function PartnersOutcomesPage() {
  return (
    <>
      <PageHero
        labelEn="Trust & Evidence"
        titleEn="PARTNERS & OUTCOMES"
        subtitleKr="함께 일해도 되는 조직이라는 신뢰는, 누구와 일했고 무엇이 남았는지로 증명됩니다."
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        {/* 1. Partners */}
        <FadeIn>
          <section id="partners" className="py-[80px]">
            <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
              01 — IMPACT
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-[48px]">
              함께한 기관과 파트너
            </h2>
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

        {/* 2. Outcomes — 숫자로 보는 로마드 */}
        <FadeIn>
          <section
            id="outcomes"
            className="py-[80px] border-t border-border"
          >
            <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
              02 — Outcomes
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-[48px]">
              숫자로 보는 로마드
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-[16px]">
              {OUTCOMES.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border text-center p-[28px]"
                >
                  <p className="font-[family-name:var(--font-karla)] text-[40px] md:text-[48px] font-bold leading-none mb-2">
                    <CountUp end={stat.end} suffix={stat.suffix ?? ""} />
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* 3. Outcome Stories */}
        <FadeIn>
          <section
            id="stories"
            className="py-[80px] border-t border-border"
          >
            <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
              03 — Outcome Stories
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-3">
              대표 사례
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px] max-w-[560px]">
              문제–방식–결과의 흐름으로 정리한 협업 사례입니다.
            </p>
            <div className="flex flex-col gap-8">
              {OUTCOME_STORIES.map((story) => (
                <div
                  key={story.title}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10 pb-8 border-b border-border last:border-b-0"
                >
                  <h3 className="font-[family-name:var(--font-noto)] text-[18px] md:text-[20px] font-black leading-snug md:col-span-1">
                    {story.title}
                  </h3>
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                        Problem
                      </p>
                      <p className="font-[family-name:var(--font-noto)] text-[13px] leading-relaxed text-text-sub">
                        {story.problem}
                      </p>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                        Approach
                      </p>
                      <p className="font-[family-name:var(--font-noto)] text-[13px] leading-relaxed text-text-sub">
                        {story.approach}
                      </p>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                        Result
                      </p>
                      <p className="font-[family-name:var(--font-noto)] text-[13px] leading-relaxed text-text-sub">
                        {story.result}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* 4. Media / Records */}
        <FadeIn>
          <section
            id="records"
            className="py-[80px] border-t border-border"
          >
            <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
              04 — Media & Records
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
