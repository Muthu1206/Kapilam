"use client";

import { enter, gsap, SplitText } from "./gsap";

export type SplitKind = "chars" | "words" | "lines";

export interface RevealOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  /** Trigger on scroll (default true). false = plays immediately. */
  scroll?: boolean;
  start?: string;
}

const FROM: Record<SplitKind, gsap.TweenVars> = {
  chars: { yPercent: 105, opacity: 0, rotate: 5 },
  words: { yPercent: 60, opacity: 0 },
  lines: { yPercent: 110 },
};

/**
 * Accessible SplitText reveal (SplitText adds aria-labels automatically).
 * autoSplit re-splits on font load / resize and rebuilds the tween, so line
 * breaks always match the final layout. Lines use real mask wrappers.
 */
export function splitReveal(
  el: Element,
  kind: SplitKind,
  o: RevealOptions = {},
): SplitText {
  const { delay = 0, duration = 1.3, stagger, scroll = true, start = "top 85%" } = o;
  return SplitText.create(el, {
    type: kind === "chars" ? "words,chars" : kind,
    mask: kind === "lines" ? "lines" : undefined,
    autoSplit: true,
    onSplit(self: SplitText) {
      const targets = kind === "chars" ? self.chars : kind === "words" ? self.words : self.lines;
      return gsap.from(targets, {
        ...FROM[kind],
        duration,
        delay,
        ease: "kapilamOut",
        stagger: stagger ?? (kind === "chars" ? 0.025 : kind === "words" ? 0.06 : 0.12),
        scrollTrigger: scroll ? enter(el, start) : undefined,
      });
    },
  });
}

/** Scroll-scrubbed word-by-word opacity wipe (large editorial statements). */
export function scrubWords(
  el: Element,
  o: { start?: string; end?: string; from?: number } = {},
): SplitText {
  return SplitText.create(el, {
    type: "words",
    autoSplit: true,
    onSplit(self: SplitText) {
      return gsap.fromTo(
        self.words,
        { opacity: o.from ?? 0.14 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: o.start ?? "top 82%",
            end: o.end ?? "bottom 45%",
            scrub: true,
          },
        },
      );
    },
  });
}

/** Non-scroll split used by timelines (hero / intro) that need manual sequencing. */
export function splitNow(el: Element, kind: "chars" | "words"): SplitText {
  return SplitText.create(el, { type: kind === "chars" ? "words,chars" : "words" });
}

/** Scroll-linked horizontal drift for oversized typographic bands. */
export function scrubDrift(
  el: Element,
  trigger: Element,
  from: number,
  to: number,
): gsap.core.Tween {
  return gsap.fromTo(
    el,
    { xPercent: from },
    {
      xPercent: to,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
    },
  );
}
