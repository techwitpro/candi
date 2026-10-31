"use client";

import React, { FormEvent, useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button-link";
import { navLinks } from "@/lib/content";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const middleRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      if (topRowRef.current) {
        tl.fromTo(
          topRowRef.current.children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" }
        );
      }

      if (middleRowRef.current) {
        tl.fromTo(
          middleRowRef.current.children,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const onNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-forest px-6 sm:px-12 lg:px-[55px] pt-16 sm:pt-[100px] text-cream"
    >
      <div className="mx-auto max-w-[1330px] px-0 sm:px-[15px]">
        {/* Top Header Row */}
        <div
          ref={topRowRef}
          className="flex flex-col gap-8 pb-10 sm:pb-[50px] lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-[25px] flex-1 will-animate">
            <Link
              href="#start"
              className="relative block h-[39px] w-[154px] shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <Image src={images.logo} alt="Candi" fill className="object-contain" />
            </Link>
            <div className="border-l-0 sm:border-l border-white/20 pl-0 sm:pl-[25px]">
              <p className="max-w-[390px] font-body text-sm sm:text-base leading-6 text-cream/80">
                Fresh fish and bright produce meet careful craft in every dish. Our kitchen pairs
                bold flavors with a welcoming dining experience.
              </p>
            </div>
          </div>

          <h2 className="flex-1 lg:pl-10 font-display text-[26px] sm:text-[32px] lg:text-[36px] uppercase leading-tight sm:leading-[46px] tracking-[-0.8px] text-ivory will-animate">
            Savor bright seas, one sushi roll at a time
          </h2>
        </div>

        {/* Middle Columns Row */}
        <div
          ref={middleRowRef}
          className="flex flex-col gap-10 border-y border-white/15 py-12 sm:py-[70px] lg:flex-row lg:gap-[40px]"
        >
          {/* Newsletter Form */}
          <div className="flex flex-1 flex-col gap-4 will-animate">
            <h3 className="font-display text-xl sm:text-[24px] uppercase leading-8 tracking-[-0.8px] text-ivory">
              Sushi news, sent right to inbox
            </h3>
            <form onSubmit={onNewsletterSubmit} className="flex max-w-[527px] flex-col gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email goes here"
                className="border-b border-white/40 bg-transparent px-1 pb-3 pt-2 font-body text-sm sm:text-base text-cream placeholder:text-cream/50 outline-none transition-colors duration-200 focus:border-lime"
              />
              <label className="flex items-center gap-2.5 font-body text-xs sm:text-sm text-cream/80 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="size-4 accent-lime cursor-pointer rounded"
                />
                Yes, send me culinary updates & private tasting invitations.
              </label>
              <Button
                type="submit"
                variant="lime"
                className="w-fit bg-lime px-6 py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-forest rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md"
              >
                Join today
              </Button>
              {subscribed && (
                <p className="font-body text-sm text-lime animate-pulse-soft" role="status">
                  ✓ You are on the VIP guest list. Arigato!
                </p>
              )}
            </form>
          </div>

          {/* Links & Information Columns */}
          <div className="grid flex-[2] grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-[30px] will-animate">
            <FooterColumn title="Explore">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-lime"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="#dishes" className="transition-colors duration-200 hover:text-lime">
                Menu Catalog
              </Link>
            </FooterColumn>

            <FooterColumn title="Reach us">
              <p className="text-cream/80">
                256th North Neusvill Avenue,
                <br />
                Suite 47, Canggu
                <br />
                Bali, ID 80361
              </p>
              <p className="text-cream/90 hover:text-lime transition-colors">sushi@candi.restaurant</p>
              <p className="text-lime font-medium">+1 (003) 563-7585</p>
            </FooterColumn>

            <FooterColumn title="Service hours">
              <p className="text-cream/80">Mon – Thu: 11:30 AM – 9:30 PM</p>
              <p className="text-cream/80">Fri – Sat: 11:30 AM – 10:30 PM</p>
              <p className="text-cream/80">Sun: 12:00 PM – 9:00 PM</p>
              <div className="mt-3 flex gap-3">
                {[
                  { href: "#", icon: images.socialFb, label: "Facebook" },
                  { href: "#", icon: images.socialTw, label: "Twitter" },
                  { href: "#", icon: images.socialIn, label: "LinkedIn" },
                  { href: "#", icon: images.socialBe, label: "Behance" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-[36px] items-center justify-center rounded-full border border-white/30 transition-all duration-300 hover:border-lime hover:bg-lime/20 hover:scale-115 active:scale-90"
                  >
                    <Image src={social.icon} alt="" width={16} height={16} />
                  </a>
                ))}
              </div>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 font-body text-xs sm:text-sm text-cream/60">
          <p>© 2026 CANDI Japanese Fine Dining. All rights reserved.</p>
          <p className="text-cream/40">Crafted with precision & passion.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-base sm:text-lg font-semibold uppercase tracking-wider text-ivory">
        {title}
      </h3>
      <div className="flex flex-col gap-2 font-body text-sm leading-relaxed text-cream/80">
        {children}
      </div>
    </div>
  );
}
