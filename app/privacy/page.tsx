import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: "What prishoverseas.com collects, where it is kept, and your rights. Cookie-free analytics; inquiry details kept in our own mailbox and CRM.",
  path: "/privacy",
});

const updated = "18 September 2026";

export default function PrivacyPage() {
  return (
    <>
      <section data-theme="dark" className="bg-forest-950 pt-32 pb-16 text-cream-50 md:pt-40">
        <div className="container-x">
          <p className="eyebrow text-gold-400">Privacy</p>
          <h1 className="mt-4 text-display-xl">Plain words about your data.</h1>
          <p className="mt-4 text-small opacity-70">Last updated {updated}</p>
        </div>
      </section>
      <section data-theme="light" className="bg-cream-50 py-16 text-ink-900 md:py-24">
        <div className="container-x prose-custom max-w-3xl space-y-10 text-body text-ink-700">
          <div>
            <h2 className="font-display text-display-md text-ink-900">Who we are</h2>
            <p className="mt-3">
              {site.company}, {site.address.join(", ")}. Contact: <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>, {site.phones[0]}.
            </p>
          </div>
          <div>
            <h2 className="font-display text-display-md text-ink-900">What we collect, and why</h2>
            <p className="mt-3">When you send an inquiry or a sample-kit request we receive what you type: your name, company, work email, phone or WhatsApp number, country, the products you are interested in and your message. We use it to answer you and to quote. We do not sell it or share it with advertisers.</p>
            <p className="mt-3">Requests are delivered to our mailbox and recorded in our own customer-relationship system, which runs on a server we control. We keep them for as long as we are in a business relationship with you, or until you ask us to delete them.</p>
          </div>
          <div>
            <h2 className="font-display text-display-md text-ink-900">Analytics without cookies</h2>
            <p className="mt-3">We use a self-hosted, cookie-free analytics tool (Umami) to count page views and clicks on buttons such as WhatsApp and downloads. It does not store your IP address, does not track you across sites and does not need a consent banner.</p>
          </div>
          <div>
            <h2 className="font-display text-display-md text-ink-900">What stays in your browser</h2>
            <p className="mt-3">Your sample kit (the products you add) and your motion preference are stored in your browser&apos;s local storage so they survive a refresh. They never leave your device unless you submit the kit. A small cookie named <code>prish_region</code> is set only if you choose a market yourself in the footer; it remembers that choice for a year. We do not set any other cookies.</p>
          </div>
          <div>
            <h2 className="font-display text-display-md text-ink-900">WhatsApp and email</h2>
            <p className="mt-3">If you contact us on WhatsApp or by email, those services&apos; own privacy policies apply to the transmission. We treat what you send us the same way as a website inquiry.</p>
          </div>
          <div>
            <h2 className="font-display text-display-md text-ink-900">Your rights</h2>
            <p className="mt-3">You can ask what we hold about you, ask us to correct it, or ask us to delete it. Write to <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a> and we will do it. If you are in the EU or UK you also have the right to complain to your data-protection authority.</p>
          </div>
          <div>
            <h2 className="font-display text-display-md text-ink-900">Changes</h2>
            <p className="mt-3">If we change how we handle data, we will update this page and the date at the top.</p>
          </div>
        </div>
      </section>
    </>
  );
}
