/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  BASE_PATH,
  BOOTH_NAME,
  EVENT_DATES,
  PRICE_UNIT,
  PURGE_DEADLINE,
  SLOT_CAPACITY,
  SLOT_COLORS,
  SLOT_HOURS,
  dateLabel,
  hourLabel,
  isTestMode,
  registrationGate,
} from "@/lib/customhouse-config";
import { Card, IMG, ReceiptZig, Shell, Tag, btnGhost, btnPrimary } from "./_components/Shell";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: `${BOOTH_NAME} · 2026 양양송이연어축제`,
  description: "양양 관내 당일 영수증 3만원마다 1명, 나만의 커스텀 티셔츠를 만들어 가세요. 로마드 협동조합 커스텀하우스 부스.",
  alternates: { canonical: BASE_PATH },
  openGraph: {
    title: "영수증 리워드 · 나만의 축제 티셔츠 만들기 | 2026 양양송이연어축제",
    description: "양양 관내 당일 영수증 3만원마다 1명, 송송이·연동이 캐릭터로 나만의 축제 티셔츠를 만들어 가세요. 10월 16일(금)~18일(일) 10:00~18:00",
    url: `https://lomadcoop.com${BASE_PATH}`,
    siteName: "로마드 협동조합",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "영수증 리워드 · 나만의 축제 티셔츠 만들기",
    description: "양양 관내 당일 영수증 3만원마다 1명, 나만의 축제 티셔츠를 만들어 가세요.",
  },
};

