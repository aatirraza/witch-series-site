"use client";

/**
 * The Descent, ported from the original. Like the original, the scroll journey
 * drives the page elements directly every frame (fast, and identical in timing);
 * React renders the views and the thread cards from the state kept here.
 *
 * State lives in this module so an intro, a chosen thread and recovered memories
 * survive leaving the page, exactly like the one-page original.
 */

import { flushSync } from "react-dom";
import { DESCENT, MEM_TOTAL, THREADS, type Hotspot, type Thread } from "../../data/descent";
import { burst, lastPointer, motion } from "./fx";
import { openMemory } from "./memory";
import { ac, sfx } from "./sound";
import { STORAGE, readJSON, writeJSON } from "./storage";
import { toast } from "./toast";

export type DescentView = "intro" | "pick" | "journey";

const D = {
  loaded: false,
  introRan: false,
  /** How many intro log steps have been shown (0–4). */
  introK: 0,
  ready: false,
  /**
   * The thread cards as last drawn. Like the original, they are only redrawn when
   * the list is shown, and otherwise stay as they were in the hidden list.
   */
  cards: null as null | { n: number; got: number; followed: boolean }[],
  view: "intro" as DescentView,
  thread: null as Thread | null,
  curS: -1,
  useA: true,
  mems: new Set<string>(),
  doneT: new Set<string>(),
  version: 0,
};

/** Page elements, bound by the component (they may be hidden or detached; see dTick). */
export type DescentEls = {
  dsc: HTMLElement;
  dj: HTMLElement;
  dstage: HTMLElement;
  dimgA: HTMLElement;
  dimgB: HTMLElement;
  dcap: HTMLElement;
  dkick: HTMLElement;
  dh: HTMLElement;
  dp: HTMLElement;
  hots: HTMLElement;
  dhint: HTMLElement;
  hloc: HTMLElement;
  hyear: HTMLElement;
  hmem: HTMLElement;
  dticks: HTMLElement;
  dprog: HTMLElement;
  dend: HTMLElement;
  dendh: HTMLElement;
  dendp: HTMLElement;
  dspace: HTMLElement;
};
let E: DescentEls | null = null;

