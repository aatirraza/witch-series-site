"use client";

/**
 * Page transitions, matching the original hash router: a navigation plays the
 * flame "veil" from the last click point, bursts embers, and swaps the page
 * under the veil. This applies to links and to the browser's Back/Forward alike.
 *
 * The veil runs in two halves (see "Page veil, split for Next.js" in globals.css):
 *  1. it grows to full opacity (337.5ms) and stays there;
 *  2. it fades, once the new page has painted underneath.
 * The page swap is tied to the end of half 1 rather than to a timer, so even if
 * the browser is busy and the veil starts late, the swap is always fully covered.
 * When everything is quick, the two halves run back to back exactly like the
 * original 0.75s animation (the original swaps at 330ms; here it is 337.5ms).
 */

import { burst, motion } from "./fx";
import { applyPendingSeries } from "./series";

type Push = (href: string) => void;

/** The original re-closes the door 400ms after the footer ember is clicked. */
const DOOR_DELAY = 400;

const state = {
  lastClick: { x: 0, y: 0 },
  veil: null as HTMLElement | null,
  push: null as Push | null,
  /** A navigation we started is under way (its veil is up). */
  ownTransition: false,
  /** The veil's first half has finished: the screen is fully covered. */
  covered: false,
  /** The new page has rendered and painted under the veil. */
  painted: true,
  /** The page swap waiting for full cover. */
  pendingSwap: null as null | (() => void),
  safety: undefined as ReturnType<typeof setTimeout> | undefined,
  replayingPop: false,
  doorReopen: null as null | (() => void),
  /** The ember asked for the door before the home page was on screen. */
  doorPending: false,
  shownPath: "",
};

export function bindNav(veil: HTMLElement, push: Push) {
  if (state.veil !== veil) {
    veil.addEventListener("animationend", (e) => {
      if (e.animationName === "veilin") onCovered();
    });
  }
  state.veil = veil;
  state.push = push;
  if (!state.lastClick.x && !state.lastClick.y) state.lastClick = { x: innerWidth / 2, y: innerHeight / 2 };
}

export function trackClick(x: number, y: number) {
  state.lastClick = { x, y };
}

/** Start (or join) a transition; `swap` runs as soon as the screen is fully covered. */
function transition(swap: () => void) {
  if (state.ownTransition) {
    // Already under way: replace the swap, or run it now if the veil is already up.
    if (state.covered) {
      state.painted = false;
      swap();
    } else state.pendingSwap = swap;
    return;
  }
  state.ownTransition = true;
  state.covered = false;
  state.painted = false;
  state.pendingSwap = swap;
  const v = state.veil;
  if (v) {
    const { x, y } = state.lastClick;
    v.style.setProperty("--vx", x + "px");
    v.style.setProperty("--vy", y + "px");
    v.classList.remove("vin", "vout");
    void v.offsetWidth;
    v.classList.add("vin");
    burst(x, y, 50);
  }
  // Never get stuck: if the veil's animation can't run, swap and lift anyway.
  clearTimeout(state.safety);
  state.safety = setTimeout(() => {
    if (!state.covered) onCovered();
    state.safety = setTimeout(() => {
      state.painted = true;
      state.ownTransition = false;
      maybeLift();
    }, 5000);
  }, 1500);
}

function onCovered() {
  state.covered = true;
  const swap = state.pendingSwap;
  state.pendingSwap = null;
  swap?.();
  maybeLift();
}

/** Fade the veil out once it is fully up and the new page is on screen. */
function maybeLift() {
  const v = state.veil;
  if (!state.covered || !state.painted) return;
  clearTimeout(state.safety);
  if (v?.classList.contains("vin")) {
    v.classList.remove("vin");
    v.classList.add("vout");
  }
}

function endTransition() {
  state.ownTransition = false;
  // Two frames: the new page is painted under the veil before it may lift.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      state.painted = true;
      maybeLift();
    }),
  );
}

/** Navigate with the veil. */
export function go(href: string) {
  if (!state.push) return;
  // Same page: the original hash router does nothing at all.
  if (href === state.shownPath && !state.ownTransition) return;
  const push = state.push;
  const swap = () => {
    if (href === "/books") applyPendingSeries();
    if (href === state.shownPath) endTransition();
    else push(href);
  };
  if (motion.reduce) swap();
  else transition(swap);
}

/**
 * Back/Forward. Our capturing listener on window runs before Next's own one, holds
 * the event back, plays the veil, then replays it to Next once the screen is covered.
 */
let historyBound = false;
export function bindHistory() {
  if (historyBound) return;
  historyBound = true;
  addEventListener(
    "popstate",
    (e) => {
      if (state.replayingPop) return;
      const arriving = () => {
        if (location.pathname === "/books") applyPendingSeries();
      };
      // Reduced motion, or a history step that stays on this page: hand it straight to Next.
      if (motion.reduce || (!state.ownTransition && location.pathname === state.shownPath)) {
        arriving();
        return;
      }
      e.stopImmediatePropagation();
      transition(() => {
        // Read the location now: several quick steps may have happened meanwhile.
        const stays = location.pathname === state.shownPath;
        if (!stays) arriving();
        state.replayingPop = true;
        dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
        state.replayingPop = false;
        // Steps that end where we started: nothing to swap, lift the veil.
        if (stays) endTransition();
      });
    },
    { capture: true },
  );
}

/** Called by each page the moment it is on screen (see PageShown). */
export function pageShown(path: string) {
  if (path === state.shownPath) return;
  const firstPage = state.shownPath === "";
  state.shownPath = path;
  // The original scrolls to the top on every page change (not on first load).
  if (!firstPage) window.scrollTo({ top: 0, behavior: "auto" });
  if (state.ownTransition) endTransition();
}

/** The page on screen right now. */
export const shownPath = () => state.shownPath;

/** The home page door registers how to close itself again. */
export function registerDoor(fn: (() => void) | null) {
  state.doorReopen = fn;
  if (fn && state.doorPending) {
    state.doorPending = false;
    fn();
  }
}

/** Go to the home page and close the door again (the ember in the footer). */
export function toGate() {
  go("/");
  setTimeout(() => {
    if (state.shownPath === "/" && state.doorReopen) state.doorReopen();
    else state.doorPending = true;
  }, DOOR_DELAY);
}
