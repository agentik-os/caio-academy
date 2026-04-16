import * as React from "react";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-14">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
