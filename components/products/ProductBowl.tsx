import type { Product, ProductForm } from "@/content/types";

/**
 * Procedural product illustration: a shallow black stone bowl holding the product,
 * drawn deterministically from the product's colour world and form. Server-renderable
 * SVG — no images, no AI. The same markup is rasterised for PDFs/OG and sampled for
 * the burst particles, so what you click is exactly what explodes.
 */

const VB = 400;

/* mulberry32 — tiny seeded PRNG so SSR and client agree */
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => n.toFixed(1);

/** Points inside the bowl's inner ellipse (cx 200, cy 232, rx 128, ry 40). */
function scatter(
  seed: string,
  n: number,
  rx = 128,
  ry = 40,
  cx = 200,
  cy = 232,
) {
  const r = rng(seed);
  const pts: { x: number; y: number; a: number; s: number; t: number }[] = [];
  for (let i = 0; i < n; i++) {
    const u = Math.sqrt(r());
    const th = r() * Math.PI * 2;
    pts.push({
      x: cx + u * rx * Math.cos(th),
      y: cy + u * ry * Math.sin(th),
      a: r() * 360,
      s: 0.7 + r() * 0.6,
      t: r(),
    });
  }
  // draw back-to-front for overlap plausibility
  return pts.sort((p, q) => p.y - q.y);
}

function Heap({
  p,
  id,
  texture = true,
}: {
  p: Product;
  id: string;
  texture?: boolean;
}) {
  const { primary, secondary, particles } = p.colourWorld;
  const r = rng(p.slug + "-heap");
  const specks = Array.from({ length: 22 }, () => ({
    x: 200 + (r() - 0.5) * 340,
    y: 292 + r() * 40,
    s: 1 + r() * 2.2,
  }));
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-heap`} cx="42%" cy="28%" r="80%">
          <stop offset="0" stopColor={particles[1]} />
          <stop offset="0.5" stopColor={primary} />
          <stop offset="1" stopColor={secondary} />
        </radialGradient>
        <pattern
          id={`${id}-tex`}
          patternUnits="userSpaceOnUse"
          width="128"
          height="128"
        >
          <image href="/images/grain.png" width="128" height="128" />
        </pattern>
        <clipPath id={`${id}-mound-clip`}>
          <path d="M 70 262 C 96 226, 128 182, 176 158 C 196 149, 212 150, 232 160 C 274 182, 302 222, 330 262 Z" />
        </clipPath>
      </defs>
      {/* the mound: a soft, slightly asymmetric peak; its base is hidden by the bowl's front lip */}
      <path
        d="M 70 262 C 96 226, 128 182, 176 158 C 196 149, 212 150, 232 160 C 274 182, 302 222, 330 262 Z"
        fill={`url(#${id}-heap)`}
      />
      {texture ? (
        <rect
          x="60"
          y="140"
          width="280"
          height="130"
          fill={`url(#${id}-tex)`}
          opacity="0.22"
          clipPath={`url(#${id}-mound-clip)`}
          style={{ mixBlendMode: "multiply" }}
        />
      ) : null}
      {/* soft shadow where the mound meets the powder surface */}
      <ellipse
        cx="200"
        cy="248"
        rx="112"
        ry="10"
        fill={secondary}
        opacity="0.35"
      />
      {/* highlight ridge */}
      <path
        d="M 148 186 C 170 168, 198 160, 226 166"
        fill="none"
        stroke={particles[3]}
        strokeOpacity="0.32"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* dusted specks on the table around the bowl */}
      {specks.map((s, i) => (
        <circle
          key={i}
          cx={f(s.x)}
          cy={f(s.y)}
          r={f(s.s)}
          fill={primary}
          opacity="0.7"
        />
      ))}
    </g>
  );
}

function Seeds({ p, id }: { p: Product; id: string }) {
  const { primary, secondary, particles } = p.colourWorld;
  const kind = p.slug.includes("chilli")
    ? "chilli"
    : p.slug.includes("turmeric")
      ? "finger"
      : p.slug.includes("coriander")
        ? "round"
        : "cumin";
  const n = kind === "chilli" ? 28 : kind === "finger" ? 18 : kind === "round" ? 96 : 120;
  const pts = scatter(p.slug + "-seeds", n, 122, 36, 200, 226);
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-bed`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor={secondary} />
          <stop offset="1" stopColor="#1a1714" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="232" rx="130" ry="42" fill={`url(#${id}-bed)`} />
      {pts.map((q, i) => {
        const fill =
          q.t < 0.55 ? primary : q.t < 0.85 ? particles[1] : particles[2];
        if (kind === "cumin")
          return (
            <ellipse
              key={i}
              cx={f(q.x)}
              cy={f(q.y)}
              rx={f(5.5 * q.s)}
              ry={f(1.6 * q.s)}
              transform={`rotate(${f(q.a)} ${f(q.x)} ${f(q.y)})`}
              fill={fill}
            />
          );
        if (kind === "round")
          return (
            <circle
              key={i}
              cx={f(q.x)}
              cy={f(q.y)}
              r={f(3.4 * q.s)}
              fill={fill}
              stroke={secondary}
              strokeWidth="0.6"
            />
          );
        if (kind === "chilli")
          return (
            <path
              key={i}
              // a slightly curved dried chilli with a stem nub, drawn around its own origin
              d="M -18 0 C -10 -7, 8 -8, 18 -2 C 20 -1, 20 1, 18 2 C 8 6, -10 5, -18 2 Z M -18 0 l -4 -3 l 2 4 z"
              transform={`translate(${f(q.x)} ${f(q.y)}) rotate(${f(q.a)}) scale(${f(q.s)})`}
              fill={fill}
            />
          );
        // turmeric finger — knobby rounded stick around its own origin
        return (
          <path
            key={i}
            d="M -13 -3 c 3 -6 9 -7 14 -4 c 5 1 9 4 11 8 c 1 4 -2 7 -6 7 c -6 1 -13 0 -18 -2 c -4 -2 -4 -6 -1 -9 z"
            transform={`translate(${f(q.x)} ${f(q.y)}) rotate(${f(q.a)}) scale(${f(q.s * 0.9)})`}
            fill={fill}
            stroke={secondary}
            strokeWidth="0.8"
          />
        );
      })}
    </g>
  );
}

