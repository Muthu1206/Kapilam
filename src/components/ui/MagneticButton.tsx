"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { gsap, MQ, scrollToTarget, useGSAP } from "@/animations/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
  dataA?: string;
}

const VARIANTS = {
  primary: "bg-burnt-clay text-ivory hover:bg-dark-terracotta",
  ghost: "border border-sandstone/45 bg-charcoal/40 text-warm-linen backdrop-blur-sm hover:border-sandstone hover:text-ivory",
  light: "bg-deep-kapilam text-ivory hover:bg-dark-terracotta",
};

/**
 * Magnetic CTA. GSAP owns the outer element's transform (magnetic pull);
 * Motion owns the inner span (press feedback) — no shared properties.
 */
export function MagneticButton({ href, children, variant = "primary", className = "", dataA }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useMediaQuery(MQ.fine);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !fine) return;
      const opts = { duration: 0.7, ease: "power3.out" } as const;
      const x = gsap.quickTo(el, "x", opts);
      const y = gsap.quickTo(el, "y", opts);
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.32);
        y((e.clientY - (r.top + r.height / 2)) * 0.4);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref, dependencies: [fine] },
  );

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToTarget(href);
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      data-a={dataA}
      className={`inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sandstone ${className}`}
    >
      <motion.span
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={`inline-flex items-center gap-2.5 px-7 py-4 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${VARIANTS[variant]}`}
      >
        {children}
      </motion.span>
    </a>
  );
}
