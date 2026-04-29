// RSS 2.0 피드 — /notice의 Notion 콘텐츠를 노출
// 네이버 서치어드바이저 RSS 제출용. 1시간 단위 ISR로 캐시.
import { getNotices } from "@/lib/notion";

const SITE = "https://lomadcoop.com";
const TITLE = "로마드 협동조합 — 소식";
const DESCRIPTION =
  "로마드 협동조합의 공지·모집·프로젝트 소식·협업 소식·보도자료.";
const LANGUAGE = "ko-KR";

// 1시간마다 재생성 (notice page와 동일 단위)
export const revalidate = 3600;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let notices: Awaited<ReturnType<typeof getNotices>> = [];
  try {
    notices = await getNotices();
  } catch (err) {
    // Notion 호출 실패 시 빈 피드라도 정상 응답
    console.error("[feed.xml] getNotices failed:", err);
  }

  const buildDate = new Date().toUTCString();

  const items = notices
    .map((n) => {
      const link = `${SITE}/notice/${n.slug}`;
      const pubDate = n.publishedAt
        ? new Date(n.publishedAt).toUTCString()
        : buildDate;
      const description = n.summary ?? "";
      const category = n.category ? `<category>${escapeXml(n.category)}</category>` : "";

      return `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      ${category}
      <description>${escapeXml(description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE}/notice</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>${LANGUAGE}</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
