"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { submitTourChoice, type TourFormState } from "@/lib/ainb-tour-action";
import { TOURS, TOUR_MEET, TOUR_MEET_ADDR, TOUR_TEL, tourByKey } from "@/lib/ainb-tour-config";

const initial: TourFormState = { success: false, message: "" };

export default function TourForm({ counts }: { counts: Record<string, number> }) {
  const [state, formAction, pending] = useActionState(submitTourChoice, initial);
  const [picked, setPicked] = useState<string>("");

  if (state.success) {
    const t = tourByKey(state.tourKey ?? "");
    return (
      <div className="border-2 border-text px-6 py-10 text-center">
        <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
          Done
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-3">
          {state.message}
        </h2>
        {t && (
          <p className="font-[family-name:var(--font-noto)] text-[15px] leading-[1.9] text-text-sub">
            <strong className="text-text">{t.title}</strong>
            <br />
            멘토 {t.mentor} ({t.belong})
          </p>
        )}
        <div className="mt-7 pt-7 border-t border-border font-[family-name:var(--font-noto)] text-[14px] leading-[1.9] text-text-sub">
          <strong className="text-text">{TOUR_MEET}</strong>
          <br />
          {TOUR_MEET_ADDR}
          <br />
          <span className="text-[13px]">문의 {TOUR_TEL}</span>
        </div>
        <p className="mt-6 font-[family-name:var(--font-noto)] text-[13px] text-text-sub">
          바꾸고 싶으시면{" "}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="underline font-bold text-text"
          >
            다시 선택
          </button>
          하시면 됩니다.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="tour_key" value={picked} />

      <div className="space-y-8">
        {TOURS.map((t) => {
          const taken = counts[t.key] ?? 0;
          const left = Math.max(0, t.capacity - taken);
          const full = left === 0;
          const on = picked === t.key;
          return (
            <button
              type="button"
              key={t.key}
              disabled={full}
              onClick={() => setPicked(t.key)}
              className={`block w-full text-left border-2 transition-colors ${
                on ? "border-text bg-[color:var(--color-bg-sub,#fafafa)]" : "border-border"
              } ${full ? "opacity-45 cursor-not-allowed" : "hover:border-text cursor-pointer"}`}
            >
              {/* 사진 */}
              <div className="grid grid-cols-3 gap-[2px] bg-border">
                {t.photos.slice(0, 3).map((p, i) => (
                  <div key={p} className={`relative bg-bg ${i === 0 ? "aspect-[4/5]" : "aspect-[4/5]"}`}>
                    <Image
                      src={`/ainb/tour/${p}.jpg`}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 33vw, 240px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="px-5 py-6 md:px-7">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <span
                    className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2.5px] font-extrabold uppercase"
                    style={{ color: t.accent }}
                  >
                    Mentor Tour
                  </span>
                  <span
                    className={`font-[family-name:var(--font-noto)] text-[12px] font-black shrink-0 ${
                      full ? "text-text-sub" : ""
                    }`}
                    style={full ? undefined : { color: t.accent }}
                  >
                    {full ? "정원 마감" : `잔여 ${left}명 / 정원 ${t.capacity}명`}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-noto)] text-[20px] md:text-[23px] font-black leading-[1.35] mb-1">
                  {t.title}
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[14px] font-bold text-text-sub mb-5">
                  멘토 {t.mentor} · {t.belong}
                </p>

                <ul className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.95] mb-4">
                  {t.program.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span style={{ color: t.accent }}>·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {t.fee > 0 ? (
                  <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub mb-4">
                    <strong className="text-text">
                      {t.feeLabel} {t.fee.toLocaleString()}원
                    </strong>{" "}
                    — 개인 부담
                  </p>
                ) : (
                  <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub mb-4">
                    별도 체험비 없음
                  </p>
                )}

                {t.rain && (
                  <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub mb-4">
                    ☂ {t.rain}
                  </p>
                )}

                <div className="border-t border-border pt-4">
                  {t.intro.map((line, i) => (
                    <p
                      key={i}
                      className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.95] text-text-sub mb-2 last:mb-0"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div
                  className={`mt-6 text-center py-3 font-[family-name:var(--font-noto)] text-[14px] font-black border-2 ${
                    on ? "border-text bg-text text-bg" : "border-border text-text-sub"
                  }`}
                >
                  {full ? "정원이 찼습니다" : on ? "✓ 선택함" : "이 투어 선택하기"}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 본인 확인 */}
      <div className="mt-12 border-t-2 border-text pt-8">
        <h2 className="font-[family-name:var(--font-noto)] text-[18px] font-black mb-1">
          참가자 확인
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[13px] leading-[1.8] text-text-sub mb-6">
          신청서에 적으신 성명과 휴대전화 번호를 입력해 주세요.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="font-[family-name:var(--font-noto)] text-[13px] font-bold block mb-2">
              성명
            </span>
            <input
              name="name"
              required
              autoComplete="name"
              className="w-full border border-border px-4 py-3 font-[family-name:var(--font-noto)] text-[15px] bg-bg focus:border-text outline-none"
            />
          </label>
          <label className="block">
            <span className="font-[family-name:var(--font-noto)] text-[13px] font-bold block mb-2">
              휴대전화
            </span>
            <input
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="010-1234-5678"
              className="w-full border border-border px-4 py-3 font-[family-name:var(--font-noto)] text-[15px] bg-bg focus:border-text outline-none"
            />
          </label>
        </div>

        {state.message && !state.success && (
          <p className="mt-6 border border-[#C0392B] bg-[#FDECEA] text-[#8E2A20] px-4 py-3 font-[family-name:var(--font-noto)] text-[14px] leading-[1.7]">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending || !picked}
          className="mt-7 w-full py-4 bg-text text-bg font-[family-name:var(--font-noto)] text-[16px] font-black disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {pending ? "신청 중…" : picked ? "이 투어로 신청하기" : "위에서 투어를 먼저 선택해 주세요"}
        </button>
      </div>
    </form>
  );
}
