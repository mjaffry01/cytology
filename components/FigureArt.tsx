import type { Figure } from "@/content/schema";

/**
 * Original teaching diagrams. Visual language, kept the same in every figure:
 * membrane = double line (--fig-mem), DNA = dashed (--fig-dna), plant-only parts = green tint.
 * Every drawing is 1000 wide; hotspot boxes in content/figures.ts are percentages of this box.
 */
export const VIEW_H: Record<Figure["kind"], number> = {
  mitochondrion: 600,
  mitosis: 400,
  "plant-cell": 600,
  "animal-cell": 600,
  bacterium: 600,
  meiosis: 600,
  membrane: 600,
};

const S = {
  mem: "var(--fig-mem)",
  dna: "var(--fig-dna)",
  plant: "var(--fig-plant)",
  plantSoft: "var(--fig-plant-soft)",
  cyto: "var(--fig-cyto)",
  ink: "var(--fig-ink)",
  ims: "var(--fig-ims)",
  mat: "var(--fig-mat)",
  vac: "var(--fig-vac)",
  rib: "var(--fig-rib)",
  a: "var(--fig-chr-a)",
  b: "var(--fig-chr-b)",
  prot: "var(--fig-protein)",
  sugar: "var(--fig-sugar)",
};

/** Two parallel strokes = a membrane. */
function DoubleRect(p: { x: number; y: number; w: number; h: number; rx: number; gap?: number; fill?: string }) {
  const g = p.gap ?? 7;
  return (
    <g>
      <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={p.rx} fill={p.fill ?? "none"} stroke={S.mem} strokeWidth={3} />
      <rect x={p.x + g} y={p.y + g} width={p.w - 2 * g} height={p.h - 2 * g} rx={Math.max(p.rx - g, 0)} fill="none" stroke={S.mem} strokeWidth={3} />
    </g>
  );
}

function Mito({ cx, cy, rx, ry, rot = 0 }: { cx: number; cy: number; rx: number; ry: number; rot?: number }) {
  const folds = [-0.5, -0.1, 0.3];
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={S.ims} stroke={S.mem} strokeWidth={2.5} />
      <ellipse cx={cx} cy={cy} rx={rx - 5} ry={ry - 5} fill={S.mat} stroke={S.mem} strokeWidth={2} />
      {folds.map((f, i) => (
        <line key={i} x1={cx + f * rx} y1={cy + (i % 2 ? ry - 5 : -(ry - 5))} x2={cx + f * rx} y2={cy + (i % 2 ? -2 : 2)} stroke={S.mem} strokeWidth={4} strokeLinecap="round" />
      ))}
    </g>
  );
}

function Chloroplast({ cx, cy, rx, ry, rot = 0 }: { cx: number; cy: number; rx: number; ry: number; rot?: number }) {
  const stacks = [-0.5, 0, 0.5];
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={S.plantSoft} stroke={S.plant} strokeWidth={2.5} />
      <ellipse cx={cx} cy={cy} rx={rx - 5} ry={ry - 5} fill="none" stroke={S.plant} strokeWidth={2} />
      {stacks.map((f) =>
        [0, 1, 2, 3].map((k) => (
          <rect key={`${f}-${k}`} x={cx + f * rx - 9} y={cy - 12 + k * 6} width={18} height={4} rx={2} fill={S.plant} />
        )),
      )}
      <line x1={cx - rx * 0.5 + 9} y1={cy} x2={cx + rx * 0.5 - 9} y2={cy} stroke={S.plant} strokeWidth={1.5} />
    </g>
  );
}

/** A duplicated chromosome: two sister chromatids joined at a centromere. */
function Chromo({ x, y, len = 34, color, rot = 0 }: { x: number; y: number; len?: number; color: string; rot?: number }) {
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <line x1={x - 5} y1={y - len / 2} x2={x - 5} y2={y + len / 2} stroke={color} strokeWidth={7} strokeLinecap="round" />
      <line x1={x + 5} y1={y - len / 2} x2={x + 5} y2={y + len / 2} stroke={color} strokeWidth={7} strokeLinecap="round" />
      <circle cx={x} cy={y} r={4} fill={S.ink} />
    </g>
  );
}

