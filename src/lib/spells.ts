"use client";

/**
 * Thea's spells and the hidden-secret triggers, ported from the original.
 * The particle effects draw on the shared ember canvas through an fx hook.
 */

import { addFxHook, burst, isFrozen, lastPointer, setFrozen } from "./fx";
import { bgm, isSoundOn, musicBox, reversedMusicBox, sfx } from "./sound";

type Dust = { x: number; y: number; vx: number; vy: number; r: number; l: number; m: number };
type Blue = Dust & { d: number };
type Gold = {
  ring: { x: number; y: number };
  a: number;
  rr: number;
  av: number;
  l: number;
  m: number;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const FX = { dust: [] as Dust[], blue: [] as Blue[], gold: [] as Gold[] };

/** The page on screen (Next keeps hidden pages in the document too). */
export function curPage(): HTMLElement | null {
  return [...document.querySelectorAll<HTMLElement>(".page.on")].find((e) => e.getClientRects().length > 0) ?? null;
}

let hooked = false;
/** Register the particle drawing on the ember canvas (once). */
export function initSpellFx() {
  if (hooked) return;
  hooked = true;
  addFxHook((c, FZ) => {
    const lastPtr = lastPointer();
    c.globalCompositeOperation = "source-over";
    for (let i = FX.dust.length - 1; i >= 0; i--) {
      const p = FX.dust[i];
      if (!FZ) {
        p.l++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.955;
        p.vy = p.vy * 0.97 + 0.0015;
      }
      const k = 1 - p.l / p.m;
      if (k <= 0) {
        FX.dust.splice(i, 1);
        continue;
      }
      c.globalAlpha = Math.min(1, k * 2) * 0.55;
      c.fillStyle = "rgb(206,196,182)";
      c.beginPath();
      c.arc(p.x, p.y, p.r, 0, 6.283);
      c.fill();
    }
    c.globalCompositeOperation = "lighter";
    for (let i = FX.blue.length - 1; i >= 0; i--) {
      const p = FX.blue[i];
      if (!FZ) {
        p.l++;
        if (p.l > p.d) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 1.01;
          p.vy -= 0.01;
        }
      }
      const k = 1 - p.l / p.m;
      if (k <= 0) {
        FX.blue.splice(i, 1);
        continue;
      }
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, "rgba(200,220,255,.95)");
      g.addColorStop(0.35, "rgba(90,140,230,.55)");
      g.addColorStop(1, "rgba(58,123,213,0)");
      c.globalAlpha = Math.min(1, k * 1.6);
      c.fillStyle = g;
      c.beginPath();
      c.arc(p.x, p.y, p.r * 4, 0, 6.283);
      c.fill();
    }
    for (let i = FX.gold.length - 1; i >= 0; i--) {
      const p = FX.gold[i];
      if (!FZ) {
        p.l++;
        if (p.l < 85) {
          p.a += p.av;
          p.rr += 0.18;
          p.ring.x += (lastPtr.x - p.ring.x) * 0.004;
          p.ring.y += (lastPtr.y - p.ring.y) * 0.004;
          p.x = p.ring.x + Math.cos(p.a) * p.rr;
          p.y = p.ring.y + Math.sin(p.a) * p.rr * 0.92;
        } else {
          if (p.l === 85) {
            const s = 5 + Math.random() * 7;
            p.vx = Math.cos(p.a) * s;
            p.vy = Math.sin(p.a) * s;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy = p.vy * 0.95 + 0.08;
        }
      }
      const k = 1 - p.l / p.m;
      if (k <= 0) {
        FX.gold.splice(i, 1);
        continue;
      }
      const g = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
      g.addColorStop(0, "#FFF4C8");
      g.addColorStop(0.3, "rgba(240,180,70,.7)");
      g.addColorStop(1, "rgba(212,175,55,0)");
      c.globalAlpha = Math.min(1, k * 1.5);
      c.fillStyle = g;
      c.beginPath();
      c.arc(p.x, p.y, p.r * 5, 0, 6.283);
      c.fill();
    }
    c.globalAlpha = 1;
    c.globalCompositeOperation = "source-over";
  });
}

