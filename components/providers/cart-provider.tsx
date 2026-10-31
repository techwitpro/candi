"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMenuItem } from "@/lib/menu-catalog";

export type CartLine = {
  id: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  toastMessage: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (id: string, options?: { openDrawer?: boolean }) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  dismissToast: () => void;
};

const STORAGE_KEY = "candi-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line &&
        typeof line.id === "string" &&
        typeof line.quantity === "number" &&
        line.quantity > 0 &&
        getMenuItem(line.id),
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate cart from localStorage after mount to avoid SSR/client mismatches.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client hydration
    setLines(readStoredLines());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);
  const dismissToast = useCallback(() => setToastMessage(null), []);

  const addItem = useCallback((id: string, options?: { openDrawer?: boolean }) => {
    const item = getMenuItem(id);
    if (!item) return;

    setLines((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...prev, { id, quantity: 1 }];
    });

    setToastMessage(`${item.name} added to your bag`);
    if (options?.openDrawer !== false) {
      setIsOpen(true);
    }
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((line) => line.id !== id));
      return;
    }
    setLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, quantity } : line)),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const count = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((total, line) => {
        const item = getMenuItem(line.id);
        return total + (item?.price ?? 0) * line.quantity;
      }, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      toastMessage,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeLine,
      setQuantity,
      clearCart,
      dismissToast,
    }),
    [
      lines,
      count,
      subtotal,
      isOpen,
      toastMessage,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeLine,
      setQuantity,
      clearCart,
      dismissToast,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
