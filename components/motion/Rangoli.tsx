/**
 * Code-drawn rangoli geometry — 12-fold symmetry of petals and dots. Static SVG here;
 * the motion phase rotates it slowly and parallaxes it. currentColor, very low opacity.
 */
export function Rangoli({ className = "", folds = 12, rings = 4 }: { className?: string; folds?: number; rings?: number }) {
  const petals: string[] = [];
  const dots: { x: number; y: number; r: number }[] = [];
  for (let ring = 1; ring <= rings; ring++) {
    const R = 60 + ring * 70;
    const n = folds * (ring % 2 === 0 ? 2 : 1);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const x = Math.cos(a) * R;
      const y = Math.sin(a) * R;
      const w = 22 + ring * 4;
      const h = 44 + ring * 8;
      // petal as a rotated lens
      const deg = (a * 180) / Math.PI + 90;
      petals.push(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg.toFixed(1)})"><path d="M0 ${-h / 2} C ${w} ${-h / 6}, ${w} ${h / 6}, 0 ${h / 2} C ${-w} ${h / 6}, ${-w} ${-h / 6}, 0 ${-h / 2} Z"/></g>`);
      const a2 = a + Math.PI / n;
      dots.push({ x: Math.cos(a2) * (R + 30), y: Math.sin(a2) * (R + 30), r: 3 + ring });
    }
  }
  return (
    <svg viewBox="-420 -420 840 840" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2" data-rangoli>
      <circle r="40" />
      <circle r="24" strokeDasharray="3 5" />
      <g dangerouslySetInnerHTML={{ __html: petals.join("") }} />
      <g fill="currentColor" stroke="none">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r} />
        ))}
      </g>
      <circle r="392" strokeDasharray="6 10" />
    </svg>
  );
}
