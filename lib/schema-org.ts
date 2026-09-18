import { site } from "@/content/site";
import { resolveUrl } from "@/lib/seo";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.company,
    url: resolveUrl("/"),
    logo: resolveUrl("/brand/logo-seal.svg"),
    email: site.email,
    telephone: site.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address[0]}, ${site.address[1]}`,
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.postalCode,
      addressCountry: site.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${site.whatsapp}`,
        availableLanguage: ["en", "hi", "gu"],
      },
    ],
    areaServed: [
      "United States",
      "European Union",
      "Gulf Cooperation Council",
      "Southeast Asia",
    ],
    ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
  };
}
