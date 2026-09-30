export type ExamTag = "neet" | "aiims" | "jipmer" | "cpmt";

export type LayerId = "l0" | "l1" | "l2" | "l3" | "l4";

export const LAYER_LABELS: Record<LayerId, string> = {
  l0: "Skin",
  l1: "Flesh",
  l2: "Core",
  l3: "Seed",
  l4: "Root",
};

export const LAYER_HINTS: Record<LayerId, string> = {
  l0: "One everyday sentence",
  l1: "Classroom story and picture",
  l2: "NEET-ready facts",
  l3: "Traps, numbers, comparisons",
  l4: "Why it is true",
};

export type Term = {
  id: string;
  word: string;
  pronunciation: string;
  hover: string;
  etymology: string;
  layers: Partial<Record<LayerId, string>>;
  dontConfuse: string;
  examLine: string;
  related: string[];
  conceptId?: string;
};

export type FigureHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  note: string;
  conceptId?: string;
  termId?: string;
};

export type Figure = {
  id: string;
  title: string;
  alt: string;
  kind: "mitochondrion" | "mitosis" | "plant-cell" | "animal-cell" | "bacterium" | "meiosis" | "membrane";
  shows: string;
  not: string;
  citation: string;
  hotspots: FigureHotspot[];
};

export type Mcq = {
  id: string;
  stem: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
  conceptId: string;
  layer: LayerId;
  examTags: ExamTag[];
};

export type CompareTable = {
  title: string;
  headers: [string, string, string];
  rows: [string, string, string][];
};

export type Concept = {
  id: string;
  title: string;
  ncertPointer: string;
  examTags: ExamTag[];
  prerequisite: string[];
  seeAlso: string[];
  next?: string;
  figures: string[];
  layers: {
    l0: string;
    l1: string[];
    l2: string[];
    l3: string[];
    l4?: string[];
  };
  recall: [string, string, string];
  compare?: CompareTable;
};

export type StudyPath = {
  id: string;
  title: string;
  blurb: string;
  steps: string[];
};
