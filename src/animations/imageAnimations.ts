"use client";

import { enter, gsap } from "./gsap";

export type RevealFrom = "bottom" | "top" | "left" | "right";

const CLIP: Record<RevealFrom, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
export const CLIP_OPEN = "inset(0% 0% 0% 0%)";
export const clipFrom = (d: RevealFrom): string => CLIP[d];

/** Masked clip-path curtain reveal with an inner scale-settle on the <img>. */
export function clipReveal(
  el: HTMLElement,
  o: { from?: RevealFrom; delay?: number; start?: string; scroll?: boolean } = {},
): gsap.core.Timeline {
  const { from = "bottom", delay = 0, start = "top 88%", scroll = true } = o;
  const img = el.querySelector("img");
  const tl = gsap.timeline({
    delay,
    scrollTrigger: scroll ? enter(el, start) : undefined,
  });
  tl.fromTo(el, { clipPath: CLIP[from] }, { clipPath: CLIP_OPEN, duration: 1.5, ease: "kapilamInOut" }, 0);
  if (img) {
    tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2, ease: "kapilamOut", clearProps: "transform" }, 0);
  }
  return tl;
}

/** Pointer-driven 3D tilt (fine pointers only — call inside a `fine` matchMedia branch). */
export function attachTilt(card: HTMLElement, max = 8): () => void {
  gsap.set(card, { transformPerspective: 900, transformOrigin: "50% 50%" });
  const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
  const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
  const move = (e: PointerEvent) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry(px * max * 2);
    rx(-py * max * 2);
  };
  const leave = () => {
    rx(0);
    ry(0);
  };
  card.addEventListener("pointermove", move);
  card.addEventListener("pointerleave", leave);
  return () => {
    card.removeEventListener("pointermove", move);
    card.removeEventListener("pointerleave", leave);
  };
}
