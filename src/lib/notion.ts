/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DB_ID = process.env.NOTION_NOTICE_DB_ID!;

// Cache data source id across requests
let cachedDataSourceId: string | null = null;

async function getDataSourceId(): Promise<string> {
  if (cachedDataSourceId) return cachedDataSourceId;
  const db = (await notion.databases.retrieve({ database_id: DB_ID })) as any;
  const dataSources = db.data_sources;
  if (!dataSources || dataSources.length === 0) {
    throw new Error("No data sources found in database");
  }
  cachedDataSourceId = dataSources[0].id as string;
  return cachedDataSourceId;
}

export interface Notice {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category?: string;
  summary?: string;
}

function getPlainText(rt: any[] | undefined): string {
  if (!rt || rt.length === 0) return "";
  return rt.map((t: any) => t.plain_text).join("");
}

function mapPageToNotice(page: any): Notice {
  const props = page.properties;
  return {
    id: page.id,
    title: getPlainText(props["제목"]?.title),
    slug: getPlainText(props["Slug"]?.rich_text),
    publishedAt: props["발행일"]?.date?.start ?? "",
    category: props["카테고리"]?.select?.name,
    summary: getPlainText(props["요약"]?.rich_text),
  };
}

// Notion(외부 CMS) 장애·토큰 만료 시에도 빌드/렌더가 죽지 않도록 안전 폴백을 반환한다.
// (공지 한 페이지의 장애가 사이트 전체 배포를 브릭시키는 것을 방지)
function warnNotion(fn: string, err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  console.warn(`[notion] ${fn} 실패 — 폴백 반환: ${msg}`);
}

export async function getNotices(): Promise<Notice[]> {
  try {
    const dataSourceId = await getDataSourceId();
    const response = (await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "상태",
        select: { equals: "공개" },
      },
      sorts: [{ property: "발행일", direction: "descending" }],
    } as any)) as any;

    return response.results
      .filter((p: any) => "properties" in p)
      .map(mapPageToNotice);
  } catch (err) {
    warnNotion("getNotices", err);
    return [];
  }
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  try {
    const dataSourceId = await getDataSourceId();
    const response = (await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "상태", select: { equals: "공개" } },
        ],
      },
    } as any)) as any;

    if (response.results.length === 0) return null;
    const page = response.results[0];
    if (!("properties" in page)) return null;
    return mapPageToNotice(page);
  } catch (err) {
    warnNotion("getNoticeBySlug", err);
    return null;
  }
}

export async function getNoticeBlocks(pageId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });
    return response.results;
  } catch (err) {
    warnNotion("getNoticeBlocks", err);
    return [];
  }
}
