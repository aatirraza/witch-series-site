"use client";

import { useEffect, type RefObject } from "react";
import { motion } from "./fx";

type TiltOpts = {
  /** Degrees of Y rotation across the full width. */
  ry: number;
  /** Degrees of X rotation across the full height. */
  rx: number;
  /** Extra transform after the rotations. */
  extra?: string;
  /** Measure the pointer against the element itself instead of the host. */
  measureEl?: boolean;
};

/** The 3D cover tilt, only on fine pointers without reduced motion (as in the original). */
export function useTilt(
  el: RefObject<HTMLElement | null>,
  host: RefObject<HTMLElement | null>,
  { ry, rx, extra = "", measureEl = false }: TiltOpts,
) {
  useEffect(() => {
    const e = el.current,
      h = host.current;
    if (!e || !h || !motion.fine || motion.reduce) return;
    const move = (ev: PointerEvent) => {
      const r = (measureEl ? e : h).getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5,
        y = (ev.clientY - r.top) / r.height - 0.5;
      e.style.transform = `rotateY(${x * ry}deg) rotateX(${-y * rx}deg)${extra ? " " + extra : ""}`;
      const s = e.querySelector<HTMLElement>(".shine");
      if (s) {
        s.style.setProperty("--sx", (x + 0.5) * 100 + "%");
        s.style.setProperty("--sy", (y + 0.5) * 100 + "%");
      }
    };
    const leave = () => {
      e.style.transform = "";
    };
    h.addEventListener("pointermove", move);
    h.addEventListener("pointerleave", leave);
    return () => {
      h.removeEventListener("pointermove", move);
      h.removeEventListener("pointerleave", leave);
    };
  }, [el, host, ry, rx, extra, measureEl]);
}
