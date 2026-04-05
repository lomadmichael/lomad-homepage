import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoticeBlocks, getNoticeBySlug } from "@/lib/notion";
import NotionRenderer from "@/components/notion/NotionRenderer";

export const revalidate = 60;

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const notice = await getNoticeBySlug(slug);

  if (!notice) {
    notFound();
  }

  const blocks = await getNoticeBlocks(notice.id);

  return (
    <article className="max-w-[900px] mx-auto px-6 md:px-[60px] pt-[100px] pb-[120px]">
      <Link
        href="/notice"
        className="font-[family-name:var(--font-karla)] text-[11px] font-semibold tracking-[1.5px] uppercase text-text-muted hover:text-text transition-colors inline-flex items-center gap-2 mb-8"
      >
        <span>←</span>
        <span>Back to Notice</span>
      </Link>

      <header className="pb-8 mb-10 border-b border-border">
        {notice.category && (
          <p className="font-[family-name:var(--font-karla)] text-[11px] font-bold tracking-[1.5px] uppercase text-text-muted mb-4">
            {notice.category}
          </p>
        )}
        <h1 className="font-[family-name:var(--font-noto)] text-[28px] md:text-[36px] font-black leading-tight text-text mb-4">
          {notice.title}
        </h1>
        <time className="font-[family-name:var(--font-karla)] text-[13px] text-text-muted">
          {formatDate(notice.publishedAt)}
        </time>
      </header>

      <NotionRenderer blocks={blocks} />

      <div className="mt-16 pt-8 border-t border-border">
        <Link
          href="/notice"
          className="font-[family-name:var(--font-karla)] text-[11px] font-semibold tracking-[1.5px] uppercase text-text-muted hover:text-text transition-colors"
        >
          ← 목록으로
        </Link>
      </div>
    </article>
  );
}
