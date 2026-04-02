"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SectionDivider from "@/components/ui/SectionDivider";
import RaysArt from "@/components/svg/RaysArt";
import EllipsesArt from "@/components/svg/EllipsesArt";
import WavesArt from "@/components/svg/WavesArt";
import { useState } from "react";

export default function Home() {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <main>
      {/* ── Section 1: Hero ── */}
      <section className="relative h-[400px] md:h-[700px] overflow-hidden">
        {/* Background */}
        {!heroImgError ? (
          <Image
            src="/images/hero.png"
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
        <div className="absolute inset-0 bg-black/35" />

        {/* Line art overlays */}
        <RaysArt
          className="absolute top-10 right-6 md:right-20 w-[160px] md:w-[260px] h-[160px] md:h-[260px] opacity-[0.08]"
          color="white"
        />
        <EllipsesArt
          className="absolute bottom-16 left-6 md:left-20 w-[120px] md:w-[200px] h-[90px] md:h-[140px] opacity-[0.06]"
          color="white"
        />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <p className="font-[family-name:var(--font-karla)] text-[12px] tracking-[6px] opacity-60 mb-6">
            CONNECTING PEOPLE AND PLACES
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[48px] font-black leading-tight">
            양양에서 관계를 만들고,
          </h1>
          <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[48px] font-black leading-tight">
            역할을 연결합니다
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[14px] font-medium opacity-50 mt-6 max-w-[600px]">
            체류 프로그램, 프로젝트, 상품화를 통해 사람과 지역이 더 오래
            연결되는 구조를 만듭니다.
          </p>
          <div className="flex gap-4 mt-10">
            <Button variant="white" href="/contact">
              Contact Us
            </Button>
            <Button variant="outline-white" href="/about">
              About Lomad
            </Button>
          </div>
        </div>

        {/* Bottom-left caption */}
        <p className="absolute bottom-6 left-6 md:left-8 z-10 font-[family-name:var(--font-karla)] text-[9px] tracking-[2px] uppercase text-white opacity-30">
          Yangyang, Hyeonnam — Badlbadl Program
        </p>
      </section>

      {/* ── Section 2: THE CORE OF OUR WORK ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] pt-[60px] md:pt-[120px] pb-[50px]">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-karla)] text-[40px] md:text-[60px] lg:text-[82px] font-extrabold uppercase leading-none lg:whitespace-nowrap">
            THE CORE OF OUR WORK
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[15px] font-semibold text-text-sub mt-4">
            로마드는 지역문제를 현장에서 실행 가능한 프로젝트와 프로그램으로
            풀어가고 있습니다.
          </p>
        </FadeIn>
      </section>

      {/* ── Section 3: Philosophy 3 Rows ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        {/* Row 1: CONNECTING STRUCTURE */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_220px_1fr] gap-8 lg:gap-6 pt-[60px] pb-[80px] items-start">
            <div className="font-[family-name:var(--font-noto)] text-[17px] font-black text-text leading-[2] whitespace-pre-line">
              {`양양에는 사람은 오지만,
그 흐름이 늘 지역의 관계와
기회로 이어지지는 않습니다.

방문과 체류는 늘었지만 남는 구조는 약하다는 문제,
생활인구와 주민이 연결되는 접점 부족.
로마드는 이 간극을 다룹니다.`}
            </div>
            <div className="hidden lg:block" />
            <div className="lg:text-right">
              <h3 className="font-[family-name:var(--font-karla)] text-[32px] font-extrabold leading-tight whitespace-pre-line">
                {`CONNECTING
STRUCTURE`}
              </h3>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-bold text-text-sub mt-2">
                사람과 지역의 연결 구조
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-semibold text-text-sub leading-loose mt-4">
                방문자가 머물고, 머문 사람이 역할을 갖고,
                <br />
                그 역할이 지역 안에서 순환하는 구조.
                <br />
                로마드는 이 흐름을 설계합니다.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Row 2: A REPEATABLE MODEL IN YANGYANG */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_220px_1fr] gap-8 lg:gap-6 pb-[80px] items-start">
            <div className="hidden lg:block" />
            <div className="hidden lg:block" />
            <div className="lg:text-right">
              <h3 className="font-[family-name:var(--font-karla)] text-[32px] font-extrabold leading-tight whitespace-pre-line">
                {`A REPEATABLE
MODEL IN YANGYANG`}
              </h3>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-bold text-text-sub mt-2">
                양양에서 반복 가능한 구조
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-semibold text-text-sub leading-loose mt-4">
                일회성 이벤트가 아닌,
                <br />
                계절마다 반복되고 확장 가능한 프로그램.
                <br />
                양양이라는 지역 안에서 실험하고 증명합니다.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Row 3: WIN-WIN ECOSYSTEM */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_220px_1fr] gap-8 lg:gap-6 pb-[120px] items-start">
            <div className="font-[family-name:var(--font-noto)] text-[17px] font-black text-text leading-[2]">
              지역 주민, 체류자, 기관, 기업이
              <br />
              각자의 역할로 참여하고,
              <br />
              함께 성장하는 생태계를 만듭니다.
              <br />
              <br />
              이 구조 안에서 누구도 소외되지 않고,
              <br />
              모두가 연결의 일부가 됩니다.
            </div>
            <div className="hidden lg:flex items-start justify-center pt-2">
              <WavesArt className="w-[200px] h-[200px]" />
            </div>
            <div className="lg:text-right">
              <h3 className="font-[family-name:var(--font-karla)] text-[32px] font-extrabold leading-tight whitespace-pre-line">
                {`WIN-WIN
ECOSYSTEM`}
              </h3>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-bold text-text-sub mt-2">
                상생하는 생태계
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-semibold text-text-sub leading-loose mt-4">
                주민과 방문자가 함께 만드는 가치,
                <br />
                지역과 외부가 연결되는 경제 순환.
                <br />
                로마드는 상생의 구조를 설계합니다.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Section 4: Divider ── */}
      <SectionDivider />

      {/* ── Section 5: WHAT WE DO ── */}
      <section className="px-6 md:px-[60px] py-[80px]">
        <FadeIn>
          <div className="flex items-center gap-5 mb-10">
            <div className="w-[48px] h-[48px] rounded-full bg-text" />
            <h2 className="font-[family-name:var(--font-karla)] text-[32px] md:text-[42px] font-bold">
              WHAT WE DO
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Card 1 */}
          <FadeIn delay={0}>
            <div>
              <div className="relative h-[260px] overflow-hidden">
                <Image src="/images/whatwedo-lomad.png" alt="로마드 소개" fill className="object-cover" />
              </div>
              <h3 className="font-[family-name:var(--font-karla)] text-[22px] font-bold mt-5">
                ABOUT LOMAD
              </h3>
              <p className="font-[family-name:var(--font-karla)] text-[10px] font-semibold uppercase text-text-muted mt-1">
                Who We Are & What We Believe
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[13px] font-medium text-text-sub mt-3 leading-relaxed">
                양양을 기반으로 사람과 지역의 연결 구조를 만드는
                협동조합입니다.
              </p>
            </div>
          </FadeIn>

          {/* Card 2 */}
          <FadeIn delay={0.1}>
            <div>
              <div className="relative h-[260px] overflow-hidden">
                <Image src="/images/whatwedo-project.png" alt="프로젝트" fill className="object-cover" />
              </div>
              <h3 className="font-[family-name:var(--font-karla)] text-[22px] font-bold mt-5">
                PROJECTS
              </h3>
              <p className="font-[family-name:var(--font-karla)] text-[10px] font-semibold uppercase text-text-muted mt-1">
                Programs & Initiatives
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[13px] font-medium text-text-sub mt-3 leading-relaxed">
                바들바들 체류 프로그램, 부업스쿨, 양양 프로젝트 등 현장에서
                실행하는 프로그램입니다.
              </p>
            </div>
          </FadeIn>

          {/* Card 3 */}
          <FadeIn delay={0.2}>
            <div>
              <div className="relative h-[260px] overflow-hidden">
                <Image src="/images/whatwedo-impact.png" alt="임팩트" fill className="object-cover" />
              </div>
              <h3 className="font-[family-name:var(--font-karla)] text-[22px] font-bold mt-5">
                IMPACT
              </h3>
              <p className="font-[family-name:var(--font-karla)] text-[10px] font-semibold uppercase text-text-muted mt-1">
                Results & Partnerships
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[13px] font-medium text-text-sub mt-3 leading-relaxed">
                지역 파트너와 함께 만들어낸 성과와 협업 사례를 소개합니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 6: Divider ── */}
      <SectionDivider />

      {/* ── Section 7: CUSTOM HOUSE ── */}
      <section className="px-6 md:px-[60px] py-[80px]">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[10px] font-semibold tracking-[3px] uppercase text-text-muted">
                Local Goods & Production
              </p>
              <h2 className="font-[family-name:var(--font-karla)] text-[38px] font-bold mt-2">
                CUSTOM HOUSE
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[13px] font-medium text-text-sub leading-relaxed mt-4">
                양양의 로컬 자원을 활용한 상품 기획, 제작, 유통을 담당합니다.
                <br />
                지역의 이야기를 담은 굿즈와 브랜드를 만들어
                <br />
                양양의 가치를 더 많은 사람에게 전달합니다.
              </p>
              <div className="flex gap-4 mt-8">
                <Button variant="primary">Store</Button>
                <Button variant="outline">Service</Button>
              </div>
            </div>
            <div className="relative h-[260px] overflow-hidden bg-white flex items-center justify-center">
              <Image src="/images/customhouse.jpg" alt="커스텀하우스" width={400} height={400} className="object-contain" />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Section 8: Divider ── */}
      <SectionDivider />

      {/* ── Section 9: CTA ── */}
      <section className="px-6 md:px-[60px] py-[100px] text-center">
        <FadeIn>
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] uppercase text-text-muted">
            Get In Touch
          </p>
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] font-bold mt-3">
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[15px] font-semibold text-text-sub mt-3">
            협업, 프로그램 참여, 제작 관련 문의를 남겨주세요.
          </p>
          <div className="mt-8">
            <Button variant="primary" href="/contact">
              Contact Us
            </Button>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
