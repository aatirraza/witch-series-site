"use client";

import { useEffect, useRef, useState } from "react";
import { CAST, CAST_UI, sheetSrc } from "../../../data/cast";
import { burst } from "@/lib/fx";
import { bindSheet } from "@/lib/sheet";

type Shown = { src: string; alt: string; opt?: string };

const N = CAST.length;

/**
 * The character sheet ("grim") dialog. Like the original, it lives outside the
 * pages, so it stays put if the visitor uses Back while it is open.
 */
export default function SheetViewer() {
  const [open, setOpen] = useState(false);
  const [ci, setCi] = useState(0);
  const [li, setLi] = useState(0);
  const [shown, setShown] = useState<Shown | null>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  const c = CAST[ci],
    L = c.looks[li];

  // Load the sheet image off-screen; swap it in and replay the burn reveal once decoded.
  const show = (i: number, l: number) => {
    setCi(i);
    setLi(l);
    const ch = CAST[i],
      look = ch.looks[l];
    const pre = new Image();
    pre.src = sheetSrc(look.img);
    // A new object every time, so the reveal replays even for the same image.
    const go = () => setShown({ src: pre.src, alt: CAST_UI.sheetAlt(ch.name, look.label), opt: look.opt });
    (pre.decode ? pre.decode() : Promise.resolve()).then(go, go);
  };

  useEffect(() => {
    bindSheet((i, pt) => {
      opener.current = document.activeElement;
      setOpen(true);
      document.body.style.overflow = "hidden";
      if (pt) burst(pt.x, pt.y, 60);
      show(i, 0);
      requestAnimationFrame(() => closeBtn.current?.focus());
    });
    return () => bindSheet(null);
  }, []);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
    const o = opener.current as HTMLElement | null;
    o?.focus?.();
  };

  // Replay the reveal each time a new image is swapped in.
  useEffect(() => {
    if (!shown) return;
    const sh = sheet.current!;
    sh.classList.remove("reveal");
    void sh.offsetWidth;
    sh.classList.add("reveal");
    const r = sh.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 80);
  }, [shown]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show((ci + 1) % N, 0);
      if (e.key === "ArrowLeft") show((ci - 1 + N) % N, 0);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  });

  return (
    <div
      className="grim"
      id="grim"
      hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gName"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="gbox">
        <button className="gclose" ref={closeBtn} type="button" aria-label={CAST_UI.close} onClick={close}>
          ×
        </button>
        <div className="sheet" id="sheet" ref={sheet}>
          {/* A plain <img>: it is swapped only after the full-size file has decoded, to time the reveal. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="sheetImg" src={shown?.src} alt={shown?.alt ?? ""} />
          <div className="burn"></div>
          {shown?.opt && <span className="opt">{shown.opt}</span>}
        </div>
        <div className="ginfo">
          <div className="kicker">{c.group}</div>
          <h3 id="gName">{c.name}</h3>
          <div className="ep">{CAST_UI.sheetEp(c.epi, L.label)}</div>
          <span className="tag">{L.tag}</span>
          <div className="looks" role="group" aria-label={CAST_UI.looks}>
            {c.looks.length > 1 &&
              c.looks.map((x, i) => (
                <button key={x.tag} type="button" aria-pressed={i === li} onClick={() => show(ci, i)}>
                  {x.label}
                </button>
              ))}
          </div>
          <p className="role">{L.role}</p>
          <dl>
            <div>
              <dt>{CAST_UI.look}</dt>
              <dd>{L.look}</dd>
            </div>
            <div>
              <dt>{CAST_UI.wardrobe}</dt>
              <dd>{L.ward}</dd>
            </div>
            <div>
              <dt>{CAST_UI.shots}</dt>
              <dd>{L.shots}</dd>
            </div>
          </dl>
          <div className="note" hidden={!L.note}>
            {L.note ?? ""}
          </div>
          <div className="gnav">
            <button type="button" onClick={() => show((ci - 1 + N) % N, 0)}>
              {CAST_UI.prevSheet}
            </button>
            <button type="button" onClick={() => show((ci + 1) % N, 0)}>
              {CAST_UI.nextSheet}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
