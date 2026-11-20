"use client";

import { gsap, pick } from "./gsap";
import { splitNow } from "./textAnimations";
import { clipFrom, CLIP_OPEN } from "./imageAnimations";

/**
 * Hero entrance. Built paused: from-states are applied immediately (so nothing
 * flashes behind the intro curtain) and the timeline is played when the intro lifts.
 * Each property is owned by exactly one tween/layer to avoid GSAP/CSS conflicts:
 *   intro  -> bg-img, clip, sculpt-img, text children
 *   scroll -> bg, scroll-frame, text wrapper, cue-wrap
 *   pointer-> bg, fog, pointer-frame, text
 *   ambient-> float, fog layers, light-core, cue line
 */
export function buildHeroIntro(root: HTMLElement): gsap.core.Timeline {
  const title = splitNow(pick(root, "title"), "chars");
  const tagline = splitNow(pick(root, "tagline"), "words");
  const tl = gsap.timeline({ paused: true, defaults: { ease: "kapilamOut" } });

  tl.fromTo(pick(root, "bg-img"), { scale: 1.32, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.6 }, 0)
    .fromTo(pick(root, "light"), { opacity: 0 }, { opacity: 1, duration: 2.2 }, 0.2)
    .fromTo(pick(root, "fog"), { opacity: 0 }, { opacity: 1, duration: 2.4 }, 0.3)
    .fromTo(
      pick(root, "clip"),
      { clipPath: clipFrom("bottom") },
      { clipPath: CLIP_OPEN, duration: 1.9, ease: "kapilamInOut" },
      0.1,
    )
    .fromTo(pick(root, "sculpt-img"), { scale: 1.55 }, { scale: 1, duration: 2.6 }, 0.1)
    .fromTo(pick(root, "shadow"), { opacity: 0, scaleX: 0.35 }, { opacity: 1, scaleX: 1, duration: 1.8 }, 0.9)
    .fromTo(pick(root, "caption"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1 }, 1.5)
    .fromTo(pick(root, "eyebrow"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1 }, 0.5)
    .fromTo(
      title.chars,
      { yPercent: 120, opacity: 0, rotate: 7 },
      { yPercent: 0, opacity: 1, rotate: 0, duration: 1.5, stagger: 0.075 },
      0.55,
    )
    .fromTo(
      tagline.words,
      { yPercent: 70, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 },
      1.15,
    )
    .fromTo(pick(root, "sub"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.1 }, 1.5)
    .fromTo(
      root.querySelectorAll('[data-a="cta"]'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 },
      1.75,
    )
    .fromTo(pick(root, "cue"), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 2.4);

  return tl;
}

/** Endless atmospheric motion — runs independently of the entrance. */
export function heroAmbient(root: HTMLElement): void {
  gsap.to(pick(root, "float"), {
    y: -12,
    rotationY: 2.2,
    duration: 5.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  gsap.to(pick(root, "fog-a"), { xPercent: 7, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(pick(root, "fog-b"), { xPercent: -8, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(pick(root, "light-core"), {
    scale: 1.14,
    opacity: 0.85,
    duration: 4.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
  gsap.fromTo(
    pick(root, "cue-line"),
    { scaleY: 0, transformOrigin: "top" },
    { scaleY: 1, duration: 1.6, ease: "power2.inOut", repeat: -1, repeatDelay: 0.4 },
  );
}

/** Scroll-scrubbed hero exit: camera-like push-in, depth separation, hand-off. */
export function heroScroll(root: HTMLElement): gsap.core.Timeline {
  gsap.set(pick(root, "scroll-frame"), { transformPerspective: 1200 });
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
  });
  tl.to(pick(root, "bg"), { yPercent: 16, scale: 1.1 }, 0)
    .to(pick(root, "scroll-frame"), { yPercent: -9, scale: 1.14, rotationY: -9 }, 0)
    .to(pick(root, "text"), { yPercent: -30, opacity: 0 }, 0)
    .to(pick(root, "cue-wrap"), { opacity: 0, duration: 0.25 }, 0)
    .to(pick(root, "veil"), { opacity: 1 }, 0.35);
  return tl;
}
