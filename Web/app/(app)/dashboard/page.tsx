import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ServicesTable } from "@/components/dashboard/services-table";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { UptimeChart } from "@/components/dashboard/uptime-chart";
import { AlertTriangle, Server, Zap } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-w-0 space-y-3 sm:space-y-4">
      {/* Header cards (stack no mobile, lado a lado em telas grandes) */}
      <div className="grid min-w-0 gap-3 sm:gap-4 xl:grid-cols-[1fr_380px]">
        {/* Greeting */}
        <div className="glass min-w-0 rounded-3xl p-4 sm:p-6">
          <div className="space-y-2">
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Boa noite, Thiago <span className="align-middle">👋</span>
            </h1>

            <p className="text-sm text-zinc-400">
              Tudo funcionando normalmente.
            </p>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
              Última verificação há 14 segundos
            </div>

            <div className="pt-2">
              <Badge tone="green">Operational</Badge>
            </div>
          </div>
        </div>

        {/* Uptime geral */}
        <div className="glass min-w-0 rounded-3xl p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-semibold tracking-tight">99.98%</div>
              <div className="text-sm text-zinc-400">Uptime geral</div>
              <div className="text-xs text-emerald-300">+0.02% vs 7 dias</div>
            </div>

            {/* Ring menor no mobile, normal no desktop */}
            <div className="relative self-start sm:self-auto">
              <div className="scale-90 sm:scale-100">
                <ProgressRing value={99.98} className="glow-green" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards: 1 col no mobile, 2 no sm, 3 no lg */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <StatsCard
          icon={Server}
          iconTone="green"
          value="115"
          label="Serviços online"
          deltaText="↗ 8% vs 7 dias"
          deltaTone="up"
        />
        <StatsCard
          icon={Zap}
          iconTone="purple"
          value="89ms"
          label="Latência média"
          deltaText="↘ 12ms vs 7 dias"
          deltaTone="up"
        />
        <StatsCard
          icon={AlertTriangle}
          iconTone="red"
          value="2"
          label="Incidentes ativos"
          deltaText="↗ 1 vs 7 dias"
          deltaTone="down"
        />
      </div>

      {/* Conteúdo: stack até xl para não apertar demais */}
      <div className="grid min-w-0 gap-3 sm:gap-4 xl:grid-cols-[1fr_420px] items-start">
        <ServicesTable />
        <div className="min-w-0 space-y-3 sm:space-y-4">
          <ActivityFeed />
          <UptimeChart />
        </div>
      </div>
    </div>
  );
}