import type { Metadata } from "next";
import { adminList, getAvailability, availabilityMap, type RegistrationRow } from "@/lib/festival-db";
import { EXPERIENCES, CAMPING, experienceLabel, onlineCapacity, nonSlotOnlineCap } from "@/lib/festival-experiences";
import { isAdmin, adminLogout, adminCancel, adminCancelCamping } from "./actions";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자 · 현남생활 페스티벌",
  robots: { index: false },
};

const STATUS: Record<string, { text: string; cls: string }> = {
  confirmed: { text: "확정", cls: "text-[#0B7A5A]" },
  waitlist: { text: "대기", cls: "text-[#b45309]" },
  cancelled: { text: "취소", cls: "text-text-muted line-through" },
};

interface Slot {
  label: string;
  availKey: string;
  capacity: number;
  onlineCap: number;
}

export default async function FestivalAdminPage() {
  if (!(await isAdmin())) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center p-6">
        <AdminLogin />
      </main>
    );
  }

  let regs: RegistrationRow[] = [];
  let avail: Record<string, { confirmed: number; waitlist: number }> = {};
  try {
    [regs, avail] = await Promise.all([
      adminList(),
      getAvailability().then(availabilityMap),
    ]);
  } catch (e) {
    console.error("[festival] admin data failed:", e);
  }

  const slots: Slot[] = [
    ...EXPERIENCES.flatMap((exp) =>
      exp.slots
        ? exp.slots.map((s) => ({ label: `${exp.label}·${s.label}`, availKey: `${exp.key}|${s.slot}`, capacity: s.capacity, onlineCap: onlineCapacity(s.capacity) }))
        : [{ label: exp.label, availKey: exp.key, capacity: exp.capacity ?? 0, onlineCap: nonSlotOnlineCap(exp) }],
    ),
    ...CAMPING.map((c) => ({ label: `캠핑 ${c.label}`, availKey: `camping_${c.key}`, capacity: c.capacity, onlineCap: c.capacity })),
  ];

  const totalRegs = regs.length;
  const totalPeople = regs.reduce((sum, r) => sum + r.participants.length, 0);

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-[family-name:var(--font-karla)] text-[12px] font-extrabold tracking-[2px] uppercase">
            현남생활 페스티벌 · 관리자
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/projects/hyeonnam-festival/admin/export"
              className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[1px] uppercase border border-text px-4 py-2 hover:bg-text hover:text-bg transition-colors"
            >
              CSV 다운로드
            </a>
            <form action={adminLogout}>
              <button className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[1px] uppercase text-text-muted hover:text-text">
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-[1300px] mx-auto px-6 py-10">
        {/* 현황 */}
        <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-1">항목별 현황</h2>
        <p className="text-[12px] text-text-muted font-[family-name:var(--font-noto)] mb-4">
          신청 {totalRegs}건 · 참가자 {totalPeople}명
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-10">
          {slots.map((s) => {
            const a = avail[s.availKey] ?? { confirmed: 0, waitlist: 0 };
            const isCamp = s.availKey.startsWith("camping_");
            const onlineCap = s.onlineCap;
            const onsite = s.capacity - s.onlineCap;
            const full = a.confirmed >= onlineCap;
            return (
              <div key={s.availKey} className="border border-border p-3 bg-bg-soft">
                <p className="font-[family-name:var(--font-noto)] text-[12px] font-semibold leading-tight mb-1">{s.label}</p>
                <p className="font-[family-name:var(--font-karla)] text-[13px] font-extrabold">
                  <span className={full ? "text-[#b45309]" : "text-[#0B7A5A]"}>{a.confirmed}</span>
                  <span className="text-text-muted">/{onlineCap}</span>
                  {a.waitlist > 0 && <span className="text-[#b45309] text-[11px]"> · 대기 {a.waitlist}</span>}
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[10px] text-text-muted mt-0.5">
                  {isCamp ? `온라인 100% (전체 ${s.capacity})` : `온라인 ${onlineCap} · 현장 ${onsite} (전체 ${s.capacity})`}
                </p>
              </div>
            );
          })}
        </div>

        {/* 명단 */}
        <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-4">신청 명단</h2>
        {regs.length === 0 ? (
          <p className="text-[14px] text-text-sub font-[family-name:var(--font-noto)]">접수된 신청이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {regs.map((r) => (
              <div key={r.id} className="border border-border bg-bg-soft p-4 text-[13px] font-[family-name:var(--font-noto)]">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <span className="font-black text-[15px]">{r.rep_name}</span>
                  <span className="text-text-muted">{r.phone}</span>
                  <span className="text-text-muted">{r.region}</span>
                  {r.camping && (
                    <span className="inline-flex items-center gap-1.5">
                      🏕 {r.camping === "deck" ? "데크" : "노지"}
                      {r.camping_status && (
                        <span className={STATUS[r.camping_status]?.cls}> ({STATUS[r.camping_status]?.text})</span>
                      )}
                      {r.tent_rental && <span className="text-[#b45309]"> · ⛺ 텐트대여</span>}
                      {r.camping_status !== "cancelled" && (
                        <form action={adminCancelCamping}>
                          <input type="hidden" name="reg_id" value={r.id} />
                          <button className="text-[11px] text-text-muted hover:text-[#b45309] underline shrink-0">
                            캠핑취소
                          </button>
                        </form>
                      )}
                    </span>
                  )}
                  <span className="text-text-muted text-[11px] ml-auto">
                    {new Date(r.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                  </span>
                </div>
                {r.note && <p className="text-[12px] text-text-muted mb-2 whitespace-pre-wrap">비고: {r.note}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                  {r.participants.map((p) => (
                    <div key={p.id} className="border-t border-border/60 pt-1.5">
                      <span className="font-semibold">
                        {p.name} <span className="text-text-muted font-normal">만 {p.age}세</span>
                      </span>
                      {p.signups.length > 0 && (
                        <ul className="mt-1 space-y-1">
                          {p.signups.map((s) => (
                            <li key={s.id} className="flex items-center justify-between gap-2">
                              <span>
                                {experienceLabel(s.experience_key, s.time_slot)}{" "}
                                <span className={`text-[11px] font-bold ${STATUS[s.status]?.cls}`}>
                                  {STATUS[s.status]?.text}
                                </span>
                              </span>
                              {s.status !== "cancelled" && (
                                <form action={adminCancel}>
                                  <input type="hidden" name="signup_id" value={s.id} />
                                  <button className="text-[11px] text-text-muted hover:text-[#b45309] underline shrink-0">
                                    취소
                                  </button>
                                </form>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
