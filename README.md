# Onion Cytology

Cell biology for NEET / AIIMS / JIPMER / old UP CPMT, taught in peelable layers.
Next.js (App Router) + TypeScript, fully static.

```bash
npm run dev     # http://localhost:3000
npm run build   # also checks every link in the content graph
```

## The onion

Every concept has five layers, each a real section with its own anchor (`/study/mitochondria#l2`):

| Layer | Name  | What goes in it |
| ----- | ----- | --------------- |
| L0    | Skin  | One everyday sentence |
| L1    | Flesh | Class 9–11 story, analogy, the labelled figure |
| L2    | Core  | NEET-ready facts |
| L3    | Seed  | Traps, exceptions, numbers, comparisons |
| L4    | Root  | Why it is true (optional) |

Readers change depth with the bar, the “Peel” button, or `[` / `]`. `/` focuses search.

## Editing content (`content/`)

| File | Holds |
| ---- | ----- |
| `concepts/*.ts` | Concept nodes: layers, `recall`, `compare`, `prerequisite`, `seeAlso`, `next`, `figures`, `examTags` |
| `terms.ts` | Glossary: hover line, pronunciation, per-layer lines, “don’t confuse with”, exam line |
| `figures.ts` | Figure metadata and hotspot boxes (percentages of the drawing) |
| `questions.ts` | Original MCQs, each tagged to a concept **and** the layer it tests |
| `paths.ts` | Study paths (ordered concept ids) |
| `index.ts` | Shelves on the home page, search index, `assertContent()` link checker |

In any layer text, `[[termId]]` or `[[termId|shown words]]` becomes a hoverable word.
`npm run build` fails with a list if a term, concept, figure or path id does not exist.

Drawings are original SVG in `components/FigureArt.tsx`, 1000 units wide. Keep the visual language:
membrane = double line, DNA = dashed, plant-only parts = green tint. If you move a part, move its hotspot box in `figures.ts`.
To swap in a licensed micrograph later, keep the same hotspot JSON and replace the art.

## Honesty rules

Original teaching text, diagrams and questions only. NCERT is cited as a study pointer
(`ncertPointer`), never copied. The PDFs in `../NCERT` are author reference, not site pages.

## State

No accounts in v1. Depth preference, per-concept progress, the error log and weak words live in
`localStorage` (`lib/store.ts`) and survive only in that browser.
