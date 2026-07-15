import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ShieldAlert, PlusCircle } from "lucide-react";

type ActivityItem = {
  title: string;
  subtitle: string;
  time: string;
  tone: "ok" | "warn" | "danger" | "info";
};

const items: ActivityItem[] = [
  { title: "api.empresa.com", subtitle: "Voltou ao ar", time: "3 min atrás", tone: "ok" },
  { title: "servidor-vps-01", subtitle: "Fora do ar", time: "10 min atrás", tone: "danger" },
  { title: "SSL expira em 7 dias", subtitle: "site.com", time: "1 hora atrás", tone: "warn" },
  { title: "Novo monitoramento", subtitle: "api.nova.com", time: "Hoje, 09:21", tone: "info" },
];

function Icon({ tone }: { tone: ActivityItem["tone"] }) {
  const cls = "h-5 w-5";
  if (tone === "ok") return <CheckCircle2 className={cls + " text-emerald-300"} />;
  if (tone === "danger") return <ShieldAlert className={cls + " text-rose-300"} />;
  if (tone === "warn") return <AlertTriangle className={cls + " text-amber-300"} />;
  return <PlusCircle className={cls + " text-blue-300"} />;
}

export function ActivityFeed() {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Atividade recente</div>
        <button className="text-xs text-blue-300 hover:underline">Ver todas</button>
      </div>

      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.title + it.time} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-start gap-3">
              <Icon tone={it.tone} />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{it.title}</div>
                <div className="truncate text-xs text-zinc-400">{it.subtitle}</div>
              </div>
            </div>
            <div className="text-xs text-zinc-500">{it.time}</div>
          </div>
        ))}
      </div>

      <div className="pt-1">
        <Badge tone="zinc">Mock data</Badge>
      </div>
    </Card>
  );
}