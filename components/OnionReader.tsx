"use client";

import { useCallback, useEffect, useState } from "react";
import { LAYER_HINTS, LAYER_LABELS, type LayerId } from "@/content/schema";
import { read, recordDepth, useStore, write } from "@/lib/store";
import { OnionMark } from "./OnionMark";

type Section = { layer: LayerId; body: React.ReactNode };

const idx = (l: LayerId) => Number(l.slice(1));

/**
 * Concept zoom. Every layer is a real section with its own heading and #lN anchor.
 * Depth is a reader preference (kept across pages); a #lN link opens at least that deep.
 */
export function OnionReader({
  conceptId,
  sections,
  recall,
}: {
  conceptId: string;
  sections: Section[];
  recall: string[];
}) {
  const stored = useStore("onion.depth");
  const max = sections.length - 1;
  const depth = Math.min(Math.max(stored, 0), max);
  const [checked, setChecked] = useState<boolean[]>(() => recall.map(() => false));

  const setDepth = useCallback(
    (d: number) => {
      const next = Math.min(Math.max(d, 0), max);
      write("onion.depth", next);
      recordDepth(conceptId, next);
    },
    [conceptId, max],
  );

  useEffect(() => {
    recordDepth(conceptId, depth);
  }, [conceptId, depth]);


  // Deep links: /study/mitochondria#l2 opens at least to Core and scrolls there.
  useEffect(() => {
    const fromHash = () => {
      const m = /^#l([0-4])$/.exec(window.location.hash);
      if (!m) return;
      const n = Number(m[1]);
      if (n > read("onion.depth")) setDepth(n);
      requestAnimationFrame(() => document.getElementById(`l${n}`)?.scrollIntoView({ block: "start" }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [setDepth]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "]") {
        e.preventDefault();
        setDepth(depth + 1);
      } else if (e.key === "[") {
        e.preventDefault();
        setDepth(depth - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [depth, setDepth]);

  const peel = (n: number) => {
    setDepth(n);
    requestAnimationFrame(() => document.getElementById(`l${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const recallStrip = (
    <aside className="recall" aria-label="Recall before peeling">
      <p className="recall-title">Three checks before the next peel</p>
      <ul>
        {recall.map((q, i) => (
          <li key={q}>
            <label>
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="muted small">Say the answer aloud. If one is shaky, stay on this layer a little longer.</p>
    </aside>
  );

  return (
    <div className="onion">
      <div className="depth-bar" role="group" aria-label="Reading depth">
        <OnionMark depth={depth} max={max} />
        <div className="depth-steps">
          {sections.map(({ layer }) => {
            const n = idx(layer);
            return (
              <button
                key={layer}
                type="button"
                className="depth-step"
                data-on={n <= depth}
                data-current={n === depth}
                aria-pressed={n <= depth}
                onClick={() => setDepth(n)}
                title={LAYER_HINTS[layer]}
              >
                <span className="depth-num">L{n}</span>
                <span className="depth-name">{LAYER_LABELS[layer]}</span>
              </button>
            );
          })}
        </div>
        <span className="depth-keys muted small" aria-hidden>
          <kbd>[</kbd> shallower · <kbd>]</kbd> deeper
        </span>
      </div>

      {sections.map(({ layer, body }) => {
        const n = idx(layer);
        const open = n <= depth;
        const isNextPeel = n === depth + 1;
        return (
          <section key={layer} id={layer} className="layer" data-layer={layer} data-open={open}>
            {isNextPeel && recallStrip}
            <h2 className="layer-head">
              <a href={`#${layer}`} className="layer-anchor" aria-label={`Link to ${LAYER_LABELS[layer]}`}>
                L{n}
              </a>{" "}
              {LAYER_LABELS[layer]} <span className="layer-hint">{LAYER_HINTS[layer]}</span>
            </h2>
            <div className="layer-body">{body}</div>
            {isNextPeel && (
              <button type="button" className="peel" onClick={() => peel(n)}>
                Peel to {LAYER_LABELS[layer]} <span aria-hidden>↓</span>
              </button>
            )}
          </section>
        );
      })}
      {depth === max && recallStrip}
    </div>
  );
}
