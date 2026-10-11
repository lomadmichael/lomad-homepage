import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { lookupByPhone, serverNow, type FestecoRegistrationRow } from "@/lib/festeco-db";
import { verifySession } from "@/lib/ecology-otp";
import { findSession, INQUIRY_TEL } from "@/lib/festeco-config";
import OtpGate from "./OtpGate";
import CancelButton from "./CancelButton";
import { logoutMy } from "./actions";
import { FESTECO_COOKIE } from "./session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "내 신청 확인 · 송이연어축제 남대천 생태탐방 | 로마드협동조합" },
  robots: { index: false },
  alternates: { canonical: "/ecology/festival/my" },
};

export default async function FestecoMyPage() {
  const store = await cookies();
  const phone = verifySession(store.get(FESTECO_COOKIE)?.value);
  let regs: FestecoRegistrationRow[] = [];
  if (phone) {
    try {
      regs = (await lookupByPhone(phone)).filter((r) => r.status === "confirmed");
    } catch (e) {
      console.error("[festeco] my lookup failed:", e);
    }
  }
  const now = serverNow();

  return (
    <main className="min-h-screen bg-bg">
      <header className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/ecology/festival"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            남대천 생태탐방
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
                이 연락처로 확정된 사전예약이 없습니다.{" "}
                <Link href="/ecology/festival" className="underline">
                  사전예약 신청하기
                </Link>
              </p>
            ) : (
              <div className="space-y-6">
                {regs.map((r) => {
                  const s = findSession(r.session_key);
                  const started = !s || now >= new Date(s.startsAt).getTime();
                  return (
                    <div key={r.id} className="border border-border bg-bg-soft p-5 md:p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-3">
                        <div>
                          <span className="font-[family-name:var(--font-noto)] text-[16px] font-black">
                            {s?.round ?? r.session_key}
                          </span>
                          <span className="ml-2 text-[12px] font-bold text-[#0B7A5A]">· 확정</span>
                        </div>
                        {!started && (
                          <CancelButton regId={r.id} label={`${s?.round ?? ""} ${s?.label ?? ""}`.trim()} />
                        )}
                      </div>
                      <p className="text-[13px] text-text-sub mb-2">{s?.label ?? ""}</p>
                      <p className="text-[13px]">
                        {r.guardian_name} · 성인 {r.adults}명 · 어린이 {r.children}명 · 총 {r.total}명
                      </p>
                    </div>
                  );
                })}
                <p className="text-[11px] text-text-muted italic">
                  ※ 취소한 자리는 다른 신청자에게 바로 열립니다. 회차 시작 이후 취소·변경은 {INQUIRY_TEL} 로 연락 주세요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
