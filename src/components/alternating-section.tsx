import Image from "next/image";

import type { HomeSection } from "@/content/types";
import { cn } from "@/lib/utils";

export function AlternatingSection({ section }: { section: HomeSection }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <Image
        src={section.image.src}
        alt={section.image.alt}
        width={section.image.width}
        height={section.image.height}
        sizes="(min-width: 768px) 50vw, 100vw"
        className={cn(
          "w-full rounded-2xl object-cover",
          section.imageSide === "right" && "md:order-last",
        )}
      />
      <div>
        <h2 className="text-4xl md:text-5xl">{section.title}</h2>
        <div
          className={cn(
            "mt-6 space-y-4 text-lg leading-relaxed text-foreground/90",
            section.italic && "italic",
          )}
        >
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
