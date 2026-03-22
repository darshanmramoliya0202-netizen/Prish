import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/content";
import { contact, markets } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0f172a] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-white">Prish Overseas</p>
            <h3 className="mt-5 max-w-lg font-serif text-3xl leading-tight text-white sm:text-4xl">
              India&apos;s modern agricultural powerhouse — delivering premium ingredients globally.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              Bridging authentic Indian farming heritage with world-class processing, compliance, and logistics for B2B buyers across every continent.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-[#fbbf24] hover:shadow-[0_8px_24px_rgba(245,158,11,0.25)]"
              >
                Request a sample
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-saffron hover:text-saffron"
              >
                View product catalog
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Markets</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
                {markets.map((market) => (
                  <p key={market}>{market}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-saffron">Contact</p>
              <p className="mt-3 font-semibold text-white">{contact.company}</p>
              <div className="mt-2 space-y-1 text-sm text-slate-400">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className="text-sm text-slate-400">
              <a href={`mailto:${contact.email}`} className="block transition hover:text-saffron">
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="mt-1 block transition hover:text-saffron">
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Prish Overseas. All rights reserved.</p>
          <p>From Rajkot, Gujarat — to the world.</p>
        </div>
      </div>
    </footer>
  );
}
