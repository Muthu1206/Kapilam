"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_ITEMS } from "@/config/brand";
import { KapilamLogo } from "@/components/ui/KapilamLogo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { gsap, MQ, ScrollTrigger, scrollToTarget, useGSAP } from "@/animations/gsap";
import { onIntroDone } from "@/animations/introState";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;
      // Entrance after the intro curtain lifts (GSAP owns the header transform).
      let off = () => {};
      if (!window.matchMedia(MQ.reduce).matches) {
        const tween = gsap.from(el, { yPercent: -110, opacity: 0, duration: 1.2, ease: "kapilamOut", paused: true });
        off = onIntroDone(() => {
          tween.delay(0.6).play();
        });
      }
      // Scroll-spy + scrolled state
      ScrollTrigger.create({
        start: 40,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });
      NAV_ITEMS.forEach((item) => {
        const target = document.querySelector(item.href);
        if (!target) return;
        ScrollTrigger.create({
          trigger: target,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(item.href);
          },
        });
      });
      return off;
    },
    { scope: header },
  );

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,padding,border-color] duration-500 ${
        scrolled || menuOpen
          ? "border-b border-sandstone/15 bg-obsidian/85 py-3.5 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <AnchorLink
          href="#hero"
          className="group inline-flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sandstone"
          aria-label="Kapilam — Back to top"
        >
          <KapilamLogo size={40} priority />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-[0.24em] text-ivory transition-colors group-hover:text-sandstone sm:text-[1.3rem]">
              {BRAND.name}
            </span>
            <span className="tamil mt-1.5 text-[0.62rem] tracking-[0.2em] text-sandstone/80">
              மண் · கைவினை
            </span>
          </span>
        </AnchorLink>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            return (
              <AnchorLink
                key={item.href}
                href={item.href}
                data-cursor=""
                className={`group relative py-1 text-xs font-medium tracking-[0.22em] uppercase transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sandstone ${
                  isActive ? "text-ivory" : "text-warm-linen/75"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-sandstone transition-transform duration-500 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </AnchorLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <AnchorLink
            href="#instagram"
            className="hidden items-center gap-2 border border-sandstone/28 bg-deep-kapilam/35 px-3.5 py-2 text-[0.7rem] font-medium tracking-[0.18em] text-warm-linen uppercase transition-colors hover:border-sandstone/65 hover:bg-deep-kapilam/65 hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sandstone sm:inline-flex"
          >
            <InstagramIcon className="h-3.5 w-3.5 text-sandstone" />
            <span>{BRAND.instagramHandle}</span>
          </AnchorLink>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="kapilam-mobile-drawer"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-sandstone/30 bg-charcoal/50 text-ivory transition-colors hover:border-sandstone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sandstone lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="kapilam-mobile-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.45, ease }}
            className="overflow-hidden lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.1 } } }}
              className="mx-5 mt-4 flex flex-col divide-y divide-sandstone/12 pb-6 sm:mx-8"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      window.setTimeout(() => scrollToTarget(item.href), 350);
                    }}
                    className="flex items-baseline justify-between py-4 text-ivory transition-colors hover:text-sandstone"
                  >
                    <span className="font-display text-3xl tracking-tight">{item.label}</span>
                    <span className="text-[0.68rem] tracking-[0.26em] text-sandstone/70">{item.sectionNumber}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="flex items-center justify-between pt-5"
              >
                <span className="editorial-eyebrow text-sandstone/75">Instagram</span>
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-warm-linen">
                  <InstagramIcon className="h-3.5 w-3.5 text-sandstone" />
                  {BRAND.instagramHandle}
                </span>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
