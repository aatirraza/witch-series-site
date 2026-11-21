"use client";

import { useEffect, useRef } from "react";
import { PROUD } from "../../../data/home";

/** The count-up plays once per visit, however often the home page is shown again. */
let counted = false;

/** The four big numbers, counted up once when they scroll into view. */
export default function Stats() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current!;
    if (counted || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const frames: number[] = [];
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          counted = true;
          e.target.querySelectorAll<HTMLElement>("[data-n]").forEach((b) => {
            const n = +b.dataset.n!,
              t0 = performance.now();
            const st = () => {
              const k = Math.min(1, (performance.now() - t0) / 1400);
              b.textContent = String(Math.round(n * (1 - Math.pow(1 - k, 3))));
              if (k < 1) frames.push(requestAnimationFrame(st));
            };
            st();
          });
        }),
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <div className="stats" id="stats" ref={box}>
      {PROUD.stats.map((s) => (
        <div className="st" key={s.label}>
          <b data-n={s.n}>{s.n}</b>
          <span>{s.label}</span>
          <small>{s.small}</small>
        </div>
      ))}
    </div>
  );
}
