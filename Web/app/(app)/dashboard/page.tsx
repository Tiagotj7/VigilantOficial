import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Dashboard"
        description="Visão geral dos serviços monitorados (mock por enquanto)."
        right={<Badge tone="green">Operational</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-xs text-zinc-400">Services</div>
          <div className="mt-2 text-3xl font-semibold">12</div>
          <div className="mt-2 text-sm text-zinc-400">8 online • 4 degraded</div>
        </Card>

        <Card>
          <div className="text-xs text-zinc-400">Avg Latency</div>
          <div className="mt-2 text-3xl font-semibold">142ms</div>
          <div className="mt-2 text-sm text-zinc-400">Last 24h</div>
        </Card>

        <Card>
          <div className="text-xs text-zinc-400">Availability</div>
          <div className="mt-2 text-3xl font-semibold">99.93%</div>
          <div className="mt-2 text-sm text-zinc-400">Last 30 days</div>
        </Card>
      </div>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Recent incidents</div>
          <Badge tone="zinc">Last 7 days</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div>
              <div className="text-sm">API - 502 Bad Gateway</div>
              <div className="text-xs text-zinc-400">Recovered • 12 min</div>
            </div>
            <Badge tone="green">Resolved</Badge>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div>
              <div className="text-sm">Website - High latency</div>
              <div className="text-xs text-zinc-400">Ongoing • 4 min</div>
            </div>
            <Badge tone="red">Investigating</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}