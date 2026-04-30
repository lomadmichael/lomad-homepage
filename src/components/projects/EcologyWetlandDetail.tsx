import "./ecology-wetland.css";

// 접수 오픈 시 아래 상수를 FormPay 폼 URL로 교체하고,
// CTA 섹션의 <span aria-disabled> 버튼을 <Link href={FORMPAY_URL}> 로 되돌린다.
// 참고: import Link from "next/link";
// const FORMPAY_URL = "<FormPay 폼 URL>";
const INQUIRY_TEL = "010-9542-3775";

const INLINE_HTML = `
<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>남대천 하구습지의 봄</span>
</div>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow"><span class="pulse"></span> 2026년 5월 · 양양 남대천 하구습지</div>
      <h1 class="hero-title">
        물과 땅이<br>
        만나는 자리,<br>
        <span class="flow">습지의 봄</span>을<br>
        만나러 가요
      </h1>
      <p class="hero-sub">
        양양 남대천 하구는 연어가 돌아오는 강이자, 개구리밥과 부들이 자라고 개구리가 깨어나는 살아있는 습지입니다.
        생태지도사와 함께 루페로 들여다보고, 뜰채로 건져 올리며, 작은 생명들의 비밀을 배워봐요.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="#apply" aria-disabled="true" style="pointer-events: auto; opacity: 0.85;">
          접수예정
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a class="btn btn-ghost" href="#programs">프로그램 살펴보기</a>
      </div>
      <div class="hero-meta">
        <div>
          <div class="k">탐험 장소</div>
          <div class="v">남대천 하구습지</div>
        </div>
        <div>
          <div class="k">참여 대상</div>
          <div class="v">어린이 · 가족</div>
        </div>
        <div>
          <div class="k">모집 인원</div>
          <div class="v">회당 선착순 16명</div>
        </div>
      </div>
    </div>

    <div class="hero-art">
      <svg viewBox="0 0 500 520" width="100%" height="100%" style="overflow: visible;" aria-hidden="true">
        <circle cx="370" cy="130" r="85" fill="#E8A845" opacity="0.9"/>
        <circle cx="370" cy="130" r="85" fill="none" stroke="#C78128" stroke-width="1.5" stroke-dasharray="2 6"/>
        <path d="M0 280 Q100 220 200 260 T400 240 T520 270 L520 320 L0 320 Z" fill="#6B7F3A" opacity="0.35"/>
        <path d="M0 300 Q120 250 260 285 T520 290 L520 330 L0 330 Z" fill="#6B7F3A" opacity="0.55"/>
        <path d="M0 330 L520 330 L520 520 L0 520 Z" fill="#4A7A8A"/>
        <path d="M0 340 Q80 335 160 340 T320 340 T520 340 L520 345 Q400 350 320 345 T160 350 T0 345 Z" fill="#6A94A2" opacity="0.6"/>
        <path d="M0 370 Q100 365 200 370 T400 370 T520 370 L520 375 Q400 380 300 375 T100 380 T0 375 Z" fill="#6A94A2" opacity="0.4"/>
        <g transform="translate(80, 395)">
          <ellipse cx="0" cy="0" rx="32" ry="10" fill="#6B7F3A"/>
          <path d="M-32 0 A 32 10 0 0 0 32 0" fill="#3E4E22" opacity="0.3"/>
          <path d="M-4 -2 L 12 -8" stroke="#3E4E22" stroke-width="1" opacity="0.4"/>
        </g>
        <g transform="translate(370, 420)">
          <ellipse cx="0" cy="0" rx="40" ry="12" fill="#8FB996"/>
          <path d="M-40 0 A 40 12 0 0 0 40 0" fill="#3E4E22" opacity="0.25"/>
        </g>
        <g transform="translate(220, 450)">
          <ellipse cx="0" cy="0" rx="28" ry="9" fill="#6B7F3A"/>
        </g>
        <g transform="translate(35, 160)">
          <path d="M10 170 Q 8 100 12 20 Q 14 10 16 2" stroke="#6B7F3A" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M14 170 Q 18 100 10 25 Q 7 12 4 5" stroke="#8FB996" stroke-width="4" fill="none" stroke-linecap="round"/>
          <path d="M18 170 Q 26 110 32 35 Q 34 22 36 15" stroke="#A8B367" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <path d="M6 170 Q -2 110 -10 40 Q -12 28 -14 22" stroke="#8FB996" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        </g>
        <g transform="translate(75, 180)">
          <path d="M0 150 L 0 15 Q 1 8 2 2" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M0 40 Q 10 35 15 30" stroke="#8FB996" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M0 70 Q -8 65 -12 68" stroke="#A8B367" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="2" cy="2" rx="1.5" ry="3" fill="#A8B367"/>
        </g>
        <g transform="translate(455, 190)">
          <line x1="0" y1="140" x2="0" y2="0" stroke="#6B7F3A" stroke-width="2.5" stroke-linecap="round"/>
          <g transform="translate(0, -5)">
            <path d="M0 0 Q-4 -10 -2 -22 Q4 -10 0 0" fill="#A8B367"/>
            <path d="M0 0 Q4 -8 8 -18 Q2 -6 0 0" fill="#8FB996"/>
            <path d="M0 0 Q-3 -14 -8 -25 Q-1 -10 0 0" fill="#6B7F3A"/>
          </g>
        </g>
        <g transform="translate(475, 210)">
          <line x1="0" y1="120" x2="0" y2="0" stroke="#8FB996" stroke-width="2" stroke-linecap="round"/>
          <path d="M0 0 Q2 -8 5 -16" stroke="#A8B367" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M0 0 Q-3 -7 -5 -14" stroke="#6B7F3A" stroke-width="2" fill="none" stroke-linecap="round"/>
        </g>
        <g transform="translate(350, 380)">
          <ellipse cx="0" cy="5" rx="32" ry="22" fill="#6B7F3A"/>
          <ellipse cx="0" cy="0" rx="30" ry="19" fill="#8FB996"/>
          <ellipse cx="0" cy="10" rx="18" ry="8" fill="#D8E0B4"/>
          <circle cx="-10" cy="-10" r="8" fill="#8FB996"/>
          <circle cx="10" cy="-10" r="8" fill="#8FB996"/>
          <circle cx="-10" cy="-11" r="5" fill="#F5EFE0"/>
          <circle cx="10" cy="-11" r="5" fill="#F5EFE0"/>
          <circle cx="-10" cy="-10" r="3" fill="#1E2818"/>
          <circle cx="10" cy="-10" r="3" fill="#1E2818"/>
          <circle cx="-9" cy="-11" r="1" fill="#F5EFE0"/>
          <circle cx="11" cy="-11" r="1" fill="#F5EFE0"/>
          <path d="M-6 4 Q 0 8 6 4" stroke="#3E4E22" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <circle cx="-12" cy="2" r="2" fill="#3E4E22" opacity="0.4"/>
          <circle cx="14" cy="5" r="2.5" fill="#3E4E22" opacity="0.4"/>
          <circle cx="4" cy="-3" r="1.5" fill="#3E4E22" opacity="0.4"/>
          <ellipse cx="-26" cy="18" rx="8" ry="4" fill="#6B7F3A" transform="rotate(-20 -26 18)"/>
          <ellipse cx="26" cy="18" rx="8" ry="4" fill="#6B7F3A" transform="rotate(20 26 18)"/>
        </g>
        <g transform="translate(150, 420)">
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#1E2818"/>
          <path d="M-7 0 L -18 -4 L -18 4 Z" fill="#1E2818"/>
          <circle cx="2" cy="-1" r="1.2" fill="#F5EFE0"/>
        </g>
        <g transform="translate(200, 465)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="#2A3A1A"/>
          <path d="M-5 0 L -14 -3 L -14 3 Z" fill="#2A3A1A"/>
          <circle cx="1.5" cy="-1" r="1" fill="#F5EFE0"/>
        </g>
        <g transform="translate(100, 470)">
          <ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#1E2818"/>
          <path d="M-6 0 L -16 -4 L -16 4 Z" fill="#1E2818"/>
          <circle cx="2" cy="-1" r="1.2" fill="#F5EFE0"/>
        </g>
        <g transform="translate(280, 180)">
          <ellipse cx="-10" cy="-3" rx="14" ry="4" fill="#D4705C" opacity="0.6"/>
          <ellipse cx="10" cy="-3" rx="14" ry="4" fill="#D4705C" opacity="0.6"/>
          <ellipse cx="-9" cy="3" rx="12" ry="3" fill="#E8A845" opacity="0.6"/>
          <ellipse cx="9" cy="3" rx="12" ry="3" fill="#E8A845" opacity="0.6"/>
          <rect x="-2" y="-1" width="4" height="18" rx="2" fill="#2E5461"/>
          <circle cx="0" cy="-3" r="3" fill="#2E5461"/>
        </g>
        <g transform="translate(400, 270) rotate(-8)">
          <rect x="-40" y="-14" width="80" height="28" rx="3" fill="#F5EFE0" stroke="#D4705C" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="0" y="4" text-anchor="middle" font-family="Gaegu" font-size="14" fill="#D4705C">봄 · 습지</text>
        </g>
      </svg>
      <div class="stamp" style="top: 8%; left: -4%; transform: rotate(-8deg);">생태지도사와 함께 🍃</div>
    </div>
  </div>
</section>

<section class="band" id="programs" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">두 가지 프로그램</div>
        <h2 class="section-title">어린이날엔 가볍게,<br>주말엔 깊이 있게.</h2>
      </div>
      <p class="section-sub">5월 5일 어린이날엔 누구나 참여할 수 있는 체험 부스를, 5월 23·30일엔 2시간 깊이 탐험하는 정규 프로그램을 운영합니다.</p>
    </div>

    <div class="prog-grid">
      <div class="prog-card">
        <div class="pc-icon">
          <svg width="54" height="54" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <circle cx="30" cy="30" r="28" fill="#E8A845" opacity="0.2"/>
            <ellipse cx="22" cy="22" rx="8" ry="10" fill="#D4705C"/>
            <path d="M22 32 L20 44" stroke="#3E4E22" stroke-width="1"/>
            <ellipse cx="36" cy="28" rx="7" ry="9" fill="#E8A845"/>
            <path d="M36 37 L37 46" stroke="#3E4E22" stroke-width="1"/>
            <path d="M22 32 L36 37" stroke="#3E4E22" stroke-width="1"/>
          </svg>
        </div>
        <div class="pc-type">PROGRAM 01 · 어린이날 특별 체험 부스</div>
        <h3 class="pc-title">루페로 보는<br>작은 세계와 봄꽃 뱃지</h3>
        <p class="pc-desc">어린이날 행사장을 찾은 누구나 자유롭게 참여할 수 있는 오픈 체험 부스. 돋보기로 들여다보는 습지 식물·물속 생물 관찰과, 세상에 하나뿐인 봄꽃 뱃지 만들기가 준비되어 있어요.</p>
        <div class="pc-meta">
          <div class="pc-meta-item">
            <div class="pc-meta-k">일시</div>
            <div class="pc-meta-v">5월 5일 (화) 10:00 – 15:00</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">장소</div>
            <div class="pc-meta-v">양양송이조각공원 (양양읍 송암리 502)<br>어린이날 행사 부스 운영장</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영</div>
            <div class="pc-meta-v">오전 A팀 10:00~11:30<br>오전 B팀 10:30~12:00<br>오후 A팀 13:00~14:30<br>오후 B팀 13:30~15:00<br><span style="color: var(--coral); font-weight:600;">팀마다 선착순 16명</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">대상</div>
            <div class="pc-meta-v">행사장 방문객 누구나</div>
          </div>
        </div>
        <a href="#apply" class="pc-cta">
          부스 안내 자세히
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>

      <div class="prog-card highlight">
        <div class="pc-icon">
          <svg width="54" height="54" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <circle cx="30" cy="30" r="28" fill="#A8B367" opacity="0.25"/>
            <circle cx="26" cy="26" r="12" fill="none" stroke="#E8A845" stroke-width="2.5"/>
            <circle cx="26" cy="26" r="8" fill="#F5EFE0" opacity="0.4"/>
            <path d="M35 35 L44 44" stroke="#E8A845" stroke-width="3" stroke-linecap="round"/>
            <ellipse cx="26" cy="28" rx="5" ry="3.5" fill="#8FB996"/>
            <circle cx="24" cy="25" r="1.5" fill="#1E2818"/>
            <circle cx="28" cy="25" r="1.5" fill="#1E2818"/>
          </svg>
        </div>
        <div class="pc-type">PROGRAM 02 · 정규 생태체험 프로그램</div>
        <h3 class="pc-title">생태지도사와 함께<br>습지의 비밀을 찾는 120분</h3>
        <p class="pc-desc">습지가 왜 우리 몸의 콩팥 같은 역할을 할까요? 개구리밥과 부들은 어떻게 물을 맑게 할까요? 알에서 올챙이, 개구리가 되기까지 — 생태지도사와 함께 습지 구석구석을 누비며 생물의 한살이를 관찰합니다.</p>
        <div class="pc-meta">
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영일</div>
            <div class="pc-meta-v">5월 23일 (토) · 5월 30일 (토)</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영시간</div>
            <div class="pc-meta-v">오전반 10:00 – 12:00<br>오후반 14:00 – 16:00 <span style="opacity:.6;">· 회당 120분</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">참여대상</div>
            <div class="pc-meta-v">어린이 및 동반 가족<br><span style="color: var(--sun); font-weight:600;">회당 선착순 16명</span> · 보호자 동반 필수</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">장소</div>
            <div class="pc-meta-v">남대천 하구습지 일대 (양양읍 송암리 502)</div>
          </div>
        </div>
        <a href="#apply" class="pc-cta">
          접수예정
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="band" id="schedule">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">5월의 일정</div>
        <h2 class="section-title">달력 위의 세 번의 만남</h2>
      </div>
    </div>
    <div class="timeline">
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">5월 5일</div>
        <div class="tl-day">화요일 · 어린이날</div>
        <div class="tl-label">어린이날 특별 체험 부스<br><span style="color: var(--ink-soft); font-weight: 400;">송이조각공원 · 오전/오후</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">5월 23일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 1회차<br><span style="color: var(--ink-soft); font-weight: 400;">하구습지 · 오전/오후반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">5월 30일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 2회차<br><span style="color: var(--ink-soft); font-weight: 400;">하구습지 · 오전/오후반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot" style="background: var(--sand); border-color: var(--ink-soft); opacity: 0.6;"></div>
        <div class="tl-date" style="color: var(--ink-soft);">6월 ~</div>
        <div class="tl-day">여름 프로그램 예정</div>
        <div class="tl-label" style="color: var(--ink-soft);">또 만나요, 습지에서</div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="learn" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">탐험 주요 내용</div>
        <h2 class="section-title">습지에서 배우는<br>세 가지 이야기</h2>
      </div>
      <p class="section-sub">뜰채와 루페, 관찰통을 손에 들고 생태지도사의 안내를 따라가며 직접 보고 기록합니다.</p>
    </div>
    <div class="learn-grid">
      <div class="learn-card">
        <div class="lc-num">01 / 습지 탐험</div>
        <div class="lc-illust">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <path d="M30 40 Q20 70 35 95 Q60 110 85 95 Q115 90 120 65 Q118 40 95 32 Q70 28 55 38 Q42 34 30 40 Z" fill="#8FB996"/>
            <path d="M40 55 Q50 50 60 55" stroke="#3E4E22" stroke-width="2" fill="none" stroke-linecap="round"/>
            <circle cx="70" cy="70" r="3" fill="#3E4E22"/>
            <path d="M85 60 Q 95 62 100 70" stroke="#3E4E22" stroke-width="2" fill="none" stroke-linecap="round"/>
            <text x="70" y="105" text-anchor="middle" font-family="Gaegu" font-size="13" fill="#3E4E22">우리 몸의 콩팥처럼</text>
          </svg>
        </div>
        <h3 class="lc-title">습지가 왜 중요할까요?</h3>
        <p class="lc-desc">물을 머금고, 정화하고, 수많은 생명을 품는 습지. 우리 몸의 콩팥 같은 역할을 하는 습지 생태계의 비밀을 풀어봐요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">02 / 식물 관찰</div>
        <div class="lc-illust">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <path d="M50 110 Q 48 70 52 20 Q 54 12 56 5" stroke="#6B7F3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M54 110 Q 58 70 50 24 Q 47 14 44 8" stroke="#8FB996" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M58 110 Q 66 78 72 35 Q 74 25 76 18" stroke="#A8B367" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M46 110 Q 38 78 32 38 Q 30 28 28 22" stroke="#8FB996" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M78 58 L 135 58" stroke="#A8C3CC" stroke-width="1" opacity="0.5"/>
            <ellipse cx="90" cy="58" rx="6" ry="3" fill="#6B7F3A"/>
            <ellipse cx="90" cy="57" rx="4.5" ry="2" fill="#A8B367"/>
            <ellipse cx="102" cy="60" rx="5" ry="2.5" fill="#8FB996"/>
            <ellipse cx="102" cy="59" rx="3.5" ry="1.5" fill="#A8B367"/>
            <ellipse cx="113" cy="58" rx="6" ry="3" fill="#6B7F3A"/>
            <ellipse cx="113" cy="57" rx="4.5" ry="2" fill="#8FB996"/>
            <ellipse cx="124" cy="60" rx="5" ry="2.5" fill="#8FB996"/>
            <ellipse cx="124" cy="59" rx="3.5" ry="1.5" fill="#A8B367"/>
            <path d="M90 60 Q 91 70 89 80" stroke="#6B7F3A" stroke-width="0.7" fill="none" opacity="0.6"/>
            <path d="M102 61 Q 103 72 101 82" stroke="#6B7F3A" stroke-width="0.7" fill="none" opacity="0.6"/>
            <path d="M113 60 Q 114 73 112 85" stroke="#6B7F3A" stroke-width="0.7" fill="none" opacity="0.6"/>
            <path d="M124 61 Q 125 72 123 82" stroke="#6B7F3A" stroke-width="0.7" fill="none" opacity="0.6"/>
          </svg>
        </div>
        <h3 class="lc-title">개구리밥과 부들 이야기</h3>
        <p class="lc-desc">물 위를 뒤덮은 연두색 개구리밥, 길게 올라온 부들 잎. 작은 부유식물과 정수식물이 어떻게 물을 맑게 하는지 함께 이야기 나눠요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">03 / 양서류 한살이</div>
        <div class="lc-illust">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <g transform="translate(18, 60)">
              <circle r="10" fill="#D8E0B4"/>
              <circle r="4" fill="#2A3A1A"/>
            </g>
            <text x="18" y="90" text-anchor="middle" font-family="Gaegu" font-size="10" fill="#3E4E22">알</text>
            <g transform="translate(52, 60)">
              <ellipse cx="0" cy="0" rx="8" ry="5" fill="#2A3A1A"/>
              <path d="M-7 0 L -18 -4 L -18 4 Z" fill="#2A3A1A"/>
              <circle cx="2" cy="-1" r="1" fill="#F5EFE0"/>
            </g>
            <text x="52" y="90" text-anchor="middle" font-family="Gaegu" font-size="10" fill="#3E4E22">올챙이</text>
            <g transform="translate(90, 60)">
              <ellipse cx="0" cy="0" rx="10" ry="7" fill="#6B7F3A"/>
              <circle cx="-4" cy="-4" r="3" fill="#8FB996"/>
              <circle cx="4" cy="-4" r="3" fill="#8FB996"/>
              <circle cx="-4" cy="-4" r="1.5" fill="#1E2818"/>
              <circle cx="4" cy="-4" r="1.5" fill="#1E2818"/>
              <path d="M8 4 L 16 8" stroke="#2A3A1A" stroke-width="2" stroke-linecap="round"/>
            </g>
            <text x="90" y="90" text-anchor="middle" font-family="Gaegu" font-size="10" fill="#3E4E22">어린 개구리</text>
            <g transform="translate(122, 58)">
              <ellipse cx="0" cy="0" rx="12" ry="9" fill="#8FB996"/>
              <ellipse cx="0" cy="3" rx="8" ry="4" fill="#D8E0B4"/>
              <circle cx="-5" cy="-5" r="3.5" fill="#8FB996"/>
              <circle cx="5" cy="-5" r="3.5" fill="#8FB996"/>
              <circle cx="-5" cy="-5" r="2" fill="#1E2818"/>
              <circle cx="5" cy="-5" r="2" fill="#1E2818"/>
            </g>
            <text x="122" y="90" text-anchor="middle" font-family="Gaegu" font-size="10" fill="#3E4E22">개구리</text>
            <path d="M30 60 L 40 60 M 64 60 L 78 60 M 102 58 L 110 58" stroke="#A8B367" stroke-width="1.5" stroke-dasharray="2 3"/>
          </svg>
        </div>
        <h3 class="lc-title">알에서 개구리까지</h3>
        <p class="lc-desc">말캉한 알, 꼬리가 긴 올챙이, 네 다리가 돋는 어린 개구리. 양서류의 신비로운 한살이를 직접 눈으로 따라가 봐요.</p>
      </div>
    </div>
  </div>
</section>

<section class="creatures-band">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">습지 친구들 도감</div>
        <h2 class="section-title">하구습지에서 만날<br>작은 생명들</h2>
      </div>
      <p class="section-sub">물 위 개구리밥 사이, 얕은 물가, 진흙 바닥까지 — 남대천 하구습지는 다양한 생물들의 보금자리입니다.</p>
    </div>
    <div class="creature-row">
      <div class="creature">
        <div class="creature-illust">
          <svg width="90" height="110" viewBox="0 0 90 110" aria-hidden="true">
            <path d="M0 35 L 90 35" stroke="#A8C3CC" stroke-width="1" opacity="0.5"/>
            <rect x="0" y="35" width="90" height="75" fill="#6A94A2" opacity="0.15"/>
            <path d="M5 25 Q 15 22 25 25" stroke="#A8C3CC" stroke-width="1" fill="none" opacity="0.5"/>
            <path d="M60 22 Q 70 19 80 22" stroke="#A8C3CC" stroke-width="1" fill="none" opacity="0.5"/>
            <g>
              <ellipse cx="18" cy="34" rx="7" ry="4" fill="#8FB996"/>
              <ellipse cx="18" cy="33" rx="5.5" ry="3" fill="#A8B367"/>
              <ellipse cx="30" cy="36" rx="6" ry="3.5" fill="#8FB996"/>
              <ellipse cx="30" cy="35" rx="4.5" ry="2.5" fill="#A8B367"/>
              <ellipse cx="42" cy="34" rx="7" ry="4" fill="#6B7F3A"/>
              <ellipse cx="42" cy="33" rx="5.5" ry="3" fill="#8FB996"/>
              <ellipse cx="55" cy="36" rx="5" ry="3" fill="#8FB996"/>
              <ellipse cx="55" cy="35" rx="3.5" ry="2" fill="#A8B367"/>
              <ellipse cx="66" cy="34" rx="6.5" ry="3.8" fill="#6B7F3A"/>
              <ellipse cx="66" cy="33" rx="5" ry="2.5" fill="#8FB996"/>
              <ellipse cx="78" cy="36" rx="5" ry="3" fill="#8FB996"/>
              <ellipse cx="10" cy="37" rx="4.5" ry="2.8" fill="#A8B367"/>
            </g>
            <path d="M18 37 Q 17 50 19 65" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M18 37 Q 19 48 17 60" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M30 38 Q 31 52 29 68" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M42 37 Q 41 55 43 72" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M42 37 Q 43 50 41 63" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M55 38 Q 56 55 54 70" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M66 37 Q 65 52 67 68" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M66 37 Q 67 48 65 60" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M78 38 Q 79 55 77 70" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M10 39 Q 11 52 9 64" stroke="#6B7F3A" stroke-width="0.8" fill="none" opacity="0.7"/>
            <g transform="translate(50, 85)">
              <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#2A3A1A"/>
              <path d="M-3 0 L -9 -2 L -9 2 Z" fill="#2A3A1A"/>
              <circle cx="1" cy="-0.5" r="0.6" fill="#F5EFE0"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">개구리밥 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(부유식물)</span></div>
        <div class="creature-lat">Spirodela polyrhiza · 부유식물</div>
        <div class="creature-desc">물 위에 둥둥 떠다니는 엄지손팩 만한 작은 잎. 올챙이의 먹이이자 '부평초'라도 불려요. 5월이 되면 물 색이 보이지 않을 만큼 빠르게 퍼집니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="80" height="110" viewBox="0 0 80 110" aria-hidden="true">
            <path d="M0 98 Q 20 96 40 98 T 80 98" stroke="#A8C3CC" stroke-width="1.5" fill="none" opacity="0.5"/>
            <path d="M38 98 Q 36 60 40 15 Q 42 8 44 3" stroke="#6B7F3A" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M40 98 Q 44 60 40 18 Q 38 10 36 5" stroke="#8FB996" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M42 98 Q 48 70 52 25 Q 53 15 54 10" stroke="#A8B367" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M36 98 Q 30 70 26 28 Q 25 18 24 13" stroke="#8FB996" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path d="M44 98 Q 56 75 62 35 Q 64 28 65 22" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M34 98 Q 22 75 15 40 Q 13 32 12 27" stroke="#A8B367" stroke-width="3" fill="none" stroke-linecap="round"/>
            <ellipse cx="44" cy="3" rx="1.2" ry="2.5" fill="#A8B367"/>
            <ellipse cx="36" cy="5" rx="1.2" ry="2.5" fill="#6B7F3A"/>
            <ellipse cx="54" cy="10" rx="1.2" ry="2.5" fill="#6B7F3A"/>
            <ellipse cx="24" cy="13" rx="1.2" ry="2.5" fill="#A8B367"/>
          </svg>
        </div>
        <div class="creature-name">부들 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(5월 잎만)</span></div>
        <div class="creature-lat">Typha orientalis · 정수식물</div>
        <div class="creature-desc">소시지 모양 꽃이삭은 6~7월에야 올라와요. 5월에는 아직 길쭉한 잎만 보이고, 뿌리는 진흙에서 오염물질을 흡수하며 물을 맑게 해줘요.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true">
            <g transform="translate(55, 65)">
              <ellipse cx="0" cy="5" rx="32" ry="22" fill="#6B7F3A"/>
              <ellipse cx="0" cy="0" rx="30" ry="19" fill="#8FB996"/>
              <ellipse cx="0" cy="10" rx="18" ry="8" fill="#D8E0B4"/>
              <circle cx="-10" cy="-10" r="8" fill="#8FB996"/>
              <circle cx="10" cy="-10" r="8" fill="#8FB996"/>
              <circle cx="-10" cy="-11" r="5" fill="#F5EFE0"/>
              <circle cx="10" cy="-11" r="5" fill="#F5EFE0"/>
              <circle cx="-10" cy="-10" r="3" fill="#1E2818"/>
              <circle cx="10" cy="-10" r="3" fill="#1E2818"/>
              <path d="M-6 4 Q 0 8 6 4" stroke="#3E4E22" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <circle cx="-12" cy="2" r="2" fill="#3E4E22" opacity="0.4"/>
              <circle cx="14" cy="5" r="2.5" fill="#3E4E22" opacity="0.4"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">청개구리</div>
        <div class="creature-lat">Dryophytes japonicus · 양서류</div>
        <div class="creature-desc">알 → 올챙이 → 어린 개구리 → 개구리. 물과 뭍 양쪽에서 살아간다고 해서 '양서류'. 봄이 오면 울음소리로 습지의 아침을 엽니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="130" height="110" viewBox="0 0 130 110" aria-hidden="true">
            <path d="M10 95 Q 30 92 50 95 T 90 95 T 120 95" stroke="#A8C3CC" stroke-width="1.5" fill="none" opacity="0.6"/>
            <path d="M18 62 Q 35 45 55 52 Q 75 58 92 50 Q 108 44 116 58 Q 118 68 108 72 Q 92 76 75 70 Q 58 66 42 72 Q 25 78 18 68 Z" fill="#6B4226"/>
            <path d="M22 62 Q 38 50 55 56 Q 75 61 92 54 Q 106 49 112 60 Q 113 66 106 68 Q 92 70 76 65 Q 58 60 42 67 Q 28 72 22 64 Z" fill="#8A5A33"/>
            <circle cx="45" cy="59" r="2.5" fill="#E8A845"/>
            <circle cx="62" cy="62" r="2" fill="#E8A845"/>
            <circle cx="78" cy="58" r="2.5" fill="#E8A845"/>
            <circle cx="95" cy="58" r="2" fill="#E8A845"/>
            <path d="M38 70 L 32 82 L 28 82 M 38 70 L 36 82 L 32 82" stroke="#6B4226" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M82 66 L 84 80 L 88 80 M 82 66 L 80 80 L 84 80" stroke="#6B4226" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <ellipse cx="20" cy="64" rx="6" ry="5" fill="#6B4226"/>
            <circle cx="22" cy="62" r="1.5" fill="#1E2818"/>
            <circle cx="22.5" cy="61.5" r="0.5" fill="#F5EFE0"/>
            <path d="M16 66 Q 19 68 22 66" stroke="#3E2818" stroke-width="1" fill="none" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="creature-name">도롱뇽</div>
        <div class="creature-lat">Hynobius leechii · 양서류</div>
        <div class="creature-desc">개구리와 함께 습지에 사는 또 다른 양서류. 맑은 물에서만 살아 '1급수 지킴이'라 불려요. 봄 습지의 보물이 된 알주머니를 찾아봐요.</div>
      </div>
    </div>
  </div>
</section>

<section class="band checklist-band" id="prepare">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">준비물 안내</div>
        <h2 class="section-title">이렇게 챙겨오면<br>든든해요</h2>
      </div>
      <p class="section-sub">야외활동이니 움직이기 편한 복장으로 오세요.</p>
    </div>
    <div class="check-grid">
      <div class="check-col">
        <h3>
          <span class="badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7l-3-3-10 10v3h3L20 7zM12 5l4 4" stroke="#3E4E22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          개인 준비물
        </h3>
        <ul class="check-list">
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>필기구 (연필·노트)</li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>야외활동에 편한 복장</li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>운동화 (젖어도 괜찮은 것)</li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>햇빛을 가릴 모자</li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>마실 물 한 병</li>
        </ul>
      </div>
      <div class="check-col">
        <h3>
          <span class="badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" stroke="#3E4E22" stroke-width="2"/><path d="M8 6V4m8 2V4" stroke="#3E4E22" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          현장 제공
        </h3>
        <ul class="check-list">
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>루페 (돋보기)</li>
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>만들기 체험 재료 (봄꽃 뱃지)</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="notes-band" id="faq">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">유의사항</div>
        <h2 class="section-title">습지의 친구들과<br>함께 지켜주세요</h2>
      </div>
    </div>
    <div class="notes-grid">
      <div class="note-card">
        <strong>🍃 자연을 훼손하지 않도록</strong><br>
        습지의 식물과 동물은 모두 제자리에 살아가고 있어요. 꺾거나 가져가지 않고, 있는 그대로 관찰해 주세요.
      </div>
      <div class="note-card">
        <strong>🐸 관찰 후에는 제자리로</strong><br>
        뜰채로 건져 올린 생물은 관찰이 끝나면 원래 살던 물가에 다시 놓아주는 배려가 필요해요.
      </div>
      <div class="note-card">
        <strong>💧 물가 안전 수칙</strong><br>
        습지는 물과 진흙이 섞인 곳입니다. 지도사의 안내에 따라, 물가에 너무 가까이 가지 않도록 주의해 주세요.
      </div>
      <div class="note-card">
        <strong>👨‍👩‍👧 가족 체험 프로그램</strong><br>
        본 프로그램은 가족 단위로 진행됩니다. 신청 시 어린이 단독이 아닌 <strong>보호자가 함께 신청</strong>해 주세요.
      </div>
    </div>

    <div class="faq">
      <details>
        <summary>비가 오면 프로그램이 어떻게 되나요?</summary>
        <p>소량의 비는 우비를 준비해 진행하지만, 호우나 천둥번개 등 안전이 우려되는 기상 상황에서는 일정이 조정될 수 있어요. 기상 상황에 따라 개별 안내드립니다.</p>
      </details>
      <details>
        <summary>몇 살부터 참여할 수 있나요?</summary>
        <p>초등학생 이상의 어린이와 동반 가족을 기본 대상으로 합니다. 미취학 아동의 경우 보호자가 안전을 충분히 살펴주실 수 있다면 함께하실 수 있어요.</p>
      </details>
      <details>
        <summary>주차는 어떻게 하나요?</summary>
        <p>양양송이조각공원(양양읍 송암리 502) 주차장을 이용하실 수 있습니다. 행사일에는 만차가 될 수 있으니 여유있게 도착해 주세요.</p>
      </details>
      <details>
        <summary>신청 취소는 어떻게 하나요?</summary>
        <p>대기 중인 분들을 위해 참석이 어려워지면 <strong>최소 전일까지</strong> 문의처로 연락해 주세요. 한 자리가 또 한 가족의 경험이 됩니다.</p>
      </details>
    </div>
  </div>
</section>
`;

