"use client";

/**
 * 상단 가로 무한 스크롤 마퀴. The Air House 풍.
 * CSS animation 으로 처리해서 성능 부담 없음.
 */
export default function Marquee({
  items,
  dark = true,
}: {
  items: string[];
  dark?: boolean;
}) {
  const repeated = [...items, ...items, ...items, ...items];
  const bg = dark ? "bg-black/40 backdrop-blur-sm text-white/80" : "bg-bg-sub text-text-sub";
  return (
    <div className={`relative overflow-hidden ${bg} py-2.5`}>
      <div
        className="flex gap-8 whitespace-nowrap animate-marquee will-change-transform"
        style={{ animation: "festival-marquee 40s linear infinite" }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] tracking-[3px] font-bold uppercase"
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes festival-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
