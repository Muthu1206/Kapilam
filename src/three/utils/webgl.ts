"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | null = null;

function detect(): boolean {
  if (cached !== null) return cached;
  try {
    const canvas = document.createElement("canvas");
    cached = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    cached = false;
  }
  return cached;
}

/** True when a WebGL context can be created (false on the server → no hydration mismatch). */
export function useWebGLSupport(): boolean {
  return useSyncExternalStore(
    () => () => {},
    detect,
    () => false,
  );
}
