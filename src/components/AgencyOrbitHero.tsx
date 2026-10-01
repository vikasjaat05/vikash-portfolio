"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Zap } from "lucide-react";
import styles from "@/app/agency/agency.module.css";

type OrbitProject = {
  slug: string;
  title: string;
  imageUrl: string;
};

type AgencyOrbitHeroProps = {
  projects: OrbitProject[];
  featured: OrbitProject;
};

const CARD_COUNT = 24;
const STEP = 360 / CARD_COUNT;

function starShadows(seed: number, count: number, blur: number, minAlpha: number, maxAlpha: number) {
  let value = seed;
  const random = () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
  return Array.from({ length: count }, () => {
    const x = (random() * 100).toFixed(2);
    const y = (random() * 100).toFixed(2);
    const alpha = (minAlpha + random() * (maxAlpha - minAlpha)).toFixed(3);
    return `${x}vw ${y}vh ${blur}px 0 rgba(255,255,255,${alpha})`;
  }).join(",");
}

const SMALL_STARS = starShadows(24, 100, 0, 0.08, 0.28);
const SOFT_STARS = starShadows(68, 19, 1.2, 0.28, 0.55);

export default function AgencyOrbitHero({ projects, featured }: AgencyOrbitHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cards = Array.from({ length: CARD_COUNT }, (_, index) => projects[index % projects.length]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | undefined;
    let previous = 0;
    let phase = -2;
    let inView = true;

    const render = (time: number) => {
      frame = undefined;
      if (!inView || document.hidden) return;
      const elapsed = previous ? Math.min((time - previous) / 1000, 0.1) : 0;
      previous = time;
      if (!reduceMotion.matches) phase -= 1.9 * elapsed;

      const phone = window.innerWidth <= 700;
      const radius = phone ? 430 : 790;
      const maxAngle = phone ? 48 : 52;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const angle = ((index * STEP + phase + 540) % 360) - 180;
        if (Math.abs(angle) > maxAngle) {
          card.style.visibility = "hidden";
          return;
        }
        const radians = angle * Math.PI / 180;
        card.style.visibility = "visible";
        card.style.transform = `translate3d(${(radius * Math.sin(radians)).toFixed(1)}px, 0, ${(radius * (1 - Math.cos(radians))).toFixed(1)}px) rotateY(${(-angle).toFixed(2)}deg)`;
        card.style.filter = `brightness(${(0.84 + Math.abs(angle) / 180).toFixed(2)})`;
        card.style.zIndex = String(100 - Math.round(Math.abs(angle)));
      });
      if (!reduceMotion.matches) frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (frame === undefined && inView && !document.hidden) frame = window.requestAnimationFrame(render);
    };
    const stop = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      previous = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    if (heroRef.current) observer.observe(heroRef.current);
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    const onMotionChange = () => { stop(); start(); };
    const onResize = () => { if (reduceMotion.matches) { stop(); start(); } };
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotion.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onResize);
    start();
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
    };
  }, [projects.length]);

  return (
    <section ref={heroRef} className={styles.orbitHero} aria-labelledby="agency-hero-title">
      <div className={styles.orbitStars} style={{ boxShadow: SMALL_STARS }} aria-hidden="true" />
      <div className={styles.orbitStars} style={{ boxShadow: SOFT_STARS }} aria-hidden="true" />
      <div className={styles.orbitAura} aria-hidden="true" />

      <div className={styles.orbitContent}>
        <div className={styles.orbitBadge}>
          <span className={styles.orbitBadgeIcon}><Zap size={15} fill="currentColor" strokeWidth={1.6} /></span>
          <span>Independent digital studio</span>
        </div>
        <h1 id="agency-hero-title" className={styles.orbitTitle}>
          <span>Digital that makes</span>
          <span>people <em>look twice.</em></span>
        </h1>
        <p className={styles.orbitSubhead}>
          <strong>Design, Shopify and web engineering</strong> for ambitious brands.<br className={styles.orbitDesktopBreak} />{" "}
          Every detail made to earn a second look.
        </p>
        <div className={styles.orbitActions}>
          <Link href="/contact" className={styles.orbitCta}><span>Start a project <ArrowUpRight size={17} /></span></Link>
          <Link href="#selected-work" className={styles.orbitTextLink}>Explore the work <ArrowDownRight size={17} /></Link>
        </div>
      </div>

      <div className={styles.orbitVisual}>
        <div className={styles.orbitRing} aria-hidden="true">
          {cards.map((project, index) => (
            <div key={`${project.slug}-${index}`} ref={(node) => { cardRefs.current[index] = node; }} className={styles.orbitCard}>
              <Image src={project.imageUrl} alt="" fill loading="lazy" sizes="(max-width: 700px) 130px, 180px" className="object-cover" />
              <span className={styles.orbitCardShade} />
              <span className={styles.orbitCardCopy}><small>VIKASH STUDIO / {String(index + 1).padStart(2, "0")}</small><strong>{project.title}</strong></span>
            </div>
          ))}
        </div>

        <Link href={`/work/web/${featured.slug}`} className={styles.orbitBrowser} aria-label={`View ${featured.title} project`}>
          <span className={styles.orbitBrowserBar}>
            <span className={styles.orbitBrowserDots}><i /><i /><i /></span>
            <span className={styles.orbitBrowserAddress}>vikash.website / work / {featured.slug}</span>
            <ArrowUpRight size={16} className={styles.orbitBrowserArrow} />
          </span>
          <span className={styles.orbitBrowserPage}>
            <Image src={featured.imageUrl} alt={`${featured.title} website preview`} fill priority sizes="(max-width: 700px) 100vw, 900px" className="object-cover object-top" />
            <span className={styles.orbitBrowserCaption}><small>Selected experience / 01</small><strong>{featured.title}</strong></span>
          </span>
        </Link>
      </div>
    </section>
  );
}
