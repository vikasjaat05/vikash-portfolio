export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://vikash.website/#person",
        "name": "Vikash Choudhary",
        "givenName": "Vikash",
        "familyName": "Choudhary",
        "jobTitle": "Web & Shopify Developer",
        "url": "https://vikash.website/",
        "image":
          "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
        "description":
          "Vikash Choudhary is a Web & Shopify Developer creating modern, high-performance websites, eCommerce experiences, and interactive digital products.",
        "sameAs": [
          "https://github.com/vikasjaat05",
          "https://linkedin.com/in/vikash-choudhary",
          "https://wa.me/918000165311"
        ],
        "email": "vikkijaat800@gmail.com",
        "telephone": "+91 8000165311",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Alwar",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        },
        "knowsAbout": [
          "Shopify Development",
          "Shopify Plus",
          "Liquid Theme Development",
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "E-Commerce CRO & Speed Optimization",
          "UI/UX Engineering",
          "Web Applications",
          "GSAP Animations"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://vikash.website/#website",
        "url": "https://vikash.website/",
        "name": "Vikash Choudhary | Web & Shopify Developer",
        "description":
          "Vikash Choudhary is a Web & Shopify Developer creating modern, high-performance websites, eCommerce experiences, and interactive digital products.",
        "inLanguage": "en-US",
        "publisher": {
          "@id": "https://vikash.website/#person"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://vikash.website/#service",
        "name": "Vikash Choudhary — Web & Shopify Development Services",
        "url": "https://vikash.website/",
        "image":
          "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
        "description":
          "Custom Shopify 2.0 store development, luxury Liquid themes, high-speed Next.js web applications, and conversion rate optimization.",
        "priceRange": "$$ - $$$",
        "telephone": "+91 8000165311",
        "areaServed": "Global",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Alwar",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        },
        "founder": {
          "@id": "https://vikash.website/#person"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web & Shopify Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Shopify Store Development",
                "description": "Custom Shopify Liquid theme development, headless storefronts, speed optimization, and high-converting checkout flows."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Next.js Web Applications",
                "description": "Modern responsive full-stack web applications and interactive platforms built with Next.js, React, and TypeScript."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Core Web Vitals & Speed Optimization",
                "description": "Sub-1s page load speeds, image compression, code splitting, and Lighthouse 90+ score optimization."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
