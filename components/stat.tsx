import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: React.ReactNode;
  label: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
};

export function Stat({ value, label, suffix, className }: Props) {
  return (
    <div className={cn("border-l border-[color:var(--color-ink)] pl-6", className)}>
      <div className="font-serif text-5xl font-black tracking-tight md:text-6xl">
        {value}
        {suffix && (
          <span className="text-3xl font-bold text-[color:var(--color-muted)] md:text-4xl">
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
        {label}
      </div>
    </div>
  );
}
