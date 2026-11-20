"use client";

import { useRef } from "react";
import { BRAND, NAV_ITEMS } from "@/config/brand";
import { KapilamLogo } from "@/components/ui/KapilamLogo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { motionMedia, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { fadeUpBatch } from "@/animations/scrollAnimations";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce }) => {
        if (reduce) return;
        fadeUpBatch(root, "[data-fade]", { y: 36, stagger: 0.14, start: "top 95%" });
        splitReveal(root.querySelector("[data-sign]")!, "words", { start: "top 98%" });
      });
    },
    { scope: ref },
  );

  return (
    <footer ref={ref} className="border-t border-sandstone/18 bg-obsidian text-warm-linen">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div data-fade className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <KapilamLogo size={54} />
              <div>
                <p className="font-display text-2xl tracking-[0.26em] text-ivory">{BRAND.name}</p>
                <p className="editorial-italic mt-1 text-lg text-sandstone">{BRAND.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-warm-linen/70">
              Traditional Indian pottery, handmade terracotta crafts, and contemporary earth-sculpted art shaped in
              collaboration with traditional artisans.
            </p>
          </div>

          <div data-fade className="lg:col-span-4">
            <p className="editorial-eyebrow text-sandstone/80">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <AnchorLink
                    href={item.href}
                    className="inline-block text-warm-linen/75 transition-all duration-300 hover:translate-x-1 hover:text-ivory"
                  >
                    {item.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
          </div>

          <div data-fade className="lg:col-span-3">
            <p className="editorial-eyebrow text-sandstone/80">Follow &amp; Connect</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              {BRAND.instagramUrl ? (
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-ivory transition-colors hover:text-sandstone"
                >
                  <InstagramIcon className="h-4 w-4 text-sandstone" />
                  <span>{BRAND.instagramHandle}</span>
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-ivory">
                  <InstagramIcon className="h-4 w-4 text-sandstone" />
                  <span>{BRAND.instagramHandle}</span>
                </span>
              )}
              <p className="text-xs leading-relaxed text-warm-linen/55">
                Direct studio contact details will be added here when confirmed.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-sandstone/14 pt-6 text-xs text-warm-linen/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{BRAND.name} — Handmade Indian Pottery &amp; Terracotta</p>
          <p data-sign className="editorial-italic text-lg text-sandstone/80">
            Shaped by Hands. Inspired by Earth.
          </p>
        </div>
      </div>
    </footer>
  );
}
