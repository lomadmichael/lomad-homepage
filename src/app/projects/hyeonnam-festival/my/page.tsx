import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { lookupByPhone, type RegistrationRow } from "@/lib/festival-db";
import { verifySession } from "@/lib/festival-otp";
import { experienceLabel } from "@/lib/festival-experiences";
import OtpGate from "./OtpGate";
import { cancelMySignup, logoutMy } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "내 신청 조회 · 현남생활 페스티벌 | LOMAD",
  robots: { index: false },
  alternates: { canonical: "/projects/hyeonnam-festival/my" },
};

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  confirmed: { text: "확정", cls: "text-[#0B7A5A]" },
  waitlist: { text: "대기", cls: "text-[#b45309]" },
};

export default async function FestivalMyPage() {
  const store = await cookies();
  const phone = verifySession(store.get("festival_my")?.value);

  let regs: RegistrationRow[] = [];
  if (phone) {
    try {
      regs = await lookupByPhone(phone);
    } catch (e) {
      console.error("[festival] my lookup failed:", e);
    }
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/hyeonnam-festival"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            현남생활 페스티벌
          </Link>
          {phone && (
            <form action={logoutMy}>
              <button className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text">
                로그아웃
              </button>
            </form>
          )}
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-[60px]">
        {!phone ? (
          <OtpGate />
        ) : (
          <div>
            <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-3">
              My Registration
            </p>
            <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-8 leading-tight">
              내 신청 내역
            </h1>

            {regs.length === 0 ? (
              <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub">
                이 연락처로 접수된 신청이 없습니다.{" "}
                <Link href="/projects/hyeonnam-festival/register" className="underline">
                  참가 신청하기
                </Link>
              </p>
            ) : (
              <div className="space-y-8">
                {regs.map((r) => (
                  <div key={r.id} className="border border-border bg-bg-soft p-5 md:p-7">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4 pb-4 border-b border-border">
                      <span className="font-[family-name:var(--font-noto)] text-[16px] font-black">{r.rep_name}</span>
                      <span className="text-[12px] text-text-muted font-[family-name:var(--font-noto)]">{r.region}</span>
                      {r.camping && (
                        <span className="text-[12px] font-[family-name:var(--font-noto)]">
                          캠핑 {r.camping === "deck" ? "데크" : "노지"}
                          {r.camping_status && (
                            <span className={STATUS_LABEL[r.camping_status]?.cls ?? ""}>
                              {" "}
                              · {STATUS_LABEL[r.camping_status]?.text ?? r.camping_status}
                            </span>
                          )}
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {r.participants.map((p) => (
                        <div key={p.id}>
                          <p className="font-[family-name:var(--font-noto)] text-[14px] font-semibold mb-1.5">
                            {p.name} <span className="text-text-muted font-normal">· 만 {p.age}세</span>
                          </p>
                          {p.signups.length === 0 ? (
                            <p className="text-[12px] text-text-muted font-[family-name:var(--font-noto)] pl-1">
                              신청한 체험 없음
                            </p>
                          ) : (
                            <ul className="space-y-1.5">
                              {p.signups.map((s) => {
                                const st = STATUS_LABEL[s.status];
                                return (
                                  <li
                                    key={s.id}
                                    className="flex items-center justify-between gap-3 text-[13px] font-[family-name:var(--font-noto)] pl-1"
                                  >
                                    <span>
                                      {experienceLabel(s.experience_key, s.time_slot)}{" "}
                                      <span className={`text-[11px] font-bold ${st?.cls ?? ""}`}>· {st?.text ?? s.status}</span>
                                    </span>
                                    <form action={cancelMySignup}>
                                      <input type="hidden" name="signup_id" value={s.id} />
                                      <button className="text-[11px] text-text-muted hover:text-[#b45309] underline shrink-0">
                                        취소
                                      </button>
                                    </form>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-text-muted italic font-[family-name:var(--font-noto)]">
                  ※ 확정 체험을 취소하면 대기 1번이 자동으로 확정되고 해당 분께 문자가 발송됩니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
