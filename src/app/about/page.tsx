"use client";

import { useState, useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const TAB_ITEMS = [
  { id: "intro", label: "소개" },
  { id: "why", label: "왜 로마드인가" },
  { id: "what", label: "무엇을 하는가" },
  { id: "people", label: "사람들" },
];

const WHAT_CARDS = [
  {
    titleEn: "BADLBADL",
    subtitleKr: "바들바들",
    body: "양양 생활인구를 위한 커뮤니티 플랫폼. 서퍼, 디지털 노마드, 이주민이 지역과 연결되는 공간을 만듭니다.",
  },
  {
    titleEn: "BUUP SCHOOL",
    subtitleKr: "부업스쿨",
    body: "지역 기반 부업 교육 프로그램. 생활인구가 양양에서 지속가능한 수입원을 만들 수 있도록 돕습니다.",
  },
  {
    titleEn: "COLLABORATIONS",
    subtitleKr: "함께한 프로젝트",
    body: "양양군, 강원도, 지역 기업과의 협업 프로젝트. 생활인구 정책과 지역 활성화를 함께 설계합니다.",
  },
  {
    titleEn: "CUSTOM HOUSE",
    subtitleKr: "커스텀하우스",
    body: "생활인구를 위한 공간 기획 및 운영. 코워킹, 코리빙, 커뮤니티 공간을 통해 정주 환경을 개선합니다.",
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
                로마드 협동조합은 강원도 양양을 기반으로 활동하는 생활인구
                전문 협동조합입니다. 서퍼, 디지털 노마드, 원격근무자 등
                양양을 찾는 다양한 생활인구와 지역 사회를 연결하여, 모두가
                함께 성장할 수 있는 생태계를 만들어갑니다.
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.8] text-text-sub mt-4">
                우리는 생활인구가 단순한 방문자가 아닌, 지역의 일원으로서
                경제적 가치를 창출하고 문화적 다양성을 더할 수 있다고
                믿습니다. 이를 위해 커뮤니티, 교육, 공간, 정책 등 다양한
                영역에서 프로젝트를 운영하고 있습니다.
              </p>
            </div>
            <div className="h-[320px] rounded-2xl bg-gradient-to-br from-[#8BAFBE] to-[#5B8FA8]" />
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
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* 사람들 Section */}
      <FadeIn>
        <section
          ref={peopleRef}
          id="people"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[28px] md:text-[36px] font-bold mb-2">
            PEOPLE
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px]">
            로마드를 만들어가는 사람들
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px]">
            {PEOPLE.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div
                  className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${person.gradient} mb-4`}
                />
                <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold">
                  {person.name}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-muted mt-1">
                  {person.role}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub mt-0.5">
                  {person.specialty}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[60px] flex gap-4">
          <Button variant="primary" href="/contact">
            Contact Us
          </Button>
          <Button
            variant="outline"
            href="#"
            className="cursor-pointer"
          >
            About Lomad
          </Button>
        </section>
      </FadeIn>
    </main>
  );
}
