import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  description: "로마드 협동조합의 공지사항·모집·프로젝트 소식·협업 소식·보도자료.",
  alternates: { canonical: "/notice" },
};

export default function NoticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
