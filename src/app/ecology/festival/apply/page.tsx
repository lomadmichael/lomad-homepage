import type { Metadata } from "next";
import Link from "next/link";
import FestecoRegisterForm from "@/components/projects/ecology/FestecoRegisterForm";
import {
  PROGRAM_NAME,
  HOST,
  ORGANIZER,
  FEE,
  MEETING_POINT,
  INQUIRY_TEL,
  CAPACITY_INFO,
  SESSIONS,
  type FestecoSessionView,
} from "@/lib/festeco-config";
import { getSessionViews } from "@/lib/festeco-db";

// 잔여석·마감은 요청 시각 기준으로 매번 계산
export const dynamic = "force-dynamic";

const TITLE = "양양송이연어축제 남대천 생태탐방 신청 | 로마드협동조합";
const DESCRIPTION =
  "2026 양양송이연어축제 「남대천 생태탐방」 사전예약 신청 — 무료, 10월 16~18일, 축제장 93번 부스 집결. 회차별 사전예약 10명.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/ecology/festival/apply" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ecology/festival/apply",
    images: [{ url: "/images/og-ecology-salmon.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-ecology-salmon.jpg"],
  },
};

export default async function FestecoApplyPage() {
  let views: Record<string, FestecoSessionView> = {};
  let loadError = false;
  try {
    views = await getSessionViews();
  } catch (e) {
    console.error("[festeco] availability fetch failed:", e);
    loadError = true;
    // 조회 실패 시 전 회차 선택 불가로 표시 (서버 액션이 어차피 재확인)
    for (const s of SESSIONS) views[s.key] = { remaining: 0, closed: true };
  }

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/ecology/festival"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] text-text-sub hover:text-text"
          >
            ← 프로그램 소개
          </Link>
          <Link
            href="/"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text"
          >
            LOMAD
          </Link>
        </div>
      </header>

      <div className="max-w-[680px] w-full mx-auto px-6 py-[40px] md:py-[56px]">
        <aside
          className="text-white p-6 md:p-7 mb-8"
          style={{ background: "linear-gradient(135deg, #2A3A1A 0%, #2E5461 100%)" }}
        >
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#E8A845] mb-2">
            Songi Salmon Festival · 사전예약 신청
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[26px] font-black mb-3 leading-tight">
            {PROGRAM_NAME}
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/80 leading-relaxed">
            참가비 {FEE} · 집결 {MEETING_POINT} · {CAPACITY_INFO}
          </p>
          <p className="font-[family-name:var(--font-noto)] text-[12px] text-white/60 leading-relaxed mt-1">
            사전예약 마감 각 회차 전날 오후 6시 · 문의·취소 {INQUIRY_TEL}
          </p>
          <Link
            href="/ecology/festival"
            className="inline-block mt-4 text-[12px] font-bold text-[#E8A845] underline underline-offset-2"
          >
            ← 프로그램 소개 보기
          </Link>
        </aside>

        {loadError && (
          <p className="text-[13px] text-[#b45309] mb-6">
            잔여석 정보를 불러오지 못했습니다. 잠시 후 새로고침해 주세요.
          </p>
        )}

        <FestecoRegisterForm views={views} />

        <p className="mt-8 text-center text-[13px]">
          <Link href="/ecology/festival/my" className="underline">
            이미 신청하셨나요? 내 신청 확인·취소 →
          </Link>
        </p>
      </div>

      <footer className="border-t border-border py-6 text-center text-[11px] text-text-muted font-[family-name:var(--font-noto)]">
        © 2026 LOMAD Cooperative · 주최 {HOST} · 주관 {ORGANIZER}
      </footer>
    </main>
  );
}
