// 파트너 목록 — Partners & Outcomes 페이지에서 사용

export type Partner = {
  name: string;
  image: string;
  type: string; // 협업 유형
  description?: string; // 짧은 설명 (선택)
};

export const PARTNERS: Partner[] = [
  { name: "파트너 01", image: "/images/partners/partner-01.png", type: "지자체" },
  { name: "파트너 02", image: "/images/partners/partner-02.png", type: "공공기관" },
  { name: "파트너 03", image: "/images/partners/partner-03.png", type: "협회" },
  { name: "파트너 04", image: "/images/partners/partner-04.png", type: "교육기관" },
  { name: "파트너 05", image: "/images/partners/partner-05.png", type: "민간 파트너" },
  { name: "파트너 08", image: "/images/partners/partner-08.jpg", type: "지자체" },
  { name: "파트너 09", image: "/images/partners/partner-09.png", type: "민간 파트너" },
  { name: "파트너 10", image: "/images/partners/partner-10.png", type: "협회" },
  { name: "파트너 11", image: "/images/partners/partner-11.png", type: "공공기관" },
];
