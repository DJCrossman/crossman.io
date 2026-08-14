import type { Metadata } from "next";

import { EntrySection } from "@/components/entry-section";
import { Hero } from "@/components/hero";
import { workEntries, workHero } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Things David Crossman has worked on — from startups he founded to product teams at Offstreet, Sticker Mule, Citrus, Vivvo, and iQmetrix.",
  alternates: { canonical: "/work" },
  // Page-level openGraph replaces the layout's object entirely (including
  // the file-convention image), so the full set is spelled out.
  openGraph: {
    type: "website",
    siteName: "David Crossman",
    locale: "en_CA",
    url: "/work",
    images: "/opengraph-image.jpg",
  },
};

export default function WorkPage() {
  return (
    <>
      <Hero title={workHero.title} image={workHero.image} />
      {workEntries.map((entry) => (
        <EntrySection key={entry.slug} entry={entry} />
      ))}
    </>
  );
}
