import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  adminList,
  getBooked,
  getSessionStates,
  effectiveCapacity,
  sessionView,
  serverNow,
  type FestecoRegistrationRow,
  type FestecoSessionState,
} from "@/lib/festeco-db";
import { SESSIONS, CLOSED_LABEL } from "@/lib/festeco-config";
import { verifyAdmin, ADMIN_COOKIE } from "./auth";
import { adminLogout, setSessionOpenAction, setCapacityAction } from "./actions";
import AdminLogin from "./AdminLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "축제 생태탐방 관리자 | LOMAD" },
  robots: { index: false },
};

export default async function FestecoAdminPage() {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) {
    return (
      <main className="min-h-screen bg-bg px-6">
        <AdminLogin />
      </main>
    );
  }

  let rows: FestecoRegistrationRow[] = [];
  let booked: Record<string, number> = {};
  let states: Record<string, FestecoSessionState> = {};
  try {
    [rows, booked, states] = await Promise.all([adminList(), getBooked(), getSessionStates()]);
  } catch (e) {
    console.error("[festeco] admin list failed:", e);
  }
  const now = serverNow();

  const confirmedRows = rows.filter((r) => r.status === "confirmed");
  const totalPeople = confirmedRows.reduce((n, r) => n + Number(r.total), 0);

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-[family-name:var(--font-noto)] text-[15px] font-black">
            송이연어축제 생태탐방 접수 관리
          </span>
          <div className="flex items-center gap-4">
            <a href="/ecology/festival/admin/export" className="text-[12px] underline">
              CSV 내보내기
            </a>
            <form action={adminLogout}>
              <button className="text-[12px] text-text-muted underline">로그아웃</button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 py-10 space-y-10">
        <p className="text-[13px] text-text-sub">
          전체 확정 {confirmedRows.length}건 · {totalPeople}명 (사전예약 기준, 현장접수 별도)
        </p>

        {SESSIONS.map((s) => {
          const rs = rows.filter((r) => r.session_key === s.key);
          const conf = rs.filter((r) => r.status === "confirmed");
          const adultsSum = conf.reduce((n, r) => n + Number(r.adults), 0);
          const childrenSum = conf.reduce((n, r) => n + Number(r.children), 0);
          const st = states[s.key];
          const adminOpen = st?.is_open !== false;
          const cap = effectiveCapacity(st);
          const view = sessionView(s.key, booked, states, now);
          const timeClosed = now >= new Date(s.closesAt).getTime();
          return (
            <section key={s.key}>
              <div className="flex items-center flex-wrap gap-3 mb-1">
                <h2 className="font-[family-name:var(--font-noto)] text-[16px] font-black">
                  {s.round} · {s.label}
                </h2>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${view.closed ? "text-[#b45309] bg-[#b45309]/10" : "text-[#0B7A5A] bg-[#0B7A5A]/10"}`}
                >
                  {view.closed ? "마감" : "접수중"}
                </span>
                <form action={setSessionOpenAction}>
                  <input type="hidden" name="session_key" value={s.key} />
                  <input type="hidden" name="open" value={adminOpen ? "false" : "true"} />
                  <button className="text-[11px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text px-2.5 py-1 hover:bg-text hover:text-bg transition-colors">
                    {adminOpen ? "마감하기" : "다시 열기"}
                  </button>
                </form>
                <form action={setCapacityAction} className="flex items-center gap-1.5">
                  <input type="hidden" name="session_key" value={s.key} />
                  <label className="text-[11px] text-text-muted">사전예약 정원</label>
                  <input
                    type="number"
                    name="capacity"
                    defaultValue={cap}
                    min={0}
                    max={999}
                    className="w-14 h-7 px-2 text-[12px] border border-border bg-input-bg outline-none focus:border-text"
                  />
                  <button className="text-[11px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text px-2 py-1 hover:bg-text hover:text-bg transition-colors">
                    저장
                  </button>
                </form>
              </div>
              <p className="text-[12px] text-text-sub mb-1">
                확정 {booked[s.key] ?? 0}/{cap}명 (성인 {adultsSum} · 어린이 {childrenSum}) · 잔여{" "}
                {view.remaining}석 · 확정 {conf.length}건 · 취소 {rs.length - conf.length}건
              </p>
              <p className="text-[11px] text-text-muted mb-3">
                {timeClosed
                  ? `시간 마감됨 (${CLOSED_LABEL})`
                  : `자동 마감: ${new Date(s.closesAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`}
                {!adminOpen && " · 관리자 마감"}
              </p>
              {rs.length === 0 ? (
                <p className="text-[13px] text-text-muted">신청 없음</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px] border-collapse min-w-[560px]">
                    <thead>
                      <tr className="text-left text-text-muted border-b border-border">
                        <th className="py-2 pr-3">상태</th>
                        <th className="py-2 pr-3">신청자</th>
                        <th className="py-2 pr-3">연락처</th>
                        <th className="py-2 pr-3">성인</th>
                        <th className="py-2 pr-3">어린이</th>
                        <th className="py-2 pr-3">총</th>
                        <th className="py-2">신청일시</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rs.map((r) => (
                        <tr
                          key={r.id}
                          className={`border-b border-border/50 align-top ${r.status === "cancelled" ? "text-text-muted line-through" : ""}`}
                        >
                          <td className="py-2 pr-3 no-underline">
                            {r.status === "confirmed" ? "확정" : "취소"}
                          </td>
                          <td className="py-2 pr-3">{r.guardian_name}</td>
                          <td className="py-2 pr-3">{r.phone}</td>
                          <td className="py-2 pr-3">{r.adults}</td>
                          <td className="py-2 pr-3">{r.children}</td>
                          <td className="py-2 pr-3 font-bold">{r.total}</td>
                          <td className="py-2 text-text-sub">
                            {new Date(r.created_at).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
