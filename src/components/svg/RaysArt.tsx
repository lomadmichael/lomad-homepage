export default function RaysArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  // 사람과 지역의 연결: 두 점(사람/지역)에서 선이 중앙으로 모여 하나로 연결되는 형태
  return (
    <svg
      viewBox="0 0 140 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 왼쪽 점 (사람) */}
      <circle cx="15" cy="30" r="6" stroke={color} strokeWidth={0.8} />
      <circle cx="15" cy="30" r="2" fill={color} />

      {/* 오른쪽 점 (지역) */}
      <circle cx="125" cy="30" r="6" stroke={color} strokeWidth={0.8} />
      <circle cx="125" cy="30" r="2" fill={color} />

      {/* 왼쪽에서 중심으로 연결되는 선들 */}
      <line x1="15" y1="38" x2="70" y2="90" stroke={color} strokeWidth={0.6} />
      <line x1="15" y1="38" x2="55" y2="100" stroke={color} strokeWidth={0.5} />
      <line x1="15" y1="38" x2="85" y2="100" stroke={color} strokeWidth={0.5} />

      {/* 오른쪽에서 중심으로 연결되는 선들 */}
      <line x1="125" y1="38" x2="70" y2="90" stroke={color} strokeWidth={0.6} />
      <line x1="125" y1="38" x2="55" y2="100" stroke={color} strokeWidth={0.5} />
      <line x1="125" y1="38" x2="85" y2="100" stroke={color} strokeWidth={0.5} />

      {/* 중심 연결점 */}
      <circle cx="70" cy="90" r="4" stroke={color} strokeWidth={0.8} />

      {/* 아래로 퍼지는 구조선 (연결이 확장되는 모습) */}
      <line x1="70" y1="94" x2="30" y2="150" stroke={color} strokeWidth={0.5} />
      <line x1="70" y1="94" x2="50" y2="150" stroke={color} strokeWidth={0.5} />
      <line x1="70" y1="94" x2="70" y2="150" stroke={color} strokeWidth={0.6} />
      <line x1="70" y1="94" x2="90" y2="150" stroke={color} strokeWidth={0.5} />
      <line x1="70" y1="94" x2="110" y2="150" stroke={color} strokeWidth={0.5} />

      {/* 하단 작은 점들 (연결된 사람들) */}
      <circle cx="30" cy="150" r="2" fill={color} opacity={0.4} />
      <circle cx="50" cy="150" r="2" fill={color} opacity={0.5} />
      <circle cx="70" cy="150" r="2.5" fill={color} opacity={0.6} />
      <circle cx="90" cy="150" r="2" fill={color} opacity={0.5} />
      <circle cx="110" cy="150" r="2" fill={color} opacity={0.4} />
    </svg>
  );
}
