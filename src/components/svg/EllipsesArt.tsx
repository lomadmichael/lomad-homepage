export default function EllipsesArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  // 양양 바다: 파도가 겹겹이 밀려오는 형태 + 수평선 + 서프보드 실루엣
  return (
    <svg
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 수평선 */}
      <line x1="10" y1="35" x2="130" y2="35" stroke={color} strokeWidth={0.4} opacity={0.4} />

      {/* 해 (반원) */}
      <path d="M55,35 A15,15 0 0,1 85,35" stroke={color} strokeWidth={0.6} />

      {/* 파도 1 — 가장 먼 */}
      <path d="M5,55 Q20,45 35,55 Q50,65 70,52 Q90,40 105,52 Q120,62 135,52" stroke={color} strokeWidth={0.5} opacity={0.5} />

      {/* 파도 2 — 중간 */}
      <path d="M0,68 Q18,56 38,68 Q55,78 72,65 Q90,52 110,65 Q125,76 140,65" stroke={color} strokeWidth={0.6} opacity={0.7} />

      {/* 파도 3 — 가장 가까운 */}
      <path d="M-5,82 Q15,68 40,82 Q60,94 80,80 Q100,66 120,80 Q135,92 145,80" stroke={color} strokeWidth={0.7} />

      {/* 파도 4 — 해변 */}
      <path d="M0,95 Q25,85 50,95 Q75,105 100,93 Q120,83 140,95" stroke={color} strokeWidth={0.5} opacity={0.6} />

      {/* 물거품 점들 */}
      <circle cx="35" cy="88" r="1" fill={color} opacity={0.3} />
      <circle cx="75" cy="85" r="1.2" fill={color} opacity={0.3} />
      <circle cx="105" cy="88" r="1" fill={color} opacity={0.3} />
      <circle cx="55" cy="78" r="0.8" fill={color} opacity={0.2} />
    </svg>
  );
}
