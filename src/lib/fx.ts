"use client";

/**
 * The ember canvas, the cursor wisp and the per-frame loop shared by every page.
 * Everything here touches `window`, so it only runs after mount (via `startFx`).
 */

import { WORLDS } from "../../data/worlds";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  l: number;
  m: number;
  c: string;
  p: number;
};

export type FxHook = (ctx: CanvasRenderingContext2D, frozen: boolean) => void;

const state = {
  started: false,
  reduce: false,
  fine: false,
  frozen: false,
  pal: WORLDS[0].em,
  P: [] as Particle[],
  W: 0,
  H: 0,
  ctx: null as CanvasRenderingContext2D | null,
  hooks: new Set<FxHook>(),
  frames: new Set<() => void>(),
  lastPtr: { x: 0, y: 0 },
};

export const motion = {
  get reduce() {
    return state.reduce;
  },
  get fine() {
    return state.fine;
  },
};

export const isFrozen = () => state.frozen;
export const setFrozen = (v: boolean) => {
  state.frozen = v;
};
export const lastPointer = () => state.lastPtr;

export function setPalette(em: string[]) {
  state.pal = em;
}

function mk(x: number, y: number, b?: boolean): Particle {
  const a = Math.random() * 6.28,
    s = b ? 1 + Math.random() * 4.5 : 0;
  return {
    x,
    y,
    vx: b ? Math.cos(a) * s : (Math.random() - 0.5) * 0.3,
    vy: b ? Math.sin(a) * s - 1 : -(0.25 + Math.random() * 0.7),
    r: 0.6 + Math.random() * (b ? 2.4 : 1.8),
    l: 0,
    m: b ? 45 + Math.random() * 60 : 240 + Math.random() * 260,
    c: state.pal[(Math.random() * state.pal.length) | 0],
    p: Math.random() * 6,
  };
}

/** A burst of embers at a viewport point. */
export function burst(x: number, y: number, n: number) {
  if (!state.started || state.reduce) return;
  for (let i = 0; i < n; i++) state.P.push(mk(x, y, true));
}

/** Draw on the shared canvas each frame (after the embers). */
export function addFxHook(h: FxHook) {
  state.hooks.add(h);
  return () => {
    state.hooks.delete(h);
  };
}

/** Run a callback on every animation frame. Returns an unsubscribe function. */
export function onFrame(fn: () => void) {
  state.frames.add(fn);
  return () => {
    state.frames.delete(fn);
  };
}

/** Start the loop once. Safe to call again (e.g. under React strict mode). */
export function startFx(canvas: HTMLCanvasElement, wisp: HTMLElement) {
  if (state.started) return;
  state.started = true;
  state.reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  state.fine = matchMedia("(pointer:fine)").matches;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  state.ctx = ctx;

  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    state.W = innerWidth;
    state.H = innerHeight;
    canvas.width = state.W * d;
    canvas.height = state.H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };
  size();
  addEventListener("resize", size);

  for (let i = 0; i < 60; i++) {
    const e = mk(Math.random() * state.W, Math.random() * state.H);
    e.l = Math.random() * e.m;
    state.P.push(e);
  }

  let mx = state.W / 2,
    my = state.H / 2,
    wx = mx,
    wy = my,
    lastT = 0;
  state.lastPtr = { x: mx, y: my };
  addEventListener(
    "pointermove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      state.lastPtr = { x: mx, y: my };
      const t = performance.now();
      if (!state.reduce && t - lastT > 34) {
        lastT = t;
        const p = mk(mx, my, true);
        p.vx *= 0.25;
        p.vy = -0.5 - Math.random();
        p.r *= 0.8;
        state.P.push(p);
      }
    },
    { passive: true },
  );

  const P = state.P;
  const frame = () => {
    const { W, H } = state;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    const FZ = state.frozen;
    if (!FZ && P.length < 60 && Math.random() < 0.45) P.push(mk(Math.random() * W, H + 10));
    for (let i = P.length - 1; i >= 0; i--) {
      const p = P[i];
      if (!FZ) {
        p.l++;
        p.p += 0.05;
        p.x += p.vx + Math.sin(p.p) * 0.25;
        p.y += p.vy;
        p.vx *= 0.985;
        if (p.vy > -0.3) p.vy -= 0.02;
      }
      const k = 1 - p.l / p.m;
      if (k <= 0 || p.y < -20) {
        P.splice(i, 1);
        continue;
      }
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, p.c);
      g.addColorStop(0.25, p.c + "88");
      g.addColorStop(1, p.c + "00");
      ctx.globalAlpha = Math.min(1, k * 1.4) * (0.6 + 0.4 * Math.sin(p.p * 3));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 6, 0, 7);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    state.hooks.forEach((h) => h(ctx, FZ));
    if (!FZ) {
      wx += (mx - wx) * 0.12;
      wy += (my - wy) * 0.12;
    }
    wisp.style.transform = `translate(${wx}px,${wy}px)`;
    state.frames.forEach((f) => f());
    requestAnimationFrame(frame);
  };
  frame();
}
