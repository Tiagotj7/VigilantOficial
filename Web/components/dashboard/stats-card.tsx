import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  icon: LucideIcon;
  iconTone?: "green" | "purple" | "red";
  value: string;
  label: string;
  deltaText?: string;
  deltaTone?: "up" | "down" | "neutral";
};

export function StatsCard({
  icon: Icon,
  iconTone = "green",
  value,
  label,
  deltaText,
  deltaTone = "neutral",
}: StatsCardProps) {
  const toneClass = {
    green: "bg-emerald-400/10 text-emerald-200 shadow-[0_0_25px_rgba(52,211,153,0.18)]",
    purple: "bg-violet-400/10 text-violet-200 shadow-[0_0_25px_rgba(167,139,250,0.18)]",
    red: "bg-rose-400/10 text-rose-200 shadow-[0_0_25px_rgba(251,113,133,0.18)]",
  }[iconTone];

  const deltaClass = {
    up: "text-emerald-300",
    down: "text-rose-300",
    neutral: "text-zinc-400",
  }[deltaTone];

  return (
    <Card className="flex items-center gap-4">
      <div className={cn("grid h-12 w-12 place-items-center rounded-2xl border border-white/10", toneClass)}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0">
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <div className="text-sm text-zinc-400">{label}</div>
        {deltaText ? <div className={cn("mt-1 text-xs", deltaClass)}>{deltaText}</div> : null}
      </div>
    </Card>
  );
}