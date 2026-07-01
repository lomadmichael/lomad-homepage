"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { submitFestival, type FestivalFormState } from "@/lib/festival-action";
import {
  EXPERIENCES,
  CAMPING,
  experienceLabel,
  onlineCapacity,
  nonSlotOnlineCap,
  getExperience,
  experiencesTimeConflict,
  EXCLUSIVE_GROUP_LABELS,
} from "@/lib/festival-experiences";

const initialState: FestivalFormState = { success: false, message: "" };

type Avail = Record<string, { confirmed: number; waitlist: number }>;

interface ExpOption {
  key: string;
  slot: string | null;
  label: string;
  capacity: number;
  onlineCap: number;
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
        onlineCap: onlineCapacity(s.capacity),
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
          onlineCap: nonSlotOnlineCap(exp),
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
  const [camping, setCamping] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [tent, setTent] = useState<string>("no");
  // 폼 액션(useActionState) 후 React가 라디오를 native reset → controlled 상태와 desync.
  // state가 바뀔 때(제출 후) 라디오 그룹을 리마운트해 상태값으로 다시 그린다.
  const [resetKey, setResetKey] = useState(0);
  // 서버 검증 실패(예: 볼더링 연령 미달) 시 에러 메시지가 폼 상단에 뜨는데,
  // 하단 제출 버튼에서 누른 사용자에겐 화면 밖이라 안 보인다 → 에러 박스로 스크롤.
  const errorRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  useEffect(() => {
    setResetKey((k) => k + 1);
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (!state.success && state.message) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state]);

