"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { scrollToTarget } from "@/animations/gsap";

/** Anchor that glides to its section with ScrollToPlugin (falls back to native). */
export function AnchorLink({ href, onClick, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (href.startsWith("#") && !e.defaultPrevented) {
      e.preventDefault();
      scrollToTarget(href);
    }
  };
  return <a href={href} onClick={handle} {...rest} />;
}
