import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptById, figures, termById, terms } from "@/content";
import { LAYER_LABELS, type LayerId } from "@/content/schema";
import { WeakTermButton } from "@/components/Progress";

export const dynamicParams = false;

export function generateStaticParams() {
  return terms.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const t = termById[(await params).id];
  return t ? { title: t.word, description: t.hover } : {};
}

export default async function TermCard({ params }: { params: Promise<{ id: string }> }) {
  const t = termById[(await params).id];
  if (!t) notFound();
  const concept = t.conceptId ? conceptById[t.conceptId] : undefined;
  const inFigures = figures.flatMap((f) => f.hotspots.filter((h) => h.termId === t.id).map((h) => ({ f, h })));
  const layers = (Object.entries(t.layers) as [LayerId, string][]).sort(([a], [b]) => a.localeCompare(b));

  return (
    <article className="page narrow term-card">
      <p className="crumbs">
        <Link href="/terms">Glossary</Link> <span aria-hidden>›</span> {t.word}
      </p>
      <h1>
        {t.word} <span className="term-say">/{t.pronunciation}/</span>
      </h1>
      <p className="lede">{t.hover}</p>

      <ol className="term-layers">
        {layers.map(([l, text]) => (
          <li key={l} data-layer={l}>
            <span className="term-layer-tag">
              L{l.slice(1)} {LAYER_LABELS[l]}
            </span>
            <span>{text}</span>
          </li>
        ))}
      </ol>

      <dl className="term-facts">
        <div>
          <dt>Word root</dt>
          <dd>{t.etymology}</dd>
        </div>
        <div className="warn">
          <dt>Don’t confuse with</dt>
          <dd>{t.dontConfuse}</dd>
        </div>
        <div className="exam">
          <dt>Exam line</dt>
          <dd>{t.examLine}</dd>
        </div>
        {t.related.length > 0 && (
          <div>
            <dt>Related words</dt>
            <dd>
              {t.related.map((r, i) => (
                <span key={r}>
                  {i ? " · " : ""}
                  {termById[r] ? (
                    <Link href={`/terms/${r}`}>{termById[r].word}</Link>
                  ) : conceptById[r] ? (
                    <Link href={`/study/${r}`}>{conceptById[r].title}</Link>
                  ) : (
                    r
                  )}
                </span>
              ))}
            </dd>
          </div>
        )}
        {inFigures.length > 0 && (
          <div>
            <dt>In the figures</dt>
            <dd>
              {inFigures.map(({ f, h }, i) => (
                <span key={f.id + h.id}>
                  {i ? " · " : ""}
                  <Link href={`/figures/${f.id}#${h.id}`}>
                    {h.label} in {f.title}
                  </Link>
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>

      <p className="term-actions">
        <WeakTermButton id={t.id} />
        {concept && (
          <Link href={`/study/${concept.id}`} className="btn primary">
            Peel the concept: {concept.title} →
          </Link>
        )}
      </p>
    </article>
  );
}
