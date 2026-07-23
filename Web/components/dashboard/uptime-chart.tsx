import { Card } from "@/components/ui/card";
import type { Monitor } from "@/lib/types";

export function UptimeChart({ monitors }: { monitors: Monitor[] }) {
  const withUptime = monitors.filter((m) => m.lastCheckAt !== null);

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Uptime por serviço</div>
          <div className="mt-1 text-xs text-zinc-500">
            Baseado nas checagens mais recentes
          </div>
        </div>
      </div>

      {withUptime.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 p-4 text-center text-xs text-zinc-500">
          Ainda não há checagens registradas. Os dados aparecem aqui assim que o
          monitoramento começar a rodar.
        </p>
      ) : (
        <div className="space-y-3">
          {withUptime.slice(0, 6).map((m) => {
            const pct = Number(m.uptimePct);
            return (
              <div key={m.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="truncate text-zinc-300">{m.name}</span>
                  <span className="text-zinc-400">{pct.toFixed(2)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-emerald-400/80"
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
