/**
 * Single-stroke line-art of joined hands (Namaste / Anjali Mudra), drawn as strokes so
 * DrawSVG can animate them in the motion phase. currentColor.
 */
export function NamasteHands({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden data-namaste-hands>
      {/* left hand */}
      <path d="M100 26 C 92 44, 84 70, 82 96 C 80 118, 76 136, 66 150 C 58 162, 50 176, 48 194 C 47 206, 52 216, 62 222" />
      <path d="M82 96 C 74 92, 66 92, 60 98" />
      <path d="M80 112 C 70 108, 60 110, 54 118" />
      <path d="M76 128 C 66 126, 58 130, 52 138" />
      <path d="M68 146 C 60 146, 54 152, 50 160" />
      {/* right hand (mirror) */}
      <path d="M100 26 C 108 44, 116 70, 118 96 C 120 118, 124 136, 134 150 C 142 162, 150 176, 152 194 C 153 206, 148 216, 138 222" />
      <path d="M118 96 C 126 92, 134 92, 140 98" />
      <path d="M120 112 C 130 108, 140 110, 146 118" />
      <path d="M124 128 C 134 126, 142 130, 148 138" />
      <path d="M132 146 C 140 146, 146 152, 150 160" />
      {/* seam where palms meet */}
      <path d="M100 26 L 100 176" strokeDasharray="2 6" strokeWidth="2" />
      {/* wrists */}
      <path d="M62 222 C 74 230, 88 232, 100 232 C 112 232, 126 230, 138 222" />
    </svg>
  );
}
