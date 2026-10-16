export type FounderStat = {
  value: number;
  suffix: string;
  label: string;
};

export type Founder = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  focus: string;
  categorySlug: string;
  bio: string;
  longBio: string;
  highlights: string[];
  skills: string[];
  stats: FounderStat[];
  gradient: string;
  avatar: string;
};

export const FOUNDERS: Founder[] = [
  {
    slug: "vikash-choudhary",
    name: "Vikash Choudhary",
    role: "Shopify Developer | Frontend Developer | E-commerce",
    initials: "VC",
    focus: "Shopify Liquid & Frontend Engineering",
    categorySlug: "web",
    bio: "Frontend and Shopify Developer with 1.5+ years of hands-on experience building, customising and maintaining high-performance e-commerce websites and conversion-focused layouts.",
    longBio:
      "Frontend and Shopify Developer with 1.5+ years of hands-on experience building, customising and maintaining e-commerce websites. Skilled in Shopify Liquid, HTML, CSS and JavaScript, with working experience in WordPress, responsive design and conversion-focused store layouts.\n\nManages multi-channel product catalogues across Amazon, Flipkart, eBay and Etsy, and creates marketing visuals in Canva. Seeking to contribute to high-impact product or e-commerce teams in structured, fast-paced organisations.",
    highlights: [
      "Frontend & E-commerce Developer at Flaneur Global Silver & Gold (Fine Jewellery Brand), Jaipur",
      "Shopify Developer (Part-time) at Digital Heroes — Multi-client theme customization & Liquid features",
      "Web Developer at Qudrat Studio, Jaipur — WordPress platform design & SMO strategies",
      "Multi-channel catalogue & product management across Amazon, Flipkart, eBay and Etsy",
      "Conversion-focused layouts, speed optimization, and responsive UI implementation",
    ],
    skills: [
      "Shopify (Liquid, themes, setup)",
      "WordPress",
      "HTML5, CSS3, JavaScript",
      "Responsive Web Design & UI/UX",
      "Store & Catalogue Management",
      "Marketplaces (Amazon, Flipkart, eBay, Etsy)",
      "Website Performance & CRO",
      "Canva & Social Media Optimisation (SMO)",
    ],
    stats: [
      { value: 1.5, suffix: "+", label: "Years Experience" },
      { value: 14, suffix: "+", label: "Live Stores & Sites" },
      { value: 98, suffix: "%", label: "Client Satisfaction" },
    ],
    gradient: "linear-gradient(160deg, #1a1a1a 0%, #e10600 140%)",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
  },
];
