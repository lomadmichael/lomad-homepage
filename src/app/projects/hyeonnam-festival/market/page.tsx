import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import { FLEA_MARKET_PUBLISHED } from "@/lib/festival-config";
import {
  VENDOR_CATEGORIES,
  vendorsByCategory,
  PUBLIC_VENDORS,
  type Vendor,
  type VendorCategory,
} from "@/lib/festival-vendors";

export const metadata: Metadata = {
  title: "프리마켓 참여 업체 · 현남생활 페스티벌 | LOMAD",
  description: `현남생활 페스티벌에서 만날 프리마켓 ${PUBLIC_VENDORS.length}팀 — 핸드메이드·주얼리·비치웨어·로컬푸드·체험·아트. 2026.7.4(토), 양양 죽도해변 랜드서핑파크 건너편.`,
  alternates: { canonical: "/projects/hyeonnam-festival/market" },
  // 미공개 동안 검색 색인 차단
  robots: FLEA_MARKET_PUBLISHED ? undefined : { index: false, follow: false },
};

/** public/images/vendors/{slug}.{jpg,png,webp} 중 존재하는 slug 집합 (빌드 시점 감지). */
function availablePhotos(): Set<string> {
  try {
    const dir = path.join(process.cwd(), "public", "images", "vendors");
    const files = fs.readdirSync(dir);
    return new Set(files.map((f) => f.replace(/\.(jpe?g|png|webp)$/i, "")));
  } catch {
    return new Set<string>();
  }
}

const CATEGORY_COLOR: Record<VendorCategory, { bg: string; fg: string }> = {
  handmade: { bg: "#FF6B6B", fg: "#fff" },
  fashion: { bg: "#006B7A", fg: "#fff" },
  food: { bg: "#FFD66E", fg: "#0B1F3A" },
  experience: { bg: "#0B1F3A", fg: "#fff" },
};

function VendorCard({ v, hasPhoto }: { v: Vendor; hasPhoto: boolean }) {
  const color = CATEGORY_COLOR[v.category];
  const ext = "jpg"; // 합성/수집 시 jpg 기준 (webp/png면 availablePhotos가 잡고 src만 맞추면 됨)
  return (
    <div className="border border-border bg-white flex flex-col overflow-hidden">
      {/* 사진 또는 브랜드 컬러블록 폴백 */}
      <div className="relative aspect-[4/3] w-full">
        {hasPhoto ? (
          <Image
            src={`/images/vendors/${v.slug}.${ext}`}
            alt={`${v.name} 대표 이미지`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-center px-3"
            style={{ backgroundColor: color.bg, color: color.fg }}
          >
            <span className="font-[family-name:var(--font-noto)] text-[19px] font-black leading-tight">
              {v.name}
            </span>
          </div>
        )}
        {v.zone !== "무관" && (
          <span className="absolute top-2 left-2 font-[family-name:var(--font-karla)] text-[9px] tracking-[1px] uppercase font-bold bg-black/55 text-white px-2 py-1">
            {v.zone}
          </span>
        )}
      </div>
      {/* 정보 */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-[family-name:var(--font-noto)] text-[16px] font-black leading-snug">
          {v.name}
        </h3>
        {v.items && (
          <p className="font-[family-name:var(--font-noto)] text-[12.5px] text-text-sub leading-relaxed mt-1 flex-1">
            {v.items}
          </p>
        )}
        {v.handle && (
          <div className="mt-3 pt-3 border-t border-border">
            {v.handleUrl ? (
              <Link
                href={v.handleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-karla)] text-[12px] font-bold text-[#006B7A] hover:underline break-all"
              >
                {v.handle} →
              </Link>
            ) : (
              <span className="font-[family-name:var(--font-karla)] text-[12px] font-bold text-text-muted">
                {v.handle}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FleaMarketPage() {
  const photos = availablePhotos();
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* 미니 헤더 */}
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/hyeonnam-festival"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            현남생활 페스티벌
          </Link>
          <Link
            href="/"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text"
          >
            LOMAD
          </Link>
        </div>
      </header>

      <div className="max-w-[1100px] w-full mx-auto px-6 py-[40px] md:py-[64px]">
        {/* 상단 배너 (컨셉 이미지 배경) */}
        <aside className="relative overflow-hidden text-white p-7 md:p-9 mb-12 min-h-[260px] flex flex-col justify-end">
          <Image
            src="/images/festival-market-concept.jpg"
            alt="현남생활 프리마켓 컨셉"
            fill
            className="object-cover"
            sizes="1100px"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,31,58,0.86) 0%, rgba(0,78,90,0.72) 60%, rgba(11,31,58,0.9) 100%)",
            }}
          />
          <div className="relative">
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-2">
              Flea Market · {PUBLIC_VENDORS.length} Teams
            </p>
            <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-3 leading-tight">
              이번 프리마켓에서 만날 {PUBLIC_VENDORS.length}팀
            </h1>
            <p className="font-[family-name:var(--font-noto)] text-[13px] md:text-[14px] text-white/90 leading-relaxed max-w-[680px] drop-shadow">
              핸드메이드·주얼리부터 비치웨어, 로컬 푸드, 현장 체험까지. 양양서핑로드 위
              죽도해변 랜드서핑파크 건너편에서 셀러들을 만나보세요.
            </p>
            <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[1px] text-white/70 mt-4">
              2026.7.4(SAT) · 죽도해변 · 랜드서핑파크 건너편
            </p>
          </div>
        </aside>

        {/* 카테고리별 섹션 */}
        {VENDOR_CATEGORIES.map((cat) => {
          const list = vendorsByCategory(cat.key);
          if (list.length === 0) return null;
          return (
            <section key={cat.key} className="mb-14">
              <FadeIn>
                <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-text">
                  <h2 className="font-[family-name:var(--font-noto)] text-[20px] md:text-[24px] font-black">
                    {cat.label}
                  </h2>
                  <span className="font-[family-name:var(--font-karla)] text-[11px] tracking-[1px] uppercase font-bold text-text-muted">
                    {cat.sub} · {list.length}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((v) => (
                    <VendorCard key={v.slug} v={v} hasPhoto={photos.has(v.slug)} />
                  ))}
                </div>
              </FadeIn>
            </section>
          );
        })}

        {/* 안내 + CTA */}
        <div className="border border-border bg-[#FAF5EE] p-6 md:p-7 text-center">
          <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub leading-relaxed">
            프리마켓은 <b>7/4(토) 죽도해변 랜드서핑파크 건너편</b>에서 운영됩니다. 참여 업체·품목은 현장
            사정에 따라 변동될 수 있습니다.
          </p>
          <Link
            href="/projects/hyeonnam-festival"
            className="inline-block mt-5 font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-text px-6 py-3 hover:bg-text hover:text-white transition-colors"
          >
            ← 페스티벌 안내로
          </Link>
        </div>
      </div>
    </main>
  );
}
