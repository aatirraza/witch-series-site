"use client";

/** Opens the global character sheet viewer (mounted once in the layout). */

type Opener = (index: number, point?: { x: number; y: number }) => void;

let opener: Opener | null = null;

export function bindSheet(fn: Opener | null) {
  opener = fn;
}

export function openSheet(index: number, e?: { clientX: number; clientY: number }) {
  opener?.(index, e && e.clientX ? { x: e.clientX, y: e.clientY } : undefined);
}
