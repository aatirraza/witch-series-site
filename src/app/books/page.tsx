import type { Metadata } from "next";
import { HEADS } from "../../../data/pages";
import { routeTitle } from "../../../data/site";
import Library from "@/components/books/Library";
import PageHead from "@/components/PageHead";
import PageShown from "@/components/PageShown";

export const metadata: Metadata = { title: routeTitle("/books") };

export default function BooksPage() {
  return (
    <div className="page on" data-page="books">
      <PageShown path="/books" />
      <PageHead head={HEADS.books} />
      <main className="wrap">
        <Library />
      </main>
    </div>
  );
}
