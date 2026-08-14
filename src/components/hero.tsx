import Image from "next/image";

import type { ImageAsset } from "@/content/types";

export function Hero({ title, image }: { title: string; image: ImageAsset }) {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <h1 className="relative z-10 max-w-5xl px-6 text-center text-6xl text-white md:text-8xl">
        {title}
      </h1>
    </section>
  );
}
