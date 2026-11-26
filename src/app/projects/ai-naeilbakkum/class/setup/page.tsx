import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import SetupWizard from "@/components/projects/ai-naeilbakkum/SetupWizard";
import { CLASS_GUIDE_HREF, CLASS_SETUP_STORE_KEY, CLASS_SETUP_TRACKS } from "@/lib/ainb-class-setup";
import { CLASS_SUBTITLE, CLASS_TITLE } from "@/lib/ainb-class-config";
import { ainbOg } from "@/lib/ainb-og";

const PATH = "/projects/ai-naeilbakkum/class/setup";
const TITLE = `설치 가이드 · ${CLASS_TITLE} | LOMAD`;
const DESCRIPTION = `${CLASS_TITLE} 「${CLASS_SUBTITLE}」 설치 가이드 — Windows·Mac 한 화면에 한 단계씩 따라 하는 위저드.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  ...ainbOg({ title: TITLE, description: DESCRIPTION, path: PATH }),
  robots: { index: false, follow: false },
};

const SECTION = "font-[family-name:var(--font-noto)]";

const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;

/** public/ainb/setup/{win,mac} 에 실제로 올라온 스크린샷만 골라낸다 (없으면 자리표시) */
function listAvailableImages(): string[] {
  const found: string[] = [];
  for (const dir of ["win", "mac"]) {
    try {
      const abs = path.join(process.cwd(), "public", "ainb", "setup", dir);
      for (const name of fs.readdirSync(abs)) {
        if (IMAGE_RE.test(name)) found.push(`/ainb/setup/${dir}/${name}`);
      }
    } catch {
      // 폴더가 아직 없거나 비어 있음 — 자리표시로 처리된다
    }
  }
  return found;
}

export default function ClassSetupPage() {
  const availableImages = listAvailableImages();
  const backHref = `${CLASS_GUIDE_HREF}#day1`;

  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href={backHref}
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text transition-colors"
          >
            ← 실습 가이드
          </Link>
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            Lomad
          </span>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
            Setup
          </p>
          <h1 className={`${SECTION} text-[30px] md:text-[38px] font-black leading-[1.25] mb-5 break-keep`}>
            {CLASS_TITLE}
            <br />
            설치 가이드
          </h1>
          <p className={`${SECTION} text-[14px] text-text-sub leading-[1.9] mb-12`}>
            노트북 화면이 설치 창에 가려져 있으니 이 페이지는 폰으로 보면서 따라 하세요. 한 화면에 한
            가지씩만 합니다. 내 구글 계정과 해외 결제가 되는 카드를 준비해 주세요.
          </p>

          <SetupWizard
            tracks={CLASS_SETUP_TRACKS}
            availableImages={availableImages}
            storeKey={CLASS_SETUP_STORE_KEY}
            backHref={backHref}
          />
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
