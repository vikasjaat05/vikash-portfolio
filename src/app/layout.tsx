import type { Metadata, Viewport } from "next";
import { Outfit, Syne, Instrument_Serif, Kanit, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vikash Choudhary — Web & Shopify Developer",
  description:
    "Portfolio of Vikash Choudhary, a Web & Shopify Developer crafting high-impact websites, e-commerce storefronts, and web applications.",
};

export const viewport: Viewport = {
  themeColor: "#e10600",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} ${instrumentSerif.variable} ${kanit.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#0a0a0a]">
        <div className="noise" />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
