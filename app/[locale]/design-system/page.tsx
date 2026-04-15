import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { CodeBlock } from "@/components/code-block";
import { Stat } from "@/components/stat";
import { CtaButton } from "@/components/cta-button";
import { SidebarNav } from "@/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

export default async function DesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell>
      <Section
        eyebrow="Internal"
        title="Design System"
        lead="Whitepaper minimalist B&W. Playfair Display + Inter + JetBrains Mono. Zero accent color. Sharp edges. No shadows."
      >
        <div className="space-y-16">
          <Swatches />
          <Typography />
          <Buttons />
          <Stats />
          <ProseSample />
          <CodeSample />
          <SidebarSample />
        </div>
      </Section>
    </PageShell>
  );
}

function Swatches() {
  const tokens = [
    { name: "ink", value: "var(--color-ink)" },
    { name: "paper", value: "var(--color-paper)" },
    { name: "muted", value: "var(--color-muted)" },
    { name: "line", value: "var(--color-line)" },
  ];
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Palette</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {tokens.map((t) => (
          <div key={t.name} className="border border-[color:var(--color-line)]">
            <div
              className="h-28 w-full border-b border-[color:var(--color-line)]"
              style={{ background: t.value }}
            />
            <div className="p-3 font-mono text-xs">
              <div className="font-semibold">{t.name}</div>
              <div className="text-[color:var(--color-muted)]">{t.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Typography() {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Typography</h3>
      <div className="space-y-6 border border-[color:var(--color-line)] p-8">
        <div>
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-muted)]">
            h1 — Playfair 900 / 6xl
          </p>
          <h1 className="font-serif text-6xl font-black tracking-tight">
            The transparent whitepaper
          </h1>
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-muted)]">
            h2 — Playfair 700 / 4xl
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight">
            Business plan, open by design
          </h2>
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-muted)]">
            h3 — Playfair 700 / 2xl
          </p>
          <h3 className="font-serif text-2xl font-bold">Unit economics</h3>
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-muted)]">
            body — Inter 400 / base / leading 1.7
          </p>
          <p className="max-w-[68ch] text-base leading-[1.7]">
            Typography carries the whole system. Every page reads like a printed
            whitepaper: loose lines, generous margins, sharp edges, no
            decoration. The only visual hierarchy comes from weight, family, and
            scale.
          </p>
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Buttons</h3>
      <div className="flex flex-wrap gap-4 border border-[color:var(--color-line)] p-8">
        <CtaButton variant="ink" size="sm">
          Ink · Small
        </CtaButton>
        <CtaButton variant="ink" size="md">
          Ink · Medium
        </CtaButton>
        <CtaButton variant="ink" size="lg">
          Ink · Large
        </CtaButton>
        <CtaButton variant="outline" size="md">
          Outline
        </CtaButton>
        <CtaButton variant="outline" size="md" disabled>
          Disabled
        </CtaButton>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Stats</h3>
      <div className="grid gap-10 border border-[color:var(--color-line)] p-8 md:grid-cols-3">
        <Stat value="5" label="Client avatars" />
        <Stat value="1" suffix="M€" label="Year-3 revenue" />
        <Stat value="290" label="Source documents" />
      </div>
    </div>
  );
}

function ProseSample() {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Prose</h3>
      <div className="border border-[color:var(--color-line)] p-8">
        <Prose>
          <h2>Why CAIO now</h2>
          <p>
            The Chief AI Officer role is not a prediction. It is the natural
            consequence of every enterprise mapping its workflows to agents.
            <a href="#"> Read the vision</a> for the full architecture.
          </p>
          <h3>Three pillars</h3>
          <ul>
            <li>Teach — 11 C-Suite modules, 23 courses, bilingual</li>
            <li>Certify — public registry, verifiable claims</li>
            <li>Place — curated B2B channel for alumni</li>
          </ul>
          <blockquote>
            The default answer to &ldquo;who owns AI in your company?&rdquo;
            should stop being a shrug.
          </blockquote>
          <p>
            Inline <code>Claude Code</code> references land as bordered chips.
            Tables, separators, and figures all inherit the same ink-on-paper
            discipline.
          </p>
        </Prose>
      </div>
    </div>
  );
}

function CodeSample() {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Code</h3>
      <CodeBlock filename="app/page.tsx">
        {`export default function Page() {
  return <h1>CAIO Academy</h1>;
}`}
      </CodeBlock>
    </div>
  );
}

function SidebarSample() {
  return (
    <div>
      <h3 className="mb-6 font-serif text-2xl font-bold">Sidebar Navigation</h3>
      <div className="w-72 border border-[color:var(--color-line)] p-4">
        <SidebarNav
          items={[
            {
              label: "Vision",
              children: [
                { label: "Manifesto", href: "/vision#manifesto" },
                { label: "10-year architecture", href: "/vision#architecture" },
              ],
            },
            {
              label: "Business",
              children: [
                { label: "Pricing", href: "/business-plan#pricing" },
                { label: "Unit economics", href: "/business-plan#unit" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
