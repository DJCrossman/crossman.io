import type { Metadata } from "next";

import { EntrySection } from "@/components/entry-section";
import { Hero } from "@/components/hero";
import { communityEntries, communityHero } from "@/content/community";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Things David Crossman has helped out with in the Regina tech community — HackRegina and the MSI Computer Camps.",
  alternates: { canonical: "/community" },
  // Page-level openGraph replaces the layout's object entirely (including
  // the file-convention image), so the full set is spelled out.
  openGraph: {
    type: "website",
    siteName: "David Crossman",
    locale: "en_CA",
    url: "/community",
    images: "/opengraph-image.jpg",
  },
};

export default function CommunityPage() {
  return (
    <>
      <Hero title={communityHero.title} image={communityHero.image} />
      {communityEntries.map((entry) => (
        <EntrySection key={entry.slug} entry={entry} />
      ))}
    </>
  );
}
