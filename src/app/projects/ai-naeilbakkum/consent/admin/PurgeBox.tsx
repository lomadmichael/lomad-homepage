"use client";

import { useActionState } from "react";
import { purgeAllRrn, type PurgeState } from "./actions";

const init: PurgeState = {};

export default function PurgeBox({ remaining }: { remaining: number }) {
  const [state, action, pending] = useActionState(purgeAllRrn, init);
  return (
    <form action={action} className="border border-[#C0392B] bg-[#FBD5D0]/40 p-5 space-y-3">
      <h3 className="font-[family-name:var(--font-noto)] text-[14px] font-black text-[#8E2A1E]">
        주민등록번호 파기
      </h3>
      <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-relaxed">
        보험 가입이 끝나면 즉시 파기해야 합니다(수집 시 고지한 보유기간).
        <br />
        현재 보관 중 <strong>{remaining}건</strong>. 파기하면 되돌릴 수 없습니다.
      </p>
      <div className="flex gap-2">
        <input
          name="confirm"
          placeholder='확인을 위해 "파기" 입력'
          className="flex-1 border border-border bg-bg h-11 px-3 text-[14px] outline-none focus:border-text"
        />
        <button
          disabled={pending || remaining === 0}
          className="h-11 px-5 bg-[#C0392B] text-white font-black text-[14px] disabled:opacity-40"
        >
          {pending ? "처리 중…" : "전건 파기"}
        </button>
      </div>
      {state.message && (
        <p className="font-[family-name:var(--font-noto)] text-[13px] font-bold text-[#8E2A1E]">
          {state.message}
        </p>
      )}
    </form>
  );
}
