import "./ecology-wetland.css";

// 가을 정규 프로그램: 양양 남대천 연어 생태이야기 (연어 한살이·회귀어종)
// EcologyWetlandWater 컴포넌트의 디자인 시스템·class를 그대로 사용하고
// 콘텐츠/일러스트만 10월 연어 생태이야기용으로 갈음.
const INQUIRY_TEL = "010-9542-3775";
const REGISTER_URL = "/ecology/register"; // 자체 접수 페이지

const INLINE_HTML = `
<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>양양 남대천 연어 생태이야기</span>
</div>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow"><span class="pulse"></span> 2026년 10월 · 양양 남대천</div>
      <h1 class="hero-title">
        양양 남대천<br>
        <span class="flow">연어 생태이야기</span>
      </h1>
      <p class="hero-sub">
        바다로 떠났다 고향 하천으로 돌아오는 연어. 남대천의 회귀어종과 연어의 한살이를
        생태관광지도사와 함께 배우고, 연어 윷놀이와 전시관 관람까지 즐기는 가을 생태 체험입니다.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${REGISTER_URL}">
          10월 생태체험 접수
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a class="btn btn-ghost" href="#programs">프로그램 살펴보기</a>
      </div>
      <div class="hero-meta">
        <div>
          <div class="k">체험 장소</div>
          <div class="v">남대천 일대 · 연어전시관</div>
        </div>
        <div>
          <div class="k">참여 대상</div>
          <div class="v">전 연령 · 가족</div>
        </div>
        <div>
          <div class="k">모집 인원</div>
          <div class="v">1타임당 15명 내외</div>
        </div>
      </div>
    </div>

    <div class="hero-art">
      <svg viewBox="0 0 500 520" width="100%" height="100%" style="overflow: visible;" aria-hidden="true">
        <!-- 태양 (우상단, 잘리지 않게 안전 위치) -->
        <circle cx="395" cy="130" r="98" fill="#F4C964" opacity="0.30"/>
        <circle cx="395" cy="130" r="76" fill="#F4C964"/>
        <circle cx="395" cy="130" r="58" fill="#E8A845"/>

        <!-- 먼 산 능선 -->
        <path d="M0 300 Q 110 250 220 288 Q 330 320 420 270 Q 470 244 500 268 L500 320 L0 320 Z" fill="#A8B367" opacity="0.4"/>

        <!-- 강물 -->
        <rect x="0" y="300" width="500" height="220" fill="#7BA8B0"/>
        <rect x="0" y="300" width="500" height="220" fill="#4A7A8A" opacity="0.55"/>
        <rect x="0" y="300" width="500" height="26" fill="#2E5461" opacity="0.5"/>
        <!-- 물결 -->
        <path d="M0 340 Q 70 334 140 340 T 280 340 T 500 340" stroke="#fff" stroke-width="1.6" fill="none" opacity="0.55"/>
        <path d="M0 372 Q 90 366 180 372 T 360 372 T 500 372" stroke="#fff" stroke-width="1.3" fill="none" opacity="0.45"/>
        <path d="M0 408 Q 80 402 160 408 T 320 408 T 500 408" stroke="#fff" stroke-width="1.1" fill="none" opacity="0.35"/>

        <!-- 뛰어오르는 연어 (회귀, 왼쪽에서 상류로 점프) -->
        <g transform="translate(175 300) rotate(-28)">
          <ellipse cx="0" cy="0" rx="42" ry="17" fill="#E08A5C"/>
          <ellipse cx="4" cy="4" rx="35" ry="10" fill="#EFB08C" opacity="0.85"/>
          <path d="M36 0 L60 -16 L60 16 Z" fill="#C86B45"/>
          <path d="M-4 -17 L10 -4 L-16 -4 Z" fill="#C86B45"/>
          <path d="M2 15 L 14 27 L -10 22 Z" fill="#C86B45" opacity="0.9"/>
          <circle cx="-24" cy="-4" r="4.4" fill="#fff"/>
          <circle cx="-24" cy="-4" r="2.2" fill="#1E2818"/>
          <path d="M-12 3 Q 4 7 22 3" stroke="#C86B45" stroke-width="1.2" fill="none" opacity="0.6"/>
          <circle cx="-6" cy="-6" r="2" fill="#C86B45"/>
          <circle cx="8" cy="-5" r="2" fill="#C86B45"/>
        </g>
        <!-- 점프 물보라 -->
        <circle cx="128" cy="322" r="3.5" fill="#fff" opacity="0.7"/>
        <circle cx="140" cy="310" r="2.4" fill="#fff" opacity="0.6"/>
        <circle cx="118" cy="336" r="2.2" fill="#fff" opacity="0.55"/>

        <!-- 연어 2 (오른쪽 아래, 상류로 헤엄) -->
        <g transform="translate(360 448) scale(-1 1)">
          <ellipse cx="0" cy="0" rx="26" ry="10" fill="#E08A5C"/>
          <ellipse cx="2" cy="2" rx="21" ry="6" fill="#EFB08C" opacity="0.8"/>
          <path d="M22 0 L38 -10 L38 10 Z" fill="#C86B45"/>
          <circle cx="-14" cy="-2" r="2.8" fill="#fff"/>
          <circle cx="-14" cy="-2" r="1.4" fill="#1E2818"/>
        </g>

        <!-- 공기방울 -->
        <circle cx="120" cy="345" r="3" fill="#fff" opacity="0.5"/>
        <circle cx="128" cy="332" r="2" fill="#fff" opacity="0.45"/>
        <circle cx="300" cy="418" r="2.5" fill="#fff" opacity="0.5"/>
        <circle cx="307" cy="404" r="1.6" fill="#fff" opacity="0.4"/>

        <!-- 물속 조약돌 -->
        <ellipse cx="90" cy="490" rx="20" ry="10" fill="#B7A886" opacity="0.7"/>
        <ellipse cx="230" cy="500" rx="26" ry="11" fill="#A89A6E" opacity="0.6"/>
        <ellipse cx="380" cy="492" rx="22" ry="10" fill="#B7A886" opacity="0.65"/>
        <ellipse cx="160" cy="505" rx="14" ry="7" fill="#9C8E62" opacity="0.6"/>

        <!-- 강가 갈대 (왼쪽) -->
        <g transform="translate(30 300)">
          <path d="M0 0 Q -4 -30 4 -58" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M12 0 Q 10 -26 18 -48" stroke="#A8B367" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="4" cy="-60" rx="4" ry="11" fill="#C78128"/>
          <ellipse cx="18" cy="-50" rx="3.5" ry="9" fill="#E8A845"/>
        </g>
        <!-- 강가 갈대 (오른쪽) -->
        <g transform="translate(470 300)">
          <path d="M0 0 Q 5 -28 -3 -54" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M-12 0 Q -10 -24 -16 -44" stroke="#A8B367" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="-3" cy="-56" rx="4" ry="10" fill="#C78128"/>
          <ellipse cx="-16" cy="-46" rx="3.5" ry="8" fill="#E8A845"/>
        </g>

        <!-- 단풍잎 (가을 분위기, 수면 위로 떨어지는) -->
        <g transform="translate(300 250) rotate(20)">
          <path d="M0 -10 L4 -3 L11 -4 L6 2 L9 9 L0 5 L-9 9 L-6 2 L-11 -4 L-4 -3 Z" fill="#D4705C"/>
        </g>
        <g transform="translate(120 210) rotate(-15)">
          <path d="M0 -8 L3 -2 L9 -3 L5 1 L7 7 L0 4 L-7 7 L-5 1 L-9 -3 L-3 -2 Z" fill="#E8A845"/>
        </g>

        <!-- 잠자리 (수면 위) -->
        <g transform="translate(150 240)">
          <line x1="0" y1="0" x2="0" y2="16" stroke="#4A7A8A" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="-9" cy="2" rx="10" ry="3" fill="#7BA8B0" opacity="0.7" transform="rotate(-12 -9 2)"/>
          <ellipse cx="9" cy="2" rx="10" ry="3" fill="#7BA8B0" opacity="0.7" transform="rotate(12 9 2)"/>
          <circle cx="0" cy="-2" r="3" fill="#2E5461"/>
        </g>

        <!-- 메모 스티커 (현장 느낌) -->
        <g transform="translate(405 300) rotate(-8)">
          <rect x="-46" y="-14" width="92" height="28" rx="3" fill="#F5EFE0" stroke="#4A7A8A" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="0" y="4" text-anchor="middle" font-family="Gaegu" font-size="14" fill="#2E5461">남대천 · 연어 회귀</text>
        </g>
      </svg>
      <div class="stamp" style="top: 6%; left: -4%; transform: rotate(-8deg);">생태관광지도사와 함께 🐟</div>
    </div>
  </div>
</section>

<section class="band" id="programs" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">10월 정규 프로그램</div>
        <h2 class="section-title">남대천에서 만나는<br>연어의 한살이</h2>
      </div>
      <p class="section-sub">양양 남대천의 대표 생물인 연어와 회귀어종의 생태를 알아보는 생태관광 프로그램입니다. 하천 이야기부터 연어 윷놀이, 연어전시관 관람까지 놀이와 배움을 함께 즐깁니다.</p>
    </div>

    <div class="prog-grid">
      <div class="prog-card highlight" style="grid-column: 1 / -1;">
        <div class="pc-icon">
          <svg width="54" height="54" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <circle cx="30" cy="30" r="28" fill="#4A7A8A" opacity="0.3"/>
            <path d="M8 34 Q 30 26 52 34" stroke="#A8B367" stroke-width="2" fill="none" opacity="0.6"/>
            <g transform="translate(30 32)">
              <ellipse cx="0" cy="0" rx="15" ry="7" fill="#E8A845"/>
              <path d="M13 0 L23 -6 L23 6 Z" fill="#C78128"/>
              <circle cx="-8" cy="-1.5" r="2" fill="#F5EFE0"/>
              <circle cx="-8" cy="-1.5" r="1" fill="#1E2818"/>
            </g>
          </svg>
        </div>
        <div class="pc-type">PROGRAM · 정규 생태체험 프로그램</div>
        <h3 class="pc-title">연어의 한살이와<br>남대천 회귀어종을 배우는 시간</h3>
        <p class="pc-desc">생태관광지도사와 함께 남대천으로 이동하며 하천의 특징과 주변 생태환경 이야기를 듣고, 물가에서 만날 수 있는 식물도 살펴봅니다. 이어 연어가 강에서 태어나 바다로 이동한 뒤 다시 고향 하천으로 돌아오는 과정과 남대천에 찾아오는 다양한 회귀어종에 대해 쉽고 재미있게 알아봅니다. 야외 해설을 마친 후에는 연어의 생태와 이동 과정을 놀이로 이해하는 '연어 윷놀이'를 진행합니다. 체험이 끝나면 한국수산자원공단 동해생명자원센터의 연어전시관을 관람하며 배운 내용을 다시 확인하고 소감을 나눕니다.</p>
        <div class="pc-meta">
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영일</div>
            <div class="pc-meta-v">10월 3·10·24·31일 (토요일)<br><span style="color: rgba(245,239,224,0.78); font-size:12px;">하루 2타임 · 1타임당 15명 내외</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영시간</div>
            <div class="pc-meta-v">오전 10:00~12:00 / 오후 13:00~15:00<br><span style="color: rgba(245,239,224,0.78); font-size:12px;">하루 오전·오후 두 차례 진행</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">참여대상</div>
            <div class="pc-meta-v">어린이 동반 가족 및 일반 성인<br><span style="color: var(--sun); font-weight:600;">1타임당 15명 내외</span> · 어린이는 보호자 동반 필수</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">장소</div>
            <div class="pc-meta-v">양양 남대천 일대 · 연어전시관<br><span style="color: var(--coral); font-weight:600;">집결: 한국수산자원공단 동해생명자원센터 (양양군 손양면 동명로 119)</span></div>
          </div>
        </div>
        <a href="${REGISTER_URL}" class="pc-cta">
          접수하기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 12px; color: var(--ink-soft); line-height: 1.7;">
      ※ 연어의 실제 관찰 여부는 당일 자연환경과 회귀 상황에 따라 달라질 수 있습니다.<br>
      ※ 세부 활동·진행 순서는 당일 날씨·현장 상황·시설 운영 여건에 따라 일부 변경될 수 있으며, 전체 주제와 체험 장소는 동일하게 운영됩니다.
    </p>
  </div>
</section>

<section class="band" id="activities" style="background: var(--sand);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">주요 활동</div>
        <h2 class="section-title">이런 활동으로<br>연어를 만나요</h2>
      </div>
      <p class="section-sub">하천 생태 이야기부터 연어 윷놀이, 전시관 관람까지. 야외 해설과 놀이, 전시가 어우러진 하루를 보냅니다.</p>
    </div>
    <ul class="check-list" style="max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px;">
      <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>남대천의 자연환경과 하천 생태 이야기 듣기</li>
      <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>남대천 물가에서 자라는 식물 살펴보기</li>
      <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>연어의 한살이와 회귀 과정 알아보기</li>
      <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>남대천을 찾는 회귀어종 이야기 듣기</li>
      <li><span class="chk" style="background: var(--sun); border-color: var(--sun);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>연어의 생태를 배우는 연어 윷놀이</strong></li>
      <li><span class="chk" style="background: var(--sun); border-color: var(--sun);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>연어전시관 관람 및 체험 소감 나누기</strong></li>
    </ul>
  </div>
</section>

<section class="band" id="schedule">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">10월의 일정</div>
        <h2 class="section-title">달력 위의 네 번의 만남</h2>
      </div>
    </div>
    <div class="timeline cols-4">
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">10월 3일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">연어 생태이야기 1회차<br><span style="color: var(--ink-soft); font-weight: 400;">오전·오후 2타임</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">10월 10일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">연어 생태이야기 2회차<br><span style="color: var(--ink-soft); font-weight: 400;">오전·오후 2타임</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">10월 24일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">연어 생태이야기 3회차<br><span style="color: var(--ink-soft); font-weight: 400;">오전·오후 2타임</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">10월 31일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">연어 생태이야기 4회차<br><span style="color: var(--ink-soft); font-weight: 400;">오전·오후 2타임</span></div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="learn" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">프로그램 흐름</div>
        <h2 class="section-title">듣고, 배우고,<br>놀이로 이해하고</h2>
      </div>
      <p class="section-sub">생태관광지도사의 안내를 따라 네 단계로 연어의 세계를 만납니다. 야외 해설과 놀이, 전시관 관람이 하나로 이어져요.</p>
    </div>
    <div class="learn-grid cols-4">
      <div class="learn-card">
        <div class="lc-num">01 / 하천</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="0" y="70" width="130" height="34" fill="#7BA8B0"/>
            <rect x="0" y="70" width="130" height="8" fill="#4A7A8A"/>
            <path d="M0 86 Q 32 80 64 86 T 130 86" stroke="#fff" stroke-width="1.4" fill="none" opacity="0.5"/>
            <g transform="translate(30 40)">
              <path d="M0 0 Q -3 -20 3 -38" stroke="#6B7F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="3" cy="-40" rx="3" ry="8" fill="#C78128"/>
            </g>
            <g transform="translate(100 44)">
              <path d="M0 0 Q 3 -18 -3 -32" stroke="#A8B367" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="-3" cy="-34" rx="3" ry="7" fill="#E8A845"/>
            </g>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">남대천으로 이동</text>
          </svg>
        </div>
        <h3 class="lc-title">하천 생태 이야기</h3>
        <p class="lc-desc">남대천으로 이동하며 하천의 특징과 주변 생태환경, 물가에서 자라는 식물을 함께 살펴봐요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">02 / 회귀</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="0" y="72" width="130" height="32" fill="#7BA8B0"/>
            <rect x="0" y="72" width="130" height="7" fill="#4A7A8A"/>
            <path d="M18 72 Q 40 40 70 56 Q 96 70 114 44" stroke="#4A7A8A" stroke-width="2" fill="none" stroke-dasharray="4 4" opacity="0.7"/>
            <g transform="translate(64 52) rotate(-24)">
              <ellipse cx="0" cy="0" rx="17" ry="7.5" fill="#E08A5C"/>
              <path d="M14 0 L26 -8 L26 8 Z" fill="#C86B45"/>
              <path d="M-2 -8 L6 -1 L-10 -1 Z" fill="#C86B45"/>
              <circle cx="-9" cy="-1.5" r="2.2" fill="#fff"/>
              <circle cx="-9" cy="-1.5" r="1.1" fill="#1E2818"/>
            </g>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">고향으로 돌아와요</text>
          </svg>
        </div>
        <h3 class="lc-title">연어의 한살이</h3>
        <p class="lc-desc">강에서 태어나 바다로 갔다가 다시 남대천으로 돌아오는 연어의 회귀 과정과 회귀어종을 배워요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">03 / 놀이</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="16" y="40" width="98" height="52" rx="8" fill="#EDE5D1" stroke="#6B7F3A" stroke-width="2"/>
            <rect x="30" y="52" width="30" height="12" rx="6" fill="#C78128"/>
            <rect x="70" y="52" width="30" height="12" rx="6" fill="#C78128"/>
            <rect x="30" y="70" width="30" height="12" rx="6" fill="#E8A845"/>
            <rect x="70" y="70" width="30" height="12" rx="6" fill="#E8A845"/>
            <g transform="translate(65 46)">
              <ellipse cx="0" cy="0" rx="9" ry="4" fill="#E08A5C"/>
              <path d="M7 0 L14 -4 L14 4 Z" fill="#C86B45"/>
            </g>
            <text x="65" y="114" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">연어 윷놀이</text>
          </svg>
        </div>
        <h3 class="lc-title">연어 윷놀이</h3>
        <p class="lc-desc">연어의 생태와 이동 과정을 놀이로 이해하는 연어 윷놀이로 배운 내용을 재미있게 익혀요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">04 / 전시</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="18" y="30" width="94" height="62" rx="6" fill="#4A7A8A" opacity="0.25" stroke="#4A7A8A" stroke-width="2"/>
            <rect x="26" y="38" width="78" height="42" rx="4" fill="#7BA8B0" opacity="0.4"/>
            <g transform="translate(58 58)">
              <ellipse cx="0" cy="0" rx="16" ry="7" fill="#E08A5C"/>
              <path d="M13 0 L24 -7 L24 7 Z" fill="#C86B45"/>
              <circle cx="-9" cy="-1.5" r="2" fill="#fff"/>
              <circle cx="-9" cy="-1.5" r="1" fill="#1E2818"/>
            </g>
            <path d="M18 92 L112 92" stroke="#6B7F3A" stroke-width="3" stroke-linecap="round"/>
            <text x="65" y="114" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">연어전시관 관람</text>
          </svg>
        </div>
        <h3 class="lc-title">전시관 관람</h3>
        <p class="lc-desc">동해생명자원센터 연어전시관을 관람하며 배운 내용을 다시 확인하고 체험 소감을 나눠요.</p>
      </div>
    </div>
  </div>
</section>

<section class="creatures-band">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">남대천 회귀어종 도감</div>
        <h2 class="section-title">고향 하천으로<br>돌아오는 친구들</h2>
      </div>
      <p class="section-sub">양양 남대천은 바다로 나갔다 다시 돌아오는 회귀어종의 대표적인 하천입니다. 가을이 되면 연어를 비롯한 다양한 물고기가 고향 하천을 찾아옵니다.</p>
    </div>
    <div class="creature-row">
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 52)">
              <ellipse cx="0" cy="0" rx="38" ry="16" fill="#E08A5C"/>
              <ellipse cx="4" cy="4" rx="32" ry="9" fill="#EFB08C" opacity="0.85"/>
              <path d="M33 0 L54 -15 L54 15 Z" fill="#C86B45"/>
              <path d="M-4 -16 L10 -4 L-14 -4 Z" fill="#C86B45"/>
              <path d="M2 14 L 12 24 L -8 20 Z" fill="#C86B45" opacity="0.9"/>
              <circle cx="-22" cy="-4" r="4" fill="#fff"/>
              <circle cx="-22" cy="-4" r="2" fill="#1E2818"/>
              <circle cx="-6" cy="-6" r="2" fill="#C86B45"/>
              <circle cx="6" cy="-5" r="2" fill="#C86B45"/>
              <circle cx="18" cy="-4" r="2" fill="#C86B45"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">연어 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(대표 회귀어종)</span></div>
        <div class="creature-lat">Oncorhynchus keta · 연어과</div>
        <div class="creature-desc">바다에서 자라 알을 낳으러 남대천으로 돌아오는 대표 회귀어종. 남대천은 우리나라 연어가 돌아오는 대표적인 하천입니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 52)">
              <ellipse cx="0" cy="0" rx="36" ry="13" fill="#C98A62"/>
              <ellipse cx="4" cy="3" rx="30" ry="7.5" fill="#E3B48F" opacity="0.85"/>
              <path d="M31 0 L50 -13 L50 13 Z" fill="#A86A44"/>
              <path d="M-2 -13 L8 -2 L-12 -2 Z" fill="#A86A44"/>
              <circle cx="-20" cy="-2" r="3.6" fill="#fff"/>
              <circle cx="-20" cy="-2" r="1.8" fill="#1E2818"/>
              <circle cx="-6" cy="-4" r="1.6" fill="#A86A44"/>
              <circle cx="6" cy="-3" r="1.6" fill="#A86A44"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">송어 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(연어과 회귀어종)</span></div>
        <div class="creature-lat">Oncorhynchus masou · 연어과</div>
        <div class="creature-desc">연어와 같은 연어과 물고기로, 맑고 찬 물을 좋아합니다. 바다와 하천을 오가며 살아가는 동해안의 대표 어종이에요.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 52)">
              <ellipse cx="0" cy="0" rx="36" ry="12" fill="#8FB2A6"/>
              <ellipse cx="4" cy="3" rx="30" ry="7" fill="#C3D6CB" opacity="0.85"/>
              <path d="M31 0 L50 -12 L50 12 Z" fill="#6E9488"/>
              <path d="M-2 -12 L8 -2 L-12 -2 Z" fill="#6E9488"/>
              <circle cx="-20" cy="-2" r="3.6" fill="#fff"/>
              <circle cx="-20" cy="-2" r="1.8" fill="#1E2818"/>
              <path d="M-10 0 Q 4 4 20 0" stroke="#6E9488" stroke-width="1" fill="none" opacity="0.6"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">은어 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(회유성 어종)</span></div>
        <div class="creature-lat">Plecoglossus altivelis · 바다빙어과</div>
        <div class="creature-desc">바다와 하천을 오가는 회유성 물고기. 수박 향이 난다고 해서 '수박 물고기'로도 불리며, 맑은 남대천 여울에서 자랍니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 54)">
              <path d="M-40 0 Q -30 -14 -10 -12 Q 6 -22 24 -12 Q 40 -6 40 0 Q 40 6 24 12 Q 6 22 -10 12 Q -30 14 -40 0 Z" fill="#5A7A86"/>
              <path d="M-34 0 Q -24 -10 -8 -9 Q 6 -16 22 -9 Q 34 -4 34 0 Q 34 4 22 9 Q 6 16 -8 9 Q -24 10 -34 0 Z" fill="#7FA0AC" opacity="0.75"/>
              <path d="M-40 0 L-52 -10 L-52 10 Z" fill="#456570"/>
              <circle cx="24" cy="-2" r="3.4" fill="#fff"/>
              <circle cx="24" cy="-2" r="1.7" fill="#1E2818"/>
              <path d="M-6 6 Q 8 3 20 -8" stroke="#456570" stroke-width="1.4" fill="none" opacity="0.5"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">황어 <span style="font-size:11px; color:rgba(245,239,224,0.6); font-weight:400;">(봄·가을 회귀)</span></div>
        <div class="creature-lat">Tribolodon · 잉어과</div>
        <div class="creature-desc">바다에서 살다 알을 낳으러 하천으로 돌아오는 회귀어종. 남대천에 찾아오는 다양한 회귀어종 중 하나로, 물길을 거슬러 올라옵니다.</div>
      </div>
    </div>
  </div>
</section>

<section class="band checklist-band" id="prepare">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">준비물 안내</div>
        <h2 class="section-title">가을 야외 체험,<br>이렇게 챙겨오세요</h2>
      </div>
      <p class="section-sub">야외 활동이 포함된 체험입니다. 걷기 편한 신발과 날씨 변화에 대비한 겉옷을 꼭 챙겨주세요.</p>
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
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>걷기 편하고 미끄럽지 않은 운동화</strong></li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>햇빛을 가릴 모자</li>
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>개인 물병</strong></li>
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>날씨 변화에 대비한 겉옷</strong></li>
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
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>생태관광지도사 해설</li>
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>연어 윷놀이 등 놀이 체험 도구</li>
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>연어전시관 관람 안내</li>
          <li><span class="chk" style="background: var(--sun); border-color: var(--sun);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>야외 해설 및 생태 학습 자료</strong></li>
        </ul>
      </div>
    </div>
    <p style="margin-top: 32px; text-align: center; font-size: 14px; color: var(--ink-soft); line-height: 1.7;">
      야외활동 중에는 생태관광지도사의 안내에 따라 이동해 주세요.<br>
      기상 상황에 따라 야외활동 시간이 조정되거나 전시관 중심으로 운영될 수 있습니다.
    </p>
  </div>
</section>

<section class="band" id="recommend" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">이런 분께 추천</div>
        <h2 class="section-title">가을 남대천,<br>이런 분과 함께해요</h2>
      </div>
    </div>
    <div class="notes-grid">
      <div class="note-card">
        <strong>🐟 연어의 회귀가 궁금한 분</strong><br>
        연어가 고향 하천으로 돌아오는 과정이 궁금한 분께 딱 맞는 프로그램입니다.
      </div>
      <div class="note-card">
        <strong>👨‍👩‍👧 아이와 함께하는 가족</strong><br>
        아이와 함께 연어의 한살이를 배우고 싶은 가족에게 좋은 가을 체험입니다.
      </div>
      <div class="note-card">
        <strong>🌿 남대천 생태에 관심 있는 분</strong><br>
        남대천의 식물과 회귀어종에 관심 있는 분이라면 흥미롭게 즐길 수 있어요.
      </div>
      <div class="note-card">
        <strong>🎲 놀이와 전시를 함께 즐기고 싶은 분</strong><br>
        연어 윷놀이와 전시관 관람을 함께 즐기고 싶은 어린이·가족에게 추천합니다.
      </div>
      <div class="note-card">
        <strong>🍂 양양의 자연을 이해하고 싶은 분</strong><br>
        양양의 자연과 생태를 깊이 이해하고 싶은 일반 성인도 함께할 수 있습니다.
      </div>
      <div class="note-card">
        <strong>✨ 특별한 가을 체험을 찾는 분</strong><br>
        가을철 양양에서 특별한 생태 체험을 즐기고 싶은 분께 추천드려요.
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
        <strong>🐟 연어 관찰은 자연에 달려 있어요</strong><br>
        연어의 실제 관찰 여부는 당일 자연환경과 회귀 상황에 따라 달라질 수 있습니다. 관찰이 어려운 날에도 해설과 전시로 연어의 생태를 충분히 배울 수 있어요.
      </div>
      <div class="note-card">
        <strong>🌦️ 날씨에 따라 진행이 달라져요</strong><br>
        세부 활동·진행 순서는 당일 날씨·현장 상황·시설 운영 여건에 따라 일부 변경될 수 있으며, 전체 주제와 체험 장소는 동일하게 운영됩니다.
      </div>
      <div class="note-card">
        <strong>👨‍👩‍👧 어린이는 보호자와 함께</strong><br>
        어린이는 반드시 보호자와 함께 참여해야 하며, 야외 활동 중 보호자가 어린이의 이동과 안전을 직접 살펴주셔야 합니다.
      </div>
      <div class="note-card">
        <strong>🚶 지도사의 안내를 따라주세요</strong><br>
        야외활동 중에는 생태관광지도사의 안내에 따라 이동해 주세요. 1타임당 15명 내외로 오전·오후 두 차례 진행합니다.
      </div>
    </div>

    <div class="faq">
      <details>
        <summary>연어를 실제로 볼 수 있나요?</summary>
        <p>연어의 실제 관찰 여부는 당일 자연환경과 회귀 상황에 따라 달라질 수 있습니다. 연어가 보이지 않는 날에도 하천 해설과 연어전시관 관람, 연어 윷놀이를 통해 연어의 생태를 충분히 배울 수 있어요.</p>
      </details>
      <details>
        <summary>비가 오면 어떻게 되나요?</summary>
        <p>기상 상황에 따라 야외활동 시간이 조정되거나 연어전시관 중심으로 운영될 수 있습니다. 전체 주제와 체험 장소는 동일하게 운영되니 안심하고 참여해 주세요.</p>
      </details>
      <details>
        <summary>몇 살부터 참여할 수 있나요?</summary>
        <p>어린이 동반 가족과 일반 성인 누구나 참여하실 수 있습니다. 나이 하한은 없으며, 어린이는 반드시 보호자와 함께 참여해 주세요. 야외 활동이 포함되어 있어 보호자가 어린이의 안전을 직접 살펴주셔야 합니다.</p>
      </details>
      <details>
        <summary>무엇을 준비해야 하나요?</summary>
        <p>걷기 편하고 미끄럽지 않은 운동화, 햇빛을 가릴 모자, 개인 물병, 날씨 변화에 대비한 겉옷을 준비해 주세요.</p>
      </details>
      <details>
        <summary>어디로 모이나요?</summary>
        <p>집결지는 <strong>한국수산자원공단 동해생명자원센터(강원특별자치도 양양군 손양면 동명로 119)</strong>입니다. 이곳에 모여 함께 남대천 일대와 연어전시관을 체험합니다. 시작 시간 전까지 도착해 주세요.</p>
      </details>
    </div>
  </div>
</section>
`;

export default function EcologyWetlandSalmon() {
  return (
    <div className="ecology-wetland-page">
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
            <circle cx="40" cy="40" r="38" fill="#4A7A8A" opacity="0.25" />
            <path
              d="M8 44 Q 40 34 72 44"
              stroke="#A8B367"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <g transform="translate(40, 42)">
              <ellipse cx="0" cy="0" rx="20" ry="9" fill="#E08A5C" />
              <ellipse cx="3" cy="2" rx="16" ry="5" fill="#EFB08C" opacity="0.85" />
              <path d="M17 0 L30 -8 L30 8 Z" fill="#C86B45" />
              <circle cx="-11" cy="-2" r="2.6" fill="#F5EFE0" />
              <circle cx="-11" cy="-2" r="1.3" fill="#1E2818" />
            </g>
          </svg>
          <h2
            className="section-title"
            style={{ color: "var(--cream)", margin: "0 auto 20px" }}
          >
            가을 남대천에서,<br />
            연어를 만나요
          </h2>
          <p>
            10월 연어 생태이야기 프로그램(10/3·10·24·31) 접수가 진행 중입니다.<br />
            하루 오전·오후 2타임, 1타임당 15명 내외로 진행됩니다.
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
