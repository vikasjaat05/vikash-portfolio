import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import FadeSection from "@/components/FadeSection";
import CTA from "@/components/CTA";
import { getFounder } from "@/lib/team-data";
import { getProjectForViewer } from "@/lib/project-data";
import { getMemberSession } from "@/lib/auth/member-session";
import MemberProjectEditGate from "@/components/MemberProjectEditGate";

export const dynamic = "force-dynamic";

export default async function MemberProjectPage({
  params,
}: {
  params: Promise<{ slug: string; project: string }>;
}) {
  const { slug, project } = await params;
  const session = await getMemberSession();

  const founder = await getFounder(slug);
  if (!founder) notFound();

  const result = await getProjectForViewer(slug, project, session?.slug ?? null);
  if (!result) notFound();

  const { project: item, isOwner } = result;

  return (
    <>
      <Navbar />
      {isOwner && item.hasDraft && (
        <div className="relative z-20 bg-red text-white text-center text-sm font-semibold py-2.5 px-6">
          You&apos;re previewing your unpublished draft — visitors see the last published version until you click Publish.
        </div>
      )}
      <main className="relative">
        <PageHeader
          eyebrow={`Work by ${founder.name}`}
          title={item.title}
          description={item.description}
          breadcrumb={[
            { label: "About", href: "/about" },
            { label: founder.name, href: `/about/${slug}#work` },
            { label: item.title },
          ]}
        />

        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <div className="max-w-[1000px] mx-auto">
            <FadeSection>
              <div
                className="w-full aspect-[16/9] rounded-2xl md:rounded-3xl mb-16 md:mb-20 flex items-center justify-center overflow-hidden bg-black/5"
                style={{ background: item.imageUrl ? undefined : "#1a1a1a" }}
              >
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display text-3xl md:text-5xl font-bold text-white">
                    {item.title}
                  </span>
                )}
              </div>
            </FadeSection>

            <FadeSection>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">About this project</h2>
              <p className="text-black/60 leading-relaxed whitespace-pre-line">{item.description}</p>
            </FadeSection>

            {item.linkUrl && (
              <FadeSection className="mt-10">
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="inline-flex items-center gap-2 font-semibold underline-swipe"
                >
                  Visit live site
                  <ArrowUpRight size={18} />
                </a>
              </FadeSection>
            )}

            <FadeSection className="mt-16 md:mt-20 pt-8 border-t border-black/10">
              <Link
                href={`/about/${slug}#work`}
                data-cursor-hover
                className="inline-flex items-center gap-2 font-semibold underline-swipe"
              >
                <ArrowLeft size={18} />
                Back to {founder.name}&apos;s work
              </Link>
            </FadeSection>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      {isOwner && <MemberProjectEditGate projectId={item.id} initial={item} />}
    </>
  );
}
