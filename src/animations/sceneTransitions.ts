"use client";

import { gsap } from "./gsap";

export const COLORS = {
  obsidian: "#181311",
  ivory: "#F7F1E9",
  linen: "#E8D8C5",
  deep: "#45251D",
  charcoal: "#282321",
  terracotta: "#713B2B",
  burnt: "#A65336",
  sageDark: "#2A2D25",
} as const;

/**
 * Scrubbed background hand-off: the section starts as the previous section's
 * colour and settles into its own while it scrolls into view — so seams vanish.
 */
export function bgShift(
  section: HTMLElement,
  from: string,
  o: { start?: string; end?: string } = {},
): gsap.core.Tween {
  const to = getComputedStyle(section).backgroundColor;
  return gsap.fromTo(
    section,
    { backgroundColor: from },
    {
      backgroundColor: to,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: o.start ?? "top 95%",
        end: o.end ?? "top 35%",
        scrub: true,
      },
    },
  );
}

/** Scroll-scrubbed scale/opacity "breath" for full-screen statements. */
export function statementScrub(el: Element, trigger: Element): gsap.core.Timeline {
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.6 },
  });
  tl.fromTo(el, { scale: 0.9, yPercent: 10 }, { scale: 1, yPercent: 0, duration: 0.5 })
    .to(el, { scale: 1.06, yPercent: -10, duration: 0.5 });
  return tl;
}
