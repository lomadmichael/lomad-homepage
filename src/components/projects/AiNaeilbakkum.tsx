import "./ai-naeilbakkum.css";

// 바들바들 현남생활 – Ai 내일바꿈 (2026년 10월 3기 모집)
// 상세 랜딩. 생태체험 시리즈와 동일하게 스코프 CSS + 인라인 HTML 패턴을 사용한다.
// 3기 한달살러 신청폼 URL. 비어 있으면 버튼이 인스타그램으로 가고 "신청 링크 준비 중"으로 표시된다.
const APPLY_URL = "https://monthler-form.monthler.kr/form/apply/360971777674842112";
const APPLY_READY = APPLY_URL.length > 0;
const INSTAGRAM_URL = "https://www.instagram.com/likehn.kr";
const INQUIRY_TEL = "010-9542-3775";
const APPLY_HREF = APPLY_READY ? APPLY_URL : "https://www.instagram.com/likehn.kr";
const APPLY_LABEL = APPLY_READY ? "3기 참가 신청하기" : "신청 링크 준비 중 · 인스타 공지";

const INLINE_HTML = `
<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>Ai 내일바꿈</span>
</div>

<section class="hero">
  <div class="wrap">
    <div class="eyebrow"><span class="pulse"></span> 2026년 10월 · 3기 참가자 모집 중</div>

    <div class="prompt-box">
      <div class="lbl">HYEONNAM-LIFE · AI PROMPT</div>
      <div class="line">나의 내일을 바꿔줘<span class="cursor"></span></div>
    </div>

    <h1 class="hero-title">바들바들 현남생활<br><span class="hl">Ai 내일바꿈</span></h1>
    <p class="hero-sub">
      바쁘죠? 그래도 여기서 잠깐, 새로운 삶과 일을 실험해 봐요.<br>
      양양 현남면에서 보내는 <b>3박 4일</b> — 서핑과 요가로 숨을 고르고,
      <b>실무에 바로 쓰는 Ai</b>를 배우며 나의 다음을 준비하는 체류형 프로그램입니다.
    </p>

    <div class="hero-ctas">
      <a class="btn btn-primary" href="${APPLY_HREF}" target="_blank" rel="noopener noreferrer">
        ${APPLY_LABEL}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <a class="btn btn-ghost" href="#program">프로그램 살펴보기</a>
    </div>

    <div class="hero-img">
      <img src="/images/ai-naeilbakkum.jpg" alt="Ai 내일바꿈 — 양양 현남면에서 보내는 3박 4일" />
    </div>

    <div class="chips">
      <span class="chip">3기 10.2(금)–10.5(월)</span>
      <span class="chip">연휴 3박 4일</span>
      <span class="chip">20명 선발</span>
      <span class="chip dark">참가비 무료</span>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <h2 class="section-title">Ai가 세상을 바꾸는 지금,<br>정작 <span class="hl">나의 내일</span>은 준비되고 있나요?</h2>
    <p class="lead">
      Ai가 세상을 빠르게 바꾸고 있지만, 바쁜 직장 생활 속에서는 좀처럼 제대로 배울 시간을 내기가 쉽지 않습니다.
      그래서 준비했습니다. <b>바들바들 현남생활 다섯 기수</b>를 운영하며 쌓아온 경험에
      실무에 바로 쓸 수 있는 Ai 교육을 더해, 청년들이 자신의 &lsquo;일&rsquo;과 &lsquo;내일&rsquo;을
      함께 준비하는 시간이 되도록 구성했습니다.
    </p>
    <p class="lead">
      지난 9월 <b>1·2기 40명이 나흘 만에 각자 현업에 바로 쓰는 결과물을 만들어 발표</b>했습니다.
      홈페이지를 완성한 사람도, 반복 업무를 대신해 주는 도구를 만든 사람도 있었어요.
      3기는 그 검증된 커리큘럼 그대로, 개천절 연휴에 진행합니다.
    </p>
    <div class="keyline">바다에서 쉬고, Ai로 내일을 대비하고,<br>사람과 연결되는 3박 4일.</div>
    <div class="stats">
      <div class="stat"><div class="num">40명</div><div class="lbl">1·2기 전원 완주 · 결과물 발표</div></div>
      <div class="stat"><div class="num">4.97</div><div class="lbl">전반 만족도 (5점 만점)</div></div>
      <div class="stat"><div class="num">100%</div><div class="lbl">추천 의향</div></div>
      <div class="stat"><div class="num">95%</div><div class="lbl">&ldquo;양양에서 살아보고 싶다&rdquo;</div></div>
    </div>
  </div>
</section>

<section class="band" id="program" style="background: var(--paper);">
  <div class="wrap">
    <span class="badge">프로그램 소개</span>
    <h2 class="section-title">바쁜 일상 잠깐 멈추고,<br>양양 현남면에서 <span class="hl">3박 4일</span></h2>

    <div class="ov-row"><span class="k">일정</span><span class="v"><b>3기</b> 2026. 10. 2.(금) ~ 10. 5.(월)<small>3박 4일 · 20명 · 10월 5일(월)은 개천절 대체휴일 — 연휴를 통째로 현남에서</small></span></div>
    <div class="ov-row"><span class="k">접수 기간</span><span class="v"><b>2026년 9월 28일(월) 오후 1시까지</b><small>결과 발표 9월 28일(월) 오후 6시 — 선정자에 한해 개별 연락</small></span></div>
    <div class="ov-row"><span class="k">장소</span><span class="v">강원특별자치도 양양군 현남면 일대</span></div>
    <div class="ov-row"><span class="k">신청 대상</span><span class="v">만 19세 ~ 49세 청년, 타지역 거주자, 3박 4일간 머무를 수 있는 사람</span></div>
    <div class="ov-row"><span class="k">참가비</span><span class="v"><b>무료!</b> 숙박·교육·체험·이동 지원까지 전부 무료로 제공됩니다</span></div>
    <div class="ov-row"><span class="k">보증금</span><span class="v"><b>5만원</b> — Ai 산출물(결과물) 제출 시 <b>100% 환급</b></span></div>
    <div class="ov-row"><span class="k">제공 사항</span><span class="v">3박 4일 숙박 (현남면 내 지정 숙소)<br>Ai 교육 커리큘럼 + 산출물 제작 코칭<br>현남생활 체험 프로그램 (서핑, 요가·명상, 러닝, 굿즈 만들기)<br>지역 멘토들과의 로컬 투어<br>터미널 ↔ 프로그램 장소 차량 이동 지원<br>웰컴키트 꾸러미 (산책안내서, 비치타올, 판퍼즐, 스포츠타올)</span></div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <span class="badge">Ai 배움 &amp; 창작</span>
    <h2 class="section-title">말로 시키면 만들어지는,<br><span class="hl">내 일에 바로 쓰는</span> Ai 교육</h2>
    <p class="lead">
      이론만 듣다 끝나는 강의가 아닙니다. 첫날 <b>Ai 개발 도구를 내 노트북에 세팅</b>하고,
      나흘째에는 <b>내 업무를 덜어주는 도구</b>를 직접 만들어 발표합니다. 코딩을 몰라도 됩니다 —
      1·2기 40명 중 개발자는 소수였고, 전원이 결과물을 완성했습니다.
    </p>

    <div class="curr">
      <div class="curr-card">
        <span class="curr-tag">1~2일차</span>
        <h3>Ai 개발 도구, 내 노트북에</h3>
        <p class="curr-for">&ldquo;혼자 해보다 세팅에서 막혀본 적 있다면&rdquo;</p>
        <ul>
          <li>첫날, <b>Claude Code</b> 설치와 계정 세팅을 운영진이 옆에서 1:1로 — 가장 큰 장벽을 함께 넘습니다</li>
          <li>말로 시켜서 <b>첫 웹페이지</b>를 만들고, 둘째 날 <b>인터넷에 올려</b> 링크를 손에 쥡니다</li>
          <li>데이터 저장소를 연결해 <b>기록이 남는 진짜 도구</b>로 한 단계 더</li>
        </ul>
      </div>
      <div class="curr-card">
        <span class="curr-tag">3~4일차</span>
        <h3>내 일에 쓰는 도구 만들기</h3>
        <p class="curr-for">&ldquo;매일 반복되는 업무, 절반으로 줄이고 싶다면&rdquo;</p>
        <ul>
          <li>내 업무와 일상에서 <b>불편한 것 하나</b>를 골라 &lsquo;내가 만들 것&rsquo;을 내 말로 설계</li>
          <li>계획대로 만들고, 막히면 <b>운영진과 함께</b> 풀어갑니다 — 실습 재료는 남의 예제가 아니라 내 일</li>
          <li>마지막 날, <b>완성한 결과물</b>을 발표하고 돌아가서 바로 씁니다</li>
          <li>1·2기 결과물: 홈페이지, 업무 자동화 도구, 기록·관리 앱 등</li>
        </ul>
      </div>
    </div>
    <div class="note-dark">처음이어도 괜찮아요 — <b>계정 세팅부터 운영진이 1:1로 지원</b>합니다. 필요한 Ai 계정은 교육 기간 동안 제공해요.</div>
  </div>
</section>

<section class="band" style="background: var(--paper);">
  <div class="wrap">
    <span class="badge">바다 리트릿</span>
    <h2 class="section-title">노트북을 덮으면<br>바로 <span class="hl">바다</span>인 교육 환경</h2>

    <div class="m-row">
      <div class="m-img"><img src="/images/ai-naeilbakkum/surfing.jpg" alt="서핑 강습" /></div>
      <div class="m-txt">
        <h3><small>SURFING</small>서핑</h3>
        <p>현남면은 죽도해변을 품은 <b>대한민국 서핑의 성지</b>입니다. 전문 강사와 함께
        지상 강습부터 입수까지 — 처음이어도 보드 위에 일어서는 순간의 짜릿함을 경험할 수 있어요.
        <b>보드·슈트 등 장비는 모두 제공</b>됩니다.</p>
      </div>
    </div>

    <div class="m-row rev">
      <div class="m-img"><img src="/images/ai-naeilbakkum/gallery1.jpg" alt="자연 속 요가 클래스" /></div>
      <div class="m-txt">
        <h3><small>YOGA &amp; MEDITATION</small>요가 &amp; 명상</h3>
        <p>통창 너머로 <b>바다가 펼쳐지는 해변 스튜디오</b>, 어떤 날은 잔잔한 <b>강을 바라보는 자연 속</b>에서 —
        호흡을 맞추는 요가 클래스와 은은한 조명 아래 몸과 마음을 내려놓는 명상 세션까지.
        몸이 굳어 있어도 괜찮아요.</p>
      </div>
    </div>

    <div class="m-row">
      <div class="m-img"><img src="/images/ai-naeilbakkum/running2.jpg" alt="호숫가 러닝" /></div>
      <div class="m-txt">
        <h3><small>RUNNING</small>러닝</h3>
        <p>아침 공기를 마시며 <b>호숫가와 해안길, 마을길을 함께 달립니다.</b>
        양양 러닝크루가 페이스를 이끌어주니 뛰어본 적 없어도 부담 없이 —
        함께 달리고 나면 아침 바다는 오래 기억에 남아요.</p>
      </div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <span class="badge">로컬 멘토투어</span>
    <div class="best-badge">⭐ 1·2기 참가자 &ldquo;나도 여기서 살아볼 수 있겠는데?&rdquo; 95%</div>
    <h2 class="section-title">로컬들만 아는 코스로,<br><span class="hl">찐 양양</span>을 즐겨요</h2>
    <p class="lead">
      양양에 먼저 정착한 <b>로컬 멘토들이 자신만의 코스로 안내하는 찐 로컬 투어.</b>
      관광 지도엔 없는, 로컬들만 아는 코스를 함께 즐겨보세요. 멘토들의 정착 이야기를 듣다 보면
      &lsquo;나도 여기서 살아볼 수 있겠는데?&rsquo;라는 생각이 드는, 이 프로그램의 하이라이트입니다.
    </p>

    <div class="tour-grid">
      <figure>
        <div class="ph"><img src="/images/ai-naeilbakkum/naksansa.jpg" alt="낙산사 투어" /></div>
        <figcaption>멘토와 함께 걷는 낙산사 코스</figcaption>
      </figure>
      <figure>
        <div class="ph"><img src="/images/ai-naeilbakkum/sup.jpg" alt="여름 바다 SUP" /></div>
        <figcaption>여름 바다에서 즐긴 SUP 세션</figcaption>
      </figure>
      <figure>
        <div class="ph"><img src="/images/ai-naeilbakkum/market_tour.jpg" alt="로컬 마켓 투어" /></div>
        <figcaption>로컬 멘토가 안내하는 시크릿 스팟</figcaption>
      </figure>
    </div>

    <div class="etc-cards">
      <div class="etc">
        <h4>현남생활 굿즈 만들기</h4>
        <p>나만의 현남 기념 굿즈를 직접 만들어 가져가요.</p>
      </div>
      <div class="etc">
        <h4>맛집 · 산책 자유 탐방</h4>
        <p>프로그램 외 시간엔 자유롭게 현남의 일상을 탐색해요.</p>
      </div>
    </div>
  </div>
</section>

<section class="band" style="background: var(--paper);">
  <div class="wrap">
    <span class="badge">3박 4일 일정</span>
    <h2 class="section-title">쉼과 배움이 번갈아 오는<br><span class="hl">3박 4일</span></h2>
    <div class="day"><div class="d">1<small>일차 · 금</small></div><div class="dt"><b>체크인 · 오리엔테이션</b><br>Ai 기본 세팅 → 숙소 체크인 · 네트워킹</div></div>
    <div class="day"><div class="d">2<small>일차 · 토</small></div><div class="dt"><b>현남면 러닝 → Ai 기본 교육</b><br>오후엔 지역 멘토 로컬투어</div></div>
    <div class="day"><div class="d">3<small>일차 · 일</small></div><div class="dt"><b>해변 요가 → 서핑 → Ai 산출물 제작</b><br>저녁엔 현남생활 굿즈 만들기</div></div>
    <div class="day"><div class="d">4<small>일차 · 월</small></div><div class="dt"><b>Ai 산출물 · 현남생활 발표회</b><br>체크아웃 및 귀가 (개천절 대체휴일)</div></div>
    <p class="foot-note">* 일정 외 시간은 식사 및 지역살이 탐색으로 자유롭게! 여건에 따라 일부 조정될 수 있습니다.</p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <span class="badge">1·2기 참가자 후기</span>
    <h2 class="section-title">먼저 다녀온 40명이<br><span class="hl">남긴 말</span></h2>
    <div class="quotes">
      <blockquote class="quote">
        <p>&ldquo;기본 세팅이 Ai 사용의 가장 큰 장벽인데, 혼자 시도했다가 이해가 안 돼 흥미가 떨어졌던 부분이 해결되니 비로소 Ai 사용의 재미를 본격적으로 느낄 수 있었어요.&rdquo;</p>
        <footer>2기 참가자 · 30대 직장인</footer>
      </blockquote>
      <blockquote class="quote">
        <p>&ldquo;어떤 아이디어가 떠올라도 &lsquo;그게 되겠어?&rsquo;라며 스스로 제한해 왔는데, 떠올린 아이디어가 눈앞에서 형태를 갖춰가는 걸 보고 이제는 직접 시도해 봐야겠다는 마음이 생겼어요.&rdquo;</p>
        <footer>2기 참가자 · 창작자</footer>
      </blockquote>
      <blockquote class="quote">
        <p>&ldquo;처음엔 0이었던 것이 결과물이 나올수록 계속 욕심나네요. 100% 될 때까지 해보려고 합니다. 3기 모집하면 신청할게요 :)&rdquo;</p>
        <footer>2기 참가자 · 브랜드 디자이너</footer>
      </blockquote>
    </div>
    <div class="tour-grid" style="margin-top:28px;">
      <figure>
        <div class="ph"><img src="/images/ai-naeilbakkum/p12_lecture.jpg" alt="1기 Ai 교육 현장" /></div>
        <figcaption>1기 Ai 교육 — 각자 내 일을 재료로</figcaption>
      </figure>
      <figure>
        <div class="ph"><img src="/images/ai-naeilbakkum/p12_surf.jpg" alt="1기 서핑 단체" /></div>
        <figcaption>죽도해변 서핑, 전원 입수</figcaption>
      </figure>
      <figure>
        <div class="ph"><img src="/images/ai-naeilbakkum/p12_orientation.jpg" alt="1기 오리엔테이션" /></div>
        <figcaption>첫날 오리엔테이션 — 두 기수 40명 전원 완주</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="band" style="background: var(--paper);">
  <div class="wrap">
    <span class="badge">참가 혜택</span>
    <div class="bene-grid">
      <div class="bene">
        <h4>참가비 무료</h4>
        <p>숙박·교육·체험 전부 무료! 보증금 5만원도 산출물 제출 시 100% 돌려드려요.</p>
      </div>
      <div class="bene">
        <h4>웰컴키트 꾸러미</h4>
        <p>산책안내서, 비치타올, 판퍼즐, 스포츠타올까지 알찬 구성.</p>
      </div>
      <div class="bene wide">
        <h4>심화과정 초청 기회</h4>
        <p><b>별도 선발을 통해</b> 1·2·3기 우수 참가자를 <b>심화과정</b>에 초대합니다.<br>
        Ai 심화 워크숍과 팀 프로젝트로, 현남에서 한 걸음 더 이어가요.</p>
      </div>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <span class="badge">지원 절차</span>
    <h2 class="section-title">신청은 <span class="hl">간단하게</span></h2>
    <div class="steps">
      <div class="stp"><span class="n">1</span><p>신청폼<br>작성</p></div>
      <div class="stp"><span class="n">2</span><p>선정 연락<br>기다리기</p></div>
      <div class="stp"><span class="n">3</span><p>보증금<br>입금 · 확정</p></div>
      <div class="stp"><span class="n">4</span><p>노트북 들고<br>현남으로!</p></div>
    </div>

    <div class="check">
      <h2 class="section-title" style="font-size: 26px; margin-top: 34px;">꼭 확인해 주세요!</h2>
      <ul>
        <li><b>노트북은 필수 준비물이에요.</b> Ai 교육과 산출물 제작에 꼭 필요합니다.</li>
        <li><b>프로그램은 전액 무료예요.</b> 보증금 5만원은 선정 후 납부하며, Ai 산출물 제출 시 100% 환급됩니다.</li>
        <li><b>터미널 ↔ 프로그램 장소 이동은 저희가 제공해요.</b> 프로그램 외 개별 이동은 자유롭게!</li>
        <li>식사는 지역 내 상점을 이용해주세요. (지역살이 탐색도 프로그램의 일부!)</li>
        <li>10월 5일(월)은 <b>개천절 대체휴일</b>이에요. 연휴 3박 4일, 다음 날 출근 걱정 없이 다녀오세요.</li>
      </ul>
    </div>
  </div>
</section>
`;

