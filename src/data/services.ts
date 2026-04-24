// 로마드 4대 사업영역 — 단일 진실 공급원 (메인/About/WhatWeDo에서 공유)
// v3 사업계획서 6-3 참조

export type ServiceId =
  | "stay-tourism"
  | "education-startup"
  | "local-brand"
  | "partnership";

export type Service = {
  id: ServiceId;
  titleKr: string;
  titleEn: string;
  tagline: string; // 한 줄 정의
  representativeProjects: string[]; // 대표 프로젝트/업무
  target: string; // 주요 대상
  value: string; // 페이지에서 전달해야 할 핵심
  inquiryType: string; // Contact 폼의 inquiryType 값 (?type= 쿼리용)
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
  },
];

export const getServiceById = (id: ServiceId) =>
  SERVICES.find((s) => s.id === id);
