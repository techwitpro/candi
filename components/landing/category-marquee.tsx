"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryItems } from "@/lib/content";
import { gsap } from "@/lib/gsap";

const rows = [
  { items: [categoryItems[0], categoryItems[1]], justify: "justify-center" },
  { items: [categoryItems[2], categoryItems[3]], justify: "justify-center" },
  { items: [categoryItems[4]], justify: "justify-center" },
];

export function CategoryMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validRows = rowsRef.current.filter(Boolean);
      if (validRows.length > 0) {
        gsap.fromTo(
          validRows,
          { opacity: 0, y: 55, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            stagger: 0.16,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explore"
      ref={sectionRef}
      aria-label="Menu categories"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 sm:gap-[32px] overflow-x-clip px-6 sm:px-12 lg:px-[70px] pb-16 sm:pb-[100px] pt-8 sm:pt-[50px]"
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          ref={(el) => {
            if (el) rowsRef.current[rowIndex] = el;
          }}
          className={`flex w-full flex-wrap items-center gap-x-6 sm:gap-x-[30px] gap-y-4 will-animate ${row.justify}`}
        >
          {row.items.map((item) => {
            const isHovered = hoveredName === item.name;
            const hasHover = hoveredName !== null;
            const isFaded = hasHover && !isHovered;

            return (
              <Link
                key={item.name}
                href="#dishes"
                onMouseEnter={() => setHoveredName(item.name)}
                onMouseLeave={() => setHoveredName(null)}
                className={`group flex min-w-0 items-center gap-4 sm:gap-5 transition-all duration-500 ease-out ${
                  isFaded ? "opacity-35 scale-[0.98]" : "opacity-100 scale-100"
                } ${isHovered ? "scale-[1.03]" : ""}`}
              >
                <span className="font-display text-[36px] sm:text-[54px] md:text-[68px] lg:text-[80px] uppercase leading-[0.95] tracking-[-0.03em] text-forest transition-colors duration-300 group-hover:text-forest/80">
                  {item.name}
                </span>

                <div className="relative h-[65px] sm:h-[85px] lg:h-[100px] w-[110px] sm:w-[150px] lg:w-[201px] shrink-0 overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-lime">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                    sizes="(max-width: 768px) 150px, 201px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-lime/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </section>
  );
}
