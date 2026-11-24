import { cookies } from "next/headers";
import { verifyAdmin, ADMIN_COOKIE } from "../../consent/admin/auth";
import AdminLogin from "../../consent/admin/AdminLogin";
import { listClass } from "@/lib/ainb-class-db";
import { CLASS_DATETIME, CLASS_SUBTITLE, CLASS_PLACE, CLASS_TITLE } from "@/lib/ainb-class-config";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const TH = "px-3 py-2 text-left font-[family-name:var(--font-noto)] text-[12px] font-black whitespace-nowrap";
const TD = "px-3 py-2 font-[family-name:var(--font-noto)] text-[13px] whitespace-nowrap";

const KST = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatPhone(p: string): string {
  if (p.length === 11) return `${p.slice(0, 3)}-${p.slice(3, 7)}-${p.slice(7)}`;
  if (p.length === 10) return `${p.slice(0, 3)}-${p.slice(3, 6)}-${p.slice(6)}`;
  return p;
}

export default async function ClassAdminPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifyAdmin(token)) return <AdminLogin />;

  const rows = await listClass();

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        <h1 className="font-[family-name:var(--font-noto)] text-[24px] font-black mb-1">
          {CLASS_TITLE} · 참가 신청 명단
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-8">
          {CLASS_SUBTITLE} · {CLASS_DATETIME} · {CLASS_PLACE}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <div className="border border-border px-4 py-3">
            <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub mb-1">총 신청</p>
            <p className="font-[family-name:var(--font-noto)] text-[20px] font-black">{rows.length}명</p>
          </div>
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
                  <th className={TH}>번호</th>
                  <th className={TH}>이름</th>
                  <th className={TH}>연락처</th>
                  <th className={TH}>신청 시각 (KST)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className={`${TD} text-text-sub`}>{i + 1}</td>
                    <td className={`${TD} font-bold`}>{r.name}</td>
                    <td className={TD}>{formatPhone(r.phone)}</td>
                    <td className={TD}>{KST.format(new Date(r.created_at))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
