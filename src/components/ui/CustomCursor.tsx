"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/animations/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Desktop-only cursor (fine pointer, motion allowed). Never rendered on touch. */
export function CustomCursor() {
  const fine = useMediaQuery(MQ.fine);
  const reduce = useMediaQuery(MQ.reduce);
  const enabled = fine && !reduce;
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!enabled || !ring.current || !dot.current || !label.current) return;
      const html = document.documentElement;
      html.classList.add("has-cursor");
      gsap.set([ring.current, dot.current], { xPercent: -50, yPercent: -50, opacity: 0 });
      const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
      const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });
      const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "none" });
      const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "none" });

      const onMove = (e: PointerEvent) => {
        gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.3, overwrite: "auto" });
        rx(e.clientX);
        ry(e.clientY);
        dx(e.clientX);
        dy(e.clientY);
      };
      const onOver = (e: PointerEvent) => {
        const t = (e.target as HTMLElement).closest<HTMLElement>("a,button,[data-cursor]");
        const text = t?.dataset.cursor ?? "";
        label.current!.textContent = text;
        gsap.to(ring.current, {
          scale: t ? (text ? 2.6 : 1.8) : 1,
          backgroundColor: text ? "rgba(166,83,54,0.85)" : "rgba(166,83,54,0)",
          duration: 0.45,
          ease: "kapilamOut",
          overwrite: "auto",
        });
        gsap.to(dot.current, { scale: t ? 0 : 1, duration: 0.25, overwrite: "auto" });
        gsap.to(label.current, { opacity: text ? 1 : 0, duration: 0.25 });
      };
      const onLeave = () => gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.3 });

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        html.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] flex h-10 w-10 items-center justify-center rounded-full border border-sandstone/70"
      >
        <span
          ref={label}
          className="text-[0.38rem] font-semibold tracking-[0.18em] text-ivory uppercase opacity-0"
        />
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] h-1.5 w-1.5 rounded-full bg-sandstone"
      />
    </>
  );
}
