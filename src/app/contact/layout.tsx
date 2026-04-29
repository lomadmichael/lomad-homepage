import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "프로그램 운영, 교육 프로그램, 협업·용역, 홈페이지 제작 문의를 받습니다.",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
