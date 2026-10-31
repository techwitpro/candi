"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/content";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

const SLIDE_MS = 6500;

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const quoteContainerRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const testimonial = testimonials[index];
  const nextIndex = (index + 1) % testimonials.length;

  const animateSlide = useCallback((dir: 1 | -1) => {
    if (quoteContainerRef.current) {
      gsap.fromTo(
        quoteContainerRef.current,
        { opacity: 0, x: dir * 32, filter: "blur(4px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" }
      );
    }
    if (portraitRef.current) {
      gsap.fromTo(
        portraitRef.current.querySelector(".active-portrait"),
        { opacity: 0.5, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" }
      );
    }
  }, []);

  const goPrev = () => {
    const prev = (index - 1 + testimonials.length) % testimonials.length;
    setIndex(prev);
    animateSlide(-1);
  };

  const goNext = useCallback(() => {
    const next = (index + 1) % testimonials.length;
    setIndex(next);
    animateSlide(1);
  }, [index, animateSlide]);

  // Initial scroll entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        titleRef.current?.querySelectorAll(".line-reveal") || [],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, ease: "power4.out" },
        "-=0.4"
      );

      if (portraitRef.current) {
        gsap.to(portraitRef.current.querySelector(".active-portrait"), {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goNext, SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused, goNext]);

  return (
    <section
      ref={sectionRef}
      aria-label="Guest testimonials"
      className="w-full bg-cream py-16 sm:py-[100px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-12 lg:px-[70px]">
        {/* Floating background preview portrait (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-40px] top-1/2 z-0 hidden h-[447px] w-[380px] -translate-y-1/2 overflow-hidden opacity-25 blur-[1px] xl:block"
        >
          <Image
            src={testimonials[nextIndex].image}
            alt=""
            fill
            className="object-cover"
            sizes="380px"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-[60px]">
          {/* Main Active Portrait */}
          <div
            ref={portraitRef}
            className="group relative h-[320px] sm:h-[447px] w-full max-w-[442px] shrink-0 overflow-hidden bg-forest/5 shadow-2xl shadow-forest/10 will-animate"
          >
            <div className="active-portrait relative size-full will-animate">
              <Image
                key={index}
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                sizes="(max-width: 640px) 100vw, 442px"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent" />
          </div>

          {/* Testimonial Quote & Info */}
          <div className="w-full max-w-[622px] shrink-0">
            <p
              ref={tagRef}
              className="font-label text-base sm:text-lg tracking-[-0.8px] leading-7 text-forest uppercase font-medium will-animate"
            >
              Reviews
            </p>

            <h2
              ref={titleRef}
              className="font-display mt-1 text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.1] sm:leading-[65px] tracking-[-0.8px] uppercase text-forest will-animate"
            >
              <span className="block overflow-hidden pb-1 -mb-1">
                <span className="line-reveal block">Notes from our guests</span>
              </span>
            </h2>

            <div ref={quoteContainerRef} className="mt-6 sm:mt-8 flex flex-col gap-6 sm:gap-[30px] will-animate">
              {/* Quotes Icon */}
              <div className="relative size-[44px] sm:size-[51px] opacity-80">
                <Image src={images.quotes} alt="" fill aria-hidden className="object-contain" />
              </div>

              {/* Quote text */}
              <blockquote className="min-h-[100px] font-body text-[20px] sm:text-[24px] lg:text-[26px] italic leading-8 sm:leading-9 text-forest">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-base sm:text-lg font-semibold uppercase tracking-wider text-forest">
                  {testimonial.name}
                </p>
                <span className="h-4 w-px bg-forest/20" aria-hidden />
                <p className="font-body text-sm sm:text-base text-forest/75">{testimonial.role}</p>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-2 pt-2" aria-hidden>
                {testimonials.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={() => {
                      const dir = dotIndex > index ? 1 : -1;
                      setIndex(dotIndex);
                      animateSlide(dir);
                    }}
                    aria-label={`Go to slide ${dotIndex + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                      dotIndex === index ? "w-8 bg-forest" : "w-2 bg-forest/25 hover:bg-forest/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="flex w-[110px] shrink-0 items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="flex size-[50px] cursor-pointer items-center justify-center border border-forest/20 bg-ivory shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-forest active:translate-y-0 active:scale-90"
            >
              <Image
                src={images.arrowPrev}
                alt=""
                width={18}
                height={18}
                className="-scale-y-100"
              />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="flex size-[50px] cursor-pointer items-center justify-center border border-forest/20 bg-ivory shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-forest active:translate-y-0 active:scale-90"
            >
              <Image
                src={images.arrowNext}
                alt=""
                width={18}
                height={18}
                className="-scale-y-100"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
