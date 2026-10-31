"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

export function GalleryStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  // Repeat for continuous infinite ticker
  const slides = [...images.gallery, ...images.gallery, ...images.gallery];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Culinary gallery"
      className="w-full overflow-hidden bg-cream py-6 sm:py-10 will-animate"
    >
      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur vignettes */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent" />

        {/* Continuous Looping Ribbon with Hover Pause */}
        <div className="animate-marquee-slow flex w-max gap-3 sm:gap-4 hover:[animation-play-state:paused]">
          {slides.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative h-[360px] sm:h-[440px] lg:h-[480px] w-[280px] sm:w-[340px] lg:w-[372px] shrink-0 overflow-hidden bg-forest/5 shadow-md transition-all duration-500 hover:shadow-2xl"
            >
              <Image
                src={src}
                alt="Sushi culinary craft"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 372px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
