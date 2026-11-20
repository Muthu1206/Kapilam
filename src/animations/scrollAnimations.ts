"use client";

import { gsap, ScrollTrigger } from "./gsap";

/** Staggered fade-up for every matching element, batched per scroll entry. */
export function fadeUpBatch(
  scope: Element,
  selector: string,
  o: { y?: number; stagger?: number; start?: string } = {},
): void {
  const els = gsap.utils.toArray<HTMLElement>(selector, scope);
  if (!els.length) return;
  gsap.set(els, { opacity: 0, y: o.y ?? 50 });
  ScrollTrigger.batch(els, {
    start: o.start ?? "top 88%",
    end: "max",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "kapilamOut",
        stagger: o.stagger ?? 0.12,
        overwrite: true,
      }),
  });
}

/** Animated highlight sweep for every `.hl` mark inside scope. */
export function highlightSweep(scope: Element): void {
  gsap.utils.toArray<HTMLElement>(".hl", scope).forEach((mark) => {
    gsap.fromTo(
      mark,
      { backgroundSize: "0% 36%" },
      {
        backgroundSize: "100% 36%",
        duration: 1.4,
        ease: "kapilamInOut",
        scrollTrigger: { trigger: mark, start: "top 78%", end: "max", once: true },
      },
    );
  });
}

/** Seamless infinite horizontal marquee (content must be duplicated twice). */
export function marqueeLoop(el: HTMLElement, duration = 40): gsap.core.Tween {
  return gsap.to(el, { xPercent: -50, ease: "none", duration, repeat: -1 });
}

/** Organic, endlessly drifting blob (sustainability / atmosphere layers). */
export function organicDrift(el: HTMLElement, i = 0): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
  tl.to(el, { x: 40 + i * 20, y: -30 - i * 14, scale: 1.12, duration: 7 + i * 2 }).to(el, {
    x: -30,
    y: 24,
    scale: 0.94,
    duration: 8 + i * 2,
  });
  return tl;
}

/** Thin top-of-page scroll progress indicator. */
export function bindScrollProgress(bar: HTMLElement): ScrollTrigger {
  const set = gsap.quickSetter(bar, "scaleX");
  return ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => set(self.progress),
  });
}
