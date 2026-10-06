"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ADMIN_COOKIE_PATH,
  maxPartySize,
  receiptTotal,
  type Gender,
  type Participant,
} from "@/lib/customhouse-config";
import { proxyRequestOtpAction, proxySubmitAction, proxyVerifyAction } from "./actions";
import { btnDark, btnGhost, inputCls } from "../_components/Shell";

interface PRow {
  name: string;
  gender: Gender | "";
  age: string;
}
const digits = (s: string) => s.replace(/\D/g, "");

/** 대리 접수: 손님 폰으로 인증번호 → 구두 확인 → 직원이 입력. 제출 후 '승인 대기'에 올라간다. */
export default function ProxyForm() {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [people, setPeople] = useState<PRow[]>([{ name: "", gender: "", age: "" }]);
  const [privacy, setPrivacy] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const receipts = amounts.map((a) => ({ amount: Number(a || 0), store: null }));
  const total = receiptTotal(receipts);
  const max = maxPartySize(total);

  const reset = () => {
    setPhone("");
    setSent(false);
    setCode("");
    setToken(null);
    setAmounts([""]);
    setPeople([{ name: "", gender: "", age: "" }]);
    setPrivacy(false);
    setGuardian(false);
    setError(null);
    setDone(null);
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-6 text-center space-y-4">
        <p className="text-[15px]">대리 접수 완료</p>
        <p className="text-[56px] font-black tabular-nums">{done}</p>
        <Link href={`${ADMIN_COOKIE_PATH}?tab=pending&q=${encodeURIComponent(done)}`} className={btnDark}>
          바로 승인하러 가기
        </Link>
        <button className={btnGhost} onClick={reset}>
          새 대리 접수
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-[560px]">
      <p className="text-[14px] text-[#262120]/65">
        손님 휴대폰으로 인증번호를 보내고, 손님이 불러주는 6자리를 입력하세요. (문자 수신만 되면 됩니다)
      </p>

      <div className="rounded-3xl bg-white p-4 space-y-3">
        <p className="text-[14px] font-black">1. 휴대폰 인증</p>
        <input
          className={inputCls}
          inputMode="tel"
          placeholder="손님 휴대폰 번호"
          value={phone}
          disabled={!!token}
          onChange={(e) => {
            setPhone(e.target.value);
            setSent(false);
          }}
        />
        {!token && (
          <button
            className={btnGhost}
            disabled={pending || digits(phone).length < 10}
            onClick={() =>
              start(async () => {
                setError(null);
                const r = await proxyRequestOtpAction({ phone });
                if (r.ok) setSent(true);
                else setError(r.error ?? "실패");
              })
            }
          >
            {sent ? "인증번호 다시 보내기" : "인증번호 보내기"}
          </button>
        )}
        {sent && !token && (
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <input
              className={`${inputCls} tracking-[8px] text-center font-black`}
              inputMode="numeric"
              maxLength={6}
              placeholder="6자리"
              value={code}
              onChange={(e) => setCode(digits(e.target.value).slice(0, 6))}
            />
            <button
              className="h-14 px-5 rounded-2xl bg-[#262120] text-white font-black disabled:opacity-40"
              disabled={pending || code.length !== 6}
              onClick={() =>
                start(async () => {
                  setError(null);
                  const r = await proxyVerifyAction({ phone, code });
                  if (r.ok && r.token) setToken(r.token);
                  else setError(r.error ?? "실패");
                })
              }
            >
              확인
            </button>
          </div>
        )}
        {token && <p className="text-[14px] font-bold text-[#3E6E5C]">✓ 인증 완료 ({digits(phone)})</p>}
      </div>

      {token && (
        <>
          <div className="rounded-3xl bg-white p-4 space-y-3">
            <p className="text-[14px] font-black">2. 영수증 금액</p>
            {amounts.map((a, i) => (
              <input
                key={i}
                className={`${inputCls} text-right tabular-nums`}
                inputMode="numeric"
                placeholder={`영수증 ${i + 1} 금액(원)`}
                value={a ? Number(a).toLocaleString("ko-KR") : ""}
                onChange={(e) => {
                  const n = [...amounts];
                  n[i] = digits(e.target.value).slice(0, 8);
                  setAmounts(n);
                }}
              />
            ))}
            <button className={btnGhost} onClick={() => setAmounts([...amounts, ""])}>
              + 영수증 추가
            </button>
            <p className="text-[15px] font-black">
              합계 {total.toLocaleString("ko-KR")}원 → 최대 {max}명
            </p>
          </div>

          <div className="rounded-3xl bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-black">3. 참여자 ({people.length}명)</p>
              <div className="flex gap-2">
                <button
                  className="w-11 h-11 rounded-full bg-[#F5EEDF] text-[20px] font-black disabled:opacity-30"
                  disabled={people.length <= 1}
                  onClick={() => setPeople(people.slice(0, -1))}
                >
                  −
                </button>
                <button
                  className="w-11 h-11 rounded-full bg-[#F5EEDF] text-[20px] font-black disabled:opacity-30"
                  disabled={people.length >= Math.max(1, max)}
                  onClick={() => setPeople([...people, { name: "", gender: "", age: "" }])}
                >
                  +
                </button>
              </div>
            </div>
            {people.map((p, i) => (
              <div key={i} className="grid grid-cols-[2fr_auto_1fr] gap-2 items-center">
                <input
                  className={`${inputCls} h-12 text-[16px]`}
                  placeholder={i === 0 ? "대표 이름" : `동반 ${i} 이름`}
                  value={p.name}
                  onChange={(e) => {
                    const n = [...people];
                    n[i] = { ...p, name: e.target.value };
                    setPeople(n);
                  }}
                />
                <div className="flex gap-1">
                  {(["남", "여"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      className={`w-12 h-12 rounded-xl font-black border-2 ${
                        p.gender === g ? "bg-[#8C4A42] border-[#8C4A42] text-white" : "border-[#262120]/10"
                      }`}
                      onClick={() => {
                        const n = [...people];
                        n[i] = { ...p, gender: g };
                        setPeople(n);
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <input
                  className={`${inputCls} h-12 text-[16px] text-center`}
                  inputMode="numeric"
                  placeholder="나이"
                  value={p.age}
                  onChange={(e) => {
                    const n = [...people];
                    n[i] = { ...p, age: digits(e.target.value).slice(0, 3) };
                    setPeople(n);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-4 space-y-3">
            <label className="flex items-start gap-3">
              <input type="checkbox" className="w-6 h-6 accent-[#E07F74]" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} />
              <span className="text-[14px]">
                손님에게 수집 목적·항목·파기 시점(10/25)을 안내했고, <b>개인정보 수집·이용 동의</b>를 받았습니다.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="w-6 h-6 accent-[#E07F74]" checked={guardian} onChange={(e) => setGuardian(e.target.checked)} />
              <span className="text-[14px]">만 14세 미만 참여자가 있으면 대표가 법정대리인으로서 동의했습니다.</span>
            </label>
          </div>

          <button
            className={btnDark}
            disabled={pending}
            onClick={() =>
              start(async () => {
                setError(null);
                const participants: Participant[] = people.map((p) => ({
                  name: p.name,
                  gender: (p.gender || null) as Gender | null,
                  age: p.age === "" ? null : Number(p.age),
                }));
                const r = await proxySubmitAction({
                  token,
                  privacyConsent: privacy,
                  guardianConsent: guardian,
                  participants,
                  receipts,
                });
                if (r.ok && r.code) setDone(r.code);
                else setError(r.error ?? "실패");
              })
            }
          >
            {pending ? "저장 중…" : "대리 접수 저장"}
          </button>
        </>
      )}

      {error && <p className="text-[15px] font-bold text-[#B2453A]">{error}</p>}
    </div>
  );
}
