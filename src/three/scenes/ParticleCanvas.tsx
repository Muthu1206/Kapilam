"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ClayParticles } from "@/three/models/ClayParticles";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Variant = "hero" | "earth";

const VARIANTS: Record<Variant, { color: string; size: number; speed: number; scale: number }> = {
  hero: { color: "#e0a074", size: 0.085, speed: 0.22, scale: 1 },
  earth: { color: "#a9ad93", size: 0.1, speed: 0.12, scale: 0.8 },
};

/** Lazy-loaded, quality-adaptive WebGL particle atmosphere.
 *  Pauses its render loop when scrolled out of view. */
export default function ParticleCanvas({ variant = "hero" }: { variant?: Variant }) {
  const quality = useDeviceQuality();
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cfg = VARIANTS[variant];
  const spread = useMemo<[number, number, number]>(() => [16, 9, 6], []);
  const count = Math.round(quality.particleCount * cfg.scale);

  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={quality.dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 50 }}
        frameloop={visible && !reduce ? "always" : "demand"}
        style={{ background: "transparent" }}
      >
        <ClayParticles
          count={count}
          color={cfg.color}
          size={cfg.size}
          speed={cfg.speed}
          spread={spread}
          animate={!reduce}
        />
      </Canvas>
    </div>
  );
}
