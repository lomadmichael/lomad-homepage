"use client";

import { useState, useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";
import Image from "next/image";

const TAB_ITEMS = [
  { id: "badlbadl", label: "바들바들" },
  { id: "buupschool", label: "부업스쿨" },
  { id: "collaborations", label: "함께한 프로젝트" },
];

const COLLAB_CARDS = [
  {
    title: "찾아가는 새참모임",
    image: "/images/collabo-01.png",
    description:
      "지역 주민과 함께하는 소규모 모임을 통해 현장의 이야기를 듣고 공유합니다.",
  },
  {
    title: "현남 고민 수집소",
    image: "/images/collabo-02.jpg",
    description:
      "주민들의 일상 고민을 수집하고, 함께 해결 방법을 모색하는 프로젝트입니다.",
  },
  {
    title: "기업 워케이션",
    image: "/images/collabo-03.png",
    description:
      "기업 팀 단위의 워케이션 프로그램을 기획하고 운영합니다.",
  },
  {
    title: "대회·행사 운영",
    image: "/images/collabo-04.png",
    description:
      "지역 기반의 대회와 행사를 기획부터 운영까지 함께합니다.",
  },
  {
    title: "브랜딩·콘텐츠",
    image: "/images/collabo-05.jpg",
    description:
      "지역과 브랜드의 이야기를 콘텐츠로 만들어 전달합니다.",
  },
  {
    title: "주민 교류 프로그램",
    image: "/images/collabo-06.jpg",
    description:
      "지역 주민 간 교류를 촉진하는 다양한 프로그램을 운영합니다.",
  },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("badlbadl");
  const badlRef = useRef<HTMLDivElement>(null);
  const buupRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    badlbadl: badlRef,
    buupschool: buupRef,
    collaborations: collabRef,
  };

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        titleEn="PROJECTS"
        subtitleKr="로마드는 지역문제를 현장에서 실행 가능한 프로젝트와 프로그램으로 풀어가고 있습니다."
      />

      <TabNav
        items={TAB_ITEMS}
        activeId={activeTab}
        onTabChange={handleTabChange}
        className="mb-[60px]"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        {/* 바들바들 */}
        <FadeIn>
          <section ref={badlRef} id="badlbadl" className="mb-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Image */}
              <div className="relative h-[360px] rounded-lg overflow-hidden">
                <Image src="/images/badlbadl.png" alt="바들바들 현남생활" fill className="object-cover" />
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="font-[family-name:var(--font-noto)] text-[28px] font-black tracking-tight">
                  바들바들 현남생활
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[13px] font-semibold text-text-sub mt-1">
                  체류 프로그램
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black leading-snug mt-5">
                  양양을 잠깐 스쳐가는 곳이 아니라,
                  <br />
                  다시 찾고 관계를 맺는 곳으로.
                </h2>
                <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub leading-relaxed mt-4">
                  바들바들은 양양 현남에서 운영하는 로컬 체류형 프로그램입니다.
                  단순한 여행이 아닌, 지역 사람들과 관계를 맺고 일상을 나누며
                  새로운 가능성을 발견하는 경험을 제공합니다.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  {[
                    { value: 5, label: "운영 기수" },
                    { value: 100, label: "참가자 수" },
                    { value: 68, label: "생활 의향", suffix: "%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border-l-2 border-text pl-4"
                    >
                      <p className="font-[family-name:var(--font-karla)] text-[32px] font-bold leading-none">
                        <CountUp
                          end={stat.value}
                          suffix={stat.suffix ?? ""}
                        />
                      </p>
                      <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-8">
                  <Button variant="primary">참가 신청</Button>
                  <Button variant="outline">문의하기</Button>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 부업스쿨 */}
        <FadeIn>
          <section ref={buupRef} id="buupschool" className="mb-[100px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="font-[family-name:var(--font-karla)] text-[28px] font-bold uppercase tracking-tight">
                  BUUP SCHOOL
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[13px] font-semibold text-text-sub mt-1">
                  부업스쿨 · 실전 수익화 교육 프로그램
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black leading-snug mt-5">
                  배우고 실제로 해보는 과정까지
                  <br />
                  연결합니다.
                </h2>
                <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub leading-relaxed mt-4">
                  AI 음원 · AI 쇼츠 · 쇼핑 쇼츠 · 디지털 상품 등 실제 수익을 만들
                  수 있는 기술을 배우고, 직접 실행해보는 프로그램입니다. 단순
                  강의가 아닌 실전 프로젝트를 통해 결과물을 만들어냅니다.
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-8">
                  <Button variant="primary">참가 신청</Button>
                  <Button variant="outline">커리큘럼 보기</Button>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-[360px] rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <Image src="/images/buup.jpg" alt="부업스쿨" width={400} height={400} className="object-contain" />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 함께한 프로젝트 */}
        <FadeIn>
          <section
            ref={collabRef}
            id="collaborations"
            className="mb-[100px]"
          >
            <p className="font-[family-name:var(--font-karla)] text-[28px] font-bold uppercase tracking-tight">
              COLLABORATIONS
            </p>
            <p className="font-[family-name:var(--font-noto)] text-[13px] font-semibold text-text-sub mt-1 mb-10">
              함께한 프로젝트 · 로마드가 지역과 함께 만들어 온 협업들
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLLAB_CARDS.map((card) => (
                <div key={card.title} className="group">
                  <div className="relative h-[180px] rounded-lg overflow-hidden">
                    <Image src={card.image} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold mt-3">
                    {card.title}
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub mt-1">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button variant="primary" href="/contact">
                협업 문의
              </Button>
            </div>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