/** A single chromatid being pulled to a pole (V shape pointing at the pole). */
function Chromatid({ x, y, color, dir }: { x: number; y: number; color: string; dir: 1 | -1 }) {
  return (
    <path d={`M ${x - 14 * dir} ${y - 14} L ${x} ${y} L ${x - 14 * dir} ${y + 14}`} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
  );
}

function Nucleus({ cx, cy, r, pores = true }: { cx: number; cy: number; r: number; pores?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={S.cyto} stroke={S.mem} strokeWidth={3} strokeDasharray={pores ? "40 6" : undefined} />
      <circle cx={cx} cy={cy} r={r - 7} fill="var(--fig-nucleo)" stroke={S.mem} strokeWidth={3} strokeDasharray={pores ? "40 6" : undefined} />
      <path
        d={`M ${cx - r * 0.6} ${cy + r * 0.1} q ${r * 0.2} -${r * 0.3} ${r * 0.4} 0 t ${r * 0.4} 0 M ${cx - r * 0.3} ${cy + r * 0.45} q ${r * 0.2} -${r * 0.25} ${r * 0.45} 0 t ${r * 0.4} -${r * 0.1} M ${cx - r * 0.5} ${cy - r * 0.35} q ${r * 0.15} ${r * 0.2} ${r * 0.35} 0`}
        fill="none"
        stroke={S.dna}
        strokeWidth={2.5}
        strokeDasharray="6 5"
      />
      <circle cx={cx + r * 0.2} cy={cy - r * 0.2} r={r * 0.26} fill={S.ink} opacity={0.75} />
    </g>
  );
}

function Mitochondrion() {
  const top = [250, 490, 730];
  const bottom = [370, 610];
  return (
    <>
      <defs>
        <clipPath id="mito-inner">
          <rect x={96} y={126} width={808} height={348} rx={174} />
        </clipPath>
      </defs>
      <rect x={60} y={90} width={880} height={420} rx={210} fill={S.ims} stroke={S.mem} strokeWidth={5} />
      <rect x={100} y={130} width={800} height={340} rx={170} fill={S.mat} stroke={S.mem} strokeWidth={5} />
      <g clipPath="url(#mito-inner)">
        {top.map((x) => (
          <rect key={x} x={x} y={100} width={36} height={200} rx={18} fill={S.ims} stroke={S.mem} strokeWidth={5} />
        ))}
        {bottom.map((x) => (
          <rect key={x} x={x} y={300} width={36} height={200} rx={18} fill={S.ims} stroke={S.mem} strokeWidth={5} />
        ))}
      </g>
      {/* oxysomes: stalked heads on the matrix side of a crista */}
      {[340, 372, 404, 436].flatMap((y) => [
        <g key={`l${y}`}>
          <line x1={368} y1={y} x2={356} y2={y} stroke={S.ink} strokeWidth={2} />
          <circle cx={351} cy={y} r={6} fill={S.prot} stroke={S.ink} strokeWidth={1} />
        </g>,
        <g key={`r${y}`}>
          <line x1={408} y1={y} x2={420} y2={y} stroke={S.ink} strokeWidth={2} />
          <circle cx={425} cy={y} r={6} fill={S.prot} stroke={S.ink} strokeWidth={1} />
        </g>,
      ])}
      {/* circular mtDNA */}
      <circle cx={180} cy={300} r={32} fill="none" stroke={S.dna} strokeWidth={3.5} strokeDasharray="7 5" />
      <circle cx={196} cy={318} r={16} fill="none" stroke={S.dna} strokeWidth={3} strokeDasharray="5 4" />
      {/* 70S ribosomes and granules in the matrix */}
      {[
        [540, 350], [566, 372], [548, 398], [575, 414], [530, 420], [560, 340], [660, 250], [690, 210], [420, 210], [300, 360], [820, 300], [150, 390],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4.5} fill={S.rib} />
      ))}
    </>
  );
}

