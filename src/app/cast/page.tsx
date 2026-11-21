import type { Metadata } from "next";
import { HEADS } from "../../../data/pages";
import { routeTitle } from "../../../data/site";
import CastRing from "@/components/cast/CastRing";
import PageHead from "@/components/PageHead";
import PageShown from "@/components/PageShown";

export const metadata: Metadata = { title: routeTitle("/cast") };

export default function CastPage() {
  return (
    <div className="page on" data-page="cast">
      <PageShown path="/cast" />
      <PageHead head={HEADS.cast} />
      <main className="wrap">
        <CastRing />
      </main>
    </div>
  );
}
