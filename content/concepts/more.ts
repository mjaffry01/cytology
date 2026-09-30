import type { Concept } from "../schema";

export const moreConcepts: Concept[] = [
  {
    id: "biomolecules",
    title: "Chemicals of the cell",
    ncertPointer: "Class 11 Biology Ch 9 § 9.1–9.7",
    examTags: ["neet", "aiims", "jipmer"],
    prerequisite: ["protoplasm"],
    seeAlso: ["enzymes", "nucleus", "plasma-membrane"],
    next: "enzymes",
    figures: ["membrane-mosaic"],
    layers: {
      l0: "The cell is built from water, salts, and four big families of carbon compounds.",
      l1: [
        "Ash a tissue: you get elements. Extract with trichloroacetic acid: acid-soluble pool (monomers, intermediates) vs acid-insoluble pool (macromolecules).",
        "Carbohydrates, proteins, lipids, nucleic acids. Lipids often stay with the acid-insoluble fraction even though they are not always polymeric in the same way.",
      ],
      l2: [
        "Amino acids: amino + carboxyl; peptide bonds. Proteins: primary sequence → secondary (helix, sheet) → tertiary → quaternary (haemoglobin).",
        "Sugars: glycosidic bonds; starch and glycogen (storage), cellulose (wall), chitin (fungi, arthropods).",
        "Nucleic acids: phosphodiester backbone; DNA double helix; RNA usually single. Nitrogen bases A, T, G, C in DNA; U replaces T in RNA.",
        "Primary metabolites: amino acids, sugars — needed for life. Secondary: alkaloids, pigments, gums — ecological, often exam lists (rubber, morphine, codeine, vinblastine).",
      ],
      l3: [
        "Trap: all macromolecules are in the acid-soluble pool. Opposite. Trap: lipids are polymers of repeating monomers like protein.",
        "Zwitterion amino acids. Essential amino acids cannot be made by the human body.",
        "This chapter exists here only as cell chemistry. Full metabolism is later NEET units.",
      ],
      l4: [
        "Why extract with acid: it separates small metabolites from polymers so we can weigh what a cell is made of.",
      ],
    },
    recall: [
      "Name the bond in a protein backbone.",
      "Which base is unique to RNA?",
      "Cellulose is which type of molecule?",
    ],
  },
  {
    id: "enzymes",
    title: "Enzymes",
    ncertPointer: "Class 11 Biology Ch 9 § 9.8",
    examTags: ["neet", "aiims", "jipmer"],
    prerequisite: ["biomolecules"],
    seeAlso: ["lysosome", "mitochondria"],
    next: "cell-cycle",
    figures: [],
    layers: {
      l0: "Enzymes are protein catalysts that speed cell reactions without being used up.",
      l1: [
        "Each enzyme has an active site that fits a substrate — lock and key, or the better induced-fit handshake.",
        "Many enzymes need helpers: [[coenzyme]] (often vitamins), metal ions. Protein alone is [[apoenzyme]]; complete is [[holoenzyme]].",
      ],
      l2: [
        "Lower activation energy. Temperature and pH have optima; too much heat denatures. Substrate raises rate until Vmax.",
        "[[Km]] is [S] at half Vmax; low Km means high affinity.",
        "Classes: oxidoreductase, transferase, hydrolase, lyase, isomerase, ligase.",
        "Competitive inhibitor: like substrate, raises apparent Km. Non-competitive: binds elsewhere, lowers Vmax. Feedback inhibition is common in pathways.",
      ],
      l3: [
        "Trap: all enzymes are proteins (ribozymes are RNA — exception). Trap: enzymes change ΔG of the reaction (they change path, not equilibrium).",
        "Pepsin vs trypsin pH. Thermophilic enzymes in hot springs — Class 9 flavour.",
      ],
      l4: [
        "Why so fast: they bind the transition state better than the substrate, flattening the energy hill.",
      ],
    },
    recall: [
      "Apoenzyme plus cofactor equals what?",
      "Competitive inhibition does what to Km?",
      "Name one non-protein enzyme.",
    ],
  },
  {
    id: "cell-cycle",
    title: "Cell cycle",
    ncertPointer: "Class 11 Biology Ch 10 § 10.1",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["nucleus"],
    seeAlso: ["mitosis", "meiosis"],
    next: "mitosis",
    figures: ["mitosis-stages"],
    layers: {
      l0: "The cell cycle is the orderly life of a cell from one division to the next.",
      l1: [
        "Interphase is the long working day: G1 (grow), S (copy DNA, each chromosome gets two [[chromatid]] sisters), G2 (prepare machinery).",
        "M is the short public show: mitosis + [[cytokinesis]]. Some cells step into [[G0]] and rest.",
      ],
      l2: [
        "Duration varies: onion root tip meristem is a classic lab. Yeast can be ~90 minutes; liver cells rarely divide.",
        "DNA amount: G1 = 2C, after S = 4C, after mitosis of a diploid cell back to 2C.",
        "Checkpoints: G1/S (restriction), G2/M, metaphase (spindle). Cyclin–CDK language is extra depth.",
        "CPMT: duplication of DNA and transfer to daughter cells — that is S plus mitosis.",
      ],
      l3: [
        "Trap: interphase is a resting phase. It is metabolically busy. Trap: DNA doubles in G1.",
        "Quiescent vs senescent G0. Cancer: cycle controls fail.",
      ],
      l4: [
        "Why checkpoints: a cell with broken DNA must not split. The archive would be shredded.",
      ],
    },
    recall: [
      "DNA replicates in which phase?",
      "What is G0?",
      "After S, DNA content is?",
    ],
    compare: {
      title: "Phases",
      headers: ["Phase", "DNA", "Job"],
      rows: [
        ["G1", "2C", "Grow, organelles"],
        ["S", "2C → 4C", "Replicate DNA, centrioles"],
        ["G2", "4C", "Spindle proteins"],
        ["M", "4C → 2C", "Divide"],
      ],
    },
  },
  {
    id: "mitosis",
    title: "Mitosis",
    ncertPointer: "Class 11 Biology Ch 10 § 10.2–10.3",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["cell-cycle"],
    seeAlso: ["meiosis", "amitosis", "centriole"],
    next: "meiosis",
    figures: ["mitosis-stages"],
    layers: {
      l0: "Mitosis is equal nuclear division: two daughters, same chromosome number as mother.",
      l1: [
        "Watch the five panels. Prophase packs threads. Metaphase lines them on the equator. Anaphase pulls sisters. Telophase rebuilds nuclei. Then the kitchen splits.",
        "Animal cells pinch with a furrow. Plant cells build a [[cell-plate]] from the middle. Zoom each panel. The [[kinetochore]] is the handle on the [[centromere]].",
      ],
      l2: [
        "Karyokinesis stages: prophase (condense, nucleolus fades, envelope breaks, spindle), metaphase (equatorial plate, maximum condensation — best for karyotype), anaphase (sister chromatids to poles — now each is a chromosome), telophase (envelope, nucleolus, decondense).",
        "Plant mitosis: no centrioles in higher plants; anastral spindle; cell plate; no furrowing typically.",
        "Significance: growth, repair, asexual same-number copies, maintains 2n. Somatic mitosis in CPMT language.",
      ],
      l3: [
        "Trap: homologues pair in mitosis. They do not. Trap: anaphase splits homologues (that is anaphase I).",
        "Metaphase chromosome is 4C DNA if you count the whole cell still 4C until daughters separate.",
        "Free cell formation (CPMT): nuclei in a cytoplasm later walled — as in some gametangia / endosperm stories, not classical mitosis of meristem.",
      ],
      l4: [
        "Why equator: tension from both poles aligns kinetochores. The checkpoint waits for attachment. That is why colchicine-stuck cells sit in metaphase.",
      ],
    },
    recall: [
      "Best stage to study chromosome shape?",
      "Plant cytokinesis uses what?",
      "Does mitosis change ploidy?",
    ],
    compare: {
      title: "Plant vs animal mitosis",
      headers: ["Point", "Plant", "Animal"],
      rows: [
        ["Centrioles", "Usually absent", "Present"],
        ["Aster", "Anastral", "Amphiastral"],
        ["Cytokinesis", "Cell plate, centrifugal", "Furrow, centripetal"],
        ["Mid body", "Phragmoplast", "Contractile ring"],
      ],
    },
  },
  {
    id: "meiosis",
    title: "Meiosis",
    ncertPointer: "Class 11 Biology Ch 10 § 10.4–10.5",
    examTags: ["neet", "aiims", "jipmer", "cpmt"],
    prerequisite: ["mitosis", "cell-cycle"],
    seeAlso: ["cell-cycle", "nucleus"],
    next: "amitosis",
    figures: ["meiosis-overview"],
    layers: {
      l0: "Meiosis is reduction division: one diploid cell makes four haploid, genetically mixed cells.",
      l1: [
        "It is two divisions after one S phase. Meiosis I separates homologous partners. Meiosis II separates sisters, looking like mitosis.",
        "In prophase I, homologues zip ([[synapsis]]), become a [[bivalent]] / [[tetrad]], swap bits ([[crossing-over]]), and show an X ([[chiasma]]).",
      ],
      l2: [
        "Prophase I substages: leptotene, zygotene (synapsis, synaptonemal complex), pachytene (crossing over), diplotene (chiasmata visible; dictyotene in oocytes can last years), diakinesis (terminalisation, nucleolus gone).",
        "Metaphase I: bivalents on equator, homologous kinetochores opposite. Anaphase I: reduction. Telophase I may be brief.",
        "Interkinesis: no DNA replication. Then meiosis II.",
        "Significance: haploid gametes, variation (crossing over + independent assortment), restores 2n at fertilisation. CPMT: meiosis and life cycle.",
      ],
      l3: [
        "Trap: crossing over in zygotene (it is pachytene; synapsis is zygotene). Trap: anaphase I splits sisters.",
        "Diplotene in human females is famous for arrest. Number of bivalents = n.",
        "No pairing in mitosis — the clean distinguish.",
      ],
      l4: [
        "Why two divisions: DNA was copied once. To get 1C gametes you must split twice. Variation is a side effect of how homologues embrace.",
      ],
    },
    recall: [
      "Crossing over is in which substage?",
      "Is meiosis I reductional or equational?",
      "DNA replication between meiosis I and II?",
    ],
    compare: {
      title: "Mitosis vs meiosis",
      headers: ["Point", "Mitosis", "Meiosis"],
      rows: [
        ["Pairing", "No", "Yes (prophase I)"],
        ["Crossing over", "No (normally)", "Yes"],
        ["Divisions", "One", "Two"],
        ["Products", "Two, 2n", "Four, n"],
        ["Where", "Somatic", "Germ line / spores"],
      ],
    },
  },
  {
    id: "amitosis",
    title: "Amitosis and free cell formation",
    ncertPointer: "CPMT Botany § cell formation",
    examTags: ["cpmt", "neet"],
    prerequisite: ["mitosis"],
    seeAlso: ["mitosis", "meiosis", "cell-cycle"],
    next: "plant-tissues",
    figures: [],
    layers: {
      l0: "Amitosis is a direct pinch of the nucleus without a spindle show.",
      l1: [
        "The nucleus stretches and constricts. Chromosomes are not neatly displayed. Some protozoa and foetal membranes were classical examples.",
        "Free cell formation: nuclei divide inside a common cytoplasm; walls come later (as in some ascus / endosperm descriptions in older courses).",
      ],
      l2: [
        "Compared with mitosis: no prophase–metaphase sequence, no equatorial plate. Genetic equality is less guaranteed — that is why it is not the meristem method.",
        "NEET rarely centres amitosis; CPMT listed it beside somatic mitosis and meiosis.",
      ],
      l3: [
        "Trap: amitosis = meiosis. Trap: bacteria do mitosis (they use binary fission with a related but distinct protein ring, FtsZ — do not over-teach unless asked).",
      ],
      l4: [
        "Why meristems use mitosis: equal DNA for every daughter leaf cell. Amitosis is a shortcut, not a surveyor’s split.",
      ],
    },
    recall: [
      "Does amitosis show metaphase plates?",
      "Name one CPMT cell-formation type besides mitosis.",
      "Why is mitosis preferred in growth?",
    ],
  },
  {
    id: "plant-tissues",
    title: "Plant tissues and cell differentiation",
    ncertPointer: "CPMT Botany § cell differentiation; Class 11 Anatomy of Flowering Plants (link)",
    examTags: ["cpmt", "neet"],
    prerequisite: ["eukaryotic-cell", "cell-wall", "mitosis"],
    seeAlso: ["animal-tissues", "cell-wall"],
    next: "animal-tissues",
    figures: ["plant-cell-map"],
    layers: {
      l0: "Differentiation is how a meristem cell becomes a specialist: vessel, fibre, mesophyll.",
      l1: [
        "[[meristem]] keeps dividing. Permanent tissues stop or slow. Simple tissues: [[parenchyma]], [[collenchyma]], [[sclerenchyma]]. Complex: xylem and phloem — more than one cell type.",
        "Onion root tip is meristem. A pear’s grit is sclereids. A celery string is collenchyma.",
      ],
      l2: [
        "Meristems: apical (length), lateral (girth, cambium), intercalary (grass nodes).",
        "Parenchyma: living, thin walls, photosynthesis (chlorenchyma), storage, aerenchyma.",
        "Collenchyma: living, uneven cellulose, flexible support.",
        "Sclerenchyma: dead at maturity, lignin, fibres and sclereids.",
        "Xylem: tracheids, vessels, xylem parenchyma, xylem fibres. Phloem: sieve tubes, companion cells, phloem parenchyma, fibres.",
      ],
      l3: [
        "CPMT: classification of meristematic and permanent tissue; histology of root, stem, leaf; dicot vs monocot stem; secondary growth.",
        "Trap: collenchyma is dead. Trap: sieve tubes have a nucleus (companion cell is the nucleate partner).",
      ],
      l4: [
        "Differentiation is gene programs plus wall chemistry. A cell that lignifies cannot meristem again easily — fate is written in the wall.",
      ],
    },
    recall: [
      "Which simple tissue is dead and lignified?",
      "Intercalary meristem is typical of?",
      "Name two complex tissues.",
    ],
    compare: {
      title: "Simple plant tissues",
      headers: ["Tissue", "Wall", "Living?"],
      rows: [
        ["Parenchyma", "Thin cellulose", "Yes"],
        ["Collenchyma", "Uneven cellulose", "Yes"],
        ["Sclerenchyma", "Thick lignin", "No (usually)"],
      ],
    },
  },
  {
    id: "animal-tissues",
    title: "Animal tissues",
    ncertPointer: "CPMT Zoology § animal tissues; Class 11 Structural Organisation in Animals",
    examTags: ["cpmt", "neet"],
    prerequisite: ["eukaryotic-cell"],
    seeAlso: ["plant-tissues", "mitosis"],
    figures: ["animal-cell-map"],
    layers: {
      l0: "Animal bodies are four tissue families: epithelium, connective, muscle, nervous.",
      l1: [
        "Epithelium covers and lines. Connective binds and supports (bone, blood, cartilage, adipose). Muscle contracts. Nervous senses and commands.",
        "This is light histology for premed, not a pathology atlas. Zoom an animal cell, then imagine many of one type stacked as a tissue.",
      ],
      l2: [
        "Epithelium: squamous, cuboidal, columnar; simple vs compound; ciliated, glandular. Junctions: tight, gap, desmosome (names for later).",
        "Connective: cells in matrix. Areolar, adipose, dense, cartilage, bone, blood. Blood is connective with fluid matrix.",
        "Muscle: striated skeletal, cardiac (intercalated discs), smooth.",
        "Neuron: cell body, dendrites, axon. Neuroglia support.",
      ],
      l3: [
        "Trap: blood is epithelial. Trap: cardiac muscle is smooth. Trap: xylem is an animal tissue.",
        "CPMT type study later uses these tissues in frog and rabbit.",
      ],
      l4: [
        "Structure–function: squamous is thin for diffusion (alveolus). Stratified squamous is armour (skin). The onion rule again: peel the job, then the shape.",
      ],
    },
    recall: [
      "Name the four animal tissue types.",
      "Blood is which tissue class?",
      "Intercalated discs belong to which muscle?",
    ],
    compare: {
      title: "Muscle types",
      headers: ["Point", "Skeletal", "Smooth"],
      rows: [
        ["Stripes", "Yes", "No"],
        ["Control", "Voluntary", "Involuntary"],
        ["Cell", "Long fibres, many nuclei", "Spindle, one nucleus"],
      ],
    },
  },
];
