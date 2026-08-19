import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import MemberPortfolioGrid from "@/components/MemberPortfolioGrid";
import FadeSection from "@/components/FadeSection";
import CTA from "@/components/CTA";
import { WORK_CATEGORIES, getCategory } from "@/data/portfolio";
import { getMemberProjectsForWorkCategory } from "@/lib/project-data";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return WORK_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const owner = await getMemberProjectsForWorkCategory(slug);
  const hasRealProjects = Boolean(owner && owner.projects.length > 0);

  return (
    <>
      <Navbar />
      <main className="relative">
        <PageHeader
          eyebrow={category.tagline}
          title={
            <>
              {category.label} <span className="text-red">work.</span>
            </>
          }
          description={category.description}
          breadcrumb={[{ label: "Work", href: "/work" }, { label: category.label }]}
        />

        <section className="px-6 md:px-10 pb-28 md:pb-36">
          <div className="max-w-[1400px] mx-auto">
            <FadeSection>
              {hasRealProjects && owner ? (
                <MemberPortfolioGrid items={owner.projects} memberSlug={owner.memberSlug} />
              ) : (
                <PortfolioGrid items={category.items} categorySlug={category.slug} />
              )}
            </FadeSection>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
