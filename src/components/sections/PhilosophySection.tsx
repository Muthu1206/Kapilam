"use client";

import { useRef } from "react";
import { BRAND } from "@/config/brand";
import { motionMedia, pickAll, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { bgShift, COLORS, statementScrub } from "@/animations/sceneTransitions";

const BLOCKS = [
  { bg: COLORS.obsidian, from: COLORS.ivory, tamil: "நினைவு", gloss: "Memory", cls: "bg-obsidian" },
  { bg: COLORS.deep, from: COLORS.obsidian, tamil: "கதை", gloss: "Story", cls: "bg-deep-kapilam" },
  { bg: COLORS.terracotta, from: COLORS.deep, tamil: "மண்", gloss: "Earth", cls: "bg-dark-terracotta" },
];

/** Section 09 — full-screen statements: char reveals, scrubbed scale, scene colour hand-offs. */
export function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce }) => {
        if (reduce) return;
        const blocks = pickAll(root, "block");
        const quotes = pickAll(root, "quote");
        blocks.forEach((block, i) => {
          bgShift(block, BLOCKS[i].from, { start: "top 100%", end: "top 40%" });
          statementScrub(quotes[i], block);
          splitReveal(quotes[i], "chars", { stagger: 0.018, duration: 1.2, start: "top 80%" });
          splitReveal(block.querySelector<HTMLElement>("[data-a='meta']")!, "words", { start: "top 75%" });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="philosophy" ref={ref} className="relative">
      {BRAND.philosophyQuotes.map((quote, i) => (
        <div
          key={quote}
          data-a="block"
          className={`relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24 text-center sm:px-10 ${BLOCKS[i].cls}`}
        >
          <p data-a="meta" className="editorial-eyebrow mb-8 text-sandstone">
            <span className="tamil mr-3 normal-case tracking-[0.08em]">{BLOCKS[i].tamil}</span>
            09 &mdash; Philosophy &middot; {BLOCKS[i].gloss}
          </p>
          <blockquote
            data-a="quote"
            className="editorial-display mx-auto max-w-6xl text-[clamp(2.5rem,7.6vw,7.4rem)] text-ivory"
          >
            {quote}
          </blockquote>
          <span aria-hidden="true" className="mt-10 h-14 w-px bg-sandstone/40" />
          <span className="editorial-eyebrow mt-4 text-sandstone/70">0{i + 1} / 03</span>
        </div>
      ))}
    </section>
  );
}
