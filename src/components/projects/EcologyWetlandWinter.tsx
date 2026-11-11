import "./ecology-wetland.css";

// 11월 정규 프로그램: 남대천, 겨울을 준비하는 생물들 (곤충·식물·새의 겨울나기)
// EcologyWetlandSalmon 컴포넌트의 디자인 시스템·class를 그대로 사용하고
// 콘텐츠/일러스트만 11월 겨울나기용으로 갈음.
const INQUIRY_TEL = "010-9542-3775";
const REGISTER_URL = "/ecology/register"; // 자체 접수 페이지

const CHK_MOSS = `<span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
const CHK_SUN = `<span class="chk" style="background: var(--sun); border-color: var(--sun);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
const CHK_CORAL = `<span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
const CHK_PLAIN = `<span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

const INLINE_HTML = `
<style>
  /* 11월 전용 강조색 — 늦가을 단풍(적갈색). 공통 CSS 변수만 이 페이지에서 덮어씀 (다른 달 페이지 영향 없음). */
  .ecology-wetland-page.season-late-autumn {
    --forest: #4A2418; --deep-moss: #6E3420; --moss: #A0522D; --reed: #D29A6A;
    --ink: #2A1A14; --ink-soft: #5A463C;
    word-break: keep-all; /* 한글 단어 중간에서 줄이 꺾이지 않게 */
  }
  .ecology-wetland-page .nw { white-space: nowrap; }
  /* 11월 회차 전용: 일정 3칸(데스크톱) + 진행 순서 표. 모바일은 공통 규칙으로 접힘. */
  @media (min-width: 901px) {
    .ecology-wetland-page .timeline.cols-3 { grid-template-columns: repeat(3, 1fr); }
  }
  .ecology-wetland-page .tt { list-style: none; padding: 0; margin: 0 auto; max-width: 820px; }
  .ecology-wetland-page .tt li { display: grid; grid-template-columns: 76px 1fr; gap: 16px; padding: 16px 0; border-bottom: 1px dashed rgba(110, 52, 32, 0.25); }
  .ecology-wetland-page .tt li:last-child { border-bottom: none; }
  .ecology-wetland-page .tt .tt-time { font-family: var(--font-noto); font-weight: 700; font-size: 17px; color: var(--coral); }
  .ecology-wetland-page .tt .tt-title { font-weight: 700; color: var(--forest); margin-bottom: 2px; }
  .ecology-wetland-page .tt .tt-desc { font-size: 13px; color: var(--ink-soft); line-height: 1.6; }
</style>

<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>남대천, 겨울을 준비하는 생물들</span>
</div>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow"><span class="pulse"></span> 2026년 11월 · 양양 남대천</div>
      <h1 class="hero-title">
        남대천,<br>
        <span class="flow">겨울을 준비하는<br>생물들</span>
      </h1>
      <p class="hero-sub">
        숲은 겨울에도 살아 있어요! 겨울을 앞둔 양양 남대천에서 곤충과 식물, 새들이
        추운 계절을 준비하는 다양한 방법을 알아보는 생태관광 프로그램입니다.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${REGISTER_URL}">
          11월 생태체험 접수
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a class="btn btn-ghost" href="#programs">프로그램 살펴보기</a>
      </div>
      <div class="hero-meta">
        <div>
          <div class="k">체험 장소</div>
          <div class="v">양양문화복지회관 앞 남대천 일원</div>
        </div>
        <div>
          <div class="k">참여 대상</div>
          <div class="v">가족 · 일반 성인 누구나 <span class="nw">(초등학생 이상 권장)</span></div>
        </div>
        <div>
          <div class="k">모집 인원</div>
          <div class="v">회차별 10~15명 내외</div>
        </div>
      </div>
    </div>

    <div class="hero-art">
      <svg viewBox="0 0 500 520" width="100%" height="100%" style="overflow: visible;" aria-hidden="true">
        <!-- 늦가을 해 (우상단, 잘리지 않게 안전 위치) -->
        <circle cx="395" cy="120" r="92" fill="#F4C964" opacity="0.25"/>
        <circle cx="395" cy="120" r="68" fill="#F4C964" opacity="0.85"/>
        <circle cx="395" cy="120" r="50" fill="#E8A845" opacity="0.9"/>

        <!-- 먼 산 능선 (늦가을 빛) -->
        <path d="M0 300 Q 110 250 220 288 Q 330 320 420 270 Q 470 244 500 268 L500 320 L0 320 Z" fill="#B08A4E" opacity="0.35"/>

        <!-- 강물 -->
        <rect x="0" y="330" width="500" height="190" fill="#7BA8B0"/>
        <rect x="0" y="330" width="500" height="190" fill="#4A7A8A" opacity="0.5"/>
        <rect x="0" y="330" width="500" height="20" fill="#2E5461" opacity="0.45"/>
        <path d="M0 370 Q 70 364 140 370 T 280 370 T 500 370" stroke="#fff" stroke-width="1.6" fill="none" opacity="0.5"/>
        <path d="M0 404 Q 90 398 180 404 T 360 404 T 500 404" stroke="#fff" stroke-width="1.3" fill="none" opacity="0.4"/>
        <path d="M0 440 Q 80 434 160 440 T 320 440 T 500 440" stroke="#fff" stroke-width="1.1" fill="none" opacity="0.3"/>

        <!-- 강둑 (낙엽 쌓인 땅) -->
        <path d="M0 300 Q 120 290 250 302 Q 380 314 500 298 L500 336 L0 336 Z" fill="#C9A66B"/>
        <ellipse cx="70" cy="318" rx="16" ry="5" fill="#D4705C" opacity="0.7"/>
        <ellipse cx="300" cy="322" rx="14" ry="4.5" fill="#E8A845" opacity="0.75"/>
        <ellipse cx="430" cy="314" rx="12" ry="4" fill="#C78128" opacity="0.7"/>

        <!-- 나무 (줄기 + 겨울눈 달린 가지) -->
        <g transform="translate(110 300)">
          <path d="M0 0 L0 -150" stroke="#6B4E2E" stroke-width="12" stroke-linecap="round"/>
          <path d="M0 -70 Q 30 -95 62 -110" stroke="#6B4E2E" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M0 -105 Q -28 -128 -54 -136" stroke="#6B4E2E" stroke-width="5" fill="none" stroke-linecap="round"/>
          <path d="M0 -145 Q 16 -170 34 -182" stroke="#6B4E2E" stroke-width="4" fill="none" stroke-linecap="round"/>
          <!-- 겨울눈 -->
          <ellipse cx="64" cy="-112" rx="3.5" ry="6" fill="#A86A44" transform="rotate(30 64 -112)"/>
          <ellipse cx="-56" cy="-137" rx="3.5" ry="6" fill="#A86A44" transform="rotate(-50 -56 -137)"/>
          <ellipse cx="36" cy="-184" rx="3.5" ry="6" fill="#A86A44" transform="rotate(40 36 -184)"/>
          <!-- 남은 단풍잎 -->
          <path transform="translate(40 -98) rotate(10)" d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C"/>
          <path transform="translate(-30 -124) rotate(-20)" d="M0 -8 L3 -2 L9 -3 L5 1 L7 7 L0 4 L-7 7 L-5 1 L-9 -3 L-3 -2 Z" fill="#E8A845"/>
          <!-- 나무껍질 틈 -->
          <path d="M-2 -30 Q 2 -40 -2 -50" stroke="#4A3620" stroke-width="1.5" fill="none" opacity="0.6"/>
          <path d="M2 -80 Q -2 -90 2 -98" stroke="#4A3620" stroke-width="1.5" fill="none" opacity="0.6"/>
        </g>

        <!-- 떨어지는 단풍잎 -->
        <g transform="translate(250 200) rotate(25)">
          <path d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C"/>
        </g>
        <g transform="translate(200 250) rotate(-15)">
          <path d="M0 -8 L3 -2 L9 -3 L5 1 L7 7 L0 4 L-7 7 L-5 1 L-9 -3 L-3 -2 Z" fill="#E8A845"/>
        </g>
        <g transform="translate(320 262) rotate(40)">
          <path d="M0 -8 L3 -2 L9 -3 L5 1 L7 7 L0 4 L-7 7 L-5 1 L-9 -3 L-3 -2 Z" fill="#C78128"/>
        </g>

        <!-- 날아가는 새 (탐조) -->
        <path d="M250 110 Q 262 98 274 110 Q 286 98 298 110" stroke="#2E5461" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M300 160 Q 309 151 318 160 Q 327 151 336 160" stroke="#2E5461" stroke-width="2" fill="none" stroke-linecap="round"/>

        <!-- 물가에 앉은 새 -->
        <g transform="translate(400 296)">
          <ellipse cx="0" cy="0" rx="20" ry="13" fill="#5A7A86"/>
          <circle cx="-16" cy="-10" r="8" fill="#5A7A86"/>
          <path d="M-24 -10 L-32 -8 L-24 -6 Z" fill="#E8A845"/>
          <circle cx="-18" cy="-12" r="1.6" fill="#1E2818"/>
          <path d="M-4 -4 Q 8 -10 18 -2" stroke="#456570" stroke-width="2" fill="none"/>
          <path d="M18 2 L30 -2 L28 6 Z" fill="#456570"/>
          <line x1="-4" y1="12" x2="-6" y2="22" stroke="#C78128" stroke-width="2"/>
          <line x1="4" y1="12" x2="4" y2="22" stroke="#C78128" stroke-width="2"/>
        </g>

        <!-- 도토리·씨앗 (강둑) -->
        <g transform="translate(220 316)">
          <ellipse cx="0" cy="3" rx="6" ry="8" fill="#B07A3E"/>
          <path d="M-7 -1 Q 0 -8 7 -1 Z" fill="#6B4E2E"/>
        </g>
        <g transform="translate(240 320)">
          <ellipse cx="0" cy="2" rx="5" ry="6.5" fill="#C98A52"/>
          <path d="M-6 -1 Q 0 -7 6 -1 Z" fill="#6B4E2E"/>
        </g>

        <!-- 물속 조약돌 -->
        <ellipse cx="90" cy="490" rx="20" ry="10" fill="#B7A886" opacity="0.7"/>
        <ellipse cx="230" cy="500" rx="26" ry="11" fill="#A89A6E" opacity="0.6"/>
        <ellipse cx="380" cy="492" rx="22" ry="10" fill="#B7A886" opacity="0.65"/>

        <!-- 메모 스티커 (현장 느낌) -->
        <g transform="translate(390 380) rotate(-8)">
          <rect x="-56" y="-14" width="112" height="28" rx="3" fill="#F5EFE0" stroke="#4A7A8A" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="0" y="4" text-anchor="middle" font-family="Gaegu" font-size="14" fill="#2E5461">숲은 겨울에도 살아 있어요</text>
        </g>
      </svg>
      <div class="stamp" style="top: 6%; left: -4%; transform: rotate(-8deg);">생태관광지도사와 함께 🍂</div>
    </div>
  </div>
</section>

<section class="band" id="programs" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">11월 정규 프로그램</div>
        <h2 class="section-title">숲에서 만나는<br>생명의 겨울나기</h2>
      </div>
      <p class="section-sub">겨울을 앞둔 양양 남대천에서 곤충과 식물, 새들이 추운 계절을 준비하는 다양한 방법을 알아보는 생태관광 프로그램입니다.</p>
    </div>

    <div class="prog-grid">
      <div class="prog-card highlight" style="grid-column: 1 / -1;">
        <div class="pc-icon">
          <svg width="54" height="54" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <circle cx="30" cy="30" r="28" fill="#C78128" opacity="0.3"/>
            <path transform="translate(30 30) scale(1.6)" d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#E8A845"/>
            <path d="M30 38 L30 50" stroke="#C78128" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="pc-type">PROGRAM · 정규 생태체험 프로그램</div>
        <h3 class="pc-title">곤충과 식물, 새들이<br>겨울을 준비하는 방법</h3>
        <p class="pc-desc">생태관광지도사와 함께 낙엽 밑과 나무껍질 사이를 살펴보며 곤충의 겨울집을 찾아보고, 알·애벌레·번데기·성충 등 서로 다른 모습으로 겨울을 나는 곤충의 생태를 관찰합니다. 울긋불긋 물든 나뭇잎은 왜 색이 변하고 떨어지는지, 나무의 겨울눈 속에는 무엇이 숨어 있는지도 알아봅니다. 남대천 주변에서 다양한 열매와 씨앗을 관찰하고 채집하여 씨앗 탐구 분류판을 만들어 봅니다. 쌍안경을 이용해 남대천에서 겨울을 보내는 새를 찾아보며, 남대천이 여러 생물에게 중요한 서식지인 이유도 함께 배워봅니다.</p>
        <div class="pc-meta">
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영일</div>
            <div class="pc-meta-v"><span class="nw">11월 15일(일)</span> · <span class="nw">11월 22일(일)</span> · <span class="nw">11월 29일(일)</span><br><span style="color: rgba(245,239,224,0.78); font-size:12px;">회차별 10~15명 내외</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영시간</div>
            <div class="pc-meta-v">오전 10:00~12:00<br><span style="color: rgba(245,239,224,0.78); font-size:12px;">약 120분</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">참여대상</div>
            <div class="pc-meta-v">가족 · 일반 성인 누구나 (초등학생 이상 권장)<br><span style="color: var(--sun); font-weight:600;">참가비 무료</span> · 초등학생을 포함한 모든 어린이는 보호자 동반 필수</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">장소</div>
            <div class="pc-meta-v">양양문화복지회관 앞 남대천 일원<br><span style="color: var(--coral); font-weight:600;">예약 마감: 체험일 1일 전</span></div>
          </div>
        </div>
        <a href="${REGISTER_URL}" class="pc-cta">
          접수하기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 12px; color: var(--ink-soft); line-height: 1.7;">
      ※ 관찰할 수 있는 곤충과 조류의 종류는 당일 기상과 자연환경에 따라 달라질 수 있습니다.<br>
      ※ 세부 활동은 현장 여건과 지도사의 진행 방식에 따라 일부 변경될 수 있습니다.
    </p>
  </div>
</section>

<section class="band" id="activities" style="background: var(--sand);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">주요 활동</div>
        <h2 class="section-title">이런 활동으로<br>겨울나기를 만나요</h2>
      </div>
      <p class="section-sub">곤충의 겨울집 찾기부터 겨울눈 관찰, 씨앗 탐구 분류판 만들기, 새 탐조까지 남대천의 늦가을을 온몸으로 만납니다.</p>
    </div>
    <ul class="check-list" style="max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px;">
      <li>${CHK_MOSS}곤충의 겨울나기 방법 알아보기</li>
      <li>${CHK_MOSS}낙엽 밑과 나무껍질에서 곤충의 겨울집 찾기</li>
      <li>${CHK_MOSS}단풍과 낙엽이 생기는 이유 알아보기</li>
      <li>${CHK_MOSS}나무의 잎눈과 꽃눈 관찰하기</li>
      <li>${CHK_SUN}<strong>열매와 씨앗 관찰 및 씨앗 탐구 분류판 만들기</strong></li>
      <li>${CHK_SUN}<strong>남대천에서 겨울을 보내는 새 탐조하기</strong></li>
      <li>${CHK_MOSS}자연을 보호하기 위한 우리의 다짐 나누기</li>
    </ul>
  </div>
</section>

<section class="band" id="schedule">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">11월의 일정</div>
        <h2 class="section-title">달력 위의 세 번의 만남</h2>
      </div>
    </div>
    <div class="timeline cols-3">
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">11월 15일(일)</div>
        <div class="tl-day">오전 10:00~12:00</div>
        <div class="tl-label">겨울을 준비하는 생물들 1회차</div>
      </div>
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">11월 22일(일)</div>
        <div class="tl-day">오전 10:00~12:00</div>
        <div class="tl-label">겨울을 준비하는 생물들 2회차</div>
      </div>
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">11월 29일(일)</div>
        <div class="tl-day">오전 10:00~12:00</div>
        <div class="tl-label">겨울을 준비하는 생물들 3회차</div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="learn" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">프로그램 흐름</div>
        <h2 class="section-title">찾고, 관찰하고,<br>만들고, 지켜보고</h2>
      </div>
      <p class="section-sub">생태관광지도사의 안내를 따라 네 가지 이야기로 남대천 생물들의 겨울나기를 만납니다.</p>
    </div>
    <div class="learn-grid cols-4">
      <div class="learn-card">
        <div class="lc-num">01 / 곤충</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <path d="M0 92 Q 65 84 130 92 L130 104 L0 104 Z" fill="#C9A66B"/>
            <path transform="translate(40 86) rotate(-10)" d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C"/>
            <path transform="translate(92 88) rotate(20)" d="M0 -8 L3 -2 L9 -3 L5 1 L7 7 L0 4 L-7 7 L-5 1 L-9 -3 L-3 -2 Z" fill="#E8A845"/>
            <!-- 애벌레 -->
            <g transform="translate(50 62)">
              <circle cx="0" cy="0" r="6" fill="#A8B367"/>
              <circle cx="10" cy="-2" r="6" fill="#A8B367"/>
              <circle cx="20" cy="0" r="6" fill="#A8B367"/>
              <circle cx="30" cy="-2" r="7" fill="#6B7F3A"/>
              <circle cx="32" cy="-4" r="1.4" fill="#1E2818"/>
            </g>
            <!-- 번데기 -->
            <g transform="translate(26 30)">
              <line x1="0" y1="-12" x2="0" y2="-4" stroke="#6B4E2E" stroke-width="1.5"/>
              <ellipse cx="0" cy="8" rx="6" ry="12" fill="#B07A3E"/>
              <path d="M-5 4 L5 4 M-5 10 L5 10" stroke="#6B4E2E" stroke-width="1" opacity="0.6"/>
            </g>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">곤충의 겨울집 찾기</text>
          </svg>
        </div>
        <h3 class="lc-title">곤충의 겨울나기</h3>
        <p class="lc-desc">낙엽 밑과 나무껍질 사이에서 곤충의 겨울집을 찾고, 알·애벌레·번데기·성충으로 겨울을 나는 모습을 관찰해요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">02 / 나무</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <path d="M20 90 Q 60 70 112 40" stroke="#6B4E2E" stroke-width="5" fill="none" stroke-linecap="round"/>
            <path d="M60 70 Q 70 52 64 34" stroke="#6B4E2E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <!-- 잎눈 / 꽃눈 -->
            <ellipse cx="114" cy="38" rx="4" ry="7" fill="#A86A44" transform="rotate(50 114 38)"/>
            <ellipse cx="63" cy="31" rx="6" ry="8" fill="#C86B45"/>
            <ellipse cx="88" cy="56" rx="3.5" ry="6" fill="#A86A44" transform="rotate(-30 88 56)"/>
            <!-- 떨어지는 잎 -->
            <path transform="translate(34 50) rotate(15)" d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C"/>
            <path transform="translate(96 84) rotate(-25)" d="M0 -8 L3 -2 L9 -3 L5 1 L7 7 L0 4 L-7 7 L-5 1 L-9 -3 L-3 -2 Z" fill="#E8A845"/>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">단풍과 겨울눈</text>
          </svg>
        </div>
        <h3 class="lc-title">단풍·낙엽과 겨울눈</h3>
        <p class="lc-desc">나뭇잎 색깔이 변하는 이유를 알아보고, 잎눈과 꽃눈을 관찰하며 나무가 봄을 준비하는 모습을 살펴봐요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">03 / 씨앗</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="16" y="28" width="98" height="66" rx="8" fill="#EDE5D1" stroke="#6B7F3A" stroke-width="2"/>
            <path d="M65 28 L65 94 M16 61 L114 61" stroke="#6B7F3A" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.6"/>
            <!-- 도토리 -->
            <g transform="translate(40 46)">
              <ellipse cx="0" cy="3" rx="6" ry="8" fill="#B07A3E"/>
              <path d="M-7 -1 Q 0 -8 7 -1 Z" fill="#6B4E2E"/>
            </g>
            <!-- 열매 -->
            <g transform="translate(90 46)">
              <circle cx="-4" cy="2" r="5" fill="#D4705C"/>
              <circle cx="5" cy="4" r="5" fill="#D4705C"/>
              <path d="M0 -3 L0 -10" stroke="#6B7F3A" stroke-width="1.5"/>
            </g>
            <!-- 날개 씨앗 -->
            <g transform="translate(40 78) rotate(-20)">
              <ellipse cx="0" cy="0" rx="3" ry="3" fill="#8A6A3E"/>
              <path d="M2 -1 Q 16 -8 20 2 Q 12 4 2 1 Z" fill="#C9A66B"/>
            </g>
            <!-- 작은 씨앗 -->
            <g transform="translate(90 78)">
              <ellipse cx="-6" cy="0" rx="2.5" ry="4" fill="#6B4E2E"/>
              <ellipse cx="2" cy="2" rx="2.5" ry="4" fill="#6B4E2E"/>
              <ellipse cx="9" cy="-1" rx="2.5" ry="4" fill="#6B4E2E"/>
            </g>
            <text x="65" y="114" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">씨앗 탐구 분류판</text>
          </svg>
        </div>
        <h3 class="lc-title">열매와 씨앗</h3>
        <p class="lc-desc">남대천 주변에서 다양한 열매와 씨앗을 관찰·채집하고, 나만의 씨앗 탐구 분류판을 만들어 봐요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">04 / 새</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="0" y="80" width="130" height="24" fill="#7BA8B0"/>
            <rect x="0" y="80" width="130" height="6" fill="#4A7A8A"/>
            <path d="M24 34 Q 33 25 42 34 Q 51 25 60 34" stroke="#2E5461" stroke-width="2" fill="none" stroke-linecap="round"/>
            <!-- 쌍안경 -->
            <g transform="translate(36 62)">
              <circle cx="-8" cy="0" r="8" fill="#3E4E22"/>
              <circle cx="8" cy="0" r="8" fill="#3E4E22"/>
              <circle cx="-8" cy="0" r="4" fill="#7BA8B0"/>
              <circle cx="8" cy="0" r="4" fill="#7BA8B0"/>
              <rect x="-3" y="-4" width="6" height="6" fill="#3E4E22"/>
            </g>
            <!-- 물가의 새 -->
            <g transform="translate(92 70)">
              <ellipse cx="0" cy="0" rx="15" ry="9" fill="#5A7A86"/>
              <circle cx="-12" cy="-7" r="6" fill="#5A7A86"/>
              <path d="M-18 -7 L-24 -6 L-18 -4 Z" fill="#E8A845"/>
              <circle cx="-13" cy="-8" r="1.2" fill="#1E2818"/>
              <path d="M14 0 L24 -3 L22 4 Z" fill="#456570"/>
            </g>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">새 탐조하기</text>
          </svg>
        </div>
        <h3 class="lc-title">조류의 겨울나기</h3>
        <p class="lc-desc">쌍안경으로 남대천에서 겨울을 보내는 새를 찾아보고, 소감과 자연을 지키는 우리의 다짐을 나눠요.</p>
      </div>
    </div>
  </div>
</section>

<section class="band" id="timetable" style="background: var(--sand);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">진행 순서</div>
        <h2 class="section-title">120분,<br>이렇게 진행돼요</h2>
      </div>
      <p class="section-sub">오전 10:00부터 12:00까지 약 120분 동안 남대천 일원을 이동하며 진행합니다.</p>
    </div>
    <ol class="tt">
      <li><div class="tt-time">10:00</div><div><div class="tt-title">만남·인사</div><div class="tt-desc">프로그램·남대천 소개, 주의 사항·도구 사용법</div></div></li>
      <li><div class="tt-time">10:10</div><div><div class="tt-title">겨울이 오면 곤충들은?</div></div></li>
      <li><div class="tt-time">10:20</div><div><div class="tt-title">관찰하기</div><div class="tt-desc">곤충의 겨울 집 찾기, 곤충들의 겨울나기(알·애벌레·성충)</div></div></li>
      <li><div class="tt-time">10:40</div><div><div class="tt-title">이동, 단풍과 낙엽 이야기</div><div class="tt-desc">나뭇잎 색깔이 변하는 이유</div></div></li>
      <li><div class="tt-time">10:50</div><div><div class="tt-title">겨울눈 이야기</div><div class="tt-desc">나무가 봄을 준비하는 모습</div></div></li>
      <li><div class="tt-time">11:10</div><div><div class="tt-title">생태 체험</div><div class="tt-desc">씨앗 관찰·채집, 씨앗 탐구 분류판 만들기</div></div></li>
      <li><div class="tt-time">11:35</div><div><div class="tt-title">조류의 겨울나기</div><div class="tt-desc">새 탐조하기</div></div></li>
      <li><div class="tt-time">11:50</div><div><div class="tt-title">소감 나누기, 우리의 다짐</div></div></li>
    </ol>
    <p style="margin-top: 20px; text-align: center; font-size: 12px; color: var(--ink-soft); line-height: 1.7;">
      ※ 진행 순서와 시간은 현장 여건과 지도사의 진행 방식에 따라 일부 변경될 수 있습니다.
    </p>
  </div>
</section>

<section class="creatures-band">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">남대천 겨울나기 도감</div>
        <h2 class="section-title">추운 계절을<br>준비하는 친구들</h2>
      </div>
      <p class="section-sub">남대천은 여러 생물에게 중요한 서식지입니다. 곤충과 식물, 새들은 저마다 다른 방법으로 겨울을 준비해요.</p>
    </div>
    <div class="creature-row">
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 52)">
              <ellipse cx="-24" cy="-14" rx="5" ry="5" fill="#E8A845"/>
              <ellipse cx="-14" cy="-18" rx="5" ry="5" fill="#E8A845"/>
              <circle cx="-14" cy="12" r="7" fill="#A8B367"/>
              <circle cx="-2" cy="10" r="7" fill="#A8B367"/>
              <circle cx="10" cy="12" r="8" fill="#6B7F3A"/>
              <circle cx="13" cy="10" r="1.6" fill="#1E2818"/>
              <ellipse cx="26" cy="-10" rx="7" ry="14" fill="#B07A3E"/>
              <path d="M20 -14 L32 -14 M20 -6 L32 -6" stroke="#6B4E2E" stroke-width="1" opacity="0.6"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">곤충 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(알·애벌레·번데기·성충)</span></div>
        <div class="creature-lat">Insects · 곤충의 겨울나기</div>
        <div class="creature-desc">곤충은 알·애벌레·번데기·성충 등 서로 다른 모습으로 겨울을 납니다. 낙엽 밑과 나무껍질 사이에서 곤충의 겨울집을 찾아봐요.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <path transform="translate(40 46) scale(2.2) rotate(-10)" d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C"/>
            <path transform="translate(76 60) scale(1.6) rotate(20)" d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#E8A845"/>
          </svg>
        </div>
        <div class="creature-name">나뭇잎 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(단풍과 낙엽)</span></div>
        <div class="creature-lat">Leaves · 단풍과 낙엽 이야기</div>
        <div class="creature-desc">울긋불긋 물든 나뭇잎은 왜 색이 변하고 떨어질까요? 단풍과 낙엽이 생기는 이유를 함께 알아봐요.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <path d="M20 84 Q 50 60 90 30" stroke="#6B4E2E" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M52 60 Q 44 44 50 28" stroke="#6B4E2E" stroke-width="4" fill="none" stroke-linecap="round"/>
            <ellipse cx="92" cy="28" rx="5" ry="9" fill="#A86A44" transform="rotate(50 92 28)"/>
            <ellipse cx="50" cy="24" rx="7.5" ry="10" fill="#C86B45"/>
            <ellipse cx="72" cy="48" rx="4.5" ry="8" fill="#A86A44" transform="rotate(-35 72 48)"/>
          </svg>
        </div>
        <div class="creature-name">겨울눈 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(잎눈과 꽃눈)</span></div>
        <div class="creature-lat">Winter buds · 나무의 봄 준비</div>
        <div class="creature-desc">나무의 겨울눈 속에는 무엇이 숨어 있을까요? 잎눈과 꽃눈을 관찰하며 나무가 봄을 준비하는 모습을 살펴봐요.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <path d="M18 26 Q 27 17 36 26 Q 45 17 54 26" stroke="rgba(245,239,224,0.7)" stroke-width="2" fill="none" stroke-linecap="round"/>
            <g transform="translate(60 60)">
              <ellipse cx="0" cy="0" rx="24" ry="15" fill="#5A7A86"/>
              <circle cx="-19" cy="-12" r="9.5" fill="#5A7A86"/>
              <path d="M-28 -12 L-38 -10 L-28 -7 Z" fill="#E8A845"/>
              <circle cx="-21" cy="-14" r="2" fill="#1E2818"/>
              <path d="M-4 -5 Q 10 -12 22 -2" stroke="#456570" stroke-width="2.4" fill="none"/>
              <path d="M22 2 L36 -2 L33 8 Z" fill="#456570"/>
              <line x1="-4" y1="14" x2="-6" y2="26" stroke="#C78128" stroke-width="2.4"/>
              <line x1="5" y1="14" x2="5" y2="26" stroke="#C78128" stroke-width="2.4"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">새 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(겨울 철새와 텃새)</span></div>
        <div class="creature-lat">Birds · 조류의 겨울나기</div>
        <div class="creature-desc">쌍안경을 이용해 남대천에서 겨울을 보내는 새를 찾아봅니다. 남대천이 여러 생물에게 중요한 서식지인 이유도 함께 배워요.</div>
      </div>
    </div>
  </div>
</section>

<section class="band checklist-band" id="prepare">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">준비물 안내</div>
        <h2 class="section-title">늦가을 야외 체험,<br>이렇게 챙겨오세요</h2>
      </div>
      <p class="section-sub">야외에서 이동하며 진행되는 프로그램입니다. 따뜻하고 활동하기 편한 복장과 신발을 꼭 챙겨주세요.</p>
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
          <li>${CHK_CORAL}<strong>따뜻하고 활동하기 편한 겉옷</strong></li>
          <li>${CHK_CORAL}<strong>개인 물병과 모자, 장갑 등 방한용품</strong></li>
          <li>${CHK_PLAIN}필요에 따라 개인 상비약과 휴대용 방석</li>
        </ul>
      </div>
      <div class="check-col">
        <h3>
          <span class="badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="6" width="16" height="14" rx="2" stroke="#3E4E22" stroke-width="2"/><path d="M8 6V4m8 2V4" stroke="#3E4E22" stroke-width="2" stroke-linecap="round"/></svg>
          </span>
          참가비 무료 · 포함 사항
        </h3>
        <ul class="check-list">
          <li>${CHK_MOSS}생태관광지도사님의 해설</li>
          <li>${CHK_MOSS}생태놀이</li>
          <li>${CHK_SUN}<strong>사은품 생태관광 컵</strong></li>
          <li>${CHK_PLAIN}불포함: 식사, 음료</li>
        </ul>
      </div>
    </div>
    <p style="margin-top: 32px; text-align: center; font-size: 14px; color: var(--ink-soft); line-height: 1.7;">
      포충망, 루페, 쌍안경 등 체험 도구는 현장 지도사의 안내에 따라 사용해 주세요.<br>
      체험 장소 주변의 화장실과 휴식 공간 등 편의시설이 충분하지 않을 수 있으니 사전에 참고해 주세요.
    </p>
  </div>
</section>

<section class="band" id="recommend" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">이런 분께 추천</div>
        <h2 class="section-title">늦가을 남대천,<br>이런 분과 함께해요</h2>
      </div>
    </div>
    <div class="notes-grid">
      <div class="note-card">
        <strong>🐛 겨울나기가 궁금한 어린이</strong><br>
        곤충과 식물은 어떻게 겨울을 나는지 궁금한 어린이
      </div>
      <div class="note-card">
        <strong>👨‍👩‍👧 아이와 함께하는 가족</strong><br>
        아이와 함께 남대천의 늦가을 자연을 관찰하고 싶은 가족
      </div>
      <div class="note-card">
        <strong>🌰 열매와 씨앗이 궁금한 분</strong><br>
        열매와 씨앗을 직접 살펴보고 자연물을 활용한 활동을 해보고 싶은 분
      </div>
      <div class="note-card">
        <strong>🐦 새를 좋아하는 분</strong><br>
        남대천을 찾는 겨울 철새와 텃새가 궁금한 분
      </div>
      <div class="note-card">
        <strong>🌿 자연과 생태에 관심 있는 분</strong><br>
        자연과 생태에 관심 있는 일반 성인
      </div>
      <div class="note-card">
        <strong>✨ 특별한 야외 체험을 찾는 분</strong><br>
        양양에서 특별한 야외 생태 체험을 즐기고 싶은 분
      </div>
    </div>
  </div>
</section>

<section class="notes-band" id="faq">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">유의사항 · 자주 묻는 질문</div>
        <h2 class="section-title">남대천의 친구들과<br>함께 지켜주세요</h2>
      </div>
    </div>
    <div class="notes-grid">
      <div class="note-card">
        <strong>👟 편한 복장과 신발</strong><br>
        야외에서 이동하며 진행되는 프로그램이므로 활동하기 편한 복장과 신발을 착용해 주세요.
      </div>
      <div class="note-card">
        <strong>👨‍👩‍👧 어린이는 보호자와 함께</strong><br>
        초등학생을 포함한 모든 어린이는 반드시 보호자가 동반해야 하며, 체험 중 보호자가 어린이의 안전을 직접 살펴주셔야 합니다.
      </div>
      <div class="note-card">
        <strong>🐞 생물은 조심스럽게</strong><br>
        곤충과 자연물은 조심스럽게 다루고, 관찰한 생물은 원래 살던 곳으로 안전하게 돌려보냅니다.
      </div>
      <div class="note-card">
        <strong>🌱 식물을 아껴주세요</strong><br>
        식물을 함부로 꺾거나 밟지 않도록 주의해 주세요.
      </div>
      <div class="note-card">
        <strong>🔍 체험 도구 사용</strong><br>
        포충망, 루페, 쌍안경 등 체험 도구는 현장 지도사의 안내에 따라 사용해 주세요.
      </div>
      <div class="note-card">
        <strong>🌦️ 날씨에 따라 달라져요</strong><br>
        기상 상황과 현장 생물의 상태에 따라 관찰 대상과 세부 활동이 변경될 수 있습니다.
      </div>
      <div class="note-card">
        <strong>🚻 편의시설 안내</strong><br>
        체험 장소 주변의 화장실과 휴식 공간 등 편의시설이 충분하지 않을 수 있으니 사전에 참고해 주세요.
      </div>
      <div class="note-card">
        <strong>🚶 지도사의 안내를 따라주세요</strong><br>
        안전한 체험을 위해 현장 지도사의 안내에 따라 주세요.
      </div>
    </div>

    <div class="faq">
      <details>
        <summary>어떤 곤충과 새를 볼 수 있나요?</summary>
        <p>관찰할 수 있는 곤충과 조류의 종류는 당일 기상과 자연환경에 따라 달라질 수 있습니다. 세부 활동도 현장 여건과 지도사의 진행 방식에 따라 일부 변경될 수 있어요.</p>
      </details>
      <details>
        <summary>누가 참여할 수 있나요?</summary>
        <p>가족과 일반 성인 누구나 참여할 수 있어요. 2시간 동안 야외를 걷는 활동이라 초등학생 이상을 권장합니다. 초등학생을 포함한 모든 어린이는 반드시 보호자와 함께 참여해야 하며, 야외 활동 중 보호자가 어린이의 안전을 직접 살펴주셔야 합니다. 미취학 아동은 보호자가 곁에서 안전을 충분히 살펴 주실 수 있다면 함께할 수 있습니다. 일반 성인은 어린이 동반 없이도 참여할 수 있습니다.</p>
      </details>
      <details>
        <summary>참가비가 있나요?</summary>
        <p>참가비는 무료입니다. 생태관광지도사님의 해설, 생태놀이, 사은품 생태관광 컵이 포함되어 있으며 식사와 음료는 포함되지 않습니다.</p>
      </details>
      <details>
        <summary>무엇을 준비해야 하나요?</summary>
        <p>따뜻하고 활동하기 편한 겉옷, 개인 물병과 모자, 장갑 등 방한용품을 준비해 주세요. 필요에 따라 개인 상비약과 휴대용 방석을 챙겨오셔도 좋습니다.</p>
      </details>
      <details>
        <summary>어디에서 진행하나요? 예약은 언제까지인가요?</summary>
        <p>체험장소는 <strong>양양문화복지회관 앞 남대천 일원</strong>입니다. 예약 마감은 체험일 1일 전이며, 회차별 참여 인원은 10~15명 내외입니다.</p>
      </details>
    </div>
  </div>
</section>
`;

