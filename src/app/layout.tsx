import type { Metadata } from "next";
import { Bebas_Neue, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/StructuredData";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://tirionindustries.com");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tirion Industries — Africa's Sovereign Intelligence Infrastructure",
    template: "%s | Tirion Industries",
  },
  description:
    "Tirion Industries builds Archangel, Africa's first multi-domain situational intelligence platform. Real-time fusion of air, maritime, ground, space, and signals data for defense and security forces across Africa and the Middle East. Sovereign architecture. No ITAR dependency.",
  keywords: [
    "Tirion Industries",
    "Archangel",
    "defense intelligence platform",
    "African defense technology",
    "multi-domain situational awareness",
    "sovereign intelligence infrastructure",
    "military intelligence Africa",
    "maritime surveillance Africa",
    "airspace monitoring",
    "SIGINT",
    "C4ISR",
    "real-time data fusion",
    "cross-domain correlation",
    "anomaly detection defense",
    "geospatial intelligence",
    "entity tracking",
    "African defense market",
    "ITAR-free defense",
    "sovereign data architecture",
    "defense startup Africa",
    "Middle East defense",
    "border security Africa",
    "threat intelligence platform",
    "situational awareness software",
    "intelligence fusion engine",
  ],
  authors: [{ name: "Tirion Industries" }],
  creator: "Tirion Industries",
  publisher: "Tirion Industries",
  category: "Defense Technology",
  applicationName: "Tirion Industries",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Tirion Industries",
    title: "Tirion Industries — The Watchtower for a Continent",
    description:
      "Africa's first sovereign multi-domain intelligence platform. Archangel fuses air, maritime, ground, space, and signals data into one operational picture. Built for African defense commands — no ITAR dependency, no foreign infrastructure control.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tirion Industries — Archangel Multi-Domain Intelligence Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tirion Industries — Africa's Sovereign Intelligence Infrastructure",
    description:
      "Archangel: real-time fusion of air, maritime, ground, space & signals data across 54 African nations. One operational picture. No ITAR dependency.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "ai-content-declaration": "human-created",
    "content-type-description":
      "Defense technology company building sovereign intelligence infrastructure for Africa",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${rajdhani.variable} ${shareTechMono.variable}`}
    >
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
