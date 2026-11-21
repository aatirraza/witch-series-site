"use client";

import { useEffect, useRef, useState } from "react";
import { coverSrc, ROTATING_COVERS } from "../../../data/books";
import { DOOR, HERO } from "../../../data/home";
import { burst, isFrozen, motion, onFrame } from "@/lib/fx";
import { registerDoor } from "@/lib/nav";
import { secret } from "@/lib/secrets";
import { ac } from "@/lib/sound";
import { freeze, vanish } from "@/lib/spells";
import { useTilt } from "@/lib/tilt";
import { useReducedMotion } from "@/lib/useReducedMotion";
import VeilLink from "../VeilLink";

/** The door stays open while the visitor moves between pages, as on the one-page original. */
let doorWasOpened = false;

/** The rotating cover carries on from where it was, as on the one-page original. */
let coverIndex = 0;

type DoorPhase = "closed" | "opening" | "through" | "open";

function Seal({ id }: { id: string }) {
  return (
    <div className="seal">
      <svg viewBox="0 0 170 170">
        <defs>
          <path id={id} d="M85,85 m-68,0 a68,68 0 1,1 136,0 a68,68 0 1,1 -136,0" />
        </defs>
        <text>
          <textPath href={`#${id}`}>{DOOR.sealText}</textPath>
        </text>
      </svg>
      <span className="w">{DOOR.sealMark}</span>
    </div>
  );
}

function Leaf({ side, sealId }: { side: "l" | "r"; sealId: string }) {
  const runes = DOOR.runes[side];
  return (
    <div className={`leaf ${side}`}>
      <div className="strap t"></div>
      <div className="strap b"></div>
      <div className="panel"></div>
      <div className="runes">{runes[0]}</div>
      <div className="runes b">{runes[1]}</div>
      <Seal id={sealId} />
      <div className="ringh"></div>
    </div>
  );
}

