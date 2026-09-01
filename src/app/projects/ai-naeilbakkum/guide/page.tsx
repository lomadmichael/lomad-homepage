import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "참가자 안내 · 바들바들 현남생활 Ai 내일바꿈 | LOMAD",
  description:
    "「바들바들 현남생활 – Ai 내일바꿈」 참가자 안내 — 일정, 도착 시간과 터미널, 준비물, 자주 묻는 질문.",
  alternates: { canonical: "/projects/ai-naeilbakkum/guide" },
  robots: { index: false, follow: false },
};

const CONSENT_URL = "/projects/ai-naeilbakkum/consent";
const TEL = "010-9542-3775";

const SCHEDULE: { day: string; date: string; items: [string, string][] }[] = [
  {
    day: "1일차",
    date: "9월 3일 (목)",
    items: [
      ["~ 13:00", "터미널 도착 · 픽업"],
      ["~ 14:00", "웨이브웍스 집합 및 현생 체크인"],
      ["14:00 – 16:00", "오리엔테이션 · 자기소개"],
      ["16:00 – 18:00", "Ai 기본 세팅"],
      ["18:00 ~", "숙소 체크인 · 네트워킹"],
    ],
  },
  {
    day: "2일차",
    date: "9월 4일 (금)",
    items: [
      ["08:00 – 09:00", "현남면 러닝"],
      ["10:00 – 12:00", "Ai 기본 교육"],
      ["13:00 – 18:00", "지역 멘토 로컬투어"],
      ["18:00 ~", "자유시간"],
    ],
  },
  {
    day: "3일차",
    date: "9월 5일 (토)",
    items: [
      ["09:00 – 10:00", "현남생활 굿즈 만들기"],
      ["10:00 – 12:00", "서핑"],
      ["14:00 – 18:00", "Ai 교육 · 산출물 만들기"],
      ["18:00 – 19:00", "요가"],
      ["19:00 ~", "자유시간"],
    ],
  },
  {
    day: "4일차",
    date: "9월 6일 (일)",
    items: [
      ["~ 10:00", "숙소 체크아웃"],
      ["10:00 – 12:00", "Ai 산출물 · 현남생활 발표회"],
      ["12:00 ~", "현생 체크아웃 및 귀가"],
    ],
  },
];

