import type { Product, ProductForm } from "@/content/types";

/**
 * Procedural product illustration: a shallow dark stone bowl holding the product, drawn
 * deterministically from the product's colour world and form and lit like a photograph —
 * one key light from the top-left, matte surfaces broken up with turbulence grain and
 * mottle, irregular powder edges (displacement), per-piece cast shadows for whole goods,
 * ambient occlusion where the contents meet the wall, and a soft ground shadow.
 * Server-renderable SVG with no external assets, so the same markup is rasterised for
 * PDFs/OG (librsvg) and sampled for the burst particles: what you click is what explodes.
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

/** small positive integer from the slug — feTurbulence seeds */
function seedOf(slug: string) {
  let h = 7;
  for (let i = 0; i < slug.length; i++)
    h = (h * 31 + slug.charCodeAt(i)) % 9973;
  return h + 1;
}

const f = (n: number) => n.toFixed(1);

/** hex colour mixing (t = 0 → a, t = 1 → b) */
function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s: number) =>
    Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t);
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}
const lighten = (c: string, t: number) => mix(c, "#ffffff", t);
const darken = (c: string, t: number) => mix(c, "#000000", t);

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

/** the interior ellipse everything sits in */
const CAV = { cx: 200, cy: 238, rx: 136, ry: 42 };

/* ── shared filters ──────────────────────────────────────────────────────── */

/** grey noise with a fixed alpha — the matrix keeps luminance, replaces alpha */
const greyAlpha = (a: number) =>
  `0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0 ${a}`;

/**
 * Surface texture blended into the source: fine grain + soft mottle, both `overlay`
 * (neutral at mid-grey, so the base colour is preserved). Optional edge displacement
 * for powders so the silhouette is not a clean vector curve.
 */
function SurfaceFilter({
  id,
  seed,
  displace = 0,
  grain = 0.26,
  mottle = 0.32,
  grainFreq = 0.95,
}: {
  id: string;
  seed: number;
  displace?: number;
  grain?: number;
  mottle?: number;
  grainFreq?: number;
}) {
  return (
    <filter
      id={id}
      x="-8%"
      y="-14%"
      width="116%"
      height="128%"
      colorInterpolationFilters="sRGB"
    >
      {displace > 0 ? (
        <>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="2"
            seed={seed}
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={displace}
            xChannelSelector="R"
            yChannelSelector="G"
            result="shape"
          />
        </>
      ) : (
        <feOffset in="SourceGraphic" dx="0" dy="0" result="shape" />
      )}
      <feTurbulence
        type="fractalNoise"
        baseFrequency={grainFreq}
        numOctaves="2"
        seed={seed + 1}
        result="fine"
      />
      <feColorMatrix
        in="fine"
        type="matrix"
        values={greyAlpha(grain)}
        result="fineG"
      />
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.045"
        numOctaves="3"
        seed={seed + 2}
        result="mottle"
      />
      <feColorMatrix
        in="mottle"
        type="matrix"
        values={greyAlpha(mottle)}
        result="mottleG"
      />
      <feBlend in="fineG" in2="shape" mode="overlay" result="s1" />
      <feBlend in="mottleG" in2="s1" mode="overlay" result="s2" />
      <feComposite in="s2" in2="shape" operator="in" />
    </filter>
  );
}

/** Lighting shared by every heap: key-light sheen top-left, occlusion at the wall. */
function HeapLight({ id, ring = true }: { id: string; ring?: boolean }) {
  return (
    <>
      <defs>
        <radialGradient
          id={`${id}-sheen`}
          gradientUnits="userSpaceOnUse"
          cx="150"
          cy="186"
          r="120"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`${id}-vig`}
          gradientUnits="userSpaceOnUse"
          cx="200"
          cy="232"
          r="150"
        >
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${id}-cavclip)`}>
        <ellipse
          cx="200"
          cy="232"
          rx="140"
          ry="48"
          fill={`url(#${id}-sheen)`}
        />
        <ellipse cx="200" cy="232" rx="140" ry="48" fill={`url(#${id}-vig)`} />
        {ring ? <WallRing id={id} /> : null}
      </g>
    </>
  );
}

