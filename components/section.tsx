import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  bordered?: boolean;
  as?: "section" | "article" | "div";
};

export function Section({
  eyebrow,
  title,
  lead,
  bordered = true,
  as = "section",
  className,
  children,
  ...props
}: Props) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "py-24",
        bordered && "border-b border-[color:var(--color-line)]",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-6">
        {(eyebrow || title || lead) && (
          <header className="mb-16 max-w-3xl">
            {eyebrow && (
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-6 text-lg leading-[1.7] text-[color:var(--color-muted)]">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