/** "Wall!" — the page is thrown sideways. */
export function wall() {
  const el = curPage();
  if (!el) return;
  sfx.hit();
  el.animate(
    [
      { transform: "none" },
      { transform: "translateX(8vw) rotate(.4deg)", offset: 0.12 },
      { transform: "translateX(7.6vw) rotate(.35deg)", offset: 0.62 },
      { transform: "none" },
    ],
    { duration: 2800, easing: "cubic-bezier(.2,.8,.2,1)" },
  );
  document.body.animate(
    [
      { transform: "none" },
      { transform: "translate(-7px,2px)" },
      { transform: "translate(5px,-2px)" },
      { transform: "translate(-2px,1px)" },
      { transform: "none" },
    ],
    { duration: 420 },
  );
  for (let i = 0; i < 190; i++)
    FX.dust.push({
      x: innerWidth * (0.45 + Math.random() * 0.55),
      y: Math.random() * innerHeight,
      vx: 3 + Math.random() * 7,
      vy: (Math.random() - 0.5) * 1.4,
      r: 0.5 + Math.random() * 1.6,
      l: 0,
      m: 320 + Math.random() * 260,
    });
}

/* ---------- the frozen hour ---------- */
let paused: Animation[] = [];
let fzT: ReturnType<typeof setTimeout> | undefined;

export function freeze() {
  if (isFrozen()) {
    release();
    return;
  }
  setFrozen(true);
  sfx.glass(5.5);
  paused = document.getAnimations().filter((a) => a.playState === "running");
  paused.forEach((a) => {
    try {
      a.pause();
    } catch {}
  });
  document.documentElement.classList.add("frozen");
  musicBox().pause();
  bgm.duck(true);
  fzT = setTimeout(release, 7000);
  setTimeout(() => addEventListener("pointerdown", release, { once: true }), 60);
}

function release() {
  if (!isFrozen()) return;
  setFrozen(false);
  clearTimeout(fzT);
  document.documentElement.classList.remove("frozen");
  bgm.duck(false);
  paused.forEach((a) => {
    try {
      a.play();
    } catch {}
  });
  paused = [];
}

/** "Summon" — a book flies to her hand, then back. */
export function summon(src: HTMLImageElement | null, tx?: number, ty?: number) {
  const pg = curPage();
  if (!pg) return;
  const imgs = [...pg.querySelectorAll<HTMLImageElement>(".bk .cv img,.book3d img,.sc .stack img,.fan img")].filter(
    (i) => {
      const r = i.getBoundingClientRect();
      return r.width > 30 && r.bottom > 0 && r.top < innerHeight && i.style.visibility !== "hidden";
    },
  );
  const img = src || imgs[(Math.random() * imgs.length) | 0];
  if (!img) return;
  const r = img.getBoundingClientRect();
  const lp = lastPointer();
  const X = tx ?? lp.x,
    Y = ty ?? lp.y;
  const cl = img.cloneNode() as HTMLImageElement;
  Object.assign(cl.style, {
    position: "fixed",
    left: r.left + "px",
    top: r.top + "px",
    width: r.width + "px",
    height: r.height + "px",
    zIndex: "70",
    margin: "0",
    borderRadius: "3px 6px 6px 3px",
    boxShadow: "0 30px 60px rgba(0,0,0,.6),0 0 40px rgba(230,128,46,.25)",
    pointerEvents: "none",
    objectFit: "cover",
    transform: "none",
  });
  document.body.appendChild(cl);
  img.style.visibility = "hidden";
  sfx.whoosh();
  const dx = X - (r.left + r.width / 2),
    dy = Y - (r.top + r.height / 2),
    lift = Math.min(160, Math.abs(dx) * 0.3 + 60);
  cl.animate(
    [
      { transform: "translate(0,0) rotate(0)" },
      { transform: `translate(${dx * 0.1}px,${dy * 0.1 - 8}px) rotate(-3deg)`, offset: 0.12 },
      { transform: `translate(${dx * 0.55}px,${dy * 0.55 - lift}px) rotate(-12deg) scale(1.08)`, offset: 0.55 },
      { transform: `translate(${dx}px,${dy}px) rotate(3deg) scale(1.14)`, offset: 0.88 },
      { transform: `translate(${dx}px,${dy + 5}px) rotate(0) scale(1.12)` },
    ],
    { duration: 950, easing: "cubic-bezier(.35,.6,.2,1)", fill: "forwards" },
  ).onfinish = () => {
    burst(X, Y, 22);
    setTimeout(() => {
      sfx.whoosh(true);
      cl.animate([{ transform: `translate(${dx}px,${dy + 5}px) scale(1.12)` }, { transform: "none" }], {
        duration: 850,
        easing: "cubic-bezier(.6,0,.3,1)",
        fill: "forwards",
      }).onfinish = () => {
        cl.remove();
        img.style.visibility = "";
      };
    }, 1400);
  };
}

