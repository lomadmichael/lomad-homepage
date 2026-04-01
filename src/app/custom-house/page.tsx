"use client";

import { useState, useRef } from "react";
import PageHero from "@/components/ui/PageHero";
import TabNav from "@/components/ui/TabNav";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

const TAB_ITEMS = [
  { id: "service", label: "서비스" },
  { id: "store", label: "스토어" },
];

const SERVICE_CARDS = [
  {
    titleEn: "ARTIST COLLABORATION",
    body: "양양의 아티스트, 서퍼, 크리에이터와 협업하여 지역의 감각을 담은 디자인을 만듭니다.",
  },
  {
    titleEn: "CUSTOM ORDER",
    body: "소량 주문 제작부터 B2B 납품까지. 브랜드와 지역을 연결하는 맞춤형 상품을 제작합니다.",
  },
  {
    titleEn: "POP-UP & EVENTS",
    body: "양양의 공간에서 팝업 스토어와 이벤트를 기획하고 운영합니다. 오프라인에서 만나는 로컬 굿즈.",
  },
];

const PRODUCTS = [
  { name: "티셔츠", price: "₩32,000", bg: "#D4C4B0", category: "APPAREL" },
  { name: "에코백", price: "₩18,000", bg: "#B8A890", category: "BAG" },
  { name: "머그컵", price: "₩15,000", bg: "#8BAFBE", category: "MUG" },
  { name: "접시", price: "₩25,000", bg: "#A8C4A0", category: "PLATE" },
];

export default function CustomHousePage() {
  const [activeId, setActiveId] = useState("service");
  const serviceRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    service: serviceRef,
    store: storeRef,
  };

  const handleTabChange = (id: string) => {
    setActiveId(id);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <PageHero
        labelEn="Local Goods & Production"
        titleEn="CUSTOM HOUSE"
        subtitleKr="양양의 풍경과 감각, 지역의 작업을 하나의 상품으로 연결합니다."
      />

      <TabNav
        items={TAB_ITEMS}
        activeId={activeId}
        onTabChange={handleTabChange}
      />

      {/* 서비스 Section */}
      <FadeIn>
        <section
          ref={serviceRef}
          id="service"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px] mb-[100px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[28px] font-bold mb-[48px]">
            SERVICE
          </h2>

          {/* Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 md:gap-0 mb-[60px]">
            <div className="border border-border text-center p-[24px]">
              <p className="font-[family-name:var(--font-karla)] text-[16px] font-bold mb-2">
                DESIGN
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-[1.6]">
                아티스트 협업
                <br />
                디자인 기획
              </p>
            </div>
            <div className="hidden md:flex justify-center">
              <span className="text-border text-[20px]">&rarr;</span>
            </div>
            <div className="border border-border text-center p-[24px]">
              <p className="font-[family-name:var(--font-karla)] text-[16px] font-bold mb-2">
                PRODUCTION
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-[1.6]">
                주문형 제작
                <br />
                소량 생산
              </p>
            </div>
            <div className="hidden md:flex justify-center">
              <span className="text-border text-[20px]">&rarr;</span>
            </div>
            <div className="border border-border text-center p-[24px]">
              <p className="font-[family-name:var(--font-karla)] text-[16px] font-bold mb-2">
                DISTRIBUTION
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-[1.6]">
                스토어 판매
                <br />
                B2B 납품
              </p>
            </div>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[40px] gap-y-[32px] mb-[48px]">
            {SERVICE_CARDS.map((card) => (
              <div key={card.titleEn} className="pb-[24px] border-b border-border">
                <h3 className="font-[family-name:var(--font-karla)] text-[16px] font-bold mb-2">
                  {card.titleEn}
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.7] text-text-sub">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button variant="primary" href="/contact">
              제작 문의
            </Button>
            <Button variant="outline" href="/contact">
              협업 신청
            </Button>
          </div>
        </section>
      </FadeIn>

      {/* 스토어 Section */}
      <FadeIn>
        <section
          ref={storeRef}
          id="store"
          className="max-w-[1400px] mx-auto px-6 md:px-[60px] py-[80px] mb-[100px]"
        >
          <h2 className="font-[family-name:var(--font-karla)] text-[28px] font-bold mb-2">
            STORE
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-[48px]">
            양양의 감각을 담은 로컬 굿즈
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] mb-[48px]">
            {PRODUCTS.map((product) => (
              <div key={product.name} className="group cursor-pointer">
                <div
                  className="h-[200px] rounded-lg mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${product.bg}, ${product.bg}dd)`,
                  }}
                />
                <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-muted">
                  {product.category}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub mt-0.5">
                  {product.price}
                </p>
              </div>
            ))}
          </div>

          <Button variant="primary" href="#">
            스토어 보기
          </Button>
        </section>
      </FadeIn>
    </main>
  );
}
