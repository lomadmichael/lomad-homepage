export default function RaysArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  // CONNECTING STRUCTURE: 사람(위)과 지역(아래)이 다리로 연결되는 구조
  return (
    <svg
      viewBox="0 0 80 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 사람 (위쪽 그룹) */}
      <circle cx="25" cy="12" r="3.5" stroke={color} strokeWidth={0.7} />
      <circle cx="40" cy="8" r="3.5" stroke={color} strokeWidth={0.7} />
      <circle cx="55" cy="12" r="3.5" stroke={color} strokeWidth={0.7} />

      {/* 연결 선: 사람 → 중심 */}
      <line x1="25" y1="16" x2="40" y2="50" stroke={color} strokeWidth={0.5} />
      <line x1="40" y1="12" x2="40" y2="50" stroke={color} strokeWidth={0.6} />
      <line x1="55" y1="16" x2="40" y2="50" stroke={color} strokeWidth={0.5} />

      {/* 중심 연결 노드 */}
      <circle cx="40" cy="52" r="5" stroke={color} strokeWidth={0.8} />
      <circle cx="40" cy="52" r="1.5" fill={color} />

      {/* 연결 선: 중심 → 지역 */}
      <line x1="40" y1="57" x2="20" y2="95" stroke={color} strokeWidth={0.5} />
      <line x1="40" y1="57" x2="40" y2="95" stroke={color} strokeWidth={0.6} />
      <line x1="40" y1="57" x2="60" y2="95" stroke={color} strokeWidth={0.5} />

      {/* 지역 (아래쪽 — 집/건물 심볼) */}
      <rect x="14" y="93" width="12" height="10" stroke={color} strokeWidth={0.6} rx="1" />
      <rect x="34" y="90" width="12" height="13" stroke={color} strokeWidth={0.6} rx="1" />
      <rect x="54" y="93" width="12" height="10" stroke={color} strokeWidth={0.6} rx="1" />
    </svg>
  );
}
