export default function WavesArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  // WIN-WIN ECOSYSTEM: 순환 화살표 + 4개 노드
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 순환 원 (점선) */}
      <circle cx="40" cy="40" r="28" stroke={color} strokeWidth={0.6} strokeDasharray="3 2.5" />

      {/* 순환 화살표 (우상) */}
      <path d="M62,22 L66,17 L67,25" stroke={color} strokeWidth={0.6} strokeLinejoin="round" />
      {/* 순환 화살표 (좌하) */}
      <path d="M18,58 L14,63 L13,55" stroke={color} strokeWidth={0.6} strokeLinejoin="round" />

      {/* 노드: 상 (주민) */}
      <circle cx="40" cy="11" r="3" stroke={color} strokeWidth={0.6} />
      <circle cx="40" cy="11" r="1" fill={color} />

      {/* 노드: 우 (생활인구) */}
      <circle cx="69" cy="40" r="3" stroke={color} strokeWidth={0.6} />
      <circle cx="69" cy="40" r="1" fill={color} />

      {/* 노드: 하 (지역) */}
      <circle cx="40" cy="69" r="3" stroke={color} strokeWidth={0.6} />
      <circle cx="40" cy="69" r="1" fill={color} />

      {/* 노드: 좌 (파트너) */}
      <circle cx="11" cy="40" r="3" stroke={color} strokeWidth={0.6} />
      <circle cx="11" cy="40" r="1" fill={color} />

      {/* 중심점 */}
      <circle cx="40" cy="40" r="2" fill={color} opacity={0.3} />
    </svg>
  );
}
