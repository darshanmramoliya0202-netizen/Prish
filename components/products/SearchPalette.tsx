"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconClose } from "@/components/ui/icons";

import type { SearchEntry as Entry } from "./search-entries";

/** ⌘K / search-button product finder that understands trade synonyms (amchur, jeera, dhania…). */
export function SearchPalette({ entries }: { entries: Entry[] }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return entries.slice(0, 8);
    return entries
      .map((e) => {
        const hay = [
          e.name,
          e.shortName,
          e.desi ?? "",
          e.cluster,
          ...e.synonyms,
        ]
          .join(" ")
          .toLowerCase();
        const score = e.name.toLowerCase().startsWith(s)
          ? 3
          : e.synonyms.some((x) => x.toLowerCase().startsWith(s))
            ? 2
            : hay.includes(s)
              ? 1
              : 0;
        return { e, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.e);
  }, [q, entries]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-3 rounded-full border border-current/30 px-5 text-body opacity-80 hover:opacity-100"
        aria-haspopup="dialog"
      >
        <span>Find a product — amchur, jeera, dhania…</span>
        <kbd className="hidden rounded border border-current/30 px-1.5 text-[11px] sm:inline">
          ⌘K
        </kbd>
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-start bg-forest-950/70 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Find a product"
            className="mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-cream-50 text-ink-900 shadow-deep"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink-900/10 px-4">
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Type a product or trade name…"
                className="h-14 w-full bg-transparent text-lead outline-none"
                aria-label="Search products"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-ink-900/5"
              >
                <IconClose />
              </button>
            </div>
            <ul className="max-h-[50vh] overflow-auto py-2">
              {results.length === 0 ? (
                <li className="px-4 py-6 text-ink-500">
                  Nothing by that name. Try the English name or ask us on
                  WhatsApp.
                </li>
              ) : null}
              {results.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      router.push(e.path);
                    }}
                    className="flex w-full items-baseline justify-between gap-4 px-4 py-3 text-left hover:bg-ink-900/5"
                  >
                    <span className="font-display text-display-md leading-tight">
                      {e.name}
                    </span>
                    <span className="text-small text-ink-500">
                      {e.desi ? `${e.desi} · ` : ""}
                      {e.cluster}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
