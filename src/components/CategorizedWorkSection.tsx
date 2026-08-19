import type { MemberProject, ProjectCategory } from "@/lib/project-data";
import { groupProjectsByCategory } from "@/lib/project-data";
import CategoryProjectGrid from "./CategoryProjectGrid";
import FadeSection from "./FadeSection";

const CATEGORY_INTRO_COPY: Record<ProjectCategory, string> = {
  general: "A selection of work across formats and mediums.",
  logo: "A logofolio highlighting custom logos designed to align with clients' visions.",
  branding:
    "Brand identity projects — creating impactful visual marks that carry a client's mission and goals.",
  social: "Visual content crafted for social networks such as Instagram and Facebook.",
  packaging:
    "Innovative, visually appealing product packaging that communicates brand identity and drives engagement.",
  print: "High-quality print designs crafted to enhance offline brand presence.",
  uiux: "Seamless UI/UX for apps and websites that combine clarity, usability, and visual appeal.",
  seo: "Search campaigns focused on organic visibility, rankings, and qualified traffic growth.",
  paidads: "Paid search and social campaigns engineered for measurable pipeline and ROAS.",
  content: "Content and email marketing that nurtures leads and keeps brands top of mind.",
};

const CATEGORY_EYEBROW: Record<ProjectCategory, string> = {
  general: "Work",
  logo: "Graphic Design",
  branding: "Graphic Design",
  social: "Marketing",
  packaging: "Graphic Design",
  print: "Graphic Design",
  uiux: "Graphic Design",
  seo: "Digital Marketing",
  paidads: "Digital Marketing",
  content: "Digital Marketing",
};

export default function CategorizedWorkSection({
  projects,
  memberSlug,
}: {
  projects: MemberProject[];
  memberSlug: string;
}) {
  const groups = groupProjectsByCategory(projects);

  return (
    <div className="flex flex-col gap-14 md:gap-16">
      {groups.map((group) => (
        <FadeSection key={group.category}>
          <div className="rounded-2xl md:rounded-3xl bg-[#0e0e0e] px-6 py-12 md:px-12 md:py-16 mb-7 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {CATEGORY_EYEBROW[group.category]}
            </span>
            <h3 className="font-display font-extrabold text-3xl md:text-5xl mt-3 text-[#c6e11a]">
              {group.label}
            </h3>
            <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-md mx-auto mt-4">
              {CATEGORY_INTRO_COPY[group.category]}
            </p>
          </div>
          <CategoryProjectGrid category={group.category} items={group.items} memberSlug={memberSlug} />
        </FadeSection>
      ))}
    </div>
  );
}
