/** 「Ai 내일바꿈」 1기 · 2일차 멘토투어 설정 */

export const TOUR_COHORT = "1기";
export const TOUR_MEET = "9월 4일(금) 오후 1시 · 웨이브웍스";
export const TOUR_MEET_ADDR = "양양군 현남면 인구중앙길 110 (죽도해변 앞)";
export const TOUR_TEL = "010-9542-3775";

export interface Tour {
  key: string;
  title: string;
  mentor: string;
  belong: string;
  capacity: number;
  program: string[];
  /** 우천 시 대체 진행 */
  rain?: string;
  /** 개인 부담 체험비 (원). 없으면 0 */
  fee: number;
  feeLabel?: string;
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
    program: ["양양 오일장 구경", "점심", "바다케이크 만들기 클래스", "커피타임 (엔드엔트 양양 or 에센시아)"],
    fee: 25000,
    feeLabel: "바다케이크 만들기",
    intro: [
      "산업디자인을 전공했지만 공무원의 길로 들어서 수원시에서 7년, 양양군에서 4년을 근무했고, 퇴직 후 양양에서 유일무이한 맞춤제작 케이크 가게 ‘행운케키’를 운영하고 있습니다.",
      "자기 탐구를 위해 수많은 활동을 하면서도 아직 본인을 찾는 중인 길치라고 스스로를 표현하는 이소율 멘토. 같은 고민을 가진 참가자들과 서로의 경험을 나눠보는 건 어떨까요?",
    ],
    photos: ["soyul_1", "soyul_4", "soyul_2", "soyul_3", "soyul_6"],
    accent: "#E8611C",
  },
  {
    key: "yujin",
    title: "Yujin’s Tour",
    mentor: "이유진",
    belong: "요가지도자 · 프리다이버",
    capacity: 4,
    program: ["양양 오일장 구경", "점심 (지역맛집)", "명상 & 아로마테라피", "커피타임"],
    rain: "비가 오면 낙산사·장날 투어로 대체됩니다.",
    fee: 25000,
    feeLabel: "명상 & 아로마테라피",
    intro: [
      "호주에서 Interior Design을 졸업하고 호주 이민 중, 2025년을 여행년으로 삼아 이곳저곳을 다니다 5월부터 양양에 머물고 있습니다.",
      "요가지도자 자격증을 가지고 있고 서핑·프리다이빙·랜드서핑까지 다양한 취미를 즐기는 그녀와 함께 양양을 즐겨보세요.",
    ],
    photos: ["yujin_1", "yujin_2", "yujin_3"],
    accent: "#1F6FB2",
  },
  {
    key: "ddurok",
    title: "뚜록 투어",
    mentor: "황두현 · 홍상록",
    belong: "카와이오또코",
    capacity: 9,
    program: ["점심", "랜드 스케이트", "티타임"],
    rain: "비가 오면 양양 장날 구경과 낙산사 또는 오색 케이블카 투어로 대체됩니다.",
    fee: 15000,
    feeLabel: "랜드 스케이트",
    intro: [
      "양양읍에 위치한 야키토리 전문 이자카야 ‘카와이오또코’를 운영하는 황두현·홍상록은 지역에서 가장 힙한 청년 사장들입니다.",
      "로컬의 맛과 문화를 담은 공간을 직접 꾸려 여행자와 청년들이 모여드는 아지트를 만들어왔고, 이제 그 경험으로 참가자들에게 진짜 양양을 보여주는 로컬 투어를 진행합니다.",
    ],
    photos: ["ddurok_1", "ddurok_4", "ddurok_2", "ddurok_3"],
    accent: "#0B7A5A",
  },
  {
    key: "eunjung",
    title: "양양 시골 하루살이",
    mentor: "김은정",
    belong: "속초 플래버링 대표",
    capacity: 4,
    program: [
      "양양 오일장 구경",
      "점심 (꼬꼬와 메밀막국수 or 생선구이)",
      "숲속의 빈터 카페타임",
      "함께 걷고, 먹고, 이야기하기",
    ],
    fee: 0,
    intro: [
      "음식을 매개로 사람과 지역, 문화예술을 연결하는 문화예술교육 기획자이자 푸드스타일리스트입니다. 양양에서 플래버링을 운영하며 로컬의 음식과 사람, 일상의 이야기를 새로운 경험과 콘텐츠로 만들어가고 있어요.",
      "서울을 떠나 양양에서 일하고 살아가며 발견한 로컬에서의 삶과 일, 좋아하는 것을 일로 만들어가는 과정을 함께 나누고 싶습니다.",
    ],
    photos: ["eunjung_2", "eunjung_1", "eunjung_3"],
    accent: "#8A4B9E",
  },
];

export function tourByKey(key: string): Tour | undefined {
  return TOURS.find((t) => t.key === key);
}

/**
 * 1기 참가자 명단 — 본인 확인용 (선정 20명 + 초대 참가 이호진).
 * staff: true 는 운영진 테스트용이라 미신청자 집계에서 제외한다.
 */
export const ROSTER: { name: string; phone: string; staff?: boolean }[] = [
  { name: "이호진", phone: "01027375201" },
  { name: "이홍래", phone: "01037985676", staff: true },
  { name: "강지현", phone: "01036033773" },
  { name: "권동현", phone: "01085688774" },
  { name: "김림", phone: "01090525477" },
  { name: "김잔디", phone: "01091319853" },
  { name: "김준호", phone: "01084941662" },
  { name: "김채영", phone: "01098874379" },
  { name: "김현정", phone: "01091057494" },
  { name: "남효나", phone: "01038757584" },
  { name: "박영주", phone: "01092821772" },
  { name: "박종경", phone: "01072823534" },
  { name: "손세향", phone: "01030509676" },
  { name: "손정현", phone: "01062320207" },
  { name: "윤상혁", phone: "01029082956" },
  { name: "이유주", phone: "01073082637" },
  { name: "장유리", phone: "01020704396" },
  { name: "전미리", phone: "01031261360" },
  { name: "지민성", phone: "01031159282" },
  { name: "최지원", phone: "01051178456" },
  { name: "최효빈", phone: "01087955232" },
  { name: "황경묵", phone: "01028491349" },
];

/** 실제 참가자만 (운영진 테스트 계정 제외) */
export const PARTICIPANTS = ROSTER.filter((r) => !r.staff);

/** 명단에 있는 참가자인지 확인하고, 등록된 성명을 돌려준다. */
export function findParticipant(phone: string): { name: string } | null {
  const p = ROSTER.find((r) => r.phone === phone);
  return p ? { name: p.name } : null;
}
