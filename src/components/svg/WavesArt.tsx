export default function WavesArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  // 상생하는 생태계: 순환하는 원 + 연결된 노드들 (생태계 순환 구조)
  return (
    <svg
      viewBox="0 0 140 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 큰 순환 원 */}
      <ellipse cx="70" cy="55" rx="55" ry="40" stroke={color} strokeWidth={0.6} strokeDasharray="4 3" />

      {/* 안쪽 순환 원 */}
      <ellipse cx="70" cy="55" rx="32" ry="22" stroke={color} strokeWidth={0.5} opacity={0.6} />

      {/* 순환 화살표 (위) */}
      <path d="M105,25 L110,18 L112,28" stroke={color} strokeWidth={0.7} strokeLinejoin="round" />

      {/* 순환 화살표 (아래) */}
      <path d="M35,85 L30,92 L28,82" stroke={color} strokeWidth={0.7} strokeLinejoin="round" />

      {/* 노드: 주민 */}
      <circle cx="70" cy="14" r="4" stroke={color} strokeWidth={0.7} />
      <circle cx="70" cy="14" r="1.5" fill={color} />

      {/* 노드: 생활인구 */}
      <circle cx="125" cy="55" r="4" stroke={color} strokeWidth={0.7} />
      <circle cx="125" cy="55" r="1.5" fill={color} />

      {/* 노드: 지역 */}
      <circle cx="70" cy="96" r="4" stroke={color} strokeWidth={0.7} />
      <circle cx="70" cy="96" r="1.5" fill={color} />

      {/* 노드: 파트너 */}
      <circle cx="15" cy="55" r="4" stroke={color} strokeWidth={0.7} />
      <circle cx="15" cy="55" r="1.5" fill={color} />

      {/* 중심 연결점 */}
      <circle cx="70" cy="55" r="3" stroke={color} strokeWidth={0.6} />

      {/* 중심에서 노드로 연결선 */}
      <line x1="70" y1="52" x2="70" y2="18" stroke={color} strokeWidth={0.4} opacity={0.4} />
      <line x1="73" y1="55" x2="121" y2="55" stroke={color} strokeWidth={0.4} opacity={0.4} />
      <line x1="70" y1="58" x2="70" y2="92" stroke={color} strokeWidth={0.4} opacity={0.4} />
      <line x1="67" y1="55" x2="19" y2="55" stroke={color} strokeWidth={0.4} opacity={0.4} />
    </svg>
  );
}
