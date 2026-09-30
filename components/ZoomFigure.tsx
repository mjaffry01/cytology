"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Figure, FigureHotspot } from "@/content/schema";
import { termById } from "@/content/terms";
import { FigureArt, VIEW_H } from "./FigureArt";

type Mode = "overview" | "parts" | "reference";
const MODES: { id: Mode; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "parts", label: "Labelled parts" },
  { id: "reference", label: "Reference" },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/**
 * Picture zoom. Click a region to highlight it and read what it is; pinch, ctrl+wheel or the
 * buttons to zoom; drag to pan. Labels sit inside the zoomed layer so they stay anchored,
 * and are counter-scaled so they stay readable.
 */
export function ZoomFigure({
  figure,
  initialMode = "parts",
  standalone = false,
  currentConceptId,
}: {
  figure: Figure;
  initialMode?: Mode;
  standalone?: boolean;
  currentConceptId?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [sel, setSel] = useState<FigureHotspot | null>(null);
  const [view, setView] = useState({ s: 1, x: 0, y: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; s: number } | null>(null);
  const moved = useRef(false);


  // Standalone figure pages: #hotspotId selects that part (search results link here).
  useEffect(() => {
    if (!standalone) return;
    const pick = () => {
      const h = figure.hotspots.find((p) => `#${p.id}` === window.location.hash);
      if (h) setSel(h);
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [figure, standalone]);

  const zoomAt = (factor: number, cx?: number, cy?: number) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = cx ?? r.width / 2;
    const py = cy ?? r.height / 2;
    setView((v) => {
      const s = clamp(v.s * factor, 1, 5);
      const k = s / v.s;
      return fit({ s, x: px - (px - v.x) * k, y: py - (py - v.y) * k }, r.width, r.height);
    });
  };

  const fit = (v: { s: number; x: number; y: number }, w: number, h: number) => ({
    s: v.s,
    x: clamp(v.x, w - w * v.s, 0),
    y: clamp(v.y, h - h * v.s, 0),
  });

  // Wheel zoom only with ctrl/cmd (trackpad pinch sends ctrlKey), so normal scrolling still scrolls the page.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), s: view.s };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const el = stage.current!;
    const r = el.getBoundingClientRect();
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && gesture.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const target = clamp((gesture.current.s * dist) / gesture.current.dist, 1, 5);
      zoomAt(target / view.s, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      moved.current = true;
      return;
    }
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true;
    if (view.s > 1 && moved.current) {
      if (!el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId);
      setView((v) => fit({ s: v.s, x: v.x + dx, y: v.y + dy }, r.width, r.height));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) gesture.current = null;
  };

  const choose = (h: FigureHotspot) => {
    if (moved.current) return; // a drag, not a click
    setSel((cur) => (cur?.id === h.id ? null : h));
  };

  const selTerm = sel?.termId ? termById[sel.termId] : undefined;
  const selConcept = sel?.conceptId ?? selTerm?.conceptId;

  return (
    <figure className="zfig" data-mode={mode} id={standalone ? undefined : `fig-${figure.id}`}>
      <div className="zfig-bar">
        <span className="zfig-title">{figure.title}</span>
        <div className="seg" role="group" aria-label="Figure depth">
          {MODES.map((m) => (
            <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="zfig-zoom">
          <button type="button" onClick={() => zoomAt(1 / 1.4)} aria-label="Zoom out" disabled={view.s <= 1}>
            −
          </button>
          <button type="button" onClick={() => zoomAt(1.4)} aria-label="Zoom in" disabled={view.s >= 5}>
            +
          </button>
          <button type="button" onClick={() => setView({ s: 1, x: 0, y: 0 })} aria-label="Reset zoom" disabled={view.s === 1}>
            ⟲
          </button>
        </div>
      </div>

      <div
        ref={stage}
        className="zfig-stage"
        style={{ aspectRatio: `1000 / ${VIEW_H[figure.kind]}`, cursor: view.s > 1 ? "grab" : undefined }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="zfig-layer" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})` }}>
          <FigureArt figure={figure} />
          {figure.hotspots.map((h) => (
            <button
              key={h.id}
              type="button"
              className="hot"
              data-sel={sel?.id === h.id}
              data-dim={!!sel && sel.id !== h.id}
              data-label={h.y >= 10 ? "above" : h.h >= 20 ? "inside" : "below"}
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%` }}
              onClick={() => choose(h)}
              aria-label={h.label}
            >
              <span className="hot-label" style={{ transform: `scale(${1 / view.s})`, maxWidth: `calc(${100 * view.s}% + 4px)` }}>
                {h.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="zfig-help muted small">
        Tap a region to read it. Pinch, ctrl + scroll or the + button to zoom; drag to pan.
      </p>

      <div className="zfig-caption" aria-live="polite">
        {sel ? (
          <>
            <p>
              <strong>{sel.label}.</strong> {sel.note}
            </p>
            <p className="zfig-links">
              {selTerm && (
                <Link href={`/terms/${selTerm.id}`}>
                  Word card: {selTerm.word}
                </Link>
              )}
              {selConcept && selConcept !== currentConceptId && <Link href={`/study/${selConcept}`}>Peel the concept →</Link>}
            </p>
          </>
        ) : (
          <p className="muted">{mode === "overview" ? figure.alt + "." : "Choose a labelled region."}</p>
        )}
      </div>

      {mode === "reference" && (
        <dl className="refstrip">
          <div>
            <dt>Figure</dt>
            <dd>{figure.title}</dd>
          </div>
          <div>
            <dt>Shows</dt>
            <dd>{figure.shows}</dd>
          </div>
          <div>
            <dt>Is not</dt>
            <dd>{figure.not}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{figure.citation}</dd>
          </div>
        </dl>
      )}
      <figcaption className="sr-only">{figure.alt}</figcaption>
    </figure>
  );
}
