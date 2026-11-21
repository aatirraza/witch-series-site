"use client";

/** The seven hidden secrets and the global triggers, ported from the original. */

import { GRIMOIRE, SECRETS, TYPED, type SecretId } from "../../data/spells";
import { forget, lords, summon, theaEgg, wall } from "./spells";
import { ac } from "./sound";
import { STORAGE, readJSON, writeJSON } from "./storage";
import { toast } from "./toast";

let got = new Set<string>();
let loaded = false;
let version = 0;
const listeners = new Set<() => void>();

function load() {
  if (loaded) return;
  loaded = true;
  got = new Set(readJSON<string[]>(STORAGE.secrets, []));
}

export function subscribeSecrets(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export const secretsVersion = () => {
  load();
  return version;
};
export const hasSecret = (id: string) => got.has(id);
export const secretCount = () => got.size;

/** Record a secret (once) and announce it. */
export function secret(id: SecretId) {
  load();
  if (got.has(id)) return;
  got.add(id);
  writeJSON(STORAGE.secrets, [...got]);
  version++;
  listeners.forEach((l) => l());
  const s = SECRETS.find((x) => x.id === id)!;
  const t = GRIMOIRE.found(s.n, got.size, SECRETS.length);
  toast(
    <>
      {t.before}
      <b>{t.b}</b>
      {t.after}
    </>,
  );
}

let bound = false;
/** Typed words and double-clicking a library cover. Bound once, on the whole page. */
export function bindSecretTriggers() {
  if (bound) return;
  bound = true;
  load();
  let typed = "";
  addEventListener("keydown", (e) => {
    const t = e.target as Element | null;
    if (t?.closest && t.closest("input,textarea,[contenteditable]")) return;
    if (e.key.length !== 1) return;
    if (e.key === " " && /my$/.test(typed)) e.preventDefault();
    typed = (typed + e.key.toLowerCase()).slice(-TYPED.memory);
    if (typed.endsWith(TYPED.wall)) {
      typed = "";
      ac();
      wall();
      secret("wall");
    } else if (typed.endsWith(TYPED.lords)) {
      typed = "";
      ac();
      lords();
      secret("lords");
    } else if (typed.endsWith(TYPED.thea)) {
      typed = "";
      ac();
      theaEgg();
      secret("thea");
    } else if (typed.endsWith(TYPED.forget)) {
      typed = "";
      forget();
    }
  });
  document.addEventListener("dblclick", (e) => {
    const img = (e.target as Element | null)?.closest?.(".bk .cv")?.querySelector("img");
    if (!img) return;
    e.preventDefault();
    ac();
    const r = img.getBoundingClientRect();
    summon(img, Math.min(innerWidth - 120, r.left + r.width / 2 + 220), Math.max(140, r.top + r.height / 2 - 40));
    secret("dbl");
  });
}
