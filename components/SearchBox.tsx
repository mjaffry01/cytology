"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/** Header search. `/` focuses it from anywhere; Enter opens the results page. */
export function SearchBox() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== "/" || t.closest("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form
      role="search"
      className="searchbox"
      onSubmit={(e) => {
        e.preventDefault();
        const q = input.current?.value.trim();
        if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
      }}
    >
      <input ref={input} type="search" name="q" placeholder="Search terms, layers, labels" aria-label="Search" />
      <kbd aria-hidden>/</kbd>
    </form>
  );
}
