import type { Metadata } from "next";
import ClassForm, { ClassInfo } from "@/components/projects/ai-naeilbakkum/ClassForm";
import { ainbOg } from "@/lib/ainb-og";
import { CLASS_CLOSED, CLASS_SUBTITLE, CLASS_TITLE } from "@/lib/ainb-class-config";

export const dynamic = "force-dynamic";

const TITLE = `${CLASS_TITLE} · ${CLASS_SUBTITLE} 참가 신청 | LOMAD`;
const DESCRIPTION = `${CLASS_TITLE} 「${CLASS_SUBTITLE}」 참가 신청 — 이름과 연락처만 남겨 주세요.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/projects/ai-naeilbakkum/class" },
  ...ainbOg({ title: TITLE, description: DESCRIPTION, path: "/projects/ai-naeilbakkum/class" }),
  robots: { index: false, follow: false },
};

export default function ClassPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-end">
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            Lomad
          </span>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-[680px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[38px] font-black leading-[1.25] mb-3 break-keep">
            {CLASS_TITLE}
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[16px] font-bold text-text-sub mb-8">
            {CLASS_SUBTITLE}
          </p>

          <div className="mb-10">
            <ClassInfo />
          </div>

          {CLASS_CLOSED ? (
            <div className="border border-border bg-input-bg px-6 py-8">
              <p className="font-[family-name:var(--font-noto)] text-[20px] font-black mb-2">
                이번 클래스 접수는 마감되었습니다
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.7]">
                관심 가져 주셔서 감사합니다.
              </p>
            </div>
          ) : (
            <ClassForm />
          )}
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub">로마드협동조합</p>
        </div>
      </footer>
    </main>
  );
}
