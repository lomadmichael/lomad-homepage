"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const TAB_ITEMS = [
  { id: "intro", label: "소개" },
  { id: "why", label: "왜 로마드인가" },
  { id: "what", label: "무엇을 하는가" },
];

const WHAT_CARDS = [
  {
    titleEn: "바들바들 현남생활",
    subtitleKr: "체류 프로그램",
    body: "양양을 잠깐 스쳐가는 곳이 아니라, 다시 찾고 관계를 맺는 곳으로 경험하게 합니다.",
    bodyExtra: "",
  },
  {
    titleEn: "부업스쿨",
    subtitleKr: "AI 활용 실험형 프로그램",
    body: "지역에 머물고 싶지만 일과 소득의 기반이 부족한 사람을 위해, AI를 활용해 지속가능한 수입원을 스스로 만들어볼 수 있도록 돕습니다.",
    bodyExtra: "",
  },
  {
    titleEn: "COLLABORATIONS",
    subtitleKr: "함께한 프로젝트",
    body: "강원도, 양양군, 지역 기업과의 협업 프로젝트. 생활인구 정책과 지역 활성화를 함께 설계합니다.",
    bodyExtra: "",
  },
  {
    titleEn: "CUSTOM HOUSE",
    subtitleKr: "커스텀하우스",
    body: "양양의 로컬 자원을 활용한 상품 기획, 제작, 유통을 담당합니다. 지역의 이야기를 담은 굿즈와 브랜드를 만들어 양양의 가치를 더 많은 사람들에게 전달합니다.",
    bodyExtra: "",
  },
];

const PEOPLE = [
  {
    name: "MICHAEL HONG",
    role: "대표",
    specialty: "기획 / 사업개발",
    gradient: "from-[#8BAFBE] to-[#5B8FA8]",
  },
  {
    name: "TEAM MEMBER",
    role: "실무진",
    specialty: "커뮤니티 / 운영",
    gradient: "from-[#A8C4B8] to-[#6B9E8A]",
  },
  {
    name: "TEAM MEMBER",
    role: "실무진",
    specialty: "디자인 / 브랜딩",
    gradient: "from-[#BEA8C4] to-[#8A6B9E]",
  },
  {
    name: "TEAM MEMBER",
    role: "실무진",
    specialty: "개발 / 기술",
    gradient: "from-[#C4BEA8] to-[#9E8A6B]",
  },
];

export default function AboutPage() {
  const [activeId, setActiveId] = useState("intro");
  const introRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLDivElement>(null);
  const peopleRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    intro: introRef,
    why: whyRef,
    what: whatRef,
    people: peopleRef,
  };

  const handleTabChange = (id: string) => {
    setActiveId(id);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* Hero */}
      <PageHero
        titleEn="ABOUT LOMAD"
        subtitleKr="양양의 생활인구와 지역을 연결하는 협동조합"
      />

      {/* Tab Navigation */}
      <TabNav
        items={TAB_ITEMS}
        activeId={activeId}
        onTabChange={handleTabChange}
      />

      {/* 소개 Section */}
      <FadeIn>
        <section
          ref={introRef}
          id="intro"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
            <div>
              <h2 className="font-[family-name:var(--font-noto)] text-[24px] font-black mb-6">
                로마드 협동조합
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.8] text-text-sub">
                로마드 협동조합은 강원도 양양의 생활인구, 관계인구, 지역
                청년이 지역 안에서 관계를 맺고 역할을 만들 수 있도록 기획하고
                운영하는 협동조합입니다.
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.8] text-text-sub mt-4">
                우리는 생활인구가 단순한 방문자가 아닌, 지역의 일원으로서
                경제적 가치를 창출하고 문화적 다양성을 더할 수 있다고
                믿습니다. 이를 위해 커뮤니티, 교육, 공간, 정책 등 다양한
                영역에서 프로젝트를 운영하고 있습니다.
              </p>
            </div>
            <div className="relative h-[320px] rounded-2xl overflow-hidden">
              <Image src="/images/lomad-logo.png" alt="로마드 로고" fill className="object-contain" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 왜 로마드인가 Section */}
      <FadeIn>
        <section
          ref={whyRef}
          id="why"
          className="w-full bg-[#2C4A5E] py-[80px]"
        >
          <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
            <h2 className="font-[family-name:var(--font-karla)] text-[28px] md:text-[36px] font-bold text-white mb-4">
              WHY LOMAD
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[18px] font-bold text-white/80 mb-[48px]">
              생활인구는 지역의 미래입니다. 하지만 아직 연결이 부족합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              <div className="border-l-2 border-white/30 pl-6">
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.8] text-white/80">
                  양양에는 매년 수만 명의 생활인구가 찾아오지만, 대부분은
                  지역과 깊이 연결되지 못한 채 떠납니다. 지역에는 인구가
                  줄고, 찾아오는 사람들은 머물 이유를 찾지 못합니다.
                </p>
              </div>
              <div className="border-l-2 border-white/30 pl-6">
                <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.8] text-white/80">
                  로마드는 이 간극을 메웁니다. 생활인구와 지역 주민이
                  함께 만드는 커뮤니티, 함께 배우는 교육, 함께 일하는
                  공간을 통해 양양을 '살고 싶은 지역'으로 바꿔갑니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 무엇을 하는가 Section */}
      <FadeIn>
        <section
          ref={whatRef}
          id="what"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[28px] md:text-[36px] font-bold mb-2">
            WHAT WE DO
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px]">
            생활인구와 지역을 연결하는 네 가지 축
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[60px] gap-y-[40px]">
            {WHAT_CARDS.map((card) => (
              <div key={card.titleEn} className="pb-[24px] border-b border-border">
                <h3 className="font-[family-name:var(--font-karla)] text-[18px] font-bold mb-1">
                  {card.titleEn}
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-muted mb-3">
                  {card.subtitleKr}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.7] text-text-sub">
                  {card.body}
                </p>
                {card.bodyExtra && (
                  <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.7] text-text-sub mt-3">
                    {card.bodyExtra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[60px]">
          <Button variant="primary" href="/contact">
            Contact Us
          </Button>
        </section>
      </FadeIn>
    </main>
  );
}
