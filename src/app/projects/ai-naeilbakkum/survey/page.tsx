import type { Metadata } from "next";
import Link from "next/link";
import SurveyForm from "@/components/projects/ai-naeilbakkum/SurveyForm";
import { ainbOg } from "@/lib/ainb-og";
import { TOUR_TEL } from "@/lib/ainb-tour-config";

export const dynamic = "force-dynamic";

const TITLE = "만족도 조사 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD";
const DESC =
  "「바들바들 현남생활 – Ai 내일바꿈」 1기 만족도 조사 — 더 나은 프로그램을 위해 의견을 들려주세요.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/projects/ai-naeilbakkum/survey" },
  ...ainbOg({ title: TITLE, description: DESC, path: "/projects/ai-naeilbakkum/survey" }),
  robots: { index: false, follow: false },
};

export default function SurveyPage() {
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
            Survey
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[30px] md:text-[38px] font-black leading-[1.25] mb-5">
            3박 4일,
            <br />
            어떠셨나요?
          </h1>

          <div className="border-l-2 border-text pl-5 mb-10">
            <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text-sub">
              「Ai 내일바꿈」 1기가 끝났습니다. 함께해 주셔서 고맙습니다.
              <br />
              좋았던 것도, 아쉬웠던 것도 있는 그대로 남겨 주세요.{" "}
              <strong className="text-text">다음 기수를 준비하는 데 그대로 쓰겠습니다.</strong>
            </p>
          </div>

          <div className="border border-border px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.9] text-text-sub">
              3~5분이면 끝납니다. 응답 내용은 프로그램 개선과 사업 결과보고 목적으로만 사용하며,
              개별 응답을 참가자와 연결해 공개하지 않습니다.
            </p>
          </div>

          <SurveyForm />
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
