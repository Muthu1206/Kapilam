"use client";

import { useRef } from "react";
import { CRAFTSMANSHIP_ASSETS } from "@/config/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { gsap, motionMedia, pick, pickAll, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { clipFrom, CLIP_OPEN } from "@/animations/imageAnimations";
import { horizontalScroll, revealInContainer } from "@/animations/horizontalScroll";
import { bgShift, COLORS } from "@/animations/sceneTransitions";
import { fadeUpBatch } from "@/animations/scrollAnimations";

const STEP_TEXT = [
  "Wet clay rises between the potter's hands, shaped by touch and patience.",
  "Thrown vessels rest and dry in the open before they ever meet fire.",
  "Fingers sculpt clay into forms that remember the maker.",
  "Creases, grain and fingerprints stay — every imperfection holds a story.",
  "From raw earth to terracotta, each piece travels its own colour.",
];

/** Section 06 — horizontal process storytelling (pinned on desktop, native rail on mobile). */
export function CraftsmanshipSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce, desktop }) => {
        if (reduce) return;
        const cleanups: Array<() => void> = [];
        bgShift(root, COLORS.obsidian);
        splitReveal(pick(root, "title"), "lines", { duration: 1.4 });
        splitReveal(pick(root, "eyebrow"), "words");

        if (desktop) {
          const bar = pick(root, "progress");
          const counter = pick(root, "counter");
          const { tween, cleanup } = horizontalScroll(root, pick(root, "viewport"), pick(root, "track"), {
            onProgress: (p) => {
              gsap.set(bar, { scaleX: p });
              counter.textContent = `0${Math.min(5, Math.round(p * 4) + 1)} / 05`;
            },
          });
          cleanups.push(cleanup);
          pickAll(root, "step-img").forEach((img) => {
            revealInContainer(img, tween, { clipPath: clipFrom("right"), duration: 1.4, ease: "kapilamInOut" });
            const inner = img.querySelector("img");
            if (inner) revealInContainer(inner as HTMLElement, tween, { scale: 1.4, duration: 1.8, ease: "kapilamOut" });
          });
          pickAll(root, "step-text").forEach((t) =>
            revealInContainer(t, tween, { y: 40, opacity: 0, duration: 1.1, ease: "kapilamOut", delay: 0.2 }),
          );
          pickAll(root, "step-num").forEach((n) => {
            gsap.fromTo(
              n,
              { xPercent: 12 },
              { xPercent: -12, ease: "none", scrollTrigger: { trigger: n, containerAnimation: tween, start: "left 100%", end: "right 0%", scrub: true } },
            );
          });
        } else {
          fadeUpBatch(root, "[data-a='step']", { y: 50, stagger: 0.1, start: "top 92%" });
        }
        void CLIP_OPEN;
        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="craftsmanship"
      ref={ref}
      className="relative flex flex-col justify-center bg-deep-kapilam py-24 text-ivory lg:h-screen lg:overflow-hidden lg:py-0"
    >
      <div data-a="viewport" className="hscroll-viewport">
        <div data-a="track" className="flex w-max items-center gap-6 px-5 sm:px-8 lg:gap-10 lg:px-12">
          <div className="w-[82vw] shrink-0 snap-start pr-4 sm:w-[60vw] lg:w-[34vw] lg:pr-10">
            <p data-a="eyebrow" className="editorial-eyebrow text-sandstone">
              <span className="tamil mr-3 normal-case tracking-[0.08em]">கைவினை</span>
              06 &mdash; Craftsmanship
            </p>
            <h2 data-a="title" className="editorial-display mt-5 text-[clamp(2.4rem,5.2vw,4.8rem)] text-ivory">
              From Wet Clay to Eternal Terracotta
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-warm-linen/70">
              Scroll through the journey — photographed in the studio and at the potter&apos;s wheel.
            </p>
          </div>

          {CRAFTSMANSHIP_ASSETS.map((step, i) => (
            <figure
              key={step.id}
              data-a="step"
              data-cursor="Craft"
              className="snap-card relative flex w-[72vw] shrink-0 flex-col sm:w-[46vw] lg:w-[27vw]"
            >
              <span
                data-a="step-num"
                aria-hidden="true"
                className="outline-text pointer-events-none absolute -top-7 -left-2 z-10 font-display text-[clamp(4rem,8vw,7.5rem)] leading-none text-sandstone/55 lg:-top-12"
              >
                0{i + 1}
              </span>
              <div data-a="step-img" className="relative aspect-[4/5] w-full overflow-hidden border border-sandstone/20 lg:h-[54vh] lg:w-auto">
                <EditorialImage asset={step} sizes="(max-width: 1024px) 72vw, 27vw" />
              </div>
              <figcaption data-a="step-text" className="mt-4">
                <span className="editorial-italic block text-2xl text-warm-linen">{step.caption}</span>
                <span className="mt-2 block max-w-xs text-[0.8rem] leading-relaxed text-warm-linen/65">
                  {STEP_TEXT[i]}
                </span>
              </figcaption>
            </figure>
          ))}
          <div className="w-[10vw] shrink-0 lg:w-[6vw]" aria-hidden="true" />
        </div>
      </div>

      <div className="mx-auto mt-8 hidden w-full max-w-[1440px] items-center gap-6 px-12 lg:flex">
        <span data-a="counter" className="editorial-eyebrow w-16 text-sandstone">01 / 05</span>
        <div className="h-px flex-1 bg-sandstone/20">
          <div data-a="progress" className="h-full origin-left scale-x-0 bg-sandstone" />
        </div>
        <span className="editorial-eyebrow text-sandstone/60">Clay → Fire</span>
      </div>
    </section>
  );
}
