/** 「Ai 내일바꿈」 3기 · 2일차 멘토투어 설정 (원본: 3기운영/AI 내일바꿈 3기 멘토투어.pdf, 9/30) */

export const TOUR_COHORT = "3기";
export const TOUR_MEET = "10월 3일(토) 오후 12시 30분 · 어스투라운지";
export const TOUR_MEET_ADDR = "양양군 현남면 인구길 64 1층";
export const TOUR_TEL = "010-9542-3775";
/** 코스 사진이 들어 있는 public 하위 폴더 */
export const TOUR_PHOTO_DIR = "/ainb/tour3";

export interface Tour {
  key: string;
  title: string;
  mentor: string;
  /** 소속·가게. 없으면 빈 문자열 */
  belong: string;
  capacity: number;
  program: string[];
  /** 우천 시 대체 진행 */
  rain?: string;
  /** 개인 부담 체험비 (원). 없으면 0 */
  fee: number;
  feeLabel?: string;
  /** 금액이 정해지지 않은 개인 부담 항목 (예: 입장료 현장 결제). fee가 0일 때 이 문구로 안내 */
  feeText?: string;
  intro: string[];
  photos: string[];
  accent: string;
}

export const TOURS: Tour[] = [
  {
    key: "soyul",
    title: "안녕하신가요? 취향이 어떻게 되세요?",
    mentor: "이소율",
    belong: "행운케키",
    capacity: 4,
    program: ["점심", "바다케이크 만들기 클래스", "티타임"],
    fee: 25000,
    feeLabel: "바다케이크 만들기",
    intro: [
      "산업디자인을 전공했지만 공무원의 길로 들어서 수원시에서 7년, 양양군에서 4년을 근무했고, 퇴직 후 양양에서 유일무이한 맞춤제작 케이크 가게 ‘행운케키’를 운영하고 있습니다.",
      "자기 탐구를 위해 수많은 활동을 하면서도 아직 본인을 찾는 중인 길치라고 스스로를 표현하는 이소율 멘토. 같은 고민을 가진 참가자들과 서로의 경험을 나눠보는 건 어떨까요?",
    ],
    photos: ["soyul_cake", "soyul_1", "soyul_4", "soyul_3", "soyul_2"],
    accent: "#E8611C",
  },
  {
    key: "ddurok",
    title: "뚜록 투어",
    mentor: "황두현 · 홍상록",
    belong: "카와이오또코 · 글라이더스 양양",
    capacity: 8,
    program: ["점심", "티타임", "랜드 스케이트"],
    rain: "비가 오면 양양 장날 구경과 낙산사 또는 오색 케이블카 투어로 대체됩니다.",
    fee: 20000,
    feeLabel: "랜드 스케이트",
    intro: [
      "양양읍의 야키토리 전문 이자카야 ‘카와이오또코’와, 양양에 재미가 필요할 때 출동하는 공연·행사 기획팀 ‘글라이더스 양양’을 운영하는 황두현·홍상록은 지역에서 가장 힙한 청년 사장들입니다.",
      "로컬의 맛과 문화를 담은 공간을 직접 꾸려 여행자와 청년들이 모여드는 아지트를 만들어왔고, 이제 그 경험으로 참가자들에게 진짜 양양을 보여주는 로컬 투어를 진행합니다.",
    ],
    photos: ["ddurok_1", "ddurok_2", "ddurok_4", "ddurok_3"],
    accent: "#0B7A5A",
  },
  {
    key: "fika",
    title: "피카 fika",
    mentor: "김동준",
    belong: "전 스위디시 브런치 카페 Fika",
    capacity: 4,
    program: ["설악산 오색탄산온천 (식사 · 산채 비빔밥)", "티타임", "영화 감상 또는 볼링"],
    fee: 0,
    feeText: "온천 입장료 · 볼링 비용",
    intro: [
      "양양군 현남면에서 스위디시 브런치 카페 ‘Fika’를 운영했던 김동준 멘토는 서핑, 스킨스쿠버, 다이빙, 수영, 러닝까지 두루 즐기는 다재다능한 멘토입니다.",
      "북유럽의 ‘잠시 멈추고 함께하는 시간’이라는 가치를 지역에 녹여내며 현남면만의 따뜻한 문화를 만들어 가고 있습니다. 마을 청년과 여행자 모두가 머물고 싶은 공간, 서로를 이어주고 영감을 나누는 자리를 만들고자 합니다.",
    ],
    photos: ["fika_1", "fika_2", "fika_3", "fika_4"],
    accent: "#8A4B9E",
  },
  {
    key: "photo",
    title: "사진 산책",
    mentor: "황태연",
    belong: "메리포엠",
    capacity: 4,
    program: ["점심", "사진 교육 (이론 2시간)", "사진 산책 (실습 2시간)"],
    fee: 25000,
    feeLabel: "일회용 필름카메라 제공 (사진 인화 포함 · 당일 인화는 불가)",
    intro: [
      "우리가 보고 있는 세상을 빛 하나만 생각하며 걸어본 적이 있나요? “시각적 고정관념을 깨뜨려보자.”",
      "사진이든, 미술이든, 음악이든, 책이든, 심지어 요리나 보고서 한 장에도 서로 공감할 수 있는 어떤 결이 숨어 있다고 생각하시는 분은 지체 말고 신청해 주세요!",
    ],
    photos: ["photo_1", "photo_4", "photo_3", "photo_2"],
    accent: "#1F6FB2",
  },
];