function MitosisStrip() {
  const cx = [100, 290, 480, 670, 875];
  const cy = 200;
  return (
    <>
      {/* Prophase */}
      <circle cx={cx[0]} cy={cy} r={80} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
      <circle cx={cx[0]} cy={cy} r={48} fill="none" stroke={S.mem} strokeWidth={3} strokeDasharray="10 9" />
      <Chromo x={cx[0] - 18} y={cy - 10} color={S.a} rot={20} len={28} />
      <Chromo x={cx[0] + 16} y={cy + 8} color={S.b} rot={-30} len={28} />
      <Chromo x={cx[0] - 2} y={cy + 24} color={S.a} rot={80} len={20} />
      <Chromo x={cx[0] + 10} y={cy - 26} color={S.b} rot={60} len={20} />
      <circle cx={cx[0] - 40} cy={cy - 62} r={5} fill={S.ink} />
      <circle cx={cx[0] + 40} cy={cy - 62} r={5} fill={S.ink} />
      <path d={`M ${cx[0] - 40} ${cy - 62} Q ${cx[0]} ${cy - 80} ${cx[0] + 40} ${cy - 62}`} fill="none" stroke={S.ink} strokeWidth={1.5} />

      {/* Metaphase */}
      <circle cx={cx[1]} cy={cy} r={80} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
      {[-45, -15, 15, 45].map((dy) => (
        <g key={dy}>
          <line x1={cx[1] - 62} y1={cy} x2={cx[1] - 8} y2={cy + dy} stroke={S.ink} strokeWidth={1.3} />
          <line x1={cx[1] + 62} y1={cy} x2={cx[1] + 8} y2={cy + dy} stroke={S.ink} strokeWidth={1.3} />
        </g>
      ))}
      {[-45, -15, 15, 45].map((dy, i) => (
        <Chromo key={dy} x={cx[1]} y={cy + dy} color={i % 2 ? S.b : S.a} len={22} />
      ))}
      <circle cx={cx[1] - 62} cy={cy} r={5} fill={S.ink} />
      <circle cx={cx[1] + 62} cy={cy} r={5} fill={S.ink} />

      {/* Anaphase */}
      <ellipse cx={cx[2]} cy={cy} rx={92} ry={74} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
      {[-36, -12, 12, 36].map((dy, i) => (
        <g key={dy}>
          <line x1={cx[2] - 72} y1={cy} x2={cx[2] - 32} y2={cy + dy} stroke={S.ink} strokeWidth={1.3} />
          <line x1={cx[2] + 72} y1={cy} x2={cx[2] + 32} y2={cy + dy} stroke={S.ink} strokeWidth={1.3} />
          <Chromatid x={cx[2] - 32} y={cy + dy} color={i % 2 ? S.b : S.a} dir={-1} />
          <Chromatid x={cx[2] + 32} y={cy + dy} color={i % 2 ? S.b : S.a} dir={1} />
        </g>
      ))}
      <circle cx={cx[2] - 72} cy={cy} r={5} fill={S.ink} />
      <circle cx={cx[2] + 72} cy={cy} r={5} fill={S.ink} />

      {/* Telophase: nuclei rebuild, slight furrow */}
      <path
        d={`M ${cx[3] - 90} ${cy} C ${cx[3] - 90} ${cy - 80} ${cx[3] - 10} ${cy - 80} ${cx[3]} ${cy - 58} C ${cx[3] + 10} ${cy - 80} ${cx[3] + 90} ${cy - 80} ${cx[3] + 90} ${cy} C ${cx[3] + 90} ${cy + 80} ${cx[3] + 10} ${cy + 80} ${cx[3]} ${cy + 58} C ${cx[3] - 10} ${cy + 80} ${cx[3] - 90} ${cy + 80} ${cx[3] - 90} ${cy} Z`}
        fill={S.cyto}
        stroke={S.mem}
        strokeWidth={4}
      />
      {[-46, 46].map((dx) => (
        <g key={dx}>
          <circle cx={cx[3] + dx} cy={cy} r={28} fill="var(--fig-nucleo)" stroke={S.mem} strokeWidth={3} strokeDasharray="10 7" />
          <path d={`M ${cx[3] + dx - 16} ${cy - 4} q 8 -12 16 0 t 16 0 M ${cx[3] + dx - 12} ${cy + 10} q 8 -10 16 0`} fill="none" stroke={S.dna} strokeWidth={3} strokeDasharray="5 4" />
        </g>
      ))}

      {/* Cytokinesis: two daughters */}
      {[-46, 46].map((dx) => (
        <g key={dx}>
          <ellipse cx={cx[4] + dx} cy={cy} rx={44} ry={56} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
          <Nucleus cx={cx[4] + dx} cy={cy} r={22} pores={false} />
        </g>
      ))}
      {["Prophase", "Metaphase", "Anaphase", "Telophase", "Cytokinesis"].map((t, i) => (
        <text key={t} x={cx[i]} y={352} textAnchor="middle" className="fig-caption">
          {i + 1}
        </text>
      ))}
    </>
  );
}

