"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { GRIMOIRE, SECRETS, SPELLS, type SpellId } from "../../data/spells";
import { hasSecret, secretCount, secretsVersion, subscribeSecrets } from "@/lib/secrets";
import { ac } from "@/lib/sound";
import { forget, freeze, lords, summon, vanish, wall } from "@/lib/spells";

const CAST: Record<SpellId, () => void> = {
  wall: () => wall(),
  lords: () => lords(innerWidth / 2, innerHeight * 0.55),
  summon: () => summon(null, innerWidth / 2, innerHeight / 2),
  vanish: () => vanish(),
  freeze: () => freeze(),
  forget: () => forget(),
};

/** The floating Grimoire button and Thea's spell panel. */
export default function Grimoire() {
  useSyncExternalStore(subscribeSecrets, secretsVersion, () => 0);
  // Secrets live in localStorage: render the "nothing found" state until mounted, like the original's HTML.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const n = mounted ? secretCount() : 0;
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const openPanel = () => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    setTimeout(() => closeBtn.current?.focus(), 60);
  };
  const closePanel = () => {
    setOpen(false);
    opener.current?.focus?.({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open]);

  return (
    <>
      <button
        className="grimb"
        id="grimb"
        type="button"
        aria-expanded={open}
        aria-controls="spellp"
        onClick={() => {
          ac();
          if (open) closePanel();
          else openPanel();
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5z" />
          <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z" />
          <path d="M7 8h2M15 8h2M7 11h2M15 11h2" />
        </svg>
        {GRIMOIRE.button}
        <span className="cnt" id="gcnt">
          {GRIMOIRE.buttonCount(n, SECRETS.length)}
        </span>
      </button>
      <aside className={"spellp" + (open ? " open" : "")} id="spellp" aria-hidden={!open} aria-label={GRIMOIRE.label}>
        <button className="spx" id="spx" ref={closeBtn} type="button" aria-label={GRIMOIRE.close} onClick={closePanel}>
          ×
        </button>
        <div>
          <div className="kicker">{GRIMOIRE.kicker}</div>
          <h3 style={{ marginTop: 12 }}>{GRIMOIRE.title}</h3>
          <p className="epi">{GRIMOIRE.epigraph}</p>
        </div>
        <div className="slist" id="slist">
          {SPELLS.map((s, i) => (
            <div className="sp" key={s.id}>
              <b>{s.n}</b>
              <span>{s.l}</span>
              <button
                type="button"
                data-cast={i}
                onClick={() => {
                  ac();
                  closePanel();
                  setTimeout(CAST[s.id], 420);
                }}
              >
                {GRIMOIRE.cast}
              </button>
            </div>
          ))}
        </div>
        <div>
          <div className="slab">
            <span>{GRIMOIRE.secretsLabel}</span>
            <em id="scnt">{GRIMOIRE.secretsCount(n, SECRETS.length)}</em>
          </div>
          <div id="seclist">
            {SECRETS.map((s) => {
              const g = mounted && hasSecret(s.id);
              return (
                <div className={"sec" + (g ? " got" : "")} key={s.id}>
                  <i></i>
                  <div>
                    <b>{g ? s.n : GRIMOIRE.unknown}</b>
                    <span>{s.h}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
