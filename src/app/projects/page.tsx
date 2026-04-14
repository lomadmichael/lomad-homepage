"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { PROJECTS } from "@/data/projects";
import { SERVICES, type ServiceId } from "@/data/services";

type FilterValue = "all" | ServiceId;

const FILTERS: { id: FilterValue; label: string }[] = [
  { id: "all", label: "전체" },
  ...SERVICES.map((s) => ({ id: s.id as FilterValue, label: s.titleKr })),
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        labelEn="Case Studies"
        titleEn="PROJECTS"
        subtitleKr="로마드는 지역문제를 현장에서 실행 가능한 프로젝트와 프로그램으로 풀어가고 있습니다."
      />

      {/* 카테고리 필터 */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-[60px]">
        <div className="flex flex-wrap gap-2 md:gap-3 mb-[60px] pb-6 border-b border-border">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`font-[family-name:var(--font-noto)] text-[12px] md:text-[13px] font-semibold px-4 py-2 rounded-full border transition-colors duration-200 cursor-pointer ${
                filter === f.id
                  ? "bg-text text-bg border-text"
                  : "bg-transparent text-text-sub border-border hover:text-text hover:border-text"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-[100px]">
          {filtered.map((project) => {
            const service = SERVICES.find((s) => s.id === project.category);
            return (
              <FadeIn key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative h-[240px] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                    {service?.titleEn}
                  </p>
                  <h3 className="font-[family-name:var(--font-noto)] text-[18px] font-black leading-snug mb-2">
                    {project.name}
                  </h3>
                  <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub leading-relaxed line-clamp-2 mb-4">
                    {project.oneLiner}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border">
                    <div>
                      <p className="font-[family-name:var(--font-karla)] text-[9px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-1">
                        Target
                      </p>
                      <p className="font-[family-name:var(--font-noto)] text-[11px] leading-snug text-text-sub line-clamp-2">
                        {project.target}
                      </p>
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-karla)] text-[9px] font-extrabold tracking-[1.5px] uppercase text-text-muted mb-1">
                        Outcome
                      </p>
                      <p className="font-[family-name:var(--font-noto)] text-[11px] leading-snug text-text-sub line-clamp-2">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-[80px] font-[family-name:var(--font-noto)] text-[14px] text-text-sub">
            해당 카테고리의 프로젝트가 아직 준비 중입니다.
          </p>
        )}

        {/* Bottom CTA */}
        <FadeIn>
          <section className="py-[80px] text-center border-t border-border">
            <h2 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[28px] font-black mb-5">
              함께 프로젝트를 만들어 볼까요?
            </h2>
            <Button variant="primary" href="/contact">
              협업 문의
            </Button>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