/** occlusion where the contents meet the far wall */
function WallRing({ id }: { id: string }) {
  return (
    <ellipse
      cx={CAV.cx}
      cy={CAV.cy - 2}
      rx={CAV.rx}
      ry={CAV.ry}
      fill="none"
      stroke="#000"
      strokeWidth="18"
      opacity="0.55"
      filter={`url(#${id}-soft)`}
    />
  );
}

/* ── contents by form ────────────────────────────────────────────────────── */

function Heap({ p, id }: { p: Product; id: string }) {
  const { primary, secondary } = p.colourWorld;
  const hi = lighten(primary, 0.22);
  const lo = darken(primary, 0.3);
  const deep = darken(secondary, 0.45);
  const seed = seedOf(p.slug);
  const r = rng(p.slug + "-heap");
  const clumps = Array.from({ length: 11 }, () => ({
    x: 118 + r() * 164,
    y: 172 + r() * 60,
    rx: 6 + r() * 16,
    ry: 3 + r() * 6,
    light: r() > 0.45,
  }));
  const specks = Array.from({ length: 26 }, () => ({
    x: 200 + (r() - 0.5) * 350,
    y: 290 + r() * 44,
    s: 0.8 + r() * 2,
  }));
  const dome =
    "M 62 252 C 88 214, 128 172, 176 160 C 204 152, 236 158, 262 176 C 296 200, 322 226, 338 252 Z";
  return (
    <g>
      <defs>
        <radialGradient
          id={`${id}-dome`}
          gradientUnits="userSpaceOnUse"
          cx="152"
          cy="180"
          r="215"
          fx="140"
          fy="170"
        >
          <stop offset="0" stopColor={hi} />
          <stop offset="0.36" stopColor={primary} />
          <stop offset="0.78" stopColor={lo} />
          <stop offset="1" stopColor={deep} />
        </radialGradient>
        <radialGradient
          id={`${id}-bed`}
          gradientUnits="userSpaceOnUse"
          cx="200"
          cy="238"
          r="140"
        >
          <stop offset="0" stopColor={primary} />
          <stop offset="0.72" stopColor={lo} />
          <stop offset="1" stopColor={deep} />
        </radialGradient>
        {/* union: the cavity plus the dome rising above its far edge */}
        <clipPath id={`${id}-cavclip`}>
          <ellipse cx={CAV.cx} cy={CAV.cy} rx={CAV.rx + 2} ry={CAV.ry + 2} />
          <path d={dome} />
        </clipPath>
        <SurfaceFilter id={`${id}-surf`} seed={seed} displace={9} />
      </defs>
      <g clipPath={`url(#${id}-cavclip)`}>
        <g filter={`url(#${id}-surf)`}>
          <ellipse
            cx="200"
            cy="240"
            rx="136"
            ry="42"
            fill={`url(#${id}-bed)`}
          />
        </g>
        <WallRing id={id} />
        <g filter={`url(#${id}-surf)`}>
          <path d={dome} fill={`url(#${id}-dome)`} />
          {/* soft clumps and hollows */}
          <g filter={`url(#${id}-soft)`}>
            {clumps.map((c, i) => (
              <ellipse
                key={i}
                cx={f(c.x)}
                cy={f(c.y)}
                rx={f(c.rx)}
                ry={f(c.ry)}
                fill={c.light ? hi : lo}
                opacity={c.light ? 0.5 : 0.42}
              />
            ))}
          </g>
        </g>
      </g>
      <HeapLight id={id} ring={false} />
      {/* dusting on the rim and the table */}
      {specks.map((s, i) => (
        <circle
          key={i}
          cx={f(s.x)}
          cy={f(s.y)}
          r={f(s.s)}
          fill={s.s > 2 ? lo : primary}
          opacity="0.7"
        />
      ))}
      <ellipse
        cx="136"
        cy="212"
        rx="26"
        ry="6"
        fill={primary}
        opacity="0.35"
        filter={`url(#${id}-soft)`}
      />
    </g>
  );
}

