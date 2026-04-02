import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-[60px] py-12 flex flex-col md:flex-row justify-between gap-8">
      {/* Left column */}
      <div className="flex flex-col gap-3">
        <span className="font-[family-name:var(--font-karla)] text-[14px] font-extrabold tracking-[2px] uppercase">
          LOMAD COOPERATIVE
        </span>
        <div className="font-[family-name:var(--font-noto)] text-[11px] text-text-muted leading-relaxed">
          <p>로마드 협동조합 | 대표자 : 장래홍</p>
          <p>소재지 : 강원도 양양군 북족로 110-1102호</p>
          <p>사업자 등록번호 : 131-88-03158</p>
          <p>개인정보관리책임자 : 이홍래</p>
        </div>
      </div>

      {/* Center column */}
      <div className="flex flex-col gap-3">
        <span className="font-[family-name:var(--font-karla)] text-[12px] font-extrabold tracking-[1.5px] uppercase">
          Contact
        </span>
        <div className="font-[family-name:var(--font-noto)] text-[11px] text-text-muted leading-relaxed">
          <p>lomad.coop@gmail.co</p>
          <p>+82 033 672 6775</p>
        </div>
        <div className="flex gap-4 mt-1">
          <Link
            href="https://www.instagram.com/lomad.coop"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-karla)] text-[10px] uppercase text-text-muted hover:text-text transition-colors tracking-[1.5px]"
          >
            Instagram
          </Link>
          <Link
            href="https://blog.naver.com/lomadcoop"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-karla)] text-[10px] uppercase text-text-muted hover:text-text transition-colors tracking-[1.5px]"
          >
            Blog
          </Link>
        </div>
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
