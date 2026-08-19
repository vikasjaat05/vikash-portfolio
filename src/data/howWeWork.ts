export type WorkStep = {
  step: string;
  title: string;
  desc: string;
};

export const HOW_WE_WORK: WorkStep[] = [
  {
    step: "Week 1",
    title: "Discovery call",
    desc: "We learn your goals, constraints, and what success actually looks like.",
  },
  {
    step: "Week 1–2",
    title: "Scope & quote",
    desc: "A clear proposal with timeline and price — no vague retainers.",
  },
  {
    step: "Ongoing",
    title: "Build in the open",
    desc: "Weekly check-ins with the actual people building your project.",
  },
  {
    step: "Launch",
    title: "Ship & support",
    desc: "We launch, monitor, and stay on for the fixes that come after.",
  },
];
