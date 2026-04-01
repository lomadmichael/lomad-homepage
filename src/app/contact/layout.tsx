import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "로마드에 문의하세요. 협업, 프로그램 참여, 제작 관련 문의를 받고 있습니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