export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const past = useRef<HTMLDivElement>(null);
  const portal = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const altar = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);
  const bookImg = useRef<HTMLImageElement>(null);
  const label = useRef<HTMLDivElement>(null);
  // Reduced motion removes the door, as in the original.
  const reduce = useReducedMotion();
  // Module state is false on the server and on first load, so this never mismatches hydration.
  const [phase, setPhase] = useState<DoorPhase>(() => (doorWasOpened ? "open" : "closed"));
  const [cover, setCover] = useState(() => coverIndex);
  const opening = useRef(false);
  const knocks = useRef<number[]>([]);

  const awake = reduce || phase === "through" || phase === "open";
  const showPortal = !reduce && phase !== "open";

  const setAjar = (v: number | string) => portal.current?.style.setProperty("--ajar", String(v));

  // Torchlight over the street.
  useEffect(() => {
    const h = hero.current!,
      p = past.current!;
    let hx: number | null = null,
      hy = 0,
      idle = 0,
      tx = 0.7,
      ty = 0.45;
    const move = (e: PointerEvent) => {
      const r = h.getBoundingClientRect();
      hx = (e.clientX - r.left) / r.width;
      hy = (e.clientY - r.top) / r.height;
      idle = 0;
    };
    const leave = () => {
      hx = null;
    };
    h.addEventListener("pointermove", move);
    h.addEventListener("pointerleave", leave);
    const off = onFrame(() => {
      idle++;
      const t = performance.now() / 1000;
      let gx: number, gy: number;
      if (hx !== null && idle < 240) {
        gx = hx;
        gy = hy;
      } else {
        gx = 0.62 + Math.sin(t * 0.35) * 0.22;
        gy = 0.5 + Math.sin(t * 0.53) * 0.2;
      }
      tx += (gx - tx) * 0.08;
      ty += (gy - ty) * 0.08;
      p.style.setProperty("--mx", tx * 108 - 4 + "%");
      p.style.setProperty("--my", ty * 108 - 4 + "%");
      p.style.setProperty("--rad", 200 + Math.sin(t * 3) * 8 + "px");
    });
    return () => {
      off();
      h.removeEventListener("pointermove", move);
      h.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Hold still on the night street for two seconds: the frozen hour (a secret).
  useEffect(() => {
    const h = hero.current!;
    let holdT: ReturnType<typeof setTimeout> | 0 = 0,
      x0 = 0,
      y0 = 0;
    const down = (e: PointerEvent) => {
      if ((e.target as Element).closest("a,button,#portal")) return;
      x0 = e.clientX;
      y0 = e.clientY;
      clearTimeout(holdT);
      holdT = setTimeout(() => {
        ac();
        freeze();
        secret("hold");
      }, 1900);
    };
    const move = (e: PointerEvent) => {
      if (holdT && Math.hypot(e.clientX - x0, e.clientY - y0) > 12) {
        clearTimeout(holdT);
        holdT = 0;
      }
    };
    const stop = () => {
      clearTimeout(holdT);
      holdT = 0;
    };
    h.addEventListener("pointerdown", down);
    h.addEventListener("pointermove", move);
    (["pointerup", "pointerleave", "pointercancel"] as const).forEach((t) => h.addEventListener(t, stop));
    return () => {
      stop();
      h.removeEventListener("pointerdown", down);
      h.removeEventListener("pointermove", move);
      (["pointerup", "pointerleave", "pointercancel"] as const).forEach((t) => h.removeEventListener(t, stop));
    };
  }, []);

  // Book tilt on fine pointers.
  useTilt(book, altar, { ry: 28, rx: 22 });

  // Rotating covers, every 4.5s with a 0.6s fade.
  useEffect(() => {
    ROTATING_COVERS.forEach((r) => {
      const im = new Image();
      im.src = coverSrc(r.key);
    });
    if (motion.reduce) return;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const iv = setInterval(() => {
      if (isFrozen() || !book.current?.offsetParent) return;
      const img = bookImg.current!,
        lb = label.current!;
      const i = (coverIndex = (coverIndex + 1) % ROTATING_COVERS.length);
      img.style.opacity = "0";
      lb.style.opacity = "0";
      swap = setTimeout(() => {
        setCover(i);
        img.style.opacity = "1";
        lb.style.opacity = "1";
      }, 600);
    }, 4500);
    return () => {
      clearInterval(iv);
      clearTimeout(swap);
    };
  }, []);

  // Close the door again (the "Close the door" button and the footer ember): once
  // the door is back on screen, scroll to it and give it focus, as the original does.
  const [reclosed, setReclosed] = useState(0);
  const closeDoor = () => {
    doorWasOpened = false;
    opening.current = false;
    setPhase("closed");
    setReclosed((n) => n + 1);
  };
  useEffect(() => {
    if (!reclosed) return;
    setAjar(0);
    hero.current?.scrollIntoView({ block: "start" });
    portal.current?.focus();
  }, [reclosed]);

  // Let the footer ember close the door again.
  useEffect(() => {
    registerDoor(closeDoor);
    return () => registerDoor(null);
  }, []);

  const openDoor = () => {
    if (opening.current || !portal.current) return;
    opening.current = true;
    const r = portal.current.getBoundingClientRect();
    const cx = r.left + r.width / 2,
      cy = r.top + r.height * 0.55;
    setAjar(10);
    burst(cx, cy, 40);
    setTimeout(() => {
      setPhase("opening");
      setAjar(104);
      for (let k = 0; k < 6; k++)
        setTimeout(() => burst(cx + (Math.random() - 0.5) * 80, cy + (Math.random() - 0.5) * 200, 30), k * 160);
    }, 280);
    setTimeout(() => {
      const f = flash.current!;
      f.classList.remove("go");
      void f.offsetWidth;
      f.classList.add("go");
      setPhase("through");
      burst(cx, cy, 120);
    }, 2050);
    setTimeout(() => {
      doorWasOpened = true;
      setPhase("open");
    }, 3300);
  };

  const portalMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (opening.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2),
      dy = (e.clientY - r.top - r.height * 0.55) / (r.height / 2);
    const d = Math.min(1, Math.hypot(dx * 1.6, dy));
    setAjar(((1 - d) * 7).toFixed(2));
  };

  const rc = ROTATING_COVERS[cover];
  const portalClass =
    "portal" + (phase === "opening" || phase === "through" ? " opening" : "") + (phase === "through" ? " through" : "");

  return (
    <section className={"hero" + (awake ? " awake" : "")} id="top" ref={hero}>
      <div className="layer now"></div>
      <div className="layer past" ref={past}></div>
      <div className="shade"></div>
      {showPortal && (
        <div
          className={portalClass}
          id="portal"
          ref={portal}
          role="button"
          tabIndex={0}
          aria-label={DOOR.label}
          onPointerMove={portalMove}
          onPointerLeave={() => {
            if (!opening.current) setAjar(0);
          }}
          onClick={openDoor}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openDoor();
            }
          }}
        >
          <div className="stones"></div>
          <div className="ptitle">
            <span>{DOOR.over}</span>
            <b>
              {DOOR.name.text}
              <em>{DOOR.name.em}</em>
            </b>
          </div>
          <div className="sconce l"></div>
          <div className="sconce r"></div>
          <div className="doorway">
            <div className="beyond"></div>
            <div className="rays"></div>
            <Leaf side="l" sealId="sp1" />
            <Leaf side="r" sealId="sp2" />
            <div className="crack"></div>
          </div>
          <div className="knock">
            <span className="btn">{DOOR.button}</span>
            <small>{DOOR.small}</small>
          </div>
        </div>
      )}
      <div className="flash" ref={flash}></div>
      <button
        className="reclose"
        type="button"
        hidden={!(phase === "open" && !reduce)}
        onClick={closeDoor}
      >
        {DOOR.reclose}
      </button>
      <div className="fog"></div>
      <div className="wrap">
        <div>
          <div className="kicker">{HERO.kicker}</div>
          <h1 className="au">
            <span className="w">{HERO.name}</span>
            <em>{HERO.sub}</em>
          </h1>
          <p className="lede">{HERO.lede}</p>
          <div className="acts">
            <VeilLink className="btn" href={HERO.primary.path}>
              {HERO.primary.label}
            </VeilLink>
            <VeilLink className="btn line" href={HERO.secondary.path}>
              {HERO.secondary.label}
            </VeilLink>
          </div>
          <div className="torchhint">
            <b>{HERO.hintBold}</b>
            {HERO.hint}
          </div>
        </div>
        <div className="altar" ref={altar}>
          <svg className="circle" viewBox="0 0 500 500" aria-hidden="true">
            <defs>
              <path id="c1" d="M250,250 m-228,0 a228,228 0 1,1 456,0 a228,228 0 1,1 -456,0" />
              <radialGradient id="halo">
                <stop offset="0" stopColor="rgb(230,128,46)" stopOpacity=".35" />
                <stop offset="1" stopColor="rgb(230,128,46)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="250" cy="250" r="240" fill="url(#halo)" />
            <g className="r1">
              <circle cx="250" cy="250" r="240" fill="none" stroke="rgba(233,196,106,.45)" strokeWidth="1" />
              <text>
                <textPath href="#c1">{HERO.circleText}</textPath>
              </text>
            </g>
            <g className="r2">
              <circle cx="250" cy="250" r="182" fill="none" stroke="rgba(233,196,106,.35)" strokeDasharray="2 8" />
              <polygon points="250,70 406,340 94,340" fill="none" stroke="rgba(230,128,46,.45)" />
              <polygon points="250,430 94,160 406,160" fill="none" stroke="rgba(230,128,46,.45)" />
            </g>
            <g className="r3">
              <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(233,196,106,.25)" />
              <circle cx="250" cy="100" r="5" fill="#E9C46A" />
              <circle cx="250" cy="400" r="5" fill="#E9C46A" />
              <circle cx="100" cy="250" r="5" fill="#E6802E" />
              <circle cx="400" cy="250" r="5" fill="#E6802E" />
            </g>
          </svg>
          <div
            className="book3d"
            id="book"
            ref={book}
            onClick={(e) => {
              burst(e.clientX, e.clientY, 70);
              // Knock three times on the book: it vanishes (a secret).
              const t = performance.now();
              knocks.current = knocks.current.filter((k) => t - k < 1200);
              knocks.current.push(t);
              if (knocks.current.length >= 3) {
                knocks.current = [];
                ac();
                vanish(bookImg.current);
                secret("book3");
              }
            }}
          >
            {/* A plain <img>: the cover swaps every few seconds and must stay preloaded at the same URL. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={bookImg} src={coverSrc(rc.key)} alt={HERO.coverAlt(rc.title)} />
            <span className="shine"></span>
          </div>
          <div className="coverlabel" ref={label} aria-live="polite">
            <b>{rc.title}</b>
            <span>{rc.series}</span>
          </div>
          <div className="badge">
            <b>{HERO.badgeBold}</b>
            {HERO.badge}
          </div>
        </div>
      </div>
    </section>
  );
}
