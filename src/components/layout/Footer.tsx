import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-[60px] py-12 flex flex-col md:flex-row justify-between gap-8">
      {/* Left column */}
      <div className="flex flex-col gap-3">
        <span className="font-[family-name:var(--font-karla)] text-[14px] font-extrabold tracking-[2px] uppercase">
          LOMAD COOPERATIVE
        </span>
        <div className="font-[family-name:var(--font-noto)] text-[11px] text-text-muted leading-relaxed">
          <p>강원도 양양군 양양읍 남문로 22, 2층</p>
          <p>hello@lomad.co</p>
          <p>010-0000-0000</p>
        </div>
      </div>

      {/* Center column */}
      <div className="flex flex-col gap-2">
        <Link
          href="https://instagram.com/lomad.co"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-karla)] text-[10px] uppercase text-text-muted hover:text-text transition-colors tracking-[1.5px]"
        >
          Instagram
        </Link>
        <Link
          href="https://blog.lomad.co"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-karla)] text-[10px] uppercase text-text-muted hover:text-text transition-colors tracking-[1.5px]"
        >
          Blog
        </Link>
      </div>

      {/* Right column */}
      <div className="flex items-end">
        <span className="font-[family-name:var(--font-noto)] text-[10px] text-text-muted">
          &copy; 2026 LOMAD Cooperative. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
