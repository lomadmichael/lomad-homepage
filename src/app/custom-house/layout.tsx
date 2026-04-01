import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom House",
  description: "커스텀하우스. 양양의 로컬 자원을 활용한 상품 기획, 제작, 유통을 담당합니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
