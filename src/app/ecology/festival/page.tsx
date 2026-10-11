import type { Metadata } from "next";
import Link from "next/link";
import "@/components/projects/ecology-wetland.css";
import "@/components/projects/ecology/festeco-landing.css";
import {
  PROGRAM_NAME,
  HOST,
  ORGANIZER,
  FEE,
  TARGET,
  DURATION,
  INTRO,
  ACTIVITIES,
  MEETING_POINT,
  SUPPLIES,
  INQUIRY_TEL,
  CAPACITY_INFO,
  MAX_PER_APPLICATION,
  PRE_CAPACITY,
  ONSITE_CAPACITY,
  CLOSED_LABEL,
  NOTICES,
  SESSIONS,
  type FestecoSessionView,
} from "@/lib/festeco-config";
import { getSessionViews } from "@/lib/festeco-db";

// 회차별 잔여석·마감은 요청 시각 기준으로 매번 계산
export const dynamic = "force-dynamic";

const APPLY_URL = "/ecology/festival/apply";
const MY_PATH = "/ecology/festival/my";
const PERIOD = "2026년 10월 16일(금)~18일(일)";

const TITLE = "양양송이연어축제 남대천 생태탐방 | 로마드협동조합";
const DESCRIPTION = INTRO;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "https://lomadcoop.com/ecology/festival" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://lomadcoop.com/ecology/festival",
    images: [{ url: "/images/og-ecology-salmon.jpg", width: 1200, height: 630, alt: PROGRAM_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-ecology-salmon.jpg"],
  },
};

