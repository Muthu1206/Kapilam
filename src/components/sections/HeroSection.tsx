"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { BRAND } from "@/config/brand";
import { ASSET_HERO_SCULPTURE, BRAND_VISUALS } from "@/config/assets";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motionMedia, useGSAP } from "@/animations/gsap";
import { onIntroDone } from "@/animations/introState";
import { buildHeroIntro, heroAmbient, heroScroll } from "@/animations/heroTimeline";
import { pointerParallax } from "@/animations/parallax";
import { pick } from "@/animations/gsap";
import { useWebGLSupport } from "@/three/utils/webgl";

const ParticleCanvas = dynamic(() => import("@/three/scenes/ParticleCanvas"), {
  ssr: false,
  loading: () => null,
});

/** Section 02 — The Living Earth.
 *  Authentic Kapilam deer-sculpture photograph presented as a layered, lit,
 *  perspective-parallaxed exhibit (an image composition — NOT a 3D mesh). */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const webgl = useWebGLSupport();
  const sculpture = ASSET_HERO_SCULPTURE;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce }) => {
        if (reduce) return;
        const intro = buildHeroIntro(root);
        const off = onIntroDone(() => {
          intro.play(0);
        });
        heroAmbient(root);
        heroScroll(root);
        const stop = pointerParallax(root, [
          { el: pick(root, "bg"), depth: 14 },
          { el: pick(root, "fog"), depth: 26 },
          { el: pick(root, "pointer-frame"), depth: 30, tilt: 7 },
          { el: pick(root, "text"), depth: -10 },
        ]);
        return () => {
          off();
          stop();
        };
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-obsidian text-ivory"
    >
      {/* Layer 0 — warm terracotta atmosphere (brand poster, blurred + darkened) */}
      <div data-a="bg" className="absolute -inset-[7%]">
        <div data-a="bg-img" className="absolute inset-0">
          <Image
            src={BRAND_VISUALS.posterArtisan.src}
            alt=""
            fill
            sizes="100vw"
            quality={55}
            priority
            className="scale-110 object-cover object-center blur-[18px] brightness-[0.4] saturate-[1.25]"
          />
        </div>
      </div>

      {/* Layer 1 — spotlight + fog */}
      <div data-a="light" className="pointer-events-none absolute inset-0">
        <div
          data-a="light-core"
          className="absolute top-[4%] right-[2%] h-[80%] w-[70%] rounded-full opacity-100"
          style={{
            background:
              "radial-gradient(ellipse at 55% 45%, rgba(224,150,98,0.42) 0%, rgba(166,83,54,0.2) 38%, transparent 70%)",
          }}
        />
      </div>
      <div data-a="fog" className="pointer-events-none absolute -inset-[6%]">
        <div
          data-a="fog-a"
          className="absolute -bottom-[8%] -left-[10%] h-[55%] w-[80%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(199,155,122,0.2), transparent 70%)" }}
        />
        <div
          data-a="fog-b"
          className="absolute right-[-10%] bottom-[-6%] h-[48%] w-[70%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(113,59,43,0.45), transparent 70%)" }}
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(24,19,17,0.92) 0%, rgba(24,19,17,0.55) 42%, rgba(24,19,17,0.12) 75%), linear-gradient(0deg, rgba(24,19,17,0.95) 0%, transparent 38%), radial-gradient(ellipse at center, transparent 45%, rgba(24,19,17,0.65) 100%)",
        }}
      />

      {/* Layer 2 — the authentic sculpture exhibit */}
      <div
        data-a="scroll-frame"
        className="absolute inset-x-[15%] top-[11svh] h-[40svh] lg:inset-x-auto lg:top-[12vh] lg:right-[5vw] lg:h-[74vh] lg:w-[calc(74vh*0.8)]"
      >
        <div data-a="pointer-frame" className="h-full w-full">
          <div data-a="float" className="relative h-full w-full">
            <div data-a="clip" className="relative h-full w-full overflow-hidden ring-1 ring-sandstone/35">
              <div data-a="sculpt-img" className="absolute inset-0">
                <Image
                  src={sculpture.src}
                  alt={sculpture.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 40vw"
                  className="object-cover object-[50%_60%] saturate-[1.12] contrast-[1.05]"
                />
              </div>
              {/* warm studio grade */}
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-multiply"
                style={{ background: "linear-gradient(160deg, rgba(166,83,54,0.28), rgba(69,37,29,0.55))" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-soft-light"
                style={{ background: "radial-gradient(ellipse at 78% 12%, rgba(255,214,170,0.85), transparent 58%)" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(24,19,17,0.55) 100%)" }}
              />
            </div>
            {/* ground shadow */}
            <div
              data-a="shadow"
              aria-hidden="true"
              className="absolute -bottom-5 left-[8%] h-8 w-[84%] rounded-[50%] bg-black/70 blur-xl"
            />
          </div>
        </div>
        <p
          data-a="caption"
          className="editorial-eyebrow absolute -bottom-9 left-0 hidden text-[0.6rem] tracking-[0.24em] text-sandstone/80 lg:block"
        >
          Hand-sculpted terracotta · Kapilam
        </p>
      </div>

      {/* Layer 3 — floating clay dust (WebGL, lazy, quality-adaptive) */}
      {webgl && (
        <div className="absolute inset-0 z-[25]">
          <ParticleCanvas variant="hero" />
        </div>
      )}

      {/* Layer 4 — typography */}
      <div
        data-a="text"
        className="absolute inset-x-0 bottom-0 z-30 px-5 pb-12 sm:px-8 lg:bottom-[11vh] lg:left-[5vw] lg:max-w-[56vw] lg:px-0 lg:pb-0"
      >
        <p data-a="eyebrow" className="editorial-eyebrow text-sandstone">
          <span className="tamil mr-3 tracking-[0.1em] normal-case">மண் · கைவினை · பாரம்பரியம்</span>
          <span className="hidden sm:inline">Earth · Craft · Heritage</span>
        </p>
        <div className="overflow-hidden pt-2 pb-1">
          <h1
            data-a="title"
            className="font-display text-[clamp(3.1rem,14.5vw,11.2rem)] leading-[0.92] font-normal tracking-[0.03em] text-ivory"
          >
            {BRAND.name}
          </h1>
        </div>
        <p
          data-a="tagline"
          className="editorial-italic mt-3 max-w-xl text-[clamp(1.45rem,3.6vw,2.9rem)] leading-[1.1] text-warm-linen"
        >
          {BRAND.tagline}
        </p>
        <p data-a="sub" className="mt-4 max-w-md text-[0.8rem] tracking-[0.1em] text-warm-linen/75 sm:text-sm">
          {BRAND.heroSupporting}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <MagneticButton href={BRAND.heroCtas.primary.href} variant="primary" dataA="cta">
            <span>{BRAND.heroCtas.primary.label}</span>
            <ArrowDownRight className="h-4 w-4" strokeWidth={1.6} />
          </MagneticButton>
          <MagneticButton href={BRAND.heroCtas.secondary.href} variant="ghost" dataA="cta">
            <span>{BRAND.heroCtas.secondary.label}</span>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-a="cue-wrap"
        className="pointer-events-none absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 lg:block"
      >
        <div data-a="cue" className="flex flex-col items-center gap-2">
          <span className="editorial-eyebrow text-[0.58rem] text-sandstone/80">Scroll</span>
          <span className="h-10 w-px overflow-hidden bg-sandstone/20">
            <span data-a="cue-line" className="block h-full w-full bg-sandstone" />
          </span>
        </div>
      </div>

      {/* Hand-off veil — fades the hero into the next section on scroll */}
      <div
        data-a="veil"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[35] bg-obsidian opacity-0"
      />
    </section>
  );
}
