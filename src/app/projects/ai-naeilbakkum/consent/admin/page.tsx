import type { Metadata } from "next";
import { cookies } from "next/headers";
import { listConsents, decryptRrn, type ConsentRow } from "@/lib/ainb-consent-db";
import { verifyAdmin, ADMIN_COOKIE } from "./auth";
import { adminLogout } from "./actions";
import AdminLogin from "./AdminLogin";
import PurgeBox from "./PurgeBox";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Ai 내일바꿈 동의서 관리자 | LOMAD",
  robots: { index: false, follow: false },
};

function fmt(ts: string): string {
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes(),
  ).padStart(2, "0")}`;
}

function phoneFmt(p: string): string {
  return p.length === 11 ? `${p.slice(0, 3)}-${p.slice(3, 7)}-${p.slice(7)}` : p;
}

function rrnFmt(row: ConsentRow): string {
  if (row.rrn_purged_at) return "파기됨";
  if (!row.rrn_enc) return "—";
  const v = decryptRrn(row.rrn_enc);
  return v.length === 13 ? `${v.slice(0, 6)}-${v.slice(6)}` : v;
}

const TH = "px-3 py-2 text-left font-bold whitespace-nowrap";
const TD = "px-3 py-2 align-top border-t border-border";

export default async function ConsentAdminPage() {
  const store = await cookies();
  if (!verifyAdmin(store.get(ADMIN_COOKIE)?.value)) {
    return (
      <main className="min-h-screen bg-bg px-6">
        <AdminLogin />
      </main>
    );
  }

  let rows: ConsentRow[] = [];
  let loadError = "";
  try {
    rows = await listConsents();
  } catch (e) {
    loadError = e instanceof Error ? e.message : String(e);
    console.error("[ainb-consent] admin list failed:", e);
  }

  const remaining = rows.filter((r) => r.rrn_enc && !r.rrn_purged_at).length;
  const byCohort = (c: string) => rows.filter((r) => r.cohort === c);

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="font-[family-name:var(--font-noto)] text-[16px] font-black">
            Ai 내일바꿈 참가 동의서
            <span className="ml-3 text-[13px] font-normal text-text-sub">
              1기 {byCohort("1기").length}건 · 2기 {byCohort("2기").length}건 · 합계 {rows.length}건
            </span>
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/projects/ai-naeilbakkum/consent/admin/export"
              className="text-[13px] underline font-[family-name:var(--font-noto)]"
            >
              CSV 내보내기
            </a>
            <form action={adminLogout}>
              <button className="text-[13px] underline font-[family-name:var(--font-noto)] text-text-sub">
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {loadError && (
          <p className="border border-[#C0392B] bg-[#FBD5D0] px-4 py-3 text-[13px]">
            목록을 불러오지 못했습니다: {loadError}
          </p>
        )}

        <PurgeBox remaining={remaining} />

        {["1기", "2기"].map((c) => {
          const list = byCohort(c);
          if (!list.length) return null;
          return (
            <section key={c}>
              <h2 className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
                {c} <span className="text-text-sub font-normal">({list.length}건)</span>
              </h2>
              <div className="overflow-x-auto border border-border">
                <table className="w-full text-[13px] font-[family-name:var(--font-noto)] border-collapse">
                  <thead className="bg-bg-soft">
                    <tr>
                      <th className={TH}>제출</th>
                      <th className={TH}>성명</th>
                      <th className={TH}>연락처</th>
                      <th className={TH}>보험 이름</th>
                      <th className={TH}>주민등록번호</th>
                      <th className={TH}>주소</th>
                      <th className={TH}>환불 계좌</th>
                      <th className={TH}>동의</th>
                      <th className={TH}>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((r) => {
                      const all =
                        r.consent_privacy &&
                        r.consent_program &&
                        r.consent_insurance &&
                        r.consent_media &&
                        r.consent_refund &&
                        r.consent_selfrisk &&
                        r.consent_rules;
                      return (
                        <tr key={r.id}>
                          <td className={TD + " whitespace-nowrap text-text-sub"}>
                            {fmt(r.created_at)}
                          </td>
                          <td className={TD + " font-bold whitespace-nowrap"}>{r.name}</td>
                          <td className={TD + " whitespace-nowrap"}>{phoneFmt(r.phone)}</td>
                          <td className={TD + " whitespace-nowrap"}>{r.insured_name}</td>
                          <td
                            className={
                              TD +
                              " whitespace-nowrap font-mono " +
                              (r.rrn_purged_at ? "text-text-sub" : "")
                            }
                          >
                            {rrnFmt(r)}
                          </td>
                          <td className={TD + " min-w-[220px]"}>{r.address}</td>
                          <td className={TD + " min-w-[180px]"}>{r.refund_account}</td>
                          <td className={TD + " whitespace-nowrap"}>
                            {all ? (
                              <span className="text-[#0B7A5A] font-bold">전체 동의</span>
                            ) : (
                              <span className="text-[#C0392B] font-bold">일부 누락</span>
                            )}
                          </td>
                          <td className={TD + " min-w-[160px] text-text-sub"}>{r.note ?? ""}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {!rows.length && !loadError && (
          <p className="text-[14px] text-text-sub font-[family-name:var(--font-noto)]">
            아직 제출된 동의서가 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}
