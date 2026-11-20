"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

/** Media queries shared by every animation module. */
export const MQ = {
  desktop: "(min-width: 1024px)",
  reduce: "(prefers-reduced-motion: reduce)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

export interface MotionConditions {
  desktop: boolean;
  reduce: boolean;
  fine: boolean;
}

let registered = false;

/** Registers every GSAP plugin exactly once (safe on server — no-ops there). */
export function registerGsap(): void {
  if (registered || typeof window === "undefined") return;
  registered = true;
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase, Observer, ScrollToPlugin);
  CustomEase.create("kapilamOut", "0.16,1,0.3,1");
  CustomEase.create("kapilamInOut", "0.76,0,0.24,1");
  ScrollTrigger.config({ ignoreMobileResize: true });
}

registerGsap();

/**
 * Runs `build` inside gsap.matchMedia() so every animation is automatically
 * reverted + rebuilt on breakpoint / reduced-motion changes.
 * Call it inside `useGSAP` — the matchMedia is added to the hook's context,
 * so unmount cleanup is automatic (no duplicate ScrollTriggers, no leaks).
 */
export function motionMedia(
  build: (c: MotionConditions) => void | (() => void),
): gsap.MatchMedia {
  const mm = gsap.matchMedia();
  mm.add(
    { desktop: MQ.desktop, reduce: MQ.reduce, fine: MQ.fine },
    (ctx) => build(ctx.conditions as unknown as MotionConditions),
  );
  return mm;
}

/** Reveal-once trigger. `end: "max"` guarantees content is revealed even when the
 *  page loads scrolled past the section (scroll restoration). */
export function enter(trigger: Element, start = "top 85%"): ScrollTrigger.Vars {
  return { trigger, start, end: "max", once: true };
}

/** Pick an element inside a section by `data-a="name"`. */
export function pick(root: Element, name: string): HTMLElement {
  return root.querySelector<HTMLElement>(`[data-a="${name}"]`) as HTMLElement;
}

export function pickAll(root: Element, name: string): HTMLElement[] {
  return gsap.utils.toArray<HTMLElement>(`[data-a="${name}"]`, root);
}

/** Smooth, history-aware anchor navigation powered by ScrollToPlugin. */
export function scrollToTarget(hash: string): void {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash);
  if (!el) return;
  const reduce = window.matchMedia(MQ.reduce).matches;
  gsap.to(window, {
    scrollTo: { y: el, autoKill: true },
    duration: reduce ? 0 : 1.6,
    ease: "kapilamInOut",
    overwrite: true,
  });
  window.history.pushState(null, "", hash);
}

export { gsap, ScrollTrigger, SplitText, CustomEase, Observer, ScrollToPlugin, useGSAP };
