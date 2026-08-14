import type { Metadata } from "next";

import { EntrySection } from "@/components/entry-section";
import { Hero } from "@/components/hero";
import { communityEntries, communityHero } from "@/content/community";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Things David Crossman has helped out with in the Regina tech community — HackRegina and the MSI Computer Camps.",
  alternates: { canonical: "/community" },
  openGraph: { url: "/community" },
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
