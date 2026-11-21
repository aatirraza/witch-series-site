import type { Metadata } from "next";
import { CONTACT, HEADS } from "../../../data/pages";
import { routeTitle, SOCIAL, STORES, type ExtLink } from "../../../data/site";
import EmailCard from "@/components/contact/EmailCard";
import PageHead from "@/components/PageHead";
import PageShown from "@/components/PageShown";

export const metadata: Metadata = { title: routeTitle("/contact") };

function LinkCard({ kicker, links }: { kicker: string; links: ExtLink[] }) {
  return (
    <div className="cc">
      <div className="kicker">{kicker}</div>
      <div className="links" style={{ marginTop: 6 }}>
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener">
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="page on" data-page="contact">
      <PageShown path="/contact" />
      <PageHead head={HEADS.contact} />
      <main className="wrap">
        <section>
          <div className="ccards">
            <EmailCard />
            <LinkCard kicker={CONTACT.follow} links={SOCIAL} />
            <LinkCard kicker={CONTACT.buy} links={STORES} />
          </div>
        </section>
      </main>
    </div>
  );
}
