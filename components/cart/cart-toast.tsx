"use client";

import { useCart } from "@/components/providers/cart-provider";

export function CartToast() {
  const { toastMessage, dismissToast } = useCart();

  return (
    <div
      className={`pointer-events-none fixed bottom-8 left-1/2 z-[80] -translate-x-1/2 transition-all duration-400 ease-out will-animate ${
        toastMessage
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-6 opacity-0 scale-95"
      }`}
      aria-live="polite"
    >
      {toastMessage ? (
        <div className="pointer-events-auto flex items-center gap-4 bg-forest/95 px-6 py-3.5 text-cream shadow-2xl shadow-black/40 border border-lime/30 backdrop-blur-md rounded-none">
          <span className="flex size-5 items-center justify-center rounded-full bg-lime text-forest font-bold text-xs">
            ✓
          </span>
          <p className="font-body text-sm font-medium tracking-wide">{toastMessage}</p>
          <button
            type="button"
            onClick={dismissToast}
            className="cursor-pointer font-body text-xs uppercase tracking-wider text-lime underline underline-offset-4 transition-colors hover:text-white"
          >
            Dismiss
          </button>
        </div>
      ) : null}
    </div>
  );
}
