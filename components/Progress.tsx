"use client";

import { toggleWeakTerm, useStore } from "@/lib/store";
import { OnionMark } from "./OnionMark";

/** Small onion showing how deep this reader has peeled a concept. */
export function ProgressMark({ conceptId, max = 4 }: { conceptId: string; max?: number }) {
  const progress = useStore("onion.progress");
  const d = progress[conceptId];
  return (
    <span className="progress-mark" title={d === undefined ? "Not opened yet" : `Peeled to L${d}`}>
      <OnionMark depth={d ?? -1} max={max} size={22} />
    </span>
  );
}

export function PathProgress({ steps }: { steps: string[] }) {
  const progress = useStore("onion.progress");
  const done = steps.filter((s) => (progress[s] ?? -1) >= 2).length;
  return (
    <span className="muted small">
      {done}/{steps.length} peeled to Core
    </span>
  );
}

export function WeakTermButton({ id }: { id: string }) {
  const weak = useStore("onion.weakTerms");
  const on = weak.includes(id);
  return (
    <button type="button" className="btn" aria-pressed={on} onClick={() => toggleWeakTerm(id)}>
      {on ? "★ In your weak-word list" : "☆ Add to weak words"}
    </button>
  );
}
