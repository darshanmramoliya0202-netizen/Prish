/**
 * Five code-drawn journey scenes (risograph-flat, limited palette). Each scene is an SVG
 * with three layers tagged data-layer="bg|mid|fg" so the scrub can parallax them.
 * viewBox 1200×700. Palette: forest, cream, gold + the scene's accent.
 */
import type { SVGProps } from "react";

const F950 = "#06231a";
const F900 = "#0b3d2e";
const F700 = "#145a3a";
const F500 = "#1f7a4d";
const CREAM = "#f6f1e4";
const GOLD = "#d4a24c";
const GOLD3 = "#eccf8a";
const SOIL = "#3a2a1c";
const SOIL2 = "#5a4330";

type P = SVGProps<SVGSVGElement> & { className?: string };
const frame = (p: P, label: string) => ({
  viewBox: "0 0 1200 700",
  preserveAspectRatio: "xMidYMid slice",
  role: "img",
  "aria-label": label,
  ...p,
});

/* rows of a ploughed field, curving toward a vanishing point */
function FieldRows({
  y0 = 420,
  n = 9,
  color = SOIL2,
  opacity = 0.9,
}: {
  y0?: number;
  n?: number;
  color?: string;
  opacity?: number;
}) {
  const rows = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const y = y0 + t * t * 280;
    const bulge = 40 + t * 140;
    return (
      <path
        key={i}
        d={`M -50 ${y} Q 600 ${y - bulge} 1250 ${y}`}
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={2 + t * 6}
        fill="none"
      />
    );
  });
  return <g>{rows}</g>;
}

function Tree({
  x,
  y,
  s = 1,
  color = F950,
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={color}>
      <rect x="-6" y="-10" width="12" height="70" rx="3" />
      <ellipse cx="0" cy="-40" rx="70" ry="42" />
      <ellipse cx="-38" cy="-20" rx="40" ry="26" />
      <ellipse cx="42" cy="-24" rx="44" ry="28" />
    </g>
  );
}

/* 01 — Soil & seed: Saurashtra at dawn */
export function SceneSoil(p: P) {
  return (
    <svg
      {...frame(
        p,
        "Illustration of a ploughed Saurashtra field at dawn with a neem tree",
      )}
    >
      <defs>
        <linearGradient id="sc1-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={F950} />
          <stop offset="0.55" stopColor={F900} />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="sc1-soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SOIL2} />
          <stop offset="1" stopColor={SOIL} />
        </linearGradient>
      </defs>
      <g data-layer="bg">
        <rect width="1200" height="700" fill="url(#sc1-sky)" />
        <circle cx="900" cy="392" r="120" fill={GOLD3} opacity="0.9" />
        <rect y="392" width="1200" height="308" fill="url(#sc1-soil)" />
        <path d="M0 392 Q 300 372 600 390 T 1200 392 V 420 H 0 Z" fill={F700} />
      </g>
      <g data-layer="mid">
        <FieldRows />
        <Tree x={210} y={380} s={1.1} />
        <Tree x={1010} y={392} s={0.7} />
      </g>
      <g data-layer="fg">
        {/* the seed, close */}
        <g transform="translate(600 560)">
          <ellipse cx="0" cy="40" rx="150" ry="26" fill={F950} opacity="0.35" />
          <ellipse
            cx="0"
            cy="0"
            rx="96"
            ry="40"
            fill={GOLD}
            transform="rotate(-12)"
          />
          <path
            d="M-60 -6 Q 0 -30 62 -2"
            stroke={GOLD3}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-12)"
          />
        </g>
      </g>
    </svg>
  );
}

