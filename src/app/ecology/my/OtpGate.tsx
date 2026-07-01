"use client";

import { useActionState } from "react";
import { requestOtp, verifyOtp, type OtpState } from "./actions";

const initReq: OtpState = { step: "phone" };
const initVer: OtpState = { step: "verify" };

export default function OtpGate() {
  const [reqState, reqAction, reqPending] = useActionState(requestOtp, initReq);
  const sent = reqState.step === "verify";
  return (
    <div className="max-w-[420px]">
      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#E8A845] mb-3">
        My Registration
      </p>
      <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black mb-6 leading-tight">
        내 신청 조회
      </h1>

      {!sent ? (
        <form action={reqAction} className="space-y-3">
          <input
            name="phone"
            inputMode="tel"
            placeholder="접수한 휴대폰 번호"
            required
            className="w-full bg-input-bg h-12 px-3 text-[15px] border border-border outline-none focus:border-text"
          />
          {reqState.step === "error" && (
            <p className="text-[13px] text-[#b45309]">{reqState.message}</p>
          )}
          <button
            disabled={reqPending}
            className="w-full h-12 bg-text text-bg font-black text-[15px] disabled:opacity-50"
          >
            {reqPending ? "발송 중…" : "인증번호 받기"}
          </button>
        </form>
      ) : (
        <VerifyForm phone={reqState.phone!} />
      )}
    </div>
  );
}

function VerifyForm({ phone }: { phone: string }) {
  const [state, action, pending] = useActionState(verifyOtp, initVer);
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="phone" value={phone} />
      <p className="text-[13px] text-text-sub">{phone} 로 인증번호를 보냈습니다.</p>
      <input
        name="code"
        inputMode="numeric"
        placeholder="인증번호 6자리"
        required
        className="w-full bg-input-bg h-12 px-3 text-[15px] tracking-[4px] border border-border outline-none focus:border-text"
      />
      {state.message && <p className="text-[13px] text-[#b45309]">{state.message}</p>}
      <button
        disabled={pending}
        className="w-full h-12 bg-text text-bg font-black text-[15px] disabled:opacity-50"
      >
        {pending ? "확인 중…" : "확인"}
      </button>
    </form>
  );
}
