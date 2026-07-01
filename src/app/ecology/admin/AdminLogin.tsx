"use client";

import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "./actions";

const init: AdminLoginState = {};

export default function AdminLogin() {
  const [state, action, pending] = useActionState(adminLogin, init);
  return (
    <form action={action} className="max-w-[360px] mx-auto mt-[15vh] space-y-3">
      <h1 className="font-[family-name:var(--font-noto)] text-[20px] font-black mb-2">
        생태체험 관리자
      </h1>
      <input
        type="password"
        name="password"
        placeholder="관리자 비밀번호"
        required
        className="w-full bg-input-bg h-12 px-3 text-[15px] border border-border outline-none focus:border-text"
      />
      {state.error && <p className="text-[13px] text-[#b45309]">{state.error}</p>}
      <button
        disabled={pending}
        className="w-full h-12 bg-text text-bg font-black text-[15px] disabled:opacity-50"
      >
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
