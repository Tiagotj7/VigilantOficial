import { redirect } from "next/navigation";
import { AlertTriangle, Server, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ServicesTable } from "@/components/dashboard/services-table";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { UptimeChart } from "@/components/dashboard/uptime-chart";
import { createClient } from "@/lib/supabase/server";
import { apiFetch } from "@/lib/api";
import type { Monitor, MonitorStats, ActivityItem } from "@/lib/types";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    (user.user_metadata?.name as string | undefined)?.trim() ||
    user.email?.split("@")[0] ||
    "Usuário";

  const [monitors, stats, activity] = await Promise.all([
    apiFetch<Monitor[]>("/monitors"),
    apiFetch<MonitorStats>("/monitors/stats"),
    apiFetch<ActivityItem[]>("/monitors/activity"),
  ]);

  const apiUnavailable = monitors === null || stats === null;
  const safeMonitors = monitors ?? [];
  const safeActivity = activity ?? [];
  const safeStats: MonitorStats = stats ?? {
    totalMonitors: 0,
    onlineMonitors: 0,
    avgLatencyMs: null,
    avgUptimePct: null,
    activeIncidents: 0,
  };

  const hasMonitors = safeStats.totalMonitors > 0;

  return (
    <div className="min-w-0 space-y-3 sm:space-y-4">
      {apiUnavailable ? (
        <div className="glass rounded-3xl border border-amber-500/20 p-4 text-sm text-amber-200">
          Não foi possível conectar à API agora. Verifique se o servidor
          (Server) está rodando em <code>NEXT_PUBLIC_API_URL</code>.
        </div>
      ) : null}

      {/* Header cards */}
      <div className="grid min-w-0 gap-3 sm:gap-4 xl:grid-cols-[1fr_380px]">
        <div className="glass min-w-0 rounded-3xl p-4 sm:p-6">
          <div className="space-y-2">
            <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              {greeting()}, {displayName} <span className="align-middle">👋</span>
            </h1>

            <p className="text-sm text-zinc-400">
              {hasMonitors
                ? safeStats.activeIncidents > 0
                  ? `${safeStats.activeIncidents} incidente(s) ativo(s) no momento.`
                  : "Tudo funcionando normalmente."
                : "Você ainda não tem monitores cadastrados."}
            </p>

            <div className="pt-2">
              {hasMonitors ? (
                <Badge tone={safeStats.activeIncidents > 0 ? "red" : "green"}>
                  {safeStats.activeIncidents > 0 ? "Incidente ativo" : "Operational"}
                </Badge>
              ) : (
                <Badge tone="zinc">Sem monitores</Badge>
              )}
            </div>
          </div>
        </div>

        {/* Uptime geral */}
        <div className="glass min-w-0 rounded-3xl p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-semibold tracking-tight">
                {safeStats.avgUptimePct !== null
                  ? `${safeStats.avgUptimePct.toFixed(2)}%`
                  : "—"}
              </div>
              <div className="text-sm text-zinc-400">Uptime geral</div>
            </div>

            <div className="relative self-start sm:self-auto">
              <div className="scale-90 sm:scale-100">
                <ProgressRing value={safeStats.avgUptimePct ?? 0} className="glow-green" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <StatsCard
          icon={Server}
          iconTone="green"
          value={`${safeStats.onlineMonitors}/${safeStats.totalMonitors}`}
          label="Serviços online"
        />
        <StatsCard
          icon={Zap}
          iconTone="purple"
          value={safeStats.avgLatencyMs !== null ? `${safeStats.avgLatencyMs}ms` : "—"}
          label="Latência média"
        />
        <StatsCard
          icon={AlertTriangle}
          iconTone="red"
          value={String(safeStats.activeIncidents)}
          label="Incidentes ativos"
        />
      </div>

      {/* Conteúdo */}
      <div className="grid min-w-0 gap-3 sm:gap-4 xl:grid-cols-[1fr_420px] items-start">
        <ServicesTable monitors={safeMonitors} />
        <div className="min-w-0 space-y-3 sm:space-y-4">
          <ActivityFeed items={safeActivity} />
          <UptimeChart monitors={safeMonitors} />
        </div>
      </div>
    </div>
  );
}
