import Image from "next/image";

import { AlternatingSection } from "@/components/alternating-section";
import { Hero } from "@/components/hero";
import { VideoSection } from "@/components/video-section";
import {
  contact,
  hero,
  homeSections,
  homeVideo,
  intro,
  touchGrass,
} from "@/content/home";

export default function Home() {
  return (
    <>
      <Hero title={hero.title} image={hero.image} />

      <section className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
        <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl">
          {intro}
        </p>
      </section>

      {homeSections.map((section) => (
        <AlternatingSection key={section.title} section={section} />
      ))}

      <VideoSection video={homeVideo} />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl">{touchGrass.title}</h2>
        <div className="mt-10 grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
            {touchGrass.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className="grid gap-6">
            {touchGrass.images.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-2xl px-6 py-16 text-center md:py-24"
      >
        <h2 className="text-4xl md:text-5xl">{contact.title}</h2>
        <p className="mt-4 text-lg text-foreground/80">{contact.subtitle}</p>
        {/* Contact form lands in the next PR in the stack */}
      </section>
    </>
  );
}
