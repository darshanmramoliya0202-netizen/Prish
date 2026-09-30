"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo, ProductPhotoRole } from "@/content/photos";
import { IconClose } from "@/components/ui/icons";
import { track } from "@/lib/analytics";

/**
 * Product hero: the round chip is a button that opens the product's photographs —
 * close-up of the product, the raw ingredient it comes from — in a native <dialog>.
 * Content is plain data (src/caption) so the server page decides what exists.
 */

// The chip's words follow the photo it shows: only a real macro may say "actual"
// (owner rule) — the field shots are generated, so they get a plain "where it grows".
const CHIP: Record<
  ProductPhotoRole,
  { lines: [string, string]; aria: (name: string) => string }
> = {
  macro: {
    lines: ["Actual", "product"],
    aria: (name) => `See the actual ${name}: photographs`,
  },
  source: {
    lines: ["Where it", "grows"],
    aria: (name) => `See where ${name} grows`,
  },
  // not passed by the page today; neutral wording so they can never read as the real lot
  bowl: { lines: ["More", "photos"], aria: (name) => `See photos of ${name}` },
  scene: { lines: ["More", "photos"], aria: (name) => `See photos of ${name}` },
};

export function ProductGallery({
  name,
  slug,
  photos,
}: {
  name: string;
  slug: string;
  photos: { role: ProductPhotoRole; photo: Photo; caption: string }[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  // lead with the macro when one exists, else whatever the page sent first
  const lead = photos.find((p) => p.role === "macro") ?? photos[0];
  if (!lead) return null;
  const chip = CHIP[lead.role];

  const open = () => {
    setActive(photos.indexOf(lead));
    ref.current?.showModal();
    track("gallery_open", { product: slug });
  };
  const current = photos[active] ?? lead;

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group/chip absolute right-[4%] bottom-[6%] block size-24 overflow-hidden rounded-full shadow-deep ring-2 ring-cream-50/90 outline-none transition-transform duration-3 ease-out-expo hover:scale-105 focus-visible:ring-4 focus-visible:ring-gold-400 md:size-28"
        aria-label={chip.aria(name)}
        data-product-chip
      >
        <Image
          src={lead.photo.src}
          alt=""
          width={224}
          height={224}
          sizes="112px"
          quality={80}
          priority
          className="size-full object-cover"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/75 to-transparent px-2 pt-7 pb-2.5 text-center text-[9px] leading-[1.15] font-semibold tracking-wide text-cream-50 uppercase">
          {chip.lines[0]}
          <br />
          {chip.lines[1]}
        </span>
      </button>

      <Dialog ref={ref} onClose={() => {}}>
        <figure className="flex flex-col">
          <div className="relative aspect-[4/3] w-full bg-ink-900">
            <Image
              key={current.photo.src}
              src={current.photo.src}
              alt={`${name} — ${current.caption}`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              quality={86}
              className="object-contain"
            />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-cream-50">
            <span>
              <span className="font-display text-display-sm">{name}</span>
              <span className="mt-0.5 block text-small opacity-75">
                {current.caption}
              </span>
            </span>
            {photos.length > 1 ? (
              <span
                className="flex gap-2"
                role="tablist"
                aria-label="Photographs"
              >
                {photos.map((p, i) => (
                  <button
                    key={p.role}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`rounded-full border px-3 py-1 text-small transition-colors ${
                      i === active
                        ? "border-gold-400 bg-gold-400 text-ink-900"
                        : "border-cream-50/30 hover:border-cream-50/70"
                    }`}
                  >
                    {p.caption}
                  </button>
                ))}
              </span>
            ) : null}
          </figcaption>
        </figure>
      </Dialog>
    </>
  );
}

function Dialog({
  ref,
  children,
  onClose,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
  onClose: () => void;
}) {
  // close on backdrop click (the dialog element itself is the backdrop target)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === el) el.close();
    };
    el.addEventListener("click", onClick);
    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("close", onClose);
    };
  }, [ref, onClose]);
  return (
    <dialog
      ref={ref}
      className="m-auto w-[min(92vw,64rem)] overflow-hidden rounded-2xl bg-forest-950 p-0 text-cream-50 shadow-deep backdrop:bg-ink-900/80 backdrop:backdrop-blur-sm"
    >
      <form method="dialog" className="absolute top-3 right-3 z-10">
        <button
          type="submit"
          aria-label="Close"
          className="grid size-10 place-items-center rounded-full bg-ink-900/60 text-cream-50 outline-none hover:bg-ink-900 focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <IconClose />
        </button>
      </form>
      {children}
    </dialog>
  );
}
