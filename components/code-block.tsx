"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLPreElement> & {
  language?: string;
  filename?: string;
};

export function CodeBlock({ children, className, language, filename, ...props }: Props) {
  const ref = React.useRef<HTMLPreElement>(null);
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    const text = ref.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <figure className="my-8 border border-[color:var(--color-line)] bg-[color:var(--color-paper)]">
      {(filename || language) && (
        <figcaption className="flex items-center justify-between border-b border-[color:var(--color-line)] bg-[color:var(--color-secondary)] px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider text-[color:var(--color-muted)]">
          <span>{filename ?? language}</span>
        </figcaption>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="absolute right-2 top-2 inline-flex size-8 items-center justify-center border border-[color:var(--color-line)] bg-[color:var(--color-paper)] text-[color:var(--color-muted)] transition-colors duration-150 hover:text-[color:var(--color-ink)]"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
        <pre
          ref={ref}
          className={cn(
            "overflow-x-auto p-4 pr-12 font-mono text-[0.85rem] leading-relaxed",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </figure>
  );
}
