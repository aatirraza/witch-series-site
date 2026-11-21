"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { COVER_SIZE, coverSrc, SERIES, type Book } from "../../../data/books";
import { LIBRARY } from "../../../data/pages";
import { getSeries, getServerSeries, setSeries, subscribeSeries } from "@/lib/series";
import { useTilt } from "@/lib/tilt";
import VeilLink from "../VeilLink";

const F = LIBRARY.featured;

function Featured() {
  const cov = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);
  useTilt(book, cov, { ry: 28, rx: 22 });
  return (
    <div className="featured">
      <div className="cov" ref={cov}>
        <div className="book3d tilt" ref={book} style={{ width: "100%", animation: "none" }}>
          <Image src={coverSrc(F.key)} alt={F.alt} {...COVER_SIZE} sizes="280px" loading="eager" />
          <span className="shine"></span>
        </div>
      </div>
      <div>
        <div className="kicker">{F.kicker}</div>
        <h3 style={{ marginTop: 14 }}>{F.title}</h3>
        <p>{F.text}</p>
        <div className="acts">
          <a className="btn" href={F.buy.href} target="_blank" rel="noopener">
            {F.buy.label}
          </a>
          <VeilLink className="btn line" href={F.cast.path}>
            {F.cast.label}
          </VeilLink>
        </div>
      </div>
    </div>
  );
}

function ShelfBook({ book, series }: { book: Book; series: string }) {
  const card = useRef<HTMLElement>(null);
  const cv = useRef<HTMLDivElement>(null);
  useTilt(cv, card, { ry: 22, rx: 16, extra: "translateZ(10px)", measureEl: true });
  return (
    <article className="bk" ref={card}>
      <div className="cv" ref={cv}>
        <Image
          src={coverSrc(book.key)}
          alt={LIBRARY.coverAlt(book.title)}
          {...COVER_SIZE}
          sizes="(max-width: 720px) 50vw, 260px"
        />
      </div>
      <div>
        <h4>{book.title}</h4>
        <div className="ser">
          {series}
          {book.suffix ?? ""}
        </div>
      </div>
      <a className="buy" href={book.url} target="_blank" rel="noopener">
        {LIBRARY.buy}
      </a>
    </article>
  );
}

export default function Library() {
  // The selected tab survives leaving the page, as on the one-page original.
  const si = useSyncExternalStore(subscribeSeries, getSeries, getServerSeries);

  const s = SERIES[si];
  return (
    <section>
      <Featured />
      <div className="tabs" role="tablist" aria-label={LIBRARY.tabsLabel} id="tabs">
        {SERIES.map((x, i) => (
          <button key={x.name} type="button" role="tab" aria-selected={i === si} onClick={() => setSeries(i)}>
            {x.name}
            <span>{x.books.length}</span>
          </button>
        ))}
      </div>
      <div className="shelf" id="shelf" role="tabpanel">
        {s.books.map((b) => (
          <ShelfBook key={si + ":" + b.key} book={b} series={s.name} />
        ))}
      </div>
      <div className="stores">
        {LIBRARY.storesIntro}
        {LIBRARY.stores.map((st) => (
          <a key={st.label} className="buy" href={st.href} target="_blank" rel="noopener">
            {st.label}
          </a>
        ))}
      </div>
    </section>
  );
}
