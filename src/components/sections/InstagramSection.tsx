"use client";

import { useRef } from "react";
import { BRAND } from "@/config/brand";
import { BRAND_VISUALS, PRODUCT_ASSETS, type ImageAsset } from "@/config/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motionMedia, pick, pickAll, useGSAP, gsap } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { bgShift, COLORS } from "@/animations/sceneTransitions";
import { marqueeLoop } from "@/animations/scrollAnimations";

const byId = (id: string) => PRODUCT_ASSETS.find((a) => a.id === id) as ImageAsset;
const POSTS: ImageAsset[] = [
  BRAND_VISUALS.instagramStoryPost,
  byId("clay-planters"),
  byId("miniatures-01"),
  byId("Calendar-art-01"),
  byId("terracotta-art-01"),
  byId("animal-sculptures-03"),
];

/** Section 10 — Instagram identity: marquee handle + staggered authentic-post grid. */
export function InstagramSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce }) => {
        if (reduce) return;
        bgShift(root, COLORS.obsidian);
        splitReveal(pick(root, "eyebrow"), "words");
        splitReveal(pick(root, "title"), "chars", { stagger: 0.03 });
        splitReveal(pick(root, "lead"), "lines");
        const loop = marqueeLoop(pick(root, "marquee"), 36);
        const tiles = pickAll(root, "post");
        gsap.from(tiles, {
          y: 110,
          opacity: 0,
          scale: 0.94,
          duration: 1.3,
          ease: "kapilamOut",
          stagger: 0.11,
          scrollTrigger: { trigger: pick(root, "grid"), start: "top 80%", end: "max", once: true },
        });
        return () => loop.kill();
      });
    },
    { scope: ref },
  );

  return (
    <section id="instagram" ref={ref} className="relative overflow-hidden bg-warm-linen py-24 text-charcoal sm:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p data-a="eyebrow" className="editorial-eyebrow text-dark-terracotta">
              10 &mdash; Journal &amp; Studio
            </p>
            <h2 data-a="title" className="editorial-display mt-4 text-[clamp(2.8rem,7vw,6.4rem)] text-deep-kapilam">
              {BRAND.instagramHandle}
            </h2>
            <p data-a="lead" className="editorial-italic mt-4 max-w-lg text-2xl text-charcoal/75">
              Follow ongoing studio work, new terracotta forms, and stories from the potter&apos;s wheel.
            </p>
          </div>
          {BRAND.instagramUrl ? (
            <MagneticButton href={BRAND.instagramUrl} variant="light">
              <InstagramIcon className="h-4 w-4" />
              <span>Visit {BRAND.instagramHandle}</span>
            </MagneticButton>
          ) : (
            <div className="inline-flex items-center gap-2.5 border border-deep-kapilam/30 px-6 py-4 text-[0.7rem] font-medium tracking-[0.2em] text-deep-kapilam uppercase">
              <InstagramIcon className="h-4 w-4" />
              <span>{BRAND.instagramHandle} &bull; Link placeholder</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 overflow-hidden border-y border-deep-kapilam/15 py-5" aria-hidden="true">
        <div data-a="marquee" className="flex w-max whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="outline-text flex font-display text-[clamp(3rem,9vw,7rem)] leading-none text-dark-terracotta/40">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className="mr-10">
                  @kap_ilam &nbsp;✦
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div data-a="grid" className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-6">
          {POSTS.map((post, i) => (
            <div
              key={post.id}
              data-a="post"
              data-cursor="@kap_ilam"
              className={`group relative aspect-[3/4] overflow-hidden bg-charcoal ${i % 2 ? "lg:mt-10" : ""}`}
            >
              <EditorialImage
                asset={post}
                cropInstagramHeader={false}
                sizes="(max-width: 768px) 50vw, 16vw"
                className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
