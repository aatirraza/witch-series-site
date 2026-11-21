import type { Metadata } from "next";
import { routeTitle } from "../../../data/site";
import PageShown from "@/components/PageShown";
import BookMatch from "@/components/play/BookMatch";

export const metadata: Metadata = { title: routeTitle("/play") };

export default function PlayPage() {
  return (
    <div className="page on" data-page="play">
      <PageShown path="/play" />
      <section className="game">
        <span className="gbg"></span>
        <BookMatch />
      </section>
    </div>
  );
}
