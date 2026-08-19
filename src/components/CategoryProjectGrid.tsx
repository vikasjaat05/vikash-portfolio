"use client";

import Link from "next/link";
import type { MemberProject } from "@/lib/project-data";
import type { ProjectCategory } from "@/lib/project-categories";

/**
 * Renders a category's projects the way that discipline is actually shown
 * on a real portfolio: a full case-study panel for branding/UI-UX
 * builds, Instagram-style tiles for social, a metrics-forward card for
 * performance marketing (SEO/paid ads/content), and dense square
 * thumbnails for logo/packaging/anything uncategorized.
 */
export default function CategoryProjectGrid({
  category,
  items,
  memberSlug,
}: {
  category: ProjectCategory;
  items: MemberProject[];
  memberSlug: string;
}) {
  if (category === "branding" || category === "uiux") {
    return (
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <FeaturePanel key={item.id} item={item} memberSlug={memberSlug} />
        ))}
      </div>
    );
  }

  if (category === "social") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <InstagramTile key={item.id} item={item} memberSlug={memberSlug} />
        ))}
      </div>
    );
  }

  if (category === "seo" || category === "paidads" || category === "content") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <MetricsCard key={item.id} item={item} memberSlug={memberSlug} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {items.map((item) => (
        <ThumbTile key={item.id} item={item} memberSlug={memberSlug} />
      ))}
    </div>
  );
}

function DraftBadge({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-full bg-red text-white">
      Draft
    </span>
  );
}

function ThumbTile({ item, memberSlug }: { item: MemberProject; memberSlug: string }) {
  return (
    <Link
      href={`/about/${memberSlug}/work/${item.slug}`}
      data-cursor-hover
      className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-black/[0.08] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <DraftBadge show={item.hasDraft} />
      {item.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4">
          <span className="font-display font-extrabold text-lg text-center leading-tight">
            {item.title}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
    </Link>
  );
}

function InstagramTile({ item, memberSlug }: { item: MemberProject; memberSlug: string }) {
  return (
    <Link
      href={`/about/${memberSlug}/work/${item.slug}`}
      data-cursor-hover
      className="group relative rounded-2xl overflow-hidden bg-white border border-black/[0.08] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <DraftBadge show={item.hasDraft} />
      <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-black/60">
        <span>Instagram</span>
        <span>♡ ➤</span>
      </div>
      <div className="aspect-square relative">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-3"
            style={{ background: "linear-gradient(135deg, #1a1a1a, #7a3ee0)" }}
          >
            <span className="text-white font-bold text-sm text-center leading-snug">
              {item.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 px-3 py-2 text-black/40 text-sm">♡ 💬 ➤</div>
    </Link>
  );
}

function FeaturePanel({ item, memberSlug }: { item: MemberProject; memberSlug: string }) {
  return (
    <Link
      href={`/about/${memberSlug}/work/${item.slug}`}
      data-cursor-hover
      className="group relative grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border border-black/[0.08] bg-white transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
        {item.hasDraft && (
          <span className="w-fit text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red text-white">
            Draft
          </span>
        )}
        <h4 className="font-display text-2xl font-bold">{item.title}</h4>
        <p className="text-black/60 text-sm leading-relaxed">{item.description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline-swipe w-fit">
          View project
        </span>
      </div>
      <div className="relative min-h-[220px] bg-[#efe8dc]">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center p-6"
            style={{ background: "linear-gradient(160deg, #1a1a1a 0%, #7a3ee0 140%)" }}
          >
            <span className="font-display text-white text-2xl font-extrabold text-center">
              {item.title}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}

function MetricsCard({ item, memberSlug }: { item: MemberProject; memberSlug: string }) {
  return (
    <Link
      href={`/about/${memberSlug}/work/${item.slug}`}
      data-cursor-hover
      className="group relative rounded-2xl overflow-hidden border border-black/[0.08] bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {item.imageUrl && (
        <div className="relative aspect-[16/9]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6 border-l-2 border-red">
        {item.hasDraft && (
          <span className="w-fit inline-block mb-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-red text-white">
            Draft
          </span>
        )}
        <h4 className="font-display text-xl font-bold mb-2">{item.title}</h4>
        <p className="text-black/60 text-sm leading-relaxed">{item.description}</p>
      </div>
    </Link>
  );
}
