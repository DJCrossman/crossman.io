import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where supported (smaller than the WebP-only default),
    // falling back to WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