/** "Vanish" — Delia's blue dust. */
export function vanish(target?: HTMLElement | null) {
  const pg = curPage();
  const el = target || (pg && pg.querySelector<HTMLElement>(".book3d img,.bk .cv img,.phead h1,h1,h2"));
  if (!el || el.dataset.gone) return;
  el.dataset.gone = "1";
  const r = el.getBoundingClientRect();
  sfx.whoosh(true);
  sfx.glass(2.4);
  for (let i = 0; i < 300; i++) {
    const x = r.left + Math.random() * r.width,
      y = r.top + Math.random() * r.height;
    FX.blue.push({
      x,
      y,
      vx: 1.2 + Math.random() * 4.5,
      vy: (Math.random() - 0.5) * 1.2 - 0.4,
      r: 0.5 + Math.random() * 1.6,
      l: 0,
      m: 120 + Math.random() * 90,
      d: ((x - r.left) / Math.max(1, r.width)) * 38,
    });
  }
  const a = el.animate(
    [
      { opacity: 1, filter: "blur(0)", clipPath: "inset(0 0 0 0)" },
      { opacity: 0, filter: "blur(5px)", clipPath: "inset(0 0 0 100%)" },
    ],
    { duration: 900, easing: "ease-in", fill: "forwards" },
  );
  setTimeout(() => {
    a.cancel();
    el.animate(
      [
        { opacity: 0, filter: "blur(6px)" },
        { opacity: 1, filter: "blur(0)" },
      ],
      { duration: 1100, easing: "ease-out" },
    );
    delete el.dataset.gone;
  }, 2800);
}

/** "Time to play, my lords." — a ring of gold sparks. */
export function lords(x?: number, y?: number) {
  sfx.whine(1.45);
  setTimeout(() => sfx.crackle(1.4), 1350);
  const lp = lastPointer();
  const ring = { x: x ?? lp.x, y: y ?? lp.y };
  for (let i = 0; i < 140; i++)
    FX.gold.push({
      ring,
      a: Math.random() * 6.283,
      rr: 34 + Math.random() * 14,
      av: 0.07 + Math.random() * 0.05,
      l: 0,
      m: 150 + Math.random() * 40,
      r: 0.5 + Math.random() * 1.5,
      x: ring.x,
      y: ring.y,
      vx: 0,
      vy: 0,
    });
}

/** "Forget" — the first paragraph fades from the edges inward, then returns. */
export function forget() {
  const pg = curPage();
  const el = pg && pg.querySelector<HTMLElement>(".lede");
  if (!el || el.dataset.f) return;
  el.dataset.f = "1";
  const orig = el.innerHTML,
    words = (el.textContent || "").trim().split(/\s+/);
  el.textContent = "";
  words.forEach((w, i) => {
    const s = document.createElement("span");
    s.textContent = w;
    s.style.transition = "opacity .7s,filter .7s";
    el.appendChild(s);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  const sp = [...el.querySelectorAll("span")],
    n = sp.length,
    mx = Math.ceil(n / 2);
  sfx.glass(4.5);
  sp.forEach((s, i) => {
    const d = Math.min(i, n - 1 - i);
    setTimeout(() => {
      s.style.opacity = "0";
      s.style.filter = "blur(5px)";
    }, 200 + d * 110);
  });
  const back = 200 + mx * 110 + 1500;
  sp.forEach((s, i) => {
    const d = Math.min(i, n - 1 - i);
    setTimeout(
      () => {
        s.style.opacity = "1";
        s.style.filter = "none";
      },
      back + (mx - d) * 60,
    );
  });
  setTimeout(
    () => {
      el.innerHTML = orig;
      delete el.dataset.f;
    },
    back + mx * 60 + 900,
  );
}

/** Typing "thea": the music box plays backwards and the world turns blue. */
export function theaEgg() {
  const rev = reversedMusicBox();
  if (!rev.paused) return;
  const music = musicBox();
  music.volume = Math.min(music.volume, 0.05);
  if (isSoundOn()) {
    rev.currentTime = 0;
    rev.play().catch(() => {});
    bgm.duck(true);
    setTimeout(() => bgm.duck(false), 12500);
  }
  document.documentElement.classList.add("memory");
  for (let i = 0; i < 160; i++)
    FX.blue.push({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -0.2 - Math.random() * 0.5,
      r: 0.4 + Math.random() * 1.2,
      l: 0,
      m: 300 + Math.random() * 200,
      d: 0,
    });
  setTimeout(() => {
    document.documentElement.classList.remove("memory");
  }, 12500);
}