/* 02 — Harvest: hands, crop, sack */
export function SceneHarvest(p: P) {
  return (
    <svg
      {...frame(
        p,
        "Illustration of harvest: cupped hands lifting seeds above a filled sack",
      )}
    >
      <defs>
        <linearGradient id="sc2-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={F900} />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <g data-layer="bg">
        <rect width="1200" height="700" fill="url(#sc2-sky)" />
        <circle cx="260" cy="150" r="90" fill={GOLD3} />
        <rect y="400" width="1200" height="300" fill={SOIL} />
        <FieldRows y0={410} n={7} color={SOIL2} />
      </g>
      <g data-layer="mid">
        {/* sack */}
        <g transform="translate(880 470)">
          <path
            d="M-110 0 Q -120 190 -80 210 L 80 210 Q 120 190 110 0 Z"
            fill={CREAM}
          />
          <path
            d="M-110 0 Q 0 40 110 0"
            fill="none"
            stroke={SOIL2}
            strokeWidth="6"
          />
          <ellipse cx="0" cy="-6" rx="96" ry="30" fill={GOLD} />
          <path
            d="M-70 60 H 70 M-64 100 H 64"
            stroke={SOIL2}
            strokeWidth="3"
            strokeDasharray="10 8"
          />
        </g>
      </g>
      <g data-layer="fg">
        {/* cupped hands, line art, cream */}
        <g
          transform="translate(430 470)"
          fill="none"
          stroke={CREAM}
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M-190 -20 C -200 40, -160 110, -80 130 C -30 142, 30 142, 80 130 C 160 110, 200 40, 190 -20" />
          <path d="M-190 -20 C -170 -60, -120 -70, -90 -40 M-90 -40 C -60 -80, -10 -86, 10 -50 M10 -50 C 40 -86, 100 -80, 120 -40 M120 -40 C 150 -70, 180 -60, 190 -20" />
          <path
            d="M-140 30 C -100 10, -60 10, -20 30 M20 30 C 60 10, 100 10, 140 30"
            strokeWidth="4"
            opacity="0.6"
          />
        </g>
        {/* seeds in the hands */}
        <g fill={GOLD}>
          {Array.from({ length: 34 }, (_, i) => {
            const a = (i / 34) * Math.PI * 2;
            const r = 30 + (i % 5) * 18;
            return (
              <ellipse
                key={i}
                cx={430 + Math.cos(a) * r * 2.2}
                cy={440 + Math.sin(a) * r * 0.55}
                rx="9"
                ry="4"
                transform={`rotate(${(i * 37) % 180} ${430 + Math.cos(a) * r * 2.2} ${440 + Math.sin(a) * r * 0.55})`}
              />
            );
          })}
        </g>
      </g>
    </svg>
  );
}