export default function EcologyWetlandDetail() {
  return (
    <div className="ecology-wetland-page">
      <div dangerouslySetInnerHTML={{ __html: INLINE_HTML }} />

      {/* CTA section with real React links for FormPay + tel */}
      <section className="cta-band" id="apply">
        <div className="wrap">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{ marginBottom: 24 }}
            aria-hidden="true"
          >
            <circle cx="40" cy="40" r="38" fill="#A8B367" opacity="0.2" />
            <g transform="translate(40, 40)">
              <ellipse cx="0" cy="5" rx="22" ry="15" fill="#6B7F3A" />
              <ellipse cx="0" cy="2" rx="20" ry="13" fill="#8FB996" />
              <circle cx="-7" cy="-7" r="5.5" fill="#8FB996" />
              <circle cx="7" cy="-7" r="5.5" fill="#8FB996" />
              <circle cx="-7" cy="-8" r="3" fill="#F5EFE0" />
              <circle cx="7" cy="-8" r="3" fill="#F5EFE0" />
              <circle cx="-7" cy="-7" r="1.8" fill="#1E2818" />
              <circle cx="7" cy="-7" r="1.8" fill="#1E2818" />
            </g>
          </svg>
          <h2
            className="section-title"
            style={{ color: "var(--cream)", margin: "0 auto 20px" }}
          >
            5월의 어느 토요일,<br />
            습지에서 만나요
          </h2>
          <p>
            회차별 선착순 16명으로 곧 접수가 열립니다.<br />
            소식 받아보시려면 아래 번호로 문의해 주세요.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              className="btn"
              style={{
                background: "var(--sun)",
                color: "var(--forest)",
                opacity: 0.85,
                cursor: "default",
              }}
              aria-disabled="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 7v5l3 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              접수예정
            </span>
            <a
              className="btn"
              style={{
                background: "transparent",
                border: "1.5px solid var(--cream)",
                color: "var(--cream)",
              }}
              href={`tel:${INQUIRY_TEL}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              전화로 문의하기 ({INQUIRY_TEL})
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
