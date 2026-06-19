"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { submitFestival, type FestivalFormState } from "@/lib/festival-action";
import {
  EXPERIENCES,
  CAMPING,
  experienceLabel,
  onlineCapacity,
  getExperience,
  EXCLUSIVE_GROUP_LABELS,
} from "@/lib/festival-experiences";

const initialState: FestivalFormState = { success: false, message: "" };

type Avail = Record<string, { confirmed: number; waitlist: number }>;

interface ExpOption {
  key: string;
  slot: string | null;
  label: string;
  capacity: number;
  location: string;
  time?: string;
  fee?: string;
  ageLimit?: string;
  exclusiveGroup?: string;
  desc: string;
}

// EXPERIENCES → 선택 가능한 (체험·타임) 옵션 평면 목록
const OPTIONS: ExpOption[] = EXPERIENCES.flatMap((exp): ExpOption[] =>
  exp.slots
    ? exp.slots.map((s) => ({
        key: exp.key,
        slot: s.slot,
        label: `${exp.label} · ${s.label}`,
        capacity: s.capacity,
        location: exp.location,
        fee: exp.fee,
        ageLimit: exp.ageLimit,
        exclusiveGroup: exp.exclusiveGroup,
        desc: exp.desc,
      }))
    : [
        {
          key: exp.key,
          slot: null,
          label: exp.label,
          capacity: exp.capacity ?? 0,
          location: exp.location,
          time: exp.time,
          fee: exp.fee,
          ageLimit: exp.ageLimit,
          exclusiveGroup: exp.exclusiveGroup,
          desc: exp.desc,
        },
      ],
);

interface PExp {
  key: string;
  slot: string | null;
}
interface Participant {
  name: string;
  age: string;
  experiences: PExp[];
}

