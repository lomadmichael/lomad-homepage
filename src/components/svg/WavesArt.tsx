export default function WavesArt({
  className,
  color = "#1A1A1A",
}: {
  className?: string;
  color?: string;
}) {
  const waves = [
    "M 0,20 Q 30,5 60,20 Q 90,35 120,20",
    "M 0,40 Q 30,25 60,40 Q 90,55 120,40",
    "M 0,60 Q 30,45 60,60 Q 90,75 120,60",
  ];

  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {waves.map((d, i) => (
        <path key={i} d={d} stroke={color} strokeWidth={0.7} fill="none" />
      ))}
    </svg>
  );
}
