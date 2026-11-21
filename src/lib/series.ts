"use client";

/**
 * Which series tab the library shows. Lives outside React so it survives the
 * page being hidden or rebuilt, like the one-page original where the shelf
 * simply stayed as the visitor left it.
 *
 * Series links (home cards, footer) don't switch the tab directly: as in the
 * original, they leave a *pending* choice that is applied the next time the
 * visitor arrives on the Books page. Clicking one while already on Books does nothing.
 */

let current = 0;
let pending: number | null = null;
const listeners = new Set<() => void>();

export const getSeries = () => current;
export const getServerSeries = () => 0;

export function subscribeSeries(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function setSeries(i: number) {
  if (i === current) return;
  current = i;
  listeners.forEach((l) => l());
}

export function setPendingSeries(i: number) {
  pending = i;
}

/** Called as the Books page is swapped in. */
export function applyPendingSeries() {
  if (pending === null) return;
  const i = pending;
  pending = null;
  setSeries(i);
}
