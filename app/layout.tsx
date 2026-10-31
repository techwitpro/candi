import type { Metadata } from "next";
import { Cinzel, Lora, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CANDI — The Craft of Sushi & Asian Cuisine",
  description:
    "Premium sushi and Asian cuisine — fresh fish, bold flavors, and a welcoming dining experience. Open daily in Canggu.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${lora.variable} ${notoSansJp.variable} h-full antialiased selection:bg-lime selection:text-forest-deep`}
    >
      <body className="min-h-full overflow-x-hidden bg-cream text-forest">
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-cream focus:px-4 focus:py-2 focus:text-forest"
        >
          Skip to content
        </Link>
        {children}
      </body>
    </html>
  );
}
