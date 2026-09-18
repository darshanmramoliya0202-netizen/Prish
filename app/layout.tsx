import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree, Rozha_One, Anek_Gujarati } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/content/site";
import { defaultDescription, defaultTitle, getSiteUrl } from "@/lib/seo";
import { organizationSchema } from "@/lib/schema-org";
import { JsonLd } from "@/components/seo/JsonLd";
import { Providers } from "@/components/providers/Providers";
import { Shell } from "@/components/chrome/Shell";
import { PaletteScript } from "@/components/products/PaletteScript";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});
const rozha = Rozha_One({
  weight: "400",
  subsets: ["devanagari", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-rozha",
});
const anekGujarati = Anek_Gujarati({
  subsets: ["gujarati", "latin"],
  display: "swap",
  preload: false,
  variable: "--font-anek-gujarati",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: defaultTitle, template: `%s | ${site.company}` },
  description: defaultDescription,
  applicationName: site.company,
  openGraph: { siteName: site.company, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f1" },
    { media: "(prefers-color-scheme: dark)", color: "#06231a" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${rozha.variable} ${anekGujarati.variable}`}
      suppressHydrationWarning
    >
      <body>
        <JsonLd data={organizationSchema()} />
        <PaletteScript />
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
        {umamiSrc && umamiId ? (
          <Script
            src={umamiSrc}
            data-website-id={umamiId}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
