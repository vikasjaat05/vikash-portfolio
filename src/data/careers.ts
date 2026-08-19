export type JobOpening = {
  title: string;
  department: string;
  type: string;
  location: string;
};

export const OPENINGS: JobOpening[] = [
  { title: "Senior Frontend Developer", department: "Web Development", type: "Full-time", location: "Remote" },
  { title: "React Native Engineer", department: "App Development", type: "Full-time", location: "Remote" },
  { title: "Performance Marketing Manager", department: "Digital Marketing", type: "Full-time", location: "Remote" },
  { title: "Senior Brand Designer", department: "Graphic Design", type: "Contract", location: "Remote" },
];

export const VALUES = [
  {
    title: "Craft over shortcuts",
    desc: "We'd rather ship something a week later that we're proud of than rush something forgettable.",
  },
  {
    title: "Direct access, always",
    desc: "Every team member works directly with clients — no layers of account managers in between.",
  },
  {
    title: "Own your work",
    desc: "Small team, real ownership. You'll see your work ship and hear directly from the people using it.",
  },
  {
    title: "Growth is expected",
    desc: "We invest in the tools, courses, and time you need to get better at your craft every quarter.",
  },
];

export const PERKS = [
  "Fully remote, flexible hours",
  "Health & wellness stipend",
  "Annual learning budget",
  "Four-day work weeks in summer",
  "Profit-sharing after one year",
  "Home office setup budget",
];
