"use client";

import { useActionState, useState } from "react";
import { submitSurveyForm, type SurveyFormState } from "@/lib/ainb-survey-action";
import {
  SURVEY_ITEMS,
  SCALE,
  LIVE_INTENT_LABEL,
  liveReasonPrompt,
} from "@/lib/ainb-survey-config";

const initial: SurveyFormState = { success: false, message: "" };

const LABEL = "font-[family-name:var(--font-noto)] text-[13px] font-bold block mb-2";
const INPUT =
  "w-full border border-border px-4 py-3 font-[family-name:var(--font-noto)] text-[15px] bg-bg focus:border-text outline-none";

/** 1~5 라디오 한 줄 */
function Scale({ name, low, high }: { name: string; low: string; high: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub w-[52px] shrink-0 leading-tight">
        {low}
      </span>
      <div className="flex-1 grid grid-cols-5 gap-1.5">
        {SCALE.map((n) => (
          <label
            key={n}
            className="flex flex-col items-center gap-1 border border-border py-2 cursor-pointer has-[:checked]:border-text has-[:checked]:border-2 has-[:checked]:bg-[#00000008]"
          >
            <input type="radio" name={name} value={n} required className="accent-[#1A1A1A]" />
            <span className="font-[family-name:var(--font-noto)] text-[12px] font-bold">{n}</span>
          </label>
        ))}
      </div>
      <span className="font-[family-name:var(--font-noto)] text-[11px] text-text-sub w-[52px] shrink-0 text-right leading-tight">
        {high}
      </span>
    </div>
  );
}

export default function SurveyForm() {
  const [state, formAction, pending] = useActionState(submitSurveyForm, initial);
  const [live, setLive] = useState<number | null>(null);

  if (state.success) {
    return (
      <div className="border-2 border-text px-6 py-14 text-center">
        <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
          Thank you
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-3">
          {state.message}
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
          남겨주신 의견은 다음 기수를 더 낫게 만드는 데 쓰겠습니다.
          <br />
          현남에서 다시 뵙기를 기다리겠습니다.
        </p>
      </div>
    );
  }

  let currentDay = "";

  return (
    <form action={formAction} className="space-y-10">
      <label className="block">
        <span className={LABEL}>성명</span>
        <input name="name" required autoComplete="name" className={INPUT} />
      </label>

      {/* 프로그램별 만족도 */}
      <section>
        <h2 className="font-[family-name:var(--font-noto)] text-[18px] font-black mb-1">
          프로그램별 만족도
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub mb-7">
          1점 만족하지 않는다 ~ 5점 만족한다
        </p>

        <div className="space-y-7">
          {SURVEY_ITEMS.map((item) => {
            const showDay = item.day !== currentDay;
            currentDay = item.day;
            return (
              <div key={item.key}>
                {showDay && (
                  <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2.5px] font-extrabold uppercase text-text-sub mb-3 mt-2">
                    {item.day}
                  </p>
                )}
                <p className="font-[family-name:var(--font-noto)] text-[15px] font-bold mb-1">
                  {item.label}
                </p>
                {item.hint && (
                  <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub mb-3">
                    {item.hint}
                  </p>
                )}
                <div className={item.hint ? "" : "mt-3"}>
                  <Scale name={`r_${item.key}`} low="만족하지 않는다" high="만족한다" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 전반 */}
      <section className="border-t-2 border-text pt-8 space-y-7">
        <div>
          <p className="font-[family-name:var(--font-noto)] text-[15px] font-bold mb-3">
            전반적인 「Ai 내일바꿈」 만족도는 어떠셨나요?
          </p>
          <Scale name="overall" low="매우 불만족" high="매우 만족" />
        </div>
        <div>
          <p className="font-[family-name:var(--font-noto)] text-[15px] font-bold mb-3">
            주변에 이 프로그램을 추천하고 싶으신가요?
          </p>
          <Scale name="recommend" low="전혀 아니다" high="꼭 추천한다" />
        </div>
      </section>

      {/* 생활인구 의향 */}
      <section className="border-t-2 border-text pt-8">
        <h2 className="font-[family-name:var(--font-noto)] text-[18px] font-black mb-1">
          현남에서의 삶
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub mb-7">
          솔직하게 답해주실수록 도움이 됩니다.
        </p>

        <p className="font-[family-name:var(--font-noto)] text-[15px] font-bold mb-4">
          이 지역에서 생활해보고 싶다는 생각이 들었나요?
        </p>
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1].map((n) => (
            <label
              key={n}
              className="flex items-center gap-3 border border-border px-4 py-3 cursor-pointer has-[:checked]:border-text has-[:checked]:border-2 font-[family-name:var(--font-noto)] text-[15px]"
            >
              <input
                type="radio"
                name="live_intent"
                value={n}
                required
                onChange={() => setLive(n)}
                className="accent-[#1A1A1A]"
              />
              <span>{LIVE_INTENT_LABEL[n]}</span>
            </label>
          ))}
        </div>

        <label className="block mt-6">
          <span className={LABEL}>
            {live === null ? "그렇게 생각하신 이유를 알려주세요" : liveReasonPrompt(live)}
          </span>
          <textarea
            name="live_reason"
            rows={4}
            required
            placeholder={
              live === null
                ? "위에서 먼저 선택해 주세요."
                : live >= 4
                  ? "예: 바다가 가깝고 사람들이 좋았다, 일할 공간이 있어 보였다…"
                  : live <= 2
                    ? "예: 일자리가 마땅치 않다, 교통이 불편하다, 겨울이 걱정된다…"
                    : "예: 좋았지만 현실적으로 정리할 것이 많다…"
            }
            className={`${INPUT} resize-none`}
          />
        </label>
      </section>

      {/* 자유 서술 */}
      <section className="border-t-2 border-text pt-8 space-y-6">
        <label className="block">
          <span className={LABEL}>가장 좋았던 프로그램과 그 이유</span>
          <textarea name="best" rows={3} className={`${INPUT} resize-none`} />
        </label>
        <label className="block">
          <span className={LABEL}>아쉬웠던 점 · 다음 기수에서 고쳤으면 하는 점</span>
          <textarea name="improve" rows={3} className={`${INPUT} resize-none`} />
        </label>
        <label className="block">
          <span className={LABEL}>다음 기수 참가자에게 조언을 해준다면</span>
          <textarea
            name="advice"
            rows={3}
            placeholder="이렇게 준비하면 좋다, 이건 꼭 해봐라 같은 이야기를 남겨 주세요."
            className={`${INPUT} resize-none`}
          />
        </label>
        <label className="block">
          <span className={LABEL}>그 밖에 하고 싶은 이야기</span>
          <textarea name="free_note" rows={3} className={`${INPUT} resize-none`} />
        </label>
      </section>

      {state.message && !state.success && (
        <p className="border border-[#C0392B] bg-[#FDECEA] text-[#8E2A20] px-4 py-3 font-[family-name:var(--font-noto)] text-[14px] leading-[1.7]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full py-4 bg-text text-bg font-[family-name:var(--font-noto)] text-[16px] font-black disabled:opacity-40"
      >
        {pending ? "제출 중…" : "설문 제출하기"}
      </button>
    </form>
  );
}
