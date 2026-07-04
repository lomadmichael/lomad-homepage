import type { Metadata } from "next";
import Link from "next/link";
import RegistrationForm from "@/components/projects/festival/RegistrationForm";
import { SUBMISSIONS_OPEN } from "@/lib/festival-config";
import { getAvailability, availabilityMap } from "@/lib/festival-db";

// 잔여 현황은 매 요청 시점 데이터라 동적 렌더
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: SUBMISSIONS_OPEN
    ? "참가 신청 · 현남생활 페스티벌 | LOMAD"
    : "현장 접수 안내 · 현남생활 페스티벌 | LOMAD",
  description:
    "현남생활 페스티벌 참가 신청 — 2026.7.4(토)~7.5(일), 양양 죽도·북분리.",
  alternates: { canonical: "/projects/hyeonnam-festival/register" },
  robots: { index: false }, // 접수 페이지는 검색 노출 제외
};

export default async function FestivalRegisterPage() {
  let availability: Record<string, { confirmed: number; waitlist: number }> = {};
  if (SUBMISSIONS_OPEN) {
    try {
      availability = availabilityMap(await getAvailability());
    } catch (e) {
      console.error("[festival] availability fetch failed:", e);
    }
  }
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* 미니멀 헤더 */}
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

      {/* 본문 — 단일 컬럼 중앙 정렬 (상단 정보 배너 + 폼) */}
      <div className="max-w-[680px] w-full mx-auto px-6 py-[48px] md:py-[64px]">
        {/* 상단 컴팩트 정보 배너 */}
        <aside
          className="text-white p-6 md:p-7 mb-10"
          style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #004E5A 100%)" }}
        >
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-2">
            Yangyang Surf Road
          </p>
          <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black mb-1 leading-tight">
            현남생활 페스티벌
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/70 mb-5 italic">
            서퍼와 마을이 한 상에
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-3 pt-5 border-t border-white/15 text-[12px]">
            <Info k="When" v="7.4~7.5(토·일)" sub="1박 2일" />
            <Info k="Where" v="죽도·북분리" sub="양양서핑로드" />
            <Info k="Entry" v="무료" sub="일부 체험 예약" />
            <Info k="Host" v="로마드 협동조합" sub="활력화 사업" />
          </div>
        </aside>

        {/* 접수 폼 (오픈 시) 또는 준비 중 안내 */}
        {SUBMISSIONS_OPEN ? (
          <RegistrationForm availability={availability} />
        ) : (
          <div className="border border-border bg-bg-soft p-8 md:p-12">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-4">
                On-site Only
              </p>
              <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black leading-tight mb-5">
                온라인 접수가 마감되었습니다
              </h1>
              <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[16px] text-text-sub leading-[1.9] mb-8">
                지금부터는 <b className="text-text">행사장 현장 접수</b>로 참여하실 수 있습니다.
                <br className="hidden md:block" />
                남은 자리에 한해 선착순으로 받습니다.
              </p>
              <div className="space-y-3 pt-6 border-t border-border text-[14px] text-text-sub">
                <p>
                  <span className="font-black text-text">죽도존 현장 접수</span>
                  <br />
                  웨이브웍스 내 운영본부 (양양군 현남면 인구중앙길 110)
                </p>
                <p>
                  <span className="font-black text-text">북분리존 현장 접수</span>
                  <br />
                  북분솔밭캠핑장 관리사무소 (양양군 현남면 동해대로 972)
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border space-y-2">
                <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub leading-relaxed">
                  이미 신청하신 분은 신청 내역 조회 · 취소가 계속 가능합니다.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  <Link
                    href="/projects/hyeonnam-festival/my"
                    className="inline-block font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-text px-5 py-3 hover:bg-text hover:text-white transition-colors"
                  >
                    내 신청 조회 →
                  </Link>
                  <Link
                    href="/projects/hyeonnam-festival/guide"
                    className="inline-block font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-text px-5 py-3 hover:bg-text hover:text-white transition-colors"
                  >
                    행사장 안내 →
                  </Link>
                </div>
              </div>
          </div>
        )}
      </div>

      <footer className="border-t border-border py-6 text-center text-[11px] text-text-muted font-[family-name:var(--font-noto)]">
        © 2026 LOMAD Cooperative · 농촌마을 활력화 사업
      </footer>
    </main>
  );
}

function Info({ k, v, sub }: { k: string; v: string; sub: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-karla)] text-[9px] tracking-[2px] uppercase text-white/50 font-bold mb-0.5">
        {k}
      </p>
      <p className="font-[family-name:var(--font-noto)] font-black">{v}</p>
      <p className="font-[family-name:var(--font-noto)] text-[11px] text-white/60">{sub}</p>
    </div>
  );
}
