import { cn } from "@/lib/cn";

export function Progress({ value, className }: { value: number; className?: string }) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 w-full rounded-full bg-white/5", className)}>
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500/80 to-blue-400/80 shadow-[0_0_25px_rgba(59,130,246,0.25)]"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}