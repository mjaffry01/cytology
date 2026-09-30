import type { Metadata } from "next";
import { Suspense } from "react";
import { buildSearchIndex } from "@/content";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  const index = buildSearchIndex();
  return (
    <article className="page narrow">
      <h1>Search</h1>
      <p className="muted">Looks through concept titles, every layer, glossary words and figure labels.</p>
      <Suspense>
        <SearchResults index={index} />
      </Suspense>
    </article>
  );
}