function PlantCell() {
  return (
    <>
      {/* Cell wall: plant-only tint */}
      <rect x={14} y={14} width={972} height={572} rx={26} fill={S.plantSoft} stroke={S.plant} strokeWidth={20} />
      {/* plasmodesmata gaps on the right wall */}
      {[220, 380].map((y) => (
        <rect key={y} x={972} y={y} width={28} height={10} fill={S.cyto} />
      ))}
      <DoubleRect x={36} y={36} w={928} h={528} rx={16} fill={S.cyto} gap={6} />
      {/* Large central vacuole bound by tonoplast */}
      <rect x={330} y={150} width={380} height={300} rx={90} fill={S.vac} stroke={S.mem} strokeWidth={3} />
      {[
        [420, 230], [600, 360], [520, 280],
      ].map(([x, y], i) => (
        <path key={i} d={`M ${x} ${y} l 12 -10 l 12 10 l -12 10 z`} fill="none" stroke={S.ink} strokeWidth={1.2} opacity={0.5} />
      ))}
      <Nucleus cx={840} cy={160} r={68} />
      {/* Golgi / dictyosome */}
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M ${540} ${80 + k * 11} q 60 -16 120 0`} fill="none" stroke={S.mem} strokeWidth={5} strokeLinecap="round" />
      ))}
      <circle cx={672} cy={82} r={5} fill="none" stroke={S.mem} strokeWidth={2} />
      <circle cx={680} cy={104} r={5} fill="none" stroke={S.mem} strokeWidth={2} />
      {/* ER near the nucleus */}
      {[0, 1, 2].map((k) => (
        <path key={k} d={`M 780 ${280 + k * 22} q 20 -14 40 0 t 40 0 t 40 0`} fill="none" stroke={S.mem} strokeWidth={3} />
      ))}
      {[790, 810, 830, 850, 870, 890].map((x, i) => (
        <circle key={x} cx={x} cy={276 + (i % 3) * 22} r={3} fill={S.rib} />
      ))}
      <Chloroplast cx={160} cy={400} rx={72} ry={34} />
      <Chloroplast cx={150} cy={170} rx={64} ry={30} rot={-20} />
      <Chloroplast cx={520} cy={515} rx={64} ry={28} rot={6} />
      <Chloroplast cx={260} cy={90} rx={52} ry={24} rot={8} />
      <Mito cx={860} cy={500} rx={48} ry={20} />
      <Mito cx={250} cy={280} rx={40} ry={17} rot={70} />
    </>
  );
}

function AnimalCell() {
  return (
    <>
      <ellipse cx={500} cy={300} rx={462} ry={272} fill={S.cyto} stroke={S.mem} strokeWidth={3} />
      <ellipse cx={500} cy={300} rx={455} ry={265} fill="none" stroke={S.mem} strokeWidth={3} />
      <Nucleus cx={480} cy={306} r={95} />
      {/* Centrosome: two centrioles at right angles */}
      <circle cx={255} cy={183} r={36} fill="var(--fig-nucleo)" opacity={0.6} />
      <rect x={228} y={184} width={44} height={16} rx={4} fill={S.prot} stroke={S.ink} strokeWidth={1.5} />
      <rect x={262} y={150} width={16} height={44} rx={4} fill={S.prot} stroke={S.ink} strokeWidth={1.5} />
      {/* Golgi */}
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M ${630} ${130 + k * 13} q 60 -22 120 0`} fill="none" stroke={S.mem} strokeWidth={6} strokeLinecap="round" />
      ))}
      {[
        [760, 124], [770, 150], [754, 180], [640, 196],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill="none" stroke={S.mem} strokeWidth={2.5} />
      ))}
      {/* Lysosomes */}
      {[
        [800, 318, 17], [838, 360, 13], [790, 364, 10],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="var(--fig-lyso)" stroke={S.mem} strokeWidth={2.5} />
          <circle cx={x - 3} cy={y - 2} r={2} fill={S.ink} />
          <circle cx={x + 4} cy={y + 3} r={2} fill={S.ink} />
        </g>
      ))}
      {/* RER beside the nucleus */}
      {[0, 1, 2, 3].map((k) => (
        <path key={k} d={`M 600 ${322 + k * 22} q 18 -12 36 0 t 36 0 t 36 0`} fill="none" stroke={S.mem} strokeWidth={3} />
      ))}
      {[606, 624, 642, 660, 678, 696].map((x, i) => (
        <circle key={x} cx={x} cy={318 + (i % 4) * 22} r={3} fill={S.rib} />
      ))}
      <Mito cx={305} cy={430} rx={56} ry={22} rot={-12} />
      <Mito cx={660} cy={470} rx={46} ry={19} rot={16} />
      <Mito cx={170} cy={320} rx={40} ry={17} rot={80} />
      <circle cx={400} cy={120} r={16} fill={S.vac} stroke={S.mem} strokeWidth={2} />
      <circle cx={880} cy={250} r={12} fill={S.vac} stroke={S.mem} strokeWidth={2} />
    </>
  );
}

