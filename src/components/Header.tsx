"use client";

import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ROUTES, SITE_NAME, UI } from "../../data/site";
import { isSoundOn, setSoundOn, subscribeSound } from "@/lib/sound";
import VeilLink from "./VeilLink";

export default function Header() {
  const pathname = usePathname();
  // Unknown addresses show the home page, so "Home" is the current page there (as in the original).
  const current = ROUTES.some((r) => r.path === pathname) ? pathname : "/";
  // The menu remembers which page it was opened on, so it closes itself on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (o: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);
  // Sound preference lives in localStorage; the server renders "on", like the original's default.
  const soundOn = useSyncExternalStore(subscribeSound, isSoundOn, () => true);

  return (
    <header className="nav">
      <div className="wrap">
        <VeilLink className="brand" href="/">
          <i></i>
          {SITE_NAME}
        </VeilLink>
        <button
          className="menub"
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((o) => !o)}
        >
          {UI.menu}
        </button>
        <div className="navr">
          <button
            className="snd"
            type="button"
            aria-pressed={soundOn}
            onClick={() => setSoundOn(!soundOn)}
          >
            <i aria-hidden="true">
              <b></b>
              <b></b>
              <b></b>
            </i>
            <span>{soundOn ? UI.soundOn : UI.soundOff}</span>
          </button>
        </div>
        <nav aria-label="Main" id="menu" className={open ? "open" : undefined}>
          {ROUTES.map((r) => (
            <VeilLink key={r.path} href={r.path} aria-current={current === r.path ? "page" : undefined}>
              {r.label}
            </VeilLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
