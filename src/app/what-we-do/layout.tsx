import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "로마드의 4개 사업영역 — 체류·관광 프로그램, 교육·창업 프로그램, 로컬 상품·브랜딩, 기관·협회 실행 파트너십.",
};

export default function WhatWeDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
