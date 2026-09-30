import type { Concept, LayerId, StudyPath } from "./schema";
import { cellConcepts } from "./concepts/cell";
import { organelleConcepts } from "./concepts/organelles";
import { moreConcepts } from "./concepts/more";
import { terms, termById } from "./terms";
import { figures, figureById } from "./figures";
import { questions } from "./questions";
import { paths } from "./paths";

export const concepts: Concept[] = [...cellConcepts, ...organelleConcepts, ...moreConcepts];

export const conceptById = Object.fromEntries(concepts.map((c) => [c.id, c])) as Record<
  string,
  Concept
>;

export { terms, termById, figures, figureById, questions, paths };

export const shelves: { title: string; pointer: string; ids: string[] }[] = [
  {
    title: "The cell",
    pointer: "Class 9 entry · NCERT Class 11 Ch 8 § 8.1–8.4",
    ids: ["cell-theory", "prokaryotic-cell", "eukaryotic-cell", "protoplasm"],
  },
  {
    title: "Organelles",
    pointer: "NCERT Class 11 Ch 8 § 8.5",
    ids: [
      "plasma-membrane",
      "cell-wall",
      "endoplasmic-reticulum",
      "golgi-apparatus",
      "lysosome",
      "vacuole",
      "mitochondria",
      "plastids",
      "nucleus",
      "cytoskeleton",
      "centriole",
    ],
  },
  {
    title: "Chemicals of the cell",
    pointer: "NCERT Class 11 Ch 9",
    ids: ["biomolecules", "enzymes"],
  },
  {
    title: "Cell cycle and division",
    pointer: "NCERT Class 11 Ch 10",
    ids: ["cell-cycle", "mitosis", "meiosis", "amitosis"],
  },
  {
    title: "Differentiation (CPMT extras)",
    pointer: "Old UP CPMT Botany § 4 and Zoology histology",
    ids: ["plant-tissues", "animal-tissues"],
  },
];

export const questionsFor = (conceptId: string) =>
  questions.filter((q) => q.conceptId === conceptId);

export const pathById = Object.fromEntries(paths.map((p) => [p.id, p])) as Record<
  string,
  StudyPath
>;

/** Strip [[id|label]] markup to plain words (for search and meta text). */
export function plain(text: string): string {
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, id: string, label?: string) =>
    label ?? termById[id]?.word ?? id,
  );
}

export type SearchItem = {
  kind: "concept" | "layer" | "term" | "figure";
  title: string;
  context: string;
  text: string;
  href: string;
};

export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];
  for (const c of concepts) {
    items.push({
      kind: "concept",
      title: c.title,
      context: c.ncertPointer,
      text: plain(c.layers.l0),
      href: `/study/${c.id}`,
    });
    const layerTexts: [LayerId, string[]][] = [
      ["l1", c.layers.l1],
      ["l2", c.layers.l2],
      ["l3", c.layers.l3],
      ["l4", c.layers.l4 ?? []],
    ];
    for (const [layer, paras] of layerTexts) {
      for (const p of paras) {
        items.push({
          kind: "layer",
          title: c.title,
          context: layer.toUpperCase(),
          text: plain(p),
          href: `/study/${c.id}#${layer}`,
        });
      }
    }
  }
  for (const t of terms) {
    items.push({
      kind: "term",
      title: t.word,
      context: t.pronunciation,
      text: `${t.hover} ${t.examLine} ${t.dontConfuse}`,
      href: `/terms/${encodeURIComponent(t.id)}`,
    });
  }
  for (const f of figures) {
    for (const h of f.hotspots) {
      items.push({
        kind: "figure",
        title: h.label,
        context: f.title,
        text: h.note,
        href: `/figures/${f.id}#${h.id}`,
      });
    }
  }
  return items;
}

/** Throws at build time if any link in the content graph points nowhere. */
export function assertContent() {
  const bad: string[] = [];
  const need = (ok: boolean, msg: string) => ok || bad.push(msg);
  const ids = new Set<string>();
  for (const c of concepts) {
    need(!ids.has(c.id), `duplicate concept ${c.id}`);
    ids.add(c.id);
    for (const r of [...c.prerequisite, ...c.seeAlso, ...(c.next ? [c.next] : [])])
      need(!!conceptById[r], `${c.id}: unknown concept ${r}`);
    for (const f of c.figures) need(!!figureById[f], `${c.id}: unknown figure ${f}`);
    const text = [c.layers.l0, ...c.layers.l1, ...c.layers.l2, ...c.layers.l3, ...(c.layers.l4 ?? [])].join(" ");
    for (const m of text.matchAll(/\[\[([^\]|]+)/g)) need(!!termById[m[1]], `${c.id}: unknown term [[${m[1]}]]`);
  }
  for (const t of terms) {
    if (t.conceptId) need(!!conceptById[t.conceptId], `term ${t.id}: unknown concept ${t.conceptId}`);
    for (const r of t.related) need(!!termById[r] || !!conceptById[r], `term ${t.id}: unknown related ${r}`);
  }
  for (const f of figures)
    for (const h of f.hotspots) {
      if (h.termId) need(!!termById[h.termId], `figure ${f.id}/${h.id}: unknown term ${h.termId}`);
      if (h.conceptId) need(!!conceptById[h.conceptId], `figure ${f.id}/${h.id}: unknown concept ${h.conceptId}`);
    }
  for (const q of questions) need(!!conceptById[q.conceptId], `question ${q.id}: unknown concept`);
  for (const p of paths) for (const s of p.steps) need(!!conceptById[s], `path ${p.id}: unknown step ${s}`);
  if (bad.length) throw new Error(`Content graph has broken links:\n  ${bad.join("\n  ")}`);
}

/** Concepts whose figures list includes this figure id. */
export const conceptsUsingFigure = (figureId: string) =>
  concepts.filter((c) => c.figures.includes(figureId));
