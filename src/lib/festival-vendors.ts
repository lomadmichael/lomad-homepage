/**
 * 현남생활 페스티벌 프리마켓 참여 업체 단일 진실 소스.
 *
 * - 최종 신청자 25팀 (2026-06-28 헤르쯔킴 취소 반영). 공개 노출은 24팀
 *   (뷰티 란제리는 상호명 민감 → hidden:true 로 공개 제외).
 * - 개인정보(전화번호)는 절대 포함하지 않는다. 공개 가능한 @핸들/홈페이지만.
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
    items: "핸드메이드 매듭 실버 액세서리",
    handle: "@cord_925",
    handleUrl: "https://instagram.com/Cord_925",
    zone: "무관",
  },
  {
    slug: "hand-m-studio",
    name: "핸드엠 스튜디오",
    category: "handmade",
    items: "",
    handle: "@hand_m_in83",
    handleUrl: "https://instagram.com/hand_m_in83",
    zone: "죽도",
    region: "속초",
  },
  {
    slug: "jipsa-economy",
    name: "집사들의 경제활동",
    category: "handmade",
    items: "",
    handle: "@hoyaho_s2",
    handleUrl: "https://instagram.com/hoyaho_s2",
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
    items: "자작나무 껍질 공예",
    handle: "@bjork.alva_craft",
    handleUrl: "https://instagram.com/bjork.alva_craft",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "laulea",
    name: "라울레아디자인하우스",
    category: "handmade",
    items: "수제 액세서리 · 가방",
    handle: "@laulea_designhouse",
    handleUrl: "https://instagram.com/laulea_designhouse",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "hasta",
    name: "하스타 (Hasta)",
    category: "handmade",
    items: "핸드메이드 실버 주얼리",
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
    items: "핸드메이드 서핑 굿즈 · 액세서리",
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
    items: "의류 · 에코백 · 수영복 · 수영모자",
    handle: "coralcoast.co.kr",
    handleUrl: "https://coralcoast.co.kr",
    zone: "죽도",
    region: "경기",
  },
  {
    slug: "heyday-stay",
    name: "헤이데이스테이",
    category: "fashion",
    items: "수건",
    handle: "@heyday_since2025",
    handleUrl: "https://instagram.com/heyday_since2025",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "laon-sewing",
    name: "라온소잉",
    category: "fashion",
    items: "핸드메이드 패브릭 (손수건·파우치·에코백 등) · 키캡 만들기 체험",
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
    items: "",
    handle: "@yang_nyang.0",
    handleUrl: "https://instagram.com/yang_nyang.0",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "boksil-farm",
    name: "복실농원.팜",
    category: "food",
    items: "패션푸르트 (열대과일)",
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
    items: "농산물",
    zone: "북분리",
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
    items: "커피박 업사이클 체험 · 차량 디퓨저",
    handle: "네이버 블로그",
    handleUrl: "https://m.blog.naver.com/eunyong111/223956437748",
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
