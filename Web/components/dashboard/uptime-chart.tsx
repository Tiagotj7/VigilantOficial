import { Card } from "@/components/ui/card";

export function UptimeChart() {
  // SVG simples para “parecer” com o chart da referência sem depender de lib agora.
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Uptime <span className="text-zinc-500">(7 dias)</span></div>
          <div className="mt-2 flex items-end gap-2">
            <div className="text-2xl font-semibold text-emerald-300">99.98%</div>
            <div className="text-xs text-emerald-300">+0.02%</div>
          </div>
        </div>
        <button className="text-xs text-blue-300 hover:underline">Ver relatório</button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
        <svg viewBox="0 0 520 160" className="h-28 w-full">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="rgba(34,197,94,0.15)" />
              <stop offset="1" stopColor="rgba(34,197,94,0.02)" />
            </linearGradient>
          </defs>

          <path
            d="M10 120 C 60 80, 90 140, 140 100 S 230 120, 280 90 S 370 130, 420 95 S 470 120, 510 85"
            fill="none"
            stroke="rgba(34,197,94,0.9)"
            strokeWidth="3"
          />
          <path
            d="M10 120 C 60 80, 90 140, 140 100 S 230 120, 280 90 S 370 130, 420 95 S 470 120, 510 85 L 510 150 L 10 150 Z"
            fill="url(#g)"
          />
        </svg>

        <div className="mt-2 flex justify-between text-[11px] text-zinc-500">
          <span>08 Mai</span><span>09 Mai</span><span>10 Mai</span><span>11 Mai</span><span>12 Mai</span><span>13 Mai</span><span>14 Mai</span>
        </div>
      </div>
    </Card>
  );
}