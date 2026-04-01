export default function RaysArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  const lines = Array.from({ length: 11 }, (_, i) => {
    const x = (i / 10) * 120;
    return (
      <line
        key={i}
        x1={60}
        y1={5}
        x2={x}
        y2={160}
        stroke={color}
        strokeWidth={0.7}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {lines}
    </svg>
  );
}
