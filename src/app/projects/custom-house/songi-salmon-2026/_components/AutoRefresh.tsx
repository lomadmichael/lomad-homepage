"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * 서버 컴포넌트 데이터를 주기적으로 다시 가져온다(router.refresh).
 * pauseWhileEditing: 입력칸에 포커스가 있거나 최근 30초 안에 입력했으면 건너뜀(관리자 화면용).
 */
export default function AutoRefresh({
  intervalMs = 5000,
  pauseWhileEditing = false,
}: {
  intervalMs?: number;
  pauseWhileEditing?: boolean;
}) {
  const router = useRouter();
  const lastEdit = useRef(0);

  useEffect(() => {
    const mark = () => {
      lastEdit.current = Date.now();
    };
    if (pauseWhileEditing) {
      document.addEventListener("input", mark, true);
      document.addEventListener("change", mark, true);
    }
    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (pauseWhileEditing) {
        const el = document.activeElement;
        const tag = el?.tagName;
        if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
        if (Date.now() - lastEdit.current < 30_000) return;
      }
      router.refresh();
    }, intervalMs);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("input", mark, true);
      document.removeEventListener("change", mark, true);
    };
  }, [router, intervalMs, pauseWhileEditing]);

  return null;
}
