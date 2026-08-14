import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { siteName, siteUrl } from "@/content/site";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description:
    "Canadian software developer with over ten years in tech, based in Regina, Saskatchewan.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_CA",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Toaster theme="dark" position="bottom-center" />
      </body>
    </html>
  );
}
