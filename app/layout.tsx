import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import FloatingElements from "@/components/floating-elements";
import Preloader from "@/components/preloader";
import ScrollProgress from "@/components/scroll-progress";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import {
  defaultDescription,
  defaultKeywords,
  defaultTitle,
  getOrganizationSchema,
  getSiteUrl,
  resolveUrl,
  siteName
} from "@/data/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: defaultTitle,
  description: defaultDescription,
  applicationName: siteName,
  manifest: "/manifest.webmanifest",
  keywords: defaultKeywords,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/icon"
  },
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "business",
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: getSiteUrl(),
    siteName,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: resolveUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteName} social preview`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [resolveUrl("/twitter-image")]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>
        <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <SmoothScrollProvider>
          <Preloader />
          <ScrollProgress />
          <FloatingElements />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
