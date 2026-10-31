import { LandingPage } from "@/components/landing/landing-page";
import { CartProvider } from "@/components/providers/cart-provider";

export default function Home() {
  return (
    <CartProvider>
      <LandingPage />
    </CartProvider>
  );
}
