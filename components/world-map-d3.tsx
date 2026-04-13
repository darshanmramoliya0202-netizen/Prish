"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

// ─── Destination markets ───────────────────────────────────────────────────
const destinations = [
  { id: "usa",       name: "United States",    region: "North America", lat: 38,    lng: -97,   focus: "Premium botanical, supplement, and formulation-led ingredient programs.", products: ["Jamun Powder", "Sea Buckthorn", "Turmeric"] },
  { id: "eu",        name: "European Union",   region: "Europe",        lat: 51,    lng: 10,    focus: "Documentation-sensitive buyers prioritising consistency and long-term supply.", products: ["Beetroot Powder", "Coriander", "Fennel"] },
  { id: "uk",        name: "United Kingdom",   region: "Europe",        lat: 51.5,  lng: -0.1,  focus: "Clean label and botanical ingredient programs for UK formulators.", products: ["Jamun Powder", "Turmeric", "Sea Buckthorn"] },
  { id: "gcc",       name: "GCC / UAE",        region: "Middle East",   lat: 24,    lng: 54,    focus: "Fast-moving food trade, dependable export handling and commercial responsiveness.", products: ["Cumin", "Coriander", "Red Chili"] },
  { id: "sea",       name: "Southeast Asia",   region: "Asia",          lat: 1.3,   lng: 103.8, focus: "Adaptable regional supply with practical packaging and shipment readiness.", products: ["Turmeric", "Chili", "Dehydrated Onion"] },
  { id: "japan",     name: "Japan",            region: "Asia",          lat: 35.7,  lng: 139.7, focus: "Rigorous quality standards; traceability documentation and spec compliance.", products: ["Turmeric", "Jamun Powder", "Beetroot"] },
  { id: "australia", name: "Australia",        region: "Oceania",       lat: -25,   lng: 133,   focus: "Growing demand for clean-label botanical and dehydrated ingredient categories.", products: ["Sea Buckthorn", "Jamun Powder", "Cumin"] },
  { id: "canada",    name: "Canada",           region: "North America", lat: 56,    lng: -106,  focus: "Supplement-grade botanical powders and traceable Indian origin ingredients.", products: ["Jamun Powder", "Beetroot Powder", "Turmeric"] },
  { id: "africa",    name: "East Africa",      region: "Africa",        lat: -1.3,  lng: 36.8,  focus: "Spice staples and dehydrated vegetables for food manufacturing.", products: ["Cumin", "Coriander", "Dehydrated Onion"] },
  { id: "brazil",    name: "South America",    region: "South America", lat: -14,   lng: -51,   focus: "Botanical powders and natural colorants for growing nutraceutical market.", products: ["Beetroot Powder", "Turmeric", "Jamun Powder"] },
] as const;

// India origin
const indiaOrigin = { lat: 20.5, lng: 78.9 };

// Width/height for viewBox
const W = 960;
const H = 500;

type Dest = typeof destinations[number];

function getArcPath(
  projection: d3.GeoProjection,
  from: [number, number],
  to: [number, number]
): string {
  const pathGen = d3.geoPath().projection(projection);
  const greatCircle: GeoJSON.Feature<GeoJSON.LineString> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: Array.from({ length: 80 }, (_, i) => {
        return d3.geoInterpolate(from, to)(i / 79) as [number, number];
      }),
    },
  };
  return pathGen(greatCircle) ?? "";
}

