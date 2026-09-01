"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { submitAinbConsent, type ConsentFormState } from "@/lib/ainb-consent-action";

const POSTCODE_SRC = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

declare global {
  interface Window {
    daum?: {
      Postcode: new (opts: {
        oncomplete: (data: { roadAddress: string; jibunAddress: string; zonecode: string }) => void;
        onclose?: () => void;
      }) => { open: () => void };
    };
  }
}

const initial: ConsentFormState = { success: false, message: "" };

const LABEL = "font-[family-name:var(--font-noto)] text-[13px] font-bold mb-2 block";
const INPUT =
  "w-full border border-border bg-bg px-4 py-3 text-[14px] font-[family-name:var(--font-noto)] " +
  "outline-none focus:border-text transition-colors";
const HELP = "font-[family-name:var(--font-noto)] text-[12px] text-text-sub mt-2 leading-relaxed";

function Check({
  name,
  required = true,
  title,
  desc,
  defaultChecked,
}: {
  name: string;
  required?: boolean;
  title: string;
  desc?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex gap-3 border border-border bg-bg px-4 py-4 cursor-pointer hover:border-text transition-colors">
      <input
        type="checkbox"
        name={name}
        required={required}
        defaultChecked={defaultChecked}
        className="accent-text mt-[3px] shrink-0"
      />
      <span>
        <span className="font-[family-name:var(--font-noto)] text-[14px] font-bold">
          {required && <span className="text-[#C0392B] mr-1">*</span>}
          {title}
        </span>
        {desc && <span className={HELP + " block"}>{desc}</span>}
      </span>
    </label>
  );
}

