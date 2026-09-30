import type { Metadata } from "next";
import Link from "next/link";
import { terms } from "@/content";

export const metadata: Metadata = { title: "Glossary", description: "Every cell-biology word on the site, with a hover line and a zoomable card." };

export default function Glossary() {
  const sorted = [...terms].sort((a, b) => a.word.localeCompare(b.word, "en", { numeric: true }));
  const groups = new Map<string, typeof sorted>();
  for (const t of sorted) {
    const k = /[a-z]/i.test(t.word[0]) ? t.word[0].toUpperCase() : "#";
    groups.set(k, [...(groups.get(k) ?? []), t]);
  }
  return (
    <article className="page">
      <h1>Glossary</h1>
      <p className="lede">
        {terms.length} words. Each one has a one-line hover, a pronunciation, its own layers, and a “don’t confuse with”.
      </p>
      <nav className="az" aria-label="Jump to letter">
        {[...groups.keys()].map((k) => (
          <a key={k} href={`#g-${k}`}>
            {k}
          </a>
        ))}
      </nav>
      {[...groups.entries()].map(([k, list]) => (
        <section key={k} id={`g-${k}`} className="gloss-group">
          <h2>{k}</h2>
          <dl>
            {list.map((t) => (
              <div key={t.id}>
                <dt>
                  <Link href={`/terms/${t.id}`}>{t.word}</Link> <span className="term-say">/{t.pronunciation}/</span>
                </dt>
                <dd>{t.hover}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </article>
  );
}
