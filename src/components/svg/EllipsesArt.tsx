export default function EllipsesArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  const ellipses = [
    { rx: 50, ry: 30, rotate: -15 },
    { rx: 35, ry: 50, rotate: 10 },
    { rx: 45, ry: 25, rotate: -5 },
  ];

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {ellipses.map((e, i) => (
        <ellipse
          key={i}
          cx={60}
          cy={60}
          rx={e.rx}
          ry={e.ry}
          transform={`rotate(${e.rotate} 60 60)`}
          stroke={color}
          strokeWidth={0.7}
          fill="none"
        />
      ))}
    </svg>
  );
}
