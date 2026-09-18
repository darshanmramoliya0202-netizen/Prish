"use client";

import { useMotionPrefs } from "@/components/providers/MotionPrefs";

/** Footer control: reduce motion regardless of the OS setting (stored in localStorage). */
export function MotionToggle({ className = "" }: { className?: string }) {
  const { reduced, setOverride } = useMotionPrefs();
  return (
    <button
      type="button"
      onClick={() => setOverride(reduced ? false : true)}
      aria-pressed={reduced}
      className={`inline-flex items-center gap-2 rounded-full border border-current/25 px-3 py-1.5 text-small font-semibold ${className}`}
    >
      <span
        className={`inline-block size-2 rounded-full ${reduced ? "bg-gold-500" : "bg-ok"}`}
        aria-hidden
      />
      {reduced ? "Motion: reduced" : "Motion: full"}
    </button>
  );
}
