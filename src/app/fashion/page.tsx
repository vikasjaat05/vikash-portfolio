import type { Metadata } from "next";
import LGPSMPage from "@/components/lgpsm/LGPSMPage";

export const metadata: Metadata = {
  title: "LGPSM — Future Forward Fashion",
  description: "Pure white minimal futuristic fashion website interface.",
};

export default function Page() {
  return <LGPSMPage />;
}