export default function EcologyWetlandWinter() {
  return (
    <div className="ecology-wetland-page season-late-autumn">
      <div dangerouslySetInnerHTML={{ __html: INLINE_HTML }} />

      {/* CTA section with real React links for 접수 + tel */}
      <section className="cta-band" id="apply" style={{ paddingTop: 52 }}>
        <div className="wrap">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{ marginBottom: 14 }}
            aria-hidden="true"
          >
            <circle cx="40" cy="40" r="38" fill="#C78128" opacity="0.25" />
            <g transform="translate(40, 38) scale(2.2)">
              <path
                d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z"
                fill="#E8A845"
              />
            </g>
            <path
              d="M40 50 L40 66"
              stroke="#C78128"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          <h2
            className="section-title"
            style={{ color: "var(--cream)", margin: "0 auto 20px" }}
          >
            숲은 겨울에도<br />
            살아 있어요
          </h2>
          <p>
            11월 「남대천, 겨울을 준비하는 생물들」 접수가 진행 중입니다.<br />
            11월 15일(일) · 11월 22일(일) · 11월 29일(일) 오전 10:00~12:00, 회차별 10~15명 내외 · 참가비 무료.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              className="btn"
              style={{
                background: "var(--sun)",
                color: "var(--forest)",
              }}
              href={REGISTER_URL}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14 4h6v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 14L20 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              정규 프로그램 접수
            </a>
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