/** "2026-10-15T18:00:00+09:00" → "10월 15일(목) 18:00" (요일은 Intl 로 계산 — 직접 타이핑 금지) */
function formatKst(iso: string): string {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("month")}월 ${get("day")}일(${get("weekday")}) ${get("hour")}:${get("minute")}`;
}

const Check = ({ color }: { color: string }) => (
  <span className="chk" style={{ background: color, borderColor: color }}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="#F5EFE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 주요 활동 카드용 일러스트 (기존 생태체험 페이지의 일반 도형 재사용 + 단순 도형) */
const ACTIVITY_ILLUST = [
  // 01 숲과 물길
  <svg key="a1" width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
    <path d="M20 60 L34 28 L48 60 Z" fill="#6B7F3A" />
    <path d="M40 62 L56 22 L72 62 Z" fill="#3E4E22" />
    <path d="M66 60 L80 32 L94 60 Z" fill="#A8B367" />
    <rect x="0" y="70" width="130" height="34" fill="#7BA8B0" />
    <rect x="0" y="70" width="130" height="8" fill="#4A7A8A" />
    <path d="M0 86 Q 32 80 64 86 T 130 86" stroke="#fff" strokeWidth="1.4" fill="none" opacity="0.5" />
    <g transform="translate(108 44)">
      <path d="M0 0 Q 3 -18 -3 -32" stroke="#A8B367" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="-3" cy="-34" rx="3" ry="7" fill="#E8A845" />
    </g>
    <circle cx="104" cy="58" r="2" fill="#7BA8B0" />
    <circle cx="112" cy="50" r="1.6" fill="#7BA8B0" />
  </svg>,
  // 02 연어 한살이 윷놀이
  <svg key="a2" width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
    <rect x="16" y="40" width="98" height="52" rx="8" fill="#EDE5D1" stroke="#6B7F3A" strokeWidth="2" />
    <rect x="30" y="52" width="30" height="12" rx="6" fill="#C78128" />
    <rect x="70" y="52" width="30" height="12" rx="6" fill="#C78128" />
    <rect x="30" y="70" width="30" height="12" rx="6" fill="#E8A845" />
    <rect x="70" y="70" width="30" height="12" rx="6" fill="#E8A845" />
    <g transform="translate(65 30)">
      <ellipse cx="0" cy="0" rx="12" ry="5" fill="#E08A5C" />
      <path d="M10 0 L18 -5 L18 5 Z" fill="#C86B45" />
      <circle cx="-6" cy="-1" r="1.4" fill="#fff" />
    </g>
  </svg>,
  // 03 생태밧줄놀이 — 생물·물·숲을 잇는 줄
  <svg key="a3" width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
    <path d="M30 34 Q 65 50 100 34 M30 34 Q 40 70 65 88 M100 34 Q 90 70 65 88" stroke="#C78128" strokeWidth="2.5" fill="none" strokeDasharray="5 4" strokeLinecap="round" />
    <circle cx="30" cy="34" r="16" fill="#A8B367" />
    <path d="M24 40 L30 24 L36 40 Z" fill="#3E4E22" />
    <circle cx="100" cy="34" r="16" fill="#7BA8B0" />
    <path d="M90 36 Q 100 30 110 36" stroke="#fff" strokeWidth="2" fill="none" />
    <circle cx="65" cy="88" r="16" fill="#EFB08C" />
    <g transform="translate(65 88)">
      <ellipse cx="0" cy="0" rx="9" ry="4" fill="#E08A5C" />
      <path d="M7 0 L13 -4 L13 4 Z" fill="#C86B45" />
    </g>
  </svg>,
];

export default async function FestecoLandingPage() {
  let views: Record<string, FestecoSessionView> | null = null;
  try {
    views = await getSessionViews();
  } catch (e) {
    console.error("[festeco] landing availability fetch failed:", e);
    views = null; // 잔여석 없이 회차표만 표시
  }
  const now = Date.now();

  return (
    <div className="ecology-wetland-page festeco-landing">
      <div className="crumb">
        <Link href="/">LOMAD</Link>
        <span className="sep">/</span>
        <span>송이연어축제 남대천 생태탐방</span>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="pulse" /> SONGI SALMON FESTIVAL · ECO WALK
            </div>
            <h1 className="hero-title" style={{ fontSize: "clamp(36px, 5.4vw, 64px)" }}>
              양양송이연어축제
              <br />
              <span className="flow">남대천 생태탐방</span>
            </h1>
            <p className="hero-sub">{INTRO}</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href={APPLY_URL}>
                사전예약 신청하기 <Arrow />
              </Link>
              <Link className="btn btn-ghost" href={MY_PATH}>
                내 신청 확인·취소
              </Link>
            </div>
            <div className="hero-meta">
              <div>
                <div className="k">운영 기간</div>
                <div className="v">10월 16일(금)~18일(일)</div>
              </div>
              <div>
                <div className="k">참가비</div>
                <div className="v">{FEE}</div>
              </div>
              <div>
                <div className="k">집결·출발</div>
                <div className="v">축제장 93번 부스</div>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <svg viewBox="0 0 500 520" width="100%" height="100%" style={{ overflow: "visible" }} aria-hidden="true">
              <circle cx="395" cy="130" r="98" fill="#F4C964" opacity="0.30" />
              <circle cx="395" cy="130" r="76" fill="#F4C964" />
              <circle cx="395" cy="130" r="58" fill="#E8A845" />
              {/* 숲 능선 */}
              <path d="M0 300 Q 110 250 220 288 Q 330 320 420 270 Q 470 244 500 268 L500 320 L0 320 Z" fill="#A8B367" opacity="0.4" />
              <path d="M40 300 L70 230 L100 300 Z" fill="#6B7F3A" />
              <path d="M80 302 L118 210 L156 302 Z" fill="#3E4E22" />
              <path d="M140 300 L168 240 L196 300 Z" fill="#6B7F3A" opacity="0.85" />
              {/* 물길 */}
              <rect x="0" y="300" width="500" height="220" fill="#7BA8B0" />
              <rect x="0" y="300" width="500" height="220" fill="#4A7A8A" opacity="0.55" />
              <rect x="0" y="300" width="500" height="26" fill="#2E5461" opacity="0.5" />
              <path d="M0 340 Q 70 334 140 340 T 280 340 T 500 340" stroke="#fff" strokeWidth="1.6" fill="none" opacity="0.55" />
              <path d="M0 372 Q 90 366 180 372 T 360 372 T 500 372" stroke="#fff" strokeWidth="1.3" fill="none" opacity="0.45" />
              <path d="M0 408 Q 80 402 160 408 T 320 408 T 500 408" stroke="#fff" strokeWidth="1.1" fill="none" opacity="0.35" />
              {/* 연어 */}
              <g transform="translate(300 430) scale(-1 1)">
                <ellipse cx="0" cy="0" rx="34" ry="13" fill="#E08A5C" />
                <ellipse cx="3" cy="3" rx="28" ry="8" fill="#EFB08C" opacity="0.85" />
                <path d="M29 0 L48 -13 L48 13 Z" fill="#C86B45" />
                <circle cx="-19" cy="-3" r="3.6" fill="#fff" />
                <circle cx="-19" cy="-3" r="1.8" fill="#1E2818" />
              </g>
              <ellipse cx="90" cy="490" rx="20" ry="10" fill="#B7A886" opacity="0.7" />
              <ellipse cx="230" cy="500" rx="26" ry="11" fill="#A89A6E" opacity="0.6" />
              <ellipse cx="380" cy="492" rx="22" ry="10" fill="#B7A886" opacity="0.65" />
              {/* 강가 갈대 */}
              <g transform="translate(470 300)">
                <path d="M0 0 Q 5 -28 -3 -54" stroke="#6B7F3A" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M-12 0 Q -10 -24 -16 -44" stroke="#A8B367" strokeWidth="3" fill="none" strokeLinecap="round" />
                <ellipse cx="-3" cy="-56" rx="4" ry="10" fill="#C78128" />
                <ellipse cx="-16" cy="-46" rx="3.5" ry="8" fill="#E8A845" />
              </g>
              <g transform="translate(300 250) rotate(20)">
                <path d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C" />
              </g>
              <g transform="translate(405 300) rotate(-8)">
                <rect x="-50" y="-14" width="100" height="28" rx="3" fill="#F5EFE0" stroke="#4A7A8A" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="0" y="4" textAnchor="middle" fontFamily="Gaegu" fontSize="14" fill="#2E5461">
                  축제장 93번 부스
                </text>
              </g>
            </svg>
            <div className="stamp" style={{ top: "6%", left: "-2%", transform: "rotate(-8deg)" }}>
              생태관광지도사와 함께
            </div>
          </div>
        </div>
      </section>

      {/* 주요 활동 */}
      <section className="band" id="activities" style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="band-title-row">
            <div>
              <div className="section-label">주요 활동</div>
              <h2 className="section-title">
                걷고, 관찰하고,
                <br />
                놀이로 배워요
              </h2>
            </div>
            <p className="section-sub">{INTRO}</p>
          </div>
          <div className="learn-grid">
            {ACTIVITIES.map((a, i) => (
              <div className="learn-card" key={a.title}>
                <div className="lc-num">0{i + 1}</div>
                <div className="lc-illust">{ACTIVITY_ILLUST[i]}</div>
                <h3 className="lc-title">{a.title}</h3>
                <p className="lc-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 운영 안내 */}
      <section className="band" id="info">
        <div className="wrap">
          <div className="band-title-row">
            <div>
              <div className="section-label">운영 안내</div>
              <h2 className="section-title">한눈에 보는 참가 정보</h2>
            </div>
          </div>
          <div className="prog-card highlight">
            <div className="fe-info">
              <div className="pc-meta">
                <InfoRow k="운영" v={`${PERIOD} · ${DURATION}`} />
                <InfoRow k="대상" v={TARGET} />
                <InfoRow k="참가비" v={FEE} />
                <InfoRow k="인원" v={CAPACITY_INFO} />
                <InfoRow k="1건당 신청" v={`최대 ${MAX_PER_APPLICATION}명 (성인+어린이 합계)`} />
                <InfoRow k="현장접수" v={`현장접수 ${ONSITE_CAPACITY}명은 축제장 93번 부스에서 당일 운영`} />
              </div>
              <div className="pc-meta">
                <InfoRow k="집결·접수·출발" v={MEETING_POINT} />
                <InfoRow k="준비물" v={SUPPLIES} />
                <InfoRow k="사전예약 마감" v="각 회차 전날 오후 6시" />
                <InfoRow k="문의·취소" v={INQUIRY_TEL} />
                <InfoRow k="주최·주관" v={`주최 ${HOST} · 주관 ${ORGANIZER}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 회차표 */}
      <section className="band" id="schedule" style={{ background: "var(--sand)" }}>
        <div className="wrap">
          <div className="band-title-row">
            <div>
              <div className="section-label">회차 안내</div>
              <h2 className="section-title">
                사흘간 여섯 번,
                <br />
                회차를 골라 신청하세요
              </h2>
            </div>
            <p className="section-sub">
              회차별 사전예약 {PRE_CAPACITY}명. 사전예약은 각 회차 전날 오후 6시에 마감되며, 현장접수 {ONSITE_CAPACITY}명은
              축제장 93번 부스에서 당일 운영합니다.
            </p>
          </div>
          <div className="fe-sessions">
            {SESSIONS.map((s) => {
              const v = views?.[s.key];
              const closed = v ? v.closed : now >= new Date(s.closesAt).getTime();
              return (
                <div key={s.key} className={`fe-session${closed ? " closed" : ""}`}>
                  <div className="fe-round">{s.round}</div>
                  <div className="fe-when">{s.label}</div>
                  <div className="fe-deadline">사전예약 마감 {formatKst(s.closesAt)}</div>
                  {closed ? (
                    <span className="fe-status closed">{CLOSED_LABEL}</span>
                  ) : v ? (
                    <span className="fe-status">잔여 {v.remaining}석</span>
                  ) : null}
                </div>
              );
            })}
          </div>
          {!views && <p className="fe-note">※ 잔여석 정보를 불러오지 못했습니다. 신청 페이지에서 다시 확인해 주세요.</p>}
          <div className="fe-after">
            <Link className="btn btn-primary" href={APPLY_URL}>
              사전예약 신청하기 <Arrow />
            </Link>
            <Link className="btn btn-ghost" href={MY_PATH}>
              내 신청 확인·취소
            </Link>
          </div>
        </div>
      </section>

      {/* 참가자 안내 */}
      <section className="band checklist-band" id="notice" style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="band-title-row">
            <div>
              <div className="section-label">참가자 안내</div>
              <h2 className="section-title">
                참여 전에
                <br />꼭 확인해 주세요
              </h2>
            </div>
          </div>
          <ul className="check-list" style={{ maxWidth: 820 }}>
            {NOTICES.map((n, i) => (
              <li key={n}>
                <Check color={i === 0 ? "var(--coral)" : "var(--moss)"} />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="notes-band" id="faq">
        <div className="wrap">
          <div className="band-title-row">
            <div>
              <div className="section-label">자주 묻는 질문</div>
              <h2 className="section-title">궁금한 점을 모았어요</h2>
            </div>
          </div>
          <div className="faq" style={{ marginTop: 0 }}>
            <details>
              <summary>참가비가 있나요?</summary>
              <p>참가비는 {FEE}입니다.</p>
            </details>
            <details>
              <summary>누가 참여할 수 있나요?</summary>
              <p>{TARGET} 참여할 수 있습니다. 어린이는 보호자와 함께 참여해 주세요.</p>
            </details>
            <details>
              <summary>어디로 모이나요?</summary>
              <p>
                집결·접수·출발 장소는 <strong>{MEETING_POINT}</strong>입니다. 출발 10분 전까지 도착해 주세요.
              </p>
            </details>
            <details>
              <summary>사전예약은 언제 마감되나요?</summary>
              <p>각 회차 전날 오후 6시에 마감됩니다. 회차별 사전예약 인원은 {PRE_CAPACITY}명입니다.</p>
            </details>
            <details>
              <summary>사전예약을 못 했는데 참여할 수 있나요?</summary>
              <p>현장접수 {ONSITE_CAPACITY}명은 축제장 93번 부스에서 당일 운영합니다.</p>
            </details>
            <details>
              <summary>예약을 취소하려면 어떻게 하나요?</summary>
              <p>
                <Link href={MY_PATH} style={{ textDecoration: "underline" }}>
                  내 신청 확인·취소
                </Link>{" "}
                페이지에서 취소하거나, {INQUIRY_TEL}로 연락해 주세요.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" id="apply">
        <div className="wrap">
          <h2 className="section-title" style={{ color: "var(--cream)", margin: "0 auto 20px" }}>
            축제장에서 만나는
            <br />
            남대천 생태탐방
          </h2>
          <p>
            {PERIOD} · {FEE}
            <br />
            주최 {HOST} · 주관 {ORGANIZER}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="btn" style={{ background: "var(--sun)", color: "var(--forest)" }} href={APPLY_URL}>
              사전예약 신청하기 <Arrow />
            </Link>
            <Link
              className="btn"
              style={{ background: "transparent", border: "1.5px solid var(--cream)", color: "var(--cream)" }}
              href={MY_PATH}
            >
              내 신청 확인·취소
            </Link>
            <a
              className="btn"
              style={{ background: "transparent", border: "1.5px solid var(--cream)", color: "var(--cream)" }}
              href={`tel:${INQUIRY_TEL}`}
            >
              전화 문의 ({INQUIRY_TEL})
            </a>
          </div>
        </div>
      </section>

      {/* 모바일 하단 고정 CTA */}
      <div className="fe-sticky-spacer" aria-hidden="true" />
      <div className="fe-sticky">
        <Link className="btn btn-primary" href={APPLY_URL}>
          사전예약 신청하기 <Arrow />
        </Link>
        <Link className="btn btn-ghost fe-sticky-sub" href={MY_PATH}>
          내 신청
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="pc-meta-item">
      <div className="pc-meta-k">{k}</div>
      <div className="pc-meta-v">{v}</div>
    </div>
  );
}
