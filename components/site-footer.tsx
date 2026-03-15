import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import footerPowders from "@/brochure/Brochure Draft 4 edit lite_page-0001.jpg";
import { navigation } from "@/data/content";
import { contact, markets } from "@/data/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#d9caad]/35 bg-[#12261d] pt-10 text-[#f6f0e6]">
      <div className="mx-auto max-w-7xl px-6 pb-12 sm:px-8 lg:px-10">
        <div className="grid gap-6 rounded-[2.4rem] border border-[#d9caad]/20 bg-[linear-gradient(180deg,rgba(247,239,223,0.06),rgba(247,239,223,0.03))] p-6 shadow-[0_24px_80px_rgba(8,24,18,0.18)] lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.42em] text-[#d2a66f]">Prish Overseas</p>
            <h3 className="mt-4 max-w-xl font-serif text-4xl text-[#fff8ef]">Indian-origin powders, botanicals, and dehydrated ingredients prepared for global buyers.</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#e9dec8]/74">
              A warmer, more grounded export presence — built around sourcing credibility, controlled processing, and reliable commercial movement from Rajkot to international markets.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c99c63] px-6 py-3 text-sm font-semibold text-[#173124] transition hover:bg-[#ddb786]"
              >
                Start buyer inquiry
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-[#d9caad]/28 px-6 py-3 text-sm font-semibold text-[#f6f0e6] transition hover:border-[#d9caad]/45 hover:bg-white/[0.05]"
              >
                Review product portfolio
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-[#d9caad]/24 bg-[#f8f0de] shadow-[0_20px_60px_rgba(12,30,23,0.16)]">
            <div className="relative h-56">
              <Image
                src={footerPowders}
                alt="Indian ingredient powders"
                fill
                sizes="(min-width: 1024px) 28vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center 62%" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,49,36,0.02),rgba(23,49,36,0.64))]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="inline-flex rounded-full border border-[#f2d7ac]/35 bg-[#f5ead0]/12 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-[#f6d7a1]">
                  Product-led identity
                </div>
                <p className="mt-3 font-serif text-2xl text-[#fff8ef]">Photos, powders, and export clarity — not generic corporate blocks.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 rounded-[2rem] border border-[#d9caad]/14 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1fr_0.8fr_0.9fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-[#d2a66f]">Positioning</p>
            <p className="mt-4 text-sm leading-7 text-[#e9dec8]/72">
              Export-focused ingredient supply from India for formulation teams, importers, and distributors that need traceability, process control, and reliable documentation.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#fff8ef]">Explore</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#e9dec8]/72">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-[#fff8ef]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#fff8ef]">Markets</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#e9dec8]/72">
              {markets.map((market) => (
                <p key={market}>{market}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#fff8ef]">Contact</p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-[#e9dec8]/72">
              {contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <a href={`mailto:${contact.email}`} className="block transition hover:text-[#fff8ef]">
                {contact.email}
              </a>
              {contact.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="block transition hover:text-[#fff8ef]">
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
