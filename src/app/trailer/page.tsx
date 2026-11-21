import type { Metadata } from "next";
import Image from "next/image";
import { HEADS } from "../../../data/pages";
import { routeTitle } from "../../../data/site";
import { MOOD, TRAILER } from "../../../data/trailer";
import PageHead from "@/components/PageHead";
import PageShown from "@/components/PageShown";
import Rich from "@/components/Rich";
import Worlds from "@/components/trailer/Worlds";

export const metadata: Metadata = { title: routeTitle("/trailer") };

export default function TrailerPage() {
  return (
    <div className="page on" data-page="trailer">
      <PageShown path="/trailer" />
      <PageHead head={HEADS.trailer} />
      <main className="wrap">
        <section>
          <div className="shead">
            <div className="kicker">{TRAILER.worlds.kicker}</div>
            <h2>
              <Rich value={TRAILER.worlds.title} />
            </h2>
            <p className="lede">{TRAILER.worlds.lede}</p>
          </div>
          <Worlds />
        </section>
        <section style={{ paddingTop: 0 }}>
          <div className="shead">
            <div className="kicker">{TRAILER.mood.kicker}</div>
            <h2>
              <Rich value={TRAILER.mood.title} />
            </h2>
          </div>
          <div className="mood">
            {MOOD.map((m) => (
              <figure className="mt" style={{ gridArea: m.area }} key={m.area}>
                <Image
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  sizes="(max-width: 960px) 50vw, 360px"
                  style={m.objectPosition ? { objectPosition: m.objectPosition } : undefined}
                />
                <figcaption>{m.caption}</figcaption>
                {m.credit && <span className="cr">{m.credit}</span>}
              </figure>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
