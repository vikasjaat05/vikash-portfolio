export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://vikash-portfolio-sandy.vercel.app/#person",
        "name": "Vikash Choudhary",
        "givenName": "Vikash",
        "familyName": "Choudhary",
        "jobTitle": "Web & Shopify Developer",
        "url": "https://vikash-portfolio-sandy.vercel.app/",
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
          "Web Applications"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://vikash-portfolio-sandy.vercel.app/#website",
        "url": "https://vikash-portfolio-sandy.vercel.app/",
        "name": "Vikash Choudhary | Web & Shopify Developer",
        "description":
          "Vikash Choudhary is a Web & Shopify Developer creating modern, high-performance websites, eCommerce experiences, and interactive digital products.",
        "inLanguage": "en-US",
        "publisher": {
          "@id": "https://vikash-portfolio-sandy.vercel.app/#person"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://vikash-portfolio-sandy.vercel.app/#service",
        "name": "Vikash Choudhary — Web & Shopify Development Services",
        "url": "https://vikash-portfolio-sandy.vercel.app/",
        "image":
          "https://res.cloudinary.com/dh0amtajw/image/upload/v1783076813/ChatGPT_Image_Jul_3_2026_12_25_31_PM_t7giml.png",
        "description":
          "Custom Shopify 2.0 store development, luxury Liquid themes, high-speed Next.js web applications, and conversion rate optimization.",
        "priceRange": "$$ - $$$",
        "telephone": "+91 8000165311",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Alwar",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        },
        "founder": {
          "@id": "https://vikash-portfolio-sandy.vercel.app/#person"
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
