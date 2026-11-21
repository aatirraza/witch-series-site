"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { COVER_SIZE } from "../../../data/books";
import { GAME, MATCH_LEVELS } from "../../../data/game";
import { burst } from "@/lib/fx";
import {
  enterPlay,
  isLevelLocked,
  matchSrc,
  matchState,
  matchVersion,
  nextShelf,
  restart,
  start,
  subscribeMatch,
  tap,
  type MatchBook,
} from "@/lib/match";
import { openMemory } from "@/lib/memory";
import Rich from "../Rich";
import VeilLink from "../VeilLink";

const centre = (el: Element | null | undefined) => {
  const r = el?.getBoundingClientRect();
  return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
};

export default function BookMatch() {
  useSyncExternalStore(subscribeMatch, matchVersion, () => 0);
  const g = matchState();
  const grid = useRef<HTMLDivElement>(null);
  const resetBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);

  // Deal the first shelf the first time the page is shown.
  useEffect(() => {
    enterPlay();
  }, []);

  const hooks = {
    burstAt: (i: number, n: number) => {
      const c = centre(grid.current?.children[i]);
      if (c) burst(c.x, c.y, n);
    },
    burstGrid: (n: number) => {
      const c = centre(grid.current);
      if (c) burst(c.x, c.y, n);
    },
    showWin: (book: MatchBook, first: boolean, last: boolean) => {
      const s = matchState(),
        L = MATCH_LEVELS[s.level];
      openMemory(
        {
          image: matchSrc(book.c),
          contain: true,
          kicker: GAME.win.kicker(L.n),
          title: GAME.win.title(last),
          text: GAME.win.text(L.p, s.moves, last),
          count: GAME.win.count(first, s.best[s.level]),
        },
        last ? resetBtn.current : nextBtn.current,
      );
    },
  };

  const L = MATCH_LEVELS[g.level];
  const best = g.best[g.level];

  return (
    <div className="wrap gwrap">
      <div className="gside">
        <div className="kicker">{GAME.kicker}</div>
        <h1>
          <Rich value={GAME.title} />
        </h1>
        <p className="lede">{GAME.lede}</p>
        <ul className="rules">
          {GAME.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <div className="levels" id="glevels" role="group" aria-label={GAME.shelvesLabel}>
          {g.deck.length > 0 &&
            MATCH_LEVELS.map((l, i) => (
              <button
                key={l.n}
                type="button"
                className={g.done.has(i) ? "won" : undefined}
                aria-label={GAME.levelLabel(l.n, l.p, g.done.has(i))}
                aria-current={String(i === g.level) as "true" | "false"}
                disabled={isLevelLocked(i)}
                onClick={() => start(i)}
              >
                {l.n}
              </button>
            ))}
        </div>
        <div className="gstats">
          <div>
            <span>{GAME.stats.shelf}</span>
            <b id="gLv">
              {g.level + 1} / {MATCH_LEVELS.length}
            </b>
          </div>
          <div>
            <span>{GAME.stats.pairs}</span>
            <b id="gPr">
              {g.found.size} / {L.p}
            </b>
          </div>
          <div>
            <span>{GAME.stats.moves}</span>
            <b id="gMv">{g.moves}</b>
          </div>
          <div>
            <span>{GAME.stats.best}</span>
            <b id="gBest">{best ?? GAME.stats.noBest}</b>
          </div>
        </div>
        <div className="gctl">
          <button className="btn line" type="button" id="gReset" ref={resetBtn} onClick={restart}>
            {GAME.reset}
          </button>
          <button className="btn" type="button" id="gNext" ref={nextBtn} hidden={!g.showNext} onClick={nextShelf}>
            {GAME.next}
          </button>
        </div>
        <div className="gmsg" id="gMsg" aria-live="polite">
          {g.msg.kind === "start" && GAME.start}
          {g.msg.kind === "pair" && (
            <>
              {GAME.pairFound}
              <b>{g.msg.book.t}</b>
              {GAME.pairFrom(g.msg.book.s)}
              <a href={g.msg.book.u} target="_blank" rel="noopener">
                {GAME.seeOnAmazon}
              </a>
            </>
          )}
          {g.msg.kind === "win" && (
            <>
              {g.msg.last ? GAME.allCleared : GAME.shelfCleared}
              <VeilLink href="/books">{GAME.seeAllBooks}</VeilLink>
            </>
          )}
        </div>
      </div>
      <div className="mgrid" id="mgrid" ref={grid} role="group" aria-label={GAME.cardsLabel} data-c={g.deck.length ? L.c : undefined}>
        {g.deck.map((b, i) => {
          const got = g.found.has(b.c),
            up = got || g.open.includes(i);
          const cls = "bk" + (up ? " up" : "") + (got ? " got" : "") + (g.miss.includes(i) ? " miss" : "");
          return (
            <button
              key={g.deal + ":" + i}
              type="button"
              className={cls}
              aria-label={GAME.cardLabel(i, up ? b.t : null, got)}
              aria-disabled={String(got) as "true" | "false"}
              onClick={() => tap(i, hooks)}
            >
              <span className="bk-in">
                <span className="bk-back" aria-hidden="true">
                  <i>{GAME.cardBack}</i>
                </span>
                <span className="bk-face">
                  <Image src={matchSrc(b.c)} alt="" {...COVER_SIZE} sizes="150px" loading="eager" />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
