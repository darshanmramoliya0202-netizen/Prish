import Link from "next/link";
import { Seal } from "./Seal";
import { Wordmark } from "./Wordmark";

/** Seal + wordmark, linked home. Inherits text colour from its parent. */
export function Lockup({ className = "", sealClassName = "size-10" }: { className?: string; sealClassName?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`} aria-label="Prish Overseas — home">
      <Seal decorative className={sealClassName} />
      <Wordmark className="text-[0.8rem]" />
    </Link>
  );
}
