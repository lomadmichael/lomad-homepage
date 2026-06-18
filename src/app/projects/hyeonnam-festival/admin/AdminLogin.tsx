"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import { adminLogin, type AdminLoginState } from "./actions";

const init: AdminLoginState = {};

export default function AdminLogin() {
  const [state, action, pending] = useActionState(adminLogin, init);
  return (
    <div className="max-w-[360px]">
      <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-3">
        Admin
      </p>
      <h1 className="font-[family-name:var(--font-noto)] text-[24px] font-black mb-6">관리자 로그인</h1>
      <form action={action}>
        <input
          type="password"
          name="password"
          required
          placeholder="비밀번호"
          className="w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm outline-none mb-3"
        />
        {state.error && (
          <p className="mb-3 text-[12px] text-[#b45309] font-[family-name:var(--font-noto)]">{state.error}</p>
        )}
        <Button variant="primary" type="submit">
          {pending ? "확인중" : "로그인"}
        </Button>
      </form>
    </div>
  );
}
