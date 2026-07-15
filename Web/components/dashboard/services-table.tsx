import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Globe, Database, Server } from "lucide-react";

type ServiceStatus = "Online" | "Offline";

type ServiceRow = {
  name: string;
  subtitle: string;
  status: ServiceStatus;
  latency: string;
  uptime: string;
  lastCheck: string;
  kind: "web" | "db" | "vps";
};

const rows: ServiceRow[] = [
  {
    name: "api.empresa.com",
    subtitle: "https://api.empresa.com/health",
    status: "Online",
    latency: "28ms",
    uptime: "100%",
    lastCheck: "Agora",
    kind: "web",
  },
  {
    name: "site.com",
    subtitle: "https://www.site.com",
    status: "Online",
    latency: "41ms",
    uptime: "99.99%",
    lastCheck: "Agora",
    kind: "web",
  },
  {
    name: "mysql-database",
    subtitle: "3306",
    status: "Offline",
    latency: "—",
    uptime: "0%",
    lastCheck: "2 min atrás",
    kind: "db",
  },
  {
    name: "servidor-vps-01",
    subtitle: "192.168.0.10",
    status: "Online",
    latency: "15ms",
    uptime: "100%",
    lastCheck: "Agora",
    kind: "vps",
  },
];

function KindIcon({ kind }: { kind: ServiceRow["kind"] }) {
  const cls = "h-4 w-4 text-zinc-300";
  if (kind === "web") return <Globe className={cls} />;
  if (kind === "db") return <Database className={cls} />;
  return <Server className={cls} />;
}

function StatusBadge({ status }: { status: ServiceStatus }) {
  return status === "Online" ? (
    <Badge tone="green">Online</Badge>
  ) : (
    <Badge tone="red">Offline</Badge>
  );
}

export function ServicesTable() {
  return (
    <Card className="h-fit p-0">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm font-medium">Serviços</div>
        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/10">
          Ver todos
        </button>
      </div>

      {/* Mobile: lista (SEM tabela, SEM overflow horizontal) */}
      <div className="md:hidden">
        <div className="space-y-2 px-4 pb-4">
          {rows.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                    <KindIcon kind={r.kind} />
                  </span>

                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{r.name}</div>
                    <div className="truncate text-xs text-zinc-500">{r.subtitle}</div>
                  </div>
                </div>

                <StatusBadge status={r.status} />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                  <div className="text-zinc-500">Resposta</div>
                  <div className="mt-1 font-medium text-zinc-200">{r.latency}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                  <div className="text-zinc-500">Uptime</div>
                  <div className="mt-1 font-medium text-zinc-200">{r.uptime}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                  <div className="text-zinc-500">Última</div>
                  <div className="mt-1 font-medium text-zinc-200">{r.lastCheck}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: tabela (sem min-width forçando overflow) */}
      <div className="hidden md:block">
        <div className="border-t border-white/10">
          <table className="w-full table-fixed text-sm">
            <thead className="text-[11px] uppercase text-zinc-500">
              <tr>
                <th className="w-[44%] px-5 py-3 text-left font-medium">Serviço</th>
                <th className="w-[14%] px-3 py-3 text-left font-medium">Status</th>
                <th className="w-[14%] px-3 py-3 text-left font-medium">Resposta</th>
                <th className="w-[12%] px-3 py-3 text-left font-medium">Uptime</th>
                <th className="w-[16%] px-3 py-3 text-left font-medium">
                  Última verificação
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {rows.map((r) => (
                <tr key={r.name} className="hover:bg-white/[0.03]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <KindIcon kind={r.kind} />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{r.name}</div>
                        <div className="truncate text-xs text-zinc-500">{r.subtitle}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <StatusBadge status={r.status} />
                  </td>

                  <td className={cn("px-3 py-4", "text-zinc-200")}>{r.latency}</td>
                  <td className="px-3 py-4 text-zinc-200">{r.uptime}</td>
                  <td className="px-3 py-4 text-zinc-400">{r.lastCheck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}