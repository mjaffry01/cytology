import type { ExamTag, LayerId, Mcq } from "./schema";

// Original items written for this site. Each one tests one layer of one concept.
// Format: [conceptId, layer, stem, [a, b, c, d], answerIndex, explanation, tags?]
type Row = [
  string,
  LayerId,
  string,
  [string, string, string, string],
  0 | 1 | 2 | 3,
  string,
  ExamTag[]?,
];

const rows: Row[] = [
  // cell-theory
  ["cell-theory", "l1", "Who added the idea that every cell comes from a pre-existing cell?",
    ["Matthias Schleiden", "Theodor Schwann", "Rudolf Virchow", "Robert Hooke"], 2,
    "Schleiden and Schwann gave the body-is-made-of-cells idea. Virchow added omnis cellula e cellula. Hooke only named the empty cork boxes."],
  ["cell-theory", "l2", "Which of these sits outside cell theory because it is acellular?",
    ["Mycoplasma", "Yeast", "Tobacco mosaic virus", "Amoeba"], 2,
    "A virus has no cell of its own. Mycoplasma is a tiny but complete cell.", ["neet", "aiims", "cpmt"]],

  // prokaryotic-cell
  ["prokaryotic-cell", "l2", "A 70S ribosome is built from which two subunits?",
    ["60S + 40S", "50S + 30S", "50S + 20S", "40S + 30S"], 1,
    "70S = 50S + 30S. Svedberg units do not add up simply; that is why 50 + 30 still reads as 70.", ["neet", "aiims", "jipmer", "cpmt"]],
  ["prokaryotic-cell", "l3", "Which structure is NOT found in a typical bacterial cell?",
    ["Plasmid", "Nucleoid", "Mitochondrion", "Mesosome"], 2,
    "Prokaryotes have no membrane-bound organelles. The plasma membrane itself does the respiratory work."],
  ["prokaryotic-cell", "l2", "Inclusion bodies of prokaryotes (glycogen, phosphate granules, gas vacuoles) are:",
    ["Bound by a single membrane", "Bound by a double membrane", "Not bound by any membrane", "Made only of protein"], 2,
    "They lie free in the cytoplasm. No membrane system surrounds them."],

  // eukaryotic-cell
  ["eukaryotic-cell", "l2", "Which pair of organelles has its own DNA and 70S ribosomes?",
    ["Golgi and ER", "Mitochondria and chloroplasts", "Lysosome and vacuole", "Nucleolus and centriole"], 1,
    "These two are semi-autonomous. The rest of the cell uses 80S ribosomes in the cytosol and on RER."],
  ["eukaryotic-cell", "l3", "A cell has a cellulose wall, a large central vacuole, chloroplasts and no centrioles. It is most likely:",
    ["A human liver cell", "A leaf mesophyll cell of a flowering plant", "A bacterium", "A fungal hypha"], 1,
    "Cellulose wall + plastids + big vacuole + no centriole = higher plant. Fungi have chitin walls and no plastids."],

  // protoplasm
  ["protoplasm", "l1", "Which one is an ergastic (non-living) inclusion?",
    ["Mitochondrion", "Starch grain", "Nucleolus", "Ribosome"], 1,
    "A starch grain is a stored product — the pantry, not the cook. The others are living parts.", ["cpmt", "neet"]],
  ["protoplasm", "l1", "Protoplasm is made of:",
    ["Cell wall and cytoplasm", "Cytoplasm and nucleus", "Cytosol only", "Vacuolar sap and cell wall"], 1,
    "Protoplasm = cytoplasm + nucleus. The wall lies outside it.", ["cpmt"]],

  // plasma-membrane
  ["plasma-membrane", "l2", "The fluid mosaic model of the plasma membrane was proposed by:",
    ["Robertson", "Davson and Danielli", "Singer and Nicolson", "Schleiden and Schwann"], 2,
    "Singer and Nicolson, 1972. Davson–Danielli gave the older sandwich model; Robertson the unit membrane."],
  ["plasma-membrane", "l1", "In a phospholipid bilayer, the part that avoids water is the:",
    ["Phosphate head", "Fatty-acid tails", "Glycocalyx", "Integral protein"], 1,
    "Tails are hydrophobic and hide in the middle. Heads face the water on both sides."],
  ["plasma-membrane", "l2", "Water moving through aquaporins from high to low water concentration is:",
    ["Active transport", "Facilitated diffusion", "Pinocytosis", "Exocytosis"], 1,
    "It uses a protein channel but no ATP. That is passive, facilitated movement."],

  // cell-wall
  ["cell-wall", "l1", "The middle lamella that cements two plant cells is mainly:",
    ["Cellulose", "Lignin", "Calcium pectate", "Chitin"], 2,
    "Calcium pectate is the glue. Cellulose builds the primary and secondary walls.", ["neet", "cpmt"]],
  ["cell-wall", "l1", "Cytoplasmic threads that pass through plant cell walls are:",
    ["Desmosomes", "Plasmodesmata", "Tight junctions", "Microvilli"], 1,
    "Plasmodesmata join neighbouring protoplasts. Desmosomes and tight junctions are animal junctions."],
  ["cell-wall", "l2", "The cell wall of most fungi is made mainly of:",
    ["Cellulose", "Peptidoglycan", "Chitin", "Pectin"], 2,
    "Fungi: chitin. Bacteria: peptidoglycan. Plants: cellulose."],

  // endoplasmic-reticulum
  ["endoplasmic-reticulum", "l2", "Steroid hormones in adrenal cortex cells are made mainly in the:",
    ["Rough ER", "Smooth ER", "Golgi apparatus", "Lysosome"], 1,
    "SER makes lipids and steroids. RER makes proteins."],
  ["endoplasmic-reticulum", "l3", "‘Microsomes’ obtained after grinding and centrifuging cells are mostly fragments of:",
    ["Golgi apparatus", "Mitochondria", "Endoplasmic reticulum", "Nuclear envelope only"], 2,
    "Microsomes are a lab artefact: pinched-off ER vesicles, often with ribosomes. Old CPMT lists name them.", ["cpmt", "aiims"]],

  // golgi-apparatus
  ["golgi-apparatus", "l1", "The cis face of the Golgi apparatus:",
    ["Releases secretory vesicles to the membrane", "Receives vesicles from the ER", "Is studded with ribosomes", "Makes ATP"], 1,
    "Cis = receiving face, near the ER. Trans = shipping face."],
  ["golgi-apparatus", "l1", "In plant cells, individual Golgi stacks are called:",
    ["Oxysomes", "Dictyosomes", "Mesosomes", "Peroxisomes"], 1,
    "Dictyosome is just the plant name for a Golgi stack, not a separate organelle."],
  ["golgi-apparatus", "l2", "In a dividing plant cell, Golgi-derived vesicles mainly help to form the:",
    ["Spindle", "Cell plate", "Nuclear envelope", "Centriole"], 1,
    "Vesicles carrying wall material line up at the phragmoplast and fuse into the cell plate."],

  // lysosome
  ["lysosome", "l1", "Lysosomal hydrolases work best at:",
    ["Acidic pH", "Neutral pH", "Alkaline pH", "Any pH equally"], 0,
    "Proton pumps keep the inside acidic. If the bag leaks, the neutral cytosol slows the enzymes."],
  ["lysosome", "l1", "A lysosome digesting the cell's own worn-out mitochondrion is an example of:",
    ["Heterophagy", "Autophagy", "Exocytosis", "Pinocytosis"], 1,
    "Auto = self. Heterophagy digests material taken in from outside."],

  // vacuole
  ["vacuole", "l1", "The membrane around a plant vacuole is the:",
    ["Plasmalemma", "Tonoplast", "Middle lamella", "Nuclear envelope"], 1,
    "Tonoplast. Ions are pumped across it, and water follows."],
  ["vacuole", "l1", "Contractile vacuoles in freshwater protists mainly help in:",
    ["Photosynthesis", "Osmoregulation and excretion", "Protein synthesis", "Cell-plate formation"], 1,
    "Water keeps entering from dilute ponds; the contractile vacuole pumps it out."],

  // mitochondria
  ["mitochondria", "l3", "The Krebs cycle takes place in the:",
    ["Outer membrane", "Cristae", "Matrix", "Intermembrane space"], 2,
    "Classic trap. Krebs is in the matrix. The ETC and ATP synthase sit on the inner membrane (cristae).", ["neet", "aiims", "jipmer", "cpmt"]],
  ["mitochondria", "l2", "F0–F1 particles (oxysomes) are located on the:",
    ["Outer membrane", "Inner membrane / cristae", "Matrix DNA", "Intermembrane space"], 1,
    "They are ATP synthase, sitting on the inner face of the cristae."],
  ["mitochondria", "l4", "Which of these is NOT evidence for the endosymbiotic origin of mitochondria?",
    ["Circular DNA", "70S ribosomes", "Division by fission", "Glycolysis enzymes in the matrix"], 3,
    "Glycolysis runs in the cytosol, not in mitochondria. The other three look bacterial."],
  ["mitochondria", "l2", "Mitochondria are called semi-autonomous because they:",
    ["Make every protein they need", "Have their own DNA but still need nuclear genes for most proteins", "Can live outside the cell", "Have no ribosomes"], 1,
    "They bake some of their own cake, not all. Most mitochondrial proteins are coded by nuclear DNA."],

  // plastids
  ["plastids", "l1", "Colourless plastids that store starch are:",
    ["Chromoplasts", "Amyloplasts", "Elaioplasts", "Aleuroplasts"], 1,
    "Amylo = starch. Elaioplasts store oil, aleuroplasts store protein."],
  ["plastids", "l2", "The Calvin cycle occurs in the:",
    ["Thylakoid membrane", "Thylakoid lumen", "Stroma", "Intermembrane space"], 2,
    "Light reaction on thylakoids; Calvin cycle in the stroma."],
  ["plastids", "l1", "Grana are stacks of:",
    ["Cristae", "Thylakoids", "Cisternae", "Ribosomes"], 1,
    "Grana = stacked thylakoids. Do not mix them up with mitochondrial cristae."],

  // nucleus
  ["nucleus", "l2", "The nucleolus is mainly the site of:",
    ["DNA replication", "rRNA synthesis and ribosome subunit assembly", "Lipid synthesis", "ATP synthesis"], 1,
    "The nucleolus is the ribosome workshop. It has no membrane."],
  ["nucleus", "l1", "Which mature cell has no nucleus?",
    ["Mammalian red blood cell", "Neuron", "Liver cell", "Guard cell"], 0,
    "Mature mammalian RBCs lose the nucleus. Sieve-tube elements of phloem are the plant example."],
  ["nucleus", "l2", "In a nucleosome, DNA is wrapped around an octamer of:",
    ["Tubulin", "Actin", "Histones", "Keratin"], 2,
    "Two each of H2A, H2B, H3 and H4. H1 sits on the linker DNA."],

  // cytoskeleton
  ["cytoskeleton", "l1", "The axoneme of a eukaryotic flagellum has which microtubule pattern?",
    ["9 + 0", "9 + 2", "9 + 3", "8 + 2"], 1,
    "Nine outer doublets and two central singlets. The centriole and basal body are 9 + 0."],
  ["cytoskeleton", "l3", "Colchicine stops cells at metaphase because it:",
    ["Blocks DNA replication", "Prevents spindle microtubules from forming", "Digests the nuclear envelope", "Blocks only cytokinesis"], 1,
    "No spindle, no anaphase. Chromosomes stay condensed — useful for karyotypes and for making polyploids."],

  // centriole
  ["centriole", "l1", "A centriole is made of:",
    ["Nine doublets and a central pair", "Nine triplets and no central pair", "Two central singlets only", "Actin filaments in a ring"], 1,
    "Nine triplets in a cartwheel with a hub and spokes: 9 + 0."],
  ["centriole", "l3", "Which statement about higher plant cells is correct?",
    ["They cannot form a spindle", "They form a spindle without centrioles", "Their centrioles are 9 + 2", "Every cell has a centrosome with two centrioles"], 1,
    "Higher plants make an anastral spindle with no centrioles.", ["neet", "aiims", "cpmt"]],

  // biomolecules
  ["biomolecules", "l1", "Which of these goes to the acid-insoluble fraction of a tissue extract?",
    ["Amino acids", "Nucleotides", "Proteins", "Glucose"], 2,
    "Macromolecules (proteins, nucleic acids, polysaccharides) are acid-insoluble. Small monomers stay in the acid-soluble pool."],
  ["biomolecules", "l2", "Uracil is a base found in:",
    ["DNA only", "RNA only", "Both DNA and RNA", "Proteins"], 1,
    "RNA uses U in place of T."],
  ["biomolecules", "l2", "The bond that joins amino acids in a protein is the:",
    ["Glycosidic bond", "Phosphodiester bond", "Peptide bond", "Ester bond"], 2,
    "Peptide bond between the carboxyl group of one amino acid and the amino group of the next."],

  // enzymes
  ["enzymes", "l2", "A competitive inhibitor:",
    ["Raises apparent Km; Vmax unchanged", "Lowers Vmax; Km unchanged", "Lowers both Km and Vmax", "Changes the equilibrium of the reaction"], 0,
    "It competes for the active site, so more substrate can outrun it. Vmax is still reachable."],
  ["enzymes", "l1", "Apoenzyme + coenzyme gives:",
    ["Isoenzyme", "Holoenzyme", "Proenzyme", "Ribozyme"], 1,
    "Holo = whole. The protein part alone is the apoenzyme."],
  ["enzymes", "l3", "Which of these is a catalyst that is not a protein?",
    ["Pepsin", "Ribozyme", "Trypsin", "Amylase"], 1,
    "Ribozymes are catalytic RNA — the standard exception to ‘all enzymes are proteins’."],

  // cell-cycle
  ["cell-cycle", "l1", "DNA replication happens in which phase?",
    ["G1", "S", "G2", "M"], 1,
    "S = synthesis. After S, each chromosome has two sister chromatids."],
  ["cell-cycle", "l2", "A diploid cell has 2C DNA in G1. Its DNA content in G2 is:",
    ["1C", "2C", "4C", "8C"], 2,
    "S doubles DNA to 4C. The chromosome number stays 2n until division."],
  ["cell-cycle", "l1", "Cells that leave the cycle and stop dividing are said to be in:",
    ["G0", "G1", "S", "G2"], 0,
    "G0 is the quiet exit. Many neurons stay there."],

  // mitosis
  ["mitosis", "l2", "The best stage to study chromosome shape and number is:",
    ["Prophase", "Metaphase", "Anaphase", "Telophase"], 1,
    "At metaphase, chromosomes are most condensed and lined up on the plate."],
  ["mitosis", "l1", "Sister chromatids separate in mitotic:",
    ["Prophase", "Metaphase", "Anaphase", "Telophase"], 2,
    "Anaphase: centromeres split and each chromatid becomes a chromosome."],
  ["mitosis", "l3", "Cytokinesis in a higher plant cell occurs by:",
    ["A furrow from the edge inward", "A cell plate growing from the centre outward", "Amitosis", "Budding"], 1,
    "The wall cannot pinch, so plants build a cell plate centrifugally. Animals use a centripetal furrow.", ["neet", "aiims", "cpmt"]],

  // meiosis
  ["meiosis", "l3", "Crossing over takes place in:",
    ["Leptotene", "Zygotene", "Pachytene", "Diakinesis"], 2,
    "Trap: synapsis is zygotene; crossing over is pachytene; chiasmata become visible in diplotene.", ["neet", "aiims", "jipmer", "cpmt"]],
  ["meiosis", "l2", "Synapsis of homologous chromosomes occurs in:",
    ["Leptotene", "Zygotene", "Pachytene", "Diplotene"], 1,
    "Zygotene: homologues zip up with the synaptonemal complex."],
  ["meiosis", "l3", "A species has 2n = 24. How many bivalents form in meiosis I?",
    ["6", "12", "24", "48"], 1,
    "Number of bivalents = n. Here n = 12."],
  ["meiosis", "l2", "Chromosome number is halved when:",
    ["Sister chromatids separate in anaphase II", "Homologous chromosomes separate in anaphase I", "DNA replicates in S", "The nucleolus disappears"], 1,
    "Anaphase I is reductional. Meiosis II is equational, like mitosis."],

  // amitosis
  ["amitosis", "l1", "Amitosis differs from mitosis because it:",
    ["Needs two rounds of division", "Has no spindle and no distinct chromosome display", "Always forms four cells", "Happens only in plant meristems"], 1,
    "The nucleus simply stretches and pinches. No prophase–metaphase show.", ["cpmt"]],

  // plant-tissues
  ["plant-tissues", "l2", "Which simple tissue is dead at maturity and has lignified walls?",
    ["Parenchyma", "Collenchyma", "Sclerenchyma", "Meristem"], 2,
    "Sclerenchyma: fibres and sclereids. Collenchyma is living with uneven cellulose walls.", ["neet", "cpmt"]],
  ["plant-tissues", "l2", "Intercalary meristem is typically found:",
    ["At root tips", "At the base of internodes in grasses", "In the vascular cambium", "In cork"], 1,
    "It lets grass leaves and internodes regrow after grazing or mowing.", ["neet", "cpmt"]],
  ["plant-tissues", "l3", "A mature sieve-tube element relies for nuclear control on its:",
    ["Tracheid", "Companion cell", "Phloem fibre", "Vessel element"], 1,
    "Sieve tubes lose the nucleus. The companion cell is the nucleate partner.", ["neet", "cpmt"]],

  // animal-tissues
  ["animal-tissues", "l2", "Blood is classified as:",
    ["Epithelial tissue", "Connective tissue", "Muscular tissue", "Nervous tissue"], 1,
    "Blood is connective tissue with a fluid matrix (plasma).", ["neet", "cpmt"]],
  ["animal-tissues", "l2", "Intercalated discs are a feature of:",
    ["Skeletal muscle", "Smooth muscle", "Cardiac muscle", "Nervous tissue"], 2,
    "They join cardiac cells so the heart contracts as one unit.", ["neet", "cpmt"]],
];

export const questions: Mcq[] = rows.map(([conceptId, layer, stem, options, answer, explanation, tags], i) => ({
  id: `${conceptId}-${i + 1}`,
  conceptId,
  layer,
  stem,
  options,
  answer,
  explanation,
  examTags: tags ?? ["neet"],
}));
