"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import CopyButton from "@/components/ui/CopyButton";
import {
  SETUP_TEL,
  type SetupOs,
  type SetupStep,
  type SetupTrack,
  type Shot,
  type Trouble,
} from "@/lib/ainb-setup";

const SECTION = "font-[family-name:var(--font-noto)]";
const KARLA = "font-[family-name:var(--font-karla)]";

const STORE_KEY = "ainb-setup-v1";
const CURRICULUM_HREF = "/projects/ai-naeilbakkum/curriculum#day1";

const HASH_PREFIX: Record<SetupOs, string> = { windows: "win", mac: "mac" };
const OS_SHORT: Record<SetupOs, string> = { windows: "Windows", mac: "Mac" };

type Saved = { os?: unknown; stepIndex?: unknown; done?: unknown };

/** `#win-3` / `#mac-1` (1-based) → { os, index } */
function parseHash(raw: string): { os: SetupOs; index: number } | null {
  const m = /^#?(win|mac)-(\d+)$/i.exec(raw.trim());
  if (!m) return null;
  const os: SetupOs = m[1].toLowerCase() === "mac" ? "mac" : "windows";
  const n = Number.parseInt(m[2], 10);
  if (!Number.isFinite(n) || n < 1) return null;
  return { os, index: n - 1 };
}

/* ── 저장된 진행 상태 읽기 (SSR 에서는 접근하지 않는다) ──
   CurriculumTabs 와 같은 useSyncExternalStore 방식. getSnapshot 이 매번 같은
   객체를 돌려주도록 첫 읽기 결과를 캐시하고, 언마운트 때 캐시를 비운다. */

type Restored = { os: SetupOs | null; index: number; done: Set<string> };

/** 서버(=하이드레이션 전) 스냅샷. 이 값이면 아직 복원 전이라는 뜻 */
const PENDING: Restored = { os: null, index: 0, done: new Set<string>() };

let restoredCache: Restored | null = null;

function computeRestored(): Restored {
  let os: SetupOs | null = null;
  let index = 0;
  let done = new Set<string>();

  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Saved;
      if (saved.os === "windows" || saved.os === "mac") os = saved.os;
      if (typeof saved.stepIndex === "number" && Number.isFinite(saved.stepIndex)) {
        index = Math.max(Math.trunc(saved.stepIndex), 0);
      }
      if (Array.isArray(saved.done)) {
        done = new Set(saved.done.filter((v): v is string => typeof v === "string"));
      }
    }
  } catch {
    /* 저장값 없음 / 접근 차단 — 무시 */
  }

  // URL 해시가 최우선
  try {
    const fromHash = parseHash(window.location.hash);
    if (fromHash) {
      os = fromHash.os;
      index = fromHash.index;
    }
  } catch {
    /* 무시 */
  }

  return { os, index, done };
}

function readRestored(): Restored {
  if (!restoredCache) restoredCache = computeRestored();
  return restoredCache;
}

const readPending = (): Restored => PENDING;
const subscribeNever = () => () => {};

/* ───────────────────────── 이미지 / 라이트박스 ───────────────────────── */

function ShotFrame({
  img,
  alt,
  available,
  onOpen,
}: {
  img?: string;
  alt: string;
  available: Set<string>;
  onOpen: (shot: { src: string; alt: string }) => void;
}) {
  if (!img || !available.has(img)) {
    return (
      <div className="border border-border bg-[#f3f1ec] min-h-[120px] flex items-center justify-center px-4 py-6 mb-3">
        <p className={cn(SECTION, "text-[12px] text-text-muted leading-[1.7] text-center")}>
          📷 스크린샷 준비 중 — {alt}
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen({ src: img, alt })}
      aria-label={`${alt} — 크게 보기`}
      className="block w-full border border-border bg-[#f3f1ec] p-0 mb-3 cursor-zoom-in"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={alt} loading="lazy" className="block w-full max-w-full h-auto" />
    </button>
  );
}

/* ───────────────────────── 화면 한 장 = 행동 하나 ───────────────────────── */

