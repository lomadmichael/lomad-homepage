import "./ecology-wetland.css";

// 6월 정규 프로그램: 바다를 이겨내는 식물들 (해안 사구·염생식물)
// 5월 컴포넌트(EcologyWetlandSpring)의 디자인 시스템·class를 그대로 사용하고
// 콘텐츠/일러스트만 6월용으로 갈음.
const INQUIRY_TEL = "010-9542-3775";
const FORMPAY_URL = "https://forms.gle/7bfM3x5Zhk55iQcz9"; // 6월 전용 폼 확정되면 교체

const INLINE_HTML = `
<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>바다를 이겨내는 식물들</span>
</div>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow"><span class="pulse"></span> 2026년 6월 · 양양 남대천 하구</div>
      <h1 class="hero-title">
        바다를 이겨내는<br>
        <span class="flow">식물들</span>
      </h1>
      <p class="hero-sub">
        파도와 짠바람을 견디며 모래언덕에 뿌리내린 작은 식물들. 갯메꽃·해란초·갯완두가 어떻게 이겨내는지,
        생태지도사와 함께 비밀을 풀어봅니다.
      </p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="${FORMPAY_URL}" target="_blank" rel="noopener noreferrer">
          6/13·6/20·6/27 정규 접수
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a class="btn btn-ghost" href="#programs">프로그램 살펴보기</a>
      </div>
      <div class="hero-meta">
        <div>
          <div class="k">탐험 장소</div>
          <div class="v">남대천 하구 가평리 일원</div>
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
        <!-- 태양 (우상단, 잘리지 않게 안전 위치) -->
        <circle cx="395" cy="135" r="100" fill="#F4C964" opacity="0.32"/>
        <circle cx="395" cy="135" r="78" fill="#F4C964"/>
        <circle cx="395" cy="135" r="60" fill="#E8A845"/>

        <!-- 바다 (수평선) -->
        <rect x="0" y="240" width="500" height="55" fill="#7BA8B0"/>
        <rect x="0" y="240" width="500" height="20" fill="#4F8189"/>
        <path d="M0 270 Q 80 265 160 270 T 320 270 T 500 270" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.6"/>
        <path d="M0 283 Q 90 278 180 283 T 360 283 T 500 283" stroke="#fff" stroke-width="1.2" fill="none" opacity="0.5"/>

        <!-- 백사 경계 -->
        <ellipse cx="250" cy="295" rx="280" ry="8" fill="#fff" opacity="0.7"/>

        <!-- 모래언덕 -->
        <path d="M0 520 L0 380 Q 80 340 160 360 Q 240 380 320 350 Q 400 325 500 355 L500 520 Z" fill="#E0D5B8"/>
        <path d="M0 520 L0 400 Q 80 380 160 390 Q 240 400 320 385 Q 400 370 500 385 L500 520 Z" fill="#C9B98A" opacity="0.55"/>

        <!-- 모래 점 -->
        <circle cx="60" cy="440" r="2" fill="#A89A6E" opacity="0.5"/>
        <circle cx="120" cy="470" r="1.5" fill="#A89A6E" opacity="0.5"/>
        <circle cx="200" cy="450" r="2" fill="#A89A6E" opacity="0.5"/>
        <circle cx="280" cy="480" r="1.5" fill="#A89A6E" opacity="0.5"/>
        <circle cx="350" cy="455" r="2" fill="#A89A6E" opacity="0.5"/>
        <circle cx="430" cy="470" r="1.5" fill="#A89A6E" opacity="0.5"/>

        <!-- 갯메꽃 (분홍 나팔꽃, 왼쪽 군락) -->
        <g transform="translate(80 390)">
          <path d="M0 50 Q -3 30 5 10" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="-8" cy="35" rx="10" ry="4" fill="#6B7F3A" transform="rotate(-25 -8 35)"/>
          <ellipse cx="-6" cy="35" rx="8" ry="3" fill="#A8B367" transform="rotate(-25 -6 35)"/>
          <ellipse cx="6" cy="6" rx="18" ry="13" fill="#E8B4C8"/>
          <ellipse cx="6" cy="8" rx="14" ry="10" fill="#F0CFDB"/>
          <circle cx="6" cy="10" r="3" fill="#D4705C"/>
        </g>
        <g transform="translate(125 400)">
          <path d="M0 40 Q -2 25 4 8" stroke="#6B7F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="-6" cy="28" rx="8" ry="3" fill="#6B7F3A" transform="rotate(-20 -6 28)"/>
          <ellipse cx="5" cy="5" rx="14" ry="10" fill="#E8B4C8"/>
          <ellipse cx="5" cy="7" rx="11" ry="8" fill="#F0CFDB"/>
          <circle cx="5" cy="8" r="2.5" fill="#D4705C"/>
        </g>

        <!-- 해란초 (노란, 중앙) -->
        <g transform="translate(220 370)">
          <path d="M0 60 L 0 0" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="-5" cy="45" rx="3" ry="8" fill="#6B7F3A"/>
          <ellipse cx="5" cy="35" rx="3" ry="8" fill="#A8B367"/>
          <ellipse cx="-5" cy="25" rx="3" ry="7" fill="#6B7F3A"/>
          <ellipse cx="-4" cy="-2" rx="5" ry="4" fill="#E8A845"/>
          <ellipse cx="4" cy="-4" rx="5" ry="4" fill="#F4C964"/>
          <ellipse cx="0" cy="-12" rx="5" ry="4" fill="#E8A845"/>
          <ellipse cx="-3" cy="-18" rx="4" ry="3.5" fill="#F4C964"/>
          <ellipse cx="4" cy="-20" rx="4" ry="3.5" fill="#E8A845"/>
        </g>

        <!-- 갯완두 (보라, 오른쪽) -->
        <g transform="translate(330 385)">
          <path d="M0 55 Q 5 35 -5 20 Q -10 10 5 -2" stroke="#6B7F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="-8" cy="40" rx="6" ry="3" fill="#6B7F3A" transform="rotate(-30 -8 40)"/>
          <ellipse cx="8" cy="30" rx="6" ry="3" fill="#A8B367" transform="rotate(30 8 30)"/>
          <ellipse cx="-8" cy="20" rx="6" ry="3" fill="#6B7F3A" transform="rotate(-30 -8 20)"/>
          <ellipse cx="0" cy="-4" rx="8" ry="6" fill="#9D7BB3"/>
          <ellipse cx="0" cy="-3" rx="6" ry="4" fill="#BFA0CF"/>
          <ellipse cx="-3" cy="-6" rx="4" ry="3" fill="#7E5A99"/>
        </g>

        <g transform="translate(420 420)">
          <path d="M0 30 Q -3 18 3 5" stroke="#6B7F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="-6" cy="20" rx="7" ry="3" fill="#6B7F3A" transform="rotate(-15 -6 20)"/>
          <ellipse cx="4" cy="4" rx="11" ry="8" fill="#E8B4C8"/>
          <ellipse cx="4" cy="6" rx="8" ry="6" fill="#F0CFDB"/>
        </g>

        <!-- 갈매기 (좌측 상단) -->
        <path d="M120 110 Q 130 102 140 110" stroke="#3E4E22" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M140 110 Q 150 102 160 110" stroke="#3E4E22" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M180 150 Q 188 144 196 150" stroke="#3E4E22" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M196 150 Q 204 144 212 150" stroke="#3E4E22" stroke-width="2" fill="none" stroke-linecap="round"/>

        <!-- 메모 스티커 (현장 느낌) -->
        <g transform="translate(400 290) rotate(-8)">
          <rect x="-40" y="-14" width="80" height="28" rx="3" fill="#F5EFE0" stroke="#4F8189" stroke-width="1.5" stroke-dasharray="3 3"/>
          <text x="0" y="4" text-anchor="middle" font-family="Gaegu" font-size="14" fill="#4F8189">바다 · 사구</text>
        </g>
      </svg>
      <div class="stamp" style="top: 8%; left: -4%; transform: rotate(-8deg);">생태지도사와 함께 🌊</div>
    </div>
  </div>
</section>

<section class="band" id="programs" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">6월 정규 프로그램</div>
        <h2 class="section-title">바닷가 모래언덕에서<br>이런 걸 만나요</h2>
      </div>
      <p class="section-sub">파도와 짠바람을 견뎌낸 작은 식물 친구들. 생태지도사와 함께 갯메꽃·해란초·갯완두를 직접 찾아보고, 짠물을 이겨내는 지혜를 배워봅니다.</p>
    </div>

    <div class="prog-grid">
      <div class="prog-card highlight" style="grid-column: 1 / -1;">
        <div class="pc-icon">
          <svg width="54" height="54" viewBox="0 0 60 60" fill="none" aria-hidden="true">
            <circle cx="30" cy="30" r="28" fill="#A8B367" opacity="0.25"/>
            <ellipse cx="30" cy="44" rx="20" ry="3" fill="#E0D5B8"/>
            <path d="M30 44 L 30 18" stroke="#6B7F3A" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="26" cy="20" rx="3" ry="6" fill="#A8B367"/>
            <ellipse cx="34" cy="14" rx="3" ry="6" fill="#E8A845"/>
            <ellipse cx="22" cy="14" rx="3" ry="5" fill="#9D7BB3"/>
          </svg>
        </div>
        <div class="pc-type">PROGRAM · 정규 생태체험 프로그램</div>
        <h3 class="pc-title">생태지도사와 함께<br>짠물 이긴 식물의 비밀을 찾는 시간</h3>
        <p class="pc-desc">바닷가 모래언덕(사구)은 어떻게 만들어졌을까요? 갯메꽃·해란초·갯완두는 어떻게 짠물에서 살아남을까요? 두꺼운 잎, 보송한 털, 깊은 뿌리 — 식물이 짠물을 이겨내는 지혜를 발견하고 생태 놀이와 만들기 체험으로 마무리합니다.</p>
        <div class="pc-meta">
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영일</div>
            <div class="pc-meta-v">6월 13일 · 20일 · 27일 (토)</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">운영시간</div>
            <div class="pc-meta-v">오전 A반 10:00 – 12:00<br>오전 B반 10:00 – 12:00<br><span style="color: var(--ink-soft); font-size:12px;">회당 120분 · 오전 2개반 동시 운영</span></div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">참여대상</div>
            <div class="pc-meta-v">어린이 및 동반 가족<br><span style="color: var(--sun); font-weight:600;">회당 선착순 16명</span> · 보호자 동반 필수</div>
          </div>
          <div class="pc-meta-item">
            <div class="pc-meta-k">장소</div>
            <div class="pc-meta-v">남대천 하구 가평리 일원 (가평리 29-9, 6-12)<br><span style="color: var(--coral); font-weight:600;">집결: 가평리 유채꽃밭 주차장 (가평리 29-4)</span></div>
          </div>
        </div>
        <a href="${FORMPAY_URL}" target="_blank" rel="noopener noreferrer" class="pc-cta">
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
        <div class="section-label">6월의 일정</div>
        <h2 class="section-title">달력 위의 세 번의 만남</h2>
      </div>
    </div>
    <div class="timeline">
      <div class="tl-node">
        <div class="tl-dot active"></div>
        <div class="tl-date">6월 13일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 1회차<br><span style="color: var(--ink-soft); font-weight: 400;">가평리 사구 · 오전 A·B반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">6월 20일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 2회차<br><span style="color: var(--ink-soft); font-weight: 400;">가평리 사구 · 오전 A·B반</span></div>
      </div>
      <div class="tl-node">
        <div class="tl-dot"></div>
        <div class="tl-date">6월 27일</div>
        <div class="tl-day">토요일</div>
        <div class="tl-label">정규 생태체험 3회차<br><span style="color: var(--ink-soft); font-weight: 400;">가평리 사구 · 오전 A·B반</span></div>
      </div>
    </div>
  </div>
</section>

<section class="band" id="learn" style="background: var(--cream-2);">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">탐험 주요 내용</div>
        <h2 class="section-title">바닷가에서 배우는<br>세 가지 이야기</h2>
      </div>
      <p class="section-sub">루페와 활동지를 손에 들고 생태지도사의 안내를 따라가며 직접 보고 기록합니다.</p>
    </div>
    <div class="learn-grid">
      <div class="learn-card">
        <div class="lc-num">01 / 모래언덕 탐험</div>
        <div class="lc-illust">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <rect x="0" y="55" width="140" height="20" fill="#7BA8B0"/>
            <rect x="0" y="55" width="140" height="6" fill="#4F8189"/>
            <path d="M0 100 Q 30 80 60 90 Q 90 100 120 85 Q 130 80 140 90 L 140 120 L 0 120 Z" fill="#E0D5B8"/>
            <path d="M0 110 Q 40 100 80 105 Q 110 108 140 102 L 140 120 L 0 120 Z" fill="#C9B98A" opacity="0.6"/>
            <circle cx="115" cy="25" r="13" fill="#F4C964"/>
            <text x="70" y="118" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#3E4E22">바다와 강이 만난 자리</text>
          </svg>
        </div>
        <h3 class="lc-title">사구는 어떻게 만들어졌을까?</h3>
        <p class="lc-desc">바람과 파도가 모래를 쌓아 만든 작은 언덕. 강과 바다가 만나는 자리에서 사구가 어떻게 생기는지 함께 살펴봅니다.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">02 / 짠물 이긴 식물 찾기</div>
        <div class="lc-illust">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <ellipse cx="70" cy="105" rx="65" ry="6" fill="#E0D5B8"/>
            <g transform="translate(30 75)">
              <path d="M0 30 Q -3 18 3 5" stroke="#6B7F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="-5" cy="20" rx="6" ry="2.5" fill="#6B7F3A"/>
              <ellipse cx="4" cy="4" rx="11" ry="8" fill="#E8B4C8"/>
              <ellipse cx="4" cy="6" rx="8" ry="6" fill="#F0CFDB"/>
            </g>
            <g transform="translate(70 60)">
              <path d="M0 45 L0 0" stroke="#6B7F3A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="-4" cy="30" rx="2.5" ry="6" fill="#6B7F3A"/>
              <ellipse cx="4" cy="20" rx="2.5" ry="6" fill="#A8B367"/>
              <ellipse cx="-3" cy="-2" rx="4" ry="3" fill="#E8A845"/>
              <ellipse cx="3" cy="-4" rx="4" ry="3" fill="#F4C964"/>
            </g>
            <g transform="translate(110 70)">
              <path d="M0 35 Q 5 20 -3 10 Q -7 4 3 0" stroke="#6B7F3A" stroke-width="2" fill="none" stroke-linecap="round"/>
              <ellipse cx="-5" cy="22" rx="4" ry="2" fill="#6B7F3A" transform="rotate(-30 -5 22)"/>
              <ellipse cx="0" cy="-2" rx="6" ry="4.5" fill="#9D7BB3"/>
            </g>
            <text x="70" y="118" text-anchor="middle" font-family="Gaegu" font-size="10" fill="#3E4E22">갯메꽃 · 해란초 · 갯완두</text>
          </svg>
        </div>
        <h3 class="lc-title">갯메꽃 · 해란초 · 갯완두</h3>
        <p class="lc-desc">사구에 사는 작은 식물 친구 3가지를 직접 찾아보고, 루페로 잎과 꽃의 모습을 자세히 관찰해요.</p>
      </div>
      <div class="learn-card">
        <div class="lc-num">03 / 버티는 지혜 + 만들기</div>
        <div class="lc-illust">
          <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true">
            <ellipse cx="70" cy="65" rx="40" ry="32" fill="#A8B367" opacity="0.25"/>
            <ellipse cx="70" cy="55" rx="22" ry="16" fill="#8FB996"/>
            <path d="M50 55 Q 70 45 90 55" stroke="#3E4E22" stroke-width="1.2" fill="none" opacity="0.4"/>
            <path d="M50 60 Q 70 52 90 60" stroke="#3E4E22" stroke-width="1.2" fill="none" opacity="0.4"/>
            <circle cx="58" cy="50" r="3" fill="#fff"/>
            <circle cx="82" cy="50" r="3" fill="#fff"/>
            <circle cx="58" cy="50" r="1.5" fill="#3E4E22"/>
            <circle cx="82" cy="50" r="1.5" fill="#3E4E22"/>
            <path d="M70 70 Q 65 78 70 86 Q 75 94 70 100" stroke="#6B4226" stroke-width="2" fill="none" stroke-linecap="round"/>
            <text x="70" y="118" text-anchor="middle" font-family="Gaegu" font-size="11" fill="#3E4E22">두꺼운 잎 · 보송한 털 · 깊은 뿌리</text>
          </svg>
        </div>
        <h3 class="lc-title">짠물 이긴 식물의 비밀</h3>
        <p class="lc-desc">두꺼운 잎, 보송한 털, 깊은 뿌리. 식물이 짠물과 모래바람을 이겨내는 지혜를 발견하고 생태 놀이와 만들기 체험으로 마무리해요.</p>
      </div>
    </div>
  </div>
</section>

<section class="creatures-band">
  <div class="wrap">
    <div class="band-title-row">
      <div>
        <div class="section-label">사구 식물 도감</div>
        <h2 class="section-title">모래언덕에서 만날<br>작은 식물 친구들</h2>
      </div>
      <p class="section-sub">파도와 짠바람 사이, 모래 위에서 꿋꿋이 살아가는 식물들. 양양 남대천 하구 사구는 다양한 염생식물의 보금자리입니다.</p>
    </div>
    <div class="creature-row">
      <div class="creature">
        <div class="creature-illust">
          <svg width="100" height="110" viewBox="0 0 100 110" aria-hidden="true">
            <ellipse cx="50" cy="100" rx="45" ry="6" fill="#E0D5B8"/>
            <g transform="translate(50 60)">
              <path d="M0 38 Q -5 22 6 8" stroke="#6B7F3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="-12" cy="26" rx="13" ry="5" fill="#6B7F3A" transform="rotate(-25 -12 26)"/>
              <ellipse cx="-10" cy="26" rx="10" ry="3.5" fill="#A8B367" transform="rotate(-25 -10 26)"/>
              <ellipse cx="12" cy="20" rx="11" ry="4" fill="#6B7F3A" transform="rotate(20 12 20)"/>
              <ellipse cx="10" cy="20" rx="8" ry="2.5" fill="#A8B367" transform="rotate(20 10 20)"/>
              <ellipse cx="8" cy="4" rx="22" ry="16" fill="#E8B4C8"/>
              <ellipse cx="8" cy="6" rx="17" ry="12" fill="#F0CFDB"/>
              <circle cx="8" cy="8" r="4" fill="#D4705C"/>
              <path d="M-10 2 L 8 7" stroke="#D4849C" stroke-width="0.8" opacity="0.6"/>
              <path d="M25 2 L 8 7" stroke="#D4849C" stroke-width="0.8" opacity="0.6"/>
              <path d="M8 -10 L 8 7" stroke="#D4849C" stroke-width="0.8" opacity="0.6"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">갯메꽃 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(분홍 나팔꽃)</span></div>
        <div class="creature-lat">Calystegia soldanella · 메꽃과</div>
        <div class="creature-desc">모래 위를 기어가듯 줄기를 뻗으며 자라는 분홍빛 나팔꽃. 두꺼운 잎이 짠물을 막아주고, 깊은 뿌리가 모래 속에서 물을 찾아냅니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="100" height="110" viewBox="0 0 100 110" aria-hidden="true">
            <ellipse cx="50" cy="100" rx="45" ry="6" fill="#E0D5B8"/>
            <g transform="translate(50 55)">
              <path d="M0 45 L 0 -5" stroke="#6B7F3A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="-7" cy="33" rx="3.5" ry="10" fill="#6B7F3A"/>
              <ellipse cx="7" cy="23" rx="3.5" ry="10" fill="#A8B367"/>
              <ellipse cx="-7" cy="13" rx="3.5" ry="9" fill="#6B7F3A"/>
              <ellipse cx="7" cy="3" rx="3.5" ry="9" fill="#A8B367"/>
              <ellipse cx="-5" cy="-8" rx="6" ry="5" fill="#E8A845"/>
              <ellipse cx="5" cy="-10" rx="6" ry="5" fill="#F4C964"/>
              <ellipse cx="0" cy="-18" rx="6" ry="5" fill="#E8A845"/>
              <ellipse cx="-4" cy="-25" rx="5" ry="4" fill="#F4C964"/>
              <ellipse cx="5" cy="-28" rx="5" ry="4" fill="#E8A845"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">해란초 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(노란 종꽃)</span></div>
        <div class="creature-lat">Linaria japonica · 현삼과</div>
        <div class="creature-desc">모래 위로 곧게 솟은 줄기에 노란 종 모양 꽃이 다발로 피어요. 잎과 줄기가 단단한 표면으로 덮여 짠 바람과 자외선을 이겨냅니다.</div>
      </div>
      <div class="creature">
        <div class="creature-illust">
          <svg width="100" height="110" viewBox="0 0 100 110" aria-hidden="true">
            <ellipse cx="50" cy="100" rx="45" ry="6" fill="#E0D5B8"/>
            <g transform="translate(50 55)">
              <path d="M0 45 Q 8 28 -8 14 Q -15 4 8 -5" stroke="#6B7F3A" stroke-width="3" fill="none" stroke-linecap="round"/>
              <ellipse cx="-12" cy="30" rx="9" ry="4" fill="#6B7F3A" transform="rotate(-30 -12 30)"/>
              <ellipse cx="13" cy="20" rx="9" ry="4" fill="#A8B367" transform="rotate(30 13 20)"/>
              <ellipse cx="-12" cy="8" rx="9" ry="4" fill="#6B7F3A" transform="rotate(-30 -12 8)"/>
              <ellipse cx="0" cy="-8" rx="13" ry="10" fill="#9D7BB3"/>
              <ellipse cx="0" cy="-6" rx="10" ry="7" fill="#BFA0CF"/>
              <ellipse cx="-4" cy="-10" rx="6" ry="4.5" fill="#7E5A99"/>
            </g>
          </svg>
        </div>
        <div class="creature-name">갯완두 <span style="font-size:11px; color:var(--ink-soft); font-weight:400;">(보라 콩꽃)</span></div>
        <div class="creature-lat">Lathyrus japonicus · 콩과</div>
        <div class="creature-desc">덩굴손으로 다른 식물에 기대어 자라며 보라색 콩꽃을 피웁니다. 콩과 식물답게 뿌리에서 질소를 만들어 척박한 모래땅에서도 살아남아요.</div>
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
      <p class="section-sub">6월 바닷가는 햇볕이 강해요. 모자·자외선차단제·물병은 꼭 챙겨주세요.</p>
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
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>야외활동에 편한 복장</li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>운동화 또는 발 덮인 신발</li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>햇빛을 가릴 모자 · 자외선차단제</li>
          <li><span class="chk" style="background: var(--coral); border-color: var(--coral);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>개인 물병 (더운 날씨 대비 꼭 챙겨주세요)</strong></li>
          <li><span class="chk"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#3E4E22" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>필기구 (연필·노트)</li>
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
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>루페(돋보기) · 활동지</li>
          <li><span class="chk" style="background: var(--moss); border-color: var(--moss);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>생태 놀이 및 만들기 체험</li>
          <li><span class="chk" style="background: var(--sun); border-color: var(--sun);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="#F5EFE0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><strong>사은품 · 생태관광 텀블러</strong></li>
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
        <h2 class="section-title">사구의 친구들과<br>함께 지켜주세요</h2>
      </div>
    </div>
    <div class="notes-grid">
      <div class="note-card">
        <strong>🌱 사구 식물은 매우 약해요</strong><br>
        모래언덕 식물은 작은 발걸음에도 쉽게 다칩니다. 지정된 탐방로를 벗어나지 말고, 꺾거나 가져가지 않고 눈으로만 관찰해 주세요.
      </div>
      <div class="note-card">
        <strong>🛡️ 모래언덕 안전 수칙</strong><br>
        사구는 미끄러울 수 있어요. 지도사의 안내에 따라 안전한 동선으로 이동하고, 어린이는 항상 보호자와 함께 움직여 주세요.
      </div>
      <div class="note-card">
        <strong>📍 집결지를 확인해 주세요</strong><br>
        집결 장소는 <strong>가평리 유채꽃밭 주차장(가평리 29-4)</strong>입니다. 시작 10분 전까지 도착해 주세요.
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
        <p>집결지인 <strong>가평리 유채꽃밭 주차장(가평리 29-4)</strong>을 이용하실 수 있습니다. 주말이라 만차가 될 수 있으니 여유있게 도착해 주세요.</p>
      </details>
      <details>
        <summary>오전 A반과 B반은 어떻게 다른가요?</summary>
        <p>같은 시간(10:00~12:00)에 두 그룹으로 나눠 운영합니다. 회당 최대 16명이 두 그룹으로 동시에 사구를 탐험합니다. 신청 시 원하는 반을 선택해 주세요.</p>
      </details>
      <details>
        <summary>신청 취소는 어떻게 하나요?</summary>
        <p>대기 중인 분들을 위해 참석이 어려워지면 <strong>최소 전일까지</strong> 문의처로 연락해 주세요. 한 자리가 또 한 가족의 경험이 됩니다.</p>
      </details>
    </div>
  </div>
</section>
`;

export default function EcologyWetlandSummer() {
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
              <circle cx="0" cy="0" r="20" fill="#F4C964" opacity="0.5" />
              <circle cx="0" cy="0" r="14" fill="#E8A845" />
              <g transform="translate(0, 18)">
                <ellipse cx="-8" cy="0" rx="6" ry="4" fill="#E8B4C8" />
                <ellipse cx="0" cy="-2" rx="5" ry="4" fill="#F4C964" />
                <ellipse cx="8" cy="0" rx="6" ry="4" fill="#9D7BB3" />
              </g>
            </g>
          </svg>
          <h2
            className="section-title"
            style={{ color: "var(--cream)", margin: "0 auto 20px" }}
          >
            6월의 토요일 오전,<br />
            바닷가에서 만나요
          </h2>
          <p>
            6월 13·20·27일 정규 프로그램 접수가 진행 중입니다.<br />
            회차별 선착순 16명, 마감 시 조기 종료될 수 있어요.
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
              href={FORMPAY_URL}
              target="_blank"
              rel="noopener noreferrer"
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
              6월 13·20·27일 정규 프로그램 접수
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
