import type { Metadata } from "next";
import Link from "next/link";
import RegistrationForm from "@/components/projects/festival/RegistrationForm";
import CountdownTimer from "@/components/projects/festival/CountdownTimer";

export const metadata: Metadata = {
  title: "참가 신청 · 현남생활 페스티벌 | LOMAD",
  description:
    "현남생활 페스티벌 참가 신청 — 2026.7.4(토)~7.5(일), 양양 죽도·북분리.",
  alternates: { canonical: "/projects/hyeonnam-festival/register" },
  robots: { index: false }, // 접수 페이지는 검색 노출 제외
};

export default function FestivalRegisterPage() {
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

      {/* 본문 — 좌측 정보 + 우측 폼 (모바일은 stack) */}
      <div className="flex-1 max-w-[1200px] w-full mx-auto px-6 md:px-12 py-[60px] md:py-[80px]">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20">
          {/* 좌 — 페스티벌 정보 + 카운트다운 (다크 카드) */}
          <aside
            className="text-white p-8 md:p-10 md:sticky md:top-8 md:self-start"
            style={{
              background:
                "linear-gradient(160deg, #0B1F3A 0%, #004E5A 100%)",
            }}
          >
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-4">
              Yangyang Surf Road
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-2 leading-tight">
              현남생활 페스티벌
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/70 mb-8 italic">
              서퍼와 마을이 한 상에
            </p>

            <div className="mb-8 pb-8 border-b border-white/15 space-y-3 text-[13px]">
              <Info k="When" v="2026.7.4(토) ~ 7.5(일)" sub="1박 2일" />
              <Info k="Where" v="양양 죽도 · 북분리" sub="양양서핑로드" />
              <Info k="Entry" v="무료" sub="일부 체험 사전 예약" />
              <Info k="Host" v="로마드 협동조합" sub="농촌마을 활력화 사업" />
            </div>

            <div>
              <p className="font-[family-name:var(--font-karla)] text-[9px] tracking-[3px] font-bold uppercase text-white/50 mb-3">
                Starts In
              </p>
              {/* 작은 카운트다운 — 그대로 풀 사이즈는 부담스러우니 추후 mini variant 별도 만들 수도 */}
              <div className="scale-[0.55] md:scale-[0.7] origin-left">
                <CountdownTimer />
              </div>
            </div>
          </aside>

          {/* 우 — 폼 */}
          <div>
            <RegistrationForm />
          </div>
        </div>
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
