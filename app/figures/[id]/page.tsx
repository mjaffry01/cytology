import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptsUsingFigure, figureById, figures } from "@/content";
import { ZoomFigure } from "@/components/ZoomFigure";

export const dynamicParams = false;

export function generateStaticParams() {
  return figures.map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const f = figureById[(await params).id];
  return f ? { title: f.title, description: f.alt } : {};
}

export default async function FigurePage({ params }: { params: Promise<{ id: string }> }) {
  const f = figureById[(await params).id];
  if (!f) notFound();
  const usedBy = conceptsUsingFigure(f.id);
  return (
    <article className="page">
      <p className="crumbs">
        <Link href="/figures">Figures</Link> <span aria-hidden>›</span> {f.title}
      </p>
      <ZoomFigure figure={f} initialMode="reference" standalone />
      {usedBy.length > 0 && (
        <p>
          <span className="muted">Used in:</span>{" "}
          {usedBy.map((c, i) => (
            <span key={c.id}>
              {i ? " · " : ""}
              <Link href={`/study/${c.id}`}>{c.title}</Link>
            </span>
          ))}
        </p>
      )}
    </article>
  );
}
