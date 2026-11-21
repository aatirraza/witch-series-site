"use client";

import type { ReactNode } from "react";

let show: ((content: ReactNode) => void) | null = null;

export function bindToast(fn: ((content: ReactNode) => void) | null) {
  show = fn;
}

/** Show the small status pill at the bottom of the screen for 3.4 seconds. */
export function toast(content: ReactNode) {
  show?.(content);
}
