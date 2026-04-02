import type { Metadata } from "next";
import { Karla, Noto_Sans_KR } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  title: {
    default: "로마드 협동조합 | 양양 생활인구 연결 플랫폼",
    template: "%s | 로마드 협동조합",
  },
  description: "로마드 협동조합은 양양에서 관계를 만들고 역할을 연결합니다. 체류 프로그램, 프로젝트, 상품화를 통해 사람과 지역이 더 오래 연결되는 구조를 만듭니다.",
  keywords: ["로마드", "로마드협동조합", "양양", "생활인구", "체류프로그램", "바들바들", "현남생활", "부업스쿨", "커스텀하우스", "양양협동조합"],
  verification: {
    other: {
      "naver-site-verification": "367a738cad567988254bb843f346af7477c54efb",
    },
  },
  openGraph: {
    title: "로마드 협동조합 | 양양에서 관계를 만들고, 역할을 연결합니다",
    description: "체류 프로그램, 프로젝트, 상품화를 통해 사람과 지역이 더 오래 연결되는 구조를 만듭니다.",
    url: "https://lomadcoop.com",
    siteName: "로마드 협동조합",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${karla.variable} ${notoSansKR.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