const TERMINALS: { name: string; addr: string; note: string }[] = [
  {
    name: "양양종합여객터미널",
    addr: "양양군 양양읍 동해대로 2700",
    note: "현남면에서 가장 가깝습니다. 고속·시외버스 모두 이곳에 섭니다.",
  },
  {
    name: "속초시외버스터미널",
    addr: "속초시 장안로 16 (동명동)",
    note: "속초는 시외·고속 터미널이 서로 떨어져 있습니다. 예매하신 표가 어느 터미널 도착인지 확인해 주세요.",
  },
  {
    name: "속초고속버스터미널",
    addr: "속초시 동해대로 3988 (조양동)",
    note: "동서울·센트럴시티발 고속버스가 도착하는 곳입니다.",
  },
  {
    name: "강릉시외·고속버스터미널",
    addr: "강릉시 하슬라로 27 (홍제동)",
    note: "시외·고속 터미널이 한 자리에 붙어 있습니다.",
  },
  {
    name: "강릉역 (KTX)",
    addr: "강릉시 용지로 176 (교동)",
    note: "서울역·청량리역에서 KTX로 오실 수 있습니다. 강릉역에서도 픽업해 드립니다.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "노트북을 꼭 가져가야 하나요?",
    a: (
      <>
        네, <strong>필수 준비물</strong>입니다. Ai 교육과 산출물 제작이 프로그램의 중심이라 노트북
        없이는 참여가 어렵습니다. 충전기도 함께 챙겨 주세요.
      </>
    ),
  },
  {
    q: "참가비가 있나요? 보증금은 무엇인가요?",
    a: (
      <>
        참가비는 <strong>무료</strong>입니다. 숙박·교육·체험 비용을 모두 지원합니다. 보증금 5만원은
        참여 확정을 위한 예치금으로, <strong>전 일정 참여 후 결과보고서와 산출물을 제출하시면 전액
        환불</strong>해 드립니다.
        <br />
        <span className="text-text-sub">농협 301-0337-5650-61 로마드협동조합 (입금자명은 참가자 성함)</span>
      </>
    ),
  },
  {
    q: "무엇을 챙겨 가면 좋을까요?",
    a: (
      <>
        <strong>꼭 필요한 것</strong> — 노트북·충전기, 세면도구, 3박 4일 갈아입을 옷, 편한 운동복과
        운동화(러닝·요가), 상비약.
        <br />
        <strong>있으면 좋은 것</strong> — 수영복 또는 래시가드, 여벌 수건, 자외선 차단제, 슬리퍼,
        모자와 선글라스. 9월 초 바다는 아직 따뜻하지만 아침저녁으로 선선하니 얇은 겉옷을 하나
        챙기시면 좋습니다.
        <br />
        서핑 장비(보드·슈트)는 현장에서 제공합니다.
      </>
    ),
  },
  {
    q: "서핑이나 요가를 한 번도 해본 적이 없어요.",
    a: (
      <>
        괜찮습니다. 모두 <strong>처음 하시는 분 기준</strong>으로 진행하고 강사가 함께합니다. 지난
        기수에서도 대부분 처음 접하는 분들이었습니다. 몸 상태가 좋지 않거나 물이 무서우시면 무리하지
        마시고 운영진에게 말씀해 주세요.
      </>
    ),
  },
  {
    q: "숙소는 어떻게 되나요?",
    a: (
      <>
        현남면 내 숙소에서 <strong>3박</strong> 머무르며, <strong>2인 1실</strong>로 동성끼리
        배정됩니다. 룸메이트 배정은 도착 후 안내드립니다.
        <br />
        2인 1실 이용이 어려우신 사정이 있으면 <strong>미리 알려 주세요</strong>. 수건과 기본
        세면용품이 갖춰져 있지 않을 수 있으니 개인 세면도구는 챙겨 주시기 바랍니다.
      </>
    ),
  },
  {
    q: "식사는 제공되나요?",
    a: (
      <>
        <strong>1일차 저녁 식사는 주최 측에서 준비</strong>합니다. 그 외 식사(점심 등)는{" "}
        <strong>현남면의 지역 상점에서 각자 해결</strong>하시면 됩니다. 동네 가게들을 직접 둘러보는
        것도 현남생활의 일부라고 생각해 주세요. 알레르기나 못 드시는 음식이 있으면 미리 알려 주세요.
      </>
    ),
  },
  {
    q: "자차로 가도 되나요?",
    a: (
      <>
        가능합니다. 다만 로컬투어 등 일부 일정은 다 함께 이동하므로, 차는 숙소에 두고 움직이시게 됩니다.
        주차 공간은 여유가 있으니 자차로 오시는 분은 미리 알려 주세요.
      </>
    ),
  },
  {
    q: "중간에 개인 일정이 있어 일부만 참여해도 되나요?",
    a: (
      <>
        3박 4일 <strong>전 일정 참여를 원칙</strong>으로 합니다. 보증금 환불도 전 일정 참여와 산출물
        제출을 기준으로 합니다. 부득이한 사정이 있으시면 미리 운영진과 상의해 주세요.
      </>
    ),
  },
  {
    q: "산출물은 어떤 걸 만들게 되나요?",
    a: (
      <>
        본인의 일과 일상에 바로 쓸 수 있는 것을 만듭니다. 업무 자동화 도구, 나만의 Ai 비서, 콘텐츠나
        기획안 등 각자의 필요에 맞춰 정하시면 되고, 마지막 날 발표회에서 함께 나눕니다. 미리 준비해
        오실 필요는 없습니다.
      </>
    ),
  },
  {
    q: "비가 오면 어떻게 되나요?",
    a: (
      <>
        서핑·러닝 등 야외 활동은 <strong>기상 상황에 따라 순서가 바뀌거나 실내 프로그램으로 대체</strong>될
        수 있습니다. 현장에서 그날그날 안내드립니다.
      </>
    ),
  },
  {
    q: "참가 동의서는 왜 써야 하나요?",
    a: (
      <>
        <strong>여행자 보험 가입</strong>과 <strong>보증금 환불</strong>에 필요합니다. 보험 가입을 일정
        시작 전에 마쳐야 해서 <strong>9월 1일(화)까지</strong> 작성 부탁드립니다. 입력하신 주민등록번호는
        암호화해 보관하고 보험 가입 완료 즉시 파기합니다.
        <br />
        <Link href={CONSENT_URL} className="underline font-bold">
          참가 동의서 작성하기 →
        </Link>
      </>
    ),
  },
  {
    q: "심화과정은 무엇인가요?",
    a: (
      <>
        10월에 진행되는 별도 과정으로, <strong>별도 선발</strong>을 통해 초대합니다. Ai 심화 워크숍과 팀
        프로젝트로 현남에서의 경험을 한 걸음 더 이어갑니다.
      </>
    ),
  },
];

