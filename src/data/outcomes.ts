// 성과 숫자 — Partners & Outcomes 페이지에서 사용
// v3 사업계획서 6-5 참조

export type Outcome = {
  end: number;
  suffix?: string;
  label: string;
};

export const OUTCOMES: Outcome[] = [
  { end: 17, label: "운영 프로젝트 수" },
  { end: 45, label: "협업 기관 수" },
  { end: 513, label: "프로그램 참여자 수" },
  { end: 60, label: "개발 콘텐츠 수", suffix: "+" },
  { end: 12, label: "후속 협업 건수" },
];

// 대표 Outcome Stories (문제–방식–결과)
export type OutcomeStory = {
  title: string;
  problem: string;
  approach: string;
  result: string;
};

export const OUTCOME_STORIES: OutcomeStory[] = [
  {
    title: "바들바들 현남생활 5기 운영",
    problem: "양양을 찾는 방문자가 지역과 연결되지 못한 채 떠나는 구조.",
    approach:
      "현남면을 거점으로 체류·관계·일상을 연결하는 프로그램을 기수제로 운영.",
    result: "참가자 100여 명, 생활 의향 68% — 재방문·정착 가능성을 검증.",
  },
  {
    title: "Ai 내일바꿈 워크숍",
    problem:
      "지역에서 AI 도구를 일상·업무에 연결하지 못해 실행 격차가 커지는 상황.",
    approach:
      "강의형이 아닌 실험형 워크숍을 통해 각자의 맥락에 맞는 AI 활용 시나리오를 탐색.",
    result: "참가자가 스스로 다음 단계를 구상하고 업무에 적용하는 결과물 창출.",
  },
  {
    title: "커스텀하우스 로컬 브랜드 라인업",
    problem: "지역 이야기가 상품으로 이어지지 못하고 단발적 소비에 머무름.",
    approach:
      "아티스트·서퍼 협업 기반의 디자인–제작–유통 흐름을 단일 구조로 설계·운영.",
    result:
      "팝업·B2B·스토어 유통을 통해 지역 브랜드가 지속적으로 노출되는 구조 확보.",
  },
];
