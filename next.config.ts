import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' blob: data: https://www.youtube.com https://s.ytimg.com https://unpkg.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.higgs.ai https://pub-f170a2592d2c4a1485466404c36807be.r2.dev https://shrug-person-78902957.figma.site https://motionsites.ai https://api.dicebear.com https://res.cloudinary.com https://i.ytimg.com",
  "media-src 'self' https: blob: data:",
  "connect-src 'self' https://www.youtube.com https://unpkg.com https://lottie.host https://api.elevenlabs.io wss://api.elevenlabs.io blob: data:",
  "worker-src 'self' blob: data:",
  "child-src 'self' blob: https://tech1-six.vercel.app https://*.vercel.app",
  "frame-src 'self' https://www.youtube.com https://tech1-six.vercel.app https://*.vercel.app",
  "font-src 'self' data:",
].join("; ");

const pageSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.higgs.ai" },
      { protocol: "https", hostname: "pub-f170a2592d2c4a1485466404c36807be.r2.dev" },
      { protocol: "https", hostname: "shrug-person-78902957.figma.site" },
      { protocol: "https", hostname: "motionsites.ai" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vikash-portfolio-sandy.vercel.app",
          },
        ],
        destination: "https://vikash.website/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|sitemap.xml|robots.txt|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|xml|txt)).*)",
        headers: pageSecurityHeaders,
      },
    ];
  },
};

export default nextConfig;
