// 로마드 4대 사업영역 — 단일 진실 공급원 (메인/About/WhatWeDo/Partners에서 공유)
// v3 사업계획서 6-3 참조

export type ServiceId =
  | "stay-tourism"
  | "education-startup"
  | "local-brand"
  | "partnership";

export type ServiceImpact = {
  problem: string; // 해결하려는 지역 문제
  approach: string; // 로마드의 접근 방식
  numbers: { end: number; label: string; suffix?: string }[];
  story: { title: string; summary: string };
};

export type Service = {
  id: ServiceId;
  titleKr: string;
  titleEn: string;
  tagline: string; // 한 줄 정의
  representativeProjects: string[]; // 대표 프로젝트/업무
  target: string; // 주요 대상
  value: string; // 페이지에서 전달해야 할 핵심
  inquiryType: string; // Contact 폼의 inquiryType 값 (?type= 쿼리용)
  impact: ServiceImpact; // 사업영역별 임팩트 (Partners & Outcomes 페이지용)
};

export const SERVICES: Service[] = [
  {
    id: "stay-tourism",
    titleKr: "체류·관광 프로그램",
    titleEn: "Stay & Tourism",
    tagline: "사람이 지역에 머무르고 경험이 관계로 이어지게 만듭니다.",
    representativeProjects: [
      "바들바들 현남생활",
      "생태관광 프로그램",
      "해양생태관광 프로그램",
    ],
    target: "지자체, 관광공사, 지역 DMO, 체류형 관광을 설계하려는 파트너",
    value:
      "체류 프로그램 기획·운영 경험을 바탕으로 방문자와 지역이 반복적으로 연결되는 구조를 만듭니다.",
    inquiryType: "프로그램 운영 문의",
    impact: {
      problem:
        "양양에는 매년 수만 명이 찾아오지만, 대부분 지역과 연결되지 못한 채 떠납니다. 체류는 관계로 이어지지 않고 지역에 자산으로 남지 않습니다.",
      approach:
        "체류 프로그램을 기수제로 운영하고, 지역 주민과 관계를 맺는 커리큘럼을 통해 방문이 관계로, 관계가 체류로 이어지게 설계합니다.",
      numbers: [
        { end: 5, label: "운영 기수" },
        { end: 100, label: "누적 참가자", suffix: "+" },
        { end: 68, label: "생활 의향", suffix: "%" },
      ],
      story: {
        title: "바들바들 현남생활",
        summary:
          "현남면을 거점으로 한 로컬 체류형 프로그램. 단순 관광이 아닌 재방문·정착 연결 구조를 검증했습니다.",
      },
    },
  },
  {
    id: "education-startup",
    titleKr: "교육·창업 프로그램",
    titleEn: "Education & Startup",
    tagline: "지역에 필요한 역량과 실행 인력을 기릅니다.",
    representativeProjects: [
      "Ai 내일바꿈",
      "해양레저창업 교육 프로그램",
      "비영리단체 사업화 설계 교육 프로그램",
    ],
    target: "지자체, 교육기관, 비영리단체, 창업 지원기관",
    value:
      "지역 맥락에 맞춘 실습 중심 교육 커리큘럼을 설계하고 운영하여 지속 가능한 실행 역량을 남깁니다.",
    inquiryType: "교육 프로그램 문의",
    impact: {
      problem:
        "지역에서 AI·창업 같은 전환 도구는 멀게 느껴지고, 실행 역량은 도시로 몰려 있습니다. 정보 격차가 지역의 실행 격차로 이어집니다.",
      approach:
        "강의형이 아닌 실험형 워크숍과 지역 맥락 기반 창업 교육으로, 참가자가 스스로 다음 단계를 구상하고 실제로 적용하는 역량을 기릅니다.",
      numbers: [
        { end: 3, label: "교육 프로그램" },
        { end: 80, label: "수료 참가자", suffix: "+" },
        { end: 12, label: "후속 실행 사례" },
      ],
      story: {
        title: "Ai 내일바꿈",
        summary:
          "참가자가 각자의 일과 삶에 AI를 연결할 시나리오를 직접 설계하고 업무에 적용하는 결과물로 이어지는 워크숍.",
      },
    },
  },
  {
    id: "local-brand",
    titleKr: "로컬 상품·브랜딩",
    titleEn: "Local Goods & Branding",
    tagline: "지역의 이야기를 상품과 브랜드로 전환합니다.",
    representativeProjects: ["커스텀하우스"],
    target: "지역 생산자, 협동조합, 로컬 브랜드, 팝업·B2B 파트너",
    value:
      "디자인–제작–유통을 하나의 흐름으로 연결해 지역 자원을 지속 가능한 상품 구조로 만듭니다.",
    inquiryType: "협업·용역 문의",
    impact: {
      problem:
        "지역의 이야기가 상품으로 이어지지 못하면 방문자는 기억만 가지고 떠납니다. 로컬 감각은 단발성 소비에 머뭅니다.",
      approach:
        "아티스트·서퍼·크리에이터 협업을 기반으로 디자인–소량생산–스토어·B2B 유통까지 단일 흐름을 설계·운영합니다.",
      numbers: [
        { end: 4, label: "상품 카테고리" },
        { end: 10, label: "B2B·팝업 채널", suffix: "+" },
        { end: 6, label: "아티스트 협업" },
      ],
      story: {
        title: "커스텀하우스",
        summary:
          "양양의 감각을 담은 굿즈 라인업 구축. 팝업·협업·B2B 채널을 통해 지역 브랜드가 지속 노출되는 구조 확보.",
      },
    },
  },
  {
    id: "partnership",
    titleKr: "기관·협회 실행 파트너십",
    titleEn: "Partnership & Execution",
    tagline: "기관이 필요로 하는 기획·운영·전달 기반을 함께 만듭니다.",
    representativeProjects: [
      "양양군서핑협회 홈페이지 구축",
      "협회·단체 홈페이지 제작",
      "공공 연계 프로젝트",
    ],
    target: "협회·단체, 공공기관, 지자체, 민간 파트너",
    value:
      "기획–운영–디지털 전달 채널까지 함께 설계해 기관의 실행력을 높이는 파트너가 됩니다.",
    inquiryType: "홈페이지 제작 문의",
    impact: {
      problem:
        "기관 운영 정보가 여러 채널에 흩어지면 회원·파트너 모두 접근이 어렵고, 행사와 교육은 일회성으로 남습니다.",
      approach:
        "기관의 기획–운영–디지털 전달 채널까지 하나의 흐름으로 설계해, 분산된 업무를 공식 창구로 통합하고 실행 기반을 남깁니다.",
      numbers: [
        { end: 3, label: "구축 홈페이지" },
        { end: 17, label: "공동 운영 행사" },
        { end: 8, label: "파트너 기관" },
      ],
      story: {
        title: "양양군서핑협회 홈페이지",
        summary:
          "분산되어 있던 협회 업무를 하나의 공식 창구로 통합. 회원·응시자·파트너가 한 곳에서 정보를 확인하고 신청할 수 있는 실행 기반 확보.",
      },
    },
  },
];

export const getServiceById = (id: ServiceId) =>
  SERVICES.find((s) => s.id === id);
