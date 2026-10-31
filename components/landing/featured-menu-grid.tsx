"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/providers/cart-provider";
import { featuredDishes } from "@/lib/content";
import { formatPrice } from "@/lib/menu-catalog";
import { gsap } from "@/lib/gsap";

export function FeaturedMenuGrid() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

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
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      headerTl.fromTo(
        titleRef.current?.querySelectorAll(".line-reveal") || [],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "power4.out" },
        "-=0.4"
      );

      // 2. Dish cards staggered cascade
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".dish-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 55, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = (id: string) => {
    addItem(id);
    setAddedId(id);
    setTimeout(() => {
      setAddedId((curr) => (curr === id ? null : curr));
    }, 1500);
  };

  return (
    <section
      id="dishes"
      ref={sectionRef}
      className="w-full bg-forest px-6 sm:px-12 lg:px-[55px] py-16 sm:py-[100px]"
    >
      <div className="mx-auto flex max-w-[1330px] flex-col gap-10 sm:gap-14 px-0 sm:px-[15px]">
        {/* Centered Editorial Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <p
            ref={tagRef}
            className="font-label text-base sm:text-lg tracking-[-0.8px] leading-7 text-white uppercase font-medium will-animate"
          >
            Menu
          </p>

          <h2
            ref={titleRef}
            className="font-display text-[38px] sm:text-[50px] lg:text-[56px] leading-[1.1] sm:leading-[65px] tracking-[-0.8px] uppercase text-white will-animate"
          >
            <span className="block overflow-hidden pb-2 -mb-2">
              <span className="line-reveal block">Sushi worth sharing</span>
            </span>
          </h2>
        </div>

        {/* 6 Dishes Grid */}
        <ul
          ref={gridRef}
          className="grid grid-cols-1 gap-6 sm:gap-[30px] md:grid-cols-2 xl:grid-cols-3"
        >
          {featuredDishes.map((dish) => {
            const isJustAdded = addedId === dish.id;
            return (
              <li key={dish.id} className="dish-card will-animate">
                <article className="group relative flex h-full flex-col justify-between border border-white/10 bg-card p-5 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40">
                  <div className="pb-8 sm:pb-[45px]">
                    <h3 className="font-display text-[22px] sm:text-[26px] uppercase leading-8 sm:leading-9 tracking-[-0.8px] text-forest transition-colors duration-300 group-hover:text-forest/80">
                      {dish.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      {/* Interactive Add to Bag Button */}
                      <button
                        type="button"
                        onClick={() => handleAdd(dish.id)}
                        className={`cursor-pointer font-body text-sm sm:text-base uppercase tracking-wider transition-all duration-300 underline underline-offset-4 ${
                          isJustAdded
                            ? "text-forest-deep font-bold scale-105 no-underline bg-lime px-2 py-0.5 rounded-sm"
                            : "text-forest hover:text-forest/70 active:scale-95"
                        }`}
                      >
                        {isJustAdded ? "✓ Added to Bag" : "Add to Bag"}
                      </button>

                      <p className="font-body text-base sm:text-lg font-semibold leading-7 text-forest">
                        {formatPrice(dish.price)}
                      </p>
                    </div>
                  </div>

                  {/* Dish Image Container with Zoom Effect */}
                  <div className="relative h-[280px] sm:h-[340px] xl:h-[367px] w-full overflow-hidden bg-forest/5">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
