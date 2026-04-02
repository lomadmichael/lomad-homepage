"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountUp from "@/components/ui/CountUp";

const TAB_ITEMS = [
  { id: "problems", label: "우리가 다루는 문제" },
  { id: "change", label: "우리가 만든 변화" },
  { id: "records", label: "기록" },
  { id: "partners", label: "파트너" },
];

const PROBLEMS = [
  "양양에는 매년 수만 명이 찾아오지만, 대부분 지역과 연결되지 못한 채 떠납니다.",
  "지역 인구는 줄어들고, 청년들은 일자리를 찾아 도시로 떠납니다.",
  "생활인구의 경제적, 문화적 기여가 제도적으로 인정받지 못하고 있습니다.",
  "지역과 외부인 사이의 갈등이 깊어지고, 공존의 모델이 부재합니다.",
];

const STATS = [
  { end: 513, suffix: "", label: "참여자" },
  { end: 17, suffix: "", label: "행사 수" },
  { end: 45, suffix: "", label: "협력 파트너" },
  { end: 68, suffix: "%", label: "생활의향" },
];

const RECORD_TABS = ["사진", "글", "문서"];

const RECORD_IMAGES = [
  "/images/records/record-01.jpg",
  "/images/records/record-02.jpg",
  "/images/records/record-03.jpg",
  "/images/records/record-04.jpg",
  "/images/records/record-05.jpg",
  "/images/records/record-06.jpg",
];

const PARTNERS = [
  { src: "/images/partners/partner-01.png", name: "강원특별자치도", maxH: "max-h-[45px]" },
  { src: "/images/partners/partner-02.png", name: "양양군", maxH: "max-h-[35px]" },
  { src: "/images/partners/partner-03.png", name: "강원농촌융복합산업지원센터", maxH: "max-h-[45px]" },
  { src: "/images/partners/partner-04.png", name: "양양군 서핑협회", maxH: "max-h-[35px]" },
  { src: "/images/partners/partner-05.png", name: "양양군체육회", maxH: "max-h-[45px]" },
  { src: "/images/partners/partner-06.jpg", name: "중소벤처기업부", maxH: "max-h-[55px]" },
  { src: "/images/partners/partner-07.png", name: "소상공인진흥공단", maxH: "max-h-[55px]" },
];

export default function ImpactPage() {
  const [activeId, setActiveId] = useState("problems");
  const [recordTab, setRecordTab] = useState("사진");
  const problemsRef = useRef<HTMLDivElement>(null);
  const changeRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    problems: problemsRef,
    change: changeRef,
    records: recordsRef,
    partners: partnersRef,
  };

  const handleTabChange = (id: string) => {
    setActiveId(id);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <PageHero
        titleEn="IMPACT"
        subtitleKr="로마드가 다루는 문제와 지금까지 만든 변화"
      />

      <TabNav
        items={TAB_ITEMS}
        activeId={activeId}
        onTabChange={handleTabChange}
      />

      {/* 문제 Section — full-width deep blue */}
      <FadeIn>
        <section
          ref={problemsRef}
          id="problems"
          className="relative w-full py-[80px] mb-[100px] overflow-hidden"
        >
          {/* Background image + blue overlay */}
          <Image
            src="/images/impact-bg.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-deep-blue/80" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-[60px]">
            <h2 className="font-[family-name:var(--font-karla)] text-[32px] font-bold text-white mb-4">
              THE PROBLEMS WE ADDRESS
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[20px] font-bold text-white leading-[1.8] mb-[48px]">
              생활인구는 지역의 미래입니다.
              <br />
              하지만 아직 연결이 부족합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
              {PROBLEMS.map((text, idx) => (
                <div key={idx} className="border-l-2 border-white/30 pl-6">
                  <p className="font-[family-name:var(--font-noto)] text-[13px] font-semibold leading-[1.8] text-white/80">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 변화 Section */}
      <FadeIn>
        <section
          ref={changeRef}
          id="change"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px] mb-[100px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] font-bold mb-2">
            THE CHANGE WE&apos;VE MADE
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px]">
            로마드가 지금까지 만들어온 변화
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-border text-center p-[32px]"
              >
                <p className="font-[family-name:var(--font-karla)] text-[48px] font-bold leading-none mb-2">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* 기록 Section */}
      <FadeIn>
        <section
          ref={recordsRef}
          id="records"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px] mb-[100px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] font-bold mb-2">
            RECORDS
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[32px]">
            로마드의 활동 기록
          </p>

          {/* Inner tab nav */}
          <div className="flex gap-4 mb-[32px]">
            {RECORD_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRecordTab(tab)}
                className={`font-[family-name:var(--font-noto)] text-[13px] font-semibold px-4 py-2 cursor-pointer transition-colors duration-200 ${
                  recordTab === tab
                    ? "bg-text text-bg"
                    : "bg-input-bg text-text-sub hover:text-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 3x2 Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] mb-[48px]">
            {RECORD_IMAGES.map((src, idx) => (
              <div key={idx} className="relative h-[200px] rounded-lg overflow-hidden">
                <Image src={src} alt={`기록 ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>

          <Button variant="outline" href="#">
            기록 보기
          </Button>
        </section>
      </FadeIn>

      {/* 파트너 Section */}
      <FadeIn>
        <section
          ref={partnersRef}
          id="partners"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px] mb-[100px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[32px] font-bold mb-2">
            PARTNERS
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px]">
            함께하는 파트너
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-[16px] mb-[48px] items-center">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="bg-white h-[80px] flex items-center justify-center rounded p-3 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image src={partner.src} alt={partner.name} width={140} height={70} className={`object-contain ${partner.maxH}`} />
              </div>
            ))}
          </div>

          <Button variant="primary" href="/contact">
            문의하기
          </Button>
        </section>
      </FadeIn>
    </main>
  );
}
