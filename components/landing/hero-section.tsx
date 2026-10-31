"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

const HERO_LINES = [
  "THE CRAFT",
  "OF SUSHI",
  "& ASIAN",
  "CUISINE",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Cinematic Background Image Zoom & Settle
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.1, opacity: 0.85 },
        { scale: 1.0, opacity: 1, duration: 1.6, ease: "power2.out" },
        0
      );

      // 2. Kinetic Masked Multi-Line Headline Reveal
      if (linesRef.current) {
        const lineInners = linesRef.current.querySelectorAll(".hero-line-inner");
        tl.fromTo(
          lineInners,
          { yPercent: 120, rotateX: 18, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.2
        );
      }

      // 3. Elastic entrance on "RESERVE NOW" button
      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { y: 30, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "back.out(1.7)" },
          "-=0.6"
        );
      }

      // 4. Parallax Scroll: Background image subtle scrub
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // Dual-depth text drift
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -8,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="start"
      ref={sectionRef}
      className="relative h-[704px] w-full overflow-hidden bg-[#0e1711]"
    >
      {/* Background Media: -scale-x-100 places the sushi platter on the right and dark slate on the left */}
      <div className="absolute inset-0 overflow-hidden will-animate">
        <div ref={bgImageRef} className="relative size-full will-animate">
          {/* Inner flip container so GSAP transform on bgImageRef doesn't reset the horizontal flip */}
          <div className="relative size-full -scale-x-100">
            <Image
              src={images.hero}
              alt="The craft of sushi & Asian cuisine"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1440px) 100vw, 1440px"
            />
          </div>
        </div>
      </div>

      {/* NO overlay on the right side! Only a soft fade strictly on the far-left behind the text */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-[50%] lg:w-[42%] bg-gradient-to-r from-forest/40 to-transparent" />

      {/* Hero Content Container matching exact Figma specs: max-width 1440px, padding 73px, top 132px */}
      <div
        ref={contentRef}
        className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 sm:px-12 lg:px-[73px] pt-[100px] sm:pt-[120px] will-animate"
      >
        <div className="flex max-w-[561px] flex-col items-start gap-8 sm:gap-[42px]">
          {/* Monumental 4-Line Headline matching Figma: Cinzel 96px, 82.67px leading, -0.97px tracking */}
          <h1
            ref={linesRef}
            className="font-display flex flex-col font-bold uppercase tracking-[-0.97px] text-cream"
          >
            {HERO_LINES.map((line) => (
              <span
                key={line}
                className="block overflow-hidden pb-1 -mb-1 sm:pb-2 sm:-mb-2"
              >
                <span className="hero-line-inner block will-animate text-[52px] sm:text-[72px] md:text-[84px] lg:text-[96px] leading-[0.88] sm:leading-[82.67px]">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* Rectangular "RESERVE NOW" Button matching Figma: px-66px, py-2.5, sharp corners */}
          <div ref={btnRef} className="will-animate">
            <Link
              href="#connect"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-cream px-10 sm:px-[66px] py-3 sm:py-2.5 text-sm sm:text-base font-semibold leading-6 uppercase tracking-wider text-forest rounded-none transition-all duration-300 hover:bg-cream/90 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/40 active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">RESERVE NOW</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
