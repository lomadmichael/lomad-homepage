import "./ecology-wetland.css";

// 7-8월 정규 프로그램: 남대천 물속 생물 이야기 (민물고기·수서곤충)
// 6월 컴포넌트(EcologyWetlandSummer)의 디자인 시스템·class를 그대로 사용하고
// 콘텐츠/일러스트만 7-8월 물속 생물용으로 갈음.
const INQUIRY_TEL = "010-9542-3775";
const REGISTER_URL = "/ecology/register"; // 자체 접수 페이지

const INLINE_HTML = `
<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>남대천 물속 생물 이야기</span>
</div>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow"><span class="pulse"></span> 2026년 7-8월 · 양양 남대천</div>
      <h1 class="hero-title">
        남대천 물속<br>
        <span class="flow">생물 이야기</span>
      </h1>
      <p class="hero-sub">
        민물고기와 수서곤충이 살아가는 남대천. 족대로 직접 떠서 관찰하고, 다시 강으로 돌려보내며
        물속 생명의 세계와 맑은 물의 소중함을 생태지도사와 함께 만나봅니다.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${REGISTER_URL}">
          7/11·18·25 · 8/1·8 정규 접수
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a class="btn btn-ghost" href="#programs">프로그램 살펴보기</a>
      </div>
      <div class="hero-meta">
        <div>
          <div class="k">탐험 장소</div>
          <div class="v">남대천 (양양 서면 용천리 일원)</div>
        </div>
        <div>
          <div class="k">참여 대상</div>
          <div class="v">초등학생 이상 · 가족</div>
        </div>
        <div>
          <div class="k">모집 인원</div>
          <div class="v">회당 선착순 12명</div>
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

        <!-- 물고기 1 (연어, 왼쪽) -->
        <g transform="translate(155 380)">
          <ellipse cx="0" cy="0" rx="30" ry="13" fill="#E08A5C"/>
          <ellipse cx="2" cy="3" rx="26" ry="7" fill="#EFB08C" opacity="0.8"/>
          <path d="M26 0 L46 -12 L46 12 Z" fill="#C86B45"/>
          <path d="M-2 -13 L8 -3 L-10 -3 Z" fill="#C86B45"/>
          <circle cx="-17" cy="-3" r="3.4" fill="#fff"/>
          <circle cx="-17" cy="-3" r="1.7" fill="#1E2818"/>
          <path d="M-8 2 Q 4 5 16 2" stroke="#C86B45" stroke-width="1" fill="none" opacity="0.6"/>
        </g>

        <!-- 물고기 2 (은어, 오른쪽 아래, 반대 방향) -->
        <g transform="translate(345 445) scale(-1 1)">
          <ellipse cx="0" cy="0" rx="24" ry="9" fill="#8FB2A6"/>
          <ellipse cx="2" cy="2" rx="20" ry="5" fill="#C3D6CB" opacity="0.8"/>
          <path d="M20 0 L36 -9 L36 9 Z" fill="#6E9488"/>
          <circle cx="-13" cy="-2" r="2.6" fill="#fff"/>
          <circle cx="-13" cy="-2" r="1.3" fill="#1E2818"/>
        </g>

        <!-- 공기방울 -->
        <circle cx="120" cy="345" r="3" fill="#fff" opacity="0.5"/>
        <circle cx="128" cy="332" r="2" fill="#fff" opacity="0.45"/>
        <circle cx="300" cy="418" r="2.5" fill="#fff" opacity="0.5"/>
        <circle cx="307" cy="404" r="1.6" fill="#fff" opacity="0.4"/>

        <!-- 족대(뜰채) 왼쪽에서 담그기 -->
        <g transform="translate(70 250)">
          <rect x="-4" y="0" width="7" height="120" rx="3" fill="#9C7A4E" transform="rotate(18 0 0)"/>
          <ellipse cx="34" cy="120" rx="30" ry="14" fill="none" stroke="#6B7F3A" stroke-width="4"/>
          <path d="M8 120 Q 34 150 60 120" fill="rgba(107,127,58,0.18)" stroke="#6B7F3A" stroke-width="1.5"/>
          <line x1="14" y1="124" x2="54" y2="124" stroke="#6B7F3A" stroke-width="0.8" opacity="0.5"/>
          <line x1="20" y1="134" x2="48" y2="134" stroke="#6B7F3A" stroke-width="0.8" opacity="0.5"/>
        </g>

        <!-- 물속 조약돌 -->
        <ellipse cx="90" cy="490" rx="20" ry="10" fill="#B7A886" opacity="0.7"/>
        <ellipse cx="230" cy="500" rx="26" ry="11" fill="#A89A6E" opacity="0.6"/>
        <ellipse cx="380" cy="492" rx="22" ry="10" fill="#B7A886" opacity="0.65"/>
        <ellipse cx="160" cy="505" rx="14" ry="7" fill="#9C8E62" opacity="0.6"/>

        <!-- 수서곤충 (물자라 느낌, 수면 근처) -->
        <g transform="translate(255 356)">
          <ellipse cx="0" cy="0" rx="8" ry="6" fill="#6B5A3A"/>
          <path d="M-6 4 L-14 10 M6 4 L14 10 M-7 -2 L-15 -2 M7 -2 L15 -2" stroke="#6B5A3A" stroke-width="1.4" stroke-linecap="round"/>
          <circle cx="-3" cy="-4" r="1.4" fill="#F5EFE0"/>
          <circle cx="3" cy="-4" r="1.4" fill="#F5EFE0"/>
        </g>

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

        <!-- 잠자리 (수면 위) -->
        <g transform="translate(150 240)">
          <line x1="0" y1="0" x2="0" y2="16" stroke="#4A7A8A" stroke-width="2.5" stroke-linecap="round"/>
          <ellipse cx="-9" cy="2" rx="10" ry="3" fill="#7BA8B0" opacity="0.7" transform="rotate(-12 -9 2)"/>
          <ellipse cx="9" cy="2" rx="10" ry="3" fill="#7BA8B0" opacity="0.7" transform="rotate(12 9 2)"/>
          <circle cx="0" cy="-2" r="3" fill="#2E5461"/>
        </g>

        <!-- 메모 스티커 (현장 느낌) -->
        <g transform="translate(405 300) rotate(-8)">
          <rect x="-42" y="-14" width="84" height="28" rx="3" fill="#F5EFE0" stroke="#4A7A8A" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="0" y="4" text-anchor="middle" font-family="Gaegu" font-size="14" fill="#2E5461">남대천 · 여울</text>
        </g>
      </svg>
      <div class="stamp" style="top: 6%; left: -4%; transform: rotate(-8deg);">생태지도사와 함께 🐟</div>
    </div>
  </div>
</section>

<section class="band" id="programs" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">7-8월 정규 프로그램</div>
        <h2 class="section-title">남대천 물속에서<br>이런 걸 만나요</h2>
      </div>
      <p class="section-sub">족대와 뜰채로 민물고기와 수서곤충을 직접 채집하고, 루페로 자세히 관찰한 뒤 다시 강으로 돌려보냅니다. 어떤 생물이 사는지로 남대천의 물이 얼마나 맑은지 함께 알아봐요.</p>
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
        <h3 class="pc-title">생태지도사와 함께<br>물속 생명의 비밀을 찾는 시간</h3>
        <p class="pc-desc">남대천은 얼마나 깨끗할까요? 족대로 민물고기와 수서곤충을 직접 채집해 종류별로 나눠보고, 어떤 생물이 사는지로 물의 깨끗함을 배웁니다. 관찰이 끝난 생물은 다시 강으로 돌려보내고, 연어 팔찌·아기연어 열쇠고리 만들기로 마무리합니다.</p>
        <div class="pc-meta">
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영일</div>
            <div class="pc-meta-v">7월 11·18·25일 / 8월 1·8일 (토)</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영시간</div>
            <div class="pc-meta-v">오전 10:00 – 12:00<br><span style="color: var(--ink-soft); font-size:12px;">회당 120분 · 오전 2개반 운영</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">참여대상</div>
            <div class="pc-meta-v">초등학생 이상 어린이 및 동반 가족<br><span style="color: var(--sun); font-weight:600;">회차별 최대 12명</span> · 보호자 동반 필수</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">장소</div>
            <div class="pc-meta-v">남대천 (양양군 서면 용천리 일원)<br><span style="color: var(--coral); font-weight:600;">집결: 양양군 평생학습관 (양양읍 안산1길 36)</span></div>
          </div>
        </div>
        <a href="${REGISTER_URL}" class="pc-cta">
          접수하기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="band" id="schedule">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">7-8월의 일정</div>
        <h2 class="section-title">달력 위의 다섯 번의 만남</h2>
      </div>
    </div>
    <div class="timeline" style="grid-template-columns: repeat(5, 1fr);">
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">7월 11일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 1회차<br><span style="color: var(--ink-soft); font-weight: 400;">남대천 · 오전 2개반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">7월 18일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 2회차<br><span style="color: var(--ink-soft); font-weight: 400;">남대천 · 오전 2개반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">7월 25일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 3회차<br><span style="color: var(--ink-soft); font-weight: 400;">남대천 · 오전 2개반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">8월 1일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 4회차<br><span style="color: var(--ink-soft); font-weight: 400;">남대천 · 오전 2개반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">8월 8일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 5회차<br><span style="color: var(--ink-soft); font-weight: 400;">남대천 · 오전 2개반</span></div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="learn" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">프로그램 흐름</div>
        <h2 class="section-title">채집하고, 관찰하고,<br>다시 강으로</h2>
      </div>
      <p class="section-sub">생태지도사의 안내를 따라 네 단계로 물속 생명을 만납니다. 생명을 소중히 다루는 마음도 함께 배워요.</p>
    </div>
    <div class="learn-grid" style="grid-template-columns: repeat(4, 1fr);">
      <div class="learn-card">
        <div class="lc-num">01 / 채집</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="0" y="70" width="130" height="34" fill="#7BA8B0"/>
            <rect x="0" y="70" width="130" height="8" fill="#4A7A8A"/>
            <g transform="translate(50 20)">
              <rect x="-3" y="0" width="6" height="70" rx="3" fill="#9C7A4E" transform="rotate(14 0 0)"/>
              <ellipse cx="22" cy="72" rx="24" ry="11" fill="none" stroke="#6B7F3A" stroke-width="3.5"/>
              <path d="M0 72 Q 22 96 44 72" fill="rgba(107,127,58,0.2)" stroke="#6B7F3A" stroke-width="1.5"/>
            </g>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">족대로 직접 떠요</text>
          </svg>
        </div>
        <h3 class="lc-title">족대로 채집</h3>
        <p class="lc-desc">남대천 얕은 여울에서 족대와 뜰채로 민물고기와 수서곤충을 직접 채집해요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">02 / 관찰</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <circle cx="52" cy="52" r="30" fill="none" stroke="#6B7F3A" stroke-width="4"/>
            <circle cx="52" cy="52" r="26" fill="#7BA8B0" opacity="0.25"/>
            <line x1="74" y1="74" x2="104" y2="104" stroke="#9C7A4E" stroke-width="7" stroke-linecap="round"/>
            <g transform="translate(52 54)">
              <ellipse cx="0" cy="0" rx="15" ry="7" fill="#E08A5C"/>
              <path d="M13 0 L24 -7 L24 7 Z" fill="#C86B45"/>
              <circle cx="-8" cy="-1.5" r="2" fill="#fff"/>
              <circle cx="-8" cy="-1.5" r="1" fill="#1E2818"/>
            </g>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">루페로 자세히</text>
          </svg>
        </div>
        <h3 class="lc-title">루페로 관찰</h3>
        <p class="lc-desc">루페(돋보기)와 관찰통으로 물고기와 곤충의 생김새를 자세히 들여다봐요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">03 / 분류</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="14" y="40" width="102" height="52" rx="8" fill="#EDE5D1" stroke="#6B7F3A" stroke-width="2"/>
            <line x1="65" y1="40" x2="65" y2="92" stroke="#6B7F3A" stroke-width="1.5" stroke-dasharray="4 3"/>
            <g transform="translate(40 66)">
              <ellipse cx="0" cy="0" rx="12" ry="5.5" fill="#E08A5C"/>
              <path d="M10 0 L18 -5 L18 5 Z" fill="#C86B45"/>
            </g>
            <g transform="translate(92 64)">
              <ellipse cx="0" cy="0" rx="6" ry="5" fill="#6B5A3A"/>
              <path d="M-5 3 L-10 7 M5 3 L10 7 M-5 -2 L-11 -3 M5 -2 L11 -3" stroke="#6B5A3A" stroke-width="1.2" stroke-linecap="round"/>
            </g>
            <text x="65" y="114" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">종류별로 나눠요</text>
          </svg>
        </div>
        <h3 class="lc-title">종류별 분류</h3>
        <p class="lc-desc">채집한 생물을 물고기·수서곤충으로 나눠보고, 깨끗한 물에 사는 친구들을 알아봐요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">04 / 방생</div>
        <div class="lc-illust">
          <svg width="130" height="120" viewBox="0 0 130 120" aria-hidden="true">
            <rect x="0" y="66" width="130" height="38" fill="#7BA8B0"/>
            <rect x="0" y="66" width="130" height="8" fill="#4A7A8A"/>
            <path d="M20 66 Q 40 48 66 58 Q 92 68 110 52" stroke="#4A7A8A" stroke-width="2" fill="none" stroke-dasharray="4 4" opacity="0.7"/>
            <g transform="translate(78 82)">
              <ellipse cx="0" cy="0" rx="16" ry="7.5" fill="#E08A5C"/>
              <ellipse cx="2" cy="2" rx="13" ry="4" fill="#EFB08C" opacity="0.8"/>
              <path d="M14 0 L24 -7 L24 7 Z" fill="#C86B45"/>
              <circle cx="-9" cy="-1.5" r="2.2" fill="#fff"/>
              <circle cx="-9" cy="-1.5" r="1.1" fill="#1E2818"/>
            </g>
            <path d="M40 44 Q 44 40 48 44" stroke="#C78128" stroke-width="2" fill="none" stroke-linecap="round"/>
            <text x="65" y="116" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#2E5461">다시 남대천으로</text>
          </svg>
        </div>
        <h3 class="lc-title">강으로 방생</h3>
        <p class="lc-desc">관찰이 끝난 생물은 살던 곳으로 바로 돌려보내요. 자연을 이해하며 함께 지켜가는 마음을 배워요.</p>
      </div>
    </div>
  </div>
</section>

<section class="creatures-band">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">물속 생물 도감</div>
        <h2 class="section-title">남대천에서 만날<br>물속 친구들</h2>
      </div>
      <p class="section-sub">맑은 물이 흐르는 양양 남대천은 다양한 민물고기와 수서곤충의 보금자리입니다. 어떤 친구들이 사는지에 따라 물이 얼마나 깨끗한지 알 수 있어요.</p>
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
        <div class="creature-name">연어 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(회귀 어종)</span></div>
        <div class="creature-lat">Oncorhynchus keta · 연어과</div>
        <div class="creature-desc">바다에서 자라 알을 낳으러 남대천으로 돌아오는 대표 회귀 어종. 남대천은 우리나라 연어가 돌아오는 손꼽히는 하천입니다. 이번 만들기 주인공이기도 해요.</div>
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
        <div class="creature-name">은어 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(여름 대표 어종)</span></div>
        <div class="creature-lat">Plecoglossus altivelis · 바다빙어과</div>
        <div class="creature-desc">맑고 찬 물에서만 사는 여름 대표 민물고기. 수박 향이 난다고 해서 '수박 물고기'로도 불려요. 깨끗한 남대천의 여울에서 만날 수 있습니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 58)">
              <ellipse cx="0" cy="14" rx="30" ry="6" fill="#000" opacity="0.12"/>
              <path d="M-6 18 Q -34 12 -20 -14 Q -6 -34 16 -20 Q 34 -8 22 12 Q 14 24 -6 18 Z" fill="#5A6E3A"/>
              <path d="M-2 12 Q -24 8 -14 -10 Q -2 -26 14 -14 Q 26 -4 18 8 Q 10 18 -2 12 Z" fill="#7A8E4A" opacity="0.8"/>
              <path d="M6 6 Q -8 2 -2 -8 Q 6 -18 14 -8" stroke="#3E4E22" stroke-width="2" fill="none" opacity="0.7"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">다슬기 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(맑은 물 지표)</span></div>
        <div class="creature-lat">Semisulcospira · 다슬기과</div>
        <div class="creature-desc">돌 위를 천천히 기어 다니며 이끼를 먹는 나선형 고둥. 맑은 1급수 물에서만 살아 물이 깨끗한지 알려주는 지표 생물이에요.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="110" height="100" viewBox="0 0 110 100" aria-hidden="true">
            <g transform="translate(55 50)">
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="#6B5A3A"/>
              <ellipse cx="0" cy="-4" rx="12" ry="15" fill="#8A7448" opacity="0.8"/>
              <circle cx="0" cy="-24" r="8" fill="#5A4A2E"/>
              <circle cx="-3" cy="-25" r="2" fill="#F5EFE0"/>
              <circle cx="3" cy="-25" r="2" fill="#F5EFE0"/>
              <path d="M-14 -8 L-30 -16 M-15 2 L-32 2 M-13 12 L-28 22" stroke="#5A4A2E" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M14 -8 L30 -16 M15 2 L32 2 M13 12 L28 22" stroke="#5A4A2E" stroke-width="2.5" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">수서곤충 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(물자라·물방개 등)</span></div>
        <div class="creature-lat">Aquatic insects · 물속 곤충</div>
        <div class="creature-desc">물속에서 살아가는 작은 곤충들. 물자라·물방개·잠자리 애벌레처럼 종류마다 사는 물이 달라, 수질을 알려주는 소중한 이웃이에요.</div>
      </div>
    </div>
  </div>
</section>

<section class="band checklist-band" id="prepare">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">준비물 안내</div>
        <h2 class="section-title">물에서 하는 체험,<br>이렇게 챙겨오세요</h2>
      </div>
      <p class="section-sub">물에 들어가는 체험이라 옷과 신발이 젖을 수 있어요. 갈아입을 옷과 물에서 신을 신발은 꼭 챙겨주세요.</p>
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
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>물놀이에 편한 복장</li>
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>물에서 신을 수 있는 신발 (아쿠아슈즈·샌들 등)</strong></li>
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>수건 · 갈아입을 옷과 신발</strong></li>
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>개인 물병 (더운 날씨 대비 꼭 챙겨주세요)</strong></li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>모자 · 자외선차단제</li>
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
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>생태관광 지도사 해설</li>
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>채집·관찰 도구 (족대·뜰채·루페·관찰통)</li>
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>장화 · 접이식 양동이 등 체험 장비</li>
          <li><span class="chk" style="background: var(--sun); border-color: var(--sun);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>만들기 체험 · 연어 팔찌 또는 아기연어 열쇠고리</strong></li>
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
        <h2 class="section-title">남대천의 친구들과<br>함께 지켜주세요</h2>
      </div>
    </div>
    <div class="notes-grid">
      <div class="note-card">
        <strong>🚿 화장실·샤워·탈의 시설이 충분하지 않아요</strong><br>
        체험지에는 화장실·샤워실·탈의실이 충분히 갖춰져 있지 않습니다. 체험 전 미리 화장실을 다녀오시고, 젖은 옷은 차량에서 갈아입어야 할 수 있는 점 양해 부탁드립니다.
      </div>
      <div class="note-card">
        <strong>💧 물에서는 안전이 최우선</strong><br>
        물에서는 혼자 행동하거나 위험한 곳으로 가지 않도록 지도사의 안내를 따라 주세요. 어린이는 항상 보호자와 함께 움직이고, 채집할 때 미끄러지지 않도록 주의해 주세요.
      </div>
      <div class="note-card">
        <strong>🐟 채집한 생물은 다시 강으로</strong><br>
        관찰이 끝난 생물은 바로 남대천에 돌려보냅니다. 작은 생명을 소중히 다루고, 데려가지 않고 눈으로 관찰해 주세요.
      </div>
      <div class="note-card">
        <strong>👨‍👩‍👧 가족 체험 프로그램</strong><br>
        본 프로그램은 가족 단위로 진행됩니다. 초등학생 이상 어린이와 <strong>보호자가 함께 신청</strong>해 주세요.
      </div>
    </div>

    <div class="faq">
      <details>
        <summary>물에 많이 들어가나요? 깊지 않나요?</summary>
        <p>무릎 아래 얕은 여울에서 지도사 인솔하에 안전한 구역에서만 진행합니다. 옷과 신발이 젖을 수 있으니 갈아입을 옷과 물에서 신을 신발을 준비해 주세요.</p>
      </details>
      <details>
        <summary>비가 오면 프로그램이 어떻게 되나요?</summary>
        <p>소량의 비는 진행하지만, 호우나 계곡 물이 불어나는 등 안전이 우려되는 상황에서는 일정이 조정될 수 있어요. 기상 상황에 따라 개별 안내드립니다.</p>
      </details>
      <details>
        <summary>몇 살부터 참여할 수 있나요?</summary>
        <p>초등학생 이상의 어린이와 동반 가족이 대상입니다. 물에서 진행되는 체험이라 <strong>안전을 위해 미취학 아동은 참가하실 수 없습니다.</strong></p>
      </details>
      <details>
        <summary>어디로 모이나요? 주차는요?</summary>
        <p>집결지는 <strong>양양군 평생학습관(양양읍 안산1길 36)</strong>입니다. 이곳에 모여 함께 체험지로 이동합니다. 시작 10분 전까지 도착해 주세요.</p>
      </details>
      <details>
        <summary>준비물을 못 챙기면 참여가 어렵나요?</summary>
        <p>수건·갈아입을 옷·물에서 신을 신발은 꼭 챙겨주세요. 물에 들어가는 체험이라 준비가 부족하면 활동이 제한될 수 있습니다.</p>
      </details>
    </div>
  </div>
</section>
`;

export default function EcologyWetlandWater() {
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
            <circle cx="40" cy="40" r="38" fill="#4A7A8A" opacity="0.25" />
            <path
              d="M8 44 Q 40 34 72 44"
              stroke="#A8B367"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <g transform="translate(40, 42)">
              <ellipse cx="0" cy="0" rx="20" ry="9" fill="#E8A845" />
              <ellipse cx="3" cy="2" rx="16" ry="5" fill="#F4C964" opacity="0.85" />
              <path d="M17 0 L30 -8 L30 8 Z" fill="#C78128" />
              <circle cx="-11" cy="-2" r="2.6" fill="#F5EFE0" />
              <circle cx="-11" cy="-2" r="1.3" fill="#1E2818" />
            </g>
          </svg>
          <h2
            className="section-title"
            style={{ color: "var(--cream)", margin: "0 auto 20px" }}
          >
            7-8월의 토요일 오전,<br />
            남대천에서 만나요
          </h2>
          <p>
            7월 11·18·25일, 8월 1·8일 정규 프로그램 접수가 진행 중입니다.<br />
            회차별 선착순 12명, 마감 시 조기 종료될 수 있어요.
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
              7/11·18·25 · 8/1·8 정규 프로그램 접수
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
