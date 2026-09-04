import { cookies } from "next/headers";
import { verifyAdmin, ADMIN_COOKIE } from "../../consent/admin/auth";
import AdminLogin from "../../consent/admin/AdminLogin";
import { listSignups } from "@/lib/ainb-tour-db";
import { TOURS, PARTICIPANTS } from "@/lib/ainb-tour-config";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function fmt(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getMonth() + 1}/${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default async function TourAdminPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifyAdmin(token)) return <AdminLogin />;

  const rows = await listSignups();
  const byTour = new Map(TOURS.map((t) => [t.key, rows.filter((r) => r.tour_key === t.key)]));
  const doneNames = new Set(rows.map((r) => r.name));
  const pending = PARTICIPANTS.filter((r) => !doneNames.has(r.name));

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <h1 className="font-[family-name:var(--font-noto)] text-[24px] font-black mb-1">
          멘토투어 신청 현황
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-10">
          1기 · 신청 {rows.length}명 / 참가자 {PARTICIPANTS.length}명
        </p>

        <div className="space-y-8">
          {TOURS.map((t) => {
            const list = byTour.get(t.key) ?? [];
            return (
              <section key={t.key} className="border border-border">
                <div
                  className="px-5 py-4 border-b border-border flex items-baseline justify-between gap-4"
                  style={{ borderLeft: `4px solid ${t.accent}` }}
                >
                  <div>
                    <h2 className="font-[family-name:var(--font-noto)] text-[17px] font-black">
                      {t.title}
                    </h2>
                    <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub">
                      멘토 {t.mentor} · {t.belong}
                    </p>
                  </div>
                  <span
                    className="font-[family-name:var(--font-noto)] text-[14px] font-black shrink-0"
                    style={{ color: t.accent }}
                  >
                    {list.length} / {t.capacity}
                  </span>
                </div>
                {list.length === 0 ? (
                  <p className="px-5 py-4 font-[family-name:var(--font-noto)] text-[14px] text-text-sub">
                    아직 신청자가 없습니다.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {list.map((r) => (
                      <li
                        key={r.id}
                        className="px-5 py-3 flex items-center justify-between gap-4 font-[family-name:var(--font-noto)] text-[14px]"
                      >
                        <span className="font-bold">{r.name}</span>
                        <span className="text-text-sub text-[13px]">
                          {r.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")} · {fmt(r.created_at)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        <section className="mt-10 border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-[family-name:var(--font-noto)] text-[17px] font-black">
              미신청 {pending.length}명
            </h2>
          </div>
          <p className="px-5 py-4 font-[family-name:var(--font-noto)] text-[14px] leading-[2]">
            {pending.length === 0
              ? "전원 신청 완료했습니다."
              : pending.map((p) => p.name).join(" · ")}
          </p>
        </section>
      </div>
    </main>
  );
}
