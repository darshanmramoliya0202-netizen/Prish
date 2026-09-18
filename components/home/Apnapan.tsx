import { accents, home } from "@/content/copy";
import { story } from "@/content/story";
import { Accent } from "@/components/ui/primitives";
import { IconWhatsApp } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";
import { Portrait } from "@/components/story/Portrait";

/** Section 8 — a note from the Director. Renders the real photo when supplied (duotone treatment). */
export function Apnapan() {
  const person = story.people[0];
  if (!person) return null;
  return (
    <section data-theme="light" className="bg-cream-50 py-section text-ink-900">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Portrait person={person} />
        </div>
        <div className="lg:col-span-7">
          <Accent accent={accents.apnapan} translation={accents.apnapan.translation} size="md" />
          <h2 className="mt-8 text-display-lg">{home.apnapanTitle}</h2>
          <div className="mt-6 space-y-4 text-lead text-ink-700">
            {person.note.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-6 font-display text-display-md">
            — {person.name}, <span className="text-ink-500">{person.role}</span>
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-[#062a16]"
            data-umami-event="whatsapp_click"
            data-umami-event-placement="apnapan"
          >
            <IconWhatsApp /> Message Yash on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
