"use client";

import { SERIES } from "../../data/books";
import { FOOTER, FOOTER_SOCIAL, SITE_NAME } from "../../data/site";
import { toGate } from "@/lib/nav";
import { secret } from "@/lib/secrets";
import VeilLink from "./VeilLink";

export default function Footer() {
  return (
    <footer>
      <div className="wrap fcols">
        <div>
          <VeilLink className="brand" href="/">
            <i></i>
            {SITE_NAME}
          </VeilLink>
          <p>{FOOTER.about}</p>
        </div>
        <div>
          <h5>{FOOTER.explore}</h5>
          {FOOTER.exploreLinks.map((l) => (
            <VeilLink key={l.path} href={l.path}>
              {l.label}
            </VeilLink>
          ))}
        </div>
        <div>
          <h5>{FOOTER.series}</h5>
          {SERIES.map((s, i) => (
            <VeilLink key={s.name} href="/books" series={i}>
              {s.name}
            </VeilLink>
          ))}
        </div>
        <div>
          <h5>{FOOTER.follow}</h5>
          {FOOTER_SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="wrap fbase">
        <span>
          {FOOTER.copyright}
          <button
            className="ember-egg"
            id="emberEgg"
            type="button"
            aria-label={FOOTER.emberLabel}
            onClick={() => {
              secret("ember");
              toGate();
            }}
          ></button>
        </span>
        <span>{FOOTER.note}</span>
      </div>
    </footer>
  );
}