function Bacterium() {
  return (
    <>
      {/* flagellum */}
      <path d="M 842 300 q 25 -30 50 0 t 50 0 t 50 0" fill="none" stroke={S.ink} strokeWidth={4} />
      {/* pili */}
      {[260, 360, 460, 560, 660].map((x) => (
        <g key={x}>
          <line x1={x} y1={150} x2={x - 8} y2={112} stroke={S.ink} strokeWidth={2} />
          <line x1={x + 30} y1={450} x2={x + 38} y2={488} stroke={S.ink} strokeWidth={2} />
        </g>
      ))}
      {/* glycocalyx (capsule / slime) */}
      <rect x={90} y={130} width={760} height={340} rx={170} fill="var(--fig-capsule)" stroke={S.ink} strokeWidth={2} strokeDasharray="4 6" />
      {/* wall */}
      <rect x={110} y={150} width={720} height={300} rx={150} fill="none" stroke="var(--fig-wall)" strokeWidth={12} />
      {/* plasma membrane (double) */}
      <DoubleRect x={122} y={162} w={696} h={276} rx={138} fill={S.cyto} gap={6} />
      {/* mesosome: infold of the membrane */}
      <path d="M 236 436 C 236 400 214 390 230 370 C 246 350 270 366 262 386 C 254 406 276 410 280 380 C 284 360 266 346 280 340 M 256 436 C 256 410 244 404 250 394" fill="none" stroke={S.mem} strokeWidth={3} />
      {/* nucleoid: naked, tangled DNA */}
      <path
        d="M 330 300 C 330 250 400 240 420 270 C 440 300 380 320 400 340 C 420 360 480 350 480 310 C 480 270 440 250 460 240 C 490 226 500 300 470 330 C 440 360 360 360 350 330 C 340 300 380 290 390 300"
        fill="none"
        stroke={S.dna}
        strokeWidth={3.5}
        strokeDasharray="8 5"
      />
      {/* plasmids */}
      <circle cx={642} cy={238} r={22} fill="none" stroke={S.dna} strokeWidth={3} strokeDasharray="6 4" />
      <circle cx={690} cy={270} r={14} fill="none" stroke={S.dna} strokeWidth={3} strokeDasharray="5 4" />
      {/* 70S ribosomes, some as polysomes */}
      {[
        [540, 350], [560, 364], [580, 378], [600, 390], [620, 380], [570, 400], [300, 240], [520, 200], [720, 360], [760, 300], [200, 300],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={5} fill={S.rib} />
      ))}
      <path d="M 536 350 Q 570 360 624 380" fill="none" stroke={S.ink} strokeWidth={1} opacity={0.6} />
    </>
  );
}

