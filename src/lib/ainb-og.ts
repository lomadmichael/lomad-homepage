import type { Metadata } from "next";

/** Ai 내일바꿈 하위 페이지 공용 OG 이미지 (홈페이지 프로젝트 썸네일과 동일) */
export const AINB_OG_IMAGE = "/images/og-ai-naeilbakkum.jpg";

/**
 * 카카오톡·문자로 링크를 공유했을 때 로고 대신 「Ai 내일바꿈」 썸네일이 뜨도록
 * openGraph / twitter 메타데이터를 만들어 준다.
 */
export function ainbOg(params: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [
    { url: AINB_OG_IMAGE, width: 1200, height: 630, alt: "바들바들 현남생활 Ai 내일바꿈" },
  ];
  return {
    openGraph: {
      title: params.title,
      description: params.description,
      url: `https://lomadcoop.com${params.path}`,
      siteName: "로마드 협동조합",
      locale: "ko_KR",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: params.title,
      description: params.description,
      images: [AINB_OG_IMAGE],
    },
  };
}
