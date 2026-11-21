import type { Metadata } from "next";
import Image from "next/image";
import { ABOUT, HEADS } from "../../../data/pages";
import { PRESS, routeTitle } from "../../../data/site";
import PageHead from "@/components/PageHead";
import PageShown from "@/components/PageShown";
import Rich from "@/components/Rich";

export const metadata: Metadata = { title: routeTitle("/about") };

export default function AboutPage() {
  const P = ABOUT.portrait;
  return (
    <div className="page on" data-page="about">
      <PageShown path="/about" />
      <PageHead head={HEADS.about} />
      <main className="wrap">
        <section>
          <div className="author">
            <div className="portrait">
              <Image
                src={P.src}
                alt={P.alt}
                width={P.width}
                height={P.height}
                sizes="(max-width: 960px) 100vw, 420px"
                style={{ height: "auto" }}
              />
            </div>
            <div>
              <div className="kicker">{ABOUT.kicker}</div>
              {ABOUT.paragraphs.map((t, i) => (
                <p className="lede" style={{ marginTop: i === 0 ? 18 : 14 }} key={i}>
                  {t}
                </p>
              ))}
              <div className="facts">
                {ABOUT.facts.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section style={{ paddingTop: 0 }}>
          <div className="shead">
            <div className="kicker">{ABOUT.press.kicker}</div>
            <h2>
              <Rich value={ABOUT.press.title} />
            </h2>
          </div>
          <div className="press2">
            {PRESS.map((a) => (
              <a key={a.href} href={a.href} target="_blank" rel="noopener">
                <span className="src">{a.src}</span>
                <b>{a.title}</b>
                <span className="go">{a.go}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
