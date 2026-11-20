"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PRODUCT_ASSETS, PRODUCT_CATEGORIES, type ProductCategoryId } from "@/config/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { gsap, motionMedia, pick, pickAll, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { attachTilt } from "@/animations/imageAnimations";
import { horizontalScroll } from "@/animations/horizontalScroll";
import { bgShift, COLORS } from "@/animations/sceneTransitions";

const FEATURED = PRODUCT_ASSETS.filter((p) => !p.hasInstagramHeader).slice(0, 12);

/** Section 05 — Curated Collection. Pinned horizontal gallery on desktop;
 *  native touch rail on mobile. Authentic Kapilam photography only. */
export function CollectionSection() {
  const ref = useRef<HTMLElement>(null);
  const [cat, setCat] = useState<ProductCategoryId>("all");
  const items = useMemo(
    () => (cat === "all" ? FEATURED : PRODUCT_ASSETS.filter((p) => p.category === cat)),
    [cat],
  );

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const cards = pickAll(root, "card");
      motionMedia(({ reduce, desktop, fine }) => {
        if (reduce) return;
        const cleanups: Array<() => void> = [];
        bgShift(root, COLORS.linen);
        splitReveal(pick(root, "title"), "lines");
        splitReveal(pick(root, "eyebrow"), "words");

        let container: gsap.core.Animation | null = null;
        if (desktop) {
          const bar = pick(root, "progress");
          const { tween, cleanup } = horizontalScroll(root, pick(root, "viewport"), pick(root, "track"), {
            onProgress: (p) => gsap.set(bar, { scaleX: p }),
          });
          container = tween;
          cleanups.push(cleanup);
        }
        void container;

        // Staggered product entrance + 3D-style hover tilt
        gsap.from(cards, {
          y: 90,
          opacity: 0,
          rotationZ: 2,
          duration: 1.3,
          ease: "kapilamOut",
          stagger: 0.09,
          scrollTrigger: { trigger: root, start: "top 72%", end: "max", once: true },
        });
        if (fine) cards.forEach((c) => cleanups.push(attachTilt(c, 8)));

        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: ref, dependencies: [cat], revertOnUpdate: true },
  );

  return (
    <section
      id="collection"
      ref={ref}
      className="relative flex flex-col justify-center bg-obsidian py-24 text-ivory lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p data-a="eyebrow" className="editorial-eyebrow text-sandstone">
              <span className="tamil mr-3 normal-case tracking-[0.08em]">படைப்புகள்</span>
              05 &mdash; Curated Collection
            </p>
            <h2
              data-a="title"
              className="editorial-display mt-3 text-[clamp(2.3rem,5vw,4.4rem)] text-ivory"
            >
              Forms Born From Earth
            </h2>
          </div>
          <div role="tablist" aria-label="Collection categories" className="flex flex-wrap gap-x-5 gap-y-2">
            {PRODUCT_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`relative cursor-pointer pb-1.5 text-[0.68rem] tracking-[0.2em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sandstone ${
                  cat === c.id ? "text-ivory" : "text-warm-linen/55 hover:text-warm-linen"
                }`}
              >
                {c.label}
                {cat === c.id && (
                  <motion.span
                    layoutId="collection-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-sandstone"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div data-a="viewport" className="hscroll-viewport mt-9 lg:mt-8">
        <div data-a="track" className="flex w-max gap-5 px-5 pb-4 sm:px-8 lg:gap-7 lg:px-12">
          {items.map((item, i) => (
            <article
              key={`${cat}-${item.id}`}
              data-a="card"
              data-cursor="View"
              className="snap-card group w-[68vw] shrink-0 sm:w-[44vw] lg:w-auto"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-sandstone/15 lg:h-[46vh] lg:w-auto">
                <EditorialImage
                  asset={item}
                  sizes="(max-width: 640px) 68vw, (max-width: 1024px) 44vw, 24vw"
                  className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30"
                />
                <span className="absolute top-3 left-4 font-display text-lg text-ivory/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3.5">
                <span className="editorial-eyebrow text-[0.62rem] text-sandstone/85">{item.seriesLabel}</span>
                <span className="text-[0.6rem] tracking-[0.2em] text-warm-linen/45 uppercase">Handcrafted</span>
              </div>
            </article>
          ))}
          <AnchorLink
            href="#instagram"
            data-a="card"
            data-cursor="Open"
            className="snap-card group flex w-[68vw] shrink-0 flex-col justify-between border border-sandstone/25 p-7 sm:w-[44vw] lg:h-[46vh] lg:w-[22vw] lg:min-w-[260px]"
          >
            <span className="editorial-eyebrow text-sandstone/80">More from the studio</span>
            <span className="editorial-display text-4xl text-ivory transition-transform duration-500 group-hover:translate-x-2">
              @kap_ilam
            </span>
            <ArrowUpRight className="h-6 w-6 text-sandstone transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </AnchorLink>
        </div>
      </div>

      <div className="mx-auto mt-5 hidden w-full max-w-[1440px] px-12 lg:block">
        <div className="h-px w-full bg-sandstone/15">
          <div data-a="progress" className="h-full origin-left scale-x-0 bg-sandstone" />
        </div>
      </div>
    </section>
  );
}
