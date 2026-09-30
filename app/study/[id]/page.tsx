import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { assertContent, concepts, conceptById, figureById, plain, questionsFor } from "@/content";
import type { LayerId } from "@/content/schema";
import { CompareTable } from "@/components/CompareTable";
import { OnionReader } from "@/components/OnionReader";
import { QuizBlock } from "@/components/QuizBlock";
import { Rich } from "@/components/Rich";
import { ZoomFigure } from "@/components/ZoomFigure";

export const dynamicParams = false;

export function generateStaticParams() {
  assertContent();
  return concepts.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = conceptById[(await params).id];
  return c ? { title: c.title, description: plain(c.layers.l0) } : {};
}

const Paras = ({ items }: { items: string[] }) => (
  <>
    {items.map((p) => (
      <p key={p}>
        <Rich text={p} />
      </p>
    ))}
  </>
);

export default async function ConceptPage({ params }: { params: Promise<{ id: string }> }) {
  const c = conceptById[(await params).id];
  if (!c) notFound();

  const figs = c.figures.map((f) => figureById[f]).filter(Boolean);
  const qs = questionsFor(c.id);
  const next = c.next ? conceptById[c.next] : undefined;

  const sections: { layer: LayerId; body: React.ReactNode }[] = [
    {
      layer: "l0",
      body: (
        <p className="skin">
          <Rich text={c.layers.l0} />
        </p>
      ),
    },
    {
      layer: "l1",
      body: (
        <>
          <Paras items={c.layers.l1} />
          {figs.map((f) => (
            <ZoomFigure key={f.id} figure={f} currentConceptId={c.id} />
          ))}
        </>
      ),
    },
    { layer: "l2", body: <Paras items={c.layers.l2} /> },
    {
      layer: "l3",
      body: (
        <ul className="seed-list">
          {c.layers.l3.map((p) => (
            <li key={p}>
              <Rich text={p} />
            </li>
          ))}
        </ul>
      ),
    },
  ];
  if (c.layers.l4?.length) sections.push({ layer: "l4", body: <Paras items={c.layers.l4} /> });

  return (
    <article className="concept">
      <header className="concept-head">
        <p className="crumbs">
          <Link href="/#shelves">Study</Link> <span aria-hidden>›</span> {c.title}
        </p>
        <h1>{c.title}</h1>
        <p className="tags">
          {c.examTags.map((t) => (
            <span key={t} className="tag">
              {t.toUpperCase()}
            </span>
          ))}
          <span className="pointer">Study pointer: {c.ncertPointer}</span>
        </p>
        {c.prerequisite.length > 0 && (
          <p className="prereq">
            <span className="muted">You need this first:</span>{" "}
            {c.prerequisite.map((p, i) => (
              <span key={p}>
                {i ? " · " : ""}
                <Link href={`/study/${p}`}>{conceptById[p]?.title ?? p}</Link>
              </span>
            ))}
          </p>
        )}
      </header>

      <OnionReader conceptId={c.id} sections={sections} recall={c.recall} />

      {c.compare && (
        <section id="compare" className="block">
          <CompareTable table={c.compare} />
        </section>
      )}

      {qs.length > 0 && (
        <section id="practice" className="block">
          <h2>Practice</h2>
          <QuizBlock questions={qs} />
        </section>
      )}

      <nav className="concept-foot" aria-label="Where next">
        {c.seeAlso.length > 0 && (
          <p>
            <span className="muted">See also:</span>{" "}
            {c.seeAlso.map((s, i) => (
              <span key={s}>
                {i ? " · " : ""}
                <Link href={`/study/${s}`}>{conceptById[s]?.title ?? s}</Link>
              </span>
            ))}
          </p>
        )}
        {next && (
          <Link href={`/study/${next.id}`} className="next-card">
            <span className="muted small">Next</span>
            <strong>{next.title} →</strong>
            <span className="small">{plain(next.layers.l0)}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
