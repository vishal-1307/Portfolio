/**
 * The lattice, drawn flat. Rendered whenever WebGL is unavailable, reduced
 * motion is requested, or the visitor is on Data Saver — and shown underneath
 * the canvas while the 3D chunk loads, so the hero is never an empty box.
 *
 * Geometry is computed once at module scope from fixed inputs: no randomness,
 * no JavaScript at runtime, identical output on server and client.
 */

const CENTER = 180;

const RINGS = [
  { r: 152, count: 15, rotate: 0, squash: 0.58 },
  { r: 120, count: 13, rotate: 14, squash: 0.68 },
  { r: 86, count: 11, rotate: 29, squash: 0.78 },
  { r: 48, count: 8, rotate: 11, squash: 0.88 },
];

type Node = { x: number; y: number; r: number; ring: number; hot: boolean };

const nodes: Node[] = RINGS.flatMap((ring, ringIndex) =>
  Array.from({ length: ring.count }, (_, i) => {
    const angle = ((i / ring.count) * 360 + ring.rotate) * (Math.PI / 180);
    return {
      x: CENTER + Math.cos(angle) * ring.r,
      y: CENTER + Math.sin(angle) * ring.r * ring.squash,
      r: 2.6 - ringIndex * 0.35,
      ring: ringIndex,
      hot: (i * 3 + ringIndex * 5) % 11 === 0,
    };
  }),
);

/** Edges: around each ring, plus a spoke inward — the icosahedral feel. */
const edges: Array<[Node, Node]> = [];
let cursor = 0;
for (const [ringIndex, ring] of RINGS.entries()) {
  const start = cursor;
  for (let i = 0; i < ring.count; i += 1) {
    const a = nodes[start + i];
    const b = nodes[start + ((i + 1) % ring.count)];
    if (a && b) edges.push([a, b]);

    // Tie this ring to the one inside it.
    const inner = RINGS[ringIndex + 1];
    if (inner) {
      const innerStart = start + ring.count;
      const target = nodes[innerStart + (i % inner.count)];
      if (a && target) edges.push([a, target]);
    }
  }
  cursor += ring.count;
}

export function HeroFallback() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="h-full w-full"
      role="img"
      aria-label="A lattice of connected nodes"
      preserveAspectRatio="xMidYMid meet"
    >
      <g className="stroke-paper" strokeWidth="0.55" opacity="0.2">
        {edges.map(([a, b], i) => (
          <line key={`e${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>

      {nodes.map((node, i) => (
        <circle
          key={`n${i}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          className={node.hot ? "fill-accent" : "fill-paper"}
          opacity={node.hot ? 0.95 : 0.6}
        />
      ))}
    </svg>
  );
}
