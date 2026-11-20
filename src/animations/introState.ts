/** Tiny store coordinating the opening curtain with the hero entrance timeline. */
let done = false;
const subs = new Set<() => void>();

export function isIntroDone(): boolean {
  return done;
}

export function markIntroDone(): void {
  if (done) return;
  done = true;
  subs.forEach((fn) => fn());
  subs.clear();
}

/** Runs `cb` as soon as the intro lifts (immediately if it already has). */
export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}
