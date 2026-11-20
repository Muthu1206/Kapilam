"use client";

import { useRef } from "react";
import { BRAND } from "@/config/brand";
import { KapilamLogo } from "@/components/ui/KapilamLogo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, motionMedia, pick, useGSAP } from "@/animations/gsap";
import { splitReveal } from "@/animations/textAnimations";
import { bgShift, COLORS } from "@/animations/sceneTransitions";
import { fadeUpBatch } from "@/animations/scrollAnimations";

/** Section 11 — cinematic closing scene. */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      motionMedia(({ reduce }) => {
        if (reduce) return;
        bgShift(root, COLORS.linen);
        splitReveal(pick(root, "eyebrow"), "words");
        splitReveal(pick(root, "title"), "chars", { stagger: 0.022 });
        splitReveal(pick(root, "note"), "lines");
        fadeUpBatch(root, "[data-fade]", { y: 40, stagger: 0.14 });
        gsap.from(pick(root, "logo"), {
          scale: 0.6,
          opacity: 0,
          rotate: -12,
          duration: 1.6,
          ease: "kapilamOut",
          scrollTrigger: { trigger: root, start: "top 65%", end: "max", once: true },
        });
        gsap.to(pick(root, "logo"), { y: -10, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.fromTo(
          pick(root, "wordmark"),
          { xPercent: 14 },
          { xPercent: -14, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-deep-kapilam py-24 text-ivory sm:py-32 lg:py-40">
      <div
        data-a="wordmark"
        aria-hidden="true"
        className="outline-text pointer-events-none absolute bottom-[-4%] left-0 font-display text-[clamp(8rem,26vw,24rem)] leading-none whitespace-nowrap text-sandstone/20 select-none"
      >
        KAPILAM KAPILAM
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <div data-a="logo" className="mb-9 w-fit">
            <KapilamLogo size={84} />
          </div>
          <p data-a="eyebrow" className="editorial-eyebrow text-sandstone">
            11 &mdash; {BRAND.contactPlaceholder.eyebrow}
          </p>
          <h2 data-a="title" className="editorial-display mt-5 text-[clamp(2.6rem,6vw,5.6rem)] text-ivory">
            {BRAND.contactPlaceholder.heading}
          </h2>
          <p data-a="note" className="mt-6 max-w-lg text-sm leading-relaxed text-warm-linen/75 sm:text-base">
            {BRAND.contactPlaceholder.note}
          </p>
          <div data-fade className="mt-9">
            {BRAND.instagramUrl ? (
              <MagneticButton href={BRAND.instagramUrl} variant="primary">
                <InstagramIcon className="h-4 w-4" />
                <span>Follow {BRAND.instagramHandle}</span>
              </MagneticButton>
            ) : (
              <MagneticButton href="#instagram" variant="primary">
                <InstagramIcon className="h-4 w-4" />
                <span>{BRAND.instagramHandle}</span>
              </MagneticButton>
            )}
          </div>
        </div>

        <div className="grid gap-4 self-end lg:col-span-5">
          {BRAND.contactPlaceholder.fields.map((field) => (
            <div
              key={field.label}
              data-fade
              className="group border border-sandstone/20 bg-obsidian/35 px-6 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-sandstone/60 hover:bg-obsidian/55"
            >
              <p className="editorial-eyebrow text-sandstone/80">{field.label}</p>
              <p className="mt-2 font-display text-xl text-ivory transition-transform duration-500 group-hover:translate-x-2">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
