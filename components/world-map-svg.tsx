"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const destinations = [
  { name: "United States", region: "North America", cx: 150, cy: 145, focus: "Premium botanical, supplement, and formulation-led ingredient programs." },
  { name: "European Union", region: "Europe", cx: 380, cy: 120, focus: "Documentation-sensitive buyers prioritizing consistency, compliance, and long-term supply trust." },
  { name: "GCC Region", region: "Middle East", cx: 430, cy: 175, focus: "Fast-moving food trade, dependable export handling, and reliable commercial responsiveness." },
  { name: "Southeast Asia", region: "Asia", cx: 560, cy: 210, focus: "Adaptable regional supply with practical packaging and shipment readiness." }
];

// India origin point
const indiaOrigin = { cx: 480, cy: 185 };

export default function WorldMapSVG() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = destinations[activeIdx];

  return (
    <div className="relative h-[22rem] overflow-hidden rounded-2xl border border-slate-200 bg-[#0f1a2e] p-0 shadow-card-light sm:h-[28rem] lg:h-[31rem]">
      <svg
        viewBox="0 0 700 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Ocean background */}
        <rect width="700" height="380" fill="#0f1a2e" />

        {/* Grid lines for depth */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 22} x2="700" y2={i * 22} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 35 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="380" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {/* Simplified world continents - clean outlines */}
        {/* North America */}
        <path d="M80,60 L120,55 L160,60 L185,80 L195,100 L190,120 L180,140 L170,160 L155,175 L140,180 L120,175 L100,185 L85,180 L75,160 L65,140 L60,120 L65,100 L70,80 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* South America */}
        <path d="M140,200 L165,195 L180,210 L185,240 L180,270 L170,300 L155,320 L140,330 L130,315 L125,290 L120,260 L125,230 L130,210 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* Europe */}
        <path d="M340,70 L360,60 L380,55 L400,60 L415,70 L410,85 L400,100 L385,110 L370,115 L355,110 L345,100 L340,85 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* Africa */}
        <path d="M350,140 L380,135 L400,145 L410,170 L415,200 L410,240 L395,270 L375,290 L355,285 L340,265 L335,240 L330,210 L335,180 L340,155 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* Asia / Russia */}
        <path d="M420,50 L470,40 L530,45 L580,55 L620,65 L640,80 L635,100 L620,115 L600,120 L570,115 L540,110 L510,100 L480,95 L450,90 L430,80 L420,65 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* India - HIGHLIGHTED */}
        <path d="M460,130 L480,125 L500,130 L510,145 L505,165 L495,185 L485,200 L475,205 L465,200 L455,185 L450,165 L450,145 Z"
          fill="rgba(212,145,10,0.25)" stroke="rgba(212,145,10,0.8)" strokeWidth="1.5" />
        {/* Middle East */}
        <path d="M415,130 L440,125 L455,135 L450,150 L440,160 L425,155 L415,145 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* SE Asia */}
        <path d="M540,160 L570,155 L590,165 L600,185 L595,210 L580,225 L560,230 L545,220 L535,200 L530,180 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        {/* Australia */}
        <path d="M560,270 L600,260 L630,270 L640,290 L630,310 L605,320 L580,315 L565,300 L555,285 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

        {/* Export route lines from India */}
        {destinations.map((dest, i) => (
          <motion.line
            key={dest.name}
            x1={indiaOrigin.cx}
            y1={indiaOrigin.cy}
            x2={dest.cx}
            y2={dest.cy}
            stroke={activeIdx === i ? "rgba(212,145,10,0.7)" : "rgba(212,145,10,0.15)"}
            strokeWidth={activeIdx === i ? 2 : 0.8}
            strokeDasharray={activeIdx === i ? "none" : "4 4"}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}

        {/* India origin pulse */}
        <motion.circle
          cx={indiaOrigin.cx}
          cy={indiaOrigin.cy}
          r="18"
          fill="none"
          stroke="rgba(212,145,10,0.4)"
          strokeWidth="1"
          animate={{ r: [18, 28, 18], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.circle
          cx={indiaOrigin.cx}
          cy={indiaOrigin.cy}
          r="10"
          fill="none"
          stroke="rgba(212,145,10,0.6)"
          strokeWidth="1"
          animate={{ r: [10, 18, 10], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <circle cx={indiaOrigin.cx} cy={indiaOrigin.cy} r="6" fill="rgba(212,145,10,0.9)" />
        <circle cx={indiaOrigin.cx} cy={indiaOrigin.cy} r="3" fill="#fff" />

        {/* Destination dots */}
        {destinations.map((dest, i) => (
          <g key={dest.name}>
            <motion.circle
              cx={dest.cx}
              cy={dest.cy}
              r={activeIdx === i ? 8 : 5}
              fill={activeIdx === i ? "rgba(212,145,10,0.6)" : "rgba(255,255,255,0.15)"}
              stroke={activeIdx === i ? "rgba(212,145,10,1)" : "rgba(255,255,255,0.3)"}
              strokeWidth="1.5"
              animate={{ scale: activeIdx === i ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1.5, repeat: activeIdx === i ? Infinity : 0 }}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveIdx(i)}
              onClick={() => setActiveIdx(i)}
            />
          </g>
        ))}

        {/* India label */}
        <text x={indiaOrigin.cx} y={indiaOrigin.cy + 22} textAnchor="middle" fill="rgba(212,145,10,0.9)" fontSize="9" fontWeight="700" letterSpacing="2">
          INDIA
        </text>
        <text x={indiaOrigin.cx} y={indiaOrigin.cy + 32} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" letterSpacing="1">
          ORIGIN
        </text>
      </svg>

      {/* Active destination info card */}
      <motion.div
        key={active.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="absolute left-3 top-3 z-20 max-w-[14rem] rounded-xl border border-white/10 bg-[#0f1a2e]/90 px-4 py-3 backdrop-blur-md sm:left-5 sm:top-5 sm:max-w-[17rem] sm:rounded-2xl sm:px-5 sm:py-4"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">{active.region}</p>
        <p className="mt-1 text-lg font-bold text-white">{active.name}</p>
        <p className="mt-2 text-xs leading-5 text-white/60">{active.focus}</p>
      </motion.div>

      {/* Origin label */}
      <div className="absolute bottom-14 left-3 z-20 rounded-xl border border-amber-500/30 bg-[#0f1a2e]/90 px-3 py-2 backdrop-blur-md sm:bottom-16 sm:left-5 sm:px-4 sm:py-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-amber-400">Origin Node</p>
        <p className="mt-0.5 text-sm font-bold text-white">Rajkot, Gujarat</p>
      </div>

      {/* Bottom market selectors */}
      <div className="absolute inset-x-3 bottom-3 z-20 flex flex-wrap gap-1.5 sm:inset-x-5 sm:bottom-5 sm:gap-2">
        {destinations.map((dest, i) => (
          <button
            key={dest.name}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={`rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition sm:px-4 sm:py-2.5 sm:text-xs ${
              activeIdx === i
                ? "border-amber-500 bg-amber-500/20 text-amber-300"
                : "border-white/10 bg-white/5 text-white/50 hover:border-amber-500/30 hover:text-white/80"
            }`}
          >
            {dest.name}
          </button>
        ))}
      </div>
    </div>
  );
}
