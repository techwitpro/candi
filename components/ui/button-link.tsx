import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "cream" | "forest" | "lime" | "outline-cream" | "outline-dark";

const variantClasses: Record<Variant, string> = {
  cream:
    "bg-cream border border-cream text-forest-deep hover:bg-cream/90 transition-colors",
  forest: "bg-forest text-cream hover:bg-forest/90 transition-colors",
  lime: "bg-lime border border-lime text-[#1d1e22] hover:bg-lime/90 transition-colors",
  "outline-cream":
    "border border-cream text-cream bg-transparent hover:bg-cream/10 transition-colors",
  "outline-dark":
    "border border-white text-forest bg-transparent hover:bg-white/10 transition-colors",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  variant = "cream",
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center px-[25px] py-2 font-body text-base uppercase leading-[26px] ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({
  children,
  variant = "cream",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-[25px] py-2 font-body text-base uppercase leading-[26px] cursor-pointer ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