export default function SongiLandingPage() {
  const test = isTestMode();
  const gate = registrationGate(new Date(), test);
  const first = EVENT_DATES[0];
  const last = EVENT_DATES[EVENT_DATES.length - 1];
  const unit = (PRICE_UNIT / 10_000).toString();

  const steps: [string, string][] = [
    ["휴대폰 인증", "대표 한 분의 휴대폰 번호로 인증해요."],
    ["영수증 금액 입력", `양양 관내 오늘 영수증, 여러 장 합산 OK. 합계 ${unit}만원마다 1명.`],
    ["참여자 입력", "가족·일행 이름, 성별, 나이를 적어요."],
    ["데스크에서 영수증 확인", "접수번호를 보여주고 실물 영수증을 확인받으면 회차권이 나와요."],
    ["회차 시간에 부스로!", "시작 10분 전에 알림 문자를 보내 드려요."],
  ];

  return (
    <Shell kv>
      {test && (
        <p className="mb-4 rounded-xl border-[3px] border-[#262120] bg-[#262120] text-[#F5EEDF] text-[13px] font-bold px-3 py-2">
          테스트 모드 — 날짜·시간 제한 해제, 문자는 실제로 보내지 않아요
        </p>
      )}

      {/* ── 헤드라인 ── */}
      <section className="text-center">
        <span className="sx-ribbon text-[30px] px-6 pt-3 pb-2">영수증 리워드</span>
        <h1 className="mt-4 text-[44px] min-[400px]:text-[48px] leading-[1.06] font-black tracking-[-0.04em]">
          나만의 <span className="text-[#E07F74]">축제</span>
          <br />
          <span className="text-[#E07F74]">티셔츠</span> 만들기
        </h1>
        <p className="mt-3 text-[16px] leading-[1.5] font-semibold text-[#4a403c] break-keep">
          양양에서 오늘 쓴 영수증 <b className="text-[#8C4A42] font-extrabold">{unit}만원마다 1명</b>,
          <br />
          나만의 티셔츠를 직접 찍어 가세요.
        </p>
        <p className="sx-pill mt-4 px-3.5 pt-2 pb-1.5 text-[15px] min-[400px]:text-[17px] whitespace-nowrap">
          {dateLabel(first)} ~ {dateLabel(last).replace(/^\d+월 /, "")}
          <i aria-hidden />
          매일 10:00~18:00
        </p>
      </section>

      {/* ── 티셔츠 + 캐릭터 스티커 ── */}
      <div className="relative h-[230px] mt-4 mb-2" aria-hidden>
        <div className="absolute left-1/2 top-[18px] -translate-x-1/2 w-[260px] h-[190px] rounded-[48%_52%_45%_55%/55%_45%_55%_45%] bg-[#8FCBD8]/55" />
        <img
          src={`${IMG}/tee.webp`}
          alt=""
          width={689}
          height={700}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[210px] h-auto drop-shadow-[5px_7px_0_rgba(38,33,32,.22)]"
        />
        <img src={`${IMG}/salmon-surf.webp`} alt="" width={360} height={319} className="sx-sticker left-0 top-1 w-[96px] -rotate-[8deg]" />
        <img src={`${IMG}/salmon-skate.webp`} alt="" width={360} height={310} className="sx-sticker right-0 top-0 w-[100px] rotate-[6deg]" />
        <img src={`${IMG}/star.webp`} alt="" width={160} height={128} className="sx-sticker left-[22%] bottom-1 w-[46px]" />
        <img src={`${IMG}/pink-ball.webp`} alt="" width={177} height={183} className="sx-sticker right-[20%] bottom-4 w-[44px]" />
      </div>

      {/* ── 접수 버튼 ── */}
      <div className="space-y-4 mb-10">
        {gate.open ? (
          <Link href={`${BASE_PATH}/apply`} className={`${btnPrimary} min-h-16 text-[22px]`}>
            지금 접수하기 →
          </Link>
        ) : (
          <div className="rounded-[20px] bg-[#FBF7EE] border-[3px] border-dashed border-[#262120] px-4 py-4 text-center">
            <p className="sx-hand text-[22px] text-[#8C4A42]">{gate.message}</p>
            <p className="text-[14px] font-semibold text-[#262120]/65 mt-1">접수는 행사일 10:00 ~ 17:10에 열려요</p>
          </div>
        )}
        <Link href={`${BASE_PATH}/ticket`} className={btnGhost}>
          내 회차권 보기
        </Link>
      </div>

      {/* ── 참여 방법 (영수증 카드) ── */}
      <section className="sx-rcpt pt-12 pb-5 mb-14 mr-1.5" aria-labelledby="how">
        <h2 id="how" className="absolute -top-[26px] left-1/2 -translate-x-1/2 m-0">
          <span className="sx-ribbon block text-[28px] px-6 pt-2.5 pb-1.5">참여 방법</span>
        </h2>
        <div className="sx-stamp absolute right-2 top-3 w-[70px] h-[70px] rotate-[14deg]" aria-hidden>
          <span className="text-[15px]">FREE</span>
          <b className="text-[19px] mt-1">무료</b>
        </div>
        <p className="sx-rhead text-[12px] pr-14">RECEIPT · 양양송이연어축제</p>
        <p className="text-center text-[18px] font-bold mt-3">
          양양 관내 <b className="text-[#8C4A42]">오늘</b> 쓴 영수증
        </p>
        <p className="text-center text-[20px] font-extrabold mt-0.5">
          <span className="sx-hl text-[38px] font-black text-[#8C4A42] tracking-[-0.02em]">{unit}만원마다</span> 1명
        </p>
        <div className="sx-dash mx-5 mt-4" />
        <ol className="px-5 pt-4 space-y-3.5">
          {steps.map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="sx-hand shrink-0 w-9 h-9 rounded-full border-[3px] border-[#262120] bg-[#E07F74] text-white text-[19px] flex items-center justify-center pt-0.5">
                {i + 1}
              </span>
              <span className="text-[15px] leading-[1.45]">
                <b className="text-[17px] font-extrabold">{t}</b>
                <br />
                <span className="text-[#262120]/70 font-medium">{d}</span>
              </span>
            </li>
          ))}
        </ol>
        <div className="sx-dash mx-5 mt-4" />
        <p className="flex justify-center gap-4 mt-3 text-[15px] font-bold text-[#5d5350]">
          <span>
            <b className="text-[#98AB5A] font-black">✓</b> 여러 장 합산 OK
          </span>
          <span>
            <b className="text-[#98AB5A] font-black">✓</b> 실물 영수증 지참
          </span>
        </p>
        <ReceiptZig />
      </section>

      {/* ── 회차 안내 ── */}
      <Card className="pt-9 mb-6">
        <Tag>시간대별 운영</Tag>
        <p className="text-center text-[17px] font-bold mb-4">
          매일 <b className="sx-hand text-[26px] text-[#8C4A42]">{SLOT_HOURS.length}회차</b> · 회차당{" "}
          <b className="sx-hand text-[26px] text-[#8C4A42]">{SLOT_CAPACITY}명</b>
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {SLOT_HOURS.map((h) => (
            <div
              key={h}
              className="rounded-[12px] border-[3px] border-[#262120] bg-white overflow-hidden text-center"
            >
              <div className="h-2" style={{ backgroundColor: SLOT_COLORS[h]?.bg }} />
              <p className="sx-hand text-[19px] leading-none pt-1.5 tabular-nums">{hourLabel(h)}</p>
              <p className="text-[11px] font-semibold text-[#7a6f6a] pb-1.5 pt-0.5">~ {hourLabel(h + 1)}</p>
            </div>
          ))}
        </div>
        <ul className="text-[14px] leading-relaxed font-medium text-[#262120]/80 space-y-1.5">
          <li className="flex gap-2">
            <span className="text-[#E07F74]">●</span>먼저 승인받은 순서대로 회차를 배정해요
          </li>
          <li className="flex gap-2">
            <span className="text-[#E07F74]">●</span>대표 휴대폰 번호 기준 축제 기간 중 1회만 참여할 수 있어요
          </li>
          <li className="flex gap-2">
            <span className="text-[#E07F74]">●</span>회차 시작 10분이 지나도 오지 않으면 자리가 다른 분께 넘어갈 수 있어요
          </li>
        </ul>
        <Link
          href={`${BASE_PATH}/board`}
          className="sx-hand mt-3 min-h-[48px] flex items-center justify-center text-[18px] text-[#8C4A42] underline underline-offset-4 decoration-2"
        >
          오늘 회차별 남은 자리 보기 →
        </Link>
      </Card>

      <p className="text-[12px] leading-relaxed text-[#262120]/55 px-1">
        수집한 개인정보(휴대폰 번호, 참여자 이름·성별·나이, 영수증 금액)는 중복 참여 확인과 회차 안내에만 쓰고{" "}
        {dateLabel(PURGE_DEADLINE)}까지 파기해요.
      </p>
    </Shell>
  );
}
