import type { Metadata, Viewport } from "next";
import {
  Bodoni_Moda,
  Cormorant_Garamond,
  Manrope,
  Noto_Serif_Tamil,
} from "next/font/google";
import { BRAND } from "@/config/brand";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const notoTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description:
    "Rooted in the ancient soil of India, Kapilam brings traditional Indian pottery and handmade terracotta craftsmanship to life with a contemporary soul.",
  keywords: [
    "Kapilam",
    "Indian pottery",
    "handmade terracotta",
    "terracotta sculptures",
    "artisan crafts",
    "sustainable pottery",
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.heroSupporting,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#181311",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${cormorant.variable} ${manrope.variable} ${notoTamil.variable} h-full`}
    >
      <body className="min-h-full bg-obsidian font-sans text-ivory antialiased">
        {/* Global subtle clay-grain atmosphere */}
        <div
          aria-hidden="true"
          className="clay-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-overlay"
        />
        {children}
      </body>
    </html>
  );
}
