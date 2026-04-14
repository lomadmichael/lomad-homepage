import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Outcomes",
  description:
    "로마드가 함께한 기관과 파트너, 숫자로 보는 성과, 대표 사례, 현장 기록.",
};

export default function PartnersOutcomesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
