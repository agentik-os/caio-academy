import * as React from "react";
import { cn } from "@/lib/utils";

export function Prose({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "w-full min-w-0 max-w-[68ch] break-words text-[15px] leading-[1.65] text-[color:var(--color-ink)] sm:text-base sm:leading-[1.7]",
        "[&_p]:mb-5 sm:[&_p]:mb-6",
        "[&_h1]:mt-10 [&_h1]:mb-5 [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-black [&_h1]:tracking-tight sm:[&_h1]:mt-12 sm:[&_h1]:mb-6 sm:[&_h1]:text-4xl md:[&_h1]:text-5xl",
        "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight sm:[&_h2]:mt-12 sm:[&_h2]:mb-5 sm:[&_h2]:text-3xl",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold sm:[&_h3]:mt-10 sm:[&_h3]:mb-4 sm:[&_h3]:text-2xl",
        "[&_h4]:mt-7 [&_h4]:mb-3 [&_h4]:font-serif [&_h4]:text-lg [&_h4]:font-bold sm:[&_h4]:mt-8 sm:[&_h4]:text-xl",
        "[&_pre]:overflow-x-auto [&_pre]:max-w-full",
        "[&_blockquote]:text-base sm:[&_blockquote]:text-xl",
        "[&_a]:border-b [&_a]:border-[color:var(--color-ink)] [&_a]:transition-colors [&_a]:duration-150 hover:[&_a]:border-transparent",
        "[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:mb-2",
        "[&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:mb-2",
        "[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-[color:var(--color-ink)] [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:leading-snug",
        "[&_hr]:my-12 [&_hr]:border-[color:var(--color-line)]",
        "[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm",
        "[&_th]:border-b [&_th]:border-[color:var(--color-ink)] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold",
        "[&_td]:border-b [&_td]:border-[color:var(--color-line)] [&_td]:px-3 [&_td]:py-2",
        "[&_code:not(pre_code)]:border [&_code:not(pre_code)]:border-[color:var(--color-line)] [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:text-[0.9em] [&_code:not(pre_code)]:font-mono",
        "[&_img]:my-8 [&_img]:border [&_img]:border-[color:var(--color-line)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