export default function ConsentForm() {
  const [state, formAction, pending] = useActionState(submitAinbConsent, initial);
  // 검증에 걸려 되돌아왔을 때 입력값을 그대로 복원한다(주민등록번호만 다시 입력).
  const prev = state.values;

  // 주소: 다음(카카오) 우편번호 서비스로 검색 → 상세주소만 직접 입력
  const [baseAddr, setBaseAddr] = useState("");
  const [detailAddr, setDetailAddr] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const detailRef = useRef<HTMLInputElement>(null);

  // 검증 실패로 돌아왔을 때 이전 주소 복원
  useEffect(() => {
    if (prev?.address && !baseAddr && !detailAddr) setBaseAddr(prev.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prev?.address]);

  useEffect(() => {
    if (window.daum?.Postcode) {
      setScriptReady(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${POSTCODE_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => setScriptReady(true));
      return;
    }
    const el = document.createElement("script");
    el.src = POSTCODE_SRC;
    el.async = true;
    el.onload = () => setScriptReady(true);
    document.body.appendChild(el);
  }, []);

  const openPostcode = useCallback(() => {
    if (!window.daum?.Postcode) return;
    new window.daum.Postcode({
      oncomplete: (data) => {
        setZonecode(data.zonecode);
        setBaseAddr(data.roadAddress || data.jibunAddress);
        setTimeout(() => detailRef.current?.focus(), 50);
      },
    }).open();
  }, []);

  const fullAddress = [zonecode ? `(${zonecode})` : "", baseAddr, detailAddr]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (state.success) {
    return (
      <div className="border border-border bg-bg-soft p-8 text-center">
        <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#0B7A5A] mb-3">
          Submitted
        </p>
        <h2 className="font-[family-name:var(--font-noto)] text-[22px] font-black mb-3">
          참가 동의서가 제출되었습니다
        </h2>
        <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub leading-relaxed">
          {state.updated
            ? "기존에 제출하신 내용을 새로 입력하신 내용으로 수정했습니다."
            : "여행자 보험 가입과 참가비 환불 절차에 활용됩니다."}
          <br />
          작성해 주셔서 감사합니다.
        </p>
        <p className={HELP}>
          수정이 필요하시면 같은 휴대전화 번호로 다시 제출하시면 됩니다.
          <br />
          문의 lomad.coop@naver.com · 010-9542-3775
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-10">
      {/* 1. 개인정보 수집 및 이용 동의 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
          <span className="text-[#C0392B] mr-1">*</span>1. 개인정보 수집 및 이용 동의
        </legend>
        <p className={HELP + " !mt-0 mb-3"}>동의를 거부하실 수 있으나 참가가 불가능합니다.</p>
        <div className="border border-border bg-bg-soft p-5 mb-3 space-y-2">
          {[
            ["수집하는 개인정보 항목", "이름, 주소, 주민등록번호"],
            ["수집 및 이용 목적", "여행자보험 가입"],
            ["보유 및 이용기간", "여행자 보험 가입 후 즉시파기"],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-4 text-[13px] font-[family-name:var(--font-noto)]">
              <span className="text-text-sub w-[140px] shrink-0">{k}</span>
              <span className={`font-bold ${k.startsWith("보유") ? "text-[#C0392B]" : ""}`}>{v}</span>
            </div>
          ))}
        </div>
        <Check defaultChecked={prev?.consent_privacy} name="consent_privacy" title="개인정보 수집 및 이용에 동의합니다." />
      </fieldset>

      {/* 참가자 확인 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-4">
          참가자 확인
        </legend>
        <div className="space-y-5">
          <div>
            <label className={LABEL}>
              <span className="text-[#C0392B] mr-1">*</span>참가 기수
            </label>
            <div className="flex gap-3">
              {["1기", "2기"].map((c) => (
                <label
                  key={c}
                  className="flex-1 flex items-center justify-center gap-2 border border-border bg-bg px-4 py-3 text-[14px] cursor-pointer hover:border-text transition-colors"
                >
                  <input
                    type="radio"
                    name="cohort"
                    value={c}
                    defaultChecked={prev?.cohort === c}
                    className="accent-text"
                    required
                  />
                  <span className="font-[family-name:var(--font-noto)] font-bold">{c}</span>
                  <span className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub">
                    {c === "1기" ? "9/3~9/6" : "9/10~9/13"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={LABEL} htmlFor="name">
                <span className="text-[#C0392B] mr-1">*</span>성명
              </label>
              <input
                id="name"
                name="name"
                className={INPUT}
                required
                defaultValue={prev?.name}
                placeholder="신청하신 성함"
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="phone">
                <span className="text-[#C0392B] mr-1">*</span>휴대전화
              </label>
              <input
                id="phone"
                name="phone"
                className={INPUT}
                required
                inputMode="numeric"
                defaultValue={prev?.phone}
                pattern="01[016789][- ]?[0-9]{3,4}[- ]?[0-9]{4}"
                title="휴대전화 번호를 정확히 입력해 주세요 (예: 010-1234-5678)"
                placeholder="010-0000-0000"
              />
            </div>
          </div>
          <div>
            <label className={LABEL} htmlFor="email">
              이메일 <span className="text-text-sub font-normal">(선택)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={INPUT}
              defaultValue={prev?.email}
              placeholder="선택 입력"
            />
          </div>
        </div>
      </fieldset>

      {/* 2·3. 프로그램 / 보험 동의 */}
      <fieldset className="space-y-3">
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
          프로그램 및 보험 동의
        </legend>
        <Check
          defaultChecked={prev?.consent_program}
          name="consent_program"
          title="2. 바들바들 현남생활 프로그램을 숙지하였고, 일정 및 내용에 동의합니다."
        />
        <Check defaultChecked={prev?.consent_insurance} name="consent_insurance" title="3. 여행자 보험 가입에 동의합니다." />
      </fieldset>

      {/* 4·5·6. 보험 가입 정보 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-4">
          여행자 보험 가입 정보
        </legend>
        <div className="space-y-5">
          <div>
            <label className={LABEL} htmlFor="insured_name">
              <span className="text-[#C0392B] mr-1">*</span>4. 보험 가입을 위한 이름
            </label>
            <input
              id="insured_name"
              name="insured_name"
              className={INPUT}
              required
              defaultValue={prev?.insured_name}
              placeholder="주민등록상 이름"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="address_base">
              <span className="text-[#C0392B] mr-1">*</span>5. 보험 가입을 위한 주소
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  id="address_base"
                  className={INPUT + " flex-1 bg-bg-soft"}
                  value={zonecode ? `(${zonecode}) ${baseAddr}` : baseAddr}
                  readOnly
                  placeholder="주소 검색을 눌러 주세요"
                  onClick={openPostcode}
                />
                <button
                  type="button"
                  onClick={openPostcode}
                  disabled={!scriptReady}
                  className="shrink-0 px-5 bg-text text-bg font-[family-name:var(--font-noto)] text-[14px] font-bold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  주소 검색
                </button>
              </div>
              <input
                ref={detailRef}
                className={INPUT}
                value={detailAddr}
                onChange={(e) => setDetailAddr(e.target.value)}
                placeholder="상세주소 (동·호수 등)"
              />
              {/* 서버로는 합쳐진 전체 주소를 보낸다 */}
              <input type="hidden" name="address" value={fullAddress} />
            </div>
            <p className={HELP}>
              주소 검색 버튼을 눌러 주소를 선택하신 뒤, 상세주소를 입력해 주세요.
            </p>
          </div>
          <div>
            <label className={LABEL} htmlFor="rrn">
              <span className="text-[#C0392B] mr-1">*</span>6. 보험 가입을 위한 주민등록번호
            </label>
            <input
              id="rrn"
              name="rrn"
              className={INPUT}
              required
              inputMode="numeric"
              autoComplete="off"
              pattern="[0-9]{6}[- ]?[0-9]{7}"
              title="주민등록번호 13자리를 입력해 주세요 (예: 900101-1234567)"
              placeholder="000000-0000000"
            />
            <p className={HELP}>
              일정 시작 전 보험 가입을 위한 절차입니다. 입력하신 주민등록번호는{" "}
              <strong>암호화하여 보관하고, 보험 가입 완료 즉시 파기</strong>합니다.
            </p>
          </div>
        </div>
      </fieldset>

      {/* 7. 촬영 동의 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
          촬영 동의
        </legend>
        <Check
          name="consent_media"
          title="7. 프로그램 중 활동 모습을 담은 사진과 영상 촬영에 동의합니다."
          desc="촬영된 사진이나 영상은 SNS나 보고서, 운영리포트 등에도 사용될 수 있음을 참고해 주세요."
        />
      </fieldset>

      {/* 8·9. 참가비 환불 */}
      <fieldset>
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
          참가비 환불
        </legend>
        <div className="space-y-5">
          <Check
            name="consent_refund"
            title="8. 참가비 지불 후 결과보고서 및 프로그램 결과물 제출 시 환불하는 내용을 숙지하고 동의합니다."
            desc="참가비는 환불 조건으로 인해 계좌이체만 가능한 점 참고해 주세요."
          />
          <div>
            <label className={LABEL} htmlFor="refund_account">
              <span className="text-[#C0392B] mr-1">*</span>9. 참가비 환불을 위한 통장 계좌번호
            </label>
            <input
              id="refund_account"
              name="refund_account"
              className={INPUT}
              required
              defaultValue={prev?.refund_account}
              placeholder="예) 농협 301-0000-0000-00 홍길동"
            />
            <p className={HELP}>계좌번호 / 은행명 / 예금주를 함께 기입해 주시면 됩니다.</p>
          </div>
        </div>
      </fieldset>

      {/* 10·11. 안전·수칙 */}
      <fieldset className="space-y-3">
        <legend className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
          안전 및 준수사항
        </legend>
        <Check
          name="consent_selfrisk"
          title="10. 자율 프로그램 시 사고는 본인 책임이라는 부분에 동의합니다."
          desc="체험 프로그램 및 필수 프로그램(서핑, 그림, 러닝, 요가 등)을 제외하고 개인이 보내는 시간에 발생하는 사고를 말합니다."
        />
        <Check
          name="consent_rules"
          title="11. 바들바들 현남생활에서 제시하는 이용수칙 및 준수사항 이행에 동의합니다."
        />
      </fieldset>

      {/* 기타 */}
      <fieldset>
        <label className={LABEL} htmlFor="note">
          남기실 말씀 <span className="text-text-sub font-normal">(선택)</span>
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          className={INPUT}
          defaultValue={prev?.note}
          placeholder="알레르기, 복용약 등 운영진이 알아야 할 사항이 있으면 적어주세요."
        />
      </fieldset>

      {state.message && !state.success && (
        <p className="border border-[#C0392B] bg-[#FBD5D0] px-4 py-3 text-[13px] font-[family-name:var(--font-noto)] text-[#8E2A1E]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-text text-bg py-4 font-[family-name:var(--font-noto)] text-[15px] font-black disabled:opacity-50 hover:opacity-90 transition-opacity"
      >
        {pending ? "제출 중…" : "참가 동의서 제출"}
      </button>

      <p className={HELP + " text-center"}>
        제출 후 수정이 필요하시면 같은 휴대전화 번호로 다시 제출하시면 됩니다.
        <br />
        문의 lomad.coop@naver.com · 010-9542-3775
      </p>
    </form>
  );
}
