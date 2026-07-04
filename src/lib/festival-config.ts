/**
 * 현남생활 페스티벌 접수 오픈 플래그.
 * true 로 바꾸면: 메인 페이지 CTA 3곳 + 접수 페이지 폼 + 서버 액션이 모두 열린다.
 * (2026-07-04 10:00 온라인 접수 마감 — false 상태의 문구는 전부 "현장 접수 안내"로 전환됨)
 */
export const SUBMISSIONS_OPEN = false;

/**
 * 프리마켓 안내 페이지(/market) 공개 여부.
 * false: 메인 페이지에 링크 없음 + 검색 noindex (직접 URL로만 미리보기).
 * true 로 바꾸면: 메인 페이지에 링크 노출 + 검색 색인 허용.
 */
export const FLEA_MARKET_PUBLISHED = true;
