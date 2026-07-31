import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/* Brand typography: Cinzel (primary) and Montserrat (secondary). */
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const description = `${site.legalName} — ${site.tagline} Premium marine solutions delivered with precision and reliability. Our new site is coming soon.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Coming Soon`,
    template: `%s — ${site.legalName}`,
  },
  description,
  applicationName: site.legalName,
  keywords: [
    "Ma Revia",
    "Ma Revia Marine",
    "marine services",
    "yacht services",
    "marine solutions",
    "maritime",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} — Coming Soon`,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — Coming Soon`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A1D2F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
