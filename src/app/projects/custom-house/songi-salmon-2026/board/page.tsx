import type { Metadata } from "next";
import {
  BOOTH_NAME,
  SLOT_CAPACITY,
  SLOT_COLORS,
  SLOT_HOURS,
  currentSlotHour,
  dateLabel,
  hourLabel,
  isSlotAssignable,
  isTestMode,
  kstParts,
} from "@/lib/customhouse-config";
import { getSeats } from "@/lib/customhouse-db";
import AutoRefresh from "../_components/AutoRefresh";

// 현황판 (공개 · 개인정보 없음). 태블릿/TV 용 전체 화면.
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "회차 현황판 · 커스텀 티셔츠 만들기",
  robots: { index: false },
};

export default async function BoardPage() {
  const now = new Date();
  const { date, hour, minute } = kstParts(now);
  let seats: Record<number, number> | null = null;
  try {
    seats = await getSeats(date);
  } catch (e) {
    console.error("[customhouse] board seats failed:", e);
  }
  const cur = currentSlotHour(now);
  const test = isTestMode();

  return (
    <div className="sx-root fixed inset-0 z-[60] overflow-auto">
      <AutoRefresh intervalMs={15000} />

      {/* 축제 키비주얼 띠 */}
      <header className="sx-board-kv relative h-[150px] md:h-[180px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#262120]/35 via-transparent to-[#262120]/35" />
        <div className="relative h-full max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between gap-3">
          <div className="rounded-[20px] border-[4px] border-[#262120] bg-[#FBF7EE] px-4 md:px-6 py-2.5 md:py-3 shadow-[5px_6px_0_#262120] -rotate-[1.5deg]">
            <p className="text-[11px] md:text-[14px] font-bold tracking-[2px] text-[#8C4A42]">2026 양양송이연어축제 · 로마드 커스텀하우스</p>
            <h1 className="sx-hand text-[22px] md:text-[38px] leading-[1.1] mt-0.5">{BOOTH_NAME}</h1>
          </div>
          <div className="shrink-0 rounded-[20px] border-[4px] border-[#262120] bg-[#262120] text-[#F5EEDF] px-4 md:px-6 py-2 md:py-3 text-right shadow-[5px_6px_0_#8C4A42]">
            <p className="sx-hand text-[14px] md:text-[20px] leading-none">{dateLabel(date)}</p>
            <p className="text-[30px] md:text-[54px] font-black tabular-nums leading-none mt-1">
              {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
            </p>
          </div>
        </div>
        <svg
          className="absolute left-0 -bottom-[12px] w-full h-[26px]"
          viewBox="0 0 600 30"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d={`${WAVE} L600 30 L0 30Z`} fill="#F5EEDF" />
          <path d={WAVE} fill="none" stroke="#262120" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 md:pt-7 pb-6">
        {cur !== null && (
          <div
            className="rounded-[24px] border-[4px] border-[#262120] shadow-[5px_6px_0_#262120] px-6 py-3 md:py-4 mb-5 md:mb-6 flex items-center justify-between"
            style={{ backgroundColor: SLOT_COLORS[cur].bg, color: SLOT_COLORS[cur].fg }}
          >
            <span className="sx-hand text-[22px] md:text-[36px]">지금 진행 중</span>
            <span className="sx-hand text-[48px] md:text-[76px] tabular-nums leading-none">{hourLabel(cur)}</span>
          </div>
        )}

        {seats === null ? (
          <p className="sx-hand text-center text-[26px] py-20">현황을 불러오는 중이에요…</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {SLOT_HOURS.map((h) => {
              const left = Math.max(0, SLOT_CAPACITY - (seats![h] ?? 0));
              const closed = !isSlotAssignable(date, h, now, test);
              const c = SLOT_COLORS[h];
              const isCur = h === cur;
              return (
                <div
                  key={h}
                  className={`rounded-[20px] border-[4px] border-[#262120] bg-white overflow-hidden ${
                    isCur ? "shadow-[6px_7px_0_#262120] -rotate-[1deg]" : "shadow-[4px_5px_0_#262120]"
                  } ${closed && !isCur ? "opacity-45" : ""}`}
                >
                  <div
                    className="px-4 py-2 md:py-2.5 flex items-center justify-between border-b-[4px] border-[#262120]"
                    style={{ backgroundColor: c.bg, color: c.fg }}
                  >
                    <span className="sx-hand text-[26px] md:text-[40px] lg:text-[46px] leading-none pt-1 tabular-nums">{hourLabel(h)}</span>
                  </div>
                  <div className="px-4 py-3 md:py-4 min-h-[64px] md:min-h-[96px] lg:min-h-[120px] flex items-center">
                    {closed ? (
                      <p className="sx-hand text-[22px] md:text-[32px] text-[#262120]/60">배정 마감</p>
                    ) : left === 0 ? (
                      <p className="sx-hand text-[26px] md:text-[40px] text-[#D2463A] rotate-[-3deg] border-[3px] border-[#D2463A] rounded-xl px-3 pt-1">매진</p>
                    ) : (
                      <p className="font-black leading-none">
                        <span className="sx-hand text-[14px] md:text-[20px] text-[#262120]/60 mr-1.5">남은 자리</span>
                        <span className="text-[38px] md:text-[60px] lg:text-[76px] tabular-nums text-[#8C4A42]">{left}</span>
                        <span className="text-[15px] md:text-[22px] text-[#262120]/45"> / {SLOT_CAPACITY}</span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-6 md:mt-7 text-center text-[15px] md:text-[22px] font-bold break-keep">
          양양 관내 오늘 영수증 <span className="sx-hl text-[#8C4A42] font-black">3만원마다 1명</span> · QR로 접수하고 데스크에서 영수증을 보여주세요
        </p>
      </div>
    </div>
  );
}

const WAVE = "M0 16 C 40 4, 80 4, 120 14 S 200 26, 240 14 S 320 2, 360 14 S 440 26, 480 14 S 560 4, 600 14";
