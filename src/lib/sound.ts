"use client";

/**
 * Sound engine: Web Audio effects, the generative background score and the
 * reversed music box. Nothing here runs until the browser calls it after mount.
 */

import { STORAGE } from "./storage";

let AC: AudioContext | null = null;
let soundOn = true;
let loaded = false;
const listeners = new Set<(on: boolean) => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    soundOn = localStorage.getItem(STORAGE.sound) !== "off";
  } catch {}
}

export function isSoundOn() {
  load();
  return soundOn;
}

export function subscribeSound(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function setSoundOn(v: boolean) {
  load();
  soundOn = v;
  try {
    localStorage.setItem(STORAGE.sound, v ? "on" : "off");
  } catch {}
  listeners.forEach((l) => l(v));
  if (v) {
    ac();
    bgm.start();
  } else bgm.stop();
}

/** The shared AudioContext, created and resumed on demand. */
export function ac(): AudioContext | null {
  if (!AC) {
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      AC = new Ctor();
    } catch {
      AC = null;
    }
  }
  if (AC && AC.state === "suspended") AC.resume();
  return AC;
}

function nbuf(a: AudioContext, d: number) {
  const b = a.createBuffer(1, Math.ceil(a.sampleRate * d), a.sampleRate),
    c = b.getChannelData(0);
  for (let i = 0; i < c.length; i++) c[i] = Math.random() * 2 - 1;
  return b;
}

function env(g: GainNode, t: number, a: number, peak: number, d: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
}

const ready = () => {
  const a = ac();
  return a && isSoundOn() ? a : null;
};

export const sfx = {
  hit() {
    const a = ready();
    if (!a) return;
    const t = a.currentTime,
      o = a.createOscillator(),
      g = a.createGain();
    o.frequency.setValueAtTime(92, t);
    o.frequency.exponentialRampToValueAtTime(36, t + 0.7);
    env(g, t, 0.015, 0.6, 1.8);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + 1.9);
    const n = a.createBufferSource();
    n.buffer = nbuf(a, 0.5);
    const f = a.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 520;
    const ng = a.createGain();
    env(ng, t, 0.005, 0.4, 0.45);
    n.connect(f).connect(ng).connect(a.destination);
    n.start(t);
  },
  glass(d = 3) {
    const a = ready();
    if (!a) return;
    const t = a.currentTime;
    [1318.5, 1975.5, 2637].forEach((fq, i) => {
      const o = a.createOscillator(),
        g = a.createGain();
      o.frequency.value = fq * (1 + (Math.random() - 0.5) * 0.003);
      env(g, t, 0.04, 0.05 / (i + 1), d);
      o.connect(g).connect(a.destination);
      o.start(t);
      o.stop(t + d + 0.1);
    });
  },
  whoosh(rev?: boolean) {
    const a = ready();
    if (!a) return;
    const t = a.currentTime,
      n = a.createBufferSource();
    n.buffer = nbuf(a, 1.2);
    const f = a.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 1.4;
    f.frequency.setValueAtTime(rev ? 2800 : 350, t);
    f.frequency.exponentialRampToValueAtTime(rev ? 300 : 2600, t + 0.9);
    const g = a.createGain();
    env(g, t, 0.3, 0.3, 1.1);
    n.connect(f).connect(g).connect(a.destination);
    n.start(t);
  },
  crackle(d = 1.6) {
    const a = ready();
    if (!a) return;
    const t = a.currentTime;
    for (let i = 0; i < 46; i++) {
      const s = t + Math.random() * d,
        n = a.createBufferSource();
      n.buffer = nbuf(a, 0.03);
      const f = a.createBiquadFilter();
      f.type = "highpass";
      f.frequency.value = 1800 + Math.random() * 3000;
      const g = a.createGain();
      env(g, s, 0.002, 0.08 + Math.random() * 0.12, 0.03);
      n.connect(f).connect(g).connect(a.destination);
      n.start(s);
    }
  },
  whine(d = 1.5) {
    const a = ready();
    if (!a) return;
    const t = a.currentTime,
      o = a.createOscillator(),
      f = a.createBiquadFilter(),
      g = a.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(160, t);
    o.frequency.exponentialRampToValueAtTime(980, t + d);
    f.type = "lowpass";
    f.frequency.setValueAtTime(600, t);
    f.frequency.exponentialRampToValueAtTime(3200, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05, t + d * 0.9);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.25);
    o.connect(f).connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + d + 0.3);
  },
  wind(d = 5) {
    const a = ready();
    if (!a) return;
    const t = a.currentTime,
      n = a.createBufferSource();
    n.buffer = nbuf(a, d);
    const f = a.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(300, t);
    f.frequency.linearRampToValueAtTime(900, t + d * 0.6);
    f.frequency.linearRampToValueAtTime(350, t + d);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.22, t + d * 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    n.connect(f).connect(g).connect(a.destination);
    n.start(t);
  },
  creak() {
    const a = ready();
    if (!a) return;
    const t = a.currentTime + 0.15,
      o = a.createOscillator(),
      f = a.createBiquadFilter(),
      g = a.createGain(),
      lfo = a.createOscillator(),
      lg = a.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(70, t);
    o.frequency.linearRampToValueAtTime(48, t + 2.2);
    lfo.frequency.value = 13;
    lg.gain.value = 18;
    lfo.connect(lg).connect(o.frequency);
    f.type = "bandpass";
    f.frequency.value = 700;
    f.Q.value = 6;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.3);
    g.gain.linearRampToValueAtTime(0.05, t + 1.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    o.connect(f).connect(g).connect(a.destination);
    o.start(t);
    lfo.start(t);
    o.stop(t + 2.5);
    lfo.stop(t + 2.5);
  },
  /** A short sine blip (used by The Book Match). */
  tone(f: number, d = 0.3, v = 0.04) {
    const a = ready();
    if (!a) return;
    const t = a.currentTime,
      o = a.createOscillator(),
      g = a.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + d + 0.05);
  },
};

