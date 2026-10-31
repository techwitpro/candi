"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button-link";
import { formatPrice, getMenuItem } from "@/lib/menu-catalog";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    subtotal,
    count,
    removeLine,
    setQuantity,
    clearCart,
  } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop with Blur */}
      <div
        className={`fixed inset-0 z-[60] bg-forest/60 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-[420px] flex-col bg-cream shadow-2xl transition-transform duration-400 ease-out will-animate ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
          <div>
            <h2 id="cart-drawer-title" className="font-display text-2xl uppercase text-forest font-bold">
              Your bag
            </h2>
            <p className="font-body text-xs sm:text-sm text-forest/70 uppercase tracking-wider mt-0.5">
              {count} item{count === 1 ? "" : "s"} selected
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="cursor-pointer font-body text-xs uppercase tracking-wider text-forest underline underline-offset-4 transition-colors hover:text-forest/60 active:scale-95"
          >
            Close ✕
          </button>
        </div>

        {/* Lines Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="size-16 rounded-full bg-forest/5 flex items-center justify-center text-2xl opacity-60">
                🥢
              </span>
              <p className="font-body text-base text-forest/80">Your bag is currently empty.</p>
              <Link
                href="#dishes"
                onClick={closeCart}
                className="mt-2 inline-flex items-center justify-center bg-forest px-6 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-cream transition-transform hover:scale-105 active:scale-95"
              >
                Browse menu
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((line) => {
                const item = getMenuItem(line.id);
                if (!item) return null;

                return (
                  <li
                    key={line.id}
                    className="flex gap-4 border-b border-forest/10 pb-4 last:border-b-0 transition-colors hover:bg-forest/5 p-2 rounded"
                  >
                    <div className="relative size-[84px] shrink-0 overflow-hidden bg-card shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="84px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-base uppercase leading-6 text-forest font-semibold">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeLine(line.id)}
                          className="cursor-pointer font-body text-[11px] uppercase tracking-wider text-forest/50 hover:text-red-700 transition-colors"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="mt-1 font-body text-xs font-semibold text-forest/85">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-2.5 inline-flex items-center border border-forest/20 bg-cream">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          className="cursor-pointer px-2.5 py-0.5 font-body text-base leading-none text-forest transition-colors hover:bg-forest/10 active:scale-90"
                        >
                          −
                        </button>
                        <span className="min-w-6 px-1 text-center font-body text-xs font-semibold text-forest">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          className="cursor-pointer px-2.5 py-0.5 font-body text-base leading-none text-forest transition-colors hover:bg-forest/10 active:scale-90"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-forest/10 px-6 py-5 bg-card/15">
          <div className="mb-4 flex items-center justify-between font-body text-base text-forest">
            <span className="uppercase text-xs tracking-wider font-semibold">Subtotal</span>
            <span className="font-bold text-lg">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href="#connect"
              onClick={closeCart}
              className="w-full text-center bg-forest py-3 font-body text-xs sm:text-sm font-bold uppercase tracking-wider text-cream transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
            >
              Reserve table with order
            </Link>

            {lines.length > 0 && (
              <Button
                type="button"
                variant="outline-dark"
                className="w-full py-2 text-xs uppercase tracking-wider text-forest/70 hover:text-forest"
                onClick={clearCart}
              >
                Clear bag
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
