"use client";

import { useRef } from "react";
import { BRAND } from "@/config/brand";
import { BRAND_VISUALS } from "@/config/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { motionMedia, pick, useGSAP } from "@/animations/gsap";
import { scrubDrift, scrubWords, splitReveal } from "@/animations/textAnimations";
import { clipReveal } from "@/animations/imageAnimations";
import { initParallax } from "@/animations/parallax";
import { bgShift, COLORS } from "@/animations/sceneTransitions";
import { fadeUpBatch } from "@/animations/scrollAnimations";

/** Section 03 — oversized scroll-linked typography on a colour hand-off. */
export function BrandIntro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce, desktop }) => {
        if (reduce) return;
        bgShift(root, COLORS.obsidian);
        scrubWords(pick(root, "headline"));
        scrubDrift(pick(root, "marquee"), root, 6, -36);
        splitReveal(pick(root, "eyebrow"), "words");
        clipReveal(pick(root, "clip"), { from: "left" });
        initParallax(root, desktop ? 1 : 0.6);
        fadeUpBatch(root, "[data-fade]");
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="introduction"
      ref={ref}
      className="relative overflow-hidden bg-ivory py-28 text-charcoal sm:py-36 lg:py-44"
    >
      <div
        data-a="marquee"
        aria-hidden="true"
        className="outline-text pointer-events-none absolute top-[8%] left-0 font-display text-[clamp(6rem,22vw,20rem)] leading-none whitespace-nowrap text-dark-terracotta/25 select-none"
      >
        EARTH — CLAY — FIRE — HANDS —
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12">
        <div className="lg:col-span-8">
          <p data-a="eyebrow" className="editorial-eyebrow text-dark-terracotta">
            03 &mdash; Prelude
          </p>
          <h2
            data-a="headline"
            className="editorial-display mt-7 text-[clamp(2.8rem,8vw,7.6rem)] text-deep-kapilam"
          >
            {BRAND.introStatement}
          </h2>
          <p data-fade className="editorial-italic mt-8 max-w-md text-2xl text-dark-terracotta/80">
            Ancient earth. Timeless craft. Contemporary soul.
          </p>
        </div>

        <div className="lg:col-span-4">
          <div data-a="clip" className="relative aspect-[4/5] w-full overflow-hidden border border-deep-kapilam/15">
            <div data-parallax="9" className="absolute inset-[-12%]">
              <EditorialImage asset={BRAND_VISUALS.studioVessel} sizes="(max-width: 1024px) 100vw, 34vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
