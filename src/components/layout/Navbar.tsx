"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Custom House", href: "/custom-house" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-[60px] py-[18px] bg-bg/95 backdrop-blur-xl border-b border-border/60">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <span className="block w-[22px] h-[22px] rounded-full bg-text" />
        <span className="font-[family-name:var(--font-karla)] text-[18px] font-extrabold tracking-[2px] uppercase">
          LOMAD
        </span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-[family-name:var(--font-karla)] text-[11px] font-semibold tracking-[1.5px] uppercase text-text hover:opacity-70 transition-opacity"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <Button href="/contact" variant="primary">
          Project Inquiry
        </Button>
      </div>

      {/* Mobile hamburger */}
      <button
        type="button"
        className="md:hidden flex flex-col justify-center gap-[5px] cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className="block w-5 h-[1.5px] bg-text" />
        <span className="block w-5 h-[1.5px] bg-text" />
        <span className="block w-5 h-[1.5px] bg-text" />
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-bg/95 backdrop-blur-xl border-b border-border/60 px-6 py-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-karla)] text-[11px] font-semibold tracking-[1.5px] uppercase text-text"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Button href="/contact" variant="primary" className="mt-2 text-center">
            Project Inquiry
          </Button>
        </div>
      )}
    </nav>
  );
}
