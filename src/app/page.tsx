"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SectionDivider from "@/components/ui/SectionDivider";
import { SERVICES } from "@/data/services";
import { useState } from "react";

export default function Home() {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <section className="relative h-[480px] md:h-[720px] overflow-hidden">
        {/* Background */}
        {!heroImgError ? (
          <Image
            src="/images/hero_02.jpg"
            alt="Yangyang coastal landscape"
            fill
            className="object-cover"
            priority
            onError={() => setHeroImgError(true)}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #5B8FA8 0%, #2C4A5E 40%, #1A3040 100%)",
            }}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <p className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] tracking-[6px] opacity-70 mb-6">
            IDENTITY · EXPERTISE · LOCAL INTEGRITY
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[32px] md:text-[56px] font-black leading-[1.15]">
            머무름이
          </h1>
          <h1 className="font-[family-name:var(--font-noto)] text-[32px] md:text-[56px] font-black leading-[1.15]">
            관계가 되는 곳
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] font-medium opacity-80 mt-6 max-w-[640px] leading-relaxed">
            체류 프로그램, 교육, 관광, 상품, 협업 구조를 통해
            <br className="hidden md:block" />
            사람과 지역이 더 오래 연결되는 방식을 만듭니다.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-10">
            <Button variant="white" href="/what-we-do">
              사업영역 보기
            </Button>
            <Button variant="outline-white" href="/projects">
              프로젝트 보기
            </Button>
            <Button variant="outline-white" href="/contact">
              문의하기
            </Button>
          </div>
        </div>

        {/* Bottom-left caption */}
        <p className="absolute bottom-6 left-6 md:left-8 z-10 font-[family-name:var(--font-karla)] text-[9px] tracking-[2px] uppercase text-white opacity-30">
          LOMAD — Yangyang &amp; Coastal Life Zone
        </p>
      </section>

      {/* ── Section 2: 한 줄 정의 ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] pt-[60px] md:pt-[120px] pb-[50px]">
        <FadeIn>
          <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-5">
            Who We Are
          </p>
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] md:text-[52px] lg:text-[64px] font-extrabold uppercase leading-[1.05]">
            A REGIONAL
            <br />
            PLANNING STUDIO
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[17px] font-semibold text-text-sub mt-6 max-w-[760px] leading-relaxed">
            로마드는 양양과 해안생활권의 자원을 프로그램·교육·관광·상품·협업 구조로
            전환하는 실행형 지역기획 조직입니다.
          </p>
        </FadeIn>
      </section>

      {/* ── Section 3: 4개 사업영역 프리뷰 ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] pb-[80px]">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                What We Do
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[32px] font-black leading-tight">
                사업영역
              </h2>
            </div>
            <Link
              href="/what-we-do"
              className="font-[family-name:var(--font-karla)] text-[12px] font-extrabold tracking-[1.5px] uppercase text-text hover:opacity-60 transition-opacity"
            >
              전체 보기 →
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {SERVICES.map((service, idx) => (
            <FadeIn key={service.id}>
              <Link
                href={`/what-we-do#${service.id}`}
                className="group block pb-8 border-b border-border"
              >
                <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                  0{idx + 1} · {service.titleEn}
                </p>
                <h3 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[26px] font-black leading-tight mb-3 group-hover:opacity-60 transition-opacity">
                  {service.titleKr}
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-relaxed text-text-sub max-w-[520px]">
                  {service.tagline}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── Section 4: CLIENTS & PARTNERS ── */}
      <section className="px-6 md:px-[60px] py-[80px] max-w-[1400px] mx-auto">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] md:text-[42px] font-bold mb-4">
            CLIENTS &amp; PARTNERS
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] font-semibold text-text-sub mb-[48px]">
            함께한 파트너
          </p>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-[16px] items-center">
            {[
              { src: "/images/partners/partner-01.png", name: "강원특별자치도", maxH: "max-h-[45px]" },
              { src: "/images/partners/partner-02.png", name: "양양군", maxH: "max-h-[35px]" },
              { src: "/images/partners/partner-03.png", name: "강원농촌융복합산업지원센터", maxH: "max-h-[45px]" },
              { src: "/images/partners/partner-04.png", name: "양양군 서핑협회", maxH: "max-h-[35px]" },
              { src: "/images/partners/partner-05.png", name: "양양군체육회", maxH: "max-h-[45px]" },
              { src: "/images/partners/partner-08.png", name: "파트너 8", maxH: "max-h-[45px]" },
              { src: "/images/partners/partner-09.png", name: "파트너 9", maxH: "max-h-[45px]" },
              { src: "/images/partners/partner-10.png", name: "파트너 10", maxH: "max-h-[45px]" },
              { src: "/images/partners/partner-11.png", name: "파트너 11", maxH: "max-h-[45px]" },
            ].map((partner) => (
              <div
                key={partner.src}
                className="bg-white h-[80px] flex items-center justify-center rounded p-3 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={140}
                  height={70}
                  className={`object-contain ${partner.maxH}`}
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Divider ── */}
      <SectionDivider />

      {/* ── Section 5: CTA ── */}
      <section className="px-6 md:px-[60px] py-[100px] text-center">
        <FadeIn>
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] uppercase text-text-muted">
            Get In Touch
          </p>
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] font-bold mt-3">
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[15px] font-semibold text-text-sub mt-3 max-w-[520px] mx-auto leading-relaxed">
            프로그램 운영, 교육 프로그램, 협업·용역, 홈페이지 제작까지 — 의뢰 유형에
            맞춰 빠르게 답변드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="primary" href="/contact">
              문의하기
            </Button>
            <Button variant="outline" href="/partners-outcomes">
              협업 성과 보기
            </Button>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