function MeiosisOverview() {
  const rowI = 150;
  const rowII = 450;
  return (
    <>
      <line x1={20} y1={300} x2={980} y2={300} stroke={S.ink} strokeWidth={1} strokeDasharray="4 6" opacity={0.5} />
      <text x={24} y={40} className="fig-caption">Meiosis I · reductional</text>
      <text x={24} y={340} className="fig-caption">Meiosis II · equational</text>

      {/* Prophase I: bivalent with a chiasma */}
      <circle cx={130} cy={rowI + 10} r={90} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
      <path d={`M 104 ${rowI - 40} C 104 ${rowI - 5} 146 ${rowI + 5} 146 ${rowI + 50}`} stroke={S.a} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M 114 ${rowI - 40} C 114 ${rowI + 5} 114 ${rowI + 10} 114 ${rowI + 50}`} stroke={S.a} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M 146 ${rowI - 40} C 146 ${rowI - 5} 104 ${rowI + 5} 104 ${rowI + 50}`} stroke={S.b} strokeWidth={7} fill="none" strokeLinecap="round" />
      <path d={`M 156 ${rowI - 40} C 156 ${rowI + 5} 156 ${rowI + 10} 156 ${rowI + 50}`} stroke={S.b} strokeWidth={7} fill="none" strokeLinecap="round" />

      {/* Metaphase I: bivalents on the plate, homologues face opposite poles */}
      <circle cx={380} cy={rowI + 10} r={90} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
      {[-30, 30].map((dy) => (
        <g key={dy}>
          <Chromo x={366} y={rowI + 10 + dy} color={S.a} len={22} />
          <Chromo x={394} y={rowI + 10 + dy} color={S.b} len={22} />
          <line x1={306} y1={rowI + 10} x2={354} y2={rowI + 10 + dy} stroke={S.ink} strokeWidth={1.2} />
          <line x1={454} y1={rowI + 10} x2={406} y2={rowI + 10 + dy} stroke={S.ink} strokeWidth={1.2} />
        </g>
      ))}

      {/* Anaphase I: whole homologues (still two chromatids) move apart */}
      <ellipse cx={630} cy={rowI + 10} rx={100} ry={80} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
      <Chromo x={570} y={rowI - 15} color={S.a} len={24} />
      <Chromo x={570} y={rowI + 35} color={S.b} len={24} />
      <Chromo x={690} y={rowI - 15} color={S.b} len={24} />
      <Chromo x={690} y={rowI + 35} color={S.a} len={24} />

      {/* Telophase I: two cells, n chromosomes each, still 2 chromatids */}
      {[830, 930].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={rowI + 10} rx={46} ry={62} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
          <Chromo x={x} y={rowI - 10} color={i ? S.b : S.a} len={20} />
          <Chromo x={x} y={rowI + 30} color={i ? S.a : S.b} len={20} />
        </g>
      ))}

      {/* Metaphase II */}
      {[110, 230].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={rowII + 10} rx={54} ry={70} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
          <Chromo x={x} y={rowII - 12} color={i ? S.b : S.a} len={20} />
          <Chromo x={x} y={rowII + 32} color={i ? S.a : S.b} len={20} />
        </g>
      ))}
      {/* Anaphase II: sisters split */}
      {[430, 570].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={rowII + 10} rx={62} ry={70} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
          {[-12, 32].map((dy, j) => (
            <g key={dy}>
              <Chromatid x={x - 22} y={rowII + dy} color={(i + j) % 2 ? S.b : S.a} dir={-1} />
              <Chromatid x={x + 22} y={rowII + dy} color={(i + j) % 2 ? S.b : S.a} dir={1} />
            </g>
          ))}
        </g>
      ))}
      {/* Four haploid cells */}
      {[712, 792, 872, 952].map((x, i) => (
        <g key={x}>
          <circle cx={x - 5} cy={rowII + 10} r={36} fill={S.cyto} stroke={S.mem} strokeWidth={4} />
          <line x1={x - 12} y1={rowII - 4} x2={x - 12} y2={rowII + 14} stroke={i < 2 ? S.a : S.b} strokeWidth={7} strokeLinecap="round" />
          <line x1={x + 2} y1={rowII + 8} x2={x + 2} y2={rowII + 26} stroke={i < 2 ? S.b : S.a} strokeWidth={7} strokeLinecap="round" />
        </g>
      ))}
    </>
  );
}

