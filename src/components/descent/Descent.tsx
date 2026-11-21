"use client";

import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { DESCENT, MEM_TOTAL, THREADS } from "../../../data/descent";
import { BOOK_ONE_URL } from "../../../data/site";
import {
  begin,
  bindDescent,
  descentState,
  descentVersion,
  enterDescent,
  startThread,
  subscribeDescent,
  toThreads,
  type DescentEls,
} from "@/lib/descent";
import Rich from "../Rich";

export default function Descent() {
  useSyncExternalStore(subscribeDescent, descentVersion, () => 0);
  const D = descentState();
  const root = useRef<HTMLElement>(null);

  // Each time the page is shown: bind the elements (by id, as the original script
  // does) and run the original's enterDescent.
  useEffect(() => {
    const sec = root.current!;
    const q = (id: string) => sec.querySelector<HTMLElement>("#" + id)!;
    const ids = ["dj", "dstage", "dimgA", "dimgB", "dcap", "dkick", "dh", "dp", "hots", "dhint", "hloc", "hyear", "hmem", "dticks", "dprog", "dend", "dendh", "dendp", "dspace"] as const;
    const els = Object.fromEntries(ids.map((id) => [id, q(id)])) as Omit<DescentEls, "dsc">;
    bindDescent({ dsc: sec, ...els });
    enterDescent();
  }, []);

  const k = D.introK;
  const log = k ? DESCENT.logs[k - 1] : DESCENT.logStart;

  return (
    <section className="dsc" ref={root}>
      <div className="dfull" id="dintro" hidden={D.view !== "intro"}>
        <span className="dbg" style={{ backgroundImage: `url(${DESCENT.introBg})` }}></span>
        <div className="dinner" id="dinner" data-ready={String(D.ready)}>
          <div className="dload" aria-live="polite">
            <span id="dpct">{k ? DESCENT.introPct(DESCENT.introSteps[k - 1]) : DESCENT.introStart}</span>
            <span className="bar">
              <i
                id="dbar"
                style={k ? ({ "--k": DESCENT.introSteps[k - 1] / 100 } as CSSProperties) : undefined}
              ></i>
            </span>
          </div>
          <div className="dlog" id="dlog">
            <b>{log.b}</b>
            {log.t}
          </div>
          <div className="dafter">
            <h2 className="dtitle">{DESCENT.title}</h2>
            <p className="lede">{DESCENT.lede}</p>
            <button className="btn" id="dbegin" type="button" onClick={begin}>
              {DESCENT.begin}
            </button>
            <span className="dnote">{DESCENT.note}</span>
          </div>
        </div>
      </div>

      <div className="dpick wrap" id="dpick" hidden={D.view !== "pick"}>
        <div className="shead" style={{ margin: 0 }}>
          <div className="kicker">{DESCENT.pick.kicker}</div>
          <h2>
            <Rich value={DESCENT.pick.title} />
          </h2>
          <p className="lede">{DESCENT.pick.lede}</p>
        </div>
        <div className="threads" id="threads">
          {D.cards &&
            THREADS.map((t, i) => {
              const { n, got, followed } = D.cards![i];
              return (
                <button
                  key={t.id}
                  className="th"
                  type="button"
                  data-t={i}
                  style={{ "--tc": t.tc } as CSSProperties}
                  onClick={() => startThread(i)}
                >
                  <span className="tb" style={{ backgroundImage: `url(/d/${t.cover}.jpg)` }}></span>
                  {followed && <span className="done">{DESCENT.followed}</span>}
                  <span className="tn">{t.who}</span>
                  <b>{t.name}</b>
                  <p>{t.line}</p>
                  <span className="tm">
                    <span>{DESCENT.places(t.scenes.length)}</span>
                    <em>{DESCENT.memoriesOf(got, n)}</em>
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      <div className="dj" id="dj" hidden={D.view !== "journey"}>
        <div className="dstage" id="dstage">
          <div className="dimg" id="dimgA"></div>
          <div className="dimg" id="dimgB"></div>
          <div className="dfog"></div>
          <div className="dvig"></div>
          <div className="dgrain"></div>
          <div className="hots" id="hots"></div>
          <div className="dcap" id="dcap">
            <div className="kicker" id="dkick"></div>
            <h3 id="dh"></h3>
            <p id="dp"></p>
          </div>
          <div className="dhint" id="dhint">
            <i></i>
            {DESCENT.hint}
          </div>
          <div className="dhud">
            <div className="hudl" aria-live="polite">
              <span>{DESCENT.hud.location}</span>
              <b id="hloc">
                {DESCENT.hud.startLoc}
              </b>
              <span>{DESCENT.hud.year}</span>
              <b id="hyear">
                {DESCENT.hud.startYear}
              </b>
              <span>{DESCENT.hud.memories}</span>
              <b id="hmem">
                {DESCENT.hudMem(0, MEM_TOTAL)}
              </b>
            </div>
            <div className="hudr">
              <button type="button" id="dthreads" onClick={toThreads}>
                {DESCENT.allThreads}
              </button>
            </div>
          </div>
          <div className="dticks" id="dticks"></div>
          <div className="dprog">
            <i id="dprog"></i>
          </div>
          <div className="dend" id="dend">
            <div className="dinner">
              <div className="kicker" id="dendk">
                {DESCENT.end.kicker}
              </div>
              <h3 id="dendh"></h3>
              <p className="lede" id="dendp"></p>
              <div className="acts">
                <button className="btn" type="button" id="dnext" onClick={toThreads}>
                  {DESCENT.end.next}
                </button>
                <a className="btn line" href={BOOK_ONE_URL} target="_blank" rel="noopener">
                  {DESCENT.end.readBook}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="dspace" id="dspace"></div>
      </div>
    </section>
  );
}