/* ---------- background score: a very slow, generative ambient bed (Web Audio, no files) ---------- */
export const bgm = (() => {
  let out: GainNode | null = null,
    bus: GainNode | null = null,
    on = false,
    timer: ReturnType<typeof setInterval> | undefined,
    nextChord = 0,
    nextBell = 0,
    ci = 0,
    duckV = 1,
    visBound = false;
  const LVL = 0.1;
  const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
  const CH = [
    [38, 50, 57, 64, 65, 69],
    [34, 46, 53, 57, 62, 65],
    [31, 43, 50, 57, 58, 62],
    [33, 45, 52, 57, 62, 64],
  ];
  const BELL = [74, 76, 77, 81, 84, 86, 88, 89];
  function build(a: AudioContext) {
    out = a.createGain();
    out.gain.value = 0;
    const len = a.sampleRate * 6,
      ir = a.createBuffer(2, len, a.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    const rev = a.createConvolver();
    rev.buffer = ir;
    const wet = a.createGain();
    wet.gain.value = 0.85;
    const dry = a.createGain();
    dry.gain.value = 0.35;
    bus = a.createGain();
    bus.connect(dry).connect(out);
    bus.connect(rev).connect(wet).connect(out);
    out.connect(a.destination);
    const dr = a.createOscillator(),
      dg = a.createGain(),
      lf = a.createOscillator(),
      lg = a.createGain();
    dr.type = "sine";
    dr.frequency.value = mtof(26);
    dg.gain.value = 0.16;
    lf.frequency.value = 0.05;
    lg.gain.value = 0.06;
    lf.connect(lg).connect(dg.gain);
    dr.connect(dg).connect(bus);
    dr.start();
    lf.start();
  }
  function chord(a: AudioContext, t: number) {
    const notes = CH[ci % CH.length];
    ci++;
    const hold = 18,
      att = 7,
      rel = 9;
    const f = a.createBiquadFilter();
    f.type = "lowpass";
    f.Q.value = 0.4;
    f.frequency.setValueAtTime(420, t);
    f.frequency.linearRampToValueAtTime(1100, t + hold * 0.55);
    f.frequency.linearRampToValueAtTime(500, t + hold + rel);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.05, t + att);
    g.gain.setValueAtTime(0.05, t + hold);
    g.gain.linearRampToValueAtTime(0.0001, t + hold + rel);
    f.connect(g).connect(bus!);
    notes.forEach((m, i) => {
      [-4, 4].forEach((dt) => {
        const o = a.createOscillator();
        o.type = i < 2 ? "sine" : "triangle";
        o.frequency.value = mtof(m);
        o.detune.value = dt + (Math.random() - 0.5) * 3;
        const vg = a.createGain();
        vg.gain.value = i < 2 ? 0.9 : 0.42;
        o.connect(vg).connect(f);
        o.start(t);
        o.stop(t + hold + rel + 0.2);
      });
    });
  }
  function bell(a: AudioContext, t: number) {
    const m = BELL[(Math.random() * BELL.length) | 0],
      fq = mtof(m),
      g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.022, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 5.5);
    g.connect(bus!);
    (
      [
        [1, 1],
        [2.76, 0.25],
        [5.4, 0.08],
      ] as const
    ).forEach(([r, v]) => {
      const o = a.createOscillator(),
        og = a.createGain();
      o.type = "sine";
      o.frequency.value = fq * r;
      og.gain.value = v;
      o.connect(og).connect(g);
      o.start(t);
      o.stop(t + 5.6);
    });
  }
  function tick() {
    const a = AC;
    if (!a || !on) return;
    const t = a.currentTime,
      ahead = t + 1.5;
    if (nextChord < ahead) {
      if (nextChord < t) nextChord = t + 0.05;
      chord(a, nextChord);
      nextChord += 18;
    }
    if (nextBell < ahead) {
      if (nextBell < t) nextBell = t + 3;
      bell(a, nextBell);
      nextBell += 6 + Math.random() * 7;
    }
  }
  function level(v: number, secs: number) {
    if (!out || !AC) return;
    const t = AC.currentTime;
    out.gain.cancelScheduledValues(t);
    out.gain.setValueAtTime(out.gain.value, t);
    out.gain.linearRampToValueAtTime(v, t + secs);
  }
  function bindVisibility() {
    if (visBound) return;
    visBound = true;
    document.addEventListener("visibilitychange", () => {
      if (on) level(document.hidden ? 0 : LVL * duckV, document.hidden ? 0.6 : 2.5);
    });
  }
  function start() {
    const a = ac();
    if (!a || on || !isSoundOn()) return;
    bindVisibility();
    if (!out) build(a);
    on = true;
    nextChord = 0;
    nextBell = a.currentTime + 4;
    tick();
    timer = setInterval(tick, 500);
    level(document.hidden ? 0 : LVL * duckV, 5);
  }
  function stop() {
    if (!on) return;
    on = false;
    clearInterval(timer);
    level(0, 1.5);
  }
  function duck(d: boolean) {
    duckV = d ? 0.25 : 1;
    if (on) level(LVL * duckV, d ? 0.4 : 3);
  }
  return { start, stop, duck };
})();

/** The music box loop. The original loads it silently (volume 0) on start; kept the same. */
let music: HTMLAudioElement | null = null;
export function musicBox() {
  if (!music) {
    music = new Audio("/audio/musicbox.mp3");
    music.loop = true;
    music.volume = 0;
    music.preload = "auto";
  }
  return music;
}

/** The reversed music box, played for "Thea". */
let revBox: HTMLAudioElement | null = null;
export function reversedMusicBox() {
  if (!revBox) {
    revBox = new Audio("/audio/musicbox_reversed.mp3");
    revBox.volume = 0.55;
  }
  return revBox;
}

/** Start the score on the first interaction, as the original does. */
let kickBound = false;
export function bindSoundKick() {
  if (kickBound) return;
  kickBound = true;
  musicBox();
  reversedMusicBox();
  const kick = () => {
    if (isSoundOn()) bgm.start();
  };
  (["pointerdown", "keydown", "touchstart"] as const).forEach((ev) =>
    addEventListener(ev, kick, { passive: true }),
  );
}
