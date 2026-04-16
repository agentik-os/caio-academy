"use client";

import { useEffect, useRef, useState } from "react";

let mermaidReady: Promise<typeof import("mermaid")["default"]> | null = null;

function getMermaid() {
  if (!mermaidReady) {
    mermaidReady = import("mermaid").then((m) => {
      m.default.initialize({
        startOnLoad: false,
        theme: "neutral",
        fontFamily: "inherit",
      });
      return m.default;
    });
  }
  return mermaidReady;
}

let counter = 0;

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${++counter}`;

    getMermaid()
      .then((mermaid) => mermaid.render(id, chart))
      .then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered);
      })
      .catch((err) => {
        if (!cancelled) setError(String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-[color:var(--color-muted)]">
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
