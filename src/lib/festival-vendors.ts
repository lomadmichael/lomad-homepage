/**
 * 현남생활 페스티벌 프리마켓 참여 업체 단일 진실 소스.
 *
 * - 신청 27팀 (2026-06-29 레트로종이뽑기·프리티아트하우스 추가). 공개 노출은 26팀
 *   (뷰티 란제리는 상호명 민감 → hidden:true 로 공개 제외).
 * - items = 셀러 본인이 작성한 브랜드 소개글(2026-06-29 갱신분 우선). 개인정보(전화번호) 미포함.
 * - 제외: 빈콜렉터·약수누룽지·오솜사탕·양양술곳간 / F&B 3팀(취소) / 헤르쯔킴(취소).
 */

export type VendorZone = "죽도" | "북분리" | "무관";

export type VendorCategory = "handmade" | "fashion" | "food" | "experience";

export interface Vendor {
  /** 파일/키 (이미지 파일명 등) */
  slug: string;
  name: string;
  category: VendorCategory;
  /** 취급 품목 한 줄 (미확인이면 빈 문자열) */
  items: string;
  /** 표시용 핸들 (예: "@vincollector.kr" 또는 "coralcoast.co.kr"). 없으면 미노출 */
  handle?: string;
  /** 핸들/홈 링크 URL. 없으면 링크 미노출 */
  handleUrl?: string;
  zone: VendorZone;
  region?: string;
  /** 공개 노출 제외 (상호명 민감 등). 내부 명단엔 남기되 페이지/캐러셀엔 안 보임. */
  hidden?: boolean;
}

/** 카테고리 표시 정보 (페이지/캐러셀 공통 순서). */
export const VENDOR_CATEGORIES: { key: VendorCategory; label: string; sub: string }[] = [
  { key: "handmade", label: "핸드메이드 · 주얼리 · 소품", sub: "Handmade & Jewelry" },
  { key: "fashion", label: "패션 · 비치 · 반려", sub: "Fashion & Beach" },
  { key: "food", label: "로컬 푸드", sub: "Local Food" },
  { key: "experience", label: "체험 · 아트", sub: "Experience & Art" },
];

