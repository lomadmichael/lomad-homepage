import { cookies } from "next/headers";
import { verifyAdmin, ADMIN_COOKIE } from "../../consent/admin/auth";
import AdminLogin from "../../consent/admin/AdminLogin";
import { listSurf, EXPERIENCE_LABEL, GEAR_LABEL } from "@/lib/ainb-surf-db";
import { ROSTER } from "@/lib/ainb-tour-config";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const TH = "px-3 py-2 text-left font-[family-name:var(--font-noto)] text-[12px] font-black whitespace-nowrap";
const TD = "px-3 py-2 font-[family-name:var(--font-noto)] text-[13px] whitespace-nowrap";

export default async function SurfAdminPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifyAdmin(token)) return <AdminLogin />;

  const rows = await listSurf();
  const done = new Set(rows.map((r) => r.name));
  const pending = ROSTER.filter((r) => !done.has(r.name));

  const suit = rows.filter((r) => r.gear === "suit");
  const rash = rows.filter((r) => r.gear === "rashguard");
  const byExp = {
    none: rows.filter((r) => r.experience === "none").length,
    beginner: rows.filter((r) => r.experience === "beginner").length,
    experienced: rows.filter((r) => r.experience === "experienced").length,
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <h1 className="font-[family-name:var(--font-noto)] text-[24px] font-black mb-1">
          서핑 참가 신청 현황
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-8">
          1기 · 신청 {rows.length}명 / 참가자 {ROSTER.length}명
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            ["슈트 필요", `${suit.length}명`],
            ["래쉬가드", `${rash.length}명`],
            ["경험 없음", `${byExp.none}명`],
            ["경험 있음", `${byExp.beginner + byExp.experienced}명`],
          ].map(([k, v]) => (
            <div key={k} className="border border-border px-4 py-3">
              <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub mb-1">{k}</p>
              <p className="font-[family-name:var(--font-noto)] text-[20px] font-black">{v}</p>
            </div>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub">
            아직 신청자가 없습니다.
          </p>
        ) : (
          <div className="overflow-x-auto border border-border">
            <table className="w-full border-collapse">
              <thead className="border-b border-border bg-[#00000008]">
                <tr>
                  <th className={TH}>성명</th>
                  <th className={TH}>성별</th>
                  <th className={TH}>키</th>
                  <th className={TH}>몸무게</th>
                  <th className={TH}>서핑 경험</th>
                  <th className={TH}>장비</th>
                  <th className={TH}>비고</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className={`${TD} font-bold`}>{r.name}</td>
                    <td className={TD}>{r.gender}</td>
                    <td className={TD}>{r.height_cm}cm</td>
                    <td className={TD}>{r.weight_kg}kg</td>
                    <td className={TD}>{EXPERIENCE_LABEL[r.experience]}</td>
                    <td className={`${TD} ${r.gear === "suit" ? "font-bold" : "text-text-sub"}`}>
                      {GEAR_LABEL[r.gear]}
                    </td>
                    <td className={`${TD} whitespace-normal text-text-sub`}>{r.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <section className="mt-10 border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-[family-name:var(--font-noto)] text-[17px] font-black">
              미신청 {pending.length}명
            </h2>
          </div>
          <p className="px-5 py-4 font-[family-name:var(--font-noto)] text-[14px] leading-[2]">
            {pending.length === 0 ? "전원 신청 완료했습니다." : pending.map((p) => p.name).join(" · ")}
          </p>
        </section>
      </div>
    </main>
  );
}
