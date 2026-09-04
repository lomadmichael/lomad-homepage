import type { Metadata } from "next";
import Link from "next/link";
import ConsentForm from "@/components/projects/ai-naeilbakkum/ConsentForm";
import { ainbOg } from "@/lib/ainb-og";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "참가 동의서 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
  description:
    "「바들바들 현남생활 – Ai 내일바꿈」 참가자 동의서. 여행자 보험 가입과 참가비 환불을 위해 작성해 주세요.",
  alternates: { canonical: "/projects/ai-naeilbakkum/consent" },
  ...ainbOg({
    title: "참가 동의서 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
    description:
      "「바들바들 현남생활 – Ai 내일바꿈」 참가자 동의서. 여행자 보험 가입과 참가비 환불을 위해 작성해 주세요.",
    path: "/projects/ai-naeilbakkum/consent",
  }),
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/ai-naeilbakkum"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text transition-colors"
          >
            ← Ai 내일바꿈
          </Link>
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            Lomad
          </span>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
            Consent Form
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[30px] md:text-[38px] font-black leading-[1.25] mb-5">
            바들바들 현남생활
            <br />
            Ai 내일바꿈 참가 동의서
          </h1>
          <div className="border-l-2 border-text pl-5 mb-8">
            <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
              선정되신 참가자분들의 <strong className="text-text">여행자 보험 가입</strong>과{" "}
              <strong className="text-text">참가비 환불</strong>을 위해 동의서를 받고 있습니다.
            </p>
            <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.9] text-text-sub mt-3">
              1기 9월 3일(목)~6일(일) · 2기 9월 10일(목)~13일(일) · 양양군 현남면 일원
            </p>
          </div>

          <div className="border border-[#E8611C] bg-[#FDEBD9] px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-noto)] text-[14px] font-black text-[#A8410F] mb-1">
              9월 1일(화)까지 제출해 주세요
            </p>
            <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-[#A8410F]">
              일정 시작 전 여행자 보험 가입을 마쳐야 하므로, 제출이 늦어지면 보험 가입이 어려울 수
              있습니다. 1기·2기 참가자 모두 이 양식으로 작성해 주시면 됩니다.
            </p>
          </div>

          <ConsentForm />
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub">
            로마드협동조합 · 문의 lomad.coop@gmail.com · 010-9542-3775
          </p>
        </div>
      </footer>
    </main>
  );
}
