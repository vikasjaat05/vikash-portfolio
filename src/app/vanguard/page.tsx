import VanguardHero from "@/components/vanguard/VanguardHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VANGUARD — World-Class Digital Collective",
  description:
    "We build fierce brand identities that don't just turn heads — they lead. Design. Disrupt. Conquer.",
};

export default function VanguardPage() {
  return (
    <main className="w-full min-h-screen bg-black overflow-hidden">
      <VanguardHero />
    </main>
  );
}
