import type { Metadata } from "next";
import Link from "next/link";
import { figures } from "@/content";
import { FigureArt } from "@/components/FigureArt";

export const metadata: Metadata = { title: "Figures", description: "Original zoomable cell maps and stage diagrams." };

export default function FiguresIndex() {
  return (
    <article className="page">
      <h1>Figures</h1>
      <p className="lede">Original diagrams with clickable parts. Open one to zoom, peel labels, and read what it is not.</p>
      <ul className="fig-grid">
        {figures.map((f) => (
          <li key={f.id}>
            <Link href={`/figures/${f.id}`} className="fig-card">
              <span className="fig-thumb">
                <FigureArt figure={f} />
              </span>
              <strong>{f.title}</strong>
              <span className="small muted">{f.hotspots.length} labelled parts</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
