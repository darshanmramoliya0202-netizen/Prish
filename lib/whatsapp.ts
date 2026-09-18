import { site } from "@/content/site";

type WaOpts = {
  products?: string[];
  ref?: string;
  name?: string;
  company?: string;
  country?: string;
  intro?: string;
};

/** Deep link to the company WhatsApp with a prefilled, founder-voice message. */
export function waLink(opts: WaOpts = {}): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP ?? site.whatsapp;
  const who = opts.name
    ? ` this is ${opts.name}${opts.company ? ` from ${opts.company}` : ""}${opts.country ? ` (${opts.country})` : ""}.`
    : "";
  const what = opts.products?.length
    ? ` Interested in: ${opts.products.join(", ")}.`
    : "";
  const ref = opts.ref ? ` Ref ${opts.ref}.` : "";
  const text = `${opts.intro ?? "Namaste Prish Overseas,"}${who}${what}${ref} Please share today's price and sample availability.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(text.replace(/\s+/g, " ").trim())}`;
}
