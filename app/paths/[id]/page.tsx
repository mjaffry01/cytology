import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { conceptById, pathById, paths, plain } from "@/content";
import { PathProgress, ProgressMark } from "@/components/Progress";

export const dynamicParams = false;

export function generateStaticParams() {
  return paths.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = pathById[(await params).id];
  return p ? { title: p.title, description: p.blurb } : {};
}

export default async function PathPage({ params }: { params: Promise<{ id: string }> }) {
  const p = pathById[(await params).id];
  if (!p) notFound();
  return (
    <article className="page narrow">
      <p className="crumbs">
        <Link href="/">Home</Link> <span aria-hidden>›</span> Study path
      </p>
      <h1>{p.title}</h1>
      <p className="lede">{p.blurb}</p>
      <PathProgress steps={p.steps} />
      <ol className="path-list">
        {p.steps.map((id) => {
          const c = conceptById[id];
          const needs = c.prerequisite.filter((x) => !p.steps.includes(x));
          return (
            <li key={id}>
              <Link href={`/study/${id}`}>
                <span className="path-row">
                  <strong>{c.title}</strong>
                  <ProgressMark conceptId={id} max={c.layers.l4?.length ? 4 : 3} />
                </span>
                <span className="small">{plain(c.layers.l0)}</span>
                {needs.length > 0 && (
                  <span className="small muted">
                    Needs first: {needs.map((n) => conceptById[n]?.title).join(", ")}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
