import { cn } from "@/lib/cn";

type PageHeroProps = {
  titleEn: string;
  subtitleKr: string;
  labelEn?: string;
  className?: string;
};

export default function PageHero({
  titleEn,
  subtitleKr,
  labelEn,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "max-w-[1400px] mx-auto px-6 md:px-[60px] pt-[60px] md:pt-[100px] pb-[40px] md:pb-[60px]",
        className,
      )}
    >
      {labelEn && (
        <p className="font-[family-name:var(--font-karla)] text-[10px] font-bold tracking-[2px] uppercase text-text-muted mb-4">
          {labelEn}
        </p>
      )}
      <h1 className="font-[family-name:var(--font-karla)] text-[40px] md:text-[72px] font-bold uppercase leading-[1.05] tracking-tight">
        {titleEn}
      </h1>
      <p className="font-[family-name:var(--font-noto)] text-[15px] font-semibold text-text-sub mt-4">
        {subtitleKr}
      </p>
    </section>
  );
}
