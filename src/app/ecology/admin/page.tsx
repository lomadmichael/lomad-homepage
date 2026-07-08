import type { Metadata } from "next";
import { cookies } from "next/headers";
import { adminList, getSessionStates, type EcologyRegistrationRow } from "@/lib/ecology-db";
import { SESSIONS, CAPACITY, sessionLabel } from "@/lib/ecology-config";
import { verifyAdmin, ADMIN_COOKIE } from "./auth";
import { adminLogout, setSessionOpenAction } from "./actions";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "생태체험 관리자 | LOMAD", robots: { index: false } };

export default async function EcologyAdminPage() {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) {
    return (
      <main className="min-h-screen bg-bg px-6">
        <AdminLogin />
      </main>
    );
  }

  let rows: EcologyRegistrationRow[] = [];
  let states: Record<string, boolean> = {};
  try {
    rows = await adminList();
    states = await getSessionStates();
  } catch (e) {
    console.error("[ecology] admin list failed:", e);
  }

  const bySession = (key: string) => rows.filter((r) => r.session_key === key);
  const partCount = (rs: EcologyRegistrationRow[], status: string) =>
    rs.filter((r) => r.status === status).reduce((n, r) => n + r.participants.length, 0);

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-[family-name:var(--font-noto)] text-[15px] font-black">
            생태체험 접수 관리
          </span>
          <div className="flex items-center gap-4">
            <a href="/ecology/admin/export" className="text-[12px] underline">
              CSV 내보내기
            </a>
            <form action={adminLogout}>
              <button className="text-[12px] text-text-muted underline">로그아웃</button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-10 space-y-10">
        {SESSIONS.map((s) => {
          const rs = bySession(s.key);
          const conf = partCount(rs, "confirmed");
          const wait = partCount(rs, "waitlist");
          const isOpen = states[s.key] !== false;
          return (
            <section key={s.key}>
              <div className="flex items-center flex-wrap gap-3 mb-1">
                <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black">
                  {sessionLabel(s.key)}
                </h2>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${isOpen ? "text-[#0B7A5A] bg-[#0B7A5A]/10" : "text-[#b45309] bg-[#b45309]/10"}`}
                >
                  {isOpen ? "접수중" : "마감"}
                </span>
                <form action={setSessionOpenAction}>
                  <input type="hidden" name="session_key" value={s.key} />
                  <input type="hidden" name="open" value={isOpen ? "false" : "true"} />
                  <button className="text-[11px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text px-2.5 py-1 hover:bg-text hover:text-bg transition-colors">
                    {isOpen ? "마감하기" : "다시 열기"}
                  </button>
                </form>
              </div>
              <p className="text-[12px] text-text-sub mb-3">
                확정 {conf}/{CAPACITY}명 · 대기 {wait}명 · 신청 {rs.length}건
              </p>
              {rs.length === 0 ? (
                <p className="text-[13px] text-text-muted">신청 없음</p>
              ) : (
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="text-left text-text-muted border-b border-border">
                      <th className="py-2 pr-3">상태</th>
                      <th className="py-2 pr-3">신청자</th>
                      <th className="py-2 pr-3">연락처</th>
                      <th className="py-2 pr-3">참가자</th>
                      <th className="py-2">건강/비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rs.map((r) => (
                      <tr key={r.id} className="border-b border-border/50 align-top">
                        <td className="py-2 pr-3">{r.status === "confirmed" ? "확정" : "대기"}</td>
                        <td className="py-2 pr-3">{r.guardian_name}</td>
                        <td className="py-2 pr-3">{r.phone}</td>
                        <td className="py-2 pr-3">
                          {r.participants.map((c) => `${c.name}(${c.age})`).join(", ")}
                        </td>
                        <td className="py-2 text-text-sub">
                          {[r.health_note, r.note].filter(Boolean).join(" / ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
