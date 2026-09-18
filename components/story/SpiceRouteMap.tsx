import map from "@/content/generated/spice-route-map.json";

const LABELS: Record<string, string> = {
  lothal: "Lothal · c. 2400 BCE",
  bharuch: "Barygaza (Bharuch)",
  muziris: "Muziris · Malabar",
  aden: "Aden",
  alexandria: "Alexandria",
  rome: "Rome",
  rajkot: "Rajkot · today",
};

/** The ancient Arabian-Sea spice route, pre-projected at build. Ornamented, dotted, sourced in the copy beside it. */
export function SpiceRouteMap({ className = "" }: { className?: string }) {
  const places = map.places as unknown as Record<string, [number, number]>;
  return (
    <svg
      viewBox={`0 0 ${map.width} ${map.height}`}
      className={className}
      role="img"
      aria-label="Map of the ancient spice route from Gujarat and Malabar to Aden, Alexandria and Rome"
    >
      <path
        d={map.land}
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="0.8"
      />
      {map.arcs.map((a) => (
        <path
          key={`${a.from}-${a.to}`}
          d={a.d}
          fill="none"
          stroke="#d4a24c"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
          data-route
        />
      ))}
      {Object.entries(places).map(([k, [x, y]]) => (
        <g key={k} transform={`translate(${x} ${y})`}>
          <circle
            r={k === "rajkot" ? 5 : 4}
            fill={k === "rajkot" ? "#fbf8f1" : "#d4a24c"}
            stroke="#06231a"
            strokeWidth="1.5"
          />
          <text
            x="9"
            y="4"
            fontSize="14"
            fontFamily="var(--font-sans)"
            fontWeight="600"
            fill="currentColor"
          >
            {LABELS[k]}
          </text>
        </g>
      ))}
      <text
        x="24"
        y={map.height - 20}
        fontSize="13"
        fontFamily="var(--font-display)"
        fontStyle="italic"
        fill="currentColor"
        opacity="0.7"
      >
        Monsoon routes of the Periplus, first century CE — schematic.
      </text>
    </svg>
  );
}