  function availKey(o: { key: string; slot: string | null }) {
    return o.slot ? `${o.key}|${o.slot}` : o.key;
  }
  function remaining(o: ExpOption) {
    return o.onlineCap - (availability[availKey(o)]?.confirmed ?? 0);
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
        // 같은 시간대로 겹치는 체험은 자동 해제 (중복 시간 신청 방지)
        kept = kept.filter((e) => !experiencesTimeConflict(o.key, o.slot, e.key, e.slot));
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

  // 체험 선택 UI (본인 블록·추가 참가자에서 공용)
  function renderExperiences(i: number) {
    const p = participants[i];
    if (!p) return null;
    return (
      <>
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
                    {full ? "[마감 · 대기 신청]" : `[잔여 ${rem}/${o.onlineCap}]`}
                  </span>
                  <br />
                  <span className="text-[11.5px] text-text-muted">{o.desc}</span>
                </span>
              </label>
            );
          })}
        </div>
      </>
    );
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
          입장 무료 · 일부 체험만 사전 예약 필요. 캠핑 무료(양양군 농업기술센터 후원) · 선셋 비치 테이블(2만원)만 현장 결제입니다.
          <br />
          참가자별로 나이와 신청 체험을 입력해 주세요. (연령 제한 체험 확인용)
        </p>
      </div>

      {/* 1인 1종목 안내 */}
      <div className="mb-8 p-4 border-l-4 border-[#FF6B6B] bg-[#FF6B6B]/8">
        <p className="font-[family-name:var(--font-noto)] text-[13px] font-semibold text-text leading-relaxed">
          서핑 · SUP · 랜드서핑 · 볼더링은 <b>한 분당 1종목만</b> 신청할 수 있습니다.
        </p>
        <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-relaxed mt-1">
          이 4종(수상·클라이밍) 중 하나를 고르면 다른 하나는 자동 해제됩니다. 또한 <b>같은 시간대 체험</b>은 함께 신청할 수 없습니다(겹치면 자동 해제).
        </p>
      </div>

      {state.message && !state.success && (
        <div
          ref={errorRef}
          className="mb-6 p-4 text-[13px] font-[family-name:var(--font-noto)] font-medium bg-[#C4A8A8]/20 text-[#6b3a3a] scroll-mt-6"
        >
          {state.message}
        </div>
      )}

      <form action={formAction}>
        <input type="hidden" name="participants_json" value={participantsPayload} />

        <input type="hidden" name="rep_name" value={participants[0]?.name.trim() ?? ""} />
        <input type="hidden" name="camping" value={camping} />
        <input type="hidden" name="tent_rental" value={camping ? tent : "no"} />

        <div className="space-y-5">
          {/* 대표 신청자(본인) */}
          <div className="border border-border p-4 md:p-5 bg-bg-soft">
            <p className="font-[family-name:var(--font-noto)] text-[13px] font-bold text-text mb-4">
              대표 신청자 (본인)
            </p>

            <div className="flex items-end gap-3 mb-4">
              <div className="flex-1">
                <label className={labelCls}>
                  이름 <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="text"
                  value={participants[0]?.name ?? ""}
                  onChange={(e) => updateParticipant(0, { name: e.target.value })}
                  className={inputCls}
                  placeholder="본인 이름"
                />
              </div>
              <div className="w-[110px]">
                <label className={labelCls}>
                  나이(만) <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={participants[0]?.age ?? ""}
                  onChange={(e) => updateParticipant(0, { age: e.target.value })}
                  className={inputCls}
                  placeholder="세"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelCls}>
                  연락처 <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  참가지역 <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="text"
                  name="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="예: 서울 마포구 · 양양 · 속초"
                  className={inputCls}
                />
              </div>
            </div>

            {/* 캠핑 (신청 그룹 공통) */}
            <div className="mb-4">
              <p className={labelCls}>
                캠핑 사이트 신청 <span className="text-text-muted font-normal">· 신청 그룹 공통</span>
                <span className="block text-[11px] font-normal text-[#0B7A5A] mt-0.5">양양군 농업기술센터 후원 · 데크·노지 모두 무료</span>
              </p>
              <div key={`camp-${resetKey}`} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className={radioCardCls}>
                  <input
                    type="radio"
                    name="camping_ui"
                    value=""
                    checked={camping === ""}
                    onChange={() => setCamping("")}
                    className="accent-text"
                  />
                  <span>신청 안 함</span>
                </label>
                {CAMPING.map((c) => {
                  const rem = campRemaining(c.key, c.capacity);
                  const full = rem <= 0;
                  return (
                    <label key={c.key} className={radioCardCls}>
                      <input
                        type="radio"
                        name="camping_ui"
                        value={c.key}
                        checked={camping === c.key}
                        onChange={() => setCamping(c.key)}
                        className="accent-text"
                      />
                      <span>
                        {c.label} <span className="text-text-muted">({c.fee})</span>
                        {c.key === "deck" && <span className="text-[#FF6B6B] font-bold"> 추천</span>}
                        <br />
                        <span className={`text-[11px] ${full ? "text-[#b45309]" : "text-text-muted"}`}>
                          {full ? "마감 · 대기 신청" : `잔여 ${rem}/${c.capacity}`}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>

              {camping !== "" && (
                <div className="mt-3 border border-border bg-bg p-3 md:p-4">
                  <p className={labelCls} style={{ marginBottom: 6 }}>
                    텐트 대여 필요 여부
                  </p>
                  <div key={`tent-${resetKey}`} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className={radioCardCls}>
                      <input
                        type="radio"
                        name="tent_ui"
                        value="no"
                        checked={tent === "no"}
                        onChange={() => setTent("no")}
                        className="accent-text"
                      />
                      <span>텐트 직접 지참</span>
                    </label>
                    <label className={radioCardCls}>
                      <input
                        type="radio"
                        name="tent_ui"
                        value="yes"
                        checked={tent === "yes"}
                        onChange={() => setTent("yes")}
                        className="accent-text"
                      />
                      <span>텐트 대여 필요</span>
                    </label>
                  </div>
                  <p className="mt-2 text-[11px] text-text-muted">
                    대여 희망 시 협의된 업체를 통해 결제하시면 되십니다. (금액 추후 안내)
                  </p>
                </div>
              )}
            </div>

            {renderExperiences(0)}
          </div>

          {/* 추가 참가자 (이름·나이·체험만) */}
          {participants.slice(1).map((p, j) => {
            const i = j + 1;
            return (
              <div key={i} className="border border-border p-4 md:p-5 bg-bg-soft">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-[family-name:var(--font-noto)] text-[13px] font-bold text-text">
                    참가자 {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeParticipant(i)}
                    className="text-[12px] text-text-muted hover:text-[#b45309] font-[family-name:var(--font-noto)]"
                  >
                    삭제
                  </button>
                </div>

                <div className="flex items-end gap-3 mb-4">
                  <div className="flex-1">
                    <label className={labelCls}>
                      이름 <span className="text-[#FF6B6B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => updateParticipant(i, { name: e.target.value })}
                      className={inputCls}
                      placeholder="참가자 이름"
                    />
                  </div>
                  <div className="w-[110px]">
                    <label className={labelCls}>
                      나이(만) <span className="text-[#FF6B6B]">*</span>
                    </label>
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
                </div>

                {renderExperiences(i)}
              </div>
            );
          })}
        </div>

        <button type="button" onClick={addParticipant} className={`${addBtnCls} mt-5`}>
          + 참가자 추가
        </button>
        <p className="mt-2 text-[11px] text-text-muted">
          함께 참가하는 분이 있으면 추가해 주세요. (이름·나이·체험만 입력)
        </p>

        <Field label="남기실 말씀 (선택)">
          <textarea
            name="note"
            className={`${inputCls} min-h-[90px] py-3 resize-y h-auto`}
            placeholder="알레르기 · 특이사항 · 문의사항 등"
          />
        </Field>

        <p className="text-[11px] text-text-muted italic mt-3 leading-relaxed">
          ※ 체험·캠핑은 무료이며(캠핑은 양양군 농업기술센터 후원), <b>선셋 비치 테이블(2만원)</b>만 현장 결제입니다. 확정 여부와 안내는 개별 연락드립니다.
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
