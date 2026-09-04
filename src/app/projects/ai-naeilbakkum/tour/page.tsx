import type { Metadata } from "next";
import Link from "next/link";
import TourForm from "@/components/projects/ai-naeilbakkum/TourForm";
import { tourCounts } from "@/lib/ainb-tour-db";
import { TOUR_MEET, TOUR_MEET_ADDR, TOUR_TEL, TOURS } from "@/lib/ainb-tour-config";
import { ainbOg } from "@/lib/ainb-og";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "멘토투어 신청 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
  description: "「바들바들 현남생활 – Ai 내일바꿈」 1기 2일차 멘토투어 신청",
  alternates: { canonical: "/projects/ai-naeilbakkum/tour" },
  ...ainbOg({
    title: "멘토투어 신청 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
    description:
      "「바들바들 현남생활 – Ai 내일바꿈」 1기 2일차 멘토투어 신청",
    path: "/projects/ai-naeilbakkum/tour",
  }),
  robots: { index: false, follow: false },
};

export default async function TourPage() {
  let counts: Record<string, number> = {};
  let dbError = false;
  try {
    counts = await tourCounts();
  } catch {
    dbError = true;
    for (const t of TOURS) counts[t.key] = 0;
  }

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
        <div className="max-w-[760px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
            Mentor Tour
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[30px] md:text-[38px] font-black leading-[1.25] mb-5">
            함께 갈 멘토를
            <br />
            선택해 주세요
          </h1>

          <div className="border-l-2 border-text pl-5 mb-8">
            <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text-sub">
              2일차 오후는 양양에 먼저 자리 잡은 멘토들과 함께합니다. 네 개 코스 중 하나를 선택해
              주세요. <strong className="text-text">한 분당 한 코스</strong>만 신청할 수 있고, 정원이
              차면 선택할 수 없습니다.
            </p>
          </div>

          <div className="border border-[#E8611C] bg-[#FDEBD9] px-5 py-4 mb-6">
            <p className="font-[family-name:var(--font-noto)] text-[14px] font-black text-[#A8410F] mb-1">
              {TOUR_MEET}
            </p>
            <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-[#A8410F]">
              {TOUR_MEET_ADDR}
              <br />
              시간에 맞춰 모여 주시면 코스별로 멘토와 함께 출발합니다.
            </p>
          </div>

          <div className="border border-border px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.9] text-text-sub">
              <strong className="text-text">비용 안내</strong> — 점심과 카페에서의 식사·음료비는
              각자 부담입니다. 체험비가 있는 코스는 카드에 표시된 금액을 현장에서 결제해 주세요.
            </p>
          </div>

          {dbError && (
            <p className="mb-8 border border-[#C0392B] bg-[#FDECEA] text-[#8E2A20] px-4 py-3 font-[family-name:var(--font-noto)] text-[14px]">
              신청 현황을 불러오지 못했습니다. 잠시 후 새로고침해 주세요.
            </p>
          )}

          <TourForm counts={counts} />
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
