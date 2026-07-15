import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "green" | "red" | "blue" | "zinc";

export function Badge({
  className,
  tone = "zinc",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  const toneClass: Record<Tone, string> = {
    green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    red: "border-rose-400/20 bg-rose-400/10 text-rose-200",
    blue: "border-blue-400/20 bg-blue-400/10 text-blue-200",
    zinc: "border-white/10 bg-white/5 text-zinc-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        toneClass[tone],
        className
      )}
      {...props}
    />
  );
}