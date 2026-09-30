"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { termById } from "@/content/terms";

/**
 * Word zoom. Hover (mouse) or tap (touch) shows the one-line gloss and pronunciation.
 * The popover links to the full term card for the deeper layers.
 */
export function Term({ id, children }: { id: string; children: React.ReactNode }) {
  const term = termById[id];
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const wrap = useRef<HTMLSpanElement>(null);
  const popId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) {
        setOpen(false);
        setPinned(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPinned(false);
      }
    };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!term) return <>{children}</>;

  const hoverCapable = () => window.matchMedia("(hover: hover)").matches;

  return (
    <span
      ref={wrap}
      className="term"
      onMouseEnter={() => {
        if (!hoverCapable()) return;
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setOpen(true), 120);
      }}
      onMouseLeave={() => {
        window.clearTimeout(timer.current);
        if (!pinned) timer.current = window.setTimeout(() => setOpen(false), 180);
      }}
    >
      <button
        type="button"
        className="term-word"
        aria-expanded={open}
        aria-controls={popId}
        onClick={() => {
          setPinned(!(open && pinned));
          setOpen(!(open && pinned));
        }}
      >
        {children}
      </button>
      {open && (
        <span className="term-pop" id={popId} role="dialog" aria-label={term.word}>
          <span className="term-pop-head">
            <strong>{term.word}</strong> <span className="term-say">/{term.pronunciation}/</span>
          </span>
          <span className="term-pop-gloss">{term.hover}</span>
          <span className="term-pop-foot">
            <span className="muted">Not: {term.dontConfuse}</span>
            <Link href={`/terms/${term.id}`} className="term-pop-link">
              Zoom into the word →
            </Link>
          </span>
        </span>
      )}
    </span>
  );
}
