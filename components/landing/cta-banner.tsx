"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        titleRef.current?.querySelectorAll(".line-reveal") || [],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" }
      );

      tl.fromTo(
        btnRef.current,
        { y: 28, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6"
      );

      // 2. Parallax scrub on background
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
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
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 sm:px-12 lg:px-[55px] py-20 sm:py-[130px] bg-forest-deep"
    >
      {/* Background Media with Parallax Scrub */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div ref={bgImageRef} className="relative size-full scale-[1.14] will-animate">
          <Image
            src={images.ctaBanner}
            alt="Chef crafting fresh sushi rolls"
            fill
            className="object-cover object-left"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/60 to-forest-deep/85" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1330px] pl-0 xl:pl-[301px]">
        <div className="ml-auto flex max-w-[1014px] flex-col items-start sm:items-end gap-6 sm:gap-[30px] text-left sm:text-right">
          <h2
            ref={titleRef}
            className="font-display text-[38px] sm:text-[54px] md:text-[68px] lg:text-[88px] uppercase leading-[1.05] sm:leading-[1.1] tracking-[-0.02em] text-ivory will-animate"
          >
            <span className="block overflow-hidden pb-2 -mb-2">
              <span className="line-reveal block">Sushi favorites</span>
            </span>
            <span className="block overflow-hidden pb-2 -mb-2">
              <span className="line-reveal block">made just for you</span>
            </span>
          </h2>

          <div ref={btnRef} className="will-animate">
            <Link
              href="#connect"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-lime px-8 sm:px-[38px] py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-forest rounded-none transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-xl shadow-black/30"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">Reserve your table</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
