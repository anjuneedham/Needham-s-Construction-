import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { analytics, site, siteUrl } from "@/data/site";
import { company } from "@/data/company";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.defaultTitle,
    template: site.titleTemplate,
  },
  description: site.defaultDescription,
  keywords: [...site.keywords],
  applicationName: company.name,
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: company.name,
    title: site.defaultTitle,
    description: site.defaultDescription,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  ...(analytics.googleSiteVerification
    ? { verification: { google: analytics.googleSiteVerification } }
    : {}),
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.language} className={`${inter.variable} ${archivo.variable}`}>
      <body className="flex min-h-screen flex-col bg-concrete-50 antialiased">
        <a
          href="#main"
          className="sr-only rounded-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-amber-500 focus:px-4 focus:py-2.5 focus:font-semibold focus:text-iron-950"
        >
          Skip to main content
        </a>

        <Header />

        {/* Bottom padding clears the persistent mobile contact bar. */}
        <main id="main" className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>

        <Footer />
        <MobileContactBar />

        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={websiteSchema()} />

        {/* Analytics load only when the environment variable is set. */}
        {analytics.googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analytics.googleAnalyticsId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
