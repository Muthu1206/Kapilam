"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/animations/gsap";
import { splitNow } from "@/animations/textAnimations";
import { markIntroDone } from "@/animations/introState";
import { BRAND } from "@/config/brand";
import { KapilamLogo } from "@/components/ui/KapilamLogo";

const MOTES = 16;

/** Section 01 — GSAP-driven cinematic opening: glow, light sweep, drifting clay dust,
 *  logo reveal, then a clip-path curtain that lifts to reveal the hero. */
export function LoadingIntro() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const skipRef = useRef<() => void>(() => {});

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = (n: string) => el.querySelector<HTMLElement>(`[data-i="${n}"]`)!;
      const html = document.documentElement;
      html.style.overflow = "hidden";

      let finished = false;
      let exiting = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        html.style.overflow = "";
        markIntroDone();
        setGone(true);
      };

      const exit = () => {
        if (exiting) return;
        exiting = true;
        const out = gsap.timeline({ onComplete: finish });
        out
          .to(q("content"), { opacity: 0, y: -24, duration: 0.55, ease: "power2.in" })
          .call(markIntroDone, [], 0.45) // hero starts as the curtain lifts
          .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.15, ease: "kapilamInOut" }, 0.3);
      };
      skipRef.current = () => {
        gsap.killTweensOf(el.querySelectorAll("*"));
        exit();
      };

      if (window.matchMedia(MQ.reduce).matches) {
        gsap.to(q("content"), { opacity: 1, duration: 0.2 });
        gsap.delayedCall(0.5, exit);
        return () => {
          html.style.overflow = "";
        };
      }

      // Drifting clay dust
      el.querySelectorAll<HTMLElement>("[data-i='mote']").forEach((m) => {
        gsap.set(m, { x: gsap.utils.random(-380, 380), y: gsap.utils.random(-120, 260), opacity: 0 });
        gsap.to(m, {
          y: `-=${gsap.utils.random(90, 220)}`,
          x: `+=${gsap.utils.random(-50, 50)}`,
          opacity: gsap.utils.random(0.35, 0.85),
          duration: gsap.utils.random(2.6, 4.5),
          delay: gsap.utils.random(0, 1.6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const brand = splitNow(q("brand"), "chars");
      const tl = gsap.timeline({ defaults: { ease: "kapilamOut" } });
      tl.fromTo(q("glow"), { opacity: 0, scale: 0.55 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
        .fromTo(q("sweep"), { xPercent: -130, opacity: 0 }, { xPercent: 330, opacity: 1, duration: 1.9, ease: "power2.inOut" }, 0.25)
        .fromTo(q("logo"), { opacity: 0, scale: 0.8, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 1.3 }, 0.25)
        .fromTo(brand.chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.06 }, 0.85)
        .fromTo(q("tag"), { opacity: 0, y: 14 }, { opacity: 0.85, y: 0, duration: 1 }, 1.25)
        .fromTo(q("bar"), { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.3)
        .call(exit, [], 2.3);

      return () => {
        html.style.overflow = "";
      };
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="false"
      aria-label="Kapilam introduction"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden bg-obsidian px-6 text-ivory"
    >
      <div
        data-i="glow"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(166,83,54,0.38) 0%, rgba(69,37,29,0.26) 32%, rgba(24,19,17,0.97) 74%)",
        }}
      />
      <div
        data-i="sweep"
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-1/4 left-0 w-1/3 -rotate-[18deg] opacity-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(199,155,122,0.2), transparent)",
          filter: "blur(30px)",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {Array.from({ length: MOTES }, (_, i) => (
          <span
            key={i}
            data-i="mote"
            className="absolute rounded-full bg-sandstone"
            style={{ width: 2 + (i % 3), height: 2 + (i % 3), opacity: 0 }}
          />
        ))}
      </div>

      <div data-i="content" className="relative z-10 flex flex-col items-center text-center">
        <div data-i="logo" className="relative">
          <div aria-hidden="true" className="absolute -inset-7 rounded-full bg-burnt-clay/25 blur-2xl" />
          <KapilamLogo size={116} priority className="relative ring-1 ring-sandstone/45" />
        </div>
        <p
          data-i="brand"
          className="mt-8 font-display text-3xl font-normal tracking-[0.34em] text-ivory sm:text-4xl"
        >
          {BRAND.name}
        </p>
        <p data-i="tag" className="editorial-italic mt-3 text-lg text-warm-linen sm:text-xl">
          {BRAND.tagline}
        </p>
        <div aria-hidden="true" className="mt-8 h-px w-40 overflow-hidden bg-sandstone/20">
          <div data-i="bar" className="h-full origin-left bg-sandstone" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => skipRef.current()}
        className="editorial-eyebrow absolute right-6 bottom-7 z-20 cursor-pointer border border-sandstone/30 bg-charcoal/50 px-4 py-2 text-warm-linen/85 backdrop-blur-sm transition-colors hover:border-sandstone hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sandstone sm:right-10 sm:bottom-9"
      >
        Skip Intro
      </button>
    </div>
  );
}
