"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { SearchItem } from "@/content";

const KIND: Record<SearchItem["kind"], string> = {
  concept: "Concept",
  layer: "Layer",
  term: "Word",
  figure: "Figure label",
};

function score(item: SearchItem, words: string[]) {
  const title = item.title.toLowerCase();
  const text = item.text.toLowerCase();
  let s = 0;
  for (const w of words) {
    if (title === w) s += 12;
    else if (title.startsWith(w)) s += 8;
    else if (title.includes(w)) s += 5;
    else if (text.includes(w)) s += 2;
    else return 0;
  }
  return s + (item.kind === "concept" || item.kind === "term" ? 1 : 0);
}

function Snippet({ text, words }: { text: string; words: string[] }) {
  const lower = text.toLowerCase();
  const at = Math.max(0, Math.min(...words.map((w) => lower.indexOf(w)).filter((i) => i >= 0), text.length) - 60);
  const cut = (at > 0 ? "…" : "") + text.slice(at, at + 180) + (at + 180 < text.length ? "…" : "");
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return (
    <>
      {cut.split(re).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part))}
    </>
  );
}

export function SearchResults({ index }: { index: SearchItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);

  const hits = useMemo(
    () =>
      words.length
        ? index
            .map((item) => ({ item, s: score(item, words) }))
            .filter((h) => h.s > 0)
            .sort((a, b) => b.s - a.s)
            .slice(0, 60)
        : [],
    // words derive from q
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, q],
  );

  return (
    <div>
      <form
        className="searchbig"
        onSubmit={(e) => {
          e.preventDefault();
          const v = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
          router.replace(`/search?q=${encodeURIComponent(v)}`);
        }}
      >
        <input name="q" type="search" defaultValue={q} key={q} placeholder="cristae, pachytene, 70S…" autoFocus aria-label="Search" />
        <button type="submit">Search</button>
      </form>
      {words.length > 0 && (
        <p className="muted">
          {hits.length} result{hits.length === 1 ? "" : "s"} for “{q}”
        </p>
      )}
      <ul className="hits">
        {hits.map(({ item }, i) => (
          <li key={item.href + i}>
            <Link href={item.href}>
              <span className="hit-kind">{KIND[item.kind]}</span>
              <span className="hit-title">
                {item.title}
                {item.kind !== "concept" && <span className="muted"> · {item.context}</span>}
              </span>
              <span className="hit-text">
                <Snippet text={item.text} words={words} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
