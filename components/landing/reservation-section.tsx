"use client";

import React, { FormEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { reservationHours } from "@/lib/content";
import { images } from "@/lib/images";
import { gsap } from "@/lib/gsap";

type FormState = {
  name: string;
  phone: string;
  day: string;
  hour: string;
  guests: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  day: "",
  hour: "",
  guests: "2 Guests",
  email: "",
};

export function ReservationSection() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const asideImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Form card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. Right aside column entrance
      if (asideRef.current) {
        gsap.fromTo(
          asideRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: asideRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 3. Aside Image Parallax Scrub
      if (asideImageRef.current) {
        gsap.to(asideImageRef.current.querySelector("img"), {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: asideImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim()) next.phone = "Please enter a contact number.";
    if (!form.day.trim()) next.day = "Please enter your preferred day.";
    if (!form.hour) next.hour = "Please choose an hour.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 sm:gap-16 px-6 sm:px-12 lg:px-[70px] py-16 sm:py-[100px] xl:flex-row xl:items-center xl:gap-[126px]"
    >
      {/* Reservation Form Card */}
      <div ref={cardRef} className="relative w-full max-w-[758px] shrink-0 will-animate">
        <div className="relative min-h-[560px] overflow-hidden rounded-none px-6 sm:px-[70px] py-10 sm:py-[50px] shadow-2xl shadow-forest/30 border border-white/10">
          {/* Card background image with dark overlay */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="relative size-full">
              <Image
                src={images.reservationBg}
                alt=""
                fill
                className="object-cover opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-ink/90" />
          </div>

          <SectionHeading
            label="Reserve"
            title="Save your seat now"
            align="center"
            light
            className="relative z-10 [&_h2]:text-ivory [&_p]:text-lime"
          />

          {/* Decorative motif */}
          <div className="pointer-events-none absolute bottom-[-25px] left-[15%] right-[15%] aspect-[421/147] opacity-60">
            <Image src={images.reservationDeco} alt="" fill className="object-contain" />
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="relative z-10 mt-8 sm:mt-[30px]" noValidate>
            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              <Field
                label="Enter your name"
                value={form.name}
                error={errors.name}
                onChange={(value) => setForm((f) => ({ ...f, name: value }))}
              />
              <Field
                label="Contact number"
                value={form.phone}
                error={errors.phone}
                onChange={(value) => setForm((f) => ({ ...f, phone: value }))}
              />
            </div>

            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-3">
              <Field
                label="Day"
                value={form.day}
                error={errors.day}
                placeholder="Day (e.g. Tomorrow)"
                onChange={(value) => setForm((f) => ({ ...f, day: value }))}
              />
              <SelectField
                label="Hour"
                value={form.hour}
                error={errors.hour}
                placeholder="Choose Hour"
                options={["5:30 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "9:30 PM"]}
                onChange={(value) => setForm((f) => ({ ...f, hour: value }))}
              />
              <SelectField
                label="Guests"
                value={form.guests}
                options={["1 Guest", "2 Guests", "3 Guests", "4 Guests", "5+ Guests (Party)"]}
                onChange={(value) => setForm((f) => ({ ...f, guests: value }))}
              />
            </div>

            <Field
              label="Your email here"
              value={form.email}
              error={errors.email}
              onChange={(value) => setForm((f) => ({ ...f, email: value }))}
              type="email"
            />

            <div className="pt-6 sm:pt-[25px]">
              <Button
                type="submit"
                variant="cream"
                className="w-full bg-white py-3.5 text-ink font-bold tracking-widest uppercase transition-all duration-300 hover:bg-cream hover:scale-[1.01] active:scale-98 shadow-lg"
              >
                Send Reservation
              </Button>
            </div>

            {submitted && (
              <div
                className="mt-4 rounded-none bg-lime/20 border border-lime/40 px-4 py-2.5 text-center font-body text-sm text-lime animate-pulse-soft"
                role="status"
              >
                ✓ Thank you — your reservation request has been received. We will confirm shortly.
              </div>
            )}
          </form>
        </div>

        {/* Floating Botanical Leaf Decor */}
        <div
          ref={leafRef}
          className="pointer-events-none absolute bottom-[-35px] left-[-20px] hidden sm:flex size-[140px] items-center justify-center animate-float will-animate"
        >
          <div className="relative size-full -rotate-[165deg]">
            <Image
              src={images.reservationLeaf}
              alt=""
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Aside: Location & Timings */}
      <aside ref={asideRef} className="flex w-full max-w-[415px] flex-col items-center gap-8 sm:gap-10 will-animate">
        <div
          ref={asideImageRef}
          className="group relative h-[200px] sm:h-[220px] w-full overflow-hidden rounded-none bg-forest/5 shadow-md will-animate"
        >
          <Image
            src={images.contact1}
            alt="Intimate dining atmosphere at Candi"
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            sizes="(max-width: 640px) 100vw, 415px"
          />
        </div>

        <div className="flex w-full max-w-[343px] flex-col gap-5 sm:gap-[21px] text-center text-forest">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-semibold uppercase leading-[30px] tracking-[-0.8px]">
              Find us
            </h3>
            <p className="mt-2 font-body text-sm sm:text-base leading-6 text-forest/85">
              256th North Neusvill Avenue, 19302, USA
            </p>
            <p className="mt-1 flex flex-col items-center justify-center gap-1 font-body text-sm sm:text-base leading-6 text-forest/85 sm:flex-row sm:gap-2.5">
              <span className="font-medium">+1 (003) 563-7585</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium">sushi@example.com</span>
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg sm:text-xl font-semibold uppercase leading-[30px] tracking-[-0.8px]">
              Service hours
            </h3>
            {reservationHours.map((line) => (
              <p key={line} className="font-body text-sm sm:text-base leading-6 text-forest/85">
                {line}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-1 font-body text-sm sm:text-base uppercase leading-[26px]">
            {["Fb", "Tw", "In", "Ig"].map((label) => (
              <a
                key={label}
                href="#"
                className="size-8 rounded-full border border-forest/25 flex items-center justify-center transition-all duration-300 hover:border-forest hover:bg-forest hover:text-cream hover:scale-115 active:scale-95"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block pb-5 sm:pb-[25px]">
      <span className="sr-only">{label}</span>
      <input
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-white/60 bg-transparent pb-2.5 pt-2 font-body text-sm sm:text-base text-cream placeholder:text-cream/50 outline-none transition-colors duration-200 focus:border-lime focus:text-ivory"
      />
      {error && <span className="mt-1.5 block font-body text-xs text-lime">{error}</span>}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="block pb-5 sm:pb-[25px]">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer border-b border-white/60 bg-transparent px-0 pb-2.5 pt-2 font-body text-sm sm:text-base text-cream outline-none transition-colors duration-200 focus:border-lime"
      >
        {placeholder && (
          <option value="" disabled className="text-ink">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option} value={option} className="text-ink">
            {option}
          </option>
        ))}
      </select>
      {error && <span className="mt-1.5 block font-body text-xs text-lime">{error}</span>}
    </label>
  );
}
