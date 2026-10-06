"use client";

import { useMemo, useState, useTransition } from "react";
import {
  BASE_PATH,
  PRICE_UNIT,
  PURGE_DEADLINE,
  dateLabel,
  maxPartySize,
  receiptTotal,
  validateApplication,
  type Gender,
  type Participant,
} from "@/lib/customhouse-config";
import { submitApplicationAction } from "../actions";
import PhoneOtp from "../_components/PhoneOtp";
import AlreadyJoined from "../_components/AlreadyJoined";
import { Card, ReceiptZig, btnGhost, btnPrimary, inputCls } from "../_components/Shell";

type Step = "phone" | "consent" | "receipts" | "participants";
const STEPS: { key: Step; label: string }[] = [
  { key: "phone", label: "인증" },
  { key: "consent", label: "동의" },
  { key: "receipts", label: "영수증" },
  { key: "participants", label: "참여자" },
];

interface ReceiptRow {
  amount: string;
  store: string;
}
interface PRow {
  name: string;
  gender: Gender | "";
  age: string;
}

const won = (n: number) => `${n.toLocaleString("ko-KR")}원`;
const digits = (s: string) => s.replace(/\D/g, "").replace(/^0+(?=\d)/, "");

export default function ApplyFlow({ verified }: { verified: boolean }) {
  const [step, setStep] = useState<Step>(verified ? "consent" : "phone");
  const [already, setAlready] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [receipts, setReceipts] = useState<ReceiptRow[]>([{ amount: "", store: "" }]);
  const [people, setPeople] = useState<PRow[]>([{ name: "", gender: "", age: "" }]);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const parsedReceipts = useMemo(
    () => receipts.map((r) => ({ amount: Number(r.amount || 0), store: r.store.trim() || null })),
    [receipts],
  );
  const total = receiptTotal(parsedReceipts);
  const max = maxPartySize(total);
  const hasMinor = people.some((p) => p.age !== "" && Number(p.age) < 14);

  if (already) return <AlreadyJoined />;

  const stepIdx = STEPS.findIndex((s) => s.key === step);

  const setCount = (n: number) => {
    setPeople((prev) => {
      const next = prev.slice(0, n);
      while (next.length < n) next.push({ name: "", gender: "", age: "" });
      return next;
    });
  };

  const submit = () =>
    start(async () => {
      setError(null);
      const participants: Participant[] = people.map((p) => ({
        name: p.name,
        gender: (p.gender || null) as Gender | null,
        age: p.age === "" ? null : Number(p.age),
      }));
      const v = validateApplication({ participants, receipts: parsedReceipts, guardianConsent: guardian });
      if (!v.ok) {
        setError(v.error);
        return;
      }
      const r = await submitApplicationAction({
        privacyConsent: privacy,
        guardianConsent: guardian,
        participants,
        receipts: parsedReceipts,
      });
      if (r.ok) {
        // 전체 이동(하드 내비게이션): 접수 직후 회차권(대기) 화면을 확실히 새로 그린다.
        window.location.assign(`${BASE_PATH}/ticket`);
      } else if (r.duplicate) {
        setAlready(true);
      } else {
        setError(r.error ?? "다시 시도해 주세요.");
      }
    });

  return (
    <div>
      {/* 진행 표시 */}
      <ol className="relative flex justify-between mb-7 px-1" aria-label="진행 단계">
        <span aria-hidden className="absolute left-7 right-7 top-[20px] h-[3px] bg-[#262120]/20" />
        <span
          aria-hidden
          className="absolute left-7 top-[20px] h-[3px] bg-[#262120] transition-[width]"
          style={{ width: `calc((100% - 3.5rem) * ${stepIdx / (STEPS.length - 1)})` }}
        />
        {STEPS.map((s, i) => {
          const done = i < stepIdx;
          const cur = i === stepIdx;
          return (
            <li key={s.key} className="relative flex flex-col items-center w-14" aria-current={cur ? "step" : undefined}>
              <span
                className={`sx-hand w-11 h-11 rounded-full border-[3px] flex items-center justify-center text-[20px] pt-0.5 ${
                  cur
                    ? "bg-[#E07F74] border-[#262120] text-white shadow-[3px_4px_0_#262120] -rotate-[4deg]"
                    : done
                      ? "bg-[#262120] border-[#262120] text-[#F5EEDF]"
                      : "bg-[#FBF7EE] border-[#262120]/30 text-[#262120]/40"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span className={`sx-hand mt-1.5 text-[15px] ${cur ? "text-[#262120]" : "text-[#262120]/45"}`}>{s.label}</span>
            </li>
          );
        })}
      </ol>

      {step === "phone" && (
        <>
          <StepTitle>휴대폰 인증</StepTitle>
          <Card>
            <PhoneOtp
              purpose="apply"
              onVerified={(r) => {
                if (r.existing) setAlready(true);
                else setStep("consent");
              }}
            />
          </Card>
        </>
      )}

      {step === "consent" && (
        <>
          <StepTitle>개인정보 수집·이용 동의</StepTitle>
          <Card className="mb-5 text-[14px] leading-relaxed space-y-2.5">
            <p>
              <b className="text-[#8C4A42]">수집 목적</b> · 중복 참여 확인, 회차 배정·안내 문자 발송
            </p>
            <p>
              <b className="text-[#8C4A42]">수집 항목</b> · 대표 휴대폰 번호, 참여자 이름·성별·나이, 영수증 금액·가게명(선택)
            </p>
            <p>
              <b className="text-[#8C4A42]">보유 기간</b> · 행사 종료 후 7일 이내({dateLabel(PURGE_DEADLINE)}까지) 파기. 이후엔 개인을 알아볼 수 없는
              통계(인원·성별·연령대·영수증 합계)만 남겨요.
            </p>
            <p>
              <b className="text-[#8C4A42]">동의 거부</b> · 동의하지 않으실 수 있지만, 이 경우 체험에 참여할 수 없어요.
            </p>
          </Card>
          <label className={`${checkRow} mb-3 ${privacy ? "bg-[#FCE3DE]" : "bg-white"}`}>
            <input
              type="checkbox"
              className="sx-check mt-px"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
            />
            <span className="text-[16px] font-bold">[필수] 개인정보 수집·이용에 동의합니다.</span>
          </label>
          <label className={`${checkRow} mb-7 ${guardian ? "bg-[#FCE3DE]" : "bg-white"}`}>
            <input
              type="checkbox"
              className="sx-check mt-px"
              checked={guardian}
              onChange={(e) => setGuardian(e.target.checked)}
            />
            <span className="text-[15px] leading-snug">
              <b>[만 14세 미만 동반 시 필수]</b> 함께 참여하는 만 14세 미만 아동의 법정대리인으로서, 아동의 개인정보
              수집·이용에 동의합니다.
            </span>
          </label>
          <button className={btnPrimary} disabled={!privacy} onClick={() => setStep("receipts")}>
            다음
          </button>
        </>
      )}

      {step === "receipts" && (
        <>
          <StepTitle>영수증 금액</StepTitle>
          <p className="text-[15px] font-medium text-[#262120]/75 mb-7 break-keep">
            양양 관내에서 <b className="sx-hl text-[#8C4A42]">오늘</b> 쓴 영수증만 인정돼요. 여러 장이면 모두 추가해 주세요. 데스크에서 실물을 확인해요.
          </p>

          <section className="sx-rcpt pt-6 pb-6 mr-1.5 mb-9">
            <p className="sx-rhead text-[12px]">RECEIPT · 양양송이연어축제</p>
            <div className="px-4 mt-4 space-y-4">
              {receipts.map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5 min-h-[32px]">
                    <span className="sx-hand text-[17px] text-[#8C4A42]">영수증 {i + 1}</span>
                    {receipts.length > 1 && (
                      <button
                        type="button"
                        className="text-[14px] font-bold text-[#262120]/55 underline underline-offset-2 px-2 min-h-[40px]"
                        onClick={() => setReceipts(receipts.filter((_, j) => j !== i))}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                  <div className="relative mb-2">
                    <input
                      className={`${inputCls} pr-11 text-right text-[22px] font-black tabular-nums`}
                      inputMode="numeric"
                      placeholder="금액"
                      aria-label={`영수증 ${i + 1} 금액`}
                      value={r.amount ? Number(r.amount).toLocaleString("ko-KR") : ""}
                      onChange={(e) => {
                        const next = [...receipts];
                        next[i] = { ...r, amount: digits(e.target.value).slice(0, 8) };
                        setReceipts(next);
                      }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[17px] font-bold text-[#262120]/55">원</span>
                  </div>
                  <input
                    className={`${inputCls} h-12 text-[15px]`}
                    placeholder="가게 이름 (선택)"
                    aria-label={`영수증 ${i + 1} 가게 이름`}
                    value={r.store}
                    maxLength={40}
                    onChange={(e) => {
                      const next = [...receipts];
                      next[i] = { ...r, store: e.target.value };
                      setReceipts(next);
                    }}
                  />
                  <div className="sx-dash mt-4" />
                </div>
              ))}
            </div>
            <div className="px-4 mt-4">
              <button
                type="button"
                className={btnGhost}
                disabled={receipts.length >= 20}
                onClick={() => setReceipts([...receipts, { amount: "", store: "" }])}
              >
                + 영수증 추가
              </button>
            </div>

            <div className="sx-dash mx-4 mt-5" />
            <div className="px-5 pt-4" aria-live="polite">
              <div className="flex items-baseline justify-between gap-3">
                <span className="sx-hand text-[20px]">합계</span>
                <span className="sx-hl text-[34px] font-black text-[#8C4A42] tabular-nums tracking-[-0.02em]">{won(total)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 mt-3">
                <span className="sx-hand text-[20px]">참여 가능 인원</span>
                <span
                  className={`sx-hand text-[24px] rounded-[12px] border-[3px] border-[#262120] px-3 pt-1 pb-0.5 ${
                    max > 0 ? "bg-[#E07F74] text-white -rotate-[2deg] shadow-[3px_4px_0_#262120]" : "bg-[#FBF7EE] text-[#262120]/50"
                  }`}
                >
                  최대 {max}명
                </span>
              </div>
              {max === 0 && (
                <p className="text-[14px] font-semibold mt-3 text-[#8C4A42] break-keep">
                  {won(PRICE_UNIT)} 이상부터 참여할 수 있어요 ({won(Math.max(0, PRICE_UNIT - total))} 더 필요)
                </p>
              )}
            </div>
            <ReceiptZig />
          </section>

          <div className="grid grid-cols-[1fr_2fr] gap-3">
            <button className={btnGhost} onClick={() => setStep("consent")}>
              이전
            </button>
            <button
              className={btnPrimary}
              disabled={max < 1}
              onClick={() => {
                if (people.length > max) setCount(max);
                setStep("participants");
              }}
            >
              다음
            </button>
          </div>
        </>
      )}

      {step === "participants" && (
        <>
          <StepTitle>참여자</StepTitle>
          <p className="text-[15px] font-medium text-[#262120]/75 mb-5">
            영수증 합계 {won(total)} → 최대 <b className="sx-hl text-[#8C4A42]">{max}명</b>까지 함께할 수 있어요.
          </p>

          <div className="flex items-center justify-between rounded-[20px] border-[3px] border-[#262120] bg-[#FBF7EE] shadow-[4px_5px_0_#262120] px-4 py-3 mb-6">
            <span className="sx-hand text-[20px]">인원</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="인원 줄이기"
                className={stepBtn}
                disabled={people.length <= 1}
                onClick={() => setCount(people.length - 1)}
              >
                −
              </button>
              <span className="sx-hand w-10 text-center text-[30px] tabular-nums">{people.length}</span>
              <button
                type="button"
                aria-label="인원 늘리기"
                className={stepBtn}
                disabled={people.length >= max}
                onClick={() => setCount(people.length + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-6 mb-6">
            {people.map((p, i) => (
              <div
                key={i}
                className="relative rounded-[20px] border-[3px] border-[#262120] bg-white px-3 pt-6 pb-3 space-y-2 shadow-[4px_5px_0_#262120]"
              >
                <span
                  className={`sx-hand absolute -top-[15px] left-3 rounded-full border-[3px] border-[#262120] px-3 pt-0.5 text-[15px] leading-[1.5] ${
                    i === 0 ? "bg-[#8C4A42] text-white" : "bg-[#98AB5A] text-white"
                  }`}
                >
                  {i === 0 ? "대표(본인)" : `동반 ${i}`}
                </span>
                <input
                  className={inputCls}
                  placeholder="이름"
                  aria-label={i === 0 ? "대표 이름" : `동반 ${i} 이름`}
                  value={p.name}
                  maxLength={30}
                  autoComplete={i === 0 ? "name" : "off"}
                  onChange={(e) => {
                    const next = [...people];
                    next[i] = { ...p, name: e.target.value };
                    setPeople(next);
                  }}
                />
                <div className="grid grid-cols-[1fr_1fr_1.2fr] gap-2">
                  {(["남", "여"] as Gender[]).map((g) => (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={p.gender === g}
                      className={`h-14 rounded-2xl text-[18px] font-black border-[3px] border-[#262120] ${
                        p.gender === g
                          ? "bg-[#8C4A42] text-white shadow-[inset_0_-4px_0_rgba(0,0,0,.18)]"
                          : "bg-[#FBF7EE] text-[#262120]/60"
                      }`}
                      onClick={() => {
                        const next = [...people];
                        next[i] = { ...p, gender: g };
                        setPeople(next);
                      }}
                    >
                      {g}
                    </button>
                  ))}
                  <div className="relative">
                    <input
                      className={`${inputCls} pr-9 text-center`}
                      inputMode="numeric"
                      placeholder="나이"
                      aria-label={i === 0 ? "대표 나이" : `동반 ${i} 나이`}
                      value={p.age}
                      onChange={(e) => {
                        const next = [...people];
                        next[i] = { ...p, age: digits(e.target.value).slice(0, 3) };
                        setPeople(next);
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[15px] font-bold text-[#262120]/55">세</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMinor && (
            <label className={`${checkRow} mb-5 ${guardian ? "bg-[#FCE3DE]" : "bg-[#FBEBD0]"}`}>
              <input
                type="checkbox"
                className="sx-check mt-px"
                checked={guardian}
                onChange={(e) => setGuardian(e.target.checked)}
              />
              <span className="text-[15px] leading-snug">
                만 14세 미만 참여자가 있어요. 법정대리인으로서 아동의 개인정보 수집·이용에 동의합니다. <b>(필수)</b>
              </span>
            </label>
          )}

          {error && (
            <p className="text-[15px] font-bold text-[#B2453A] mb-4 rounded-xl border-[3px] border-[#B2453A] bg-white px-3 py-2">
              {error}
            </p>
          )}

          <div className="grid grid-cols-[1fr_2fr] gap-3">
            <button className={btnGhost} disabled={pending} onClick={() => setStep("receipts")}>
              이전
            </button>
            <button className={btnPrimary} disabled={pending} onClick={submit}>
              {pending ? "접수 중…" : "접수하기"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const checkRow =
  "flex items-start gap-3 rounded-[18px] border-[3px] border-[#262120] px-4 py-4 cursor-pointer shadow-[3px_4px_0_#262120]";
const stepBtn =
  "sx-press w-12 h-12 rounded-full border-[3px] border-[#262120] bg-white text-[24px] font-black shadow-[2px_3px_0_#262120] disabled:opacity-30 disabled:shadow-none";

function StepTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="sx-hand text-[30px] leading-tight mb-4 break-keep">{children}</h1>;
}
