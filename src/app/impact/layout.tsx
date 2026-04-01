import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact",
  description: "로마드의 임팩트. 생활인구와 지역을 연결하며 만들어온 변화와 성과를 소개합니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
