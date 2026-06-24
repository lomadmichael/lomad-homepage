import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { lookupByPhone, type RegistrationRow } from "@/lib/festival-db";
import { verifySession } from "@/lib/festival-otp";
import { experienceLabel, CAMPING, EXPERIENCE_OPTIONS, getExperience, experiencesTimeConflict } from "@/lib/festival-experiences";
import OtpGate from "./OtpGate";
import { cancelMySignup, changeMyCamping, addMySignup, logoutMy } from "./actions";

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

const radioCls =
  "flex items-center gap-2 border border-border px-3 py-2.5 cursor-pointer text-[13px] font-[family-name:var(--font-noto)] hover:border-text";

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
                {regs.map((r) => {
                  const activeCamping = r.camping && r.camping_status !== "cancelled" ? r.camping : "";
                  return (
                  <div key={r.id} className="border border-border bg-bg-soft p-5 md:p-7">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-4">
                      <span className="font-[family-name:var(--font-noto)] text-[16px] font-black">{r.rep_name}</span>
                      <span className="text-[12px] text-text-muted font-[family-name:var(--font-noto)]">{r.region}</span>
                    </div>

                    {/* 캠핑 변경/취소 (체험과 달리 직접 변경 가능) */}
                    <form action={changeMyCamping} className="mb-5 pb-5 border-b border-border">
                      <input type="hidden" name="reg_id" value={r.id} />
                      <p className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub mb-2">
                        캠핑 사이트
                        {activeCamping && r.camping_status && (
                          <span className={`ml-1 ${STATUS_LABEL[r.camping_status]?.cls ?? ""}`}>
                            · 현재 {activeCamping === "deck" ? "데크" : "노지"} {STATUS_LABEL[r.camping_status]?.text ?? ""}
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <label className={radioCls}>
                          <input type="radio" name="camping" value="" defaultChecked={activeCamping === ""} className="accent-text" />
                          <span>신청 안 함</span>
                        </label>
                        {CAMPING.map((c) => (
                          <label key={c.key} className={radioCls}>
                            <input
                              type="radio"
                              name="camping"
                              value={c.key}
                              defaultChecked={activeCamping === c.key}
                              className="accent-text"
                            />
                            <span>
                              {c.label} <span className="text-text-muted">({c.fee})</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      <button className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1px] uppercase border border-text px-3 py-2 hover:bg-text hover:text-bg transition-colors">
                        캠핑 변경 저장
                      </button>
                    </form>

                    <div className="space-y-4">
                      {r.participants.map((p) => {
                        const activeSet = new Set(
                          p.signups.map((s) => s.experience_key + (s.time_slot ? "|" + s.time_slot : "")),
                        );
                        const hasActivity = p.signups.some(
                          (s) => getExperience(s.experience_key)?.exclusiveGroup === "activity",
                        );
                        const available = EXPERIENCE_OPTIONS.filter((o) => {
                          if (activeSet.has(o.value)) return false;
                          if (typeof o.minAge === "number" && p.age < o.minAge) return false;
                          if (o.exclusiveGroup === "activity" && hasActivity) return false;
                          // 같은 시간대 이미 신청한 체험이 있으면 제외
                          if (p.signups.some((s) => experiencesTimeConflict(o.key, o.slot, s.experience_key, s.time_slot)))
                            return false;
                          return true;
                        });
                        return (
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

                          {available.length > 0 && (
                            <form action={addMySignup} className="mt-2 flex flex-wrap items-center gap-2 pl-1">
                              <input type="hidden" name="participant_id" value={p.id} />
                              <select
                                name="exp"
                                defaultValue=""
                                required
                                className="bg-input-bg h-9 px-2 text-[12px] font-[family-name:var(--font-noto)] outline-none border border-border max-w-[260px]"
                              >
                                <option value="" disabled>+ 체험 추가 선택</option>
                                {available.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                    {o.fee ? ` (${o.fee})` : ""}
                                  </option>
                                ))}
                              </select>
                              <button className="h-9 px-3 text-[11px] font-[family-name:var(--font-karla)] font-extrabold tracking-[1px] uppercase border border-text hover:bg-text hover:text-bg transition-colors">
                                추가
                              </button>
                            </form>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                  );
                })}
                <p className="text-[11px] text-text-muted italic font-[family-name:var(--font-noto)]">
                  ※ 캠핑은 변경·취소, 체험은 추가·취소할 수 있습니다. 확정 체험을 취소하면 대기 1번이 자동 확정되고 해당 분께 문자가 발송됩니다. 정원이 찬 체험을 추가하면 대기로 접수됩니다.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
