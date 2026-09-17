import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site, socials } from "@/content/site";
import { founder } from "@/content/founder";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GridBackdrop } from "@/components/layout/GridBackdrop";
import { ScrollReveal } from "@/components/layout/ScrollReveal";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

const pageTitle = `${site.name} — ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: pageTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Vishal Kumar Thakur",
    "full-stack developer",
    "Next.js developer India",
    "React Native developer",
    "FastAPI",
    "application security",
    "freelance developer Bihar",
    "Mithila KritiKala",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: site.description,
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
    creator: "@vishal1307n",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "dark",
};

/** Person + the trust, so search engines connect the founder claim to an org. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.title,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madhubani",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lovely Professional University",
  },
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "React Native",
    "FastAPI",
    "Application security",
    "Retrieval-augmented generation",
  ],
  founder: {
    "@type": "NGO",
    name: founder.org,
    url: founder.site,
    foundingDate: "2025-07",
    areaServed: "Madhubani, Bihar, India",
  },
  sameAs: socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${hanken.variable}`}>
      <head>
        {/* Marks the document as script-capable before first paint. The
            scroll-reveal styles are scoped to `.js`, so with JavaScript
            disabled no content is ever left hidden at opacity 0. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
        >
          Skip to content
        </a>

        <GridBackdrop />
        <ScrollReveal />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
