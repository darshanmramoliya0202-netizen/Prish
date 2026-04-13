import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/content";
import { contact, markets } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gold-warm/10 bg-leaf-dark text-parchment/75">
      <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-parchment">Prish Overseas</p>
            <h3 className="mt-5 max-w-lg font-serif text-xl leading-snug text-parchment sm:text-2xl">
              Premium Indian-origin ingredients for global B2B buyers.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-wheat/80">
              Bridging authentic Indian farming heritage with world-class processing, compliance, and logistics for B2B buyers across every continent.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-warm px-6 py-3 text-sm font-semibold text-leaf-dark transition hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(212,145,10,0.25)]"
              >
                Request a sample
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-parchment/20 px-6 py-3 text-sm font-semibold text-parchment transition hover:border-gold-warm hover:text-gold-warm"
              >
                View product catalog
              </Link>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-parchment/75">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="transition hover:text-gold-warm">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">Markets</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-parchment/75">
                {markets.map((market) => (
                  <p key={market}>{market}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[1.8rem] border border-parchment/10 bg-parchment/5 p-6 shadow-[inset_0_1px_0_rgba(245,237,216,0.06)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-warm">Contact</p>
              <p className="mt-3 font-semibold text-parchment">{contact.company}</p>
              <div className="mt-2 space-y-1 text-sm text-wheat/80">
                {contact.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mt-3 text-xs text-wheat/45">IEC: XXXXXXXXXX &middot; GST: 24XXXXXXXXX</p>
            </div>
            <div className="text-sm text-parchment/75">
              <a href={`mailto:${contact.email}`} className="block transition hover:text-gold-warm">
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="mt-1 block transition hover:text-gold-warm">
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {["FSSAI Certified", "APEDA Registered", "Spices Board", "ISO / HACCP Aligned"].map((cert) => (
            <span key={cert} className="rounded-full border border-parchment/15 bg-white/5 px-2.5 py-1 text-[10px] text-wheat/60">
              {cert}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-wheat/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Prish Overseas. All rights reserved. &middot; From Rajkot, Gujarat — to the world.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition hover:text-gold-warm">Privacy policy</Link>
            <a href="https://linkedin.com/company/prish-overseas" target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-warm">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
