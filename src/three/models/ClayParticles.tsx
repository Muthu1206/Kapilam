"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ClayParticlesProps {
  count: number;
  color: string;
  size: number;
  /** vertical drift speed multiplier */
  speed: number;
  spread: [number, number, number];
  /** false → render a single static frame (reduced motion) */
  animate: boolean;
}

/** Deterministic PRNG so render stays pure (no Math.random in render). */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createSprite(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

/** Floating clay-dust field: drifting soft motes with pointer parallax and
 *  scroll-linked camera lift. Buffers, texture and material are disposed on unmount. */
export function ClayParticles({ count, color, size, speed, spread, animate }: ClayParticlesProps) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, phase, rise } = useMemo(() => {
    const rnd = mulberry32(count * 9301 + 49297);
    const p = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const r = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (rnd() - 0.5) * spread[0];
      p[i * 3 + 1] = (rnd() - 0.5) * spread[1];
      p[i * 3 + 2] = (rnd() - 0.5) * spread[2];
      ph[i] = rnd() * Math.PI * 2;
      r[i] = 0.25 + rnd() * 0.75;
    }
    return { positions: p, phase: ph, rise: r };
  }, [count, spread]);

  const sprite = useMemo(() => createSprite(), []);
  useEffect(() => () => sprite.dispose(), [sprite]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const pts = points.current;
    const grp = group.current;
    if (!pts || !grp || !animate) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const halfY = spread[1] / 2;
    for (let i = 0; i < count; i++) {
      const iy = i * 3 + 1;
      arr[iy] += rise[i] * delta * speed;
      if (arr[iy] > halfY) arr[iy] = -halfY;
      arr[i * 3] += Math.sin(t * 0.4 + phase[i]) * delta * 0.06;
    }
    attr.needsUpdate = true;
    grp.rotation.y += (pointer.current.x * 0.22 - grp.rotation.y) * 0.04;
    grp.rotation.x += (pointer.current.y * 0.12 - grp.rotation.x) * 0.04;
    // Scroll-linked camera lift: dust slides past as the page scrolls.
    state.camera.position.y += (-(window.scrollY * 0.0016) - state.camera.position.y) * 0.08;
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          color={color}
          size={size}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
