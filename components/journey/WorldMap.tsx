import map from "@/content/generated/world-map.json";
import { regions } from "@/content/regions";
import type { RegionId } from "@/content/types";

/**
 * The world, pre-projected at build (Natural Earth) with great-circle arcs from Rajkot
 * to the four export regions. Pure SVG — no runtime d3. Arcs carry data attributes so
 * the journey scrub and the region store can animate/highlight them.
 */
export function WorldMap({
  className = "",
  highlight,
  showLabels = true,
}: {
  className?: string;
  highlight?: RegionId | null;
  showLabels?: boolean;
}) {
  const [rx, ry] = map.rajkot as [number, number];
  return (
    <svg
      viewBox={`0 0 ${map.width} ${map.height}`}
      className={className}
      role="img"
      aria-label="Map of export routes from Rajkot to the United States, European Union, GCC and Southeast Asia"
      data-worldmap
    >
      <defs>
        <radialGradient id="wm-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d4a24c" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d4a24c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d={map.land}
        fill="currentColor"
        fillOpacity="0.14"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="0.6"
      />
      {regions.map((r) => {
        const d = (map.arcs as Record<string, string>)[r.id];
        const [tx, ty] = (
          map.targets as unknown as Record<string, [number, number]>
        )[r.id]!;
        const on = highlight === r.id;
        return (
          <g key={r.id} data-arc={r.id} data-on={on || undefined}>
            <path
              d={d}
              fill="none"
              stroke="#d4a24c"
              strokeWidth={on ? 3 : 1.6}
              strokeOpacity={on ? 1 : 0.7}
              strokeLinecap="round"
              pathLength={1}
              data-arc-path
            />
            <circle
              cx={tx}
              cy={ty}
              r={on ? 7 : 5}
              fill="#d4a24c"
              data-arc-end
            />
            {showLabels ? (
              <text
                x={tx}
                y={ty - 14}
                textAnchor="middle"
                fontSize="18"
                fontFamily="var(--font-sans)"
                fontWeight="600"
                fill="currentColor"
                opacity={on ? 1 : 0.85}
              >
                {r.short}
              </text>
            ) : null}
          </g>
        );
      })}
      {/* Rajkot */}
      <circle cx={rx} cy={ry} r="26" fill="url(#wm-pulse)" data-rajkot-pulse />
      <circle
        cx={rx}
        cy={ry}
        r="6"
        fill="#d4a24c"
        stroke="#06231a"
        strokeWidth="2"
      />
      {showLabels ? (
        <text
          x={rx}
          y={ry + 32}
          textAnchor="middle"
          fontSize="18"
          fontFamily="var(--font-sans)"
          fontWeight="700"
          fill="currentColor"
        >
          Rajkot
        </text>
      ) : null}
    </svg>
  );
}
