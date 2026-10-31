"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/content";
import { gsap } from "@/lib/gsap";

const imageHeights = [319, 406, 319] as const;

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header sequence
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      headerTl.fromTo(
        tagRef.current,
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );

      headerTl.fromTo(
        titleRef.current?.querySelectorAll(".line-reveal") || [],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "power4.out" },
        "-=0.4"
      );

      headerTl.fromTo(
        btnRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.7"
      );

      // 2. Blog cards staggered cascade
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".blog-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.95,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Center card subtle parallax drift
        const centerCard = cards[1];
        if (centerCard) {
          gsap.to(centerCard, {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-[1440px] bg-cream px-6 sm:px-12 lg:px-[55px] py-16 sm:py-[100px]"
    >
      <div className="mx-auto flex max-w-[1330px] flex-col gap-10 sm:gap-[45px] px-0 sm:px-[15px]">
        {/* Header Row */}
        <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-[8fr_4fr]">
          <div>
            <p
              ref={tagRef}
              className="font-label text-base sm:text-lg leading-7 tracking-[-0.8px] text-forest uppercase font-medium will-animate"
            >
              Journal
            </p>

            <h2
              ref={titleRef}
              className="font-display mt-1 text-[36px] sm:text-[46px] lg:text-[56px] uppercase leading-[1.1] sm:leading-[65px] tracking-[-0.8px] text-forest will-animate"
            >
              <span className="block overflow-hidden pb-1 -mb-1">
                <span className="line-reveal block">Sushi kitchen stories</span>
              </span>
            </h2>
          </div>

          <div ref={btnRef} className="flex justify-start lg:justify-end will-animate">
            <Link
              href="#connect"
              className="group inline-flex items-center justify-center border border-forest/25 px-6 sm:px-[25px] py-2.5 font-body text-sm sm:text-base uppercase tracking-wider leading-[26px] text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream hover:scale-[1.03] active:scale-95"
            >
              <span>Read more</span>
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* 3 Blog Cards */}
        <ul
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-3"
        >
          {blogPosts.map((post, index) => (
            <li key={post.title} className="blog-card min-w-0 will-animate">
              <Link href="#connect" className="group block">
                {/* Image Container with Zoom & Shadow */}
                <div
                  className="relative overflow-hidden bg-forest/5 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:ring-1 group-hover:ring-forest/20"
                  style={{ height: `${imageHeights[index]}px` }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5 pt-5">
                  <div className="flex items-center gap-2.5 font-body text-xs sm:text-sm uppercase tracking-wider text-forest/70">
                    <span>{post.date}</span>
                    <span className="text-base">|</span>
                    <span className="font-semibold text-forest">{post.category}</span>
                  </div>
                  <h3 className="font-display text-[22px] sm:text-[26px] leading-8 sm:leading-9 tracking-tight text-forest transition-colors duration-300 group-hover:text-forest/75">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
