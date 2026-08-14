"use client";

import * as React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

import type { VideoAsset } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Self-hosted looping video that plays while on screen, with a manual
 * pause/play control (WCAG 2.2.2). It never autoplays for users who
 * prefer reduced motion, and preload="none" plus a poster keeps it out
 * of the critical loading path. If the file genuinely fails to load,
 * the section renders nothing.
 */
export function VideoSection({
  video,
  className,
}: {
  video: VideoAsset;
  className?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const userPausedRef = React.useRef(false);
  const [failed, setFailed] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);

  const safePlay = React.useCallback((element: HTMLVideoElement) => {
    element.play().catch((error: unknown) => {
      // pause() while play() is pending rejects with AbortError, and
      // autoplay policies reject with NotAllowedError — neither means
      // the file is broken. Real load failures fire onError instead.
      if (
        error instanceof DOMException &&
        (error.name === "AbortError" || error.name === "NotAllowedError")
      ) {
        return;
      }
      setFailed(true);
    });
  }, []);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPausedRef.current) {
          safePlay(element);
        } else {
          element.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [safePlay]);

  if (failed) return null;

  const togglePlayback = () => {
    const element = ref.current;
    if (!element) return;
    if (element.paused) {
      userPausedRef.current = false;
      safePlay(element);
    } else {
      userPausedRef.current = true;
      element.pause();
    }
  };

  return (
    <section className={cn("mx-auto max-w-6xl px-6 py-8", className)}>
      <div className="group relative">
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
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="w-full rounded-2xl"
        />
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause video" : "Play video"}
          className="absolute right-4 bottom-4 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {playing ? (
            <PauseIcon className="size-5" aria-hidden="true" />
          ) : (
            <PlayIcon className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
}
