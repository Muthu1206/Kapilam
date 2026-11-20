"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/animations/gsap";

/** Refreshes ScrollTrigger positions after fonts and lazy images settle the layout. */
export function ScrollRefresh() {
  useEffect(() => {
    let t = 0;
    const refresh = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    };
    window.addEventListener("load", refresh);
    document.addEventListener("load", refresh, true); // captures <img> load events
    document.fonts?.ready.then(refresh);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      document.removeEventListener("load", refresh, true);
    };
  }, []);
  return null;
}
