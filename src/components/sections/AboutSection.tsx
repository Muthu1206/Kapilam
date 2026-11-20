"use client";

import { Fragment, useRef } from "react";
import { BRAND } from "@/config/brand";
import { CRAFTSMANSHIP_ASSETS } from "@/config/assets";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { gsap, motionMedia, pick, pickAll, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { clipFrom, CLIP_OPEN, clipReveal } from "@/animations/imageAnimations";
import { initParallax } from "@/animations/parallax";
import { bgShift, COLORS } from "@/animations/sceneTransitions";
import { fadeUpBatch, highlightSweep } from "@/animations/scrollAnimations";

const STORY_IMAGES = [CRAFTSMANSHIP_ASSETS[2], CRAFTSMANSHIP_ASSETS[0], CRAFTSMANSHIP_ASSETS[1]];

function Highlighted({ text }: { text: string }) {
  // Split paragraph into plain + <mark> segments for the supplied key phrases.
  let parts: (string | { hl: string })[] = [text];
  BRAND.aboutHighlights.forEach((phrase) => {
    parts = parts.flatMap((p) => {
      if (typeof p !== "string" || !p.includes(phrase)) return [p];
      const [a, b] = p.split(phrase);
      return [a, { hl: phrase }, b];
    });
  });
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? <Fragment key={i}>{p}</Fragment> : <mark key={i} className="hl">{p.hl}</mark>,
      )}
    </>
  );
}

/** Section 04 — pinned editorial storytelling (desktop), mask-revealed photography. */
export function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce, desktop }) => {
        if (reduce) return;
        bgShift(root, COLORS.ivory);
        splitReveal(pick(root, "eyebrow"), "words");
        splitReveal(pick(root, "title"), "lines", { duration: 1.4 });
        highlightSweep(root);
        fadeUpBatch(root, "[data-para]", { y: 40, stagger: 0.1 });
        initParallax(root, desktop ? 1 : 0.6);
        clipReveal(pick(root, "story-1"), { from: "bottom" });

        if (desktop) {
          const grid = pick(root, "grid");
          const left = pick(root, "left");
          const right = pick(root, "right");
          // Pinned photographic column while the story scrolls past it.
          ScrollTrigger.create({
            trigger: grid,
            start: "top 14%",
            end: "bottom bottom",
            pin: left,
            pinSpacing: false,
          });
          // Image-to-image scrubbed transitions synced to the paragraphs.
          const [, s2, s3] = [pick(root, "story-1"), pick(root, "story-2"), pick(root, "story-3")];
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: right, start: "top 45%", end: "bottom 70%", scrub: 0.6 },
          });
          tl.fromTo(s2, { clipPath: clipFrom("bottom") }, { clipPath: CLIP_OPEN, duration: 1 }, 0.5)
            .fromTo(s2.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 1 }, 0.5)
            .fromTo(s3, { clipPath: clipFrom("bottom") }, { clipPath: CLIP_OPEN, duration: 1 }, 2)
            .fromTo(s3.querySelector("img"), { scale: 1.3 }, { scale: 1, duration: 1 }, 2)
            .to({}, { duration: 0.6 });
          pickAll(root, "story-label").forEach((l, i) => {
            gsap.fromTo(
              l,
              { opacity: 0.25 },
              {
                opacity: 1,
                scrollTrigger: { trigger: pickAll(root, "para")[i], start: "top 65%", end: "bottom 55%", toggleActions: "play reverse play reverse" },
              },
            );
          });
        }
      });
    },
    { scope: ref },
  );

  return (
    <section id="about" ref={ref} className="relative bg-warm-linen py-24 text-charcoal sm:py-32 lg:py-40">
      <div
        data-a="grid"
        className="mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12"
      >
        <div data-a="left" className="lg:col-span-5 lg:self-start">
          <p data-a="eyebrow" className="editorial-eyebrow text-dark-terracotta">
            04 &mdash; About Kapilam
          </p>
          <h2
            data-a="title"
            className="editorial-display mt-5 text-[clamp(2.3rem,4.4vw,4rem)] text-deep-kapilam"
          >
            Rooted in Ancient Soil. Shaped with a Contemporary Soul.
          </h2>
          <div className="relative mt-9 aspect-[4/5] w-full overflow-hidden border border-deep-kapilam/15 lg:aspect-auto lg:h-[44vh]">
            {STORY_IMAGES.map((img, i) => (
              <div
                key={img.id}
                data-a={`story-${i + 1}`}
                className={`${i === 0 ? "absolute inset-0" : "absolute inset-0 hidden lg:block"} overflow-hidden`}
              >
                <div data-parallax={i === 0 ? "7" : undefined} className="absolute inset-0 lg:inset-0">
                  <EditorialImage asset={img} sizes="(max-width: 1024px) 100vw, 40vw" />
                </div>
              </div>
            ))}
          </div>
          <p className="editorial-italic mt-4 hidden text-lg text-dark-terracotta/80 lg:block">
            Fingers first met clay — every grain of sand held a story.
          </p>
        </div>

        <div data-a="right" className="flex flex-col lg:col-span-7">
          {BRAND.aboutParagraphs.map((paragraph, index) => (
            <div
              key={index}
              data-a="para"
              className="flex flex-col justify-center py-5 lg:min-h-[68vh] lg:py-0"
            >
              <span data-a="story-label" className="editorial-eyebrow mb-5 text-burnt-clay">
                0{index + 1} / 03
              </span>
              <p
                data-para
                className={
                  index === 0
                    ? "font-serif text-[1.7rem] leading-[1.5] text-deep-kapilam sm:text-[2.1rem]"
                    : "font-serif text-[1.4rem] leading-[1.65] text-charcoal/90 sm:text-[1.7rem]"
                }
              >
                <Highlighted text={paragraph} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