/* 03 — Sun & drying: sun dial over drying trays */
export function SceneSun(p: P) {
  const rays = Array.from({ length: 24 }, (_, i) => (i / 24) * 360);
  return (
    <svg
      {...frame(
        p,
        "Illustration of a large sun over rows of drying trays of coloured powders",
      )}
    >
      <defs>
        <linearGradient id="sc3-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GOLD3} />
          <stop offset="1" stopColor={GOLD} />
        </linearGradient>
      </defs>
      <g data-layer="bg">
        <rect width="1200" height="700" fill="url(#sc3-sky)" />
        <g transform="translate(600 250)" data-sun>
          {rays.map((a) => (
            <line
              key={a}
              x1="0"
              y1="-170"
              x2="0"
              y2="-215"
              stroke={F900}
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${a})`}
              opacity="0.55"
            />
          ))}
          <circle r="150" fill={F900} />
          <circle r="120" fill={GOLD3} />
          <text
            y="14"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="64"
            fill={F900}
            fontWeight="600"
          >
            280+
          </text>
          <text
            y="48"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="18"
            fill={F900}
            letterSpacing="4"
          >
            SUNSHINE DAYS
          </text>
        </g>
      </g>
      <g data-layer="mid">
        <rect y="470" width="1200" height="230" fill={F900} />
        {/* drying trays in perspective */}
        {[
          ["#e0a106", 120],
          ["#a5133f", 420],
          ["#3f1a36", 720],
          ["#c4341f", 1020],
        ].map(([c, x], i) => (
          <g key={i} transform={`translate(${x} 520)`}>
            <path d="M-120 0 L 120 0 L 150 80 L -150 80 Z" fill={CREAM} />
            <path
              d="M-104 12 L 104 12 L 128 68 L -128 68 Z"
              fill={c as string}
            />
          </g>
        ))}
      </g>
      <g data-layer="fg">
        <path d="M0 640 Q 600 600 1200 640 V 700 H 0 Z" fill={F950} />
      </g>
    </svg>
  );
}

/* 04 — Milling & packing: mound → drum, bag, box */
export function SceneMill(p: P) {
  return (
    <svg
      {...frame(
        p,
        "Illustration of a powder mound beside a fibre drum, an export bag and a bulk box",
      )}
    >
      <g data-layer="bg">
        <rect width="1200" height="700" fill={CREAM} />
        <rect y="470" width="1200" height="230" fill={F900} />
        <circle cx="600" cy="320" r="260" fill={GOLD3} opacity="0.5" />
      </g>
      <g data-layer="mid">
        {/* mound */}
        <path
          d="M120 470 C 200 380, 300 330, 360 330 C 420 330, 520 380, 600 470 Z"
          fill="#e0a106"
        />
        <path
          d="M280 372 C 320 350, 380 344, 430 356"
          stroke={GOLD3}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* fibre drum */}
        <g transform="translate(760 470)">
          <path d="M-80 -200 L 80 -200 L 80 0 L -80 0 Z" fill={GOLD} />
          <ellipse cx="0" cy="-200" rx="80" ry="22" fill={GOLD3} />
          <ellipse cx="0" cy="0" rx="80" ry="22" fill="#b8862f" />
          <path
            d="M-80 -150 H 80 M-80 -60 H 80"
            stroke={F900}
            strokeWidth="5"
            opacity="0.5"
          />
        </g>
        {/* HDPE bag */}
        <g transform="translate(960 470)">
          <path
            d="M-90 0 L -84 -180 Q 0 -230 84 -180 L 90 0 Z"
            fill={CREAM}
            stroke={F900}
            strokeWidth="4"
          />
          <rect x="-46" y="-130" width="92" height="60" rx="6" fill={F900} />
          <text
            x="0"
            y="-92"
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="18"
            fill={CREAM}
            letterSpacing="3"
          >
            LOT
          </text>
        </g>
        {/* bulk box */}
        <g transform="translate(1110 470)">
          <path d="M-70 0 L -70 -120 L 40 -150 L 40 -30 Z" fill="#c9862b" />
          <path d="M-70 -120 L 0 -160 L 110 -130 L 40 -150 Z" fill="#e2a24a" />
          <path d="M40 -150 L 110 -130 L 110 -10 L 40 -30 Z" fill="#9c6318" />
        </g>
      </g>
      <g data-layer="fg">
        <path d="M0 660 H 1200 V 700 H 0 Z" fill={F950} />
      </g>
    </svg>
  );
}

/* 05 — The Gujarat coast: cranes and a container ship */
export function SceneCoast(p: P) {
  const boxes = [
    "#e0a106",
    "#a5133f",
    "#145a3a",
    "#c4341f",
    "#3f1a36",
    "#d4a24c",
  ];
  return (
    <svg
      {...frame(
        p,
        "Illustration of a container ship leaving a coast with port cranes at dusk",
      )}
    >
      <defs>
        <linearGradient id="sc5-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={F950} />
          <stop offset="0.7" stopColor={F700} />
          <stop offset="1" stopColor={GOLD} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="sc5-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={F500} />
          <stop offset="1" stopColor={F950} />
        </linearGradient>
      </defs>
      <g data-layer="bg">
        <rect width="1200" height="700" fill="url(#sc5-sky)" />
        <circle cx="980" cy="410" r="70" fill={GOLD3} />
        <rect y="430" width="1200" height="270" fill="url(#sc5-sea)" />
        {/* cranes */}
        {[140, 300, 460].map((x) => (
          <g key={x} fill={F950} transform={`translate(${x} 430)`}>
            <rect x="-8" y="-260" width="16" height="260" />
            <rect x="-90" y="-270" width="240" height="14" />
            <rect x="-30" y="-300" width="60" height="30" />
            <path d="M8 -260 L 140 -270" stroke={F950} strokeWidth="6" />
          </g>
        ))}
      </g>
      <g data-layer="mid">
        {/* ship */}
        <g transform="translate(720 470)" data-ship>
          <path d="M-260 0 L 280 0 L 240 70 L -220 70 Z" fill={F950} />
          <rect x="140" y="-110" width="90" height="110" fill={CREAM} />
          <rect x="150" y="-98" width="70" height="12" fill={F900} />
          {boxes.map((c, i) => (
            <g key={i}>
              <rect x={-240 + i * 60} y="-44" width="54" height="44" fill={c} />
              <rect
                x={-240 + i * 60}
                y="-92"
                width="54"
                height="44"
                fill={boxes[(i + 3) % 6]}
                opacity="0.9"
              />
            </g>
          ))}
        </g>
      </g>
      <g data-layer="fg">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M-60 ${560 + i * 40} Q 200 ${540 + i * 40} 460 ${560 + i * 40} T 980 ${560 + i * 40} T 1500 ${560 + i * 40}`}
            fill="none"
            stroke={CREAM}
            strokeOpacity={0.25 - i * 0.06}
            strokeWidth="3"
          />
        ))}
      </g>
    </svg>
  );
}
