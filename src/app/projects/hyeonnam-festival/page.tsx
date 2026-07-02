import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import CountdownTimer from "@/components/projects/festival/CountdownTimer";
import Marquee from "@/components/projects/festival/Marquee";
import { SUBMISSIONS_OPEN, FLEA_MARKET_PUBLISHED } from "@/lib/festival-config";
import { EXPERIENCES, onlineCapacity, nonSlotOnlineCap } from "@/lib/festival-experiences";

const MARQUEE_ITEMS = [
  "2026.7.4 (SAT) ~ 7.5 (SUN)",
  "Yangyang · 죽도 · 북분리",
  "현남생활 페스티벌",
  "Surftown × Village",
  "1박 2일 · 양양서핑로드",
  "Free Entry",
];

const DAY1 = [
  ["10:00", "개장 · 캠핑 체크인 (죽도·북분리) · 서프 패스 배포 · 정착 상담"],
  ["11:00", "프리마켓 개장 (죽도 · ~18:00) · 부스"],
  ["13:00", "서핑 · SUP (죽도) · 로컬 쿠킹클래스 — 블루베리 모찌 (북분리 · 50명)"],
  ["15:00", "서핑 · SUP · 랜드서핑 (죽도)"],
  ["16:00", "볼더링 · 해변 하이록스 (죽도 · ~18:00)"],
  ["17:00", "볼더링 (죽도)"],
  ["18:00", "◎ 선셋 비치 테이블 (북분리) · 비치 러닝 · 선셋 바레 (죽도)"],
  ["19:00", "★ 서퍼's 나이트 — 밴드 라이브 (죽도)"],
  ["21:00", "★★ 불꽃 피날레 (죽도)"],
];

const DAY2 = [
  ["10:00", "요가와 자연 만다라 (북분리)"],
  ["11:00", "스탬프 이벤트 · 영수증 이벤트 상품 수령"],
  ["12:00", "폐막"],
];

// 서퍼's 나이트(19:00 · 죽도해변 웨이브웍스 앞) 라인업. Y.S.B는 사진 미제공 → 타이포 카드.
const LINEUP: { name: string; en?: string; role: string; desc: string; img: string | null }[] = [
  { name: "리피", en: "LEAFY", role: "Vocal", desc: "싱그러운 목소리로 자연을 노래하는 아티스트", img: "/images/festival-lineup-leafy.jpg" },
  { name: "우람", role: "Singer", desc: "기타 한 대로 밤을 채우는 자유로운 싱어", img: "/images/festival-lineup-uram.jpg" },
  { name: "Y.S.B", role: "Band · 양양고등학교", desc: "지역의 10대 뮤지션들이 처음 서는 진짜 무대", img: null },
  { name: "스트링노스누들", role: "Band · 현북면", desc: "양양의 아이돌, 현북면 비주얼 밴드", img: "/images/festival-lineup-noodle.jpg" },
];

