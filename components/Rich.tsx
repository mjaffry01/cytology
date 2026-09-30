import { Fragment } from "react";
import { termById } from "@/content/terms";
import { Term } from "./Term";

const LINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/** Renders onion prose. `[[termId]]` or `[[termId|label]]` becomes a zoomable word. */
export function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, id, label] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <Term key={at} id={id}>
        {label ?? termById[id]?.word ?? id}
      </Term>,
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
