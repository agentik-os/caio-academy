import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { DarkModeToggle } from "./dark-mode-toggle";
import { LocaleToggle } from "./locale-toggle";
import { CtaLink } from "./cta-button";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const tSite = await getTranslations("site");

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[color:var(--color-paper)]/90 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-paper)]/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
        <Link
          href="/"
          className="font-serif text-lg font-bold tracking-tight uppercase transition-colors duration-150 hover:text-[color:var(--color-muted)]"
          aria-label={tSite("name")}
        >
          {tSite("name")}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-xs font-medium uppercase tracking-wider">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-[color:var(--color-ink)]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleToggle />
          <DarkModeToggle />
          <CtaLink href="/beta" size="sm" variant="ink" className="hidden sm:inline-flex">
            {t("beta")}
          </CtaLink>
        </div>
      </div>
    </header>
  );
}
