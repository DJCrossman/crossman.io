import type { Metadata } from "next";

import { EntrySection } from "@/components/entry-section";
import { Hero } from "@/components/hero";
import { workEntries, workHero } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Things David Crossman has worked on — from startups he founded to product teams at Offstreet, Sticker Mule, Citrus, Vivvo, and iQmetrix.",
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
