import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/content";
import { contact, markets } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e2d6bf] bg-[#faf5ec] text-[#173124]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#173124]">Prish Overseas</p>
            <h3 className="mt-5 max-w-lg font-serif text-4xl leading-tight text-[#173124]">
              Indian-origin powders, botanicals, and dehydrated ingredients for global buyers.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#5a7062]">
              A sourcing partner shaped by Indian agricultural depth, controlled processing, and export discipline from Rajkot to international markets.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#173124] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4433] hover:shadow-[0_8px_24px_rgba(23,49,36,0.18)]"
              >
                Start buyer inquiry
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-[#c9b896] px-6 py-3 text-sm font-semibold text-[#173124] transition hover:border-[#173124] hover:bg-[#173124] hover:text-white"
              >
                Review product portfolio
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6433]">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-[#5a7062]">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-[#173124]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6433]">Markets</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-[#5a7062]">
                {markets.map((market) => (
                  <p key={market}>{market}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-[#e2d6bf] bg-white/60 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6433]">Contact</p>
              <p className="mt-3 font-semibold text-[#173124]">{contact.company}</p>
              <div className="mt-2 space-y-1 text-sm text-[#5a7062]">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className="text-sm text-[#5a7062]">
              <a href={`mailto:${contact.email}`} className="block transition hover:text-[#173124]">
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="mt-1 block transition hover:text-[#173124]">
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-[#8a9b8f] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Prish Overseas. All rights reserved.</p>
          <p>From Rajkot, Gujarat — to the world.</p>
        </div>
      </div>
    </footer>
  );
}
