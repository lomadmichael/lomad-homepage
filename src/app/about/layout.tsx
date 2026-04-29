import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "로마드 협동조합 소개. 양양과 해안생활권의 자원을 프로그램·교육·관광·상품·협업 구조로 전환하는 실행형 지역기획 조직.",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
