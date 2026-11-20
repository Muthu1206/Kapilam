"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { BRAND } from "@/config/brand";
import { gsap, motionMedia, pick, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { bgShift, COLORS } from "@/animations/sceneTransitions";
import { fadeUpBatch, organicDrift } from "@/animations/scrollAnimations";
import { useWebGLSupport } from "@/three/utils/webgl";

const ParticleCanvas = dynamic(() => import("@/three/scenes/ParticleCanvas"), { ssr: false, loading: () => null });

const PILLARS = [
  { title: "Natural clay", text: "Rooted in the ancient soil of India — earth is the heart of every piece." },
  { title: "Traditional potters", text: "Working with traditional potters, supporting their community and craftsmanship." },
  { title: "Eco-friendly intent", text: "Kapilam strives to promote the most sustainable and eco-friendly products." },
];

/** Section 07 — organic earth atmosphere: WebGL dust, drifting blobs, ring scrub. */
export function SustainabilitySection() {
  const ref = useRef<HTMLElement>(null);
  const webgl = useWebGLSupport();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce }) => {
        if (reduce) return;
        bgShift(root, COLORS.deep);
        // Slow second tonal shift toward living-soil green as the section passes
        gsap.to(root, {
          backgroundColor: COLORS.sageDark,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 30%", end: "bottom 80%", scrub: true },
        });
        organicDrift(pick(root, "blob-1"), 0);
        organicDrift(pick(root, "blob-2"), 1);
        gsap.fromTo(
          pick(root, "ring"),
          { scale: 0.55, rotation: -25, opacity: 0.1 },
          {
            scale: 1.15,
            rotation: 25,
            opacity: 0.45,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        splitReveal(pick(root, "eyebrow"), "words");
        splitReveal(pick(root, "title"), "chars", { stagger: 0.02 });
        splitReveal(pick(root, "body"), "lines");
        fadeUpBatch(root, "[data-fade]", { y: 60, stagger: 0.16 });
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="sustainability"
      ref={ref}
      className="relative overflow-hidden bg-charcoal py-28 text-ivory sm:py-36 lg:py-44"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          data-a="blob-1"
          className="absolute -top-[10%] -left-[10%] h-[60vmin] w-[60vmin] rounded-[48%_52%_60%_40%] blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(119,123,104,0.4), transparent 70%)" }}
        />
        <div
          data-a="blob-2"
          className="absolute -right-[10%] -bottom-[15%] h-[70vmin] w-[70vmin] rounded-[55%_45%_40%_60%] blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(166,83,54,0.32), transparent 70%)" }}
        />
        <div
          data-a="ring"
          className="absolute top-1/2 left-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-[46%_54%_52%_48%] border border-muted-sage/60"
        />
      </div>
      {webgl && (
        <div className="absolute inset-0">
          <ParticleCanvas variant="earth" />
        </div>
      )}

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p data-a="eyebrow" className="editorial-eyebrow text-muted-sage">
          <span className="tamil mr-3 normal-case tracking-[0.08em]">மண்</span>
          07 &mdash; {BRAND.sustainabilityCopy.eyebrow}
        </p>
        <h2
          data-a="title"
          className="editorial-display mt-6 max-w-5xl text-[clamp(2.8rem,7.4vw,7rem)] text-ivory"
        >
          {BRAND.sustainabilityCopy.heading}
        </h2>
        <p data-a="body" className="editorial-italic mt-8 max-w-2xl text-[clamp(1.3rem,2.2vw,1.9rem)] leading-snug text-warm-linen/85">
          {BRAND.sustainabilityCopy.body}
        </p>

        <div className="mt-16 grid gap-px bg-muted-sage/25 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.title} data-fade className="bg-charcoal/85 p-8 backdrop-blur-sm">
              <span className="font-display text-3xl text-sandstone/70">0{i + 1}</span>
              <h3 className="mt-5 font-display text-2xl text-ivory">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-linen/70">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
