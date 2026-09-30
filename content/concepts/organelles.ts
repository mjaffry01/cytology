import type { Concept } from "../schema";

export const organelleConcepts: Concept[] = [
  {
    id: "plasma-membrane",
    title: "Plasma membrane",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.1",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["cell-wall", "endoplasmic-reticulum"],
    next: "cell-wall",
    figures: ["membrane-mosaic"],
    layers: {
      l0: "The plasma membrane is a living, moving skin that chooses what enters the cell.",
      l1: [
        "Imagine a soap film full of floating boats. The film is phospholipid. The boats are proteins. That is the [[fluid-mosaic]] model.",
        "Phospholipids are [[amphipathic]]: wet heads outward, oily tails inward. Zoom the picture to sit on a head, a tail, or a protein.",
      ],
      l2: [
        "Singer and Nicolson (1972). Quasi-fluid: lipids flip rarely, but they diffuse laterally. Fluidity needs unsaturated tails and, in animals, cholesterol.",
        "Integral proteins span the bilayer; peripheral proteins sit on the surface. Outer face often has oligosaccharides (glycocalyx) — cell identity.",
        "Transport: passive (simple, facilitated) and active (pumps, ATP). Bulk: endocytosis, exocytosis, phagocytosis, pinocytosis.",
        "Selective permeability is the exam phrase. Water may use aquaporins.",
      ],
      l3: [
        "Trap: ‘unit membrane’ of Robertson is three dark–light–dark lines in EM, not the sandwich chemical model of Davson–Danielli.",
        "Plant cells have a membrane under the wall. Plasmolysis proves the living membrane.",
        "CPMT: plasma membrane and cell wall listed together with DNA/RNA in the cell chapter.",
      ],
      l4: [
        "Why a bilayer: amphipathic lipids in water self-assemble. That is chemistry doing the architecture.",
      ],
    },
    recall: [
      "Who proposed the fluid mosaic model?",
      "Name one bulk-transport process.",
      "Which part of a phospholipid hates water?",
    ],
  },
  {
    id: "cell-wall",
    title: "Cell wall",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.2",
    examTags: ["neet", "aiims", "cpmt"],
    prerequisite: ["plasma-membrane"],
    seeAlso: ["plant-tissues", "eukaryotic-cell"],
    next: "endoplasmic-reticulum",
    figures: ["plant-cell-map"],
    layers: {
      l0: "The cell wall is a non-living box around a plant, fungal, or bacterial cell.",
      l1: [
        "In onion peel you see the box first. The living membrane is tucked inside. Between two boxes sits the [[middle-lamella]] of calcium pectate.",
        "[[plasmodesmata]] are cytoplasmic threads through pits — neighbours share a kitchen corridor.",
      ],
      l2: [
        "Layers: middle lamella, primary wall (cellulose, growing cell), secondary wall (more cellulose, often lignin, after growth).",
        "Algae may add galactans, mannans, calcium carbonate. Fungi: chitin. Bacteria: [[peptidoglycan]].",
        "Functions: shape, protection, prevent bursting, plasmodesmata transport.",
      ],
      l3: [
        "Trap: wall is living. It is extra-living / non-living product. Trap: animals have a cellulose wall.",
        "Lignin = wood hardness. Suberin = cork waterproofing. Cutin = leaf skin.",
      ],
      l4: [
        "Primary wall can stretch; secondary cannot. That is why meristem walls stay primary.",
      ],
    },
    recall: [
      "What cements two plant cells?",
      "Name the channels between plant cells.",
      "Fungal walls are mainly what polymer?",
    ],
  },
  {
    id: "endoplasmic-reticulum",
    title: "Endoplasmic reticulum",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.3.1",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["golgi-apparatus", "nucleus"],
    next: "golgi-apparatus",
    figures: ["animal-cell-map"],
    layers: {
      l0: "The ER is a lace of membrane tanks and tubes inside the cytoplasm.",
      l1: [
        "RER wears [[80s|80S]] ribosomes and makes proteins for export or membranes. SER is smooth: lipids, detox, calcium in muscle (sarcoplasmic reticulum).",
        "[[cisternae]] are the flat tanks. In a blender, ER breaks into [[microsome]] vesicles — a CPMT word that is a lab fragment, not a living organelle.",
      ],
      l2: [
        "ER is continuous with the nuclear envelope’s outer membrane. It is the start of the endomembrane pipeline to Golgi.",
        "RER: secretory proteins, lysosomal hydrolases, membrane proteins. SER: steroid synthesis (testes, adrenal), drug detox (liver).",
      ],
      l3: [
        "Trap: ribosomes on SER. Trap: microsomes in living onion cells as named organelles.",
        "Muscle SER stores Ca2+ for contraction — favourite AIIMS-style link.",
      ],
      l4: [
        "Pulse-chase of secretory proteins (Palade) mapped RER → Golgi → vesicle. That is why we teach a pipeline.",
      ],
    },
    recall: [
      "Which ER makes steroid hormones?",
      "What is a microsome?",
      "ER joins which nuclear membrane?",
    ],
    compare: {
      title: "RER vs SER",
      headers: ["Point", "RER", "SER"],
      rows: [
        ["Ribosomes", "Present", "Absent"],
        ["Main product", "Proteins", "Lipids"],
        ["Look", "Cisternae", "Tubules often"],
      ],
    },
  },
  {
    id: "golgi-apparatus",
    title: "Golgi apparatus",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.3.2",
    examTags: ["neet", "aiims", "cpmt"],
    prerequisite: ["endoplasmic-reticulum"],
    seeAlso: ["lysosome", "cell-wall"],
    next: "lysosome",
    figures: ["animal-cell-map"],
    layers: {
      l0: "Golgi is the packing house that labels and ships vesicles.",
      l1: [
        "Camillo Golgi saw a net that silver stained. Today we see stacked [[cisternae]]. In plants each stack is a [[dictyosome]].",
        "Cis face receives from ER. Trans face sends vesicles out. Sugar tags are added (glycosylation).",
      ],
      l2: [
        "Jobs: packing, glycosylation, making lysosomes, forming cell plate vesicles in plants, secretion (zymogen granules).",
        "Cisternae are not ribosome-studded. Polarity cis → trans is an exam favourite.",
      ],
      l3: [
        "Trap: Golgi makes ATP. Trap: dictyosome is a different organelle from Golgi.",
        "Goblet cells and pancreatic acini are Golgi-rich — secretion.",
      ],
      l4: [
        "Why stacks: sequential enzymes sit in successive cisternae, like a factory line.",
      ],
    },
    recall: [
      "Cis face faces which organelle?",
      "What is a dictyosome?",
      "Name one plant job of Golgi.",
    ],
  },
  {
    id: "lysosome",
    title: "Lysosome",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.3.3",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["golgi-apparatus"],
    seeAlso: ["vacuole", "eukaryotic-cell"],
    next: "vacuole",
    figures: ["animal-cell-map"],
    layers: {
      l0: "Lysosomes are membrane bags of digestive enzymes.",
      l1: [
        "They bud from the trans-Golgi. Hydrolases work at acid pH. The bag protects the rest of the cytoplasm.",
        "They digest food (heterophagy) or worn organelles (autophagy). Old notes called them suicide bags if the bag bursts in injury.",
      ],
      l2: [
        "Primary lysosome: unused enzymes. Secondary: fused with phagosome. Residual body: leftover.",
        "Single membrane. Acid phosphatase is a marker.",
      ],
      l3: [
        "Trap: lysosomes have double membranes. Trap: they are typical and obvious in all plant cells (more typical in animals).",
        "Tay–Sachs is a lysosomal storage disease — extra for AIIMS-style reading, not always NEET.",
      ],
      l4: [
        "Why acid inside: proton pumps. If leaked, cytosol pH is unfriendly to the hydrolases — a safety design.",
      ],
    },
    recall: [
      "Where are lysosomal enzymes packed?",
      "Autophagy means what?",
      "Single or double membrane?",
    ],
  },
  {
    id: "vacuole",
    title: "Vacuole",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.3.4",
    examTags: ["neet", "cpmt"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["lysosome", "cell-wall", "protoplasm"],
    next: "mitochondria",
    figures: ["plant-cell-map"],
    layers: {
      l0: "A vacuole is a sap-filled bag, huge in most mature plant cells.",
      l1: [
        "The membrane is the [[tonoplast]]. Sap holds water, salts, sugars, pigments, crystals. Turgor presses the protoplasm against the wall — that is how a leaf stands.",
        "Protists have contractile vacuoles (osmoregulation) and food vacuoles.",
      ],
      l2: [
        "Plant central vacuole can be 90% of volume. It is part of the endomembrane system.",
        "Stores waste that could poison the cytosol. Anthocyanin colours many petals and beet.",
      ],
      l3: [
        "Trap: vacuole has a double membrane. Trap: animal cells never have vacuoles (they have small ones).",
        "CPMT inclusions often sit in vacuoles.",
      ],
      l4: [
        "Tonoplast pumps create a steep ion gradient. Water follows. Turgor is osmotic work.",
      ],
    },
    recall: [
      "Name the vacuolar membrane.",
      "Contractile vacuoles are common in which group?",
      "Turgor needs which two structures?",
    ],
  },
  {
    id: "mitochondria",
    title: "Mitochondria",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.4",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["eukaryotic-cell", "plasma-membrane"],
    seeAlso: ["plastids", "enzymes", "prokaryotic-cell"],
    next: "plastids",
    figures: ["mitochondrion-cutaway"],
    layers: {
      l0: "Mitochondria are the cell’s power plants.",
      l1: [
        "Peel this idea like an onion. Skin: they burn food energy into ATP. Flesh: each mitochondrion is a sausage with two membranes. The inner one is crumpled into [[cristae]] so more machines fit.",
        "The inner juice is the [[matrix]]. Zoom the cutaway: outer membrane, inner membrane, cristae, DNA, [[oxysome]] lollipops.",
      ],
      l2: [
        "Double membrane. Outer has porins. Inner is rich in cardiolipin, impermeable to most ions, folded as cristae.",
        "ETC and oxidative phosphorylation on the inner membrane. Krebs (TCA) cycle in the matrix. Link reaction (pyruvate → acetyl-CoA) in the matrix.",
        "Own circular DNA and [[70s|70S]] ribosomes: [[semi-autonomous]]. Divide by fission. Number is high in muscle and sperm mid-piece.",
        "Shape sausage to spherical; 0.2–1.0 µm wide in typical textbook range.",
      ],
      l3: [
        "Trap: Krebs on cristae. Trap: glycolysis in mitochondria (it is cytosolic). Trap: mitochondria in prokaryotes.",
        "Plant cells have mitochondria too — nights and roots need them.",
        "mtDNA is maternal in humans — extra line, not always NEET.",
        "CPMT: mitochondria in the EM list; also cellular respiration ‘role of mitochondria, ATP and ADP’ in zoology physiology.",
      ],
      l4: [
        "[[endosymbiont|Endosymbiont theory]]: an aerobic bacterium was engulfed. Evidence: double membrane, circular DNA, 70S, fission, bacterial-like inner membrane chemistry.",
        "Why folds: ATP synthase needs a proton gradient across a large area. Cristae are area.",
      ],
    },
    recall: [
      "Where does the Krebs cycle run?",
      "What are oxysomes?",
      "Name one evidence of endosymbiosis.",
    ],
    compare: {
      title: "Mitochondrion vs chloroplast",
      headers: ["Point", "Mitochondrion", "Chloroplast"],
      rows: [
        ["Energy job", "Oxidise food → ATP", "Light → sugar + ATP/NADPH"],
        ["Inner folds", "Cristae", "Thylakoids / grana"],
        ["Fluid", "Matrix", "Stroma"],
        ["Pigment", "None (cytochromes not green)", "Chlorophyll"],
        ["In animal cells", "Yes", "No"],
      ],
    },
  },
  {
    id: "plastids",
    title: "Plastids",
    ncertPointer: "Class 11 Biology Ch 8 § 8.5.5",
    examTags: ["neet", "aiims", "cpmt"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["mitochondria", "vacuole"],
    next: "nucleus",
    figures: ["plant-cell-map"],
    layers: {
      l0: "Plastids are plant organelles for colour, starch, or photosynthesis.",
      l1: [
        "Chloroplasts are green kitchens. Chromoplasts hold carotenoid colours of ripe tomato. Leucoplasts are colourless stores (amyloplast starch, elaioplast oil, aleuroplast protein).",
        "A chloroplast has [[stroma]], [[thylakoid]] sacs, and [[grana]] stacks. Zoom a chloroplast in the plant map, then peel mitochondria to compare.",
      ],
      l2: [
        "Chloroplast: double membrane, no cristae. Thylakoid lumen is a third compartment. Light reaction on thylakoid; Calvin cycle in stroma.",
        "Own circular DNA, 70S ribosomes, semi-autonomous. Interconvertible plastids (green to chromoplast in ripening).",
        "Chlorophyll a, b, carotenoids in thylakoid membrane.",
      ],
      l3: [
        "Trap: ‘grana = cristae’. Trap: dark reaction needs darkness (it needs ATP/NADPH, can run in light).",
        "C3 vs C4 chloroplast dimorphism (bundle sheath) is Class 11 photosynthesis, but plastid structure is the hook.",
      ],
      l4: [
        "Endosymbiosis from a cyanobacterium. Two membranes of primary chloroplasts match that story.",
      ],
    },
    recall: [
      "Name three plastid types.",
      "Where is the Calvin cycle?",
      "What is an amyloplast?",
    ],
  },
  {
    id: "nucleus",
    title: "Nucleus",
    ncertPointer: "Class 11 Biology Ch 8 § nucleus",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["cell-cycle", "mitosis", "endoplasmic-reticulum"],
    next: "cytoskeleton",
    figures: ["animal-cell-map"],
    layers: {
      l0: "The nucleus is the cell’s archive and control room.",
      l1: [
        "A double envelope with pores. Inside: [[nucleoplasm]], [[chromatin]], one or more [[nucleolus]] knots. DNA is wound on [[histone]] spools as [[nucleosome]] beads.",
        "No nucleus in mature mammalian RBC and sieve-tube elements — exam exceptions.",
      ],
      l2: [
        "Nuclear lamina of intermediate filaments. Pores: traffic of RNA out, proteins in.",
        "Euchromatin loosely packed (active); heterochromatin condensed.",
        "Nucleolus: rRNA synthesis, ribosomal subunit assembly. It vanishes in late prophase and returns in telophase.",
        "Some protists: macronucleus and micronucleus. Multinucleate: coenocyte, syncytium.",
      ],
      l3: [
        "Trap: nucleolus has a membrane. Trap: prokaryotes have a nucleus. Trap: nucleosome = nucleolus.",
        "CPMT: nucleus and nuclear membrane; DNA and RNA.",
      ],
      l4: [
        "Pores are not holes in a wall only: the nuclear pore complex is a selective gate. That is how the archive stays distinct from the kitchen.",
      ],
    },
    recall: [
      "Nucleosome is DNA plus what?",
      "Give one anucleate cell.",
      "When does the nucleolus disappear?",
    ],
  },
  {
    id: "cytoskeleton",
    title: "Cytoskeleton, cilia and flagella",
    ncertPointer: "Class 11 Biology Ch 8 cytoskeleton and cilia",
    examTags: ["neet", "aiims"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["centriole", "mitosis"],
    next: "centriole",
    figures: ["animal-cell-map"],
    layers: {
      l0: "The cytoskeleton is the cell’s poles, ropes, and rails.",
      l1: [
        "Microtubules (tubulin) are hollow rails. Microfilaments (actin) are thin ropes. Intermediate filaments are the sturdy cables (keratin in skin).",
        "Cilia and flagella of eukaryotes share a [[9-plus-2|9 + 2]] axoneme. They beat with dynein arms using ATP.",
      ],
      l2: [
        "Microtubules: spindle, centrioles, cilia, tracks for kinesin/dynein. Microfilaments: cleavage furrow, microvilli, amoeboid movement. Intermediate filaments: mechanical strength.",
        "Bacterial flagellum is a rotary flagellin filament — not 9+2.",
      ],
      l3: [
        "Trap: plant cells have no cytoskeleton. They do. Trap: sperm tail is bacterial flagellum.",
        "Colchicine blocks microtubules — spindle poison, used in polyploidy experiments.",
      ],
      l4: [
        "Dynamic instability of microtubules lets the spindle search for kinetochores. Structure is function in time, not only in space.",
      ],
    },
    recall: [
      "9+2 is found in which organelles?",
      "Actin makes which filament?",
      "Colchicine hits which polymer?",
    ],
  },
  {
    id: "centriole",
    title: "Centrosome and centriole",
    ncertPointer: "Class 11 Biology Ch 8 centrosome",
    examTags: ["neet", "aiims", "cpmt"],
    prerequisite: ["cytoskeleton"],
    seeAlso: ["mitosis", "eukaryotic-cell"],
    next: "biomolecules",
    figures: ["animal-cell-map"],
    layers: {
      l0: "A centriole is a cartwheel of microtubules that helps build the spindle and the base of a cilium.",
      l1: [
        "Two centrioles sit at right angles in the centrosome of an animal cell. Each is [[9-plus-0|9 + 0]]: nine triplets, no central pair, a hub and spokes — the cartwheel.",
        "Higher plants manage mitosis without centrioles. Basal bodies of cilia are centriole-like.",
      ],
      l2: [
        "Centrosome is the main microtubule organising centre (MTOC) in animal cells. It duplicates in S phase and the pair splits in prophase.",
        "CPMT listed centrosome with mitochondria, plastids, ER, ribosome, nucleus.",
      ],
      l3: [
        "Trap: centriole = centromere. Trap: plants cannot divide without centrioles.",
        "9+0 vs 9+2 is a high-yield distinguish question.",
      ],
      l4: [
        "Why right angles: the daughter centriole grows perpendicular — a geometric rule of duplication.",
      ],
    },
    recall: [
      "Centriole axoneme formula?",
      "Do onion root tips have centrioles?",
      "Centrosome duplicates in which phase?",
    ],
    compare: {
      title: "Lookalikes",
      headers: ["Word", "What it is", "Where"],
      rows: [
        ["Centriole", "9+0 organelle", "Centrosome / basal body"],
        ["Centrosome", "Pair of centrioles + matrix", "Animal MTOC"],
        ["Centromere", "DNA constriction", "Chromosome"],
        ["Chiasma", "X of crossing over", "Prophase I"],
      ],
    },
  },
];
