import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { lookupByPhone, type EcologyRegistrationRow } from "@/lib/ecology-db";
import { verifySession } from "@/lib/ecology-otp";
import { sessionLabel } from "@/lib/ecology-config";
import OtpGate from "./OtpGate";
import { cancelMyRegistration, logoutMy } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "내 신청 조회 · 남대천 생태체험 | LOMAD",
  robots: { index: false },
  alternates: { canonical: "/ecology/my" },
};

const STATUS: Record<string, { text: string; cls: string }> = {
  confirmed: { text: "확정", cls: "text-[#0B7A5A]" },
  waitlist: { text: "대기", cls: "text-[#b45309]" },
};

export default async function EcologyMyPage() {
  const store = await cookies();
  const phone = verifySession(store.get("ecology_my")?.value);
  let regs: EcologyRegistrationRow[] = [];
  if (phone) {
    try {
      regs = await lookupByPhone(phone);
    } catch (e) {
      console.error("[ecology] my lookup failed:", e);
    }
  }

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/ecology-wetland-water"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            남대천 생태체험
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

      <div className="max-w-[900px] mx-auto px-6 md:px-12 py-[60px]">
        {!phone ? (
          <OtpGate />
        ) : (
          <div>
            <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-8 leading-tight">
              내 신청 내역
            </h1>
            {regs.length === 0 ? (
              <p className="text-[14px] text-text-sub">
                이 연락처로 접수된 신청이 없습니다.{" "}
                <Link href="/ecology/register" className="underline">
                  참가 신청하기
                </Link>
              </p>
            ) : (
              <div className="space-y-6">
                {regs.map((r) => {
                  const st = STATUS[r.status];
                  return (
                    <div key={r.id} className="border border-border bg-bg-soft p-5 md:p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-3">
                        <div>
                          <span className="font-[family-name:var(--font-noto)] text-[16px] font-black">
                            {r.guardian_name}
                          </span>
                          <span className={`ml-2 text-[12px] font-bold ${st?.cls ?? ""}`}>
                            · {st?.text ?? r.status}
                          </span>
                        </div>
                        <form action={cancelMyRegistration}>
                          <input type="hidden" name="reg_id" value={r.id} />
                          <button className="text-[11px] text-text-muted hover:text-[#b45309] underline shrink-0">
                            신청 취소
                          </button>
                        </form>
                      </div>
                      <p className="text-[13px] text-text-sub mb-2">{sessionLabel(r.session_key)}</p>
                      <p className="text-[13px]">
                        참가자: {r.participants.map((c) => `${c.name}(만 ${c.age}세)`).join(", ")}
                      </p>
                    </div>
                  );
                })}
                <p className="text-[11px] text-text-muted italic">
                  ※ 확정 신청을 취소하면 대기 순번이 자동으로 확정되고 해당 분께 문자가 발송됩니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
