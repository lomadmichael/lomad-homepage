import type { Metadata } from "next";
import Link from "next/link";
import SurfForm from "@/components/projects/ai-naeilbakkum/SurfForm";
import { ainbOg } from "@/lib/ainb-og";
import { TOUR_TEL } from "@/lib/ainb-tour-config";
import { existsSync } from "fs";
import { join } from "path";

/** 서프러프 안내 이미지 — 파일이 public에 있을 때만 그린다 (깨진 이미지 방지) */
const MOKU_IMAGES = [
  { src: "/ainb/surf3/surfruff_map.png", alt: "서프러프 위치 지도 — 죽도해변 인구중앙길 93" },
  { src: "/ainb/surf3/surfruff_shop.jpg", alt: "서프러프 매장 외관" },
];
const NAVER_MAP_URL = "https://map.naver.com/p/search/" + encodeURIComponent("죽도 서프러프");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "3일차 참석 조사 · 서핑 참가 신청 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
  description: "「바들바들 현남생활 – Ai 내일바꿈」 3기 3일차 해변 요가·서핑 참석 여부와 서핑 장비 준비 정보를 알려주세요.",
  alternates: { canonical: "/projects/ai-naeilbakkum/surf" },
  ...ainbOg({
    title: "3일차 참석 조사 · 서핑 참가 신청 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
    description:
      "「바들바들 현남생활 – Ai 내일바꿈」 3기 3일차 해변 요가·서핑 참석 여부와 서핑 장비 준비 정보를 알려주세요.",
    path: "/projects/ai-naeilbakkum/surf",
  }),
  robots: { index: false, follow: false },
};

export default function SurfPage() {
  const mokuImages = MOKU_IMAGES.filter((i) => existsSync(join(process.cwd(), "public", i.src)));
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/ai-naeilbakkum/guide"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text transition-colors"
          >
            ← 참가자 안내
          </Link>
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            Lomad
          </span>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
            Day 3 · Yoga &amp; Surfing
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[30px] md:text-[38px] font-black leading-[1.25] mb-5">
            내일 일정 참석 조사
            <span className="block text-[18px] md:text-[20px] font-bold text-text-sub mt-2">
              해변 요가 · 서핑 참가 신청
            </span>
          </h1>

          <div className="border-l-2 border-text pl-5 mb-8">
            <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text-sub">
              내일(10월 4일 일) 오전 요가와 서핑, 각각 참석 여부를 알려주세요. 서핑에 오시는 분은
              슈트·보드를 몸에 맞게 준비하기 위해 몇 가지만 더 여쭙습니다.{" "}
              <strong className="text-text">서핑이 처음이어도 괜찮습니다</strong> — 강사가 처음 하시는
              분 기준으로 함께합니다.
            </p>
          </div>

          <div className="border border-[#E8611C] bg-[#FDEBD9] px-5 py-4 mb-8 space-y-4">
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-black text-[#A8410F]">
                해변 요가 · 10월 4일(일) 오전 8시 ~ 9시 · 웨이브웍스 앞 해변
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-[#A8410F]">
                웨이브웍스 앞 해변 (양양군 현남면 인구중앙길 110)<br />
                편한 옷차림으로 오세요. 아침에는 쌀쌀할 수 있으니 겉옷을 꼭 챙겨 주세요.
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-noto)] text-[14px] font-black text-[#A8410F]">
                서핑 · 10월 4일(일) 오전 10시 ~ 12시 · 죽도해변 서프러프
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-[#A8410F]">
                장비(보드·슈트)는 현장에서 제공합니다. 수영복 또는 래쉬가드, 여벌 수건을 챙겨 주세요.
                기상 상황에 따라 순서가 바뀔 수 있습니다.
              </p>
            </div>
          </div>

          {/* 모쿠서프 찾아오는 길 */}
          <section className="border border-border mb-12">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black">
                서프러프 찾아오는 길
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub mt-1">
                양양군 현남면 인구중앙길 93 (죽도 서프러프)
              </p>
            </div>
            {mokuImages.length > 0 && (
              <div className={`grid ${mokuImages.length > 1 ? "md:grid-cols-2" : ""}`}>
                {mokuImages.map((i, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i.src}
                    src={i.src}
                    alt={i.alt}
                    className={`w-full h-full object-cover ${idx === 0 && mokuImages.length > 1 ? "border-b md:border-b-0 md:border-r border-border" : ""}`}
                  />
                ))}
              </div>
            )}
            <ul className="px-5 py-4 font-[family-name:var(--font-noto)] text-[13px] leading-[1.9] text-text-sub space-y-1">
              <li>· 죽도해변을 따라 난 <strong className="text-text">인구중앙길</strong> 도로변에 있습니다. 길 건너편이 죽도야영장·주차장입니다.</li>
              <li>· 웨이브웍스(인구중앙길 110)에서 남쪽으로 도보 3분, 어스투라운지(인구길 64)에서 도보 5분 안팎입니다.</li>
              <li>· 장비(보드·슈트)는 현장에서 제공합니다. 수영복 또는 래쉬가드, 여벌 수건을 챙겨 주세요.</li>
            </ul>
            <div className="px-5 pb-4">
              <a
                href={NAVER_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-text px-4 py-2 font-[family-name:var(--font-noto)] text-[13px] font-bold"
              >
                네이버 지도에서 열기 →
              </a>
            </div>
          </section>

          <SurfForm />
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub">
            로마드협동조합 · 문의 {TOUR_TEL}
          </p>
        </div>
      </footer>
    </main>
  );
}
