"use client";

import { useActionState } from "react";
import { adminLoginAction, type LoginState } from "./actions";
import { btnDark, inputCls } from "../_components/Shell";

const init: LoginState = {};

export default function AdminLogin() {
  const [state, action, pending] = useActionState(adminLoginAction, init);
  return (
    <form action={action} className="max-w-[360px] mx-auto mt-[12vh] space-y-3">
      <h1 className="sx-hand text-[26px] mb-2">커스텀 티셔츠 부스 관리자</h1>
      <input type="password" name="password" placeholder="관리자 비밀번호" required className={inputCls} />
      {state.error && <p className="text-[14px] font-bold text-[#B2453A]">{state.error}</p>}
      <button disabled={pending} className={btnDark}>
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
