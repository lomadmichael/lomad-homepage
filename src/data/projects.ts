// 프로젝트 목록 — 카테고리별 필터 + 상세 페이지용
// v3 사업계획서 6-4 참조

import type { ServiceId } from "./services";

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  category: ServiceId;
  target: string; // 누구를 위한 것인가
  operation: string; // 어떻게 운영하는가
  outcome: string; // 무엇이 남는가 / 기대효과 또는 실제 성과
  description: string; // 프로젝트 소개
  why: string; // 왜 시작했는가
  image: string;
  /** SNS 공유용 OG 이미지(1200x630). 없으면 사이트 기본 OG 이미지를 사용한다. */
  ogImage?: string;
  externalLinks?: { label: string; url: string }[];
  /**
   * 지난 회차 등 목록에서 숨기지만 상세 페이지 URL은 살아있는 항목.
   * true → /projects, /what-we-do 목록·카드에서 노출하지 않음.
   * /projects/[slug] 상세 라우트는 그대로 생성됨 (외부 공유 링크 유지).
   */
  archived?: boolean;
};

export const PROJECTS: Project[] = [
  {
    // 시리즈 메인 카드 — 최신 회차(7-8월) 상세로 연결.
    // 회차가 바뀔 때마다: 새 회차 항목을 이 자리에 추가하고, 지난 회차는 archived:true 처리.
    slug: "ecology-wetland-water",
    name: "남대천 생태체험 프로그램",
    oneLiner: "양양 남대천에서 진행되는 생태지도사와 함께하는 가족 생태체험 프로그램",
    category: "stay-tourism",
    target: "어린이와 동반 가족, 양양을 찾는 방문자",
    operation:
      "월별 회차로 운영. 회당 선착순 12명, 생태지도사 인솔 가족 체험 프로그램. 매 회차마다 주제를 바꿔 가며 남대천의 자연을 깊이 만나는 시리즈.",
    outcome:
      "지역 자연을 가족이 함께 경험하며 생태적 감수성을 기르는 체류형 생태관광 콘텐츠.",
    description:
      "양양 남대천에서 진행되는 생태지도사와 함께하는 가족 생태체험 프로그램입니다. 매 월 새로운 주제로 운영되며, 7-8월에는 「남대천 물속 생물 이야기」를 주제로 민물고기와 수서곤충을 족대로 직접 채집·관찰하고 다시 강으로 돌려보냅니다.",
    why: "양양 남대천은 강과 바다, 습지와 사구가 어우러진 살아있는 자연의 보고입니다. 가족이 직접 발 디디며 작은 생명들의 비밀을 풀어가는 장을 만들고자 시작했습니다.",
    image: "/images/ecology-wetland.jpg",
  },
  {
    // 6월 회차 — 시리즈 카드에서는 숨김 처리, 상세 URL은 유지 (외부 공유 링크 살아있음).
    slug: "ecology-wetland-summer",
    name: "남대천 하구 · 바다를 이겨내는 식물들",
    oneLiner: "2026년 6월 회차 · 해안 사구의 염생식물(갯메꽃·해란초·갯완두)을 만나는 가족 생태체험.",
    category: "stay-tourism",
    target: "어린이와 동반 가족, 양양을 찾는 방문자",
    operation:
      "6월 13·20·27일(토) 정규 운영. 회당 선착순 16명, 생태지도사 인솔 가족 체험 프로그램.",
    outcome:
      "지역 자연을 가족이 함께 경험하며 생태적 감수성을 기르는 체류형 생태관광 콘텐츠.",
    description:
      "양양 남대천 하구에서 진행된 생태지도사와 함께하는 가족 생태체험 프로그램입니다. 「바다를 이겨내는 식물들」을 주제로 해안 사구의 염생식물(갯메꽃·해란초·갯완두)을 직접 만나봅니다.",
    why: "양양 남대천 하구는 강과 바다, 습지와 사구가 어우러진 살아있는 자연의 보고입니다. 가족이 직접 발 디디며 작은 생명들의 비밀을 풀어가는 장을 만들고자 시작했습니다.",
    image: "/images/ecology-wetland.jpg",
    archived: true,
  },
  {
    // 5월 회차 — 시리즈 카드에서는 숨김 처리, 상세 URL은 유지 (외부 공유 링크 살아있음).
    slug: "ecology-wetland-spring",
    name: "남대천 하구습지의 봄꽃세상",
    oneLiner: "2026년 5월 회차 · 양양 남대천 하구습지에서 만나는 봄 · 가족 생태체험.",
    category: "stay-tourism",
    target: "어린이와 동반 가족, 양양을 찾는 방문자",
    operation:
      "어린이날 특별 체험 부스(5/5)와 정규 생태체험 프로그램(5/23·5/30·6/6)을 나눠 운영. 회당 선착순 16명, 생태지도사 인솔 가족 체험 프로그램.",
    outcome:
      "습지의 역할을 몸으로 배우고, 가족이 함께 자연과 관계 맺는 경험. 체류형 생태관광 콘텐츠로의 확장 기반.",
    description:
      "양양 남대천 하구는 연어가 돌아오는 강이자 개구리밥과 부들이 자라고 개구리가 깨어나는 살아있는 습지입니다. 생태지도사와 함께 루페(돋보기)로 들여다보고, 뜰채로 건져 올리며, 작은 생명들의 비밀을 배우는 가족 체험 프로그램입니다.",
    why: "습지는 우리 몸의 콩팥 같은 역할을 하는 생태계의 핵심이지만, 일상에서 만나기 어렵습니다. 지역 아이들과 가족이 남대천 하구습지를 직접 경험하며 자연과 관계 맺는 장을 만들고자 시작했습니다.",
    image: "/images/ecology-wetland.jpg",
    archived: true,
  },
  {
    slug: "hyeonnam-festival",
    name: "현남생활 페스티벌",
    oneLiner:
      "서퍼와 마을이 한 상에 — 양양서핑로드 위에서 보내는 1박 2일.",
    category: "stay-tourism",
    target:
      "외지 방문객·서퍼·라이프스타일 관심층, 현남생활 참가자, 현남면 8개 마을 주민",
    operation:
      "2거점(죽도·북분리) 분산형 1박 2일. 「현남 서프 패스」 회유 엔진, 액티비티 체험, 북분리 캠핑장 선셋 비치 테이블, 죽도 불꽃 피날레.",
    outcome:
      "지역경제 활성화 · 생활인구 전환 · 서핑로드 브랜딩 · 8개 마을 협력 기반. 방문객 7,000~8,000명 / 직접소비 1억5천~1억8천만 원 목표.",
    description:
      "2026년 7월 4(토)~5(일), 양양 죽도·북분리해변에서 열리는 1박 2일 분산형 페스티벌입니다. 단일 무대형 축제가 아닌 4거점을 순환하는 구조로, 액티비티 체험(서핑·SUP·랜드서핑·클라이밍)과 헤드라이너 「서퍼's 나이트」, 북분리 캠핑장 시그니처 「선셋 비치 테이블」, 21시 죽도 「불꽃 피날레」까지 — 양양 서프타운의 라이프스타일을 하루에 압축해 경험하는 자리입니다.",
    why: "「바들바들 현남생활」과 「찾아가는 새참모임」으로 쌓아온 마을 주민·관계인구 네트워크를 한자리에 모아, 외지 방문객이 마을과 관계 맺고 다시 돌아오는 구조를 만들기 위해 시작했습니다.",
    image: "/images/festival-hero-bg.png",
  },
  {
    slug: "badlbadl",
    name: "바들바들 현남생활",
    oneLiner: "양양을 잠깐 스쳐가는 곳이 아니라, 다시 찾고 관계를 맺는 곳으로.",
    category: "stay-tourism",
    target:
      "양양을 깊이 경험하고 싶은 방문자, 지역 기반 관계를 만들고 싶은 청년·직장인",
    operation:
      "현남면을 거점으로 한 로컬 체류형 프로그램. 지역 주민과 관계를 맺고 일상을 나누는 커리큘럼을 기수제로 운영.",
    outcome:
      "5기 운영, 100여 명의 참가자, 68%의 생활 의향 — 단순 관광이 아닌 재방문·정착 연결 구조를 확인.",
    description:
      "바들바들은 양양군 현남면에서 운영되는 로컬 체류형 프로그램입니다. 단순한 여행이 아닌, 지역 사람들과 관계를 맺고 일상을 나누며 새로운 가능성을 발견하는 경험을 제공합니다.",
    why: "양양을 찾는 수많은 방문자가 지역과 연결되지 못한 채 떠난다는 문제의식에서 출발했습니다. 체류와 관계가 반복되면 지역에 새로운 에너지가 남는다는 가정을 검증하기 위해 시작했습니다.",
    image: "/images/badlbadl.png",
    externalLinks: [
      { label: "현남생활 홈페이지", url: "https://likehn.kr/" },
      { label: "Instagram", url: "https://www.instagram.com/likehn.kr" },
    ],
  },
  {
    slug: "ai-naeilbakkum",
    name: "Ai 내일바꿈",
    oneLiner:
      "양양 현남면에서 3박 4일, 바다에서 쉬고 실무에 바로 쓰는 Ai를 배우는 체류형 프로그램입니다.",
    category: "education-startup",
    target:
      "만 19세 이상 49세 이하, 타 지역에 거주하는 청년. 기수별 20명(1·2기 총 40명)을 모집하며 개인 또는 팀으로 신청할 수 있습니다.",
    operation:
      "「바들바들 현남생활」의 새로운 시즌으로, 3박 4일간 현남면에 머무르며 진행합니다. Ai를 처음 접하는 참가자를 위한 「Ai 첫걸음」 과정에서 시작해, 보고서·이메일·사업계획 작성과 데이터 정리 등 실제 업무에 곧바로 적용하는 실전 과정으로 이어집니다. 교육 사이사이에는 서핑, 요가·명상, 러닝과 지역 정착민이 안내하는 로컬 멘토투어가 함께 진행됩니다. 1기는 2026년 9월 3일(목)~6일(일), 2기는 9월 10일(목)~13일(일)에 운영합니다.",
    outcome:
      "참가자 각자가 자신의 일상과 업무를 재료로 만든 Ai 산출물을 완성해 발표하고, 돌아가서도 이어갈 활용 루틴을 손에 쥐게 됩니다. 여기서 맺어진 관계는 Ai로 지역 현안을 함께 풀어보는 10월 심화과정으로 이어집니다.",
    description:
      "Ai가 일하는 방식을 빠르게 바꾸고 있지만, 바쁜 일상 속에서 제대로 배울 시간을 내기는 쉽지 않습니다. 「Ai 내일바꿈」은 양양 현남면에 3박 4일 머무르며 실무에 바로 쓸 수 있는 Ai를 배우고, 바다에서 숨을 고르며 지역을 살아보는 체류형 프로그램입니다. 남의 예제가 아닌 참가자 본인의 일과 생활을 실습 재료로 삼아, 마지막 날에는 각자 완성한 결과물을 발표하는 것으로 일정을 마무리합니다. 숙박과 교육, 체험 프로그램, 터미널과 프로그램 장소를 오가는 차량 이동 지원까지 모두 무료로 제공되며, 참가 확정 시 납부하는 보증금 5만원은 Ai 결과물 제출 시 전액 환급됩니다. 접수는 2026년 8월 30일(일) 자정까지이며, 결과는 8월 31일(월) 오후 3시 선정자에 한해 개별 안내합니다.",
    why: "Ai는 배우고 싶지만 시간을 내기 어려운 청년들이 많습니다. 다섯 기수의 「바들바들 현남생활」을 운영하며 쌓은 경험에 실무형 Ai 교육을 더해, 청년들이 자신의 '일'과 '내일'을 함께 준비하는 시간을 만들고자 시작했습니다. 나아가 이 프로그램에서 맺어진 관계를 바탕으로, Ai를 활용해 지역이 안고 있는 문제를 함께 풀어가는 플랫폼으로 확장하려 합니다.",
    image: "/images/ai-naeilbakkum.jpg",
    ogImage: "/images/og-ai-naeilbakkum.jpg",
    externalLinks: [
      {
        label: "1·2기 참가 신청하기",
        url: "https://monthler-form.monthler.kr/form/apply/348528732316635136",
      },
      { label: "Instagram", url: "https://www.instagram.com/likehn.kr" },
    ],
  },
  {
    slug: "custom-house",
    name: "커스텀하우스",
    oneLiner: "양양의 로컬 자원을 담은 굿즈와 브랜드를 기획·제작·유통합니다.",
    category: "local-brand",
    target: "지역 크리에이터, 로컬 브랜드, B2B 납품·팝업 파트너",
    operation:
      "아티스트·서퍼·크리에이터 협업 → 디자인 → 소량 생산 → 스토어·B2B 유통의 일관된 흐름을 로마드가 설계·운영.",
    outcome:
      "지역의 이야기가 담긴 상품 라인업 구축, 팝업·협업·B2B 채널을 통한 지역 브랜드 확산.",
    description:
      "양양의 로컬 자원을 활용한 상품 기획, 제작, 유통을 통해 지역의 이야기를 담은 굿즈와 브랜드를 만들어 양양의 가치를 더 많은 사람에게 전달합니다.",
    why: "지역의 이야기가 상품으로 이어지지 못하면 방문자는 기억만 가지고 떠납니다. 로컬의 감각을 일상에 연결하는 상품 구조를 만들기 위해 시작했습니다.",
    image: "/images/customhouse.jpg",
  },
  {
    slug: "sae-cham-moim",
    name: "찾아가는 새참모임",
    oneLiner: "지역 주민과 함께하는 소규모 모임을 통해 현장의 이야기를 듣습니다.",
    category: "stay-tourism",
    target: "지역 주민, 동네 단위 생활권",
    operation: "주민 공간을 찾아가 새참과 함께 이야기를 나누는 모임형 운영.",
    outcome: "현장의 고민이 수면 위로 올라오고, 다음 프로젝트의 실마리가 수집됨.",
    description:
      "지역 주민과 함께하는 소규모 모임을 통해 현장의 이야기를 듣고 공유합니다.",
    why: "지역 문제를 풀기 전에 현장을 먼저 듣는 것이 필요합니다. 새참이라는 익숙한 장면을 프로그램으로 재해석했습니다.",
    image: "/images/collabo-01.png",
  },
  {
    slug: "hyeonnam-gomin",
    name: "현남 고민 수집소",
    oneLiner: "주민들의 일상 고민을 수집하고 함께 해결 방법을 모색합니다.",
    category: "stay-tourism",
    target: "현남면 주민",
    operation: "상설·순회형 수집소 운영과 온라인 채널 병행.",
    outcome: "주민들의 의견이 축적되어 다음 프로그램·정책에 반영.",
    description:
      "주민들의 일상 고민을 수집하고, 함께 해결 방법을 모색하는 프로젝트입니다.",
    why: "정책이 주민과 닿기 어려운 지점을 수집소라는 형식으로 메우기 위해 시작했습니다.",
    image: "/images/collabo-02.jpg",
  },
  {
    slug: "workation",
    name: "기업 워케이션",
    oneLiner: "기업 팀 단위의 워케이션 프로그램을 기획하고 운영합니다.",
    category: "stay-tourism",
    target: "팀 빌딩·워케이션을 고려하는 기업, 공공기관",
    operation: "체류 공간 + 팀 활동 + 지역 연결 프로그램 패키지 운영.",
    outcome: "팀의 리프레시 + 지역 경제 연결 + 재방문 의향 창출.",
    description: "기업 팀 단위의 워케이션 프로그램을 기획하고 운영합니다.",
    why: "기업 워케이션이 단순 숙박이 아닌 지역과의 관계로 이어질 수 있음을 실증하기 위해 시작했습니다.",
    image: "/images/collabo-03.png",
  },
  {
    slug: "ysa-website",
    name: "양양군서핑협회 홈페이지 구축",
    oneLiner:
      "협회의 일정·공지·교육·강사진을 하나의 창구로 통합한 운영형 홈페이지.",
    category: "partnership",
    target: "양양군서핑협회, 회원·지도자·시험 응시자, 지자체 협력 파트너",
    operation:
      "Next.js + Vercel + Google Calendar API 기반 실시간 일정 연동, 공지·회차 관리, 대회·강습·시험 접수 흐름까지 설계·운영.",
    outcome:
      "분산되어 있던 협회 업무가 하나의 공식 창구로 통합. 회원·응시자·파트너가 한 곳에서 정보를 확인하고 신청할 수 있는 실행 기반 확보.",
    description:
      "양양군서핑협회(YSA)의 운영 업무를 지원하는 공식 홈페이지입니다. 협회 일정, 회차 공지, 지도자·심판 교육, 자격 시험, 대회 접수를 하나의 창구에서 처리할 수 있도록 기획·구축했습니다.",
    why: "협회 운영 정보가 여러 채널에 흩어져 있으면 회원과 외부 파트너 모두 접근이 어렵습니다. 협회가 실제로 기능하는 공식 창구를 만들어, 기관·지도자·응시자가 한 흐름 안에서 연결되도록 했습니다.",
    image: "/images/ysa-hero.jpg",
    externalLinks: [
      { label: "ysakorea.com", url: "https://ysakorea.com" },
      { label: "ysakoreaofficial.com", url: "https://ysakoreaofficial.com" },
    ],
  },
  {
    slug: "events",
    name: "대회·행사 운영",
    oneLiner: "지역 기반의 대회와 행사를 기획부터 운영까지 함께합니다.",
    category: "partnership",
    target: "지자체, 협회, 민간 이벤트 파트너",
    operation: "기획 – 운영 – 현장 진행 – 사후 기록까지 풀 스택 실행.",
    outcome: "지역 기반 행사가 재개최·확장될 수 있는 기반 마련.",
    description: "지역 기반의 대회와 행사를 기획부터 운영까지 함께합니다.",
    why: "단발성 행사가 지역에 남지 않는 문제를 해결하기 위해 운영 구조부터 설계합니다.",
    image: "/images/collabo-04.png",
  },
  {
    slug: "branding-content",
    name: "브랜딩·콘텐츠",
    oneLiner: "지역과 브랜드의 이야기를 콘텐츠로 만들어 전달합니다.",
    category: "local-brand",
    target: "로컬 브랜드, 협회, 지역 공간",
    operation: "스토리 발굴 – 비주얼 – 영상·사진·웹 콘텐츠 제작.",
    outcome: "브랜드가 지역 안에서도 밖에서도 지속 노출되는 자산을 확보.",
    description: "지역과 브랜드의 이야기를 콘텐츠로 만들어 전달합니다.",
    why: "좋은 제품·공간도 이야기가 전달되지 않으면 사라집니다. 콘텐츠는 지역 브랜딩의 핵심 인프라입니다.",
    image: "/images/collabo-05.jpg",
  },
  {
    slug: "community-program",
    name: "주민 교류 프로그램",
    oneLiner: "지역 주민 간 교류를 촉진하는 다양한 프로그램을 운영합니다.",
    category: "stay-tourism",
    target: "지역 주민, 이주민, 생활인구",
    operation: "모임·워크숍·행사 형식의 상시 프로그램.",
    outcome: "주민 네트워크 강화와 신규 협력 프로젝트의 출발점 형성.",
    description: "지역 주민 간 교류를 촉진하는 다양한 프로그램을 운영합니다.",
    why: "공존의 모델이 부재한 지역에서 교류가 만들어질 때 다음 가능성이 열립니다.",
    image: "/images/collabo-06.jpg",
  },
];

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: ServiceId) =>
  PROJECTS.filter((p) => p.category === category);
