import type { Metadata } from "next";
import { routeTitle } from "../../../data/site";
import Descent from "@/components/descent/Descent";
import PageShown from "@/components/PageShown";

export const metadata: Metadata = { title: routeTitle("/descent") };

export default function DescentPage() {
  return (
    <div className="page on" data-page="descent">
      <PageShown path="/descent" />
      <Descent />
    </div>
  );
}
