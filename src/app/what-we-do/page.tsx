"use client";

import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        labelEn="Our Services"
        titleEn="WHAT WE DO"
        subtitleKr="로마드는 양양과 해안생활권의 자원을 프로그램·교육·관광·상품·협업 구조로 전환하는 실행형 지역기획 조직입니다."
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        {SERVICES.map((service, idx) => {
          const relatedProjects = PROJECTS.filter(
            (p) => p.category === service.id,
          ).slice(0, 3);

          return (
            <FadeIn key={service.id}>
              <section
                id={service.id}
                className="mb-[120px] pt-[40px] border-t border-border first:border-t-0 first:pt-0"
              >
                {/* 영역 헤더 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                  <div className="md:col-span-1">
                    <p className="font-[family-name:var(--font-karla)] text-[14px] font-extrabold tracking-[2px] text-text-muted">
                      0{idx + 1}
                    </p>
                  </div>
                  <div className="md:col-span-11">
                    <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                      {service.titleEn}
                    </p>
                    <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black leading-tight mb-5">
                      {service.titleKr}
                    </h2>
                    <p className="font-[family-name:var(--font-noto)] text-[16px] md:text-[18px] font-semibold leading-relaxed text-text max-w-[720px]">
                      {service.tagline}
                    </p>
                  </div>
                </div>

                {/* 주요 대상 + 제공 가치 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12 md:ml-[calc(100%/12)]">
                  <div className="border-l-2 border-text pl-5">
                    <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                      Target
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[13px] leading-relaxed text-text-sub">
                      {service.target}
                    </p>
                  </div>
                  <div className="border-l-2 border-text pl-5">
                    <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                      Value
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[13px] leading-relaxed text-text-sub">
                      {service.value}
                    </p>
                  </div>
                </div>

                {/* 대표 프로젝트 */}
                {relatedProjects.length > 0 && (
                  <div className="mb-10">
                    <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-5">
                      Representative Projects
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {relatedProjects.map((project) => (
                        <a
                          key={project.slug}
                          href={`/projects/${project.slug}`}
                          className="group"
                        >
                          <div className="relative h-[200px] rounded-lg overflow-hidden mb-3">
                            <Image
                              src={project.image}
                              alt={project.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <p className="font-[family-name:var(--font-noto)] text-[14px] font-black leading-snug">
                            {project.name}
                          </p>
                          <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-relaxed mt-1 line-clamp-2">
                            {project.oneLiner}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 확장 예정 프로그램 (대표 프로젝트가 기존 운영분 + 신규 확장 텍스트) */}
                {service.representativeProjects.length >
                  relatedProjects.length && (
                  <div className="mb-10">
                    <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
                      Extending To
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.representativeProjects
                        .filter(
                          (p) =>
                            !relatedProjects.some((rp) => rp.name === p),
                        )
                        .map((p) => (
                          <span
                            key={p}
                            className="font-[family-name:var(--font-noto)] text-[12px] font-semibold px-3 py-1.5 border border-border rounded-full text-text-sub"
                          >
                            {p}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* 로컬 상품·브랜딩 영역일 때 — 커스텀하우스 서비스 플로우 + 스토어 편입 */}
                {service.id === "local-brand" && (
                  <div className="mt-10 p-6 md:p-10 bg-[color:var(--color-warm-beige,#F0EDE8)] rounded-lg">
                    <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-5">
                      Custom House Service Flow
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 md:gap-0 mb-8">
                      <div className="border border-border bg-white text-center p-[20px]">
                        <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold mb-1">
                          DESIGN
                        </p>
                        <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub leading-[1.6]">
                          아티스트 협업
                          <br />
                          디자인 기획
                        </p>
                      </div>
                      <div className="hidden md:flex justify-center">
                        <span className="text-border text-[20px]">&rarr;</span>
                      </div>
                      <div className="border border-border bg-white text-center p-[20px]">
                        <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold mb-1">
                          PRODUCTION
                        </p>
                        <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub leading-[1.6]">
                          주문형 제작
                          <br />
                          소량 생산
                        </p>
                      </div>
                      <div className="hidden md:flex justify-center">
                        <span className="text-border text-[20px]">&rarr;</span>
                      </div>
                      <div className="border border-border bg-white text-center p-[20px]">
                        <p className="font-[family-name:var(--font-karla)] text-[14px] font-bold mb-1">
                          DISTRIBUTION
                        </p>
                        <p className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub leading-[1.6]">
                          스토어 판매
                          <br />
                          B2B 납품
                        </p>
                      </div>
                    </div>

                    <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted mb-4">
                      Store
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: "티셔츠", image: "/images/store/tee.jpg", category: "APPAREL" },
                        { name: "에코백", image: "/images/store/bag.jpg", category: "BAG" },
                        { name: "머그컵", image: "/images/store/mug.jpg", category: "MUG" },
                        { name: "포스터", image: "/images/store/poster.jpg", category: "POSTER" },
                      ].map((product) => (
                        <div key={product.name} className="group">
                          <div className="relative h-[150px] rounded-lg overflow-hidden bg-white mb-2">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <p className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[1.5px] text-text-muted">
                            {product.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 의뢰하기 CTA */}
                <div className="mt-8">
                  <Button
                    variant="primary"
                    href={`/contact?type=${encodeURIComponent(service.inquiryType)}`}
                  >
                    {service.titleKr} 의뢰하기
                  </Button>
                </div>
              </section>
            </FadeIn>
          );
        })}

        {/* Bottom CTA */}
        <FadeIn>
          <section className="py-[80px] text-center border-t border-border">
            <h2 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[28px] font-black mb-5">
              함께 일할 준비가 되셨나요?
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-8 max-w-[520px] mx-auto leading-relaxed">
              지자체·협회·교육기관·민간 파트너가 자기에게 맞는 접점을 즉시 찾을 수
              있도록 문의 유형을 분리해 두었습니다.
            </p>
            <Button variant="primary" href="/contact">
              문의하기
            </Button>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
