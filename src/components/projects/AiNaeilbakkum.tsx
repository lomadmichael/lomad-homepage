import "./ai-naeilbakkum.css";

// 바들바들 현남생활 – Ai 내일바꿈 (2026년 9월 1·2기 모집)
// 상세 랜딩. 생태체험 시리즈와 동일하게 스코프 CSS + 인라인 HTML 패턴을 사용한다.
const APPLY_URL = "https://monthler-form.monthler.kr/form/apply/348528732316635136";
const INSTAGRAM_URL = "https://www.instagram.com/likehn.kr";
const INQUIRY_TEL = "010-9542-3775";

const INLINE_HTML = `
<div class="crumb">
  <a href="/projects">PROJECTS</a>
  <span class="sep">/</span>
  <span>Ai 내일바꿈</span>
</div>

<section class="hero">
  <div class="wrap">
    <div class="eyebrow"><span class="pulse"></span> 2026년 9월 · 1·2기 참가자 모집 중</div>

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
      <a class="btn btn-primary" href="${APPLY_URL}" target="_blank" rel="noopener noreferrer">
        1·2기 참가 신청하기
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 14L20 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
      <a class="btn btn-ghost" href="#program">프로그램 살펴보기</a>
    </div>

    <div class="hero-img">
      <img src="/images/ai-naeilbakkum.jpg" alt="Ai 내일바꿈 — 양양 현남면에서 보내는 3박 4일" />
    </div>

    <div class="chips">
      <span class="chip">1기 9.3(목)–9.6(일)</span>
      <span class="chip">2기 9.10(목)–9.13(일)</span>
      <span class="chip">기수별 20명</span>
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
      우리는 Ai를 통해 <b>더 많은 역할</b>을 할 수 있다고 생각해요. 같이 배운 Ai를 활용해
      지역이 안고 있는 문제들을 함께 해결하는 다음 챕터도 준비하고 있습니다.
    </p>
    <div class="keyline">바다에서 쉬고, Ai로 내일을 대비하고,<br>사람과 연결되는 3박 4일.</div>
    <div class="stats">
      <div class="stat"><div class="num">5기수</div><div class="lbl">현남생활 운영 경험</div></div>
      <div class="stat"><div class="num">100명</div><div class="lbl">누적 참가 청년</div></div>
      <div class="stat"><div class="num">5.5:1</div><div class="lbl">역대 평균 경쟁률</div></div>
      <div class="stat"><div class="num">95%</div><div class="lbl">참가자 만족도</div></div>
    </div>
  </div>
</section>

<section class="band" id="program" style="background: var(--paper);">
  <div class="wrap">
    <span class="badge">프로그램 소개</span>
    <h2 class="section-title">바쁜 일상 잠깐 멈추고,<br>양양 현남면에서 <span class="hl">3박 4일</span></h2>

    <div class="ov-row"><span class="k">일정</span><span class="v"><b>1기</b> 2026. 9. 3.(목) ~ 9. 6.(일) · <b>2기</b> 2026. 9. 10.(목) ~ 9. 13.(일)<small>각 3박 4일 · 기수별 20명 · 원하는 기수를 골라 신청하세요</small></span></div>
    <div class="ov-row"><span class="k">접수 기간</span><span class="v"><b>2026년 8월 30일(일) 자정까지</b><small>결과 발표 8월 31일(월) 오후 3시 — 선정자에 한해 개별 연락</small></span></div>
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
    <h2 class="section-title">기본부터 실전까지,<br><span class="hl">내 일에 바로 쓰는</span> Ai 교육</h2>
    <p class="lead">
      이론만 듣다 끝나는 강의가 아닙니다. <b>Ai 첫걸음 기본 교육</b>부터
      <b>내 일에 바로 적용하는 실전 교육</b>까지 한 번에 — 배우는 자리에서 바로 써먹고,
      결과물을 손에 쥐고 돌아갑니다.
    </p>

    <div class="curr">
      <div class="curr-card">
        <span class="curr-tag">STEP 1</span>
        <h3>Ai 첫걸음</h3>
        <p class="curr-for">&ldquo;Ai, 알긴 아는데 아직 제대로 써본 적 없다면&rdquo;</p>
        <ul>
          <li>막연했던 Ai와 <b>첫 대화 잘하는 법</b>부터 차근차근 — 질문 하나 바꿨을 뿐인데 답이 달라지는 경험</li>
          <li>여행 계획, 경조사 문자, 생활 서류… <b>실생활 미션</b>을 Ai와 직접 해결</li>
          <li>그림엽서, 지인에게 보낼 축하 음악까지 — <b>Ai로 만드는 재미</b></li>
        </ul>
      </div>
      <div class="curr-card">
        <span class="curr-tag">STEP 2</span>
        <h3>내 일에 바로 적용</h3>
        <p class="curr-for">&ldquo;매일 반복되는 업무, 절반으로 줄이고 싶다면&rdquo;</p>
        <ul>
          <li>내 업무를 분해해 <b>Ai를 어디에 쓸지</b> 지도로 그리기</li>
          <li>보고서·이메일·사업계획을 <b>내 문서로 바로 실습</b></li>
          <li>엑셀·데이터 분석부터 <b>나만의 업무 Ai 비서</b> 만들기까지</li>
          <li>마지막 날, <b>나만의 Ai 산출물</b>을 완성해 발표</li>
        </ul>
      </div>
    </div>
    <div class="note-dark">처음이어도 괜찮아요 — <b>계정 세팅부터 운영진이 1:1로 지원</b>합니다</div>
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
    <div class="best-badge">⭐ 지난 5기수 참가자 만족도 · 추천 1위 프로그램</div>
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
    <div class="day"><div class="d">1<small>일차</small></div><div class="dt"><b>체크인 · 오리엔테이션</b><br>Ai 기본 세팅 → 숙소 체크인 · 네트워킹</div></div>
    <div class="day"><div class="d">2<small>일차</small></div><div class="dt"><b>현남면 러닝 → Ai 기본 교육</b><br>오후엔 지역 멘토 로컬투어</div></div>
    <div class="day"><div class="d">3<small>일차</small></div><div class="dt"><b>굿즈 만들기 → 서핑 → Ai 산출물 제작</b><br>저녁엔 요가로 하루 마무리</div></div>
    <div class="day"><div class="d">4<small>일차</small></div><div class="dt"><b>Ai 산출물 · 현남생활 발표회</b><br>체크아웃 및 귀가</div></div>
    <p class="foot-note">* 일정 외 시간은 식사 및 지역살이 탐색으로 자유롭게! 여건에 따라 일부 조정될 수 있습니다.</p>
  </div>
</section>

<section class="band">
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
        <p><b>별도 선발을 통해</b> 10월에 진행되는 <b>심화과정</b>에 초대합니다.<br>
        Ai 심화 워크숍과 팀 프로젝트로, 현남에서 한 걸음 더 이어가요.</p>
      </div>
    </div>
  </div>
</section>

<section class="band" style="background: var(--paper);">
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
        <li>3기(10월)는 <b>9월 초 별도 모집</b>합니다. 이번 모집은 1·2기 대상이에요.</li>
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
            접수 <b>8월 30일(일) 자정까지</b> · 결과 발표 8월 31일(월) 오후 3시
            <br />
            기수별 20명 선착 마감이 아닌 선발제로 진행됩니다.
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
              href={APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              1·2기 참가 신청하기
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
