/** 「Ai 내일바꿈」 2기 · 2일차 멘토투어 설정 */

export const TOUR_COHORT = "2기";
export const TOUR_MEET = "9월 11일(금) 오후 12시 30분 · 웨이브웍스";
export const TOUR_MEET_ADDR = "양양군 현남면 인구중앙길 110 (죽도해변 앞)";
export const TOUR_TEL = "010-9542-3775";
/** 코스 사진이 들어 있는 public 하위 폴더 */
export const TOUR_PHOTO_DIR = "/ainb/tour2";

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
    key: "herb",
    title: "허브농부의 양양생활",
    mentor: "김승필",
    belong: "오색허브농원",
    capacity: 4,
    program: ["점심", "티타임", "허브 방향제 스프레이 만들기", "허브티 & 허브 스프릿 시음"],
    fee: 20000,
    feeLabel: "허브 방향제 스프레이 만들기",
    intro: [
      "약 27년간 이어진 가족 농원 ‘오색허브농원’을 기반으로 캠핑장과 체험 프로그램을 운영하고 있습니다. 해외에서 태권도 사범, 요리사, 게스트하우스 운영자로 다양한 경험을 쌓은 뒤 고향 양양으로 돌아와 허브를 활용한 관광 콘텐츠를 만들고 있습니다.",
      "양양에서 각자의 방식으로 살아가는 로컬 사람들의 공간을 함께 둘러보고, 허브와 증류를 직접 경험하며 지역에서 좋아하는 일을 나의 일로 만들어가는 과정에 대해 이야기해봐요.",
    ],
    photos: ["herb_1", "herb_2", "herb_4", "herb_3"],
    accent: "#8A4B9E",
  },
  {
    key: "eunjung",
    title: "양양 시골 하루살이",
    mentor: "김은정",
    belong: "플래버링",
    capacity: 4,
    program: ["점심", "낙산사 투어", "티타임", "함께 걷고, 먹고, 이야기하기"],
    fee: 0,
    intro: [
      "음식을 매개로 사람과 지역, 문화예술을 연결하는 문화예술교육 기획자이자 푸드스타일리스트입니다. 양양에서 플래버링을 운영하며 로컬의 음식과 사람, 일상의 이야기를 새로운 경험과 콘텐츠로 만들어가고 있어요.",
      "서울을 떠나 양양에서 일하고 살아가며 발견한 로컬에서의 삶과 일, 좋아하는 것을 일로 만들어가는 과정을 함께 나누고 싶습니다.",
    ],
    photos: ["eunjung_2", "eunjung_1", "eunjung_3"],
    accent: "#1F6FB2",
  },
];

export function tourByKey(key: string): Tour | undefined {
  return TOURS.find((t) => t.key === key);
}

/**
 * 2기 참가자 명단 — 본인 확인용 (선정 20명 + 동반 박시호 + 초대 Joseph).
 * staff: true 는 신청·응답은 할 수 있지만 집계(참가자 수·미신청자)에서 제외한다.
 */
export const ROSTER: { name: string; phone: string; staff?: boolean }[] = [
  { name: "Joseph", phone: "01048420300", staff: true },
  { name: "이홍래", phone: "01037985676", staff: true },
  { name: "강다율", phone: "01088904054" },
  { name: "김경주", phone: "01034240128" },
  { name: "김대식", phone: "01082391106" },
  { name: "김동준", phone: "01072324655" },
  { name: "김선정", phone: "01038008551" },
  { name: "김연서", phone: "01024580706" },
  { name: "노효진", phone: "01094860551" },
  { name: "문보람", phone: "01041099068" },
  { name: "민인애", phone: "01021910860" },
  { name: "박선옥", phone: "01052259791" },
  { name: "박소현", phone: "01074265114" },
  { name: "박이안", phone: "01051204313" },
  { name: "박지혜", phone: "01043039212" },
  { name: "성세미", phone: "01020084097" },
  { name: "신영훈", phone: "01065583704" },
  { name: "원보영", phone: "01026015044" },
  { name: "유선준", phone: "01096160503" },
  { name: "이서연", phone: "01053853090" },
  { name: "홍선택", phone: "01020173072" },
  { name: "황재윤", phone: "01057521763" },
];

/** 실제 참가자만 (초대 참가·운영진 제외) — 공식 성과 수치의 모집단 */
export const PARTICIPANTS = ROSTER.filter((r) => !r.staff);

/** 집계에서 제외할 이름 */
export const STAFF_NAMES = new Set(ROSTER.filter((r) => r.staff).map((r) => r.name));

/** 명단에 있는 참가자인지 확인하고, 등록된 성명을 돌려준다. */
export function findParticipant(phone: string): { name: string } | null {
  const p = ROSTER.find((r) => r.phone === phone);
  return p ? { name: p.name } : null;
}
