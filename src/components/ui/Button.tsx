import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-text text-bg hover:opacity-90",
  outline: "border border-text text-text hover:bg-text hover:text-bg",
  white: "bg-white text-text hover:opacity-90",
  "outline-white": "border border-white text-white hover:bg-white hover:text-text",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
}: ButtonProps) {
  const base = cn(
    "font-[family-name:var(--font-karla)] text-[10px] font-bold tracking-[2px] uppercase px-7 py-3 inline-block transition-colors duration-200",
    variants[variant],
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(base, "cursor-pointer")}>
      {children}
    </button>
  );
}
