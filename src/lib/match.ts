"use client";

/**
 * The Book Match game, ported from the original. All state lives here, outside
 * React, so a game in progress survives leaving the page and coming back, as on
 * the one-page original. Components subscribe and re-render on change.
 */

import { coverSrc, SERIES } from "../../data/books";
import { MATCH_EXCLUDE, MATCH_LEVELS } from "../../data/game";
import { ac, sfx } from "./sound";
import { STORAGE, readJSON, writeJSON } from "./storage";

export type MatchBook = { t: string; c: string; u: string; s: string };

export type Msg =
  | { kind: "none" }
  | { kind: "start" }
  | { kind: "pair"; book: MatchBook }
  | { kind: "win"; last: boolean };

/** Every book in the deck pool (one cover per title). */
const MB: MatchBook[] = SERIES.flatMap((s) =>
  s.books.filter((b) => !MATCH_EXCLUDE.includes(b.key)).map((b) => ({ t: b.title, c: b.key, u: b.url, s: s.name })),
);

export const matchSrc = (c: string) => coverSrc(c);

const g = {
  level: 0,
  deck: [] as MatchBook[],
  open: [] as number[],
  found: new Set<string>(),
  miss: [] as number[],
  moves: 0,
  lock: false,
  won: false,
  last: null as MatchBook | null,
  best: {} as Record<number, number>,
  done: new Set<number>(),
  msg: { kind: "none" } as Msg,
  showNext: false,
  /** Bumped on each new deal, so the cards are rebuilt (no flip-back animation). */
  deal: 0,
  loaded: false,
  version: 0,
};

const listeners = new Set<() => void>();
const emit = () => {
  g.version++;
  listeners.forEach((l) => l());
};

export function subscribeMatch(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export const matchVersion = () => g.version;
export const matchState = () => g;

function load() {
  if (g.loaded) return;
  g.loaded = true;
  g.best = readJSON<Record<number, number>>(STORAGE.matchBest, {});
  g.done = new Set(readJSON<number[]>(STORAGE.matchDone, []));
}

function save() {
  writeJSON(STORAGE.matchBest, g.best);
  writeJSON(STORAGE.matchDone, [...g.done]);
}

function shuffle<T>(a: T[]): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function isLevelLocked(i: number) {
  return i > 0 && !g.done.has(i - 1) && !g.done.has(i);
}

/** Deal a shelf. */
export function start(i: number) {
  load();
  g.level = i;
  const L = MATCH_LEVELS[i];
  const groups = shuffle(SERIES.map((s) => shuffle(MB.filter((b) => b.s === s.name))));
  const pick: MatchBook[] = [];
  while (pick.length < L.p)
    groups.forEach((gr) => {
      if (gr.length && pick.length < L.p) pick.push(gr.pop()!);
    });
  g.deck = shuffle([...pick, ...pick]);
  g.open = [];
  g.found = new Set();
  g.miss = [];
  g.moves = 0;
  g.lock = false;
  g.won = false;
  g.last = null;
  g.showNext = false;
  g.msg = { kind: "start" };
  g.deal++;
  emit();
}

/** On arriving at the page: deal the first shelf not yet cleared, once. */
export function enterPlay() {
  load();
  if (g.deck.length) return;
  let s = 0;
  while (g.done.has(s) && s < MATCH_LEVELS.length - 1) s++;
  start(s);
}

type Hooks = {
  /** Embers at a card. */
  burstAt: (index: number, n: number) => void;
  /** Embers over the whole grid. */
  burstGrid: (n: number) => void;
  /** Show the shelf-cleared card. */
  showWin: (book: MatchBook, first: boolean, last: boolean) => void;
};

export function tap(i: number, hooks: Hooks) {
  if (g.won || g.lock) return;
  const b = g.deck[i];
  if (g.found.has(b.c) || g.open.includes(i)) return;
  ac();
  g.open.push(i);
  sfx.tone(540, 0.18, 0.03);
  emit();
  if (g.open.length < 2) return;
  g.moves++;
  const [x, y] = g.open;
  if (g.deck[x].c === g.deck[y].c) {
    g.found.add(b.c);
    g.open = [];
    g.last = b;
    g.msg = { kind: "pair", book: b };
    emit();
    setTimeout(() => {
      sfx.tone(660, 0.35, 0.04);
      setTimeout(() => sfx.tone(880, 0.5, 0.035), 110);
    }, 180);
    hooks.burstAt(i, 16);
    if (g.found.size === MATCH_LEVELS[g.level].p) setTimeout(() => win(hooks), 800);
  } else {
    g.lock = true;
    g.miss = [x, y];
    emit();
    setTimeout(() => {
      g.miss = [];
      g.open = [];
      g.lock = false;
      emit();
    }, 1000);
  }
}

function win(hooks: Hooks) {
  g.won = true;
  const first = !g.done.has(g.level),
    last = g.level === MATCH_LEVELS.length - 1;
  g.done.add(g.level);
  if (g.best[g.level] == null || g.moves < g.best[g.level]) g.best[g.level] = g.moves;
  save();
  hooks.burstGrid(70);
  sfx.glass(3);
  g.msg = { kind: "win", last };
  if (!last) g.showNext = true;
  emit();
  const book = g.last || g.deck[0];
  setTimeout(() => hooks.showWin(book, first, last), 900);
}

export function restart() {
  start(g.level);
}

export function nextShelf() {
  if (g.level < MATCH_LEVELS.length - 1) start(g.level + 1);
}
