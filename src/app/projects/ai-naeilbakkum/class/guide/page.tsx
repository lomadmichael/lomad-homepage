import type { Metadata } from "next";
import Link from "next/link";
import CurriculumTabs from "@/components/projects/ai-naeilbakkum/CurriculumTabs";
import { CLASS_PERIODS } from "@/lib/ainb-class-curriculum";
import { CLASS_DATETIME, CLASS_PLACE, CLASS_SUBTITLE, CLASS_TITLE } from "@/lib/ainb-class-config";
import { ainbOg } from "@/lib/ainb-og";

const PATH = "/projects/ai-naeilbakkum/class/guide";
const TITLE = `실습 가이드 · ${CLASS_TITLE} | LOMAD`;
const DESCRIPTION = `${CLASS_TITLE} 「${CLASS_SUBTITLE}」 실습 가이드 — 교시별 STEP, 붙여넣을 명령어와 프롬프트.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  ...ainbOg({ title: TITLE, description: DESCRIPTION, path: PATH }),
  robots: { index: false, follow: false },
};

const SECTION = "font-[family-name:var(--font-noto)]";

export default function ClassGuidePage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col overflow-x-hidden">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/ai-naeilbakkum/class/setup"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text transition-colors"
          >
            설치 가이드 →
          </Link>
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            Lomad
          </span>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
            Curriculum
          </p>
          <h1 className={`${SECTION} text-[30px] md:text-[38px] font-black leading-[1.25] mb-3 break-keep`}>
            {CLASS_TITLE}
            <br />
            실습 가이드
          </h1>
          <p className={`${SECTION} text-[15px] font-bold text-text-sub mb-5`}>
            {CLASS_DATETIME} · {CLASS_PLACE}
          </p>
          <p className={`${SECTION} text-[14px] text-text-sub leading-[1.9] mb-12`}>
            교시별로 할 일과 붙여넣을 명령·프롬프트를 모았습니다. &lsquo;복사&rsquo; 버튼을 누르면
            그대로 붙여넣기만 하면 됩니다.
          </p>

          <CurriculumTabs days={CLASS_PERIODS} />
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <p className={`${SECTION} text-[12px] text-text-sub`}>로마드협동조합</p>
        </div>
      </footer>
    </main>
  );
}
