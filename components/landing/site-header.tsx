"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { navLinks } from "@/lib/content";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

export function SiteHeader() {
  const { count, toggleCart, isOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);
  const headerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const bagIconRef = useRef<HTMLButtonElement>(null);
  const prevCountRef = useRef(count);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Creative Staggered Header Entrance
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );

      if (navContainerRef.current) {
        const navItems = navContainerRef.current.querySelectorAll(".nav-item");
        tl.fromTo(
          navItems,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          "-=0.5"
        );
      }
    }, headerRef);

    // Active section tracking with IntersectionObserver
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.4, 0.7] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  // Satisfying bounce on bag icon when an item is added
  useEffect(() => {
    if (count > prevCountRef.current && bagIconRef.current) {
      gsap.fromTo(
        bagIconRef.current,
        { scale: 0.85, rotate: -12 },
        { scale: 1, rotate: 0, duration: 0.45, ease: "back.out(2.5)" }
      );
    }
    prevCountRef.current = count;
  }, [count]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out will-animate ${
        scrolled
          ? "bg-forest/95 py-3.5 shadow-xl shadow-black/30 backdrop-blur-md border-b border-white/10"
          : "bg-transparent py-6 sm:py-8"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-12 lg:px-[73px]">
        {/* Brand Logo matching Figma */}
        <Link
          href="#start"
          className="relative block h-[34px] sm:h-[39px] w-[130px] sm:w-[154px] shrink-0 transition-transform duration-300 hover:scale-[1.03] active:scale-95"
          aria-label="Candi Home"
        >
          <Image
            src={images.logo}
            alt="Candi"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Right Navigation & Actions */}
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-[36px]">
          <nav
            ref={navContainerRef}
            className="hidden items-center gap-6 sm:gap-8 lg:gap-[32px] font-body text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-cream lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const isCurrent = active === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-item relative py-1 transition-colors duration-200 hover:text-lime ${
                    isCurrent ? "text-cream" : "text-cream/80"
                  }`}
                >
                  {link.label}
                  {isCurrent && (
                    <span className="absolute inset-x-0 -bottom-1 h-px bg-cream transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Shopping Bag Icon with Lime Circular Indicator */}
          <button
            ref={bagIconRef}
            type="button"
            onClick={toggleCart}
            aria-expanded={isOpen}
            aria-label={`Open shopping bag, ${count} items`}
            className="group relative flex size-9 cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <span className="relative block size-[18px]">
              <Image src={images.cart} alt="" fill aria-hidden className="object-contain" />
            </span>
            {/* Lime Circular Dot Badge matching Figma */}
            <span
              className={`absolute top-0 right-0 size-2.5 rounded-full transition-transform duration-300 ${
                count > 0
                  ? "bg-lime ring-2 ring-forest scale-100 animate-pulse-soft"
                  : "bg-lime scale-90"
              }`}
            />
          </button>

          {/* Rectangular "BOOK NOW" Button matching Figma */}
          <Link
            href="#connect"
            className="group relative inline-flex items-center justify-center overflow-hidden bg-cream px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[13px] font-bold uppercase tracking-[0.15em] text-forest rounded-none transition-all duration-300 hover:bg-cream/90 hover:shadow-lg active:scale-95"
          >
            <span className="relative z-10">BOOK NOW</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
