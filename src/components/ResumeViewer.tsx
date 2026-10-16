"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Eye,
  Printer,
  Copy,
  Check,
  FileText,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Layers,
  ExternalLink,
} from "lucide-react";

const RESUME_PDF = "/Vikash_Chaudhry_Resume.pdf";
const RESUME_IMG = "/Vikash_Chaudhry_Resume.png";

const PLAIN_TEXT_RESUME = `VIKASH CHAUDHRY
Shopify Developer | Frontend Developer | E-commerce
+91 80001 65311 | vikkijaat800@gmail.com | Alwar, Rajasthan, India

PROFESSIONAL SUMMARY
Frontend and Shopify Developer with 1.5+ years of hands-on experience building, customising and maintaining e-commerce websites. Skilled in Shopify Liquid, HTML, CSS and JavaScript, with working experience in WordPress, responsive design and conversion-focused store layouts. Manages multi-channel product catalogues across Amazon, Flipkart, eBay and Etsy, and creates marketing visuals in Canva. Seeking to contribute to a product or e-commerce team in a structured, fast-paced organisation.

TECHNICAL SKILLS
E-commerce Platforms: Shopify (Liquid, theme customisation, store setup), WordPress
Frontend: HTML5, CSS3, JavaScript (basic), Responsive Web Design, UI/UX Implementation
Store Management: Product pages, collections, navigation, pricing, store content, theme troubleshooting
Marketplaces: Amazon, Flipkart, eBay, Etsy (product listing and catalogue management)
Optimisation: Website performance, conversion-focused layouts, e-commerce website optimisation
Marketing & Design: Social Media Optimisation (SMO), social media content, Canva creatives, promotional banners

PROFESSIONAL EXPERIENCE
Frontend & E-commerce Developer | Jun 2025 – Present
Flaneur Global Silver & Gold (Fine Jewellery Brand), Jaipur
- Built and maintain the brand's fine jewellery e-commerce website on Shopify, keeping site performance and user experience consistent.
- Manage multi-channel product listings and catalogues across Amazon, Flipkart, eBay and Etsy.
- Improved website layout and functionality with the team to lift conversions and simplify the customer journey.
- Create product visuals and social media graphics in Canva for the website and marketing channels.

Shopify Developer (Part-time) | Mar 2026 – Aug 2026
Digital Heroes
- Developed and customised Shopify e-commerce websites for multiple clients based on their business requirements.
- Customised themes, responsive layouts, product pages, collections, navigation and store functionality.
- Wrote Shopify Liquid, HTML, CSS and JavaScript to build custom features and UI improvements.
- Improved user experience through responsive design, smoother navigation and conversion-focused layouts.
- Managed product listings, collections, pricing, images and other store content.
- Diagnosed and resolved theme, layout and functionality issues across client stores.
- Worked with clients and team members to gather requirements and deliver website updates on deadline.

Web Developer | Jan 2025 – Jun 2025
Qudrat Studio, Jaipur
- Designed and launched the studio's informational website on WordPress to establish its professional web presence.
- Planned and executed Social Media Optimisation (SMO) strategies to improve the studio's online visibility and engagement.

EDUCATION
Bachelor of Arts (B.A.), Raj Rishi Bhartrihari Matsya University, Alwar (2021 – 2024)
Senior Secondary (Class XII), Harikishan Sr. Sec. School, Alwar (RBSE, Ajmer) (2021)
Secondary (Class X), Harikishan Sr. Sec. School, Alwar (RBSE, Ajmer) (2019)

ADDITIONAL INFORMATION
Languages: English, Hindi
Strengths: Adaptability, time management, attention to detail, problem solving, team collaboration`;