const SECTION = "font-[family-name:var(--font-noto)]";
const H2 = "text-[22px] md:text-[26px] font-black mb-2";
const LEAD = "text-[14px] text-text-sub leading-[1.9] mb-6";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link
            href="/projects/ai-naeilbakkum"
            className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub hover:text-text transition-colors"
          >
            ← Ai 내일바꿈
          </Link>
          <span className="font-[family-name:var(--font-karla)] text-[11px] font-extrabold tracking-[3px] uppercase text-text-sub">
            Lomad
          </span>
        </div>
      </header>

      <div className="flex-1">
        <div className="max-w-[760px] mx-auto px-6 md:px-12 py-14 md:py-20">
          <p className="font-[family-name:var(--font-karla)] text-[11px] tracking-[3px] font-extrabold uppercase text-text-sub mb-4">
            Participant Guide
          </p>
          <h1 className={`${SECTION} text-[30px] md:text-[38px] font-black leading-[1.25] mb-5`}>
            바들바들 현남생활
            <br />
            Ai 내일바꿈 참가자 안내
          </h1>
          <p className={`${SECTION} ${LEAD} mb-10`}>
            선정되신 분들께 필요한 내용을 한곳에 모았습니다. 궁금한 점이 남으면 언제든 연락 주세요.
          </p>

          {/* 가장 먼저 확인할 것 */}
          <section className="border-2 border-[#E8611C] bg-[#FDEBD9] px-6 py-6 mb-14">
            <h2 className={`${SECTION} text-[16px] font-black text-[#A8410F] mb-4`}>
              먼저 확인해 주세요
            </h2>
            <ul className={`${SECTION} text-[14px] leading-[2] text-[#A8410F] space-y-1`}>
              <li>
                <strong>9월 3일(목) 오후 1시까지</strong> 터미널 도착 — 도착하시면 픽업해 드립니다
              </li>
              <li>
                집합 장소는 <strong>죽도해변 웨이브웍스</strong> (양양군 현남면 인구중앙길 110)
              </li>
              <li>
                <strong>노트북 필수 지참</strong> — 충전기도 잊지 마세요
              </li>
              <li>
                <strong>9월 1일(화)까지 참가 동의서 작성</strong> —{" "}
                <Link href={CONSENT_URL} className="underline font-bold">
                  작성하러 가기
                </Link>
              </li>
            </ul>
          </section>

          {/* 1. 일정 */}
          <section className="mb-16">
            <h2 className={`${SECTION} ${H2}`}>일정</h2>
            <p className={`${SECTION} ${LEAD}`}>
              1기 9월 3일(목) ~ 9월 6일(일) 3박 4일 · 양양군 현남면 일원
              <br />
              일정 외 시간은 식사와 지역살이 탐색으로 자유롭게 보내시면 됩니다. 여건에 따라 일부
              조정될 수 있습니다.
            </p>
            <div className="space-y-6">
              {SCHEDULE.map((d) => (
                <div key={d.day} className="border border-border">
                  <div className="flex items-baseline gap-3 bg-bg-soft px-5 py-3 border-b border-border">
                    <span className={`${SECTION} text-[15px] font-black`}>{d.day}</span>
                    <span className={`${SECTION} text-[13px] text-text-sub`}>{d.date}</span>
                  </div>
                  <ul>
                    {d.items.map(([time, what]) => (
                      <li
                        key={time + what}
                        className="flex gap-4 px-5 py-3 border-b border-border last:border-b-0"
                      >
                        <span
                          className={`${SECTION} text-[13px] text-text-sub w-[110px] shrink-0 tabular-nums`}
                        >
                          {time}
                        </span>
                        <span className={`${SECTION} text-[14px]`}>{what}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 2. 오시는 길 */}
          <section className="mb-16">
            <h2 className={`${SECTION} ${H2}`}>오시는 길</h2>
            <p className={`${SECTION} ${LEAD}`}>
              <strong className="text-text">9월 3일(목) 오후 1시까지</strong> 아래 터미널이나 역 중 한 곳에
              도착해 주세요. 현남면까지는 <strong className="text-text">운영진이 픽업</strong>
              해 드립니다. 도착 예정 장소와 시간을 미리 알려 주시면 이동이 수월합니다.
            </p>
            <div className="border-2 border-text px-5 py-5 mb-6">
              <p className={`${SECTION} text-[11px] tracking-[2px] font-extrabold uppercase text-text-sub mb-2`}>
                집합 장소
              </p>
              <p className={`${SECTION} text-[18px] font-black mb-1`}>죽도해변 웨이브웍스</p>
              <p className={`${SECTION} text-[14px] text-text-sub mb-3`}>
                강원특별자치도 양양군 현남면 인구중앙길 110
              </p>
              <p className={`${SECTION} text-[13px] leading-relaxed`}>
                죽도해변 바로 앞에 있는 공유 오피스입니다. 1일차 오후 2시 오리엔테이션이 이곳에서
                시작됩니다. 터미널에서 오시는 분은 픽업해 드리니 이곳까지 직접 오실 필요는 없습니다.
              </p>
            </div>

            <p className={`${SECTION} text-[13px] font-bold mb-3`}>도착 가능한 터미널 · 역</p>
            <div className="space-y-3">
              {TERMINALS.map((t) => (
                <div key={t.name} className="border border-border px-5 py-4">
                  <p className={`${SECTION} text-[15px] font-black mb-1`}>{t.name}</p>
                  <p className={`${SECTION} text-[13px] text-text-sub mb-2`}>{t.addr}</p>
                  <p className={`${SECTION} text-[13px] leading-relaxed`}>{t.note}</p>
                </div>
              ))}
            </div>
            <p className={`${SECTION} text-[13px] text-text-sub leading-relaxed mt-4`}>
              버스 시간은 <strong>버스타고</strong>·<strong>고속버스통합예매</strong>에서, KTX는{" "}
              <strong>코레일</strong>에서 확인하실 수 있습니다. 오후 1시 도착이 어려우시면 미리 연락 주세요 — 도착 시간에 맞춰 조율해
              드리겠습니다.
              <br />
              자차로 오시는 분은 집합 장소인 <strong>죽도해변 웨이브웍스</strong>로 바로 오시면 됩니다.
            </p>
          </section>

          {/* 3. 자주 묻는 질문 */}
          <section className="mb-16">
            <h2 className={`${SECTION} ${H2}`}>자주 묻는 질문</h2>
            <p className={`${SECTION} ${LEAD}`}>참가자분들이 많이 물어보시는 내용입니다.</p>
            <div className="space-y-4">
              {FAQ.map((f, i) => (
                <details key={f.q} className="border border-border group" open={i === 0}>
                  <summary
                    className={`${SECTION} text-[15px] font-bold px-5 py-4 cursor-pointer list-none flex justify-between items-center gap-4 hover:bg-bg-soft transition-colors`}
                  >
                    <span>{f.q}</span>
                    <span className="text-text-sub shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div
                    className={`${SECTION} text-[14px] leading-[1.95] text-text-sub px-5 pb-5 pt-1 border-t border-border`}
                  >
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* 웰컴키트 */}
          <section className="mb-16">
            <h2 className={`${SECTION} ${H2}`}>참가자 혜택</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                ["참가비 무료", "숙박·교육·체험 모두 지원합니다. 보증금 5만원도 산출물 제출 시 전액 환급."],
                ["웰컴키트", "산책안내서, 비치타올, 판퍼즐, 스포츠타올을 드립니다."],
                ["심화과정 초청", "별도 선발로 10월 심화과정에 초대합니다."],
              ].map(([t, d]) => (
                <div key={t} className="border border-border px-5 py-5">
                  <p className={`${SECTION} text-[14px] font-black mb-2`}>{t}</p>
                  <p className={`${SECTION} text-[13px] text-text-sub leading-relaxed`}>{d}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 문의 */}
          <section className="border-t border-border pt-8">
            <h2 className={`${SECTION} text-[16px] font-black mb-3`}>문의</h2>
            <p className={`${SECTION} text-[14px] leading-[1.9] text-text-sub`}>
              궁금한 점이나 사정이 생기시면 편하게 연락 주세요.
              <br />
              전화 · 문자 <strong className="text-text">{TEL}</strong>
              <br />
              이메일 lomad.coop@gmail.com
            </p>
          </section>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6">
          <p className={`${SECTION} text-[12px] text-text-sub`}>
            로마드협동조합 · 2026년 양양군 농촌마을 활력프로젝트
          </p>
        </div>
      </footer>
    </main>
  );
}