export default function AiNaeilbakkum() {
  return (
    <div className="ai-naeilbakkum-page">
      <div dangerouslySetInnerHTML={{ __html: INLINE_HTML }} />

      <section className="cta-band" id="apply">
        <div className="wrap">
          <h2 className="section-title" style={{ margin: "0 auto 18px" }}>
            지금, 나의 내일을
            <br />
            바꿔보세요
          </h2>
          <p>
            접수 <b>9월 28일(월) 오후 1시까지</b> · 결과 발표 같은 날 오후 6시
            <br />
            20명 선착 마감이 아닌 선발제로 진행됩니다.
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
              style={{ background: "var(--orange)", color: "#fff" }}
              href={APPLY_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              {APPLY_LABEL}
            </a>
            <a
              className="btn"
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
              }}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @likehn.kr
            </a>
            <a
              className="btn"
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid rgba(255,255,255,0.5)",
              }}
              href={`tel:${INQUIRY_TEL}`}
            >
              문의 {INQUIRY_TEL}
            </a>
          </div>

          <div className="hosts-row">
            <span className="box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ai-naeilbakkum/logos.png"
                alt="강원특별자치도 · 양양군 · LOMAD"
              />
            </span>
            <p className="credit">
              이 프로그램은 강원특별자치도와 양양군이 진행하는 &lsquo;농촌마을활력화
              프로젝트&rsquo; 사업의 지원을 통해 진행됩니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
