export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  avatar: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: "vikash-choudhary",
    name: "Vikash Choudhary",
    role: "Web & Shopify Developer",
    initials: "VC",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
  },
  {
    slug: "yunus-ali",
    name: "Yunus Ali",
    role: "Digital Marketing Specialist",
    initials: "YA",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783090235/ChatGPT_Image_Jul_3_2026_08_20_17_PM_ex1ovd.png",
  },
  {
    slug: "chandra-prakash",
    name: "Chandra Prakash",
    role: "Graphic Designer",
    initials: "CP",
    avatar: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076814/ChatGPT_Image_Jul_3_2026_01_07_48_PM_bykrat.png",
  },
];
