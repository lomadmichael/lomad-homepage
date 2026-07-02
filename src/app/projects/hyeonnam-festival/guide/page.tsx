import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";

export const metadata: Metadata = {
  title: "참가자 안내 · 현남생활 페스티벌 | LOMAD",
  description:
    "2026 현남생활 페스티벌 공식 참가자 안내 — 행사장 배치도, 주차, 화장실, 대중교통·택시로 오시는 길. 7.4(토)~7.5(일) 양양 죽도·북분리해변.",
  alternates: { canonical: "/projects/hyeonnam-festival/guide" },
};

/** 네이버 지도 검색 링크 */
function nmap(query: string): string {
  return `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
}

const NAVY = "#0B1F3A";

function SectionTitle({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="mb-6">
      <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FF6B6B] mb-1.5">
        {en}
      </p>
      <h2 className="font-[family-name:var(--font-noto)] text-[24px] md:text-[30px] font-black leading-tight">
        {ko}
      </h2>
    </div>
  );
}

function MapButton({ label, query }: { label: string; query: string }) {
  return (
    <Link
      href={nmap(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[1px] uppercase border border-text px-3 py-1.5 hover:bg-text hover:text-white transition-colors"
    >
      {label} ↗
    </Link>
  );
}

export default function FestivalGuidePage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      {/* 미니 헤더 */}
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/hyeonnam-festival"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text"
          >
            현남생활 페스티벌
          </Link>
          <Link
            href="/"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[2px] uppercase text-text-muted hover:text-text"
          >
            LOMAD
          </Link>
        </div>
      </header>

      <div className="max-w-[860px] w-full mx-auto px-6 py-[48px] md:py-[64px]">
        {/* 인트로 배너 */}
        <FadeIn>
          <aside
            className="text-white p-6 md:p-8 mb-12"
            style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #004E5A 100%)` }}
          >
            <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[3px] font-bold uppercase text-[#FFD66E] mb-2">
              Official Guide
            </p>
            <h1 className="font-[family-name:var(--font-noto)] text-[26px] md:text-[34px] font-black leading-tight mb-2">
              참가자 안내
            </h1>
            <p className="font-[family-name:var(--font-noto)] text-[13.5px] md:text-[14.5px] text-white/75 leading-relaxed">
              2026. 7. 4(토) ~ 7. 5(일) · 양양 죽도 · 북분리해변
              <br />
              행사장 배치도부터 주차·화장실·오시는 길까지, 방문 전 이 페이지 하나면 충분해요.
            </p>
          </aside>
        </FadeIn>

        {/* ── 행사장 배치도 ── */}
        <FadeIn>
          <section className="mb-14">
            <SectionTitle en="Venue Map" ko="행사장 배치도" />
            <div className="space-y-8">
              <figure>
                <div className="relative w-full border border-border overflow-hidden">
                  <Image
                    src="/images/festival-map-jukdo.jpg"
                    alt="죽도 ZONE 배치도 — 운영본부(웨이브웍스)·서퍼's 나이트·프리마켓·해변 하이록스·바레·불꽃 피날레·주차장 위치"
                    width={1800}
                    height={1004}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <figcaption className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-[family-name:var(--font-noto)] text-[13px] font-bold">
                    🏄 죽도 ZONE — 운영본부 · 웨이브웍스 (인구중앙길 110)
                  </span>
                  <MapButton label="지도" query="양양군 현남면 인구중앙길 110" />
                </figcaption>
              </figure>
              <figure>
                <div className="relative w-full border border-border overflow-hidden">
                  <Image
                    src="/images/festival-map-bukbun.jpg"
                    alt="북분리 ZONE 배치도 — 캠핑존·운영본부(캠핑장 사무소)·요가와 자연만다라·로컬 쿠킹클래스·선셋 비치 테이블·프리마켓·주차장 위치"
                    width={1800}
                    height={1004}
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-[family-name:var(--font-noto)] text-[13px] font-bold">
                    ⛺ 북분리 ZONE — 북분솔밭캠핑장 (북분리 2-5)
                  </span>
                  <MapButton label="지도" query="양양군 현남면 북분리 2-5" />
                </figcaption>
              </figure>
            </div>
            <p className="mt-3 font-[family-name:var(--font-noto)] text-[12px] text-text-muted">
              이미지를 길게 눌러 저장해 두시면 현장에서 보기 편해요.
            </p>
          </section>
        </FadeIn>

        {/* ── 주차 안내 ── */}
        <FadeIn>
          <section className="mb-14">
            <SectionTitle en="Parking" ko="주차 안내" />
            <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub leading-relaxed mb-6">
              행사장 주변 교통 혼잡 방지를 위해 지정된 공식 주차 구역을 이용해 주세요.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-4">
                  🏄 죽도 웨이브웍스 축제장
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: "제1주차장", addr: "동산큰길 6" },
                    { name: "제2주차장", addr: "시변리 산 1-8" },
                    { name: "제3주차장", addr: "시변리 13-1" },
                  ].map((p) => (
                    <li key={p.name} className="flex items-center justify-between gap-2">
                      <span className="font-[family-name:var(--font-noto)] text-[13.5px]">
                        <b>{p.name}</b> · {p.addr}
                      </span>
                      <MapButton label="지도" query={`양양군 현남면 ${p.addr}`} />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 pt-4 border-t border-border font-[family-name:var(--font-noto)] text-[12px] text-text-muted leading-relaxed">
                  내비게이션에 위 지번 주소를 검색하면 주차장으로 바로 안내됩니다.
                </p>
              </div>
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-4">
                  ⛺ 북분솔밭캠핑장
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[13.5px] leading-[1.9]">
                  캠핑장 안쪽 해변 방향은 <b>텐트·캠핑 구역</b>입니다.
                  <br />
                  차량은 <b>캠핑장 진입로 입구</b>와 <b>해변 반대편 공터 라인</b>을 따라
                  일렬로 주차해 주세요.
                </p>
                <div className="mt-4 pt-4 border-t border-border">
                  <MapButton label="캠핑장 지도" query="양양군 현남면 북분리 2-5" />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 화장실 ── */}
        <FadeIn>
          <section className="mb-14">
            <SectionTitle en="Restrooms" ko="화장실 위치" />
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-4">
                  🏄 죽도 축제장
                </h3>
                <ul className="font-[family-name:var(--font-noto)] text-[13.5px] space-y-2 leading-relaxed">
                  <li>· 웨이브웍스 화장실 — 인구중앙길 110</li>
                  <li>· 중앙 공중화장실 — 두리 10-13 (웨이브웍스 ↔ 레포츠센터 사이)</li>
                  <li>· 해양종합레포츠센터 — 인구중앙길 122</li>
                  <li>· 죽도해변 공중화장실 — 새나루길 46</li>
                  <li>· 프리마켓 존 — 인구중앙길 99</li>
                </ul>
              </div>
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[16px] font-black mb-4">
                  ⛺ 북분솔밭캠핑장
                </h3>
                <p className="font-[family-name:var(--font-noto)] text-[13.5px] leading-[1.9]">
                  캠핑장 중앙의 <b>전용 실내 화장실</b>을 이용해 주세요.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 대중교통 ── */}
        <FadeIn>
          <section className="mb-14">
            <SectionTitle en="Public Transit" ko="대중교통으로 오시는 길" />

            <div
              className="text-white p-6 mb-6"
              style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #004E5A 100%)` }}
            >
              <p className="font-[family-name:var(--font-karla)] text-[10px] tracking-[2px] font-bold uppercase text-[#FFD66E] mb-2">
                💡 Hidden Tip
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[14px] leading-[1.9]">
                <b>속초 ↔ 강릉 완행 시외버스</b>를 타면 환승 없이 한 번에 옵니다.
                <br />
                매표소에서 <b>&ldquo;인구 가는 완행&rdquo;</b>으로 발권 → <b>인구 시외버스 정류소</b> 하차.
                <br />
                <span className="text-white/70 text-[12.5px]">
                  ⚠️ 직행 버스는 인구 정류소에 서지 않아요 — 반드시 완행인지 확인!
                </span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
                  ① 양양종합여객터미널 출발 — 12번 농어촌버스
                </h3>
                <ul className="font-[family-name:var(--font-noto)] text-[13.5px] space-y-1.5 leading-relaxed">
                  <li>· 웨이브웍스행 → <b>두창시변리·죽도해수욕장</b> 하차</li>
                  <li>· 캠핑장행 → <b>북분리</b> 하차</li>
                  <li className="text-[#FF6B6B] font-bold">
                    · 출발 시간 07:00 / 11:20 / 14:20 / 18:10
                  </li>
                </ul>
              </div>
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
                  ② 강릉역 · 강릉시내 · 주문진 출발 — 주문진터미널 환승
                </h3>
                <ul className="font-[family-name:var(--font-noto)] text-[13.5px] space-y-1.5 leading-relaxed">
                  <li>1. 강릉에서 <b>300번 / 200번</b> → 주문진종합버스터미널 하차</li>
                  <li>2. 양양 마을버스 <b>322-1번</b> 환승 → 죽도해수욕장 또는 북분리 하차</li>
                  <li className="text-[#FF6B6B] font-bold">
                    · 322-1번 출발 07:30 / 09:10 / 14:25 / 16:50 / 18:30
                  </li>
                  <li className="text-text-muted text-[12.5px]">
                    ※ 일반 322번은 주문진터미널로 들어오지 않아요 — 꼭 <b>322-1번</b>!
                  </li>
                </ul>
              </div>
              <div className="border border-border bg-bg-soft p-6">
                <h3 className="font-[family-name:var(--font-noto)] text-[15px] font-black mb-3">
                  ③ 속초터미널 · 시내 출발
                </h3>
                <ul className="font-[family-name:var(--font-noto)] text-[13.5px] space-y-1.5 leading-relaxed">
                  <li>1. 속초에서 <b>9번 / 9-1번</b> → 종점 양양종합여객터미널 하차</li>
                  <li>2. <b>12번 버스</b> 또는 <b>인구행 완행 시외버스</b>로 환승</li>
                </ul>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 택시 ── */}
        <FadeIn>
          <section className="mb-14">
            <SectionTitle en="Taxi" ko="버스를 놓쳤다면? 택시 요금 안내" />
            <div className="overflow-x-auto border border-border">
              <table className="w-full font-[family-name:var(--font-noto)] text-[13px]">
                <thead>
                  <tr className="bg-bg-soft text-left">
                    <th className="p-3.5 font-black border-b border-border">출발지</th>
                    <th className="p-3.5 font-black border-b border-border">🏄 죽도 웨이브웍스</th>
                    <th className="p-3.5 font-black border-b border-border">⛺ 북분솔밭캠핑장</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3.5 font-bold border-b border-border">주문진터미널</td>
                    <td className="p-3.5 border-b border-border">약 12분 · 13,000~15,000원</td>
                    <td className="p-3.5 border-b border-border">약 15분 · 16,000~18,000원</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">양양터미널</td>
                    <td className="p-3.5">약 20분 · 22,000~25,000원</td>
                    <td className="p-3.5">약 17분 · 18,000~21,000원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </FadeIn>

        {/* ── 체크리스트 ── */}
        <FadeIn>
          <section className="mb-14">
            <SectionTitle en="Checklist" ko="방문 전 체크리스트" />
            <ul className="font-[family-name:var(--font-noto)] text-[14px] space-y-3 leading-relaxed">
              <li className="border border-border bg-bg-soft p-4">
                🚌 <b>실시간 버스 위치</b> — 양양 버스는 도로 상황 영향이 커요.{" "}
                <Link
                  href="https://bis.yangyang.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#006B7A] underline underline-offset-2"
                >
                  양양군 버스정보시스템 ↗
                </Link>
                을 활용하세요.
              </li>
              <li className="border border-border bg-bg-soft p-4">
                🧥 <b>가벼운 외투</b> — 바닷가는 해가 지면 기온이 뚝 떨어져요. 겉옷 하나 꼭
                챙겨오세요!
              </li>
              <li className="border border-border bg-bg-soft p-4">
                🧾 <b>영수증 이벤트</b> — 현남면 상점 구매 영수증을 죽도 운영본부로 가져오시면
                금액대별 굿즈로 바꿔드려요. (7/4 11:00~18:00 · 7/5 11:00~14:00, 소진 시 조기마감)
              </li>
            </ul>
          </section>
        </FadeIn>

        {/* ── 바로가기 ── */}
        <FadeIn>
          <section className="border-t border-border pt-10">
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/projects/hyeonnam-festival/my", label: "내 신청 조회 · 변경" },
                { href: "/projects/hyeonnam-festival/market", label: "프리마켓 26팀 보기" },
                { href: "/projects/hyeonnam-festival", label: "페스티벌 메인" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-center font-[family-name:var(--font-noto)] text-[13.5px] font-black border border-text px-4 py-3.5 hover:bg-text hover:text-white transition-colors"
                >
                  {l.label} →
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center font-[family-name:var(--font-noto)] text-[13px] text-text-muted">
              문의 ☎ 010-9542-3775 · 로마드협동조합
            </p>
          </section>
        </FadeIn>
      </div>

      <footer className="border-t border-border py-6 text-center text-[11px] text-text-muted font-[family-name:var(--font-noto)]">
        © 2026 LOMAD Cooperative · 농촌마을 활력화 사업
      </footer>
    </main>
  );
}
