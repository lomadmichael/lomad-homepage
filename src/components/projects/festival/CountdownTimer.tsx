"use client";

import { useEffect, useState } from "react";

// 페스티벌 시작 시각 (KST, 2026.7.4 토요일 10:00)
const TARGET = new Date("2026-07-04T10:00:00+09:00").getTime();

type Time = { d: number; h: number; m: number; s: number } | null;

export default function CountdownTimer({
  light = false,
}: {
  /** 라이트 배경 위에서 쓰는 경우 색상을 다크로 */
  light?: boolean;
}) {
  const [time, setTime] = useState<Time>(null);

  useEffect(() => {
    const update = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTime({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff / 3_600_000) % 24),
        m: Math.floor((diff / 60_000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const colorMain = light ? "text-text" : "text-white";
  const colorSub = light ? "text-text-muted" : "text-white/60";
  const colorSep = light ? "text-text/40" : "text-white/40";

  return (
    <div
      className={`flex items-baseline justify-center gap-3 md:gap-8 ${colorMain}`}
      aria-label="페스티벌 카운트다운"
    >
      <Unit value={time ? String(time.d).padStart(2, "0") : "--"} label="DAYS" colorSub={colorSub} />
      <Sep colorSep={colorSep} />
      <Unit value={time ? pad(time.h) : "--"} label="HOURS" colorSub={colorSub} />
      <Sep colorSep={colorSep} />
      <Unit value={time ? pad(time.m) : "--"} label="MINUTES" colorSub={colorSub} />
      <Sep colorSep={colorSep} />
      <Unit value={time ? pad(time.s) : "--"} label="SECONDS" colorSub={colorSub} />
    </div>
  );
}

function Unit({ value, label, colorSub }: { value: string; label: string; colorSub: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-[family-name:var(--font-karla)] text-[44px] md:text-[96px] font-black leading-none tabular-nums tracking-tight">
        {value}
      </span>
      <span className={`font-[family-name:var(--font-karla)] text-[9px] md:text-[11px] tracking-[3px] font-bold mt-2 ${colorSub}`}>
        {label}
      </span>
    </div>
  );
}

function Sep({ colorSep }: { colorSep: string }) {
  return (
    <span className={`font-[family-name:var(--font-karla)] text-[44px] md:text-[96px] font-black leading-none ${colorSep}`}>
      :
    </span>
  );
}
