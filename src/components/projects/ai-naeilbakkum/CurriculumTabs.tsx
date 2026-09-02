"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import CopyButton from "@/components/ui/CopyButton";
import { PLACE_COLOR, type Block, type Day, type Step } from "@/lib/ainb-curriculum";

type Os = "windows" | "mac";

const SECTION = "font-[family-name:var(--font-noto)]";
const KARLA = "font-[family-name:var(--font-karla)]";

/** 연속된 command 블록을 하나의 그룹으로 묶는다 */
type Group =
  | { kind: "commands"; items: Extract<Block, { kind: "command" }>[] }
  | { kind: "single"; block: Exclude<Block, { kind: "command" }> };

function groupBlocks(blocks: Block[]): Group[] {
  const out: Group[] = [];
  for (const block of blocks) {
    if (block.kind === "command") {
      const last = out[out.length - 1];
      if (last && last.kind === "commands") {
        last.items.push(block);
      } else {
        out.push({ kind: "commands", items: [block] });
      }
    } else {
      out.push({ kind: "single", block });
    }
  }
  return out;
}

const OS_LABEL: Record<Os, string> = { windows: "Windows", mac: "Mac" };

/* ───────────────────────── 블록 렌더러 ───────────────────────── */

function CommandGroup({
  items,
  os,
  onOsChange,
}: {
  items: Extract<Block, { kind: "command" }>[];
  os: Os;
  onOsChange: (os: Os) => void;
}) {
  const available = Array.from(new Set(items.map((i) => i.os))) as Os[];
  const chosen = items.find((i) => i.os === os) ?? items[0];

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex border border-border">
          {available.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onOsChange(value)}
              aria-pressed={chosen.os === value}
              className={cn(
                KARLA,
                "text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 cursor-pointer transition-colors duration-200",
                chosen.os === value
                  ? "bg-text text-bg"
                  : "text-text-sub hover:text-text",
              )}
            >
              {OS_LABEL[value]}
            </button>
          ))}
        </div>
        <CopyButton text={chosen.code} variant="light" label="명령 복사" />
      </div>

      <div className="bg-[#1e2530] border border-[#1e2530]">
        <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-[1.7] text-[#E6EBF2]">
          <code className="font-mono whitespace-pre">{chosen.code}</code>
        </pre>
      </div>

      {chosen.note && (
        <p className={cn(SECTION, "text-[12px] text-text-sub leading-[1.8] mt-2")}>
          {chosen.note}
        </p>
      )}
    </div>
  );
}

function PromptBlock({ block }: { block: Extract<Block, { kind: "prompt" }> }) {
  return (
    <div className="mb-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className={cn(SECTION, "text-[14px] font-black leading-[1.6]")}>{block.title}</p>
        <CopyButton text={block.text} variant="light" />
      </div>
      <div className="border border-border bg-input-bg px-4 py-4">
        <p className={cn(SECTION, "text-[14px] leading-[1.9] whitespace-pre-wrap")}>
          {block.text}
        </p>
      </div>
      {block.tip && (
        <p className={cn(SECTION, "text-[12px] text-text-sub leading-[1.8] mt-2")}>
          💡 {block.tip}
        </p>
      )}
    </div>
  );
}