export default function ResumeViewer() {
  const [viewMode, setViewMode] = useState<"document" | "ats">("document");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PLAIN_TEXT_RESUME);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Action Bar & Controls */}
      <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-white border border-black/10 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Document Info & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red/10 text-red flex items-center justify-center font-bold text-xs font-mono shadow-2xs">
              PDF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-sm sm:text-base text-black">
                  Vikash Chaudhry — Official Resume
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Updated
                </span>
              </div>
              <p className="text-xs text-black/50 font-mono mt-0.5">
                80.9 KB &bull; A4 Vector Sheet &bull; Verified 2026
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="p-1 rounded-full bg-[#f0f0f2] flex items-center self-start sm:self-auto">
            <button
              onClick={() => setViewMode("document")}
              data-cursor-hover
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                viewMode === "document"
                  ? "bg-white text-black shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              <FileText size={13} />
              <span>Document Sheet</span>
            </button>
            <button
              onClick={() => setViewMode("ats")}
              data-cursor-hover
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                viewMode === "ats"
                  ? "bg-white text-black shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              <Layers size={13} />
              <span>ATS Digital CV</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleCopy}
            data-cursor-hover
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-black px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-[#f0f0f2] transition-colors"
            title="Copy formatted resume text"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy ATS Text</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            data-cursor-hover
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-black px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition-colors"
            title="Print resume or save as PDF"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>

          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full border border-black/15 bg-white text-black px-4 py-2.5 text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition-colors"
            title="Open original PDF in browser"
          >
            <Eye size={14} />
            <span>View PDF</span>
          </a>

          <a
            href={RESUME_PDF}
            download="Vikash_Chaudhry_Resume.pdf"
            data-cursor-hover
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full bg-red text-white px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-black transition-colors shadow-md"
            title="Download original PDF resume"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === "document" ? (
        /* Visual Sheet View */
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white p-2 sm:p-4 md:p-6">
          <div className="relative w-full rounded-xl overflow-hidden bg-neutral-100 flex flex-col items-center">
            <Image
              src={RESUME_IMG}
              alt="Vikash Chaudhry Resume"
              width={1414}
              height={2000}
              priority
              quality={95}
              className="w-full h-auto object-contain rounded-lg shadow-sm"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-black/60">
            <p>
              Having trouble viewing? Use the direct PDF link or download the file.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red hover:underline flex items-center gap-1"
              >
                <span>Open Raw PDF</span>
                <ExternalLink size={12} />
              </a>
              <span className="text-black/20">&bull;</span>
              <a
                href={RESUME_IMG}
                download="Vikash_Chaudhry_Resume.png"
                className="font-semibold text-black hover:text-red transition-colors"
              >
                Download PNG (2000px)
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* ATS Digital Resume View */
        <div className="relative w-full rounded-2xl sm:rounded-3xl shadow-xl border border-black/10 bg-white p-6 sm:p-10 md:p-14 text-black">
          {/* Header */}
          <div className="border-b-2 border-black pb-6 mb-6">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black uppercase mb-1">
              Vikash Chaudhry
            </h1>
            <p className="font-display text-base sm:text-lg font-semibold text-red mb-3">
              Shopify Developer | Frontend Developer | E-commerce
            </p>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-black/75">
              <span className="inline-flex items-center gap-1.5">
                <Phone size={13} className="text-red" />
                <a href="tel:+918000165311" className="hover:underline">
                  +91 80001 65311
                </a>
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <Mail size={13} className="text-red" />
                <a href="mailto:vikkijaat800@gmail.com" className="hover:underline">
                  vikkijaat800@gmail.com
                </a>
              </span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} className="text-red" />
                <span>Alwar, Rajasthan, India</span>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 border-b border-black/15 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm sm:text-base text-black/85 leading-relaxed">
              Frontend and Shopify Developer with 1.5+ years of hands-on experience building,
              customising and maintaining e-commerce websites. Skilled in Shopify Liquid, HTML,
              CSS and JavaScript, with working experience in WordPress, responsive design and
              conversion-focused store layouts. Manages multi-channel product catalogues across
              Amazon, Flipkart, eBay and Etsy, and creates marketing visuals in Canva. Seeking to
              contribute to a product or e-commerce team in a structured, fast-paced organisation.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 border-b border-black/15 pb-1 mb-4">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-black/8">
                <span className="font-bold text-black block mb-0.5">E-commerce Platforms:</span>
                <span className="text-black/75">Shopify (Liquid, theme customisation, store setup), WordPress</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-black/8">
                <span className="font-bold text-black block mb-0.5">Frontend:</span>
                <span className="text-black/75">HTML5, CSS3, JavaScript (basic), Responsive Web Design, UI/UX Implementation</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-black/8">
                <span className="font-bold text-black block mb-0.5">Store Management:</span>
                <span className="text-black/75">Product pages, collections, navigation, pricing, store content, theme troubleshooting</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-black/8">
                <span className="font-bold text-black block mb-0.5">Marketplaces:</span>
                <span className="text-black/75">Amazon, Flipkart, eBay, Etsy (product listing and catalogue management)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-black/8">
                <span className="font-bold text-black block mb-0.5">Optimisation:</span>
                <span className="text-black/75">Website performance, conversion-focused layouts, e-commerce website optimisation</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-black/8">
                <span className="font-bold text-black block mb-0.5">Marketing &amp; Design:</span>
                <span className="text-black/75">Social Media Optimisation (SMO), social media content, Canva creatives, promotional banners</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 border-b border-black/15 pb-1 mb-5">
              Professional Experience
            </h2>

            {/* Experience 1 */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-black">
                  Frontend &amp; E-commerce Developer
                </h3>
                <span className="text-xs font-mono font-bold text-red">
                  Jun 2025 – Present
                </span>
              </div>
              <p className="text-xs font-semibold text-black/65 mb-2.5">
                Flaneur Global Silver &amp; Gold (Fine Jewellery Brand), Jaipur
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-black/80 leading-relaxed">
                <li>Built and maintain the brand&apos;s fine jewellery e-commerce website on Shopify, keeping site performance and user experience consistent.</li>
                <li>Manage multi-channel product listings and catalogues across Amazon, Flipkart, eBay and Etsy.</li>
                <li>Improved website layout and functionality with the team to lift conversions and simplify the customer journey.</li>
                <li>Create product visuals and social media graphics in Canva for the website and marketing channels.</li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-black">
                  Shopify Developer (Part-time)
                </h3>
                <span className="text-xs font-mono font-bold text-black/60">
                  Mar 2026 – Aug 2026
                </span>
              </div>
              <p className="text-xs font-semibold text-black/65 mb-2.5">
                Digital Heroes
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-black/80 leading-relaxed">
                <li>Developed and customised Shopify e-commerce websites for multiple clients based on their business requirements.</li>
                <li>Customised themes, responsive layouts, product pages, collections, navigation and store functionality.</li>
                <li>Wrote Shopify Liquid, HTML, CSS and JavaScript to build custom features and UI improvements.</li>
                <li>Improved user experience through responsive design, smoother navigation and conversion-focused layouts.</li>
                <li>Managed product listings, collections, pricing, images and other store content.</li>
                <li>Diagnosed and resolved theme, layout and functionality issues across client stores.</li>
                <li>Worked with clients and team members to gather requirements and deliver website updates on deadline.</li>
              </ul>
            </div>

            {/* Experience 3 */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-black">
                  Web Developer
                </h3>
                <span className="text-xs font-mono font-bold text-black/60">
                  Jan 2025 – Jun 2025
                </span>
              </div>
              <p className="text-xs font-semibold text-black/65 mb-2.5">
                Qudrat Studio, Jaipur
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-black/80 leading-relaxed">
                <li>Designed and launched the studio&apos;s informational website on WordPress to establish its professional web presence.</li>
                <li>Planned and executed Social Media Optimisation (SMO) strategies to improve the studio&apos;s online visibility and engagement.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 border-b border-black/15 pb-1 mb-4">
              Education
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-black">Bachelor of Arts (B.A.)</span> — Raj Rishi Bhartrihari Matsya University, Alwar
                </div>
                <span className="font-mono text-black/60 text-xs">2021 – 2024</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-black">Senior Secondary (Class XII)</span> — Harikishan Sr. Sec. School, Alwar (RBSE, Ajmer)
                </div>
                <span className="font-mono text-black/60 text-xs">2021</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-black">Secondary (Class X)</span> — Harikishan Sr. Sec. School, Alwar (RBSE, Ajmer)
                </div>
                <span className="font-mono text-black/60 text-xs">2019</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 border-b border-black/15 pb-1 mb-3">
              Additional Information
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm text-black/80">
              <p>
                <span className="font-bold text-black">Languages:</span> English, Hindi
              </p>
              <p>
                <span className="font-bold text-black">Strengths:</span> Adaptability, time management, attention to detail, problem solving, team collaboration
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
