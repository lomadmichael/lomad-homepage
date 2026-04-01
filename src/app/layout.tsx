import type { Metadata } from "next";
import { Karla, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-karla",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOMAD Cooperative | 로마드 협동조합",
  description: "양양에서 관계를 만들고, 역할을 연결합니다. 체류 프로그램, 프로젝트, 상품화를 통해 사람과 지역이 더 오래 연결되는 구조를 만듭니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${karla.variable} ${notoSansKR.variable}`}>
      <body>{children}</body>
    </html>
  );
}
