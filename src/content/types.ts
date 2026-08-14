export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface VideoAsset {
  src: string;
  poster: string;
}

export interface SocialLink {
  name: "Facebook" | "GitHub" | "LinkedIn" | "Spotify";
  href: string;
}

export interface NavLink {
  label: string;
  href: "/" | "/work" | "/community";
}

/** An alternating image/text section on the home page. */
export interface HomeSection {
  title: string;
  paragraphs: string[];
  /** Renders the paragraphs in the site's italic accent style. */
  italic?: boolean;
  image: ImageAsset;
  imageSide: "left" | "right";
}

/** A case-study entry on the Work and Community pages. */
export interface Entry {
  slug: string;
  name: string;
  years?: string;
  logo: ImageAsset;
  banner?: ImageAsset;
  description: string[];
  /** External link button; omitted when the site is retired. */
  link?: { label: string; href: string };
  roleTitle: string;
  role: string[];
  learnedTitle: string;
  learned: string[];
  workedOnTitle: string;
  workedOn: string[];
  video?: VideoAsset;
}
