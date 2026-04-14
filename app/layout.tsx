import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutShell from "@/components/LayoutShell";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cadex Systems | AI Integration & Automation Services",
  description:
    "Cadex Systems helps businesses unlock operational efficiency through strategic AI implementation, automation, and ongoing optimization with measurable ROI.",
  metadataBase: new URL("https://www.cadexhq.com"),
  alternates: {
    canonical: "https://www.cadexhq.com",
  },
  keywords: [
    "Cadex Systems",
    "AI integration",
    "AI automation",
    "business automation",
    "AI consulting",
    "workflow automation",
    "AI readiness",
    "process automation",
    "AI implementation",
  ],
  openGraph: {
    title: "Cadex Systems | AI Integration & Automation Services",
    description:
      "Cadex Systems helps businesses unlock operational efficiency through strategic AI implementation, automation, and ongoing optimization with measurable ROI.",
    url: "https://www.cadexhq.com",
    siteName: "Cadex Systems",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Cadex-Systems-Social.png",
        width: 1200,
        height: 630,
        alt: "Cadex Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cadex Systems | AI Integration & Automation Services",
    description:
      "Cadex Systems helps businesses unlock operational efficiency through strategic AI implementation and automation.",
    images: ["/Cadex-Systems-Social.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1MMMQ924V7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1MMMQ924V7');
          `}
        </Script>
        <Script id="json-ld-org" type="application/ld+json" strategy="beforeInteractive">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cadex Systems",
            "url": "https://www.cadexhq.com",
            "logo": "https://www.cadexhq.com/Cadex-Systems-Social.png",
            "description": "Cadex Systems helps businesses unlock operational efficiency through strategic AI implementation, automation, and ongoing optimization with measurable ROI.",
            "email": "discovery@cadexhq.com",
            "sameAs": [],
            "knowsAbout": [
              "AI Integration",
              "Business Automation",
              "Workflow Automation",
              "AI Implementation",
              "Process Optimization",
              "Operational Efficiency"
            ],
            "serviceType": [
              "AI Integration & Automation",
              "AI Readiness Assessment",
              "Process Audit",
              "ROI Analysis"
            ]
          }`}
        </Script>
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
