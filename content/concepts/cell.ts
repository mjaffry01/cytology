import type { Concept } from "../schema";

export const cellConcepts: Concept[] = [
  {
    id: "cell-theory",
    title: "The cell as a unit of life",
    ncertPointer: "Class 11 Biology Ch 8 § 8.1–8.3; Class 9 Cell: The Building Block of Life",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: [],
    seeAlso: ["prokaryotic-cell", "eukaryotic-cell", "protoplasm"],
    next: "prokaryotic-cell",
    figures: ["plant-cell-map", "animal-cell-map"],
    layers: {
      l0: "Every living body is built from cells, and new cells come only from old cells.",
      l1: [
        "Think of an onion: you peel layers, but the living unit you finally meet is a box of protoplasm. Hooke saw empty cork boxes. Later workers saw that living boxes are full.",
        "Schleiden (plants) and Schwann (animals) said the body is a society of cells. Virchow added omnis cellula e cellula — every cell from a cell. That is the classical cell theory.",
      ],
      l2: [
        "Three classical points: (1) all organisms are made of cells and their products; (2) the cell is the structural and functional unit; (3) cells arise from pre-existing cells.",
        "Modern add-ons: DNA is the genetic material passed at division; metabolism is cellular; viruses are acellular and sit outside cell theory.",
        "A unicellular organism (Amoeba, yeast) is still a full organism. A multicellular body specialises cells but does not give up the cell as the unit.",
      ],
      l3: [
        "Trap: ‘virus has a cell’. It does not. Trap: ‘first cell from a cell’ — origin of life is a separate story (Oparin, Miller) from cell theory.",
        "Sizes: Mycoplasma (PPLO) among the smallest cells; ostrich egg among the largest eggs; nerve cells among the longest animal cells.",
        "CPMT wording: cell as unit of structure and function; fine structure under the electron microscope.",
      ],
      l4: [
        "Why theory holds: freeze a tissue, grind it, you lose organised life. Cell-free systems can run some reactions, but growth and heredity need a bounded cell.",
        "Electron microscopes (TEM/SEM) opened organelles. That is why CPMT asked ‘fine structure as seen in EM’.",
      ],
    },
    recall: [
      "Who added ‘cells from cells’?",
      "Name one acellular particle that is living only inside a host.",
      "Is an ostrich egg one cell?",
    ],
    compare: {
      title: "Unicellular vs multicellular",
      headers: ["Point", "Unicellular", "Multicellular"],
      rows: [
        ["Division of labour", "Organelles only", "Cells, tissues, organs"],
        ["If one cell dies", "The organism dies", "Others may cover"],
        ["Example", "Chlamydomonas, Paramecium", "Onion, human"],
      ],
    },
  },
  {
    id: "prokaryotic-cell",
    title: "Prokaryotic cell",
    ncertPointer: "Class 11 Biology Ch 8 § 8.4",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["cell-theory"],
    seeAlso: ["eukaryotic-cell", "plasma-membrane", "mitochondria"],
    next: "eukaryotic-cell",
    figures: ["bacterium-map"],
    layers: {
      l0: "A prokaryote is a cell without a true nucleus and without membrane-bound organelles.",
      l1: [
        "Bacteria and cyanobacteria are the factory sheds of this type. DNA sits in a [[nucleoid]]. Ribosomes float in the cytoplasm. There is no ER, no Golgi, no mitochondrion.",
        "The envelope is often three-layered: glycocalyx, cell wall of [[peptidoglycan]], and plasma membrane. A [[mesosome]] is an infold of that membrane in textbook diagrams.",
      ],
      l2: [
        "Ribosomes are [[70s|70S]] (50S + 30S). They may form polysomes (polyribosomes).",
        "Inclusion bodies (phosphate, glycogen, cyanophycean starch, gas vacuoles) are not membrane-bound.",
        "[[plasmid]] DNA is extra-chromosomal. Flagella, pili, fimbriae are surface structures. Bacterial flagellin is not the eukaryotic 9+2 axoneme.",
        "Cell envelope modifications: slime (loose) vs capsule (thick). Gram stain depends on wall architecture.",
      ],
      l3: [
        "Trap: ‘bacteria have mitochondria’. Respiration is membrane-bound; mesosomes are the old textbook stand-in.",
        "Trap: ‘nucleoid has a nuclear membrane’. It does not. Histones as in eukaryotes are absent.",
        "Mycoplasma: no wall. Cyanobacteria: chlorophyll in thylakoid membranes, not in chloroplasts.",
        "CPMT: systematic bacteria — nutrition, reproduction, economic importance — sits next to this cell chapter.",
      ],
      l4: [
        "Why no mitochondria: the plasma membrane already does electron transport. Endosymbiosis later packed that job into organelles in eukaryotes.",
        "Why plasmids matter in exams: they explain conjugation and cloning vectors.",
      ],
    },
    recall: [
      "70S is made of which subunits?",
      "Name the DNA region without an envelope.",
      "What is a plasmid?",
    ],
    compare: {
      title: "Envelope layers",
      headers: ["Layer", "Chemistry (typical)", "Job"],
      rows: [
        ["Glycocalyx", "Polysaccharide", "Stick, protect, slime or capsule"],
        ["Wall", "Peptidoglycan", "Shape and osmotic armour"],
        ["Membrane", "Phospholipid + protein", "Respiration, transport"],
      ],
    },
  },
  {
    id: "eukaryotic-cell",
    title: "Eukaryotic cell",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["cell-theory", "prokaryotic-cell"],
    seeAlso: ["plasma-membrane", "nucleus", "mitochondria", "plastids"],
    next: "plasma-membrane",
    figures: ["plant-cell-map", "animal-cell-map"],
    layers: {
      l0: "A eukaryote keeps DNA in a nucleus and runs many jobs in membrane organelles.",
      l1: [
        "Plant and animal cells are two kitchens with a shared plan: nucleus, mitochondria, ER, Golgi, cytoskeleton. The plant kitchen adds a wall, plastids, and a big vacuole. The animal kitchen adds centrioles and lysosomes as a typical set.",
        "Zoom the maps. Each labelled patch is a concept you can peel.",
      ],
      l2: [
        "Compartments: endomembrane system (ER, Golgi, lysosome, vacuole) vs semi-autonomous organelles (mitochondria, plastids) vs cytoskeleton and ribosomes.",
        "80S ribosomes in cytosol and on RER; 70S in mitochondria and chloroplasts.",
        "Plant cells usually lack centrioles; animal cells lack a cellulose wall and chloroplasts.",
      ],
      l3: [
        "Trap: ‘plant cells have no mitochondria’. They do. Trap: ‘all plant cells are green’. Root cells are not.",
        "Fungal cells: chitin wall, no plastids. Protists mix features.",
        "CPMT: difference in cell division between plant and animal is mainly cytokinesis and the spindle’s centriole story.",
      ],
      l4: [
        "Compartments let opposing reactions run at once (synthesis vs digestion). That is the eukaryotic trick.",
      ],
    },
    recall: [
      "Name two organelles with their own DNA.",
      "Which typical animal organelle is missing in higher plants?",
      "Where do 80S ribosomes sit?",
    ],
    compare: {
      title: "Plant vs animal cell",
      headers: ["Feature", "Plant", "Animal"],
      rows: [
        ["Wall", "Cellulose present", "Absent"],
        ["Plastids", "Present", "Absent"],
        ["Vacuole", "Large central", "Small, many"],
        ["Centriole", "Usually absent in higher plants", "Present"],
        ["Lysosomes", "Rare / disputed as typical", "Typical"],
      ],
    },
  },
  {
    id: "protoplasm",
    title: "Protoplasm and inclusions",
    ncertPointer: "CPMT Botany § protoplasm; NCERT Ch 8 cytoplasm discussion",
    examTags: ["cpmt", "neet"],
    prerequisite: ["cell-theory"],
    seeAlso: ["eukaryotic-cell", "vacuole", "plastids"],
    next: "plasma-membrane",
    figures: ["plant-cell-map"],
    layers: {
      l0: "Protoplasm is the living stuff of the cell; inclusions are the pantry, not the cook.",
      l1: [
        "[[protoplasm]] = [[cytoplasm]] + nucleus. The wall is outside it. Huxley’s old line called protoplasm the physical basis of life: a complex colloid of water, salts, sugars, proteins, lipids, nucleic acids.",
        "Non-protoplasmic [[ergastic|ergastic]] bodies: starch grains, aleurone, oil drops, crystals (raphides, cystoliths). They are products, not organelles.",
      ],
      l2: [
        "Physical properties historically listed: protoplasm as a polyphasic colloid, sol–gel, Brownian motion, elasticity, streaming (cyclosis).",
        "Cytoplasm = cytosol + organelles except the nucleus. Nucleoplasm is nuclear.",
        "Vacuolar sap is often treated as non-living stored solution, bound by living tonoplast.",
      ],
      l3: [
        "CPMT loves: constituents, physical and chemical properties, significance of inclusions (storage, waste, defence — calcium oxalate crystals).",
        "Trap: calling a starch grain an organelle. Trap: saying cell wall is protoplasm.",
        "Microsomes in old lists are homogenate fragments of ER, not living inclusions.",
      ],
      l4: [
        "Why the word faded: modern cell biology names compartments. Exams still use protoplasm, so keep both languages.",
      ],
    },
    recall: [
      "Does protoplasm include the cell wall?",
      "Give one ergastic inclusion.",
      "Cytoplasm includes the nucleus — true or false?",
    ],
    compare: {
      title: "Living vs stored",
      headers: ["Item", "Living?", "Note"],
      rows: [
        ["Mitochondrion", "Yes", "Organelle"],
        ["Starch grain", "No", "Ergastic"],
        ["Crystal of calcium oxalate", "No", "Waste / defence"],
        ["Nucleus", "Yes", "Part of protoplasm"],
      ],
    },
  },
];
