import Link from "next/link";
import { contact } from "@/data/site";
import { navigation } from "@/data/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#07101d]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-copper/80">Prish Overseas</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-mist/62">
            Export-focused ingredient supply from India for buyers who value traceability, processing control, and commercial clarity.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-mist/62">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-mist">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Contact</p>
          <div className="mt-4 space-y-2 text-sm leading-7 text-mist/62">
            {contact.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <a href={`mailto:${contact.email}`} className="block transition hover:text-mist">
              {contact.email}
            </a>
            {contact.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s+/g, "")}`} className="block transition hover:text-mist">
                {phone}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