export const metadata: Metadata = {
  title: "현남생활 페스티벌 | LOMAD",
  description:
    "서퍼와 마을이 한 상에 — 양양서핑로드 위에서 보내는 1박 2일. 2026.7.4(토)~7.5(일), 양양 죽도·북분리해변.",
  alternates: {
    canonical: "/projects/hyeonnam-festival",
    languages: {
      "ko-KR": "/projects/hyeonnam-festival",
      en: "/projects/hyeonnam-festival/en",
    },
  },
  openGraph: {
    title: "현남생활 페스티벌 · 2026.7.4 — 7.5",
    description: "양양서핑로드 위에서 보내는 1박 2일",
    images: ["/images/festival-hero-bg.png"],
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
            {FLEA_MARKET_PUBLISHED && (
              <a href="#market" className="text-[#FFD66E] hover:text-white">Market</a>
            )}
            <a href="#lineup" className="hover:text-white">Line-up</a>
            <a href="#programs" className="hover:text-white">Programs</a>
            <a href="#schedule" className="hover:text-white">Schedule</a>
            <a href="#signature" className="hover:text-white">Signature</a>
            <Link href="/projects/hyeonnam-festival/guide" className="text-[#FFD66E] hover:text-white">Guide</Link>
          </nav>
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/projects/hyeonnam-festival/en"
              className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-white/70 hover:text-white"
            >
              ENG
            </Link>
            {SUBMISSIONS_OPEN ? (
              <Link
                href="/projects/hyeonnam-festival/register"
                className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-white px-4 md:px-5 py-2.5 hover:bg-white hover:text-black transition-colors"
              >
                Register
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[2px] uppercase border border-white/40 text-white/60 px-4 md:px-5 py-2.5 cursor-not-allowed select-none"
              >
                Coming Soon
              </span>
            )}
          </div>
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
            {SUBMISSIONS_OPEN ? (
              <Link
                href="/projects/hyeonnam-festival/register"
                className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase bg-white text-black px-7 py-4 hover:bg-[#FF6B6B] hover:text-white transition-colors"
              >
                참가 신청 →
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase bg-white/15 text-white/70 px-7 py-4 cursor-not-allowed select-none border border-white/30"
              >
                곧 접수 예정
              </span>
            )}
            <a
              href="#about"
              className="font-[family-name:var(--font-karla)] text-[11px] md:text-[12px] font-extrabold tracking-[3px] uppercase border border-white/40 text-white px-7 py-4 hover:bg-white/10 transition-colors"
            >
              자세히 보기
            </a>
          </div>
          {SUBMISSIONS_OPEN && (
            <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 font-[family-name:var(--font-karla)] text-[10px] md:text-[11px] font-extrabold tracking-[2px] uppercase text-white/60">
              <Link href="/projects/hyeonnam-festival/status" className="hover:text-white underline underline-offset-4">
                접수 현황
              </Link>
              <Link href="/projects/hyeonnam-festival/my" className="hover:text-white underline underline-offset-4">
                내 신청 조회 · 취소
              </Link>
            </div>
          )}
          {!SUBMISSIONS_OPEN && (
            <p className="mt-5 font-[family-name:var(--font-noto)] text-[12px] md:text-[13px] text-white/60 tracking-wide">
              접수는 준비가 완료되는 대로 별도 공지로 안내드립니다
            </p>
          )}
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
              웨이브웍스에서 시작해 「현남 서프 패스」를 받고, 죽도·<span className="whitespace-nowrap">북분리</span>를 걸으며 참여 점포에서 소비하고,
              <span className="text-text font-black"> <span className="whitespace-nowrap">북분리</span> 선셋 비치 테이블에서 마을과 한 상에</span>,
              <span className="text-text font-black"> 21시 죽도 바다 불꽃 피날레</span>로 밤까지 머무는 축제.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── ZONES ─────────────────────────────────────────────── */}
      <section id="zones" className="relative">
        <FadeIn>
          {/* Activity Zone — 죽도 / 오션 */}
          <div className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden">
            <Image
              src="/images/festival-zone-jukdo.png"
              alt="죽도 액티비티 존 — 해변 페스티벌 컨셉"
              fill
              className="object-cover z-0"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,78,90,0.92) 0%, rgba(0,107,122,0.82) 50%, rgba(0,131,143,0.78) 100%)",
              }}
            />
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
                  서핑 라이프스타일이 압축된 낮부터 밤. 액티비티 체험 · 비치 러닝 · 서퍼's 나이트 · 불꽃놀이까지 액티비티 시그니처가 여기서.
                </p>
              </div>
              <ul className="space-y-3 md:pt-12 text-[14px] md:text-[15px]">
                {[
                  ["서핑·SUP·랜드서핑·볼더링 (13~17시)", true],
                  ["해변 하이록스 (16~18시) · 선셋 바레 (18:00)", false],
                  ["비치 러닝 (18:00) · 메인 안내 · 기념품", false],
                  ["서퍼's 나이트 (19:00)", true],
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
          <div className="relative min-h-[600px] md:min-h-[680px] flex items-center text-white overflow-hidden">
            <Image
              src="/images/festival-zone-bukbunri.png"
              alt="북분리 자연·체류 존 — 송림 캠핑·선셋 비치 테이블 컨셉"
              fill
              className="object-cover z-0"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(44,24,16,0.90) 0%, rgba(92,58,30,0.80) 40%, rgba(139,69,19,0.74) 70%, rgba(184,92,44,0.72) 100%)",
              }}
            />
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
                  북분리 마을 캠핑장
                </p>
                <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[16px] text-white/85 leading-[1.9] max-w-[440px] md:ml-auto">
                  로컬 쿠킹클래스 · 선셋 비치 테이블 · 요가와 자연 만다라가 송림의 낮과 밤을 채운다.
                </p>
              </div>
              <ul className="md:order-1 space-y-3 md:pt-12 text-[14px] md:text-[15px]">
                {[
                  ["캠핑 숙박 · 프리마켓", false],
                  ["로컬 쿠킹클래스 — 블루베리 모찌 (13:00)", false],
                  ["선셋 비치 테이블 (18:00)", true],
                  ["요가와 자연 만다라 (일 10:00)", true],
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

      {/* ─── FLEA MARKET (프리마켓 안내) ───────────────────────── */}
      {FLEA_MARKET_PUBLISHED && (
        <section id="market" className="relative text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/festival-market-concept.jpg"
              alt="현남생활 페스티벌 프리마켓"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,31,58,0.62) 0%, rgba(11,31,58,0.78) 60%, rgba(0,0,0,0.86) 100%)",
            }}
          />
          <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-[120px] md:py-[150px] text-center">
            <FadeIn>
              <p className="font-[family-name:var(--font-karla)] text-[10px] md:text-[11px] tracking-[4px] font-bold uppercase text-[#FFD66E] mb-5">
                Flea Market
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[36px] md:text-[64px] font-black leading-[1.05] mb-5">
                프리마켓 26팀
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[15px] md:text-[18px] text-white/90 max-w-[660px] mx-auto leading-relaxed mb-3">
                핸드메이드·주얼리·비치웨어·로컬푸드·체험까지, 양양 죽도해변에 스물여섯 팀이 한자리에 모입니다.
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[13px] md:text-[15px] text-white/70 mb-10">
                7. 4(토) 11:00~18:00 · 죽도해변 랜드서핑파크 건너편 · 입장 무료
              </p>
              <Link
                href="/projects/hyeonnam-festival/market"
                className="inline-block font-[family-name:var(--font-karla)] text-[12px] md:text-[14px] font-extrabold tracking-[3px] uppercase bg-[#FF6B6B] text-white px-10 py-5 hover:bg-white hover:text-black transition-colors"
              >
                참여 업체 보기 →
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ─── SURFER'S NIGHT LINE-UP ────────────────────────────── */}
      <section
        id="lineup"
        className="text-white py-[120px] px-6"
        style={{ background: "linear-gradient(180deg,#0B1F3A 0%,#081627 100%)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-4">
                Surfer&apos;s Night · 19:00 · 죽도해변 웨이브웍스 앞
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[44px] font-black leading-tight">
                서퍼&apos;s 나이트 라인업
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[14px] text-white/70 mt-5 max-w-[620px] mx-auto leading-relaxed">
                노을이 지면 죽도해변이 무대가 됩니다. 네 팀의 라이브가 밤을 채워요.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LINEUP.map((act) => (
                <div key={act.name} className="flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden mb-3 border border-white/10">
                    {act.img ? (
                      <Image
                        src={act.img}
                        alt={`${act.name} — 서퍼's 나이트 라인업`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-3"
                        style={{ background: "linear-gradient(155deg,#13294d 0%,#0B1F3A 55%,#3a1d2e 100%)" }}
                      >
                        <span className="font-[family-name:var(--font-karla)] text-[34px] md:text-[42px] font-black tracking-tight text-white/90">
                          Y.S.B
                        </span>
                        <span className="font-[family-name:var(--font-noto)] text-[11px] text-[#FFD66E] mt-2">
                          양양고등학교 밴드
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-[family-name:var(--font-karla)] text-[9px] tracking-[2px] uppercase font-bold text-[#FF6B6B] mb-1">
                    {act.role}
                  </p>
                  <h3 className="font-[family-name:var(--font-noto)] text-[17px] md:text-[19px] font-black leading-tight">
                    {act.name}
                    {act.en && <span className="text-white/50 text-[13px] font-bold"> {act.en}</span>}
                  </h3>
                  <p className="font-[family-name:var(--font-noto)] text-[12px] text-white/65 leading-relaxed mt-1.5">
                    {act.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── PROGRAMS (체험 프로그램) ───────────────────────────── */}
      <section id="programs" className="bg-white text-text py-[120px] px-6">
        <div className="max-w-[1080px] mx-auto">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-text-muted mb-4">
                Programs
              </p>
              <h2 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[44px] font-black leading-tight">
                체험 프로그램
              </h2>
              <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mt-5 max-w-[660px] mx-auto leading-relaxed">
                양양서핑로드 위에서 즐기는 체험들. 체험·캠핑 모두 <b>무료</b>이며(선셋 비치 테이블 2만원만 현장 결제),
                정원의 <b>70%는 온라인 사전접수</b>, 30%는 현장 접수로 운영됩니다.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXPERIENCES.map((exp) => {
                const total = exp.slots
                  ? exp.slots.reduce((s, x) => s + x.capacity, 0)
                  : exp.capacity ?? 0;
                const online = exp.slots
                  ? exp.slots.reduce((s, x) => s + onlineCapacity(x.capacity), 0)
                  : nonSlotOnlineCap(exp);
                const onsite = total - online;
                return (
                  <div key={exp.key} className="border border-border p-5 flex flex-col bg-[#FAF5EE]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2px] uppercase font-bold text-[#006B7A]">
                        {exp.location}
                      </span>
                      <span className={`font-[family-name:var(--font-noto)] text-[11px] font-bold ${exp.fee ? "text-[#b45309]" : "text-[#0B7A5A]"}`}>
                        {exp.fee ?? "무료"}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-noto)] text-[17px] font-black mb-1.5 leading-snug">
                      {exp.label}
                    </h3>
                    <p className="font-[family-name:var(--font-noto)] text-[13px] text-text-sub leading-relaxed mb-4 flex-1">
                      {exp.desc}
                    </p>
                    <div className="font-[family-name:var(--font-noto)] text-[12px] space-y-1 pt-3 border-t border-border">
                      <p>
                        <span className="text-text-muted">정원</span> <b>{total}명</b>
                        <span className="text-text-muted"> · 사전 {online} / 현장 {onsite}</span>
                        {exp.slots && (
                          <span className="text-text-muted">
                            {" "}
                            (타임당 {exp.slots[0].capacity}명 · {exp.slots.map((s) => s.slot).join("·")})
                          </span>
                        )}
                      </p>
                      <p>
                        <span className="text-text-muted">연령</span> {exp.ageLimit ?? "전연령"}
                      </p>
                      {(exp.time || exp.slots) && (
                        <p>
                          <span className="text-text-muted">시간</span>{" "}
                          {exp.slots ? exp.slots.map((s) => s.slot).join(" / ") : exp.time}
                        </p>
                      )}
                      {exp.exclusiveGroup === "activity" && (
                        <p className="text-[#b45309] text-[11px]">※ 서핑·SUP·랜드서핑·볼더링 중 1인 1종목</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 캠핑 사이트 안내 */}
            <div className="mt-6 border border-border bg-[#0B1F3A] text-white p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <span className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2px] uppercase font-bold text-[#FFD66E] shrink-0">
                Camping
              </span>
              <p className="font-[family-name:var(--font-noto)] text-[13px] md:text-[14px] leading-relaxed flex-1">
                북분리 마을 캠핑장 사이트 예약 가능 — <b>데크 70면 · 노지 10면 모두 무료</b> (양양군 농업기술센터 후원). 1박 2일 캠핑객은 선셋 비치 테이블·일요일 요가까지 함께 즐기세요. (접수 폼에서 신청)
              </p>
            </div>
            {SUBMISSIONS_OPEN && (
              <div className="text-center mt-12">
                <Button variant="primary" href="/projects/hyeonnam-festival/register">
                  사전 접수하기 →
                </Button>
              </div>
            )}
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
                    7/5(일)
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

      {/* ─── 참가자 안내 (배치도·주차·오시는 길) ───────────────── */}
      <section className="bg-white text-text py-[100px] px-6">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <p className="font-[family-name:var(--font-karla)] text-[10px] md:text-[11px] tracking-[4px] font-bold uppercase text-[#FF6B6B] mb-4">
              Official Guide
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[30px] md:text-[44px] font-black leading-tight mb-4">
              참가자 안내
            </h2>
            <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] text-text-sub leading-relaxed mb-10 max-w-[560px]">
              행사장 배치도, 주차장, 화장실, 버스·택시로 오시는 길까지 —
              방문 전 꼭 확인하세요.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <Link href="/projects/hyeonnam-festival/guide" className="group block border border-border overflow-hidden">
                <Image
                  src="/images/festival-map-jukdo.jpg"
                  alt="죽도 ZONE 배치도"
                  width={1800}
                  height={1004}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                />
              </Link>
              <Link href="/projects/hyeonnam-festival/guide" className="group block border border-border overflow-hidden">
                <Image
                  src="/images/festival-map-bukbun.jpg"
                  alt="북분리 ZONE 배치도"
                  width={1800}
                  height={1004}
                  className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                />
              </Link>
            </div>
            <div className="text-center">
              <Link
                href="/projects/hyeonnam-festival/guide"
                className="inline-block font-[family-name:var(--font-karla)] text-[12px] md:text-[13px] font-extrabold tracking-[2px] uppercase border-2 border-text px-8 py-4 hover:bg-text hover:text-white transition-colors"
              >
                주차 · 오시는 길 전체 안내 보기 →
              </Link>
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
              {/* 18:00 선셋 비치 테이블 - 북분리 송림 롱테이블 사진 배경 */}
              <div
                className="relative p-10 md:p-14 border text-center overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center"
                style={{ borderColor: "rgba(255,107,107,0.5)" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/festival-sunset-table.png"
                    alt="선셋 비치 테이블 컨셉"
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
                    18:00
                  </p>
                  <p className="font-[family-name:var(--font-noto)] text-[20px] md:text-[26px] font-black mb-3 drop-shadow">
                    선셋 비치 테이블
                  </p>
                  <p className="text-[13px] text-white/90 leading-relaxed drop-shadow">
                    북분리 송림에서 마을 · 참가자 · 손님이 한 상에
                  </p>
                </div>
              </div>

              {/* 21:00 불꽃 - 죽도 밤바다 불꽃 사진 배경 */}
              <div
                className="relative p-10 md:p-14 border text-center overflow-hidden min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center"
                style={{ borderColor: "rgba(127,221,208,0.5)" }}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/festival-fireworks.png"
                    alt="죽도 불꽃 피날레 컨셉"
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
                    불꽃 피날레
                  </p>
                  <p className="text-[13px] text-white/90 leading-relaxed drop-shadow">
                    죽도 밤바다 위에서 불꽃놀이와 함께 피날레
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
          {SUBMISSIONS_OPEN ? (
            <Link
              href="/projects/hyeonnam-festival/register"
              className="inline-block font-[family-name:var(--font-karla)] text-[12px] md:text-[14px] font-extrabold tracking-[3px] uppercase bg-[#FF6B6B] text-white px-10 py-5 hover:bg-white hover:text-black transition-colors"
            >
              지금 참가 신청 →
            </Link>
          ) : (
            <>
              <span
                aria-disabled="true"
                className="inline-block font-[family-name:var(--font-karla)] text-[12px] md:text-[14px] font-extrabold tracking-[3px] uppercase bg-white/15 text-white/70 px-10 py-5 cursor-not-allowed select-none border border-white/30"
              >
                곧 접수 예정
              </span>
              <p className="mt-5 font-[family-name:var(--font-noto)] text-[13px] text-white/60">
                접수 오픈 일정은 별도 공지 예정입니다
              </p>
            </>
          )}
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
