"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { SERVICES } from "@/data/services";

const TAB_ITEMS = [
  { id: "who", label: "Who We Are" },
  { id: "why", label: "Why We Exist" },
  { id: "how", label: "How We Work" },
  { id: "yangyang", label: "Why Yangyang" },
  { id: "partners", label: "Who We Work With" },
];

const PARTNER_CATEGORIES = [
  { titleEn: "Government", titleKr: "지자체 · 공공기관" },
  { titleEn: "Associations", titleKr: "협회 · 단체" },
  { titleEn: "Education", titleKr: "교육기관 · 연구기관" },
  { titleEn: "Private", titleKr: "민간 파트너 · 지역 브랜드" },
];

export default function AboutPage() {
  const [activeId, setActiveId] = useState("who");
  const whoRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const yangyangRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    who: whoRef,
    why: whyRef,
    how: howRef,
    yangyang: yangyangRef,
    partners: partnersRef,
  };

  const handleTabChange = (id: string) => {
    setActiveId(id);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <PageHero
        labelEn="About LOMAD"
        titleEn="양양의 자원을, 작동하는 프로젝트로"
        subtitleKr="로마드는 양양과 해안생활권의 사람, 공간, 이야기, 자원을 발굴해 체류 프로그램, 교육, 관광, 상품, 협업 사업으로 전환하는 실행형 지역기획 조직입니다."
      />

      <TabNav
        items={TAB_ITEMS}
        activeId={activeId}
        onTabChange={handleTabChange}
      />

      {/* 1. Who We Are */}
      <FadeIn>
        <section
          ref={whoRef}
          id="who"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                01 — Who We Are
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                로마드는 무엇을 하는 조직인가
              </h2>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[16px] font-semibold leading-[1.9] text-text mb-5">
                양양과 해안생활권의 사람, 공간, 이야기, 자원을 발굴해 체류
                프로그램, 교육, 관광, 상품, 협업 사업으로 전환하는 실행형
                지역기획 조직입니다.
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
                프로젝트를 나열하는 조직이 아니라, 지역 자원을 프로그램과
                사업으로 연결하는 구조를 설계하고 직접 운영합니다. 기획만
                하지 않고 운영까지 책임집니다.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 2. Why We Exist */}
      <FadeIn>
        <section
          ref={whyRef}
          id="why"
          className="w-full bg-[#2C4A5E] py-[80px]"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
              <div>
                <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-white/60 mb-3">
                  02 — Why We Exist
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black text-white leading-snug">
                  왜 이 일을 하는가
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                <div className="border-l-2 border-white/30 pl-6">
                  <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-white/85">
                    양양에는 매년 수많은 사람이 찾아오지만, 대부분 지역과
                    깊이 연결되지 못한 채 떠납니다. 지역 인구는 줄고, 자원은
                    소진됩니다.
                  </p>
                </div>
                <div className="border-l-2 border-white/30 pl-6">
                  <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-white/85">
                    로마드는 이 간극을 구조로 메웁니다. 체류·교육·관광·상품·
                    협업 사업을 통해 사람과 지역이 더 오래 연결되는 방식을
                    만듭니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 3. How We Work */}
      <FadeIn>
        <section
          ref={howRef}
          id="how"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                03 — How We Work
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                어떻게 일하는가
              </h2>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub mb-8">
                현장에서 출발해 구조로 남깁니다. 기획–운영–교육–브랜딩–협업
                실행까지 하나의 흐름 안에서 연결합니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {SERVICES.map((service, idx) => (
                  <div
                    key={service.id}
                    className="border-l-2 border-text pl-4 py-2"
                  >
                    <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-2">
                      0{idx + 1}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[14px] font-black leading-snug mb-2">
                      {service.titleKr}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[12px] leading-relaxed text-text-sub">
                      {service.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 4. Why Yangyang — 중요 섹션 */}
      <FadeIn>
        <section
          ref={yangyangRef}
          id="yangyang"
          className="w-full bg-[color:var(--color-warm-beige,#F0EDE8)] py-[80px]"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
              <div>
                <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                  04 — Why Yangyang
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                  왜 양양인가
                </h2>
              </div>
              <div>
                <p className="font-[family-name:var(--font-noto)] text-[16px] md:text-[17px] font-bold leading-[1.9] text-text mb-6">
                  양양은 관광지나 배경이 아닙니다. 해안생활권의 사람·산업·
                  문화·자연이 교차하는 현장입니다.
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub mb-4">
                  로마드는 양양을 소비하지 않고 오래 다룹니다. 지역의 사람을
                  이해하고, 공간을 읽고, 자원을 구조로 연결하는 방법을 현장에서
                  학습해 왔습니다.
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
                  이 현장 기반의 이해가 로마드의 지역 진정성을 만드는 핵심이며,
                  실제 프로젝트 실행 역량의 바탕입니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 5. Who We Work With */}
      <FadeIn>
        <section
          ref={partnersRef}
          id="partners"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                05 — Who We Work With
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                누구와 함께하는가
              </h2>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub mb-8">
                지자체·공공기관·협회·교육기관·민간 파트너가 각자의 자리에서
                로마드와 연결되는 지점을 만듭니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {PARTNER_CATEGORIES.map((cat) => (
                  <div
                    key={cat.titleEn}
                    className="pb-5 border-b border-border"
                  >
                    <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-2">
                      {cat.titleEn}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[14px] font-black leading-snug">
                      {cat.titleKr}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative h-[200px] rounded-lg overflow-hidden">
                <Image
                  src="/images/lomad-logo.png"
                  alt="로마드 로고"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px] text-center border-t border-border">
          <h2 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[28px] font-black mb-5">
            로마드와 함께 일해 보시겠어요?
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" href="/what-we-do">
              사업영역 보기
            </Button>
            <Button variant="outline" href="/contact">
              문의하기
            </Button>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