export const VENDORS: Vendor[] = [
  // ── 핸드메이드 · 주얼리 · 소품 ──────────────────────────────
  {
    slug: "cord925",
    name: "Cord_925",
    category: "handmade",
    items: "가장 유연하면서도 단단한 ‘나일론 실’, 시간이 흘러도 변함없는 ‘925 Silver’. 두 소재가 만나 일상에 특별함을 더하는 주얼리가 되었습니다.",
    handle: "@cord_925",
    handleUrl: "https://instagram.com/Cord_925",
    zone: "무관",
  },
  {
    slug: "hand-m-studio",
    name: "핸드엠 스튜디오",
    category: "handmade",
    items: "업사이클 제품과 다양한 재미가 함께합니다.",
    handle: "@hand_m_in83",
    handleUrl: "https://instagram.com/hand_m_in83",
    zone: "죽도",
    region: "속초",
  },
  {
    slug: "jipsa-economy",
    name: "집사들의 경제활동",
    category: "handmade",
    items: "양양에 이사 와 양양 굿즈와 핸드메이드 제품을 만들고 있어요.",
    handle: "@hoyaho_s2",
    handleUrl: "https://instagram.com/hoyaho_s2",
    zone: "죽도",
  },
  {
    slug: "pretty-art-house",
    name: "프리티아트하우스",
    category: "handmade",
    items: "핸드메이드로 만든 헤어 장식용품을 판매합니다.",
    zone: "죽도",
  },
  {
    slug: "hi-yellow",
    name: "안녕옐로우",
    category: "handmade",
    items: "손뜨개 키링 · 소품",
    handle: "@hi_yellow",
    handleUrl: "https://instagram.com/hi_yellow",
    zone: "죽도",
    region: "속초",
  },
  {
    slug: "nana-jjuni",
    name: "나나쭈니",
    category: "handmade",
    items: "슈즈 소품 · 키캡 꾸미기",
    zone: "죽도",
  },
  {
    slug: "bjork-alva",
    name: "비요크엘바",
    category: "handmade",
    items: "자작나무 껍질 공예는 스웨덴을 중심으로 수세기 이어져 온 북유럽 전통 수공예예요. 나무를 베지 않고 껍질만 채취해 나무가 다시 자라도록 하는 친환경 공예입니다. #비벌목",
    handle: "@bjork.alva_craft",
    handleUrl: "https://instagram.com/bjork.alva_craft",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "laulea",
    name: "라울레아디자인하우스",
    category: "handmade",
    items: "바다와 요트에서 영감을 받아 사람 손으로 만든 귀하고 아름다운 것들. 사이잘 가방 · 핸드메이드 액세서리 · 비치타월.",
    handle: "@laulea_designhouse",
    handleUrl: "https://instagram.com/laulea_designhouse",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "hasta",
    name: "하스타 (Hasta)",
    category: "handmade",
    items: "요가의 흐름과 바다의 자유로움을 담은 핸드메이드 실버 주얼리.",
    handle: "@hasta__sea",
    handleUrl: "https://instagram.com/hasta__sea",
    zone: "죽도",
  },
  {
    slug: "re-ocean",
    name: "리:오션",
    category: "handmade",
    items: "바다유리 업사이클링 방향제",
    handle: "@reocean_yy",
    handleUrl: "https://instagram.com/reocean_yy",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "kitty-wave",
    name: "키티웨이브",
    category: "handmade",
    items: "바다와 자연에서 영감을 얻어, 고양이와 서핑을 모티브로 시원하고 자유로운 분위기의 액세서리를 만듭니다.",
    handle: "@kitty._.wave",
    handleUrl: "https://instagram.com/kitty._.wave",
    zone: "죽도",
    region: "속초",
  },
  {
    // 상호명 민감 → 공개 제외. 헤어/액세서리만 판매(란제리 제품 제외).
    slug: "beauty-acc",
    name: "뷰티 란제리",
    category: "handmade",
    items: "헤어 · 액세서리",
    zone: "무관",
    hidden: true,
  },

  // ── 패션 · 비치 · 반려 ──────────────────────────────────────
  {
    slug: "deniz",
    name: "데니즈",
    category: "fashion",
    items: "비치타월 · 비치웨어 · 비치백",
    handle: "@denizz.co.kr",
    handleUrl: "https://instagram.com/denizz.co.kr",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "dangdang-zip",
    name: "댕댕의상실",
    category: "fashion",
    items: "반려동물 의류 · 용품",
    handle: "@dangdang_zip",
    handleUrl: "https://instagram.com/dangdang_zip",
    zone: "죽도",
  },
  {
    slug: "coral-coast",
    name: "코랄코스트",
    category: "fashion",
    items: "남태평양 피지의 여유와 자연의 색감을 담은 브랜드. 햇살·바다·코코넛, 여행의 설렘을 모티브로 일상 속 작은 휴가 같은 제품을 선보입니다.",
    handle: "coralcoast.co.kr",
    handleUrl: "https://coralcoast.co.kr",
    zone: "죽도",
    region: "경기",
  },
  {
    slug: "heyday-stay",
    name: "헤이데이스테이",
    category: "fashion",
    items: "HEYDAY는 ‘전성기’, 가장 빛나는 순간을 뜻해요. 양양에서 시작된 펜션 헤이데이스테이가 그 순간을 오래 기억하도록 공간과 라이프스타일 제품을 만듭니다.",
    handle: "@heyday_since2025",
    handleUrl: "https://instagram.com/heyday_since2025",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "laon-sewing",
    name: "라온소잉",
    category: "fashion",
    items: "즐거움이란 순우리말 ‘라온’! 오늘 하루 즐거움을 선물해 드려요. 핸드메이드 패브릭 소품 · 키캡 만들기 체험.",
    handle: "@laon.sewing",
    handleUrl: "https://instagram.com/laon.sewing",
    zone: "죽도",
    region: "고성",
  },

  // ── 로컬 푸드 ───────────────────────────────────────────────
  {
    slug: "yangnyang-jeombbang",
    name: "양냥점빵",
    category: "food",
    items: "양양 사는 냥이집사의 뜨개 점빵.",
    handle: "@yang_nyang.0",
    handleUrl: "https://instagram.com/yang_nyang.0",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "boksil-farm",
    name: "복실농원.팜",
    category: "food",
    items: "청정 양양 북단 마을에서 열대과일 패션프루트(백향과)를 직접 재배합니다.",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "siso",
    name: "시소",
    category: "food",
    items: "해양심층수 소금 · 생수",
    handle: "@ryujimin8651",
    handleUrl: "https://instagram.com/ryujimin8651",
    zone: "죽도",
    region: "고성",
  },
  {
    slug: "yangyang-samnamae",
    name: "양양세남매농장",
    category: "food",
    items: "양양세남매농장, 작은 농부의 정직한 농산물.",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "happyfarm",
    name: "해피팜",
    category: "food",
    items: "땅콩버터 · 구운땅콩",
    handle: "@happyfarmpeanut",
    handleUrl: "https://instagram.com/happyfarmpeanut",
    zone: "죽도",
  },

  // ── 체험 · 아트 ─────────────────────────────────────────────
  {
    slug: "terra-and-pick",
    name: "테라앤픽",
    category: "experience",
    items: "자연의 순수한 치유력을 담은 천연 향기 브랜드. 커피박 업사이클 공예 체험도 함께해요.",
    handle: "네이버 블로그",
    handleUrl: "https://m.blog.naver.com/eunyong111/223956437748",
    zone: "죽도",
  },
  {
    slug: "retro-lottery",
    name: "레트로 종이뽑기",
    category: "experience",
    items: "해변에서 만나는 레트로 종이뽑기! 추억을 뽑아요!",
    zone: "죽도",
  },
  {
    slug: "rainbow-art",
    name: "레인보우아트",
    category: "experience",
    items: "페이스페인팅 · 헤나타투 · 특수분장",
    handle: "@rainbowart_pearl",
    handleUrl: "https://instagram.com/rainbowart_pearl",
    zone: "죽도",
  },
  {
    slug: "drawing-busking",
    name: "드로잉버스킹",
    category: "experience",
    items: "펜드로잉 캐리커쳐",
    handle: "@stoneage_kim",
    handleUrl: "https://instagram.com/stoneage_kim",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "sadam-yoga",
    name: "사담요가",
    category: "experience",
    items: "명상 · 심리상담 · 요가",
    zone: "죽도",
  },
];

/** 공개 노출 대상 업체 (hidden 제외). 페이지/캐러셀/카운트는 이걸 사용. */
export const PUBLIC_VENDORS: Vendor[] = VENDORS.filter((v) => !v.hidden);

/** 카테고리별 공개 업체 묶음 (hidden 제외, 표시 순서 유지). */
export function vendorsByCategory(cat: VendorCategory): Vendor[] {
  return PUBLIC_VENDORS.filter((v) => v.category === cat);
}
