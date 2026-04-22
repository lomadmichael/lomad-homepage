import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import EcologyWetlandDetail from "@/components/projects/EcologyWetlandDetail";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { getServiceById } from "@/data/services";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.name} | LOMAD Projects`,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // 남대천 하구습지 생태체험은 전용 랜딩(커스텀 디자인)을 렌더한다.
  if (project.slug === "ecology-wetland-spring") {
    return <EcologyWetlandDetail />;
  }

  const service = getServiceById(project.category);

  const sections: { label: string; titleKr: string; body: string }[] = [
    { label: "Introduction", titleKr: "프로젝트 소개", body: project.description },
    { label: "Why", titleKr: "왜 시작했는가", body: project.why },
    { label: "For Whom", titleKr: "누구를 위한 것인가", body: project.target },
    { label: "How", titleKr: "어떻게 운영하는가", body: project.operation },
    { label: "Outcome", titleKr: "무엇이 남는가", body: project.outcome },
  ];

  return (
    <main>
      <PageHero
        labelEn={service?.titleEn}
        titleEn={project.name}
        subtitleKr={project.oneLiner}
      />

      <div className="max-w-[1000px] mx-auto px-6 md:px-[60px]">
        {/* Hero Image */}
        <FadeIn>
          <div className="relative h-[300px] md:h-[480px] rounded-lg overflow-hidden mb-[60px]">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>

        {/* 섹션들 */}
        {sections.map((section) => (
          <FadeIn key={section.label}>
            <section className="mb-[60px] grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
              <div className="md:col-span-1">
                <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-2">
                  {section.label}
                </p>
                <h2 className="font-[family-name:var(--font-noto)] text-[18px] md:text-[20px] font-black leading-snug">
                  {section.titleKr}
                </h2>
              </div>
              <div className="md:col-span-3">
                <p className="font-[family-name:var(--font-noto)] text-[14px] md:text-[15px] leading-[1.9] text-text-sub">
                  {section.body}
                </p>
              </div>
            </section>
          </FadeIn>
        ))}

        {/* 외부 링크 */}
        {project.externalLinks && project.externalLinks.length > 0 && (
          <FadeIn>
            <section className="mb-[60px] py-8 border-y border-border">
              <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-4">
                Links
              </p>
              <div className="flex flex-wrap gap-3">
                {project.externalLinks.map((link) => (
                  <Button
                    key={link.url}
                    variant="outline"
                    href={link.url}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* 문의하기 */}
        <FadeIn>
          <section className="py-[80px] text-center">
            <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-3">
              Inquiry
            </p>
            <h2 className="font-[family-name:var(--font-noto)] text-[22px] md:text-[28px] font-black mb-5">
              비슷한 프로젝트를 기획 중이신가요?
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="primary"
                href={`/contact?type=${encodeURIComponent(service?.inquiryType ?? "기타 문의")}`}
              >
                문의하기
              </Button>
              <Button variant="outline" href="/projects">
                다른 프로젝트 보기
              </Button>
            </div>
          </section>
        </FadeIn>

        {/* 다른 프로젝트 */}
        <FadeIn>
          <section className="py-[60px] border-t border-border">
            <p className="font-[family-name:var(--font-karla)] text-[10px] font-extrabold tracking-[2px] uppercase text-text-muted mb-5">
              More Projects
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECTS.filter((p) => p.slug !== project.slug)
                .slice(0, 3)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="group"
                  >
                    <div className="relative h-[160px] rounded-lg overflow-hidden mb-3">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-[family-name:var(--font-noto)] text-[14px] font-black leading-snug">
                      {p.name}
                    </p>
                    <p className="font-[family-name:var(--font-noto)] text-[12px] text-text-sub leading-snug mt-1 line-clamp-2">
                      {p.oneLiner}
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </main>
  );
}
