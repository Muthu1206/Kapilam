"use client";

import { useRef } from "react";
import { useGSAP } from "@/animations/gsap";
import { bindScrollProgress } from "@/animations/scrollAnimations";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (bar.current) bindScrollProgress(bar.current);
  });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-burnt-clay via-sandstone to-warm-linen" />
    </div>
  );
}
