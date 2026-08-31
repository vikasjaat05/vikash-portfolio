import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import FadeSection from "@/components/FadeSection";
import CTA from "@/components/CTA";
import { WORK_CATEGORIES, getCategory } from "@/data/portfolio";

export function generateStaticParams() {
  return WORK_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const title = `${category.label} Projects & Case Studies | Vikash Choudhary`;
  const description = `${category.description} Built by Web & Shopify Developer Vikash Choudhary.`;
  const url = `https://vikash.website/work/${category.slug}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

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
              <PortfolioGrid items={category.items} categorySlug={category.slug} />
            </FadeSection>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
