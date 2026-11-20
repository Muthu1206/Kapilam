"use client";

import { gsap, Observer } from "./gsap";

/** Scroll-scrubbed vertical parallax for every `[data-parallax="<yPercent>"]` inside scope.
 *  Parallax elements must be oversized wrappers (inset -12%) inside an overflow-hidden parent. */
export function initParallax(scope: Element, intensity = 1): void {
  gsap.utils.toArray<HTMLElement>("[data-parallax]", scope).forEach((el) => {
    const amt = parseFloat(el.dataset.parallax ?? "8") * intensity;
    gsap.fromTo(
      el,
      { yPercent: -amt },
      {
        yPercent: amt,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

export interface ParallaxLayer {
  el: Element | null;
  /** px of travel */
  depth: number;
  /** degrees of 3D tilt toward the pointer */
  tilt?: number;
}

/**
 * Pointer (desktop) + touch-drag (mobile) layered parallax via GSAP Observer.
 * Observer never prevents default, so native page scrolling is untouched.
 */
export function pointerParallax(scope: HTMLElement, layers: ParallaxLayer[]): () => void {
  const items = layers
    .filter((l): l is ParallaxLayer & { el: Element } => l.el !== null)
    .map((l) => {
      if (l.tilt) gsap.set(l.el, { transformPerspective: 1100 });
      const opts = { duration: 1.4, ease: "power3.out" } as const;
      return {
        l,
        x: gsap.quickTo(l.el, "x", opts),
        y: gsap.quickTo(l.el, "y", opts),
        ry: l.tilt ? gsap.quickTo(l.el, "rotationY", opts) : null,
        rx: l.tilt ? gsap.quickTo(l.el, "rotationX", opts) : null,
      };
    });

  const apply = (nx: number, ny: number) => {
    items.forEach((it) => {
      it.x(-nx * it.l.depth);
      it.y(-ny * it.l.depth);
      it.ry?.(nx * (it.l.tilt ?? 0));
      it.rx?.(-ny * (it.l.tilt ?? 0));
    });
  };
  const fromEvent = (x: number, y: number) =>
    apply((x / window.innerWidth - 0.5) * 2, (y / window.innerHeight - 0.5) * 2);

  const obs = Observer.create({
    target: scope,
    type: "pointer,touch",
    onMove: (self) => fromEvent(self.x ?? 0, self.y ?? 0),
    onDrag: (self) => fromEvent(self.x ?? 0, self.y ?? 0),
    onHoverEnd: () => apply(0, 0),
    onRelease: () => apply(0, 0),
  });
  return () => obs.kill();
}
