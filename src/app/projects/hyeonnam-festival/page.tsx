import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountdownTimer from "@/components/projects/festival/CountdownTimer";
import Marquee from "@/components/projects/festival/Marquee";

const MARQUEE_ITEMS = [
  "2026.7.4 (SAT) ~ 7.5 (SUN)",
  "Yangyang · 죽도 · 북분리",
  "현남생활 페스티벌",
  "Surftown × Village",
  "1박 2일 · 양양서핑로드",
  "Free Entry",
];

const LINEUP: { tag: string; title: string; place: string; head?: boolean }[] = [
  { tag: "Surf Culture", title: "서퍼's 나이트", place: "죽도 · 영화 + 음악", head: true },
  { tag: "Land Surf", title: "랜드서핑 페스타", place: "죽도 · 랜드서핑파크", head: true },
  { tag: "Music", title: "트로트 DJ 파티", place: "북분리 캠핑장" },
  { tag: "Food", title: "로컬 쿠킹클래스", place: "북분리 · 속초 플래버링" },
  { tag: "Wellness", title: "블루 웰니스", place: "죽도 + 동산" },
  { tag: "Movement", title: "비치 러닝", place: "4거점 코스" },
];

const DAY1 = [
  ["10:00", "개장 · 서프 패스 배포 · 부스 & 프리마켓"],
  ["11:00", "쿠킹클래스(북분리) · 모닝 요가(죽도) · 서핑 체험"],
  ["14:00", "★ 랜드서핑 페스타 (죽도)"],
  ["16:00", "비치 러닝 · 캠핑 체크인 · 상담·포럼"],
  ["18:30", "◎ 선셋 공동 새참 (죽도)"],
  ["20:00", "★ 서퍼's 나이트 + 해변공연 + 트롯 DJ"],
  ["21:00", "★★ 불꽃 피날레 2개소 동시"],
];

const DAY2 = [
  ["09:00", "캠핑장 안내 · 조식"],
  ["10:00", "비치 요가 · 브런치 쿠폰 · 잔여 스탬프"],
  ["11:00", "멘토투어 + 기념품 수령"],
  ["12:00", "북분리 프리마켓"],
  ["14:00", "폐막"],
];

export const metadata: Metadata = {
  title: "현남생활 페스티벌 | LOMAD",
  description:
    "서퍼와 마을이 한 상에 — 양양서핑로드 위에서 보내는 1박 2일. 2026.7.4(토)~7.5(일), 양양 죽도·북분리해변.",
  alternates: { canonical: "/projects/hyeonnam-festival" },
  openGraph: {
    title: "현남생활 페스티벌 · 2026.7.4 — 7.5",
    description: "양양서핑로드 위에서 보내는 1박 2일",
    images: ["/images/hyeonnam-festival-poster.png"],
  },
};

