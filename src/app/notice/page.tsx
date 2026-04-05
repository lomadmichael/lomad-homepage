import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { getNotices } from "@/lib/notion";

// Revalidate every 60 seconds
export const revalidate = 60;

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export default async function NoticePage() {
  const notices = await getNotices();

  return (
    <>
      <PageHero titleEn="NOTICE" subtitleKr="로마드 협동조합의 공지사항" />

      <section className="max-w-[1400px] mx-auto px-6 md:px-[60px] pb-[120px]">
        {notices.length === 0 ? (
          <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-muted py-20 text-center">
            아직 등록된 공지사항이 없습니다.
          </p>
        ) : (
          <ul className="border-t border-border">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b border-border">
                <Link
                  href={`/notice/${notice.slug}`}
                  className="block py-6 md:py-8 hover:opacity-70 transition-opacity"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                    {notice.category && (
                      <span className="font-[family-name:var(--font-karla)] text-[10px] font-bold tracking-[1.5px] uppercase text-text-muted shrink-0 md:w-[80px]">
                        {notice.category}
                      </span>
                    )}
                    <h2 className="font-[family-name:var(--font-noto)] text-[18px] md:text-[20px] font-bold text-text flex-1">
                      {notice.title}
                    </h2>
                    <time className="font-[family-name:var(--font-karla)] text-[12px] text-text-muted shrink-0">
                      {formatDate(notice.publishedAt)}
                    </time>
                  </div>
                  {notice.summary && (
                    <p className="font-[family-name:var(--font-noto)] text-[14px] text-text-sub mt-2 md:ml-[104px] line-clamp-2">
                      {notice.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
