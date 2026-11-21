"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CAST, CAST_UI, PORTRAIT_SIZE, portraitSrc } from "../../../data/cast";
import { motion, onFrame } from "@/lib/fx";
import { openSheet } from "@/lib/sheet";

const N = CAST.length;
const STEP = 360 / N;
const R = Math.round((205 * N) / (2 * Math.PI)) + 40;

/** Ring state lives outside React so the ring resumes where it was left, as on the original. */
const ring = {
  rot: 0,
  target: 0,
  auto: true,
  drag: null as null | { x: number; r: number },
  moved: false,
};

const frontIndex = () => ((Math.round(-ring.rot / STEP) % N) + N) % N;
const ringTransform = () => `translateZ(${-R}px) rotateY(${ring.rot}deg)`;

function Face({ i, draggable }: { i: number; draggable?: boolean }) {
  const c = CAST[i];
  return (
    <span className="face">
      <Image
        src={portraitSrc(c.looks[0].img)}
        alt=""
        {...PORTRAIT_SIZE}
        sizes="190px"
        loading="eager"
        draggable={draggable === false ? false : undefined}
      />
      <span className="nm">{c.name}</span>
      <span className="ep">{c.epi}</span>
    </span>
  );
}

export default function CastRing() {
  const stage = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const nowName = useRef<HTMLElement>(null);
  const nowEp = useRef<HTMLSpanElement>(null);

  // Spin every frame while the page is shown.
  useEffect(() => {
    let lastFront = -1;
    const el = ringEl.current!;
    el.style.transformOrigin = "50% 50%";
    return onFrame(() => {
      if (!el.offsetParent) return;
      if (ring.drag === null) {
        if (ring.auto && !motion.reduce) ring.target -= 0.06;
        ring.rot += (ring.target - ring.rot) * 0.08;
      }
      el.style.transform = ringTransform();
      const f = frontIndex();
      if (f !== lastFront) {
        cards.current.forEach((c, i) => c?.classList.toggle("front", i === f));
        nowName.current!.textContent = CAST[f].name;
        nowEp.current!.textContent = CAST[f].epi;
        lastFront = f;
      }
    });
  }, []);

  // Drag to spin.
  useEffect(() => {
    const st = stage.current!;
    const down = (e: PointerEvent) => {
      ring.drag = { x: e.clientX, r: ring.rot };
      ring.moved = false;
      ring.auto = false;
    };
    const move = (e: PointerEvent) => {
      if (!ring.drag) return;
      const dx = e.clientX - ring.drag.x;
      if (Math.abs(dx) > 5) ring.moved = true;
      ring.rot = ring.drag.r + dx * 0.28;
      ring.target = ring.rot;
    };
    const up = () => {
      if (!ring.drag) return;
      ring.drag = null;
      ring.target = Math.round(ring.rot / STEP) * STEP;
      setTimeout(() => (ring.moved = false), 0);
    };
    st.addEventListener("pointerdown", down);
    addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    return () => {
      st.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move);
      removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <section style={{ paddingTop: 30 }}>
      <div className="ringstage" id="stage" ref={stage}>
        <div className="ringfloor"></div>
        <div className="ring" id="ring" ref={ringEl}>
          {CAST.map((c, i) => (
            <button
              key={c.name}
              ref={(b) => {
                cards.current[i] = b;
              }}
              className="tc"
              type="button"
              aria-label={CAST_UI.openCard(c.name)}
              style={{ transform: `rotateY(${i * STEP}deg) translateZ(${R}px)` }}
              onClick={(e) => {
                if (ring.moved) return;
                if (frontIndex() === i) openSheet(i, e);
                else {
                  ring.auto = false;
                  ring.target = -i * STEP;
                }
              }}
            >
              <Face i={i} draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <div className="ringctl">
        <button
          className="iconb"
          type="button"
          aria-label={CAST_UI.prev}
          onClick={() => {
            ring.auto = false;
            ring.target = Math.round(ring.target / STEP) * STEP + STEP;
          }}
        >
          ←
        </button>
        <div className="now" aria-live="polite">
          <b id="nowName" ref={nowName}>
            {CAST[0].name}
          </b>
          <span id="nowEp" ref={nowEp}></span>
        </div>
        <button
          className="iconb"
          type="button"
          aria-label={CAST_UI.next}
          onClick={() => {
            ring.auto = false;
            ring.target = Math.round(ring.target / STEP) * STEP - STEP;
          }}
        >
          →
        </button>
        <button className="btn" type="button" onClick={(e) => openSheet(frontIndex(), e)}>
          {CAST_UI.openFront}
        </button>
      </div>
      <div className="castgrid" id="castgrid">
        {CAST.map((c, i) => (
          <button key={c.name} className="tc" type="button" onClick={(e) => openSheet(i, e)}>
            <Face i={i} />
          </button>
        ))}
      </div>
    </section>
  );
}