function Membrane() {
  const xs: number[] = [];
  for (let x = 30; x <= 975; x += 34) if (x < 590 || x > 770) xs.push(x);
  return (
    <>
      <rect x={0} y={0} width={1000} height={600} fill="var(--fig-outside)" />
      <rect x={0} y={300} width={1000} height={300} fill={S.cyto} />
      <text x={20} y={40} className="fig-caption">Outside the cell</text>
      <text x={20} y={580} className="fig-caption">Cytoplasm</text>
      {xs.map((x) => (
        <g key={x}>
          <line x1={x - 5} y1={204} x2={x - 5} y2={290} stroke={S.ink} strokeWidth={2.5} />
          <line x1={x + 5} y1={204} x2={x + 5} y2={286} stroke={S.ink} strokeWidth={2.5} />
          <circle cx={x} cy={192} r={14} fill={S.mem} />
          <line x1={x - 5} y1={396} x2={x - 5} y2={312} stroke={S.ink} strokeWidth={2.5} />
          <line x1={x + 5} y1={396} x2={x + 5} y2={316} stroke={S.ink} strokeWidth={2.5} />
          <circle cx={x} cy={408} r={14} fill={S.mem} />
        </g>
      ))}
      {/* cholesterol wedged among tails */}
      {[132, 472, 880].map((x) => (
        <rect key={x} x={x - 6} y={226} width={12} height={46} rx={6} fill="var(--fig-chol)" stroke={S.ink} strokeWidth={1.2} />
      ))}
      {/* integral protein spanning the bilayer */}
      <path d="M 610 170 C 590 230 600 300 596 380 C 594 440 640 470 680 462 C 730 470 770 440 764 380 C 760 300 772 230 752 170 C 736 130 628 128 610 170 Z" fill={S.prot} stroke={S.ink} strokeWidth={2} />
      <path d="M 660 180 C 650 260 650 340 662 440 M 700 180 C 712 260 712 340 700 440" fill="none" stroke={S.ink} strokeWidth={1} opacity={0.4} />
      {/* peripheral protein on the inner face */}
      <ellipse cx={330} cy={450} rx={52} ry={28} fill={S.prot} stroke={S.ink} strokeWidth={2} />
      {/* glycocalyx: sugar chains on the outer face */}
      {[
        [680, 150, 680, 110, 660, 80, 700, 76],
        [200, 178, 200, 140, 184, 110, 218, 108],
      ].map(([x1, y1, x2, y2, x3, y3, x4, y4], i) => (
        <g key={i}>
          <polyline points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="none" stroke={S.sugar} strokeWidth={3} />
          <line x1={x2} y1={y2} x2={x4} y2={y4} stroke={S.sugar} strokeWidth={3} />
          {[
            [x2, y2], [x3, y3], [x4, y4],
          ].map(([cx, cy], k) => (
            <circle key={k} cx={cx} cy={cy} r={8} fill={S.sugar} />
          ))}
        </g>
      ))}
    </>
  );
}

export function FigureArt({ figure }: { figure: Figure }) {
  const h = VIEW_H[figure.kind];
  const body = {
    mitochondrion: <Mitochondrion />,
    mitosis: <MitosisStrip />,
    "plant-cell": <PlantCell />,
    "animal-cell": <AnimalCell />,
    bacterium: <Bacterium />,
    meiosis: <MeiosisOverview />,
    membrane: <Membrane />,
  }[figure.kind];
  return (
    <svg viewBox={`0 0 1000 ${h}`} role="img" aria-label={figure.alt} className="fig-svg">
      {body}
    </svg>
  );
}
