import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Arix Team",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f1ea", fontFamily: "system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