export function tourByKey(key: string): Tour | undefined {
  return TOURS.find((t) => t.key === key);
}

/**
 * 3기 참가자 명단 — 본인 확인용 (10/1 형님 확정표 기준 18명 + 초대 유진화). 이홍래는 운영진 테스트 계정.
 * staff: true 는 신청·응답은 할 수 있지만 집계(참가자 수·미신청자)에서 제외한다.
 * guest: true 는 초대 참가 — 3일차 참석 조사(서핑·요가)만 대상. 멘토투어는 운영진이 직접 등록, 만족도 조사 대상 아님.
 */
export const ROSTER: { name: string; phone: string; staff?: boolean; guest?: boolean }[] = [
  { name: "이홍래", phone: "01037985676", staff: true },
  { name: "강경모", phone: "01027446863" },
  { name: "김명희", phone: "01090416372" },
  { name: "김승민", phone: "01072567173" },
  { name: "김응태", phone: "01034732415" },
  { name: "문수연", phone: "01024114758" },
  { name: "배서희", phone: "01035149856" },
  { name: "배남이", phone: "01067160611" },
  { name: "배종원", phone: "01066620338" },
  { name: "송재원", phone: "01033005124" },
  { name: "송주연", phone: "01056863460" },
  { name: "이수은", phone: "01090407126" },
  { name: "장혜진", phone: "01033763217" },
  { name: "정미경", phone: "01025762182" },
  { name: "유수", phone: "01083003085" },
  { name: "유진", phone: "01099070071" },
  { name: "조연정", phone: "01055119013" },
  { name: "이로미", phone: "01026042665" },
  { name: "박은주", phone: "01026365668" },
  { name: "유진화", phone: "01085935032", guest: true },
];

/** 실제 참가자만 (초대 참가·운영진 제외) — 공식 성과 수치의 모집단 */
export const PARTICIPANTS = ROSTER.filter((r) => !r.staff && !r.guest);

/** 집계에서 제외할 이름 */
export const STAFF_NAMES = new Set(ROSTER.filter((r) => r.staff).map((r) => r.name));
/** 운영진 테스트 계정 — 어떤 집계에도 넣지 않는다 (초대 참가 guest는 참석 인원 집계에는 포함) */
export const TEST_ACCOUNT_NAMES = new Set(["이홍래"]);
/** 참석 인원 집계 모집단 = 참가자 + 초대 참가 guest (테스트 계정 제외) */
export const HEADCOUNT_ROSTER = ROSTER.filter((r) => !TEST_ACCOUNT_NAMES.has(r.name));

/** 명단에 있는 참가자인지 확인하고, 등록된 성명을 돌려준다. 초대 참가(guest)는 allowGuest일 때만 찾는다. */
export function findParticipant(phone: string, opts: { allowGuest?: boolean } = {}): { name: string } | null {
  const p = ROSTER.find((r) => r.phone === phone && (opts.allowGuest || !r.guest));
  return p ? { name: p.name } : null;
}
