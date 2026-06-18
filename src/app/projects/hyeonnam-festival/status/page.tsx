import type { Metadata } from "next";
import Link from "next/link";
import { getAvailability, availabilityMap } from "@/lib/festival-db";
import { EXPERIENCES, CAMPING, onlineCapacity } from "@/lib/festival-experiences";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "접수 현황 · 현남생활 페스티벌 | LOMAD",
  description: "현남생활 페스티벌 체험·캠핑 실시간 잔여/마감 현황.",
  alternates: { canonical: "/projects/hyeonnam-festival/status" },
};

interface Slot {
  label: string;
  availKey: string;
  capacity: number;
  location: string;
}

export default async function FestivalStatusPage() {
  let avail: Record<string, { confirmed: number; waitlist: number }> = {};
  try {
    avail = availabilityMap(await getAvailability());
  } catch (e) {
    console.error("[festival] status availability failed:", e);
  }

  // 체험 → 표시 슬롯
  const expSlots: Slot[] = EXPERIENCES.flatMap((exp) =>
    exp.slots
      ? exp.slots.map((s) => ({
          label: `${exp.label} · ${s.label}`,
          availKey: `${exp.key}|${s.slot}`,
          capacity: s.capacity,
          location: exp.location,
        }))
      : [{ label: exp.label, availKey: exp.key, capacity: exp.capacity ?? 0, location: exp.location }],
  );

  const campSlots: Slot[] = CAMPING.map((c) => ({
    label: `캠핑 ${c.label} (${c.fee})`,
    availKey: `camping_${c.key}`,
    capacity: c.capacity,
    location: "북분리",
  }));

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/hyeonnam-festival"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            현남생활 페스티벌
          </Link>
          <Link
            href="/projects/hyeonnam-festival/register"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase border border-text px-4 py-2 hover:bg-text hover:text-bg transition-colors"
          >
            참가 신청 →
          </Link>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-[60px]">
        <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-3">
          Live Status
        </p>
        <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[40px] font-black mb-3 leading-tight">
          접수 현황
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[13px] md:text-[14px] text-text-sub mb-10">
          체험·캠핑별 실시간 잔여 자리입니다(온라인 사전접수 = 전체 정원의 70%, 나머지 30%는 현장 접수). 마감된 항목도 대기 신청이 가능하며, 취소가 생기면 순서대로 자동 확정됩니다.
        </p>

        <StatusGrid title="체험 프로그램" slots={expSlots} avail={avail} />
        <div className="h-10" />
        <StatusGrid title="캠핑 사이트" slots={campSlots} avail={avail} />
      </div>
    </main>
  );
}

function StatusGrid({
  title,
  slots,
  avail,
}: {
  title: string;
  slots: Slot[];
  avail: Record<string, { confirmed: number; waitlist: number }>;
}) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {slots.map((s) => {
          const a = avail[s.availKey] ?? { confirmed: 0, waitlist: 0 };
          const cap = onlineCapacity(s.capacity); // 온라인 사전접수 정원(70%)
          const rem = Math.max(0, cap - a.confirmed);
          const full = rem <= 0;
          const pct = cap > 0 ? Math.min(100, Math.round((a.confirmed / cap) * 100)) : 0;
          return (
            <div key={s.availKey} className="border border-border p-4 bg-bg-soft">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-[family-name:var(--font-noto)] text-[14px] font-semibold">
                  {s.label}
                  <span className="text-text-muted font-normal"> · {s.location}</span>
                </span>
                <span
                  className={`font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[1px] ${
                    full ? "text-[#b45309]" : "text-[#0B7A5A]"
                  }`}
                >
                  {full ? `마감 (대기 ${a.waitlist})` : `잔여 ${rem}/${cap}`}
                </span>
              </div>
              <div className="h-1.5 bg-border/60 overflow-hidden rounded-full">
                <div
                  className={`h-full ${full ? "bg-[#b45309]" : "bg-[#0B7A5A]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