export default function RegistrationForm({ availability }: { availability: Avail }) {
  const [state, formAction, pending] = useActionState(submitFestival, initialState);
  const [participants, setParticipants] = useState<Participant[]>([
    { name: "", age: "", experiences: [] },
  ]);

  function availKey(o: { key: string; slot: string | null }) {
    return o.slot ? `${o.key}|${o.slot}` : o.key;
  }
  function remaining(o: ExpOption) {
    return onlineCapacity(o.capacity) - (availability[availKey(o)]?.confirmed ?? 0);
  }
  function campRemaining(key: "deck" | "noji", cap: number) {
    // 캠핑은 온라인 100%(전체 정원)
    return cap - (availability[`camping_${key}`]?.confirmed ?? 0);
  }

  function updateParticipant(i: number, patch: Partial<Participant>) {
    setParticipants((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function toggleExp(i: number, o: ExpOption) {
    setParticipants((prev) =>
      prev.map((p, idx) => {
        if (idx !== i) return p;
        const has = p.experiences.some((e) => e.key === o.key && e.slot === o.slot);
        if (has) {
          return { ...p, experiences: p.experiences.filter((e) => !(e.key === o.key && e.slot === o.slot)) };
        }
        // 배타 그룹(택1): 같은 그룹의 기존 선택을 해제하고 새로 선택
        let kept = p.experiences;
        if (o.exclusiveGroup) {
          kept = kept.filter((e) => getExperience(e.key)?.exclusiveGroup !== o.exclusiveGroup);
        }
        return { ...p, experiences: [...kept, { key: o.key, slot: o.slot }] };
      }),
    );
  }
  function addParticipant() {
    setParticipants((prev) => [...prev, { name: "", age: "", experiences: [] }]);
  }
  function removeParticipant(i: number) {
    setParticipants((prev) => prev.filter((_, idx) => idx !== i));
  }

  const participantsPayload = JSON.stringify(
    participants.map((p) => ({
      name: p.name.trim(),
      age: Number(p.age),
      experiences: p.experiences,
    })),
  );

  if (state.success) {
    const r = state.result;
    return (
      <div className="max-w-[560px] mx-auto py-[60px]">
        <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-4">
          Registration Complete
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[32px] font-black mb-5 leading-snug">
          접수가 완료되었습니다
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub leading-relaxed mb-6">
          {state.message}
        </p>
        {r && (r.confirmed.length > 0 || r.waitlisted.length > 0) && (
          <div className="mb-8 text-[13px] font-[family-name:var(--font-noto)] space-y-2">
            {r.confirmed.length > 0 && (
              <p>
                <span className="font-bold text-[#0B1F3A]">확정</span> ·{" "}
                {r.confirmed.map((c) => `${c.participant}(${experienceLabel(c.key, c.slot)})`).join(", ")}
              </p>
            )}
            {r.waitlisted.length > 0 && (
              <p>
                <span className="font-bold text-[#b45309]">대기</span> ·{" "}
                {r.waitlisted.map((c) => `${c.participant}(${experienceLabel(c.key, c.slot)})`).join(", ")}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" href="/projects/hyeonnam-festival/my">
            내 신청 조회
          </Button>
          <Button variant="outline" href="/projects/hyeonnam-festival">
            페스티벌 페이지로
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <Link
          href="/projects/hyeonnam-festival"
          className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text mb-4 inline-flex items-center gap-1"
        >
          ← Festival Home
        </Link>
        <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[3px] uppercase text-[#FF6B6B] mb-3">
          Register
        </p>
        <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[40px] font-black mb-3 leading-tight">
          참가 신청
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-[13px] md:text-[14px] text-text-sub leading-relaxed">
          입장 무료 · 일부 체험만 사전 예약 필요. 체험비·캠핑비는 현장 결제입니다.
          <br />
          참가자별로 나이와 신청 체험을 입력해 주세요. (연령 제한 체험 확인용)
        </p>
      </div>

      {state.message && !state.success && (
        <div className="mb-6 p-4 text-[13px] font-[family-name:var(--font-noto)] font-medium bg-[#C4A8A8]/20 text-[#6b3a3a]">
          {state.message}
        </div>
      )}

      <form action={formAction}>
        <input type="hidden" name="participants_json" value={participantsPayload} />

        {/* 신청자(대표) 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="신청자명" required>
            <input type="text" name="rep_name" required className={inputCls} />
          </Field>
          <Field label="연락처" required>
            <input type="tel" name="phone" required placeholder="010-1234-5678" className={inputCls} />
          </Field>
        </div>
        <Field label="참가지역" required>
          <input type="text" name="region" required placeholder="예: 서울 마포구 · 양양 · 속초" className={inputCls} />
        </Field>

        {/* 캠핑 */}
        <div className="mb-6">
          <p className={labelCls}>캠핑 사이트 신청</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <label className={radioCardCls}>
              <input type="radio" name="camping" value="" defaultChecked className="accent-text" />
              <span>신청 안 함</span>
            </label>
            {CAMPING.map((c) => {
              const rem = campRemaining(c.key, c.capacity);
              const full = rem <= 0;
              return (
                <label key={c.key} className={radioCardCls}>
                  <input type="radio" name="camping" value={c.key} className="accent-text" />
                  <span>
                    {c.label} <span className="text-text-muted">({c.fee})</span>
                    <br />
                    <span className={`text-[11px] ${full ? "text-[#b45309]" : "text-text-muted"}`}>
                      {full ? "마감 · 대기 신청" : `잔여 ${rem}/${c.capacity}`}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 참가자 명단 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className={labelCls} style={{ marginBottom: 0 }}>
              참가자 ({participants.length}명)
            </p>
            <button type="button" onClick={addParticipant} className={addBtnCls}>
              + 참가자 추가
            </button>
          </div>

          <div className="space-y-5">
            {participants.map((p, i) => (
              <div key={i} className="border border-border p-4 md:p-5 bg-bg-soft">
                <div className="flex items-end gap-3 mb-4">
                  <div className="flex-1">
                    <label className={labelCls}>이름</label>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => updateParticipant(i, { name: e.target.value })}
                      className={inputCls}
                      placeholder="참가자 이름"
                    />
                  </div>
                  <div className="w-[110px]">
                    <label className={labelCls}>나이(만)</label>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={p.age}
                      onChange={(e) => updateParticipant(i, { age: e.target.value })}
                      className={inputCls}
                      placeholder="세"
                    />
                  </div>
                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParticipant(i)}
                      className="h-11 px-3 text-[12px] text-text-muted hover:text-[#b45309] font-[family-name:var(--font-noto)]"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <p className="font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub mb-1">
                  신청 체험 (복수 선택)
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[11px] text-[#b45309] mb-2">
                  ※ {EXCLUSIVE_GROUP_LABELS.activity}
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {OPTIONS.map((o) => {
                    const rem = remaining(o);
                    const full = rem <= 0;
                    const checked = p.experiences.some((e) => e.key === o.key && e.slot === o.slot);
                    return (
                      <label
                        key={`${o.key}-${o.slot ?? ""}`}
                        className="flex items-start gap-2.5 cursor-pointer py-1.5 px-2 hover:bg-bg rounded"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleExp(i, o)}
                          className="mt-0.5 w-4 h-4 cursor-pointer accent-text shrink-0"
                        />
                        <span className="text-[13px] font-[family-name:var(--font-noto)] leading-snug">
                          <span className="font-semibold">{o.label}</span>
                          <span className="text-text-muted"> · {o.location}</span>
                          {o.time && <span className="text-text-muted"> · {o.time}</span>}
                          {o.fee && <span className="text-text-muted"> · {o.fee}</span>}
                          {o.ageLimit && <span className="text-[#b45309]"> · {o.ageLimit}</span>}
                          <span className={`ml-1 text-[11px] font-medium ${full ? "text-[#b45309]" : "text-[#0B7A5A]"}`}>
                            {full ? "[마감 · 대기 신청]" : `[잔여 ${rem}/${onlineCapacity(o.capacity)}]`}
                          </span>
                          <br />
                          <span className="text-[11.5px] text-text-muted">{o.desc}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Field label="남기실 말씀 (선택)">
          <textarea
            name="note"
            className={`${inputCls} min-h-[90px] py-3 resize-y h-auto`}
            placeholder="알레르기 · 특이사항 · 문의사항 등"
          />
        </Field>

        <p className="text-[11px] text-text-muted italic mt-3 leading-relaxed">
          ※ 체험은 무료이며, <b>선셋 비치 테이블(2만원)·캠핑 데크(1만원)</b>만 현장 결제입니다. 확정 여부와 안내는 개별 연락드립니다.
          <br />※ 정원이 찬 체험은 <b>대기</b>로 접수되며, 취소자가 생기면 순서대로 자동 확정·문자 안내됩니다.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="primary" type="submit">
            {pending ? "접수 중..." : "접수하기"}
          </Button>
          <Button variant="outline" href="/projects/hyeonnam-festival">
            취소
          </Button>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "w-full bg-input-bg h-11 px-3 font-[family-name:var(--font-noto)] text-sm font-medium outline-none";
const labelCls = "font-[family-name:var(--font-noto)] text-[12px] font-semibold text-text-sub block mb-1.5";
const radioCardCls =
  "flex items-center gap-2 border border-border px-3 py-2.5 cursor-pointer text-[13px] font-[family-name:var(--font-noto)] hover:border-text";
const addBtnCls =
  "font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[1px] uppercase border border-text px-3 py-2 hover:bg-text hover:text-bg transition-colors";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className={labelCls}>
        {label} {required && <span className="text-[#FF6B6B]">*</span>}
      </label>
      {children}
    </div>
  );
}