const listeners = new Set<() => void>();
function emit() {
  D.version++;
  listeners.forEach((l) => l());
}
export function subscribeDescent(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export const descentVersion = () => D.version;
export const descentState = () => D;

function load() {
  if (D.loaded) return;
  D.loaded = true;
  D.mems = new Set(readJSON<string[]>(STORAGE.memories, []));
  D.doneT = new Set(readJSON<string[]>(STORAGE.threads, []));
}
function saveD() {
  writeJSON(STORAGE.memories, [...D.mems]);
  writeJSON(STORAGE.threads, [...D.doneT]);
}

const hotCount = (t: Thread) => t.scenes.reduce((b, s) => b + (s.hots ? s.hots.length : 0), 0);
const memId = (t: Thread, s: number, j: number) => `${t.id}:${s}:${j}`;
export function threadCounts(t: Thread) {
  const n = hotCount(t),
    got = t.scenes.reduce(
      (b, s, si) => b + (s.hots ? s.hots.filter((h, j) => D.mems.has(memId(t, si, j))).length : 0),
      0,
    );
  return { n, got };
}

/** Redraw the thread cards (the original's paintThreads). */
function paintThreads() {
  D.cards = THREADS.map((t) => ({ ...threadCounts(t), followed: D.doneT.has(t.id) }));
}

/* ---------- intro ---------- */
function runIntro() {
  if (D.introRan) return;
  D.introRan = true;
  const tick = () => {
    if (D.introK >= DESCENT.introSteps.length) {
      D.ready = true;
      emit();
      return;
    }
    D.introK++;
    emit();
    setTimeout(tick, motion.reduce ? 60 : 620);
  };
  setTimeout(tick, 300);
}

/** React's development mode mounts twice in a row; count that as one arrival. */
let entering = false;

/** On arriving at the page (the original's enterDescent). */
export function enterDescent() {
  if (entering) return;
  entering = true;
  setTimeout(() => (entering = false), 0);
  load();
  if (!D.introRan) {
    D.view = "intro";
    emit();
    runIntro();
  } else if (!D.thread) {
    paintThreads();
    emit();
  }
  setTimeout(dTick, 50);
}

export function begin() {
  ac();
  flushSync(() => {
    D.view = "pick";
    paintThreads();
    emit();
  });
  E?.dsc.scrollIntoView({ block: "start" });
  const p = lastPointer();
  burst(p.x, p.y, 40);
}

/* ---------- journey ---------- */
export function startThread(i: number) {
  const t = THREADS[i];
  D.thread = t;
  D.curS = -1;
  flushSync(() => {
    D.view = "journey";
    emit();
  });
  if (!E) return;
  E.dend.classList.remove("on");
  E.dj.style.setProperty("--tc", t.tc);
  document.documentElement.style.setProperty("--glow", t.tc);
  E.dspace.style.setProperty("--n", String(t.scenes.length));
  E.dticks.innerHTML = t.scenes
    .map((s, j) => (j ? `<span style="left:${(j / t.scenes.length) * 100}%"></span>` : ""))
    .join("");
  [E.dimgA, E.dimgB].forEach((el) => {
    el.style.opacity = "0";
  });
  window.scrollTo({ top: E.dj.getBoundingClientRect().top + scrollY - 64, behavior: "auto" });
  E.dhint.style.opacity = "1";
  setScene(0, true);
  dTick();
}

export function toThreads() {
  flushSync(() => {
    D.view = "pick";
    D.thread = null;
    paintThreads();
    emit();
  });
  document.documentElement.style.setProperty("--glow", DESCENT.defaultGlow);
  E?.dsc.scrollIntoView({ block: "start" });
}

let yearRaf = 0;
function animYear(a: number | string, b: number | string) {
  cancelAnimationFrame(yearRaf);
  const el = E!.hyear;
  if (typeof a !== "number" || typeof b !== "number" || a === b) {
    el.textContent = String(b);
    return;
  }
  const t0 = performance.now(),
    d = 1600;
  const st = () => {
    const k = Math.min(1, (performance.now() - t0) / d),
      e = 1 - Math.pow(1 - k, 3);
    el.textContent = String(Math.round(a + (b - a) * e));
    if (k < 1) yearRaf = requestAnimationFrame(st);
  };
  st();
}

function setScene(s: number, first?: boolean) {
  if (s === D.curS || !E || !D.thread) return;
  const t = D.thread,
    prev = D.curS;
  D.curS = s;
  const sc = t.scenes[s];
  const nxt = D.useA ? E.dimgA : E.dimgB,
    old = D.useA ? E.dimgB : E.dimgA;
  D.useA = !D.useA;
  nxt.style.backgroundImage = `url(/d/${sc.img}.jpg)`;
  nxt.style.transition = "opacity 1.4s ease, filter 1.4s ease";
  old.style.transition = "opacity 1.4s ease, filter 1.4s ease";
  nxt.style.opacity = "1";
  nxt.style.filter = "brightness(.62) saturate(.75)";
  old.style.opacity = "0";
  old.style.filter = "brightness(.4) saturate(.6) blur(6px)";
  nxt.style.zIndex = "1";
  old.style.zIndex = "0";
  nxt.dataset.s = String(s);
  E.dkick.textContent = sc.k;
  E.dh.textContent = sc.h;
  E.dp.textContent = sc.p;
  E.dcap.classList.remove("swap");
  void E.dcap.offsetWidth;
  E.dcap.classList.add("swap");
  E.hloc.textContent = sc.loc;
  animYear(prev < 0 ? sc.year : t.scenes[prev].year, sc.year);
  const hots = E.hots;
  hots.innerHTML = "";
  (sc.hots || []).forEach((h, j) => {
    const id = memId(t, s, j);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "hot" + (D.mems.has(id) ? " got" : "");
    b.style.left = h.x + "%";
    b.style.top = h.y + "%";
    b.setAttribute("aria-label", DESCENT.memoryLabel(h.t));
    const label = document.createElement("span");
    label.textContent = h.t;
    b.appendChild(label);
    b.onclick = () => openMem(h, id, b);
    hots.appendChild(b);
    setTimeout(() => b.classList.add("on"), first ? 600 : 900 + j * 200);
  });
  if (!first && !motion.reduce) sfx.whoosh(true);
}

/** The scroll handler. Bound to the window for good, like the original's. */
export function dTick() {
  const t = D.thread;
  if (!t || !E || D.view !== "journey") return;
  const r = E.dj.getBoundingClientRect(),
    stage = E.dstage.offsetHeight,
    span = E.dj.offsetHeight - stage;
  const p = Math.min(1, Math.max(0, (64 - r.top) / Math.max(1, span)));
  E.dprog.style.setProperty("--p", String(p));
  const n = t.scenes.length,
    f = Math.min(n - 0.001, p * n * 1.04),
    s = Math.floor(f);
  setScene(s);
  const local = f - s,
    img = document.querySelector<HTMLElement>('.dimg[data-s="' + s + '"]');
  if (img && !motion.reduce)
    img.style.transform = `scale(${1.04 + local * 0.12}) translate(${-local * 1.5}%,${-local * 1}%)`;
  if (p > 0.02) E.dhint.style.opacity = "0";
  E.dend.classList.toggle("on", p > 0.985);
  if (p > 0.985 && !D.doneT.has(t.id)) {
    D.doneT.add(t.id);
    saveD();
    emit();
  }
  if (p > 0.985) {
    const { n: tot, got } = threadCounts(t);
    E.dendh.textContent = got === tot ? DESCENT.end.allFound : DESCENT.end.someFound(got, tot);
    E.dendp.textContent = got === tot ? DESCENT.end.allText : DESCENT.end.someText;
  }
  E.hmem.textContent = DESCENT.hudMem(D.mems.size, MEM_TOTAL);
}

function openMem(h: Hotspot, id: string, btn: HTMLElement) {
  const fresh = !D.mems.has(id);
  D.mems.add(id);
  saveD();
  btn.classList.add("got");
  openMemory(
    {
      image: h.sheet ? `/img/${h.im}.jpg` : `/d/${h.im}.jpg`,
      contain: Boolean(h.c || h.sheet),
      kicker: DESCENT.memoryKicker(fresh),
      title: h.h,
      quote: h.q,
      text: h.p,
      count: DESCENT.memoryCount(D.mems.size, MEM_TOTAL),
    },
    btn,
  );
  if (fresh) {
    sfx.glass(2.6);
    const r = btn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 50);
  }
  if (E) E.hmem.textContent = DESCENT.hudMem(D.mems.size, MEM_TOTAL);
  emit();
  if (fresh && D.mems.size === MEM_TOTAL)
    setTimeout(() => {
      const a = DESCENT.allRecovered(MEM_TOTAL);
      toast(
        <>
          {a.before}
          <b>{a.b}</b>
          {a.after}
        </>,
      );
    }, 900);
}

/* ---------- binding ---------- */
let bound = false;

/**
 * Bind the page elements. If the page was rebuilt while a thread was open, put
 * the current scene back as it was (the original's page was never rebuilt).
 */
export function bindDescent(els: DescentEls) {
  E = els;
  if (!bound) {
    bound = true;
    addEventListener("scroll", dTick, { passive: true });
    addEventListener("resize", dTick);
  }
  const t = D.thread;
  if (t && D.view === "journey" && !els.dimgA.style.backgroundImage && !els.dimgB.style.backgroundImage) {
    els.dj.style.setProperty("--tc", t.tc);
    els.dspace.style.setProperty("--n", String(t.scenes.length));
    els.dticks.innerHTML = t.scenes
      .map((s, j) => (j ? `<span style="left:${(j / t.scenes.length) * 100}%"></span>` : ""))
      .join("");
    els.dhint.style.opacity = "0";
    const s = D.curS;
    D.curS = -1;
    if (s >= 0) setScene(s, true);
  }
}
