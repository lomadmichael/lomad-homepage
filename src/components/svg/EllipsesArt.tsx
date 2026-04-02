export default function EllipsesArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  // A REPEATABLE MODEL: 반복되는 파도/계절 — 겹겹이 쌓이는 곡선
  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 반복되는 파도 곡선 (위→아래 점점 굵게) */}
      <path d="M5,12 Q20,4 40,12 Q60,20 75,12" stroke={color} strokeWidth={0.4} opacity={0.4} />
      <path d="M5,22 Q20,14 40,22 Q60,30 75,22" stroke={color} strokeWidth={0.5} opacity={0.55} />
      <path d="M5,32 Q20,24 40,32 Q60,40 75,32" stroke={color} strokeWidth={0.6} opacity={0.7} />
      <path d="M5,42 Q20,34 40,42 Q60,50 75,42" stroke={color} strokeWidth={0.7} opacity={0.85} />
      <path d="M5,52 Q20,44 40,52 Q60,60 75,52" stroke={color} strokeWidth={0.8} />
    </svg>
  );
}
