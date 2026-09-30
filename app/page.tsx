import Link from "next/link";
import { conceptById, paths, plain, shelves } from "@/content";
import { LAYER_HINTS, LAYER_LABELS, type LayerId } from "@/content/schema";
import { OnionMark } from "@/components/OnionMark";
import { PathProgress, ProgressMark } from "@/components/Progress";

const LAYERS: LayerId[] = ["l0", "l1", "l2", "l3", "l4"];
const EXAMPLE: Record<LayerId, string> = {
  l0: "Mitochondria are the cell’s power plants.",
  l1: "A sausage with two skins; the inner one is crumpled into cristae.",
  l2: "Double membrane, own circular DNA, 70S ribosomes: semi-autonomous.",
  l3: "Trap: the Krebs cycle runs in the matrix, not on the cristae.",
  l4: "Why: an engulfed bacterium that never left — the endosymbiont story.",
};

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div>
          <h1>
            Peel the cell,
            <br />
            one layer at a time.
          </h1>
          <p className="lede">
            Cell biology for NEET, AIIMS, JIPMER and the old UP CPMT. Every idea starts as one everyday sentence and goes
            as deep as you want: classroom story, exam facts, traps, and the reason it is true.
          </p>
          <p className="hero-cta">
            <Link href="/study/mitochondria" className="btn primary">
              Start with mitochondria
            </Link>
            <Link href="/study/mitosis" className="btn">
              Or mitosis
            </Link>
          </p>
        </div>
        <ol className="layer-legend" aria-label="The five layers">
          {LAYERS.map((l, i) => (
            <li key={l} style={{ ["--i" as string]: i }}>
              <OnionMark depth={i} size={30} />
              <div>
                <p className="legend-name">
                  L{i} {LAYER_LABELS[l]} <span className="muted small">· {LAYER_HINTS[l]}</span>
                </p>
                <p className="legend-eg">{EXAMPLE[l]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="paths" aria-labelledby="paths-h">
        <h2 id="paths-h">Study paths</h2>
        <div className="path-grid">
          {paths.map((p) => (
            <Link key={p.id} href={`/paths/${p.id}`} className="path-card">
              <strong>{p.title}</strong>
              <span className="small">{p.blurb}</span>
              <span className="path-steps small muted">
                {p.steps.map((s) => conceptById[s]?.title).join(" → ")}
              </span>
              <PathProgress steps={p.steps} />
            </Link>
          ))}
        </div>
      </section>

      <section id="shelves" aria-labelledby="shelves-h">
        <h2 id="shelves-h">All concepts</h2>
        {shelves.map((s) => (
          <div key={s.title} className="shelf">
            <h3>
              {s.title} <span className="muted small">· {s.pointer}</span>
            </h3>
            <ul className="concept-grid">
              {s.ids.map((id) => {
                const c = conceptById[id];
                return (
                  <li key={id}>
                    <Link href={`/study/${id}`} className="concept-card">
                      <span className="concept-card-top">
                        <strong>{c.title}</strong>
                        <ProgressMark conceptId={id} max={c.layers.l4?.length ? 4 : 3} />
                      </span>
                      <span className="small">{plain(c.layers.l0)}</span>
                      <span className="tags small">
                        {c.examTags.map((t) => (
                          <span key={t} className="tag">
                            {t.toUpperCase()}
                          </span>
                        ))}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
