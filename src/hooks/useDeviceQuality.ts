"use client";

import { useSyncExternalStore } from "react";

export type QualityTier = "HIGH" | "BALANCED" | "LOW";

export interface QualityProfile {
  tier: QualityTier;
  isMobile: boolean;
  dpr: [number, number];
  particleCount: number;
  latheSegments: number;
  shadows: boolean;
  antialias: boolean;
}

const PROFILES: Record<QualityTier, Omit<QualityProfile, "isMobile">> = {
  HIGH: {
    tier: "HIGH",
    dpr: [1, 2],
    particleCount: 220,
    latheSegments: 64,
    shadows: true,
    antialias: true,
  },
  BALANCED: {
    tier: "BALANCED",
    dpr: [1, 1.5],
    particleCount: 110,
    latheSegments: 44,
    shadows: true,
    antialias: true,
  },
  LOW: {
    tier: "LOW",
    dpr: [1, 1],
    particleCount: 45,
    latheSegments: 28,
    shadows: false,
    antialias: false,
  },
};

const SNAPSHOT_CACHE: Record<string, QualityProfile> = {
  "HIGH-false": { ...PROFILES.HIGH, isMobile: false },
  "BALANCED-false": { ...PROFILES.BALANCED, isMobile: false },
  "BALANCED-true": { ...PROFILES.BALANCED, isMobile: true },
  "LOW-false": { ...PROFILES.LOW, isMobile: false },
  "LOW-true": { ...PROFILES.LOW, isMobile: true },
};

const SERVER_SNAPSHOT = SNAPSHOT_CACHE["BALANCED-false"];

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot(): QualityProfile {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;

  const width = window.innerWidth;
  const isTouch =
    window.matchMedia?.("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0;
  const isMobile = width < 768 || (isTouch && width < 1024);

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  const memory = nav.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const saveData = nav.connection?.saveData ?? false;

  if (saveData || memory <= 2 || cores <= 2) {
    return SNAPSHOT_CACHE[`LOW-${isMobile}`];
  }

  if (isMobile || memory <= 4 || cores <= 4) {
    return SNAPSHOT_CACHE[`BALANCED-${isMobile}`];
  }

  return SNAPSHOT_CACHE["HIGH-false"];
}

function getServerSnapshot(): QualityProfile {
  return SERVER_SNAPSHOT;
}

/**
 * Evaluates device hardware, viewport, and data-saver signals to return an
 * adaptive rendering profile (HIGH / BALANCED / LOW) without SSR hydration mismatch.
 */
export function useDeviceQuality(): QualityProfile {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