function BlockView({
  block,
}: {
  block: Exclude<Block, { kind: "command" }>;
}) {
  switch (block.kind) {
    case "text":
      return (
        <p className={cn(SECTION, "text-[14px] leading-[1.95] text-text-sub mb-5")}>
          {block.body}
        </p>
      );

    case "prompt":
      return <PromptBlock block={block} />;

    case "link":
      return (
        <div className="mb-5">
          <a
            href={block.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              SECTION,
              "inline-block border border-text text-text text-[13px] font-bold px-5 py-2.5",
              "hover:bg-text hover:text-bg transition-colors duration-200",
            )}
          >
            {block.label} ↗
          </a>
          {block.note && (
            <p className={cn(SECTION, "text-[12px] text-text-sub leading-[1.8] mt-2")}>
              {block.note}
            </p>
          )}
        </div>
      );

    case "check":
      return (
        <div className="flex gap-3 items-start border border-[#B6DCCB] bg-[#E6F4EE] px-4 py-3 mb-5">
          <span
            aria-hidden="true"
            className="mt-[2px] h-[18px] w-[18px] shrink-0 rounded-full bg-[#0B7A5A] text-white text-[11px] font-bold flex items-center justify-center leading-none"
          >
            ✓
          </span>
          <p className={cn(SECTION, "text-[13px] font-bold leading-[1.7] text-[#0A5C45]")}>
            확인: {block.text}
          </p>
        </div>
      );

    case "warn":
      return (
        <div className="border-2 border-[#E8611C] bg-[#FDEBD9] px-4 py-3 mb-5">
          <p className={cn(SECTION, "text-[13px] leading-[1.8] text-[#A8410F]")}>
            {block.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

/* ───────────────────────── 스텝 카드 ───────────────────────── */

function StepCard({
  step,
  index,
  os,
  onOsChange,
}: {
  step: Step;
  index: number;
  os: Os;
  onOsChange: (os: Os) => void;
}) {
  const groups = groupBlocks(step.blocks);

  return (
    <article className="border border-border px-5 py-6 md:px-7 md:py-7">
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <div>
          <p className={cn(KARLA, "text-[10px] font-extrabold tracking-[3px] uppercase text-text-sub mb-1.5")}>
            Step {index + 1}
          </p>
          <h3 className={cn(SECTION, "text-[18px] md:text-[20px] font-black leading-[1.4]")}>
            {step.title}
          </h3>
        </div>
        {step.minutes && (
          <span className={cn(SECTION, "text-[12px] text-text-sub shrink-0 tabular-nums")}>
            {step.minutes}
          </span>
        )}
      </div>

      <div className="[&>*:last-child]:mb-0">
        {groups.map((group, i) =>
          group.kind === "commands" ? (
            <CommandGroup key={i} items={group.items} os={os} onOsChange={onOsChange} />
          ) : (
            <BlockView key={i} block={group.block} />
          ),
        )}
      </div>
    </article>
  );
}

/* ───────────────────────── 메인 ───────────────────────── */

/* ── 브라우저 상태 구독 (useEffect + setState 없이 읽기) ── */

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const readHash = () => window.location.hash.replace("#", "");
const serverHash = () => "";

/** navigator.platform 은 deprecated — userAgent 로 판별 */
const subscribeNever = () => () => {};
const readOs = (): Os => (/Mac/i.test(navigator.userAgent) ? "mac" : "windows");
const serverOs = (): Os => "windows";

export default function CurriculumTabs({ days }: { days: Day[] }) {
  // URL 해시 → 초기 탭. 탭 클릭 시에는 override 가 우선한다.
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const [tabOverride, setTabOverride] = useState<Day["id"] | null>(null);

  // 운영체제 자동 감지 + 사용자가 고르면 override (컴포넌트 전체 공유)
  const detectedOs = useSyncExternalStore(subscribeNever, readOs, serverOs);
  const [osOverride, setOsOverride] = useState<Os | null>(null);
  const os = osOverride ?? detectedOs;

  const fallbackId = days[0]?.id ?? "day1";
  const hashId = days.some((d) => d.id === hash) ? (hash as Day["id"]) : null;
  const activeId = tabOverride ?? hashId ?? fallbackId;

  const handleTab = useCallback((id: Day["id"]) => {
    setTabOverride(id);
    // 스크롤 점프 없이 해시만 갱신
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${id}`,
    );
  }, []);

  const day = days.find((d) => d.id === activeId) ?? days[0];
  if (!day) return null;

  const placeColor = PLACE_COLOR[day.place] ?? "#6b6558";

  return (
    <div>
      {/* 탭 */}
      <nav className="border-b border-border overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 mb-8">
        <div className="flex gap-6 md:gap-8 min-w-max">
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => handleTab(d.id)}
              aria-current={d.id === activeId ? "true" : undefined}
              className={cn(
                "text-left pb-3 cursor-pointer transition-colors duration-200 border-b-2",
                d.id === activeId ? "border-text" : "border-transparent",
              )}
            >
              <span
                className={cn(
                  SECTION,
                  "block text-[15px] font-black leading-tight",
                  d.id === activeId ? "text-text" : "text-text-muted",
                )}
              >
                {d.label}
              </span>
              <span
                className={cn(
                  SECTION,
                  "block text-[11px] mt-1 leading-[1.35] max-w-[130px] md:max-w-[150px]",
                  d.id === activeId ? "text-text-sub" : "text-text-muted",
                )}
              >
                {d.theme}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* 선택된 Day 헤더 */}
      <header className="mb-8">
        <div className="flex items-baseline gap-3 flex-wrap mb-3">
          <h2 className={cn(SECTION, "text-[24px] md:text-[28px] font-black")}>{day.label}</h2>
          <span className={cn(SECTION, "text-[14px] text-text-sub")}>{day.date}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className={cn(
              SECTION,
              "inline-block border border-border px-3 py-[3px] text-[12px] text-text-sub tabular-nums",
            )}
          >
            {day.time}
          </span>
          <span
            className="inline-block rounded-full px-3 py-[3px] text-[11px] font-bold text-white whitespace-nowrap"
            style={{ backgroundColor: placeColor }}
          >
            {day.place}
          </span>
        </div>
        <p className={cn(SECTION, "text-[16px] md:text-[18px] font-black leading-[1.5] mb-3")}>
          {day.theme}
        </p>
        <p className={cn(SECTION, "text-[14px] leading-[1.95] text-text-sub")}>{day.intro}</p>
      </header>

      {/* STEP 카드 */}
      <div className="space-y-8">
        {day.steps.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} os={os} onOsChange={setOsOverride} />
        ))}
      </div>
    </div>
  );
}
