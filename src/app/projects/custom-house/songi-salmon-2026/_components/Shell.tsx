/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BASE_PATH } from "@/lib/customhouse-config";

// 축제 톤 팔레트(부스 배너와 동일): 크림 #F5EEDF · 종이 #FBF7EE · 잉크 #262120 · 갈색 #8C4A42
// 연어 #E07F74 · 올리브 #98AB5A · 하늘 #8FCBD8 · 주황 #E8961C — 스타일 토큰은 ../songi.css (sx- 접두어)

export const IMG = "/images/customhouse-songi";

/** 키비주얼 + 손그림 물결 구분선. 채움(fill)과 선(stroke)을 따로 그려 아래쪽 직선이 생기지 않게. */
export function KeyVisual({ priority = false }: { priority?: boolean }) {
  const d = "M0 16 C 40 4, 80 4, 120 14 S 200 26, 240 14 S 320 2, 360 14 S 440 26, 480 14 S 560 4, 600 14";
  return (
    <div className="sx-kv">
      <img
        src={`${IMG}/kv.webp`}
        alt="2026 양양 송이연어축제 — 청정자연이 차린 가장 깊은 식탁"
        width={1600}
        height={800}
        fetchPriority={priority ? "high" : undefined}
      />
      <svg className="sx-wave" viewBox="0 0 600 30" preserveAspectRatio="none" aria-hidden>
        <path d={`${d} L600 30 L0 30Z`} fill="#F5EEDF" />
        <path d={d} fill="none" stroke="#262120" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

const ZIG_POINTS = Array.from({ length: 35 }, (_, i) => `${i * 16} ${i % 2 === 0 ? 6 : 16}`).join(" L");

/** 영수증 아래 톱니 (배너와 동일: 채움과 선을 따로) */
export function ReceiptZig() {
  return (
    <svg className="sx-zig" viewBox="0 0 544 18" preserveAspectRatio="none" aria-hidden>
      <path d={`M0 0 L${ZIG_POINTS} L544 0 Z`} fill="#fff" />
      <path
        d={`M${ZIG_POINTS}`}
        fill="none"
        stroke="#262120"
        strokeWidth="4"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Shell({
  children,
  wide = false,
  back,
  kv = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
  back?: { href: string; label: string };
  /** true면 맨 위에 축제 키비주얼을 깔고, 작은 상단바는 생략 */
  kv?: boolean;
}) {
  return (
    <div className="sx-root min-h-screen flex flex-col">
      <div className={`${wide ? "max-w-[1100px]" : "max-w-[520px]"} w-full mx-auto flex-1`}>
        {kv ? (
          <KeyVisual priority />
        ) : (
          <div className="flex items-center justify-between gap-3 px-4 pt-4 mb-5">
            <Link
              href={BASE_PATH}
              className="flex items-center gap-2 min-h-[48px] rounded-full border-[3px] border-[#262120] bg-[#FBF7EE] pl-1.5 pr-4 shadow-[3px_4px_0_#262120]"
            >
              <img src={`${IMG}/songsong-face.webp`} alt="" width={36} height={45} className="h-9 w-auto" />
              <span className="sx-hand text-[16px] leading-none pt-0.5">송이연어축제 · 커스텀 티셔츠</span>
            </Link>
            {back && (
              <Link
                href={back.href}
                className="sx-hand shrink-0 min-h-[48px] flex items-center px-3 text-[16px] text-[#8C4A42] underline underline-offset-4 decoration-2"
              >
                ← {back.label}
              </Link>
            )}
          </div>
        )}
        <div className={`px-4 ${kv ? "pt-6" : ""} pb-12`}>{children}</div>
      </div>
      <footer className="border-t-[5px] border-[#1d6a6a] bg-[#f6f1e7] py-5 text-center">
        <p className="text-[16px] font-extrabold tracking-[1px] text-[#1f3a3a]">운영 : 로마드 협동조합</p>
      </footer>
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative bg-[#FBF7EE] rounded-[24px] border-[3px] border-[#262120] shadow-[5px_6px_0_#262120] p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/** 카드 위에 걸치는 검은 이름표 (배너의 "시간대별 운영") */
export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="sx-tag text-[19px]">{children}</span>;
}

const btnBase =
  "sx-press w-full min-h-14 rounded-2xl border-[3px] border-[#262120] flex items-center justify-center px-4 disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed";

export const btnPrimary = `${btnBase} bg-[#E07F74] text-white text-[19px] font-black shadow-[4px_5px_0_#262120] [text-shadow:1px_2px_0_rgba(38,33,32,.55)]`;
export const btnDark = `${btnBase} bg-[#262120] text-[#F5EEDF] text-[18px] font-black shadow-[4px_5px_0_#8C4A42]`;
export const btnGhost = `${btnBase} bg-[#FBF7EE] text-[#262120] text-[16px] font-extrabold shadow-[3px_4px_0_#262120]`;
export const inputCls =
  "w-full h-14 rounded-2xl bg-[#FBF7EE] border-[3px] border-[#262120] px-4 text-[18px] font-semibold outline-none focus:bg-white focus:shadow-[0_0_0_4px_rgba(224,127,116,.45)] placeholder:text-[#262120]/35 placeholder:font-medium";
