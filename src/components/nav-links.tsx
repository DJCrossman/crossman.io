"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function NavLinks({
  className,
  linkClassName,
  onNavigate,
}: {
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          aria-current={pathname === link.href ? "page" : undefined}
          className={cn(
            "font-heading text-sm font-bold lowercase tracking-wide underline-offset-8 transition-colors hover:text-foreground",
            pathname === link.href
              ? "text-foreground underline"
              : "text-foreground/80",
            linkClassName,
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
