import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/projects/ecology/RegisterForm";
import { SUBMISSIONS_OPEN, PLACE, EXPERIENCE_SITE } from "@/lib/ecology-config";
import { getAvailability, availabilityMap } from "@/lib/ecology-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "참가 신청 · 남대천 물속 생물 이야기 | LOMAD",
  description: "양양 남대천 생태체험 「물속 생물 이야기」 참가 신청 — 7-8월 정규 프로그램.",
  alternates: { canonical: "/ecology/register" },
  robots: { index: false },
};

export default async function EcologyRegisterPage() {
  let availability: Record<string, { confirmed: number; waitlist: number }> = {};
  if (SUBMISSIONS_OPEN) {
    try {
      availability = availabilityMap(await getAvailability());
    } catch (e) {
      console.error("[ecology] availability fetch failed:", e);
    }
  }
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/ecology-wetland-water"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            남대천 생태체험
          </Link>
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
          className="text-white p-6 md:p-7 mb-10"
          style={{ background: "linear-gradient(135deg, #2A3A1A 0%, #2E5461 100%)" }}
        >
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#E8A845] mb-2">
            Namdaecheon Eco
          </p>
          <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[28px] font-black mb-1 leading-tight">
            남대천 물속 생물 이야기
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/70 mb-5 italic">
            민물고기와 수서곤충을 직접 만나는 생태 체험
          </p>
          <div className="grid grid-cols-2 gap-y-3 gap-x-3 pt-5 border-t border-white/15 text-[12px]">
            <div>
              <p className="text-white/50 text-[9px] tracking-[2px] uppercase font-bold mb-0.5">집결</p>
              <p className="font-black">{PLACE}</p>
            </div>
            <div>
              <p className="text-white/50 text-[9px] tracking-[2px] uppercase font-bold mb-0.5">체험지</p>
              <p className="font-black">{EXPERIENCE_SITE}</p>
            </div>
          </div>
        </aside>

        {SUBMISSIONS_OPEN ? (
          <RegisterForm availability={availability} />
        ) : (
          <div className="border border-border bg-bg-soft p-8 md:p-12">
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#E8A845] mb-4">
              Coming Soon
            </p>
            <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black leading-tight mb-5">
              접수 준비 중입니다
            </h1>
            <p className="font-[family-name:var(--font-noto)] text-[15px] text-text-sub leading-[1.9]">
              정식 접수가 열리면 안내드립니다. 문의는 프로그램 페이지의 전화번호로 연락 주세요.
            </p>
            <Link
              href="/projects/ecology-wetland-water"
              className="inline-block mt-6 text-[13px] underline"
            >
              프로그램 자세히 보기 →
            </Link>
          </div>
        )}
      </div>

      <footer className="border-t border-border py-6 text-center text-[11px] text-text-muted font-[family-name:var(--font-noto)]">
        © 2026 LOMAD Cooperative · 양양군 생태관광
      </footer>
    </main>
  );
}
