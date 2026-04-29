import type { Metadata } from "next";
import { Karla, Noto_Sans_KR, Gowun_Dodum, Gaegu } from "next/font/google";
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

const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gowun",
  display: "swap",
});

const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "로마드 협동조합 | 머무름이 관계가 되는 곳",
    template: "%s | 로마드 협동조합",
  },
  description:
    "체류 프로그램, 교육, 관광, 상품, 협업 구조를 통해 사람과 지역이 더 오래 연결되는 방식을 만듭니다.",
  keywords: [
    "로마드",
    "로마드협동조합",
    "양양",
    "해안생활권",
    "지역기획",
    "체류프로그램",
    "생태관광",
    "해양생태관광",
    "해양레저창업",
    "바들바들",
    "바들바들 현남생활",
    "Ai 내일바꿈",
    "커스텀하우스",
    "협회 홈페이지 제작",
    "비영리 사업화",
    "양양협동조합",
  ],
  verification: {
    other: {
      // 두 토큰 모두 유지: 기존(http) + 신규(https). Naver는 동일 name의 다중 meta 태그를 허용.
      "naver-site-verification": [
        "367a738cad567988254bb843f346af7477c54efb", // http://lomadcoop.com (기존)
        "367a738cad5679882548b843f346af7477c54efb", // https://lomadcoop.com (신규)
      ],
    },
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "로마드 협동조합 — 소식" },
      ],
    },
  },
  openGraph: {
    title: "로마드 협동조합 | 머무름이 관계가 되는 곳",
    description:
      "체류 프로그램, 교육, 관광, 상품, 협업 구조를 통해 사람과 지역이 더 오래 연결되는 방식을 만듭니다.",
    url: "https://lomadcoop.com",
    siteName: "로마드 협동조합",
    locale: "ko_KR",
    type: "website",
    // OG 이미지는 src/app/opengraph-image.tsx에서 자동 생성 (로고 단독, 흰 배경)
  },
  twitter: {
    card: "summary_large_image",
    title: "로마드 협동조합 | 머무름이 관계가 되는 곳",
    description:
      "체류 프로그램, 교육, 관광, 상품, 협업 구조를 통해 사람과 지역이 더 오래 연결되는 방식을 만듭니다.",
    // Twitter 카드도 opengraph-image.tsx 자동 사용
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${karla.variable} ${notoSansKR.variable} ${gowunDodum.variable} ${gaegu.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
