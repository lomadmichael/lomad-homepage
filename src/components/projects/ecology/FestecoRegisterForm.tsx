"use client";

import { useActionState, useState } from "react";
import { submitFesteco, type FestecoFormState } from "@/lib/festeco-action";
import {
  SESSIONS,
  MAX_PER_APPLICATION,
  CLOSED_LABEL,
  NOTICES,
  findSession,
  type FestecoSessionView,
} from "@/lib/festeco-config";

const initial: FestecoFormState = { success: false, message: "" };

export default function FestecoRegisterForm({
  views,
}: {
  views: Record<string, FestecoSessionView>;
}) {
  const [state, formAction, pending] = useActionState(submitFesteco, initial);
  const [sessionKey, setSessionKey] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  if (state.success && state.result) {
    const r = state.result;
    const s = findSession(r.session_key);
    return (
      <div className="border border-border bg-bg-soft p-7 md:p-9">
        <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#0B7A5A] mb-3 text-center">
          Confirmed
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-6 text-center">
          사전예약이 확정되었습니다
        </h2>
        <dl className="grid grid-cols-[80px_1fr] gap-y-2 text-[14px] font-[family-name:var(--font-noto)] border-t border-border pt-5 mb-6">
          <dt className="text-text-muted">회차</dt>
          <dd className="font-black">{s?.round ?? r.session_key}</dd>
          <dt className="text-text-muted">일시</dt>
          <dd className="font-black">{s?.label ?? ""}</dd>
          <dt className="text-text-muted">인원</dt>
          <dd className="font-black">
            성인 {r.adults}명 · 어린이 {r.children}명 · 총 {r.total}명
          </dd>
        </dl>
        <NoticeList />
        <a
          href="/ecology/festival/my"
          className="block mt-6 text-center text-[13px] underline"
        >
          내 신청 확인·취소하기 →
        </a>
      </div>
    );
  }

  const total = adults + children;
  const selected = sessionKey ? views[sessionKey] : undefined;
  const remaining = selected?.remaining ?? 0;
  const overRemaining = !!selected && total > remaining;
  const totalInvalid = total < 1 || total > MAX_PER_APPLICATION;
  const canSubmit = !!selected && !selected.closed && !overRemaining && !totalInvalid;

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="adults" value={adults} />
      <input type="hidden" name="children" value={children} />

      {/* 회차 선택 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-3">
          참여 회차
        </legend>
        <div className="space-y-2">
          {SESSIONS.map((s) => {
            const v = views[s.key] ?? { remaining: 0, closed: true };
            return (
              <label
                key={s.key}
                className={`flex items-center gap-3 border px-4 py-3 text-[14px] ${
                  v.closed
                    ? "border-border opacity-50 cursor-not-allowed bg-bg-soft"
                    : sessionKey === s.key
                      ? "border-text cursor-pointer"
                      : "border-border cursor-pointer hover:border-text"
                }`}
              >
                <input
                  type="radio"
                  name="session_key"
                  value={s.key}
                  required
                  disabled={v.closed}
                  checked={sessionKey === s.key}
                  onChange={() => setSessionKey(s.key)}
                  className="accent-text"
                />
                <span className="flex-1">
                  <span className="font-black mr-2">{s.round}</span>
                  {s.label}
                </span>
                {v.closed ? (
                  <span className="text-[12px] font-bold text-text-muted text-right">
                    {CLOSED_LABEL}
                  </span>
                ) : (
                  <span className="text-[12px] font-bold text-[#0B7A5A] shrink-0">
                    잔여 {v.remaining}석
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 대표 신청자 */}
      <div>
        <p className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-3">신청자 정보</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field name="guardian_name" label="대표 신청자 이름" required />
          <Field name="phone" label="연락처" placeholder="010-1234-5678" required inputMode="tel" />
        </div>
      </div>

      {/* 참여 인원 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-1">
          참여 인원
        </legend>
        <p className="text-[12px] text-text-muted mb-3">
          대표 신청자를 포함한 전체 인원을 입력해 주세요. 1건당 최대 {MAX_PER_APPLICATION}명.
        </p>
        <div className="space-y-2">
          <Stepper label="성인" value={adults} max={MAX_PER_APPLICATION - children} onChange={setAdults} />
          <Stepper label="어린이" value={children} max={MAX_PER_APPLICATION - adults} onChange={setChildren} />
        </div>
        <div className="flex items-center justify-between border-t border-border mt-3 pt-3 font-[family-name:var(--font-noto)]">
          <span className="text-[14px] font-black">총 인원</span>
          <span className="text-[18px] font-black">{total}명</span>
        </div>
        {overRemaining && (
          <p className="text-[13px] text-[#b45309] mt-2">잔여석({remaining}석)을 초과했습니다</p>
        )}
        {!overRemaining && total > MAX_PER_APPLICATION && (
          <p className="text-[13px] text-[#b45309] mt-2">
            1건당 최대 {MAX_PER_APPLICATION}명까지 신청할 수 있습니다.
          </p>
        )}
        {total < 1 && (
          <p className="text-[13px] text-[#b45309] mt-2">참여 인원을 1명 이상 입력해 주세요.</p>
        )}
      </fieldset>

      {/* 참가자 안내 */}
      <NoticeList />

      {/* 동의 */}
      <div className="space-y-3 border-t border-border pt-6">
        <Consent
          name="consent_privacy"
          required
          label="[필수] 개인정보 수집·이용 동의"
          desc="수집 항목: 이름, 연락처, 참여 인원. 목적: 접수·안내·안전관리. 보유: 프로그램 종료 후 1년 이내 파기. 동의하지 않으면 참가가 제한됩니다."
        />
        <Consent
          name="consent_notice"
          required
          label="[필수] 안내사항 확인"
          desc="야외에서 진행되며 기상 상황에 따라 일정이 변경·취소될 수 있습니다. 운영진의 안전 안내를 준수하며, 본인 부주의로 인한 사고는 보상이 제한될 수 있습니다."
        />
      </div>

      {state.message && !state.success && (
        <p className="text-[13px] text-[#b45309] font-[family-name:var(--font-noto)]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !canSubmit}
        className="w-full h-12 bg-text text-bg font-[family-name:var(--font-noto)] font-black text-[15px] disabled:opacity-50"
      >
        {pending ? "접수 중…" : "사전예약 신청하기"}
      </button>
    </form>
  );
}

export function NoticeList() {
  return (
    <div className="border border-border bg-bg-soft p-5">
      <p className="font-[family-name:var(--font-noto)] text-[14px] font-black mb-2">참가자 안내</p>
      <ul className="space-y-1.5 text-[13px] text-text-sub leading-relaxed font-[family-name:var(--font-noto)]">
        {NOTICES.map((n) => (
          <li key={n} className="flex gap-1.5">
            <span aria-hidden>·</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stepper({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  /** 이 칸의 상한 — 다른 칸과 합쳐 1건당 최대 인원을 넘지 않게. */
  max: number;
  onChange: (n: number) => void;
}) {
  const btn =
    "w-11 h-11 border border-border text-[18px] font-black hover:border-text disabled:opacity-30 disabled:hover:border-border";
  return (
    <div className="flex items-center justify-between border border-border px-4 py-2">
      <span className="font-[family-name:var(--font-noto)] text-[14px] font-black">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={`${label} 줄이기`}
          disabled={value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}
          className={btn}
        >
          −
        </button>
        <span className="w-10 text-center text-[16px] font-black tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`${label} 늘리기`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className={btn}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  required,
  placeholder,
  inputMode,
}: {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  inputMode?: "tel" | "email";
}) {
  return (
    <div>
      <label className="font-[family-name:var(--font-noto)] text-[14px] font-black block mb-2">
        {label}
        {required && <span className="text-[#FF6B6B]"> *</span>}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full bg-input-bg h-11 px-3 text-[14px] border border-border outline-none focus:border-text"
      />
    </div>
  );
}

function Consent({
  name,
  label,
  desc,
  required,
}: {
  name: string;
  label: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-2.5 text-[13px] text-text-sub cursor-pointer">
      <input type="checkbox" name={name} required={required} className="accent-text mt-1 shrink-0" />
      <span>
        <span className="font-semibold text-text">{label}</span>
        <br />
        {desc}
      </span>
    </label>
  );
}
