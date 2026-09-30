/** Concentric rings: the outer ring is the skin, the centre is the root. Filled rings = layers open. */
export function OnionMark({ depth = 4, max = 4, size = 40 }: { depth?: number; max?: number; size?: number }) {
  const rings = Array.from({ length: max + 1 }, (_, i) => i);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden className="onion-mark">
      {rings.map((i) => (
        <circle
          key={i}
          cx={20}
          cy={21}
          r={18 - i * (15 / Math.max(max, 1))}
          fill={i <= depth ? `var(--ring-${i})` : "var(--surface)"}
          stroke="var(--ring-line)"
          strokeWidth={1}
        />
      ))}
      <path d="M20 3 C 19 0.5 21 0.5 20 -1" stroke="var(--ring-line)" strokeWidth={1.2} fill="none" />
    </svg>
  );
}
