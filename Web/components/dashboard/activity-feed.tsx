import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, ShieldAlert, PlusCircle } from "lucide-react";
import type { ActivityItem } from "@/lib/types";

function Icon({ tone }: { tone: ActivityItem["tone"] }) {
  const cls = "h-5 w-5";
  if (tone === "ok") return <CheckCircle2 className={cls + " text-emerald-300"} />;
  if (tone === "danger") return <ShieldAlert className={cls + " text-rose-300"} />;
  if (tone === "warn") return <AlertTriangle className={cls + " text-amber-300"} />;
  return <PlusCircle className={cls + " text-blue-300"} />;
}

function formatTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Agora";
  if (minutes < 60) return `${minutes} min atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atrás`;
  return new Date(iso).toLocaleDateString("pt-BR");
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Atividade recente</div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 p-4 text-center text-xs text-zinc-500">
          Nenhuma atividade ainda. Assim que houver incidentes ou novos monitores, eles aparecem aqui.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((it, idx) => (
            <div
              key={`${it.title}-${it.time}-${idx}`}
              className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div className="flex items-start gap-3">
                <Icon tone={it.tone} />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{it.title}</div>
                  <div className="truncate text-xs text-zinc-400">{it.subtitle}</div>
                </div>
              </div>
              <div className="text-xs text-zinc-500">{formatTime(it.time)}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
