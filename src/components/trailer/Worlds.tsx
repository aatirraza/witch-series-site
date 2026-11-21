"use client";

import { useState, type CSSProperties } from "react";
import { WORLDS } from "../../../data/worlds";
import { burst, setPalette } from "@/lib/fx";

/** The chosen world stays chosen when the visitor leaves and returns, as on the original. */
let chosen = 0;

export default function Worlds() {
  const [sel, setSel] = useState(() => chosen);
  return (
    <div className="worlds" id="worlds">
      {WORLDS.map((w, i) => (
        <button
          key={w.n}
          className="wd"
          type="button"
          style={{ "--wc": `rgb(${w.glow})` } as CSSProperties}
          aria-pressed={i === sel}
          onClick={(e) => {
            // The light of the chosen world falls across the whole site.
            document.documentElement.style.setProperty("--glow", w.glow);
            setPalette(w.em);
            chosen = i;
            setSel(i);
            const r = e.currentTarget.getBoundingClientRect();
            burst(r.left + r.width / 2, r.top + r.height / 2, 70);
          }}
        >
          <span className="bg" style={{ background: w.bg }}></span>
          <span className="num">{w.w}</span>
          <span className="body">
            <h3>{w.n}</h3>
            <p>{w.f}</p>
            <span className="sw">
              {w.sw.map((c) => (
                <i key={c} style={{ background: c }}></i>
              ))}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
