import Image from "next/image";
import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { siteName } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label={`${siteName} — home`}>
          <Image
            src="/images/dc-logo.png"
            alt=""
            width={48}
            height={48}
            priority
          />
        </Link>
        <NavLinks className="hidden items-center gap-8 md:flex" />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
