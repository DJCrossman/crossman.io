import { NavLinks } from "@/components/nav-links";
import { SocialIcon } from "@/components/social-icons";
import { siteName, socialLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10">
        <NavLinks className="flex items-center gap-8" />
        <ul className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <li key={social.name}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteName} on ${social.name}`}
                className="text-foreground/70 transition-colors hover:text-foreground"
              >
                <SocialIcon name={social.name} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
