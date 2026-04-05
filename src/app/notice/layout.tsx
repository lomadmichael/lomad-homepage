import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  description: "로마드 협동조합의 공지사항",
};

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
