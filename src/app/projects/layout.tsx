import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "로마드의 프로젝트. 바들바들 체류 프로그램, 부업스쿨, 지역 협업 프로젝트를 소개합니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
