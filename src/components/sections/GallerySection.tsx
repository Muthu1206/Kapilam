"use client";

import { useRef } from "react";
import { BRAND_VISUALS, CRAFTSMANSHIP_ASSETS, PRODUCT_ASSETS, type ImageAsset } from "@/config/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { motionMedia, pick, pickAll, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { clipReveal, type RevealFrom } from "@/animations/imageAnimations";
import { initParallax } from "@/animations/parallax";
import { bgShift, COLORS } from "@/animations/sceneTransitions";

const find = (id: string): ImageAsset =>
  [...PRODUCT_ASSETS, ...CRAFTSMANSHIP_ASSETS].find((a) => a.id === id) as ImageAsset;

interface Tile {
  asset: ImageAsset;
  cls: string;
  from: RevealFrom;
  label: string;
}

const TILES: Tile[] = [
  { asset: BRAND_VISUALS.studioVessel, cls: "col-span-2 lg:col-span-7 aspect-[16/10]", from: "left", label: "Mood study" },
  { asset: find("terracotta-art-05"), cls: "col-span-1 lg:col-span-5 aspect-[4/5]", from: "bottom", label: "Relief plaques" },
  { asset: find("pottery-collection-01"), cls: "col-span-1 lg:col-span-4 aspect-[4/5]", from: "bottom", label: "Pottery" },
  { asset: find("pottery-making"), cls: "col-span-1 lg:col-span-4 aspect-[3/4] lg:mt-20", from: "top", label: "At the wheel" },
  { asset: find("miniatures-04"), cls: "col-span-1 lg:col-span-4 aspect-[4/5]", from: "right", label: "Miniatures" },
  { asset: find("animal-sculptures-02"), cls: "col-span-1 lg:col-span-5 aspect-[4/5]", from: "left", label: "Sculpture" },
  { asset: find("clay-pots"), cls: "col-span-1 lg:col-span-3 aspect-[9/14] lg:-mt-16", from: "bottom", label: "Drying in the sun" },
  { asset: find("terracotta-art-07"), cls: "col-span-2 lg:col-span-4 aspect-[5/4]", from: "right", label: "Wall relief" },
];

/** Section 08 — asymmetric masonry with clip-path reveals and parallax depth. */
export function GallerySection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce, desktop }) => {
        if (reduce) return;
        bgShift(root, COLORS.charcoal);
        splitReveal(pick(root, "eyebrow"), "words");
        splitReveal(pick(root, "title"), "lines");
        pickAll(root, "tile").forEach((tile, i) => {
          clipReveal(tile, { from: TILES[i].from, start: "top 90%" });
        });
        initParallax(root, desktop ? 1 : 0.5);
      });
    },
    { scope: ref },
  );

  return (
    <section id="gallery" ref={ref} className="relative bg-ivory py-24 text-charcoal sm:py-32 lg:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p data-a="eyebrow" className="editorial-eyebrow text-dark-terracotta">
          08 &mdash; Visual Gallery
        </p>
        <h2 data-a="title" className="editorial-display mt-4 text-[clamp(2.5rem,6vw,5.4rem)] text-deep-kapilam">
          Studies in Clay &amp; Shadow
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          {TILES.map((t) => (
            <figure key={t.asset.id} className={`${t.cls} group relative`}>
              <div
                data-a="tile"
                data-cursor="Explore"
                className="relative h-full w-full overflow-hidden bg-charcoal"
              >
                <div data-parallax="7" className="absolute inset-[-10%]">
                  <EditorialImage
                    asset={t.asset}
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-ivory opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="editorial-italic text-xl">{t.label}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
