"use client";

import { useEffect, useState, useTransition } from "react";
import { requestOtpAction, verifyOtpAction, type VerifyState } from "../actions";
import { btnGhost, btnPrimary, inputCls } from "./Shell";

/** 휴대폰 번호 → 인증번호 6자리. 성공 시 onVerified(서버가 세션 쿠키 발급). */
export default function PhoneOtp({
  purpose,
  onVerified,
}: {
  purpose: "apply" | "lookup";
  onVerified: (r: VerifyState) => void;
}) {
  const [phone, setPhone] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const send = () =>
    start(async () => {
      setError(null);
      const r = await requestOtpAction({ phone, purpose });
      if (r.ok) {
        setSentTo(phone.replace(/\D/g, ""));
        setCode("");
        setCooldown(60);
      } else {
        setError(r.error ?? "다시 시도해 주세요.");
        if (r.retryAfter && r.retryAfter <= 60) setCooldown(r.retryAfter);
      }
    });

  const verify = () =>
    start(async () => {
      setError(null);
      const r = await verifyOtpAction({ phone: sentTo ?? phone, code });
      if (r.ok) onVerified(r);
      else setError(r.error ?? "다시 시도해 주세요.");
    });

  if (!sentTo) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="space-y-3"
      >
        <label className="sx-hand block text-[19px]">대표 휴대폰 번호</label>
        <input
          className={inputCls}
          inputMode="tel"
          autoComplete="tel"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className="text-[14px] font-medium text-[#262120]/65">이 번호로 인증번호와 회차권 문자가 가요.</p>
        {error && <p className="text-[14px] font-bold text-[#B2453A]">{error}</p>}
        <button className={btnPrimary} disabled={pending || phone.replace(/\D/g, "").length < 10}>
          {pending ? "보내는 중…" : "인증번호 받기"}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        verify();
      }}
      className="space-y-3"
    >
      <p className="text-[16px] font-medium break-keep">
        <b className="sx-hl font-black">{sentTo}</b> 으로 보낸 인증번호 6자리를 입력해 주세요.
      </p>
      <input
        className={`${inputCls} text-center tracking-[10px] text-[24px] font-black`}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="······"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        autoFocus
      />
      {error && <p className="text-[14px] font-bold text-[#B2453A]">{error}</p>}
      <button className={btnPrimary} disabled={pending || code.length !== 6}>
        {pending ? "확인 중…" : "인증하기"}
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={btnGhost} disabled={pending || cooldown > 0} onClick={send}>
          {cooldown > 0 ? `다시 받기 (${cooldown}초)` : "다시 받기"}
        </button>
        <button
          type="button"
          className={btnGhost}
          disabled={pending}
          onClick={() => {
            setSentTo(null);
            setError(null);
          }}
        >
          번호 바꾸기
        </button>
      </div>
    </form>
  );
}