function Flakes({ p, id }: { p: Product; id: string }) {
  const { primary, secondary, particles } = p.colourWorld;
  const pts = scatter(p.slug + "-flakes", 84, 124, 38, 200, 226);
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-bed`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor={secondary} />
          <stop offset="1" stopColor="#1a1714" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="232" rx="130" ry="42" fill={`url(#${id}-bed)`} />
      {pts.map((q, i) => (
        <rect
          key={i}
          x={f(q.x - 5 * q.s)}
          y={f(q.y - 3.2 * q.s)}
          width={f(10 * q.s)}
          height={f(6.4 * q.s)}
          rx="1.5"
          transform={`rotate(${f(q.a)} ${f(q.x)} ${f(q.y)})`}
          fill={q.t < 0.6 ? primary : q.t < 0.9 ? particles[1] : particles[2]}
          stroke={secondary}
          strokeWidth="0.5"
        />
      ))}
    </g>
  );
}

function Grains({ p, id }: { p: Product; id: string }) {
  const { primary, secondary, particles } = p.colourWorld;
  const pts = scatter(p.slug + "-grains", 160, 126, 38, 200, 226);
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-bed`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor={secondary} />
          <stop offset="1" stopColor="#1a1714" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="232" rx="130" ry="42" fill={`url(#${id}-bed)`} />
      {pts.map((q, i) => (
        <ellipse
          key={i}
          cx={f(q.x)}
          cy={f(q.y)}
          rx={f(7 * q.s)}
          ry={f(1.5 * q.s)}
          transform={`rotate(${f(q.a)} ${f(q.x)} ${f(q.y)})`}
          fill={q.t < 0.7 ? primary : particles[1]}
        />
      ))}
    </g>
  );
}

function Curls({ p, id }: { p: Product; id: string }) {
  const { primary, secondary, particles } = p.colourWorld;
  const pts = scatter(p.slug + "-curls", 52, 122, 36, 200, 226);
  return (
    <g>
      <defs>
        <radialGradient id={`${id}-bed`} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor={secondary} />
          <stop offset="1" stopColor="#1a1714" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="232" rx="130" ry="42" fill={`url(#${id}-bed)`} />
      {pts.map((q, i) => (
        <path
          key={i}
          d="M -9 4 c 6 -10 14 -10 18 -2 c 4 8 -2 14 -10 12"
          fill="none"
          stroke={
            q.t < 0.6 ? primary : q.t < 0.85 ? particles[1] : particles[2]
          }
          strokeWidth={f(2.6)}
          strokeLinecap="round"
          transform={`translate(${f(q.x)} ${f(q.y)}) rotate(${f(q.a)}) scale(${f(q.s)})`}
        />
      ))}
    </g>
  );
}

const CONTENT: Record<
  ProductForm,
  (props: { p: Product; id: string; texture?: boolean }) => React.JSX.Element
> = {
  powder: Heap,
  whole: Seeds,
  flakes: Flakes,
  grain: Grains,
  fried: Curls,
};

export function ProductBowl({
  product,
  className = "",
  decorative = true,
  id: idProp,
  texture = true,
  ...rest
}: {
  product: Product;
  className?: string;
  decorative?: boolean;
  id?: string;
  texture?: boolean;
} & Record<`data-${string}`, string | boolean | undefined>) {
  const id = idProp ?? `bowl-${product.slug}`;
  const Content = CONTENT[product.form];
  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : product.illustration.alt}
      data-bowl={product.slug}
      {...rest}
    >
      <defs>
        <radialGradient id={`${id}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a332c" />
          <stop offset="1" stopColor="#15120f" />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#221d18" />
          <stop offset="1" stopColor="#0c0a08" />
        </linearGradient>
        <radialGradient id={`${id}-inner`} cx="50%" cy="35%" r="65%">
          <stop offset="0" stopColor="#2a2420" />
          <stop offset="1" stopColor="#100d0b" />
        </radialGradient>
      </defs>
      {/* ground shadow */}
      <ellipse cx="200" cy="300" rx="176" ry="42" fill={`url(#${id}-shadow)`} />
      {/* bowl body */}
      <path
        d="M 44 236 C 44 300, 108 328, 200 328 C 292 328, 356 300, 356 236 Z"
        fill={`url(#${id}-body)`}
      />
      {/* rim */}
      <ellipse cx="200" cy="236" rx="156" ry="50" fill={`url(#${id}-rim)`} />
      {/* inner cavity */}
      <ellipse cx="200" cy="238" rx="136" ry="42" fill={`url(#${id}-inner)`} />
      {/* contents */}
      <Content p={product} id={id} texture={texture} />
      {/* front lip — hides the base of whatever sits in the bowl */}
      <path
        d="M 44 236 C 44 262, 108 286, 200 286 C 292 286, 356 262, 356 236 C 356 250, 292 268, 200 268 C 108 268, 44 250, 44 236 Z"
        fill={`url(#${id}-rim)`}
      />
      {/* rim highlight */}
      <path
        d="M 60 226 C 96 196, 150 186, 200 186 C 250 186, 304 196, 340 226"
        fill="none"
        stroke="#fbf8f1"
        strokeOpacity="0.14"
        strokeWidth="3"
      />
    </svg>
  );
}
