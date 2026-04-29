import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IMPACT",
  description:
    "로마드 사업영역별 임팩트 — 체류·관광, 교육·창업, 로컬 상품·브랜딩, 기관·협회 실행 파트너십에서 만든 변화.",
  alternates: { canonical: "/impact" },
};

export default function PartnersOutcomesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
