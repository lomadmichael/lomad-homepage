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
    default: "LOMAD Cooperative | 로마드 협동조합",
    template: "%s | LOMAD",
  },
  description: "양양에서 관계를 만들고, 역할을 연결합니다.",
  verification: {
    other: {
      "naver-site-verification": "367a738cad567988254bb843f346af7477c54efb",
    },
  },
  openGraph: {
    title: "LOMAD Cooperative",
    description: "양양에서 관계를 만들고, 역할을 연결합니다.",
    url: "https://lomadcoop.com",
    siteName: "LOMAD Cooperative",
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
