import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/community`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
