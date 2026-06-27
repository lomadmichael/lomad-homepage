/**
 * 현남생활 페스티벌 프리마켓 참여 업체 단일 진실 소스 (확정 22팀).
 *
 * - 개인정보(전화번호)는 절대 포함하지 않는다. 공개 가능한 @핸들/홈페이지만.
 * - F&B 3팀(취소)·최소영(참가불가)은 제외.
 * - 변경 시 이 파일만 고치면 안내 페이지·캐러셀 데이터가 일괄 반영.
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
}

/** 카테고리 표시 정보 (페이지/캐러셀 공통 순서). */
export const VENDOR_CATEGORIES: { key: VendorCategory; label: string; sub: string }[] = [
  { key: "handmade", label: "핸드메이드 · 주얼리 · 소품", sub: "Handmade & Jewelry" },
  { key: "fashion", label: "패션 · 비치 · 반려", sub: "Fashion & Beach" },
  { key: "food", label: "로컬 푸드", sub: "Local Food" },
  { key: "experience", label: "체험 · 아트", sub: "Experience & Art" },
];

export const VENDORS: Vendor[] = [
  // ── 핸드메이드 · 주얼리 · 소품 (10) ──────────────────────────
  {
    slug: "vincollector",
    name: "빈콜렉터",
    category: "handmade",
    items: "",
    handle: "@vincollector.kr",
    handleUrl: "https://instagram.com/vincollector.kr",
    zone: "죽도",
    region: "서울",
  },
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
    slug: "hzkim",
    name: "hzkim 헤르쯔킴",
    category: "handmade",
    items: "은 주얼리",
    handle: "@hzkim_official",
    handleUrl: "https://instagram.com/hzkim_official",
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
    slug: "kitty-wave",
    name: "키티웨이브",
    category: "handmade",
    items: "핸드메이드 서핑 굿즈 · 액세서리",
    handle: "@kitty._.wave",
    handleUrl: "https://instagram.com/kitty._.wave",
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
    slug: "nana-jjuni",
    name: "나나쭈니",
    category: "handmade",
    items: "슈즈 소품 · 키캡 꾸미기",
    zone: "죽도",
  },

  // ── 패션 · 비치 · 반려 (5) ──────────────────────────────────
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
    region: "인천",
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

  // ── 로컬 푸드 (4) ───────────────────────────────────────────
  {
    slug: "boksil-farm",
    name: "복실농원.팜",
    category: "food",
    items: "패션푸르트 (열대과일)",
    zone: "죽도",
    region: "양양",
  },
  {
    slug: "yaksu-nurungji",
    name: "약수누룽지",
    category: "food",
    items: "누룽지",
    handle: "@yaksunurungji",
    handleUrl: "https://instagram.com/yaksunurungji",
    zone: "북분리",
    region: "양양",
  },
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

  // ── 체험 · 아트 (3) ─────────────────────────────────────────
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
];

/** 카테고리별 업체 묶음 (표시 순서 유지). */
export function vendorsByCategory(cat: VendorCategory): Vendor[] {
  return VENDORS.filter((v) => v.category === cat);
}
