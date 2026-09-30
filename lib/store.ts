"use client";

import { useSyncExternalStore } from "react";

// Per-browser study state. v1 has no accounts, so everything lives in localStorage.
// Every read/write is wrapped: private windows and blocked storage must not break a page.

export type ErrorEntry = { qid: string; conceptId: string; kind: "wrong" | "guessed"; at: number };

type Shape = {
  "onion.depth": number;
  "onion.progress": Record<string, number>;
  "onion.errors": ErrorEntry[];
  "onion.weakTerms": string[];
};

const DEFAULTS: Shape = {
  "onion.depth": 1,
  "onion.progress": {},
  "onion.errors": [],
  "onion.weakTerms": [],
};

const EVENT = "onion-store";
const cache = new Map<string, { raw: string | null; value: unknown }>();

export function read<K extends keyof Shape>(key: K): Shape[K] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    /* storage blocked */
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.value as Shape[K];
  let value: Shape[K] = DEFAULTS[key];
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as Shape[K];
    } catch {
      /* corrupt entry: fall back to default */
    }
  }
  cache.set(key, { raw, value });
  return value;
}

export function write<K extends keyof Shape>(key: K, value: Shape[K]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: state lives only for this render */
    cache.set(key, { raw: null, value });
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useStore<K extends keyof Shape>(key: K): Shape[K] {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => DEFAULTS[key],
  );
}

export function recordDepth(conceptId: string, depth: number) {
  const p = read("onion.progress");
  if ((p[conceptId] ?? -1) >= depth) return;
  write("onion.progress", { ...p, [conceptId]: depth });
}

export function logError(entry: Omit<ErrorEntry, "at">) {
  const list = read("onion.errors").filter((e) => !(e.qid === entry.qid && e.kind === entry.kind));
  write("onion.errors", [{ ...entry, at: Date.now() }, ...list].slice(0, 200));
}

export function clearError(qid: string) {
  write(
    "onion.errors",
    read("onion.errors").filter((e) => e.qid !== qid),
  );
}

export function toggleWeakTerm(id: string) {
  const list = read("onion.weakTerms");
  write("onion.weakTerms", list.includes(id) ? list.filter((t) => t !== id) : [id, ...list]);
}
