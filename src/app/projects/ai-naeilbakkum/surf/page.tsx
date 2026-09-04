import type { Metadata } from "next";
import Link from "next/link";
import SurfForm from "@/components/projects/ai-naeilbakkum/SurfForm";
import { ainbOg } from "@/lib/ainb-og";
import { TOUR_TEL } from "@/lib/ainb-tour-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "서핑 참가 신청 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
  description: "「바들바들 현남생활 – Ai 내일바꿈」 1기 서핑 참가 신청 — 슈트·보드 준비를 위한 정보를 알려주세요.",
  alternates: { canonical: "/projects/ai-naeilbakkum/surf" },
  ...ainbOg({
    title: "서핑 참가 신청 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
    description:
      "「바들바들 현남생활 – Ai 내일바꿈」 1기 서핑 참가 신청 — 슈트·보드 준비를 위한 정보를 알려주세요.",
    path: "/projects/ai-naeilbakkum/surf",
  }),
  robots: { index: false, follow: false },
};

export default function SurfPage() {
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
            Surfing
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[30px] md:text-[38px] font-black leading-[1.25] mb-5">
            서핑 참가 신청
          </h1>

          <div className="border-l-2 border-text pl-5 mb-8">
            <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text-sub">
              슈트와 보드를 몸에 맞게 준비하기 위해 몇 가지만 여쭙습니다.{" "}
              <strong className="text-text">서핑이 처음이어도 괜찮습니다</strong> — 강사가 처음 하시는
              분 기준으로 함께합니다.
            </p>
          </div>

          <div className="border border-[#E8611C] bg-[#FDEBD9] px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-noto)] text-[14px] font-black text-[#A8410F] mb-1">
              9월 5일(토) 오전 10시 ~ 12시 · 죽도해변
            </p>
            <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-[#A8410F]">
              장비(보드·슈트)는 현장에서 제공합니다. 수영복 또는 래쉬가드, 여벌 수건을 챙겨 주세요.
              기상 상황에 따라 순서가 바뀔 수 있습니다.
            </p>
          </div>

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
