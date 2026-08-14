"use client";

import * as React from "react";

import type { VideoAsset } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Self-hosted looping video that only plays while on screen and never
 * autoplays for users who prefer reduced motion. preload="none" plus a
 * poster keeps it out of the critical loading path. If the video file
 * is missing (the originals live outside the repo), the section
 * renders nothing.
 */
export function VideoSection({
  video,
  className,
}: {
  video: VideoAsset;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.play().catch(() => setFailed(true));
        } else {
          element.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (failed) return null;

  return (
    <section className={cn("mx-auto max-w-6xl px-6 py-8", className)}>
      {/* Decorative background-style video: no audio track, no captions needed */}
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        onError={() => setFailed(true)}
        className="w-full rounded-2xl"
      />
    </section>
  );
}