function ShotView({
  shot,
  available,
  onOpen,
}: {
  shot: Shot;
  available: Set<string>;
  onOpen: (s: { src: string; alt: string }) => void;
}) {
  return (
    <div className="mb-8">
      <ShotFrame img={shot.img} alt={shot.alt} available={available} onOpen={onOpen} />

      <p className={cn(SECTION, "text-[16px] font-black leading-[1.6] break-keep")}>{shot.action}</p>

      {shot.note && (
        <p className={cn(SECTION, "text-[13px] text-text-sub leading-[1.8] mt-2")}>{shot.note}</p>
      )}

      {shot.link && (
        <a
          href={shot.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            SECTION,
            "mt-3 flex items-center justify-center w-full min-h-[48px] px-4 py-3",
            "border border-text text-text text-[14px] font-bold text-center leading-[1.5]",
            "hover:bg-text hover:text-bg transition-colors duration-200",
          )}
        >
          {shot.link.label} ↗
        </a>
      )}

      {shot.command && (
        <div className="mt-3">
          <div className="flex items-center justify-end mb-2">
            <CopyButton text={shot.command} variant="light" label="명령 복사" />
          </div>
          <div className="bg-[#1e2530] border border-[#1e2530]">
            <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-[1.7] text-[#E6EBF2]">
              <code className="font-mono whitespace-pre">{shot.command}</code>
            </pre>
          </div>
        </div>
      )}

      {shot.prompt && (
        <div className="mt-3">
          <div className="flex items-center justify-end mb-2">
            <CopyButton text={shot.prompt} variant="light" label="붙여넣을 문장 복사" />
          </div>
          <div className="border border-border bg-input-bg px-4 py-4">
            <p className={cn(SECTION, "text-[14px] leading-[1.9] whitespace-pre-wrap")}>
              {shot.prompt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── 트러블슈팅 ───────────────────────── */

function TroubleItem({ trouble }: { trouble: Trouble }) {
  return (
    <details className="border border-border bg-input-bg px-4 py-3 mb-2">
      <summary className={cn(SECTION, "text-[14px] font-black leading-[1.6] cursor-pointer")}>
        <span aria-hidden="true">▸ </span>
        {trouble.symptom}
      </summary>
      <p className={cn(SECTION, "text-[13px] text-text-sub leading-[1.9] mt-3")}>{trouble.fix}</p>
      {trouble.command && (
        <div className="mt-3">
          <div className="flex items-center justify-end mb-2">
            <CopyButton text={trouble.command} variant="light" label="명령 복사" />
          </div>
          <div className="bg-[#1e2530] border border-[#1e2530]">
            <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-[1.7] text-[#E6EBF2]">
              <code className="font-mono whitespace-pre">{trouble.command}</code>
            </pre>
          </div>
        </div>
      )}
    </details>
  );
}

/* ───────────────────────── 메인 ───────────────────────── */

export default function SetupWizard({
  tracks,
  availableImages,
}: {
  tracks: SetupTrack[];
  availableImages: string[];
}) {
  const available = useMemo(() => new Set(availableImages), [availableImages]);

  const restored = useSyncExternalStore(subscribeNever, readRestored, readPending);
  const ready = restored !== PENDING;

  // 사용자가 건드리기 전에는 복원값(restored)을 그대로 쓴다
  const [osOverride, setOsOverride] = useState<SetupOs | null | undefined>(undefined);
  const [indexOverride, setIndexOverride] = useState<number | undefined>(undefined);
  const [doneOverride, setDoneOverride] = useState<Set<string> | undefined>(undefined);

  const [picking, setPicking] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const os = osOverride !== undefined ? osOverride : restored.os;
  const done = doneOverride ?? restored.done;

  const track = os ? (tracks.find((t) => t.os === os) ?? null) : null;
  const steps: SetupStep[] = track?.steps ?? [];
  const stepIndex = Math.min(
    Math.max(indexOverride ?? restored.index, 0),
    Math.max(steps.length - 1, 0),
  );
  const step: SetupStep | undefined = steps[stepIndex];

  /* 다시 마운트될 때 최신 저장값을 읽도록 캐시를 비운다 */
  useEffect(() => {
    return () => {
      restoredCache = null;
    };
  }, []);

  /* 저장 */
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ os, stepIndex, done: Array.from(done) }),
      );
    } catch {
      /* 무시 */
    }
  }, [ready, os, stepIndex, done]);

  /* 해시 갱신 — 스크롤 점프 없이 */
  useEffect(() => {
    if (!ready) return;
    try {
      const hash = os ? `#${HASH_PREFIX[os]}-${stepIndex + 1}` : "";
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}${hash}`,
      );
    } catch {
      /* 무시 */
    }
  }, [ready, os, stepIndex]);

  /* 라이트박스 열기/닫기 */
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (lightbox && !el.open) el.showModal();
    if (!lightbox && el.open) el.close();
  }, [lightbox]);

  const goTo = useCallback((index: number) => {
    setIndexOverride(index);
    setTocOpen(false);
    try {
      window.scrollTo({ top: 0 });
    } catch {
      /* 무시 */
    }
  }, []);

  const chooseOs = useCallback(
    (next: SetupOs) => {
      setPicking(false);
      setOsOverride(next);
      // 다른 OS 를 고르면 처음부터, 같은 OS 면 보던 단계 그대로
      goTo(next === os ? stepIndex : 0);
    },
    [os, stepIndex, goTo],
  );

  const toggleDone = useCallback(
    (id: string) => {
      const next = new Set(done);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setDoneOverride(next);
    },
    [done],
  );

  const openLightbox = useCallback((s: { src: string; alt: string }) => setLightbox(s), []);

  /* 하이드레이션 전에는 자리만 잡는다 (SSR 출력과 동일) */
  if (!ready) {
    return <div className="min-h-[50vh]" aria-hidden="true" />;
  }

  /* ── A. OS 선택 화면 ── */
  if (!os || picking || !track || !step) {
    return (
      <div>
        <p className={cn(SECTION, "text-[15px] font-black leading-[1.6] mb-4")}>
          내 노트북은 어느 쪽인가요?
        </p>
        <div className="flex flex-col gap-3">
          {tracks.map((t) => (
            <button
              key={t.os}
              type="button"
              onClick={() => chooseOs(t.os)}
              className={cn(
                "w-full min-h-[120px] text-left border border-border bg-input-bg px-5 py-5",
                "hover:border-text transition-colors duration-200 cursor-pointer",
              )}
            >
              <span className={cn(SECTION, "block text-[18px] font-black leading-[1.4] mb-2")}>
                {t.label}
              </span>
              <span className={cn(SECTION, "block text-[13px] text-text-sub leading-[1.8]")}>
                {t.hint}
              </span>
            </button>
          ))}
        </div>
        <p className={cn(SECTION, "text-[12px] text-text-muted leading-[1.8] mt-6")}>
          막히면 손을 들어 주세요 · 문의 {SETUP_TEL}
        </p>
      </div>
    );
  }

  /* ── B. 위저드 화면 ── */
  const total = steps.length;
  const doneCount = steps.filter((s) => done.has(s.id)).length;
  const isDone = done.has(step.id);
  const isLast = stepIndex >= total - 1;

  return (
    <div>
      {/* 상단 고정 바 */}
      <div className="sticky top-0 z-30 bg-bg border-b border-border -mx-6 px-6 md:-mx-12 md:px-12">
        <div className="flex items-center justify-between gap-3 py-3">
          <button
            type="button"
            onClick={() => {
              setPicking(true);
              setTocOpen(false);
            }}
            className={cn(
              SECTION,
              "text-[13px] text-text-sub hover:text-text transition-colors duration-200 cursor-pointer",
              "min-h-[44px] flex items-center",
            )}
          >
            {OS_SHORT[track.os]} ▾ 바꾸기
          </button>

          <span className={cn(KARLA, "text-[13px] font-extrabold tabular-nums text-text")}>
            {stepIndex + 1} / {total}
          </span>

          <button
            type="button"
            onClick={() => setTocOpen((v) => !v)}
            aria-expanded={tocOpen}
            className={cn(
              SECTION,
              "text-[13px] border border-border px-3 min-h-[44px] cursor-pointer",
              "hover:border-text transition-colors duration-200",
              tocOpen ? "bg-text text-bg border-text" : "text-text-sub",
            )}
          >
            목차
          </button>
        </div>

        {/* 진행바 */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={doneCount}
          aria-label="완료한 단계"
          className="h-[3px] w-full bg-input-bg"
        >
          <div
            className="h-full bg-text transition-[width] duration-300"
            style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
          />
        </div>

        {/* 목차 시트 */}
        {tocOpen && (
          <div className="border-t border-border bg-bg py-2 max-h-[60vh] overflow-y-auto">
            <ul>
              {steps.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    className={cn(
                      "w-full text-left flex items-start gap-3 min-h-[44px] py-2 cursor-pointer",
                      "border-b border-border last:border-b-0",
                    )}
                  >
                    <span
                      className={cn(
                        KARLA,
                        "text-[11px] font-extrabold tabular-nums pt-[3px] shrink-0",
                        i === stepIndex ? "text-text" : "text-text-muted",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={cn(
                        SECTION,
                        "flex-1 text-[13px] leading-[1.6]",
                        i === stepIndex ? "text-text font-black" : "text-text-sub",
                      )}
                    >
                      {s.title}
                      <span className="block text-[11px] text-text-muted mt-[2px]">
                        {s.minutes}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-[13px] shrink-0 pt-[2px]",
                        done.has(s.id) ? "text-[#0B7A5A]" : "text-text-muted",
                      )}
                    >
                      {done.has(s.id) ? "✓" : "·"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 본문 — 한 단계만 */}
      <section className="pt-8 pb-[168px]">
        <p className={cn(KARLA, "text-[10px] font-extrabold tracking-[3px] uppercase text-text-sub mb-2")}>
          Step {stepIndex + 1}
        </p>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className={cn(SECTION, "text-[22px] font-black leading-[1.4] break-keep")}>{step.title}</h2>
          <span
            className={cn(
              SECTION,
              "shrink-0 border border-border px-2 py-[3px] text-[11px] text-text-sub whitespace-nowrap",
            )}
          >
            {step.minutes}
          </span>
        </div>
        <p className={cn(SECTION, "text-[14px] text-text-sub leading-[1.95] mb-8")}>{step.goal}</p>

        {step.shots.map((shot, i) => (
          <ShotView key={i} shot={shot} available={available} onOpen={openLightbox} />
        ))}

        {/* 성공 확인 */}
        <div className="border border-[#BFE3BF] bg-[#EEF7EE] px-4 py-4 mt-2">
          <p className={cn(SECTION, "text-[14px] font-black leading-[1.6] text-[#0A5C45] mb-3")}>
            이 화면이 보이면 성공
          </p>

          {step.success.img && available.has(step.success.img) && (
            <div className="border border-[#BFE3BF] bg-[#f3f1ec] mb-3">
              <button
                type="button"
                onClick={() =>
                  openLightbox({
                    src: step.success.img as string,
                    alt: step.success.alt ?? "성공 화면",
                  })
                }
                aria-label="성공 화면 크게 보기"
                className="block w-full p-0 cursor-zoom-in"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.success.img}
                  alt={step.success.alt ?? "성공 화면"}
                  loading="lazy"
                  className="block w-full max-w-full h-auto"
                />
              </button>
            </div>
          )}

          <p className={cn(SECTION, "text-[14px] leading-[1.9] text-[#0A5C45] mb-4")}>
            {step.success.text}
          </p>

          <button
            type="button"
            onClick={() => toggleDone(step.id)}
            aria-pressed={isDone}
            className={cn(
              SECTION,
              "w-full min-h-[48px] px-4 text-[14px] font-black cursor-pointer",
              "transition-colors duration-200",
              isDone
                ? "border border-[#0B7A5A] text-[#0B7A5A] bg-transparent"
                : "border border-[#0B7A5A] bg-[#0B7A5A] text-white",
            )}
          >
            {isDone ? "완료됨 · 취소" : "✓ 이 단계 완료"}
          </button>
        </div>

        {/* 트러블슈팅 */}
        {step.troubles.length > 0 && (
          <div className="mt-10">
            <p className={cn(SECTION, "text-[15px] font-black leading-[1.6] mb-3")}>
              이렇게 나오면?
            </p>
            {step.troubles.map((t, i) => (
              <TroubleItem key={i} trouble={t} />
            ))}
          </div>
        )}
      </section>

      {/* 하단 고정 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-bg border-t border-border">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
          <p className={cn(SECTION, "text-[11px] text-text-muted leading-[1.6] mb-2 text-center")}>
            막히면 손을 들어 주세요 · 문의 {SETUP_TEL}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goTo(Math.max(stepIndex - 1, 0))}
              disabled={stepIndex === 0}
              className={cn(
                SECTION,
                "flex-1 min-h-[48px] border border-border text-[14px] font-bold",
                "disabled:opacity-40 disabled:cursor-default",
                "enabled:cursor-pointer enabled:hover:border-text transition-colors duration-200",
              )}
            >
              ← 이전
            </button>

            {isLast ? (
              <a
                href={CURRICULUM_HREF}
                className={cn(
                  SECTION,
                  "flex-1 min-h-[48px] flex items-center justify-center text-center",
                  "bg-text text-bg text-[14px] font-black leading-[1.4] px-3",
                )}
              >
                실습 가이드로 돌아가기
              </a>
            ) : (
              <button
                type="button"
                onClick={() => goTo(Math.min(stepIndex + 1, total - 1))}
                className={cn(
                  SECTION,
                  "flex-1 min-h-[48px] bg-text text-bg text-[14px] font-black cursor-pointer",
                )}
              >
                다음 →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 라이트박스 */}
      <dialog
        ref={dialogRef}
        onClose={() => setLightbox(null)}
        onClick={() => setLightbox(null)}
        className={cn(
          "m-0 p-0 w-full max-w-full h-full max-h-full bg-transparent",
          "backdrop:bg-black/80",
        )}
      >
        {lightbox && (
          <div className="w-full h-full flex items-center justify-center p-4 cursor-zoom-out">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>
        )}
      </dialog>
    </div>
  );
}
