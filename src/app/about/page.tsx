"use client";

import { Fragment, useState, useRef } from "react";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import { SERVICES } from "@/data/services";

const TAB_ITEMS = [
  { id: "who", label: "Who We Are" },
  { id: "why", label: "Why We Exist" },
  { id: "how", label: "How We Work" },
  { id: "coast", label: "Why 해안생활권" },
  { id: "partners", label: "Who We Work With" },
];

// Who We Are 시각 블록용 숫자 (프로젝트/파트너/참여자)
const QUICK_STATS = [
  { end: 17, label: "운영 프로젝트" },
  { end: 45, label: "협업 기관" },
  { end: 513, label: "프로그램 참여자" },
];

const PARTNER_CATEGORIES = [
  {
    titleEn: "Government",
    titleKr: "지자체·공공기관",
    example: "강원특별자치도, 양양군",
  },
  {
    titleEn: "Associations",
    titleKr: "협회·단체",
    example: "양양군서핑협회, 양양군체육회",
  },
  {
    titleEn: "Education",
    titleKr: "교육기관·연구기관",
    example: "강원대학교, 국민대학교",
  },
  {
    titleEn: "Private",
    titleKr: "민간 파트너·지역 브랜드",
    example: "SurfyyBeach, 지역 크리에이터",
  },
];

export default function AboutPage() {
  const [activeId, setActiveId] = useState("who");
  const whoRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const coastRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    who: whoRef,
    why: whyRef,
    how: howRef,
    coast: coastRef,
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
        titleEn="머무름이 관계가 되는 곳"
        subtitleKr="로마드는 양양과 해안생활권의 사람, 공간, 이야기, 자원을 발굴해 체류 프로그램, 교육, 관광, 상품, 협업 사업으로 전환하는 실행형 지역기획 조직입니다."
      />

      <TabNav
        items={TAB_ITEMS}
        activeId={activeId}
        onTabChange={handleTabChange}
      />

      {/* 1. Who We Are — 숫자 블록으로 시각화 */}
      <FadeIn>
        <section
          ref={whoRef}
          id="who"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                01 — Who We Are
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                로마드는 무엇을 하는 조직인가
              </h2>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[16px] md:text-[18px] font-semibold leading-[1.9] text-text mb-5">
                로마드는 방문을 관계로, 관계를 체류로, 체류를 지역의 역할과
                기회로 전환합니다.
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
                프로젝트를 나열하는 조직이 아니라, 지역 자원을 프로그램과
                사업으로 연결하는 구조를 설계하고 직접 운영합니다. 기획만
                하지 않고 운영까지 책임집니다.
              </p>
            </div>
          </div>

          {/* 숫자 블록 — 시각 요소 */}
          <div className="grid grid-cols-3 gap-[16px] md:ml-[calc(100%/3+2rem)]">
            {QUICK_STATS.map((stat) => (
              <div
                key={stat.label}
                className="border-l-2 border-text pl-4 py-2"
              >
                <p className="font-[family-name:var(--font-karla)] text-[32px] md:text-[44px] font-bold leading-none mb-2">
                  <CountUp end={stat.end} />
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[11px] md:text-[12px] text-text-sub leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* 2. Why We Exist — 딥 블루 */}
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
                    지역에 매년 수많은 사람이 찾아오지만, 대부분 지역과 깊이
                    연결되지 못한 채 떠납니다. 지역 인구는 줄고, 자원은
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

      {/* 3. How We Work — 프로세스 플로우 (화살표 연결) */}
      <FadeIn>
        <section
          ref={howRef}
          id="how"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-12">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                03 — How We Work
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                어떻게 일하는가
              </h2>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
                현장에서 출발해 구조로 남깁니다. 네 개의 사업영역을 하나의
                흐름 안에서 연결해 지역 안팎으로 순환시킵니다.
              </p>
            </div>
          </div>

          {/* 4단 프로세스 — 화살표로 연결 */}
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-4 md:gap-0">
            {SERVICES.map((service, idx) => (
              <Fragment key={service.id}>
                <div className="border border-border bg-white p-5 flex flex-col justify-between min-h-[160px]">
                  <div>
                    <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-2">
                      0{idx + 1}
                    </p>
                    <p className="font-[family-name:var(--font-karla)] text-[12px] font-extrabold tracking-[1.5px] uppercase text-text-sub mb-3">
                      {service.titleEn}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[14px] font-black leading-snug mb-3">
                      {service.titleKr}
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-noto)] text-[11px] leading-relaxed text-text-sub">
                    {service.tagline}
                  </p>
                </div>
                {idx < SERVICES.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-2 text-text-muted text-[20px]">
                    &rarr;
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* 4. Why 해안생활권 — 웜베이지 + 이미지 */}
      <FadeIn>
        <section
          ref={coastRef}
          id="coast"
          className="w-full bg-[color:var(--color-warm-beige,#F0EDE8)] py-[80px]"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-10">
              <div>
                <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                  04 — Why Coastal Life Zone
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                  왜 해안생활권인가
                </h2>
              </div>
              <div>
                <p className="font-[family-name:var(--font-noto)] text-[16px] md:text-[17px] font-bold leading-[1.9] text-text mb-6">
                  동해안의 해안생활권은 이미지만으로 기억되는 곳이 아닙니다.
                  이곳은 지역의 사람·산업·문화·자연이 교차하는 현장입니다.
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub mb-4">
                  로마드는 해안생활권을 관광지로만 소비하지 않고 지역에 사람이
                  오래 남을 수 있도록 노력합니다. 지역의 사람을 이해하고, 공간을
                  읽고, 자원을 구조로 연결하는 방법을 현장에서 학습해 왔습니다.
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
                  이 현장 기반의 이해가 로마드의 지역 진정성을 만드는 핵심이며,
                  실제 프로젝트 실행 역량의 바탕입니다.
                </p>
              </div>
            </div>

            {/* 이미지 블록 */}
            <div className="relative h-[260px] md:h-[360px] rounded-lg overflow-hidden">
              <Image
                src="/images/hero_02.jpg"
                alt="양양 해안생활권"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-white/70 mb-1">
                  Field
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[16px] md:text-[18px] font-black text-white">
                  양양 · 해안생활권
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 5. Who We Work With — 카테고리 카드 (로고 삭제) */}
      <FadeIn>
        <section
          ref={partnersRef}
          id="partners"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 mb-10">
            <div>
              <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                05 — Who We Work With
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black leading-snug">
                누구와 함께하는가
              </h2>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
                지자체·공공기관·협회·교육기관·민간 파트너가 각자의 자리에서
                로마드와 연결되는 지점을 만듭니다.
              </p>
            </div>
          </div>

          {/* 파트너 카테고리 카드 — 예시 기관명 포함 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PARTNER_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.titleEn}
                className="border border-border p-6 hover:border-text transition-colors"
              >
                <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-2">
                  0{idx + 1} · {cat.titleEn}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[17px] font-black leading-snug mb-3">
                  {cat.titleKr}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-relaxed">
                  {cat.example}
                </p>
              </div>
            ))}
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
