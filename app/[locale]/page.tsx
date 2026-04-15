import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
    <main className="mx-auto flex max-w-prose flex-1 flex-col justify-center px-6 py-24">
      <h1 className="font-serif text-5xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">{t("subtitle")}</p>
    </main>
  );
}
