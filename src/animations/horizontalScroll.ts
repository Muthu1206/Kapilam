"use client";

import { gsap, ScrollTrigger } from "./gsap";

/**
 * Pinned horizontal storytelling. Pins `section`, translates `track` by the
 * overflow distance. Desktop only — the caller invokes it inside a desktop,
 * non-reduced-motion matchMedia branch; everywhere else the viewport remains a
 * native touch-scrolling rail (no scroll trapping on mobile).
 */
export function horizontalScroll(
  section: HTMLElement,
  viewport: HTMLElement,
  track: HTMLElement,
  o: { onProgress?: (p: number) => void; scrub?: number } = {},
): { tween: gsap.core.Tween; cleanup: () => void } {
  section.classList.add("is-hpinned");
  viewport.scrollLeft = 0;
  const dist = () => Math.max(1, track.scrollWidth - viewport.clientWidth);
  const tween = gsap.to(track, {
    x: () => -dist(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${dist()}`,
      pin: true,
      scrub: o.scrub ?? 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self: ScrollTrigger) => o.onProgress?.(self.progress),
    },
  });
  return { tween, cleanup: () => section.classList.remove("is-hpinned") };
}

/** Reveal an element when the horizontal track carries it into view. */
export function revealInContainer(
  el: HTMLElement,
  containerAnimation: gsap.core.Animation,
  vars: gsap.TweenVars,
): gsap.core.Tween {
  return gsap.from(el, {
    ...vars,
    scrollTrigger: {
      trigger: el,
      containerAnimation,
      start: "left 92%",
      toggleActions: "play none none none",
    },
  });
}
