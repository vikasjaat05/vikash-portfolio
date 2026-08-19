export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  content: string[];
};

export const ARTICLES: Article[] = [
  {
    slug: "why-slow-websites-lose-customers",
    title: "Why Slow Websites Lose Customers (And How to Fix It)",
    excerpt:
      "A one-second delay in load time can cost you meaningful conversions. Here's what actually moves the needle on site speed.",
    category: "Web Development",
    date: "2026-06-02",
    readTime: "6 min read",
    color: "#e10600",
    content: [
      "Every extra second your site takes to load costs you real revenue. Studies consistently show that even a one-second delay can reduce conversions by 7% or more — and on mobile, where connections are less reliable, the impact is often worse.",
      "The good news: most performance problems come down to a handful of fixable issues. Unoptimized images, render-blocking scripts, and bloated third-party embeds are responsible for the majority of slow load times we see in client audits.",
      "Start with the basics: compress and lazy-load images, defer non-critical JavaScript, and audit every third-party script you've added over the years — analytics tags, chat widgets, and marketing pixels accumulate fast and rarely get cleaned up.",
      "Beyond the basics, modern rendering strategies matter. Server-rendered pages with smart caching consistently outperform client-heavy single-page apps for content-driven sites. If your site feels sluggish, the framework and hosting decisions made years ago are often the real culprit.",
    ],
  },
  {
    slug: "app-launch-checklist",
    title: "The App Launch Checklist Nobody Tells You About",
    excerpt:
      "Beyond App Store submission — the operational details that determine whether your launch actually gets traction.",
    category: "App Development",
    date: "2026-05-18",
    readTime: "8 min read",
    color: "#0a0a0a",
    content: [
      "Getting an app approved by Apple or Google is the easy part. The harder problem is making sure people actually download it, use it, and come back — and most teams don't plan for that until it's too late.",
      "Before you submit, your analytics and crash reporting need to be wired up and tested. You cannot fix what you can't see, and the first 48 hours after launch generate the data that tells you whether something is fundamentally broken.",
      "Plan your onboarding flow assuming zero context. Users who found your app through an ad or a friend's recommendation know nothing about your product — the first three screens need to earn their attention, not explain your roadmap.",
      "Finally, have a response plan for reviews and support tickets before you launch, not after. Early reviews disproportionately affect your App Store ranking, and a fast, human response to a 2-star review often turns into a 5-star update.",
    ],
  },
  {
    slug: "brand-identity-vs-logo",
    title: "Brand Identity Is Not Just a Logo",
    excerpt:
      "A logo is one artifact. A brand identity is a system. Here's why that distinction matters for growing businesses.",
    category: "Graphic Design",
    date: "2026-05-04",
    readTime: "5 min read",
    color: "#e10600",
    content: [
      "We regularly meet founders who think they need 'a logo' when what they actually need is a decision-making framework for every visual choice their business will make for the next five years.",
      "A logo without a system falls apart the moment someone outside your original designer touches it — a new hire makes a slide deck, a printer gets the color slightly wrong, a partner uses the wrong version on a co-branded asset.",
      "A real brand identity documents color values, type pairings, spacing rules, and tone of voice so that anyone on your team — or any agency you hire in the future — can produce consistent work without guessing.",
      "The investment pays for itself the first time you scale past a two-person team. Consistency compounds trust, and trust is what turns a visitor into a customer.",
    ],
  },
  {
    slug: "paid-ads-vs-seo-2026",
    title: "Paid Ads vs. SEO in 2026: Where Should Your Budget Go?",
    excerpt:
      "Neither channel is dead, but the right mix depends entirely on your sales cycle and how fast you need results.",
    category: "Digital Marketing",
    date: "2026-04-22",
    readTime: "7 min read",
    color: "#0a0a0a",
    content: [
      "The paid-vs-organic debate misses the actual question most businesses should be asking: how fast do you need results, and how long is your sales cycle?",
      "Paid ads deliver predictable, immediate volume — you can measure ROI within days. The tradeoff is that the moment you stop paying, the traffic stops. It's rented attention, not owned attention.",
      "SEO compounds over months, not days, but the traffic you earn keeps showing up long after you've stopped actively investing in a specific piece of content. For businesses with longer sales cycles, that compounding effect eventually outperforms paid on cost-per-acquisition.",
      "In practice, the businesses that grow fastest run both in parallel — paid ads to validate messaging and generate immediate pipeline, while SEO content builds the long-term asset that lowers acquisition costs over time.",
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
