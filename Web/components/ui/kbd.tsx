import { cn } from "@/lib/cn";

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300",
        className
      )}
    >
      {children}
    </kbd>
  );
}