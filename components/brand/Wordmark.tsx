import { site } from "@/content/site";

/** Text wordmark: uppercase, tracked, in the humanist sans. Pairs with <Seal/>. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-sans font-bold uppercase tracking-[0.28em] leading-none ${className}`}
    >
      {site.company}
    </span>
  );
}
