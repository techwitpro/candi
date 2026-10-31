"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/components/providers/cart-provider";
import { menuTabs, type MenuTabId } from "@/lib/content";
import { formatPrice, getMenuItem } from "@/lib/menu-catalog";
import { menuTabPanels } from "@/lib/menu-tabs";
import { gsap } from "@/lib/gsap";

export function MenuListSection() {
  const [activeTab, setActiveTab] = useState<MenuTabId>("nigiri");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCart();

  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const displayItems = useMemo(
    () =>
      menuTabPanels[activeTab]
        .map((id) => getMenuItem(id))
        .filter((item): item is NonNullable<ReturnType<typeof getMenuItem>> => Boolean(item)),
    [activeTab]
  );

  // Initial scroll entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      headerTl.fromTo(
        tabsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.7"
      );

      if (listRef.current) {
        const rows = listRef.current.querySelectorAll(".menu-row");
        gsap.fromTo(
          rows,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate items on tab switch
  useEffect(() => {
    if (listRef.current) {
      const rows = listRef.current.querySelectorAll(".menu-row");
      gsap.fromTo(
        rows,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const handleAdd = (id: string) => {
    addItem(id, { openDrawer: false });
    setAddedId(id);
    setTimeout(() => {
      setAddedId((curr) => (curr === id ? null : curr));
    }, 1400);
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-[70px] py-16 sm:py-24"
    >
      <p
        ref={tagRef}
        className="font-label text-base sm:text-lg leading-7 tracking-[-0.8px] text-forest uppercase font-medium will-animate"
      >
        Menu
      </p>

      <div className="mt-2.5 flex flex-col gap-8 sm:gap-[43px]">
        {/* Title & Tab Bar */}
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between border-b border-forest/10 pb-6">
          <h2
            ref={titleRef}
            className="font-display text-[36px] sm:text-[46px] lg:text-[56px] uppercase leading-[1.1] sm:leading-[65px] tracking-[-0.8px] text-forest will-animate"
          >
            <span className="block overflow-hidden pb-1 -mb-1">
              <span className="line-reveal block">Sushi worth sharing</span>
            </span>
          </h2>

          <div
            ref={tabsRef}
            className="flex flex-wrap items-center gap-4 sm:gap-8 will-animate"
            role="tablist"
            aria-label="Menu categories"
          >
            {menuTabs.map((tab) => {
              const selected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative cursor-pointer py-1 font-body text-base sm:text-lg uppercase tracking-wider transition-all duration-300 ${
                    selected
                      ? "font-bold text-forest"
                      : "font-normal text-forest/65 hover:text-forest"
                  }`}
                >
                  {tab.label}
                  {selected && (
                    <span className="absolute inset-x-0 -bottom-1 h-[2px] bg-forest rounded-full transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Dish List */}
        <ul
          ref={listRef}
          role="tabpanel"
          className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-[50px] lg:gap-y-6"
          aria-live="polite"
        >
          {displayItems.length === 0 ? (
            <li className="py-8 font-body text-lg text-forest/70">
              New selections for this category are coming soon.
            </li>
          ) : null}
          {displayItems.map((item) => {
            const isJustAdded = addedId === item.id;
            return (
              <li
                key={item.id}
                className="menu-row group rounded border-b border-forest/10 pb-5 pt-2 transition-all duration-300 hover:border-forest/30 hover:bg-card/25 px-2 sm:px-3 will-animate"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                    {/* Thumbnail */}
                    <div className="relative size-[90px] sm:size-[110px] shrink-0 overflow-hidden bg-card shadow-sm transition-transform duration-500 ease-out group-hover:scale-108 group-hover:shadow-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90px, 110px"
                      />
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <p className="font-display text-[18px] sm:text-[22px] uppercase leading-7 sm:leading-8 tracking-[-0.8px] text-forest transition-transform duration-300 group-hover:translate-x-1">
                        {item.name}
                      </p>
                      {item.description ? (
                        <p className="font-body text-sm sm:text-base leading-6 text-forest/75 mt-0.5">
                          {item.description}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => handleAdd(item.id)}
                        className={`mt-2 cursor-pointer font-body text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                          isJustAdded
                            ? "bg-forest text-cream font-bold px-2 py-0.5 rounded scale-105"
                            : "text-forest underline underline-offset-4 hover:text-forest/70 active:scale-95"
                        }`}
                      >
                        {isJustAdded ? "✓ Added to Bag" : "Add to Bag"}
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="shrink-0 font-body text-base sm:text-lg font-semibold leading-7 tracking-[-0.8px] text-forest">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
