import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { legalLinks, navItems, socialLinks, siteName } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("nav");
  const tLegal = await getTranslations("legal");
  const tFooter = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[color:var(--color-line)] bg-[color:var(--color-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="font-serif text-xl font-bold uppercase tracking-tight">{siteName}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[color:var(--color-muted)]">
              {tFooter("tagline")}
            </p>
          </div>

          <FooterColumn title={tFooter("sitemap")}>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors duration-150 hover:text-[color:var(--color-ink)]"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={tFooter("resources")}>
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 hover:text-[color:var(--color-ink)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={tFooter("legal")}>
            {legalLinks.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="transition-colors duration-150 hover:text-[color:var(--color-ink)]"
                >
                  {tLegal(item.key)}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[color:var(--color-line)] pt-8 text-xs text-[color:var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteName}. {tFooter("rights")}.
          </p>
          <p>{tFooter("made")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider">{title}</h2>
      <ul className="space-y-2 text-sm text-[color:var(--color-muted)]">{children}</ul>
    </div>
  );
}
