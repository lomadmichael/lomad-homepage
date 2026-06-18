"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import { requestOtp, verifyOtp, type OtpState } from "./actions";

const reqInit: OtpState = { step: "phone" };
const verInit: OtpState = { step: "verify" };

const inputCls =
  "w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none";
const labelCls = "font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5";

export default function OtpGate() {
  const [reqState, reqAction, reqPending] = useActionState(requestOtp, reqInit);
  const [verState, verAction, verPending] = useActionState(verifyOtp, verInit);

  const sent = reqState.step === "verify";
  const phone = reqState.phone ?? "";

  return (
    <div className="max-w-[440px]">
      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-3">
        My Registration
      </p>
      <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-3 leading-tight">
        내 신청 조회
      </h1>
      <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub mb-8 leading-relaxed">
        접수 시 입력한 연락처로 인증번호를 보내드립니다. 인증 후 신청 내역 확인·취소가 가능합니다.
      </p>

      {/* 1단계: 연락처 */}
      <form action={reqAction} className="mb-6">
        <label className={labelCls}>연락처</label>
        <div className="flex gap-2">
          <input
            type="tel"
            name="phone"
            required
            defaultValue={phone}
            placeholder="010-1234-5678"
            className={inputCls}
          />
          <Button variant="outline" type="submit">
            {reqPending ? "발송중" : sent ? "재발송" : "인증번호 받기"}
          </Button>
        </div>
        {reqState.step === "error" && reqState.message && (
          <p className="mt-2 text-[12px] text-[#b45309] font-[family-name:var(--font-noto)]">{reqState.message}</p>
        )}
      </form>

      {/* 2단계: 인증코드 */}
      {sent && (
        <form action={verAction}>
          <input type="hidden" name="phone" value={phone} />
          <label className={labelCls}>인증번호 (6자리)</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="code"
              inputMode="numeric"
              maxLength={6}
              required
              placeholder="● ● ● ● ● ●"
              className={inputCls}
            />
            <Button variant="primary" type="submit">
              {verPending ? "확인중" : "확인"}
            </Button>
          </div>
          {verState.message && (
            <p className="mt-2 text-[12px] text-[#b45309] font-[family-name:var(--font-noto)]">{verState.message}</p>
          )}
          <p className="mt-2 text-[11px] text-text-muted font-[family-name:var(--font-noto)]">
            인증번호는 5분간 유효합니다.
          </p>
        </form>
      )}
    </div>
  );
}
