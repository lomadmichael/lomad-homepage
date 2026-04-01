import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "로마드 협동조합 소개. 양양의 생활인구와 지역을 연결하는 협동조합입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
