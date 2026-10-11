"use client";

import { useFormStatus } from "react-dom";
import { cancelMyRegistration } from "./actions";

/** 확인 대화상자를 거친 뒤에만 취소 서버 액션 제출. */
export default function CancelButton({ regId, label }: { regId: string; label: string }) {
  return (
    <form
      action={cancelMyRegistration}
      onSubmit={(e) => {
        if (!window.confirm(`${label} 사전예약을 취소할까요?\n취소 후에는 되돌릴 수 없습니다.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="reg_id" value={regId} />
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="text-[11px] text-text-muted hover:text-[#b45309] underline shrink-0 disabled:opacity-50"
    >
      {pending ? "취소 중…" : "신청 취소"}
    </button>
  );
}