export default function HyeonnamFestivalPage() {
  return (
    <main className="bg-black text-white">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* 배경: 행사장 컨셉 이미지 (북분리 송림·텐트·페스티벌 무드) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/festival-hero-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* 가독성 확보를 위한 다층 오버레이 */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,31,58,0.55) 0%, rgba(11,31,58,0.35) 35%, rgba(11,31,58,0.65) 75%, rgba(11,31,58,0.85) 100%)",
          }}
        />
        {/* 컬러 액센트 (살짝 산호·오션 톤) */}
        <div
          className="absolute inset-0 z-0 mix-blend-overlay opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 80% 100%, #FF6B6B 0%, transparent 55%), radial-gradient(ellipse at 0% 0%, #006B7A 0%, transparent 50%)",
          }}
        />

        {/* 상단 마퀴 */}
        <div className="relative z-10">
          <Marquee items={MARQUEE_ITEMS} dark={true} />
        </div>

        {/* 네비 */}
        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
          <Link
            href="/"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-white/70 hover:text-white"
          >
            ← LOMAD
          </Link>
          <nav className="hidden md:flex items-center gap-7 font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-white/70">
            <a href="#about" className="hover:text-white">About</a>
            <a href="#zones" className="hover:text-white">Zones</a>
            <a href="#lineup" className="hover:text-white">Lineup</a>
            <a href="#schedule" className="hover:text-white">Schedule</a>
            <a href="#signature" className="hover:text-white">Signature</a>
          </nav>
          <Link
            href="/projects/hyeonnam-festival/register"
            className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-white px-4 md:px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
          >
            Register
          </Link>
        </header>

        {/* Hero 콘텐츠 — 중앙 */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-[family-name:var(--font-karla)] text-[10px] md:text-[12px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-6">
            2026 · Yangyang Surf Road Festival
          </p>
          <h1 className="font-[family-name:var(--font-noto)] text-[44px] md:text-[88px] font-black leading-[1.0] mb-5 tracking-tight">
            현남생활 페스티벌
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[20px] text-white/80 mb-12 max-w-[640px] leading-relaxed">
            서퍼와 마을이 한 상에
            <br />
            양양서핑로드 위에서 보내는 1박 2일
          </p>

          {/* D-DAY 카운트다운 */}
          <div className="mb-12">
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-white/50 mb-5">
              Festival Starts In
            </p>
            <CountdownTimer />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/projects/hyeonnam-festival/register"
              className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase bg-white text-black px-7 py-4 hover:bg-[#FF6B6B] hover:text-white transition-colors"
            >
              참가 신청 →
            </Link>
            <a
              href="#about"
              className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase border border-white/40 text-white px-7 py-4 hover:bg-white/10 transition-colors"
            >
              자세히 보기
            </a>
          </div>
        </div>

        {/* 하단 메타 */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 border-t border-white/15 text-white/80">
          {[
            ["DATE", "2026.7.4 — 7.5"],
            ["WHERE", "Yangyang · 죽도 · 북분리"],
            ["FORMAT", "2 Days · 2 Zones"],
            ["ENTRY", "Free · 일부 사전예약"],
          ].map(([k, v]) => (
            <div key={k} className="px-4 md:px-8 py-5 border-r border-white/15 last:border-r-0">
              <p className="font-[family-name:var(--font-karla)] text-[9px] md:text-[10px] tracking-[2px] font-bold uppercase opacity-60 mb-1">
                {k}
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[12px] md:text-[14px] font-black">
                {v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ──────────────────────────────────────────────── */}
      <section id="about" className="bg-[#FAF5EE] text-text py-[120px] px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <FadeIn>
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
              About
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[44px] font-black mb-10 leading-tight">
              단일 무대가 아닌, <br />
              <span className="text-[#006B7A]">4거점을 순환하는</span> 분산형 페스티벌
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[18px] leading-[2.0] text-text-sub max-w-[760px] mx-auto">
              웨이브웍스에서 시작해 「현남 서프 패스」를 받고, 죽도·북분리를 걸으며 쿠폰북으로 상권에서 소비하고,
              <span className="text-text font-black"> 선셋 새참에서 마을과 한 상에</span>,
              <span className="text-text font-black"> 21시 양쪽 바다 불꽃 피날레</span>로 밤까지 머무는 축제.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── VISION CINEMATIC BANNER ────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] md:h-[80vh] md:min-h-[560px] overflow-hidden flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/festival-vision-bg.png"
            alt="북분리 해변 페스티벌 컨셉"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(11,31,58,0.55) 100%)",
          }}
        />
        <FadeIn>
          <div className="relative z-10 text-center px-6 max-w-[900px]">
            <p className="font-[family-name:var(--font-karla)] text-[10px] md:text-[12px] tracking-[4px] font-bold uppercase text-[#FFD66E] mb-5">
              First Look · Bukbunri Beach
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[32px] md:text-[64px] font-black leading-[1.1] mb-6 drop-shadow-lg">
              해 질 녘, <br />
              송림과 바다 사이에서
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[17px] text-white/85 leading-relaxed max-w-[560px] mx-auto drop-shadow">
              마을이 차린 한 상, 외지에서 온 손님, 캠프파이어와 캠핑 텐트.
              <br className="hidden md:block" />
              이 한 장이 페스티벌의 모든 것.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ─── ZONES ─────────────────────────────────────────────── */}
      <section id="zones" className="relative">
        <FadeIn>
          {/* Activity Zone — 죽도 / 오션 */}
          <div
            className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #004E5A 0%, #006B7A 50%, #00838F 100%)",
            }}
          >
            {/* 데코 사인 큰 글자 */}
            <div
              className="absolute -bottom-10 md:-bottom-20 -right-4 md:right-10 font-[family-name:var(--font-karla)] font-black tracking-tighter text-white/[0.05] select-none pointer-events-none"
              style={{ fontSize: "clamp(180px, 30vw, 460px)", lineHeight: 1 }}
            >
              ACTIVITY
            </div>
            <div className="relative z-10 max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-12 py-[100px]">
              <div>
                <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-5">
                  Zone 01 · Daylight to Night
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[44px] md:text-[80px] font-black mb-3 leading-[0.95]">
                  ACTIVITY
                </h2>
                <h3 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-4">
                  죽도 ZONE
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] text-white/70 italic mb-6">
                  웨이브웍스 / 양양 서핑 1번지
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[16px] text-white/85 leading-[1.9] max-w-[440px]">
                  서핑 라이프스타일이 압축된 낮부터 밤. 메인 안내 · 새참 · 헤드라이너 · 불꽃까지 모든 시그니처가 여기서.
                </p>
              </div>
              <ul className="space-y-3 md:pt-12 text-[14px] md:text-[15px]">
                {[
                  ["메인 안내 · 기념품 · 상담 · 포럼", false],
                  ["선셋 공동 새참 (18:30)", true],
                  ["서퍼's 나이트 · 랜드서핑", false],
                  ["불꽃 피날레 (21:00)", true],
                ].map(([txt, hi]) => (
                  <li key={String(txt)} className="flex items-start gap-3 py-2 border-b border-white/10">
                    <span className="text-[#FF6B6B] mt-0.5">●</span>
                    <span className={hi ? "font-black" : ""}>{txt as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nature Zone — 북분리 / 포레스트·우든 */}
          <div
            className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #2C1810 0%, #5C3A1E 40%, #8B4513 70%, #B85C2C 100%)",
            }}
          >
            <div
              className="absolute -bottom-10 md:-bottom-20 -left-4 md:left-10 font-[family-name:var(--font-karla)] font-black tracking-tighter text-white/[0.06] select-none pointer-events-none"
              style={{ fontSize: "clamp(180px, 30vw, 460px)", lineHeight: 1 }}
            >
              NATURE
            </div>
            <div className="relative z-10 max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 px-6 md:px-12 py-[100px]">
              <div className="md:order-2 md:text-right">
                <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] font-bold uppercase text-[#FFD66E] mb-5">
                  Zone 02 · Sleep Under the Stars
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[44px] md:text-[80px] font-black mb-3 leading-[0.95]">
                  NATURE
                </h2>
                <h3 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black mb-4">
                  북분리 ZONE
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] text-white/70 italic mb-6">
                  북분리 마을 캠핑장 / 별과 불멍
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[16px] text-white/85 leading-[1.9] max-w-[440px] md:ml-auto">
                  숙박과 야간 체류의 본거지. 캠핑 · 프리마켓 · 해변공연 · 트로트 DJ가 밤을 채운다.
                </p>
              </div>
              <ul className="md:order-1 space-y-3 md:pt-12 text-[14px] md:text-[15px]">
                {[
                  ["캠핑 숙박 · 프리마켓", false],
                  ["해변공연 · 트로트 DJ", true],
                  ["로컬 쿠킹클래스", false],
                  ["불꽃 피날레 (21:00)", true],
                ].map(([txt, hi]) => (
                  <li key={String(txt)} className="flex items-start gap-3 py-2 border-b border-white/10">
                    <span className="text-[#FFD66E] mt-0.5">●</span>
                    <span className={hi ? "font-black" : ""}>{txt as string}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        <p className="bg-black text-center py-5 font-[family-name:var(--font-karla)] text-[10px] md:text-[11px] tracking-[2px] uppercase text-white/50">
          + 인구 · 동산 = 경유 서브 거점 · 스탬프투어 · 상권 회유
        </p>
      </section>

      {/* ─── LINEUP ────────────────────────────────────────────── */}
      <section id="lineup" className="bg-[#0B1F3A] text-white py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-4">
                Line Up
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[44px] font-black leading-tight">
                함께하는 5팀
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[13px] text-white/60 mt-3">
                초청제 큐레이션 · 각 팀의 커뮤니티가 동행
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LINEUP.map((p) => (
                <div
                  key={p.title}
                  className={`p-6 border ${
                    p.head
                      ? "bg-white/[0.03] border-[#FF6B6B]/60"
                      : "border-white/15"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <p className="font-[family-name:var(--font-karla)] text-[9px] tracking-[2px] uppercase text-white/50 font-bold">
                      {p.tag}
                    </p>
                    {p.head && (
                      <span className="font-[family-name:var(--font-karla)] text-[8px] tracking-[2px] uppercase text-[#FF6B6B] font-extrabold bg-[#FF6B6B]/15 px-2 py-1">
                        Head
                      </span>
                    )}
                  </div>
                  <h3 className="font-[family-name:var(--font-noto)] text-[20px] md:text-[22px] font-black mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="font-[family-name:var(--font-noto)] text-[12px] md:text-[13px] text-white/65">
                    {p.place}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SCHEDULE ──────────────────────────────────────────── */}
      <section id="schedule" className="bg-[#FAF5EE] text-text py-[120px] px-6">
        <div className="max-w-[960px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
                Schedule
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[44px] font-black leading-tight">
                1박 2일
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-text">
                  <p className="font-[family-name:var(--font-karla)] text-[36px] font-black leading-none">
                    DAY 1
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[14px] font-bold text-text-sub">
                    7/4(토) — 메인 데이
                  </p>
                </div>
                <ul className="space-y-2">
                  {DAY1.map(([time, prog]) => (
                    <li key={time} className="flex gap-4 py-2 border-b border-border text-[13px]">
                      <span className="font-[family-name:var(--font-karla)] font-bold text-[#006B7A] w-14 shrink-0">
                        {time}
                      </span>
                      <span className="font-[family-name:var(--font-noto)] flex-1">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-baseline gap-4 mb-6 pb-4 border-b border-text">
                  <p className="font-[family-name:var(--font-karla)] text-[36px] font-black leading-none">
                    DAY 2
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[14px] font-bold text-text-sub">
                    7/5(일) — 캠핑객 위주
                  </p>
                </div>
                <ul className="space-y-2">
                  {DAY2.map(([time, prog]) => (
                    <li key={time} className="flex gap-4 py-2 border-b border-border text-[13px]">
                      <span className="font-[family-name:var(--font-karla)] font-bold text-[#FF6B6B] w-14 shrink-0">
                        {time}
                      </span>
                      <span className="font-[family-name:var(--font-noto)] flex-1">{prog}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── SIGNATURE MOMENTS ─────────────────────────────────── */}
      <section
        id="signature"
        className="text-white py-[120px] px-6"
        style={{ backgroundColor: "#0B1F3A" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-white/60 mb-4">
                Signature Moments
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[44px] font-black leading-tight">
                두 개의 시그니처 모먼트
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {/* 18:30 새참 - 비치테이블 사진 배경 */}
              <div
                className="relative p-10 md:p-14 border text-center overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center"
                style={{ borderColor: "rgba(255,107,107,0.5)" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/festival-saecham-bg.jpg"
                    alt="선셋 공동 새참 컨셉"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(11,31,58,0.55) 50%, rgba(0,0,0,0.85) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <p
                    className="font-[family-name:var(--font-karla)] text-[64px] md:text-[100px] font-black leading-none mb-4 drop-shadow-lg"
                    style={{ color: "#FF6B6B" }}
                  >
                    18:30
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[20px] md:text-[26px] font-black mb-3 drop-shadow">
                    선셋 공동 새참
                  </p>
                  <p className="text-[13px] text-white/90 leading-relaxed drop-shadow">
                    죽도해변에서 마을 · 참가자 · 손님이 한 상에
                  </p>
                </div>
              </div>

              {/* 21:00 불꽃 - 송림 야간 사진 배경 */}
              <div
                className="relative p-10 md:p-14 border text-center overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center"
                style={{ borderColor: "rgba(127,221,208,0.5)" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/festival-hero-bg.png"
                    alt="불꽃 피날레 컨셉"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,31,58,0.6) 0%, rgba(0,75,90,0.55) 50%, rgba(11,31,58,0.9) 100%)",
                  }}
                />
                <div className="relative z-10">
                  <p
                    className="font-[family-name:var(--font-karla)] text-[64px] md:text-[100px] font-black leading-none mb-4 drop-shadow-lg"
                    style={{ color: "#7FDDD0" }}
                  >
                    21:00
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[20px] md:text-[26px] font-black mb-3 drop-shadow">
                    불꽃 피날레 2개소 동시
                  </p>
                  <p className="text-[13px] text-white/90 leading-relaxed drop-shadow">
                    죽도 · 북분리 양쪽 바다에서 동시 점화
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="bg-black text-white py-[140px] px-6 text-center">
        <FadeIn>
          <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-5">
            Now Open
          </p>
          <h2 className="font-[family-name:var(--font-noto)] text-[32px] md:text-[56px] font-black mb-3 leading-tight">
            양양서핑로드의 첫 마을 잔치
          </h2>
          <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[17px] text-white/70 mb-10 max-w-[640px] mx-auto leading-relaxed">
            서퍼와 마을이 한 상에 — 1박 2일 함께해 주세요
          </p>
          <Link
            href="/projects/hyeonnam-festival/register"
            className="inline-block font-[family-name:var(--font-karla)] text-[12px] md:text-[14px] font-extrabold tracking-[3px] uppercase bg-[#FF6B6B] text-white px-10 py-5 hover:bg-white hover:text-black transition-colors"
          >
            지금 참가 신청 →
          </Link>
          <div className="mt-12 pt-12 border-t border-white/15 text-[11px] text-white/50">
            <p className="mb-2">
              주최 · 주관 · <span className="text-white/80">로마드 협동조합</span>  ·  재원 · 농촌마을 활력화 사업
            </p>
            <p>
              <Link href={`/contact?type=${encodeURIComponent("프로그램 운영 문의")}`} className="underline hover:text-white">
                파트너 · 점포 · 후원 협력 문의
              </Link>
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
