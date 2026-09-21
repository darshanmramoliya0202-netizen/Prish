/**
 * Namaste — Anjali Mudra as a monoline pictogram in the style of the classic Indian
 * greeting: palms pressed upright at the heart, thumbs crossed high along the index
 * fingers, forearms angled out in kurta sleeves. Strokes only (currentColor), so the
 * motion phase can slide the two hands together, draw the lines on (DrawSVG) and dip
 * the whole gesture in a slight bow. Each hand is its own [data-hand] group.
 */
export function NamasteHands({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      data-namaste-hands
    >
      {/* viewer's right hand */}
      <g data-hand="r">
        {/* fingertip cap and the outer edge of the hand down to the wrist */}
        <path d="M100 34 C100 24 116 24 116.5 34 C118 62 121 92 125 118 C128 138 132 156 135 170" />
        {/* forearm in a sleeve, angled down and out */}
        <path d="M135 170 L158 198" />
        <path d="M100 176 L124 206" />
        {/* cuff */}
        <path d="M158 198 L124 206" />
        <path d="M152 191 L119 199" strokeOpacity=".6" />
        {/* this hand's thumb crosses in front of the other */}
        <path d="M95 74 C90 66 98 58 105 65 C112 78 119 100 124 124 C125 130 120 133 117 128 C111 110 104 90 95 74 Z" />
        <path d="M100 68 C102 67 105 67 107 69" strokeOpacity=".4" />
      </g>
      {/* viewer's left hand (mirrored) */}
      <g data-hand="l">
        <g transform="translate(200 0) scale(-1 1)">
          <path d="M100 34 C100 24 116 24 116.5 34 C118 62 121 92 125 118 C128 138 132 156 135 170" />
          <path d="M135 170 L158 198" />
          <path d="M100 176 L124 206" />
          <path d="M158 198 L124 206" />
          <path d="M152 191 L119 199" strokeOpacity=".6" />
          {/* the thumb behind: only its upper edge shows */}
          <path
            d="M105 84 C102 76 108 70 114 76 C120 88 125 106 128 126"
            strokeOpacity=".55"
          />
        </g>
      </g>
      {/* the seam where the palms meet — appears once the hands have joined */}
      <path d="M100 34 L100 176" strokeOpacity=".75" data-seam />
    </svg>
  );
}
