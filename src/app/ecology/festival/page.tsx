import type { Metadata } from "next";
import Link from "next/link";
import FestecoRegisterForm from "@/components/projects/ecology/FestecoRegisterForm";
import {
  PROGRAM_NAME,
  HOST,
  ORGANIZER,
  FEE,
  TARGET,
  DURATION,
  INTRO,
  ACTIVITIES,
  MEETING_POINT,
  SUPPLIES,
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
  "2026 양양송이연어축제 「남대천 생태탐방」 사전예약 — 생태관광지도사와 함께 숲과 물길을 걷고 연어 한살이를 놀이로 배우는 무료 가족 프로그램. 10월 16~18일, 축제장 93번 부스 집결.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/ecology/festival" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/ecology/festival",
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
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            남대천 생태탐방
          </span>
          <Link
            href="/"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text"
          >
            LOMAD
          </Link>
        </div>
      </header>

      <div className="max-w-[680px] w-full mx-auto px-6 py-[48px] md:py-[64px]">
        <aside
          className="text-white p-6 md:p-7 mb-8"
          style={{ background: "linear-gradient(135deg, #2A3A1A 0%, #2E5461 100%)" }}
        >
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#E8A845] mb-2">
            Songi Salmon Festival · Eco Walk
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black mb-3 leading-tight">
            {PROGRAM_NAME}
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/80 leading-relaxed mb-5">
            {INTRO}
          </p>
          <div className="grid grid-cols-2 gap-y-3 gap-x-3 pt-5 border-t border-white/15 text-[12px]">
            <Info label="집결·접수·출발" value={MEETING_POINT} />
            <Info label="소요" value={DURATION} />
            <Info label="대상" value={TARGET} />
            <Info label="참가비" value={FEE} />
            <Info label="주최" value={HOST} />
            <Info label="주관" value={ORGANIZER} />
          </div>
        </aside>

        {/* 주요 활동 */}
        <section className="mb-8">
          <p className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-3">주요 활동</p>
          <ol className="space-y-2">
            {ACTIVITIES.map((a, i) => (
              <li key={a.title} className="flex gap-3 border border-border px-4 py-3 text-[14px]">
                <span className="font-[family-name:var(--font-karla)] font-extrabold text-[#E8A845]">
                  0{i + 1}
                </span>
                <span>
                  <span className="font-black">{a.title}</span>
                  <span className="text-text-sub"> — {a.desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10 text-[13px] text-text-sub leading-relaxed font-[family-name:var(--font-noto)] space-y-1">
          <p>
            <span className="font-black text-text">정원</span> · {CAPACITY_INFO}
          </p>
          <p>
            <span className="font-black text-text">사전예약 마감</span> · 각 회차 전날 오후 6시
          </p>
          <p>
            <span className="font-black text-text">준비물</span> · {SUPPLIES}
          </p>
          <p>
            <span className="font-black text-text">문의·취소</span> · {INQUIRY_TEL}
          </p>
        </section>

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

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/50 text-[9px] tracking-[2px] uppercase font-bold mb-0.5">{label}</p>
      <p className="font-black">{value}</p>
    </div>
  );
}
