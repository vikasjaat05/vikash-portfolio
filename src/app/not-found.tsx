import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHeading from "@/components/AnimatedHeading";
import LottiePlayer from "@/components/LottiePlayer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <LottiePlayer
          src="https://lottie.host/84f38abf-4894-43f1-a324-6bebe509816b/L5D02tzDgj.lottie"
          width={380}
          height={380}
          className="-mb-6"
        />
        <AnimatedHeading
          mode="load"
          className="font-display text-3xl md:text-5xl font-extrabold -mt-8 md:-mt-16 mb-6"
        >
          This page went <span className="text-red">off the grid.</span>
        </AnimatedHeading>
        <p className="text-black/60 max-w-md mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          data-cursor-hover
          className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white font-semibold px-7 py-4 rounded-full hover:bg-red transition-colors duration-300"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