type Pt = { x: number; y: number; a: number; s: number; t: number };

/**
 * Whole goods share one construction: a dark bed of pieces behind, a blurred cast-shadow
 * layer, then the lit pieces — each drawn by `piece(q, colour)`.
 */
function Pieces({
  p,
  id,
  n,
  back,
  seedKey,
  piece,
  shadow,
  rx = 124,
  ry = 38,
  grain = 0.2,
  mottle = 0.3,
}: {
  p: Product;
  id: string;
  n: number;
  back: number;
  seedKey: string;
  piece: (q: Pt, fill: string, i: number) => React.JSX.Element;
  shadow: (q: Pt, i: number) => React.JSX.Element;
  rx?: number;
  ry?: number;
  grain?: number;
  mottle?: number;
}) {
  const { primary, secondary } = p.colourWorld;
  const shade = darken(mix(primary, secondary, 0.5), 0.15);
  const tint = lighten(primary, 0.16);
  const deep = darken(secondary, 0.5);
  const seed = seedOf(p.slug);
  const front = scatter(p.slug + seedKey, n, rx, ry, 200, 228);
  const rear = scatter(
    p.slug + seedKey + "-back",
    back,
    rx + 4,
    ry + 3,
    200,
    230,
  );
  const colour = (t: number) =>
    t < 0.18
      ? shade
      : t < 0.62
        ? primary
        : t < 0.9
          ? tint
          : lighten(primary, 0.3);
  return (
    <g>
      <defs>
        <radialGradient
          id={`${id}-bed`}
          gradientUnits="userSpaceOnUse"
          cx="200"
          cy="234"
          r="140"
        >
          <stop offset="0" stopColor={shade} />
          <stop offset="1" stopColor={deep} />
        </radialGradient>
        <clipPath id={`${id}-cavclip`}>
          <ellipse
            cx={CAV.cx}
            cy={CAV.cy - 4}
            rx={CAV.rx + 2}
            ry={CAV.ry + 6}
          />
        </clipPath>
        <filter id={`${id}-cast`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
        <SurfaceFilter
          id={`${id}-surf`}
          seed={seed}
          grain={grain}
          mottle={mottle}
        />
      </defs>
      <g clipPath={`url(#${id}-cavclip)`}>
        <g filter={`url(#${id}-surf)`}>
          <ellipse
            cx="200"
            cy="236"
            rx="136"
            ry="42"
            fill={`url(#${id}-bed)`}
          />
          {/* pieces in shadow underneath */}
          <g opacity="0.85">
            {rear.map((q, i) => piece(q, darken(shade, 0.25), i))}
          </g>
          {/* cast shadows of the lit layer */}
          <g fill="#000" opacity="0.4" filter={`url(#${id}-cast)`}>
            {front.map((q, i) => shadow(q, i))}
          </g>
          {front.map((q, i) => piece(q, colour(q.t), i))}
        </g>
      </g>
      <HeapLight id={id} />
    </g>
  );
}

const T = (q: Pt, dx = 0, dy = 0, sm = 1) =>
  `translate(${f(q.x + dx)} ${f(q.y + dy)}) rotate(${f(q.a)}) scale(${f(q.s * sm)})`;

function Seeds({ p, id }: { p: Product; id: string }) {
  const { primary, secondary } = p.colourWorld;
  const kind = p.slug.includes("chilli")
    ? "chilli"
    : p.slug.includes("turmeric")
      ? "finger"
      : p.slug.includes("coriander")
        ? "round"
        : "cumin";
  const edge = darken(mix(primary, secondary, 0.6), 0.3);

  if (kind === "chilli") {
    // dried pod: tapered, slightly curved, glossy skin, olive stem cap
    const pod =
      "M -22 0 C -16 -8, 4 -9, 16 -5 C 20 -4, 23 -1, 22 1 C 20 5, 4 7, -12 5 C -18 4, -22 3, -22 0 Z";
    return (
      <Pieces
        p={p}
        id={id}
        n={44}
        back={26}
        seedKey="-pods"
        grain={0.14}
        shadow={(q, i) => (
          <path key={i} d={pod} transform={T(q, 1.8, 2.6, 1.25)} />
        )}
        piece={(q, fill, i) => (
          <g key={i} transform={T(q, 0, 0, 1.25)}>
            <path d={pod} fill={fill} stroke={edge} strokeWidth="0.7" />
            <path
              d="M -14 -3.5 C -4 -6.5, 8 -6.2, 15 -3.2"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.28"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M -21 0 c -3 -2.4 -6.5 -3 -8.5 -1 c 1.2 2.2 4.5 3.2 8.5 2.6 z"
              fill="#5f6a2f"
            />
          </g>
        )}
      />
    );
  }
  if (kind === "finger") {
    // knobby rhizome with darker joints and a lit ridge
    const finger =
      "M -13 -3 c 3 -6 9 -7 14 -4 c 5 1 9 4 11 8 c 1 4 -2 7 -6 7 c -6 1 -13 0 -18 -2 c -4 -2 -4 -6 -1 -9 z";
    return (
      <Pieces
        p={p}
        id={id}
        n={30}
        back={18}
        seedKey="-fingers"
        grain={0.3}
        shadow={(q, i) => (
          <path key={i} d={finger} transform={T(q, 1.8, 2.6, 1.15)} />
        )}
        piece={(q, fill, i) => (
          <g key={i} transform={T(q, 0, 0, 1.15)}>
            <path d={finger} fill={fill} stroke={edge} strokeWidth="0.8" />
            <path
              d="M -9 -4 c 4 -3 9 -3 13 -1"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.22"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M -2 -6 c 0 4 0 8 -1 12 M 6 -4 c 0 4 0 7 -1 10"
              fill="none"
              stroke={edge}
              strokeOpacity="0.5"
              strokeWidth="0.7"
            />
          </g>
        )}
      />
    );
  }
  if (kind === "round") {
    // ribbed spheres: body, ridge lines, one specular dot up-left
    return (
      <Pieces
        p={p}
        id={id}
        n={330}
        back={200}
        seedKey="-round"
        shadow={(q, i) => (
          <circle key={i} cx={f(q.x + 1.4)} cy={f(q.y + 2)} r={f(4.4 * q.s)} />
        )}
        piece={(q, fill, i) => (
          <g key={i} transform={T(q)}>
            <circle r="4.4" fill={fill} stroke={edge} strokeWidth="0.5" />
            <path
              d="M 0 -4 C 1.2 -1.8, 1.2 1.8, 0 4 M -2 -3.5 C -0.8 -1.2, -0.8 1.2, -2 3.5"
              fill="none"
              stroke={edge}
              strokeOpacity="0.55"
              strokeWidth="0.45"
            />
            <circle cx="-1.4" cy="-1.5" r="1.1" fill="#fff" fillOpacity="0.4" />
          </g>
        )}
      />
    );
  }
  // cumin: slender ridged seeds
  return (
    <Pieces
      p={p}
      id={id}
      n={640}
      back={340}
      seedKey="-cumin"
      shadow={(q, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="0"
          rx="6.4"
          ry="1.9"
          transform={T(q, 1.2, 1.8, 1.1)}
        />
      )}
      piece={(q, fill, i) => (
        <g key={i} transform={T(q, 0, 0, 1.1)}>
          <ellipse rx="6.4" ry="1.9" fill={fill} />
          <path
            d="M -4.6 0 L 4.6 0"
            stroke={edge}
            strokeOpacity="0.6"
            strokeWidth="0.45"
          />
          <path
            d="M -3.6 -0.9 L 3.2 -0.9"
            stroke="#fff"
            strokeOpacity="0.28"
            strokeWidth="0.5"
          />
        </g>
      )}
    />
  );
}

function Flakes({ p, id }: { p: Product; id: string }) {
  const { primary, secondary } = p.colourWorld;
  const edge = darken(mix(primary, secondary, 0.6), 0.25);
  // slightly irregular, semi-translucent kibbles
  const flake = "M -5 -3 L 5 -3.6 L 5.6 2.8 L -4.4 3.6 Z";
  return (
    <Pieces
      p={p}
      id={id}
      n={290}
      back={160}
      seedKey="-flakes"
      grain={0.22}
      shadow={(q, i) => (
        <path key={i} d={flake} transform={T(q, 1.4, 2.2, 1.2)} />
      )}
      piece={(q, fill, i) => (
        <g key={i} transform={T(q, 0, 0, 1.2)}>
          <path
            d={flake}
            fill={fill}
            fillOpacity="0.94"
            stroke={edge}
            strokeWidth="0.5"
          />
          <path
            d="M -3.6 -1.6 L 3.4 -2"
            stroke="#fff"
            strokeOpacity="0.3"
            strokeWidth="0.8"
          />
        </g>
      )}
    />
  );
}

function Grains({ p, id }: { p: Product; id: string }) {
  const { primary, secondary } = p.colourWorld;
  const edge = darken(mix(primary, secondary, 0.6), 0.2);
  return (
    <Pieces
      p={p}
      id={id}
      n={520}
      back={300}
      seedKey="-grains"
      grain={0.14}
      mottle={0.22}
      shadow={(q, i) => (
        <ellipse key={i} rx="7" ry="1.6" transform={T(q, 1.2, 1.8)} />
      )}
      piece={(q, fill, i) => (
        <g key={i} transform={T(q)}>
          <ellipse
            rx="7"
            ry="1.6"
            fill={fill}
            stroke={edge}
            strokeWidth="0.35"
          />
          <path
            d="M -4.5 -0.6 L 4 -0.6"
            stroke="#fff"
            strokeOpacity="0.45"
            strokeWidth="0.6"
            strokeLinecap="round"
          />
        </g>
      )}
    />
  );
}

function Curls({ p, id }: { p: Product; id: string }) {
  const { primary, secondary } = p.colourWorld;
  const edge = darken(mix(primary, secondary, 0.5), 0.35);
  const curl = "M -9 4 c 6 -10 14 -10 18 -2 c 4 8 -2 14 -10 12";
  return (
    <Pieces
      p={p}
      id={id}
      n={130}
      back={70}
      seedKey="-curls"
      grain={0.3}
      shadow={(q, i) => (
        <path
          key={i}
          d={curl}
          fill="none"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
          transform={T(q, 1.6, 2.4)}
        />
      )}
      piece={(q, fill, i) => (
        <g key={i} transform={T(q)}>
          <path
            d={curl}
            fill="none"
            stroke={edge}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
          <path
            d={curl}
            fill="none"
            stroke={fill}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M -6 0 c 4 -5 9 -5 12 -1"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.3"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      )}
    />
  );
}

const CONTENT: Record<
  ProductForm,
  (props: { p: Product; id: string }) => React.JSX.Element
> = {
  powder: Heap,
  whole: Seeds,
  flakes: Flakes,
  grain: Grains,
  fried: Curls,
};

/* ── the bowl ────────────────────────────────────────────────────────────── */

export function ProductBowl({
  product,
  className = "",
  decorative = true,
  id: idProp,
  ...rest
}: {
  product: Product;
  className?: string;
  decorative?: boolean;
  id?: string;
} & Record<`data-${string}`, string | boolean | undefined>) {
  const id = idProp ?? `bowl-${product.slug}`;
  const Content = CONTENT[product.form];
  const seed = seedOf(product.slug);
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
        <filter id={`${id}-soft`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter
          id={`${id}-ground`}
          x="-20%"
          y="-50%"
          width="140%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="9" />
        </filter>
        {/* matte stone: speckle overlaid into the shape */}
        <filter
          id={`${id}-stone`}
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            seed={seed + 9}
            result="n"
          />
          <feColorMatrix
            in="n"
            type="matrix"
            values={greyAlpha(0.2)}
            result="g"
          />
          <feBlend in="g" in2="SourceGraphic" mode="overlay" result="b" />
          <feComposite in="b" in2="SourceGraphic" operator="in" />
        </filter>
        {/* key light top-left: body, bevelled rim, far wall */}
        <linearGradient id={`${id}-body`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#3d352e" />
          <stop offset="0.45" stopColor="#1a1612" />
          <stop offset="1" stopColor="#070605" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a5047" />
          <stop offset="0.5" stopColor="#2a2420" />
          <stop offset="1" stopColor="#14110e" />
        </linearGradient>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e2823" />
          <stop offset="0.55" stopColor="#100d0b" />
          <stop offset="1" stopColor="#070605" />
        </linearGradient>
      </defs>

      {/* ground: wide soft shadow offset down-right, tighter contact shadow */}
      <ellipse
        cx="208"
        cy="304"
        rx="172"
        ry="38"
        fill="#000"
        opacity="0.42"
        filter={`url(#${id}-ground)`}
      />
      <ellipse
        cx="200"
        cy="302"
        rx="150"
        ry="24"
        fill="#000"
        opacity="0.35"
        filter={`url(#${id}-soft)`}
      />

      {/* bowl body */}
      <path
        d="M 44 236 C 44 300, 108 328, 200 328 C 292 328, 356 300, 356 236 Z"
        fill={`url(#${id}-body)`}
        filter={`url(#${id}-stone)`}
      />
      {/* ceramic sheen on the lit side */}
      <ellipse
        cx="112"
        cy="266"
        rx="56"
        ry="26"
        fill="#fff"
        opacity="0.06"
        filter={`url(#${id}-soft)`}
      />
      {/* rim, bevelled */}
      <ellipse
        cx="200"
        cy="236"
        rx="156"
        ry="50"
        fill={`url(#${id}-rim)`}
        filter={`url(#${id}-stone)`}
      />
      <ellipse
        cx="200"
        cy="237"
        rx="146"
        ry="46"
        fill="#0c0a08"
        opacity="0.55"
      />
      {/* far inner wall */}
      <ellipse cx="200" cy="238" rx="136" ry="42" fill={`url(#${id}-wall)`} />

      {/* rim speculars: soft glow and a crisp line, both top-left */}
      <path
        d="M 56 230 C 90 198, 146 186, 200 186 C 236 186, 274 191, 306 202"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.16"
        strokeWidth="5"
        strokeLinecap="round"
        filter={`url(#${id}-soft)`}
      />
      <path
        d="M 60 228 C 94 198, 148 188, 200 188 C 234 188, 268 192, 298 202"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* contents */}
      <Content p={product} id={id} />

      {/* front lip — hides the base of whatever sits in the bowl */}
      <path
        d="M 44 236 C 44 262, 108 286, 200 286 C 292 286, 356 262, 356 236 C 356 250, 292 268, 200 268 C 108 268, 44 250, 44 236 Z"
        fill={`url(#${id}-rim)`}
        filter={`url(#${id}-stone)`}
      />
      {/* inner lip shadow on the contents' front edge */}
      <path
        d="M 64 246 C 100 262, 150 270, 200 270 C 250 270, 300 262, 336 246"
        fill="none"
        stroke="#000"
        strokeOpacity="0.35"
        strokeWidth="6"
        filter={`url(#${id}-soft)`}
      />
    </svg>
  );
}
