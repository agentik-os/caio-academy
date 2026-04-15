import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "ink" | "outline";
type Size = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center whitespace-nowrap border font-medium uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-ink)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  ink: "border-[color:var(--color-ink)] bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-paper)] hover:text-[color:var(--color-ink)]",
  outline:
    "border-[color:var(--color-ink)] bg-[color:var(--color-paper)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-paper)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-4 text-[0.7rem]",
  md: "h-11 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

export const CtaButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "ink", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
CtaButton.displayName = "CtaButton";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
};

export const CtaLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "ink", size = "md", ...props }, ref) => (
    <a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
CtaLink.displayName = "CtaLink";
