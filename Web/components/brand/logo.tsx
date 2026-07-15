import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-9 w-9 rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_30px_rgba(59,130,246,0.18)] backdrop-blur" />
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">Vigilant</div>
        <div className="text-[11px] text-zinc-400">Ops Center</div>
      </div>
    </div>
  );
}