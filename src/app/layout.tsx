import type { Metadata, Viewport } from "next";
import { Outfit, Syne, Instrument_Serif, Kanit, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";

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
  metadataBase: new URL("https://vikash.website"),
  title: {
    default: "Vikash Choudhary | Web & Shopify Developer",
    template: "%s | Vikash Choudhary",
  },
  description:
    "Vikash Choudhary is a Web & Shopify Developer creating modern, high-performance websites, eCommerce experiences, and interactive digital products.",
  keywords: [
    "Vikash Choudhary",
    "Web Developer",
    "Shopify Developer",
    "Shopify Plus Developer",
    "Liquid Theme Development",
    "Next.js Developer",
    "React Developer",
    "E-commerce Developer",
    "Frontend Engineer",
    "UI/UX Developer",
    "Performance Optimization",
  ],
  authors: [{ name: "Vikash Choudhary", url: "https://vikash.website" }],
  creator: "Vikash Choudhary",
  publisher: "Vikash Choudhary",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vikash.website/",
    title: "Vikash Choudhary | Web & Shopify Developer",
    description:
      "Vikash Choudhary is a Web & Shopify Developer creating modern, high-performance websites, eCommerce experiences, and interactive digital products.",
    siteName: "Vikash Choudhary Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
        width: 1200,
        height: 630,
        alt: "Vikash Choudhary — Web & Shopify Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikash Choudhary | Web & Shopify Developer",
    description:
      "Vikash Choudhary is a Web & Shopify Developer creating modern, high-performance websites, eCommerce experiences, and interactive digital products.",
    images: [
      "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
    ],
    creator: "@vikasjaat05",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vikash Portfolio",
  },
  verification: {
    google: "U5huw9R97lwtTJD3vxKt68aYrJFGC123qT8b8DGsg4M",
  },
};

export const viewport: Viewport = {
  themeColor: "#e10600",
  width: "device-width",
  initialScale: 1,
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
        <meta name="google-site-verification" content="U5huw9R97lwtTJD3vxKt68aYrJFGC123qT8b8DGsg4M" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://db.onlinewebfonts.com/c/8b75d9dcff6a48c35a46656192adf019?family=FSP+DEMO+-+PODIUM+Sharp+4.11"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#0a0a0a]">
        <div className="noise" />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
