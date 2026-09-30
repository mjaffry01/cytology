import type { StudyPath } from "./schema";

export const paths: StudyPath[] = [
  {
    id: "class9-to-neet",
    title: "Class 9 skin → Ch 8 → Ch 10",
    blurb: "Start from the everyday picture of a cell and end ready for NEET cell-division questions.",
    steps: [
      "cell-theory",
      "prokaryotic-cell",
      "eukaryotic-cell",
      "plasma-membrane",
      "nucleus",
      "mitochondria",
      "cell-cycle",
      "mitosis",
      "meiosis",
    ],
  },
  {
    id: "organelle-tour",
    title: "Organelle tour (Ch 8)",
    blurb: "The whole endomembrane pipeline, then the power plants, the archive and the skeleton.",
    steps: [
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
    id: "division",
    title: "Cell division (Ch 10)",
    blurb: "Cycle, mitosis, meiosis, and the plant-versus-animal differences examiners love.",
    steps: ["cell-cycle", "mitosis", "meiosis", "amitosis"],
  },
  {
    id: "cpmt-extras",
    title: "CPMT extras",
    blurb: "The old UP CPMT headings that NCERT covers only in passing: protoplasm, microsomes, amitosis, tissues.",
    steps: ["protoplasm", "endoplasmic-reticulum", "centriole", "amitosis", "plant-tissues", "animal-tissues"],
  },
];
