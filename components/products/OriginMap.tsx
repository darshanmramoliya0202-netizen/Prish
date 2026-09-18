import india from "@/content/generated/india-map.json";
import { placeFor } from "@/content/india-places";
import { site } from "@/content/site";

/** Mercator projection with the build-time parameters (no runtime d3). */
function project([lng, lat]: [number, number]): [number, number] {
  const k = india.scale;
  const [tx, ty] = india.translate as [number, number];
  const lam = (lng * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const y = Math.log(Math.tan(Math.PI / 4 + phi / 2));
  return [k * lam + tx, -k * y + ty];
}

/** Inline India map with the product's growing belts pinned; Rajkot marked as home. */
export function OriginMap({
  origins,
  accent = "#d4a24c",
  className = "",
}: {
  origins: string[];
  accent?: string;
  className?: string;
}) {
  const pins = origins
    .map((o) => ({ label: o, place: placeFor(o) }))
    .filter(
      (
        p,
      ): p is {
        label: string;
        place: NonNullable<ReturnType<typeof placeFor>>;
      } => !!p.place,
    );
  const [hx, hy] = project(site.coords);
  return (
    <svg
      viewBox={`0 0 ${india.width} ${india.height}`}
      className={className}
      role="img"
      aria-label={`Map of India showing growing regions: ${origins.join(", ")}`}
    >
      <path
        d={india.path}
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {pins.map(({ label, place }, i) => {
        const [x, y] = project(place.coords);
        return (
          <g
            key={label + i}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
          >
            <circle r="16" fill={accent} fillOpacity="0.25" />
            <circle r="6" fill={accent} stroke="#06231a" strokeWidth="1.5" />
            <text
              x="12"
              y="5"
              fontSize="15"
              fontFamily="var(--font-sans)"
              fontWeight="600"
              fill="currentColor"
            >
              {place.name.split(",")[0]}
            </text>
          </g>
        );
      })}
      <g transform={`translate(${hx.toFixed(1)} ${hy.toFixed(1)})`}>
        <circle r="5" fill="#f6f1e4" stroke="#06231a" strokeWidth="1.5" />
        <text
          x="-10"
          y="20"
          fontSize="13"
          fontFamily="var(--font-sans)"
          fontWeight="700"
          fill="currentColor"
        >
          Rajkot
        </text>
      </g>
    </svg>
  );
}
