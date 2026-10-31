"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { storyHours } from "@/lib/content";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageWrapperRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const hoursTitleRef = useRef<HTMLHeadingElement>(null);
  const hoursListRef = useRef<HTMLDivElement>(null);
  const hoursImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Main Left Image Entrance & Parallax
      if (mainImageWrapperRef.current && mainImageRef.current) {
        gsap.fromTo(
          mainImageWrapperRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mainImageWrapperRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          mainImageRef.current,
          { scale: 1.12 },
          {
            scale: 1.0,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mainImageWrapperRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );

        // Continuous parallax scrub on scroll
        gsap.to(mainImageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: mainImageWrapperRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // 2. Right Column Headline & Narrative Sequence
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      });

      storyTl.fromTo(
        tagRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      storyTl.fromTo(
        titleRef.current?.querySelectorAll(".line-reveal") || [],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.1, ease: "power4.out" },
        "-=0.4"
      );

      storyTl.fromTo(
        textRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      storyTl.fromTo(
        btnRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.6)" },
        "-=0.6"
      );

      // 3. Lower Service Hours Block & Secondary Image
      const hoursTl = gsap.timeline({
        scrollTrigger: {
          trigger: hoursTitleRef.current,
          start: "top 88%",
          once: true,
        },
      });

      hoursTl.fromTo(
        hoursTitleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      if (hoursListRef.current) {
        hoursTl.fromTo(
          hoursListRef.current.children,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (hoursImageRef.current) {
        hoursTl.fromTo(
          hoursImageRef.current,
          { opacity: 0, y: 24, scale: 1.06 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "power3.out" },
          "-=0.7"
        );

        gsap.to(hoursImageRef.current.querySelector("img"), {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: hoursImageRef.current,
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
      id="story"
      ref={sectionRef}
      className="mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-[70px] pb-14 sm:pb-[70px] pt-16 sm:pt-[100px]"
    >
      <div className="flex flex-col items-center gap-10 lg:gap-[50px] xl:flex-row xl:items-center xl:justify-center">
        {/* Left Column: Big Atmospheric Story Image */}
        <div
          ref={mainImageWrapperRef}
          className="group relative h-[420px] sm:h-[520px] xl:h-[612px] w-full max-w-[625px] shrink-0 overflow-hidden bg-forest/5 shadow-2xl shadow-forest/10 will-animate"
        >
          <div ref={mainImageRef} className="relative size-full will-animate">
            <Image
              src={images.storyMain}
              alt="Artisanal sushi rolls with soy sauce and chopsticks"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1440px) 50vw, 625px"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-20" />
        </div>

        {/* Right Column: Story Narrative & Service Hours */}
        <div className="flex w-full max-w-[625px] flex-col justify-between self-stretch">
          <div>
            <p
              ref={tagRef}
              className="font-label text-base sm:text-lg tracking-[-0.02em] leading-7 text-forest uppercase font-medium will-animate"
            >
              Story
            </p>

            <h2
              ref={titleRef}
              className="font-display mt-2 text-[38px] sm:text-[48px] xl:text-[56px] leading-[1.08] sm:leading-[58px] xl:leading-[65px] tracking-[-0.8px] uppercase text-forest will-animate"
            >
              <span className="block overflow-hidden pb-1 -mb-1">
                <span className="line-reveal block">The craft of sushi</span>
              </span>
              <span className="block overflow-hidden pb-1 -mb-1">
                <span className="line-reveal block">& Asian cuisine</span>
              </span>
            </h2>

            <p
              ref={textRef}
              className="mt-5 font-body text-base sm:text-lg leading-7 sm:leading-8 text-forest text-pretty will-animate"
            >
              Every plate pairs seafood with bold flavors, prepared with care, balance, and a
              modern spirit. Inspired by Japan’s culinary heritage, our chefs create delicious
              dishes for guests to enjoy.
            </p>

            <div ref={btnRef} className="mt-6 sm:mt-7 will-animate">
              <Link
                href="#explore"
                className="group relative inline-flex items-center justify-center overflow-hidden bg-forest px-8 py-3 text-sm font-semibold uppercase tracking-wider text-cream transition-all duration-300 hover:bg-forest/90 hover:scale-[1.03] active:scale-95 shadow-md"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">Our story</span>
              </Link>
            </div>
          </div>

          {/* Lower Hours & Secondary Image */}
          <div className="mt-10 sm:mt-[50px] grid grid-cols-1 gap-6 sm:grid-cols-[7fr_5fr] sm:gap-x-6 items-center">
            <div className="flex flex-col gap-2">
              <h3
                ref={hoursTitleRef}
                className="font-display text-xl sm:text-2xl leading-[34px] tracking-[-0.8px] text-forest font-semibold uppercase will-animate"
              >
                Service hours
              </h3>
              <div ref={hoursListRef} className="flex flex-col gap-1 will-animate">
                {storyHours.map((line) => (
                  <p
                    key={line}
                    className="font-body text-sm sm:text-base leading-6 text-forest"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div
              ref={hoursImageRef}
              className="group relative h-[180px] sm:h-[220px] overflow-hidden bg-forest/5 shadow-md will-animate"
            >
              <Image
                src={images.storyHours}
                alt="Chef nigiri selection"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
