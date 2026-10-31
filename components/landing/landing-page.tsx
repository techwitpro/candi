"use client";

import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import { SiteHeader } from "@/components/landing/site-header";
import { HeroSection } from "@/components/landing/hero-section";
import { StorySection } from "@/components/landing/story-section";
import { CategoryMarquee } from "@/components/landing/category-marquee";
import { FeaturedMenuGrid } from "@/components/landing/featured-menu-grid";
import { CtaBanner } from "@/components/landing/cta-banner";
import { MenuListSection } from "@/components/landing/menu-list-section";
import { GalleryStrip } from "@/components/landing/gallery-strip";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { BlogSection } from "@/components/landing/blog-section";
import { ReservationSection } from "@/components/landing/reservation-section";
import { SiteFooter } from "@/components/landing/site-footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartToast } from "@/components/cart/cart-toast";

export function LandingPage() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-cream text-forest selection:bg-lime selection:text-forest-deep">
        <SiteHeader />
        <main id="main-content" className="w-full overflow-x-clip bg-cream">
          <HeroSection />
          <StorySection />
          <CategoryMarquee />
          <FeaturedMenuGrid />
          <CtaBanner />
          <MenuListSection />
          <GalleryStrip />
          <TestimonialsSection />
          <BlogSection />
          <ReservationSection />
        </main>
        <SiteFooter />
        <CartDrawer />
        <CartToast />
      </div>
    </SmoothScroll>
  );
}
