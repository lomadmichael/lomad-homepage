"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type CopyButtonProps = {
  text: string;
  className?: string;
  /** dark: 어두운 명령 박스 위 / light: 밝은 배경 위 */
  variant?: "dark" | "light";
  label?: string;
};

/** 비보안 컨텍스트(http)나 클립보드 API 미지원 브라우저용 폴백 */
function legacyCopy(text: string): boolean {
  if (typeof document === "undefined") return false;
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.top = "0";
  ta.style.left = "0";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  ta.setSelectionRange(0, ta.value.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}

type Status = "idle" | "copied" | "failed";

export default function CopyButton({
  text,
  className,
  variant = "light",
  label = "복사",
}: CopyButtonProps) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flash = useCallback((next: Status) => {
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 1500);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        flash("copied");
        return;
      }
    } catch {
      // 아래 폴백으로 진행
    }
    flash(legacyCopy(text) ? "copied" : "failed");
  }, [text, flash]);

  const copied = status === "copied";
  const failed = status === "failed";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "복사됨" : failed ? "복사 실패" : "클립보드에 복사"}
      aria-live="polite"
      className={cn(
        "font-[family-name:var(--font-karla)] text-[10px] font-bold tracking-[1.5px] uppercase",
        "px-2.5 py-1.5 border shrink-0 cursor-pointer transition-colors duration-200 whitespace-nowrap",
        failed
          ? "border-[#C0392B] text-[#C0392B]"
          : variant === "dark"
            ? copied
              ? "border-[#7FD1AE] text-[#7FD1AE]"
              : "border-[#5C6675] text-[#C3CBD6] hover:border-[#C3CBD6] hover:text-white"
            : copied
              ? "border-[#0B7A5A] text-[#0B7A5A]"
              : "border-border text-text-sub hover:border-text hover:text-text",
        className,
      )}
    >
      {copied ? "복사됨 ✓" : failed ? "직접 복사" : label}
    </button>
  );
}
