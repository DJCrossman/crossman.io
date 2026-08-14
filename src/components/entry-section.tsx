import Image from "next/image";

import { VideoSection } from "@/components/video-section";
import { Button } from "@/components/ui/button";
import type { Entry } from "@/content/types";
import { videoFileExists } from "@/lib/videos";

export function EntrySection({ entry }: { entry: Entry }) {
  const video =
    entry.video && videoFileExists(entry.video.src) ? entry.video : undefined;

  return (
    <article className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 className="sr-only">{entry.name}</h2>
        {entry.years ? (
          <p className="font-heading text-xl font-bold text-foreground/70">
            {entry.years}
          </p>
        ) : null}

        <div className="mt-8 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Image
              src={entry.logo.src}
              alt={entry.logo.alt}
              width={entry.logo.width}
              height={entry.logo.height}
              sizes="(min-width: 768px) 40vw, 80vw"
              className="max-h-20 w-auto max-w-72"
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/90">
              {entry.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            {entry.link ? (
              <Button
                size="lg"
                className="mt-8 font-heading font-bold uppercase tracking-wide"
                render={
                  <a
                    href={entry.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {entry.link.label}
              </Button>
            ) : null}
          </div>
          {entry.banner ? (
            <Image
              src={entry.banner.src}
              alt={entry.banner.alt}
              width={entry.banner.width}
              height={entry.banner.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="max-h-[32rem] w-full rounded-2xl object-cover"
            />
          ) : null}
          {video && !entry.banner ? (
            <VideoSection video={video} className="max-w-none px-0 py-0" />
          ) : null}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl">{entry.roleTitle}</h3>
          <div className="mt-4 space-y-4 text-lg leading-relaxed text-foreground/90">
            {entry.role.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-2xl md:text-3xl">{entry.learnedTitle}</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-lg leading-relaxed text-foreground/90">
              {entry.learned.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl">{entry.workedOnTitle}</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-lg leading-relaxed text-foreground/90">
              {entry.workedOn.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
