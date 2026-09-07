import { cookies } from "next/headers";
import { verifyAdmin, ADMIN_COOKIE } from "../../consent/admin/auth";
import AdminLogin from "../../consent/admin/AdminLogin";
import { listSurvey, summarize } from "@/lib/ainb-survey-db";
import { SURVEY_ITEMS, LIVE_INTENT_LABEL } from "@/lib/ainb-survey-config";
import { PARTICIPANTS, STAFF_NAMES } from "@/lib/ainb-tour-config";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

function Bar({ pct, color = "#1A1A1A" }: { pct: number; color?: string }) {
  return (
    <div className="h-1.5 bg-[#00000010] w-full">
      <div className="h-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default async function SurveyAdminPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifyAdmin(token)) return <AdminLogin />;

  // 초대 참가·운영진 응답은 공식 수치에서 제외한다 (데이터는 DB에 그대로 남는다)
  const rows = (await listSurvey()).filter((r) => !STAFF_NAMES.has(r.name));
  const n = rows.length;
  const done = new Set(rows.map((r) => r.name));
  const pending = PARTICIPANTS.filter((p) => !done.has(p.name));

  const overall = summarize(rows.map((r) => r.overall));
  const recommend = summarize(rows.map((r) => r.recommend).filter((v): v is number => v != null));
  const liveIntent = summarize(rows.map((r) => r.live_intent));

  const items = SURVEY_ITEMS.map((item) => ({
    ...item,
    stat: summarize(rows.map((r) => r.ratings?.[item.key]).filter((v): v is number => typeof v === "number")),
  })).sort((a, b) => b.stat.avg - a.stat.avg);

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <h1 className="font-[family-name:var(--font-noto)] text-[24px] font-black mb-1">
          만족도 조사 결과
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mb-10">
          1기 · 응답 {n}명 / 참가자 {PARTICIPANTS.length}명
          {PARTICIPANTS.length > 0 && ` (${Math.round((n / PARTICIPANTS.length) * 100)}%)`}
        </p>

        {n === 0 ? (
          <p className="font-[family-name:var(--font-noto)] text-[15px] text-text-sub">
            아직 응답이 없습니다.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 mb-12">
              {[
                ["전반 만족도", overall],
                ["추천 의향", recommend],
                ["생활 의향", liveIntent],
              ].map(([label, s]) => {
                const stat = s as ReturnType<typeof summarize>;
                return (
                  <div key={label as string} className="border border-border px-4 py-4">
                    <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub mb-1">
                      {label as string}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[26px] font-black leading-none mb-1">
                      {stat.avg.toFixed(2)}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub">
                      만족 이상 {stat.satisfied}%
                    </p>
                  </div>
                );
              })}
            </div>

            <h2 className="font-[family-name:var(--font-noto)] text-[18px] font-black mb-5">
              프로그램별 만족도 <span className="text-[13px] text-text-sub font-bold">(높은 순)</span>
            </h2>
            <div className="space-y-4 mb-12">
              {items.map((it) => (
                <div key={it.key}>
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <span className="font-[family-name:var(--font-noto)] text-[14px] font-bold">
                      {it.label}
                      <span className="text-[11px] text-text-sub font-normal ml-2">{it.day}</span>
                    </span>
                    <span className="font-[family-name:var(--font-noto)] text-[13px] shrink-0">
                      <strong>{it.stat.avg.toFixed(2)}</strong>
                      <span className="text-text-sub"> · 만족 {it.stat.satisfied}% · {it.stat.n}명</span>
                    </span>
                  </div>
                  <Bar pct={(it.stat.avg / 5) * 100} />
                </div>
              ))}
            </div>

            <h2 className="font-[family-name:var(--font-noto)] text-[18px] font-black mb-5">
              현남에서의 삶
            </h2>
            <div className="border border-border mb-12">
              {[5, 4, 3, 2, 1].map((score) => {
                const list = rows.filter((r) => r.live_intent === score);
                if (list.length === 0) return null;
                return (
                  <div key={score} className="border-b border-border last:border-0">
                    <p className="px-5 py-3 bg-[#00000006] font-[family-name:var(--font-noto)] text-[14px] font-black">
                      {LIVE_INTENT_LABEL[score]} · {list.length}명
                    </p>
                    <ul className="divide-y divide-border">
                      {list.map((r) => (
                        <li
                          key={r.id}
                          className="px-5 py-3 font-[family-name:var(--font-noto)] text-[14px] leading-[1.8]"
                        >
                          <span className="font-bold">{r.name}</span>{" "}
                          <span className="text-text-sub">{r.live_reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {[
              ["가장 좋았던 프로그램", "best"],
              ["아쉬웠던 점 · 개선 요청", "improve"],
              ["다음 기수 참가자에게 하는 조언", "advice"],
              ["그 밖의 이야기", "free_note"],
            ].map(([label, key]) => {
              const list = rows.filter((r) => (r as unknown as Record<string, string>)[key as string]);
              return (
                <section key={key as string} className="mb-10">
                  <h2 className="font-[family-name:var(--font-noto)] text-[18px] font-black mb-4">
                    {label as string}{" "}
                    <span className="text-[13px] text-text-sub font-bold">{list.length}건</span>
                  </h2>
                  {list.length === 0 ? (
                    <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub">
                      작성된 내용이 없습니다.
                    </p>
                  ) : (
                    <ul className="border border-border divide-y divide-border">
                      {list.map((r) => (
                        <li
                          key={r.id}
                          className="px-5 py-3 font-[family-name:var(--font-noto)] text-[14px] leading-[1.85]"
                        >
                          <span className="font-bold">{r.name}</span>{" "}
                          <span className="text-text-sub">
                            {(r as unknown as Record<string, string>)[key as string]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </>
        )}

        <section className="mt-10 border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-[family-name:var(--font-noto)] text-[17px] font-black">
              미응답 {pending.length}명
            </h2>
          </div>
          <p className="px-5 py-4 font-[family-name:var(--font-noto)] text-[14px] leading-[2]">
            {pending.length === 0 ? "전원 응답 완료했습니다." : pending.map((p) => p.name).join(" · ")}
          </p>
        </section>
      </div>
    </main>
  );
}
