import Image from "next/image";
import type { CSSProperties } from "react";
import { COVER_SIZE, coverSrc, SERIES } from "../../data/books";
import { CAST, PORTRAIT_SIZE, portraitSrc } from "../../data/cast";
import {
  AUTHOR_BLOCK,
  AWARDS,
  BANNERS,
  FILM,
  JOURNEY,
  PROUD,
  SERIES_COUNT,
  WORLDS_BLOCK,
} from "../../data/home";
import { PRESS } from "../../data/site";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Rich from "@/components/Rich";
import PageShown from "@/components/PageShown";
import VeilLink from "@/components/VeilLink";

export default function HomePage() {
  return (
    <div className="page on" data-page="home">
      <PageShown path="/" />
      <Hero />

      <main className="wrap">
        <section className="proud">
          <div className="shead">
            <div className="kicker">{PROUD.kicker}</div>
            <h2>
              <Rich value={PROUD.title} />
            </h2>
            <p className="lede">{PROUD.lede}</p>
          </div>
          <Stats />
        </section>

        <section className="awards" id="awards">
          <div className="shead">
            <div className="kicker">{AWARDS.kicker}</div>
            <h2>
              <Rich value={AWARDS.title} />
            </h2>
            <p className="lede awq">
              <i>{AWARDS.quote}</i> <span>{AWARDS.quoteBy}</span>
            </p>
          </div>
          <div className="awgrid">
            {AWARDS.items.map((a) => (
              <figure className="aw" key={a.name}>
                <div className="coin">
                  <Image src={a.img} alt={a.alt} width={800} height={800} sizes="220px" />
                </div>
                <figcaption>
                  <b>{a.b}</b>
                  <span>{a.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <div className="shead">
            <div className="kicker">{WORLDS_BLOCK.kicker}</div>
            <h2>
              <Rich value={WORLDS_BLOCK.title} />
            </h2>
            <p className="lede">{WORLDS_BLOCK.lede}</p>
          </div>
          <div className="series" id="seriesCards">
            {SERIES.map((s, i) => {
              const l = s.books;
              const pick = l.length >= 3 ? [l[1], l[2], l[0]] : [l[1], l[1], l[0]];
              return (
                <VeilLink className="sc" href="/books" series={i} key={s.name}>
                  <span className="stack">
                    {pick.map((b, k) => (
                      <Image
                        key={k}
                        src={coverSrc(b.key)}
                        alt=""
                        {...COVER_SIZE}
                        sizes="(max-width: 520px) 44vw, (max-width: 960px) 22vw, 130px"
                        style={{ height: "auto" }}
                      />
                    ))}
                  </span>
                  <b>{s.name}</b>
                  <span className="sb">{s.blurb}</span>
                  <span className="c">{SERIES_COUNT(l.length)}</span>
                </VeilLink>
              );
            })}
          </div>
        </section>

        <section>
          <div className="shead">
            <div className="kicker">{JOURNEY.kicker}</div>
            <h2>
              <Rich value={JOURNEY.title} />
            </h2>
          </div>
          <ol className="chapters">
            {JOURNEY.chapters.map((c, i) => (
              <li key={c.b}>
                <span className="cn">{i + 1}</span>
                <b>{c.b}</b>
                <p>{c.p}</p>
              </li>
            ))}
          </ol>
          <p className="presslink">
            {JOURNEY.pressBefore}
            <a href={PRESS[0].href} target="_blank" rel="noopener">
              {PRESS[0].name}
            </a>
            {JOURNEY.pressBetween}
            <a href={PRESS[1].href} target="_blank" rel="noopener">
              {PRESS[1].name}
            </a>
            {JOURNEY.pressAfter}
          </p>
        </section>

        <section>
          <div className="split">
            <div className="shead" style={{ margin: 0 }}>
              <div className="kicker">{FILM.kicker}</div>
              <h2>
                <Rich value={FILM.title} />
              </h2>
              <p className="lede">{FILM.lede}</p>
              <div className="acts" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <VeilLink className="btn" href={FILM.primary.path}>
                  {FILM.primary.label}
                </VeilLink>
                <VeilLink className="btn line" href={FILM.secondary.path}>
                  {FILM.secondary.label}
                </VeilLink>
              </div>
            </div>
            <div className="fan" id="fan">
              {FILM.fan.map((ix, k) => {
                const c = CAST[ix];
                const style = {
                  "--a": (k - 2) * 9 + "deg",
                  "--x": (k - 2) * 30 + "px",
                  zIndex: k === 2 ? 3 : 2 - Math.abs(k - 2) + 1,
                } as CSSProperties;
                return (
                  <VeilLink href="/cast" key={c.name} style={style} aria-label={c.name}>
                    <Image src={portraitSrc(c.looks[0].img)} alt={c.name} {...PORTRAIT_SIZE} sizes="170px" />
                  </VeilLink>
                );
              })}
            </div>
          </div>
        </section>

        {BANNERS.map((b) => (
          <section style={{ paddingTop: 0 }} key={b.path}>
            <VeilLink className="banner" href={b.path}>
              <span className="bgimg" style={{ backgroundImage: `url(${b.bg})` }}></span>
              <span className="inner">
                <span className="kicker">{b.kicker}</span>
                <span className="bt">
                  <Rich value={b.title} />
                </span>
                <span className="lede" style={{ fontSize: 16 }}>
                  {b.lede}
                </span>
                <span className="btn" style={{ justifySelf: "start" }}>
                  {b.button}
                </span>
              </span>
            </VeilLink>
          </section>
        ))}

        <section>
          <div className="author">
            <div className="portrait">
              <Image
                src={AUTHOR_BLOCK.img}
                alt={AUTHOR_BLOCK.alt}
                width={AUTHOR_BLOCK.width}
                height={AUTHOR_BLOCK.height}
                sizes="(max-width: 960px) 100vw, 420px"
                style={{ height: "auto" }}
              />
            </div>
            <div>
              <div className="kicker">{AUTHOR_BLOCK.kicker}</div>
              <h2 style={{ marginTop: 16 }}>
                <Rich value={AUTHOR_BLOCK.title} />
              </h2>
              <p className="lede" style={{ marginTop: 20 }}>
                {AUTHOR_BLOCK.lede}
              </p>
              <div className="links">
                {AUTHOR_BLOCK.links.map((l) => (
                  <VeilLink key={l.path} href={l.path}>
                    {l.label}
                  </VeilLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