// Animated dot along a path
function TravellingDot({
  pathRef,
  delay,
  duration,
  color,
  reduceMotion,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  delay: number;
  duration: number;
  color: string;
  reduceMotion: boolean;
}) {
  const dotRef = useRef<SVGCircleElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = pathRef.current;
    const dot = dotRef.current;
    if (!el || !dot) return;

    let cancelled = false;
    const totalLength = el.getTotalLength();
    const delayMs = delay * 1000;
    const durationMs = duration * 1000;

    const animate = (ts: number) => {
      if (cancelled) return;
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current - delayMs;
      if (elapsed < 0) { rafRef.current = requestAnimationFrame(animate); return; }
      const progress = (elapsed % durationMs) / durationMs;
      const point = el.getPointAtLength(progress * totalLength);
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
      dot.setAttribute("opacity", progress > 0.85 ? String(1 - (progress - 0.85) / 0.15) : "1");
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [pathRef, delay, duration, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <circle
      ref={dotRef}
      r="3.5"
      fill="white"
      opacity="0"
      style={{ filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px ${color})` }}
    />
  );
}

// Single arc with travelling dot
function Arc({
  dest,
  projection,
  isActive,
  index,
  reduceMotion,
  onClick,
}: {
  dest: Dest;
  projection: d3.GeoProjection;
  isActive: boolean;
  index: number;
  reduceMotion: boolean;
  onClick: () => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const arcD = getArcPath(projection, [indiaOrigin.lng, indiaOrigin.lat], [dest.lng, dest.lat]);
  const proj = projection([dest.lng, dest.lat]);
  if (!arcD || !proj) return null;
  const [px, py] = proj;

  return (
    <g>
      {/* Arc path */}
      <path
        ref={pathRef}
        d={arcD}
        fill="none"
        stroke={isActive ? "rgba(212,145,10,0.85)" : "rgba(212,145,10,0.22)"}
        strokeWidth={isActive ? 1.8 : 0.9}
        strokeDasharray={isActive ? "none" : "5 4"}
        style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
      />
      {/* Travelling dot */}
      <TravellingDot
        pathRef={pathRef}
        delay={index * 0.7}
        duration={4.5 + index * 0.3}
        color="rgba(212,145,10,0.9)"
        reduceMotion={reduceMotion}
      />
      {/* Destination pin */}
      <g
        style={{ cursor: "pointer" }}
        onClick={onClick}
      >
        {/* Pulse ring */}
        {!reduceMotion && (
          <circle
            cx={px}
            cy={py}
            r={isActive ? 14 : 10}
            fill="none"
            stroke={isActive ? "rgba(212,145,10,0.5)" : "rgba(212,145,10,0.2)"}
            strokeWidth="1"
            style={{ transition: "r 0.4s, stroke 0.4s" }}
          >
            {!reduceMotion && (
              <animate
                attributeName="r"
                values={isActive ? "10;18;10" : "8;14;8"}
                dur={isActive ? "1.8s" : "2.8s"}
                repeatCount="indefinite"
              />
            )}
            {!reduceMotion && (
              <animate
                attributeName="opacity"
                values="0.6;0;0.6"
                dur={isActive ? "1.8s" : "2.8s"}
                repeatCount="indefinite"
              />
            )}
          </circle>
        )}
        <circle
          cx={px}
          cy={py}
          r={isActive ? 6 : 4.5}
          fill={isActive ? "rgba(212,145,10,0.95)" : "rgba(255,255,255,0.55)"}
          stroke={isActive ? "rgba(245,166,35,1)" : "rgba(255,255,255,0.4)"}
          strokeWidth="1.5"
          style={{ transition: "r 0.3s, fill 0.3s" }}
        />
      </g>
    </g>
  );
}

export default function WorldMapD3() {
  const [paths, setPaths] = useState<string[]>([]);
  const [indiaPath, setIndiaPath] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const projRef = useRef<d3.GeoProjection | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const activeDestination = destinations.find((d) => d.id === activeId) ?? null;

  useEffect(() => {
    fetch("/data/world-50m.json")
      .then((r) => r.json())
      .then((world: Topology) => {
        const projection = d3
          .geoNaturalEarth1()
          .scale(153)
          .translate([W / 2, H / 2]);
        projRef.current = projection;

        const pathGen = d3.geoPath().projection(projection);

        const countries = topojson.feature(
          world,
          world.objects.countries as GeometryCollection
        );

        const allPaths = (countries as GeoJSON.FeatureCollection).features.map(
          (f) => pathGen(f) ?? ""
        );
        setPaths(allPaths);

        // India numeric ID in Natural Earth = 356
        const indiaFeature = (countries as GeoJSON.FeatureCollection).features.find(
          (f) => f.id === 356 || (f.properties as Record<string,unknown>)?.["name"] === "India"
        );
        if (indiaFeature) setIndiaPath(pathGen(indiaFeature) ?? "");

        setMounted(true);
      })
      .catch(() => setMounted(true));
  }, []);

  const handleDestClick = useCallback((id: string) => {
    setActiveId(id);
    setPanelOpen(true);
  }, []);

  const indiaProj = projRef.current?.([indiaOrigin.lng, indiaOrigin.lat]);

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-leaf-dark shadow-[0_24px_80px_rgba(0,0,0,0.5)]" style={{ aspectRatio: "960/500" }}>

      {/* Ocean background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(22,46,30,0.6),rgba(26,46,26,0.95))]" />

      {/* Subtle grid lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.025]" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * (H / 20)} x2={W} y2={i * (H / 20)} stroke="white" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 36 }).map((_, i) => (
          <line key={`v${i}`} x1={i * (W / 36)} y1="0" x2={i * (W / 36)} y2={H} stroke="white" strokeWidth="0.5" />
        ))}
      </svg>

      {/* Main map SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Country fills */}
        {mounted && paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="rgba(255,255,255,0.055)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.4"
          />
        ))}

        {/* India highlighted */}
        {mounted && indiaPath && (
          <path
            d={indiaPath}
            fill="rgba(212,145,10,0.28)"
            stroke="rgba(212,145,10,0.85)"
            strokeWidth="1.2"
          />
        )}

        {/* Arcs + dots */}
        {mounted && projRef.current && destinations.map((dest, i) => (
          <Arc
            key={dest.id}
            dest={dest}
            projection={projRef.current!}
            isActive={activeId === dest.id}
            index={i}
            reduceMotion={reduceMotion}
            onClick={() => handleDestClick(dest.id)}
          />
        ))}

        {/* India origin marker */}
        {mounted && indiaProj && (
          <g>
            {/* Outer breathing ring */}
            {!reduceMotion && (
              <circle cx={indiaProj[0]} cy={indiaProj[1]} r="20" fill="none" stroke="rgba(212,145,10,0.3)" strokeWidth="1">
                <animate attributeName="r" values="16;26;16" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Inner ring */}
            {!reduceMotion && (
              <circle cx={indiaProj[0]} cy={indiaProj[1]} r="11" fill="none" stroke="rgba(212,145,10,0.5)" strokeWidth="1">
                <animate attributeName="r" values="10;17;10" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="2.2s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Gold glow */}
            <circle
              cx={indiaProj[0]}
              cy={indiaProj[1]}
              r="9"
              fill="rgba(212,145,10,0.18)"
              style={{ filter: "blur(4px)" }}
            />
            {/* Core dot */}
            <circle cx={indiaProj[0]} cy={indiaProj[1]} r="6" fill="rgba(212,145,10,0.95)" stroke="rgba(245,200,80,0.9)" strokeWidth="1.5" />
            <circle cx={indiaProj[0]} cy={indiaProj[1]} r="2.5" fill="white" />
            {/* Label */}
            <text x={indiaProj[0]} y={indiaProj[1] + 18} textAnchor="middle" fill="rgba(212,145,10,0.95)" fontSize="8.5" fontWeight="700" letterSpacing="2.5">INDIA</text>
            <text x={indiaProj[0]} y={indiaProj[1] + 28} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="6.5" letterSpacing="1.5">ORIGIN</text>
          </g>
        )}
      </svg>

      {/* Top overlay — section label + stat */}
      <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-saffron" style={{ animationDelay: "0s" }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Live export network</span>
        </div>
        <p className="mt-2 text-xs text-white/40">Click any destination to explore</p>
      </div>

      {/* Top-right stat pill */}
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right backdrop-blur-md">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-saffron/80">Reach</p>
          <p className="mt-1 font-serif text-2xl font-bold text-white">15+</p>
          <p className="text-[10px] text-white/50">Countries</p>
        </div>
      </div>

      {/* Bottom destination chips */}
      <div className="absolute inset-x-3 bottom-3 z-10 flex flex-wrap gap-1.5 sm:inset-x-5 sm:bottom-5 sm:gap-2">
        {destinations.map((dest) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => handleDestClick(dest.id)}
            className={`rounded-full border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition duration-200 sm:px-3.5 sm:py-2 sm:text-[11px] ${
              activeId === dest.id
                ? "border-saffron/70 bg-saffron/15 text-saffron"
                : "border-white/10 bg-white/5 text-white/45 hover:border-white/25 hover:text-white/80"
            }`}
          >
            {dest.name}
          </button>
        ))}
      </div>

      {/* Slide-up info panel */}
      <AnimatePresence>
        {panelOpen && activeDestination && (
          <motion.div
            key={activeDestination.id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="absolute inset-x-0 bottom-0 z-20 rounded-b-[2rem] border-t border-white/10 bg-leaf-dark/95 p-5 backdrop-blur-xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-saffron">{activeDestination.region}</p>
                <h3 className="mt-1 font-serif text-2xl text-white sm:text-3xl">{activeDestination.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="shrink-0 rounded-full border border-white/15 bg-white/8 p-2 text-white/60 transition hover:bg-white/15 hover:text-white"
              >
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/60">{activeDestination.focus}</p>
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">Products for this market</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeDestination.products.map((p) => (
                  <span key={p} className="rounded-full border border-saffron/25 bg-saffron/10 px-3 py-1 text-[11px] font-medium text-saffron/90">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
