import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { CtaLink } from "@/components/cta-button";
import { Stat } from "@/components/stat";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const tStats = await getTranslations("stats");

  return (
    <PageShell>
      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto max-w-7xl px-6 py-32 md:py-40">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-muted)]">
            Whitepaper · Beta Phase II · 2026
          </p>
          <h1 className="max-w-5xl font-serif text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.7] text-[color:var(--color-muted)] md:text-xl">
            {t("lead")}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <CtaLink href="/beta" variant="ink" size="lg">
              {t("cta_primary")}
            </CtaLink>
            <CtaLink href="/formations" variant="outline" size="lg">
              {t("cta_secondary")}
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-3">
          <Stat value="5" label={tStats("avatars")} />
          <Stat value="1" suffix="M€" label={tStats("revenue")} />
          <Stat value="II" label={tStats("phase")} />
        </div>
      </section>
    </PageShell>
  );
}
