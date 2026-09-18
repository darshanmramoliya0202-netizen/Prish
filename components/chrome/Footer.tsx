import Link from "next/link";
import { Seal } from "@/components/brand/Seal";
import { Wordmark } from "@/components/brand/Wordmark";
import { site } from "@/content/site";
import { orderedClusters, clusterPath, visibleCertificates } from "@/content";
import { waLink } from "@/lib/whatsapp";
import { IconWhatsApp } from "@/components/ui/icons";
import { RegionSwitcher } from "./RegionSwitcher";
import { MotionToggle } from "./MotionToggle";

const links = [
  { href: "/products", label: "Products" },
  { href: "/story", label: "Story" },
  { href: "/quality", label: "Quality & documents" },
  { href: "/crop-calendar", label: "Crop calendar" },
  { href: "/inquiry", label: "Inquiry & sample kit" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  const legal = visibleCertificates("footer").filter((c) => c.number);
  return (
    <footer data-theme="dark" className="relative grain bg-forest-950 text-cream-50">
      <div className="container-x py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Seal decorative className="size-16 text-cream-50" />
              <div>
                <Wordmark className="text-small" />
                <p className="mt-1 text-small opacity-70">{site.positioning}</p>
              </div>
            </div>
            <p className="mt-8 max-w-md text-lead font-display">{site.tagline}.</p>
            <p className="mt-4 max-w-md text-small opacity-70">
              Farm-rooted in Saurashtra. Our own and partner processing across India&apos;s growing belts. Documented for the United States, European Union, GCC and Southeast Asia.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 font-semibold text-[#062a16]"
              data-umami-event="whatsapp_click"
              data-umami-event-placement="footer"
            >
              <IconWhatsApp /> WhatsApp {site.phones[0]}
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow opacity-60">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-body opacity-85 hover:opacity-100">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10 opacity-60">Families</p>
            <ul className="mt-4 space-y-2.5">
              {orderedClusters.map((c) => (
                <li key={c.id}>
                  <Link href={clusterPath(c)} className="text-body opacity-85 hover:opacity-100">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow opacity-60">Rajkot, Gujarat</p>
            <address className="mt-4 not-italic text-body opacity-85">
              {site.company}
              <br />
              {site.address.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </address>
            <p className="mt-4 text-body">
              <a href={`mailto:${site.email}`} className="underline underline-offset-4 decoration-gold-500">
                {site.email}
              </a>
            </p>
            <ul className="mt-2 space-y-1 text-body opacity-85">
              {site.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s+/g, "")}`}>{p}</a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <RegionSwitcher />
              <MotionToggle />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream-50/10 pt-6 text-small opacity-70 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company}. Incoterms offered: {site.incoterms.join(" · ")}. Cookie-free analytics.
          </p>
          {legal.length ? (
            <p className="tabular">
              {legal.map((c, i) => (
                <span key={c.id}>
                  {i > 0 ? " · " : ""}
                  {c.id.toUpperCase()}: {c.number}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
