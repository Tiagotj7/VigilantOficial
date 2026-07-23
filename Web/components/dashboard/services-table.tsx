import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Globe, Database, Server, Radio } from "lucide-react";
import type { Monitor, MonitorKind, MonitorStatus } from "@/lib/types";

function KindIcon({ kind }: { kind: MonitorKind }) {
  const cls = "h-4 w-4 text-zinc-300";
  if (kind === "WEB") return <Globe className={cls} />;
  if (kind === "DB") return <Database className={cls} />;
  if (kind === "TCP") return <Radio className={cls} />;
  return <Server className={cls} />;
}

function StatusBadge({ status }: { status: MonitorStatus }) {
  if (status === "ONLINE") return <Badge tone="green">Online</Badge>;
  if (status === "DEGRADED") return <Badge tone="zinc">Degradado</Badge>;
  if (status === "PAUSED") return <Badge tone="zinc">Pausado</Badge>;
  return <Badge tone="red">Offline</Badge>;
}

function formatLatency(ms: number | null) {
  return ms === null ? "—" : `${ms}ms`;
}

function formatLastCheck(iso: string | null) {
  if (!iso) return "Nunca verificado";
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Agora";
  if (minutes < 60) return `${minutes} min atrás`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h atrás`;
}

export function ServicesTable({ monitors }: { monitors: Monitor[] }) {
  return (
    <Card className="h-fit p-0">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm font-medium">Serviços</div>
        <Link
          href="/monitors"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/10"
        >
          Ver todos
        </Link>
      </div>

      {monitors.length === 0 ? (
        <div className="px-5 pb-6">
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
            <p className="text-sm text-zinc-300">Nenhum serviço monitorado ainda.</p>
            <p className="mt-1 text-xs text-zinc-500">
              Crie seu primeiro monitor para ver dados reais aqui.
            </p>
            <Link
              href="/monitors"
              className="mt-3 inline-block rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/10"
            >
              Criar monitor
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile: lista */}
          <div className="md:hidden">
            <div className="space-y-2 px-4 pb-4">
              {monitors.map((r) => (
                <div
                  key={r.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                        <KindIcon kind={r.kind} />
                      </span>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{r.name}</div>
                        <div className="truncate text-xs text-zinc-500">{r.target}</div>
                      </div>
                    </div>

                    <StatusBadge status={r.status} />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                      <div className="text-zinc-500">Resposta</div>
                      <div className="mt-1 font-medium text-zinc-200">
                        {formatLatency(r.lastLatencyMs)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                      <div className="text-zinc-500">Uptime</div>
                      <div className="mt-1 font-medium text-zinc-200">{r.uptimePct}%</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-2">
                      <div className="text-zinc-500">Última</div>
                      <div className="mt-1 font-medium text-zinc-200">
                        {formatLastCheck(r.lastCheckAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: tabela */}
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
                  {monitors.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.03]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                            <KindIcon kind={r.kind} />
                          </span>
                          <div className="min-w-0">
                            <div className="truncate font-medium">{r.name}</div>
                            <div className="truncate text-xs text-zinc-500">{r.target}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <StatusBadge status={r.status} />
                      </td>

                      <td className={cn("px-3 py-4", "text-zinc-200")}>
                        {formatLatency(r.lastLatencyMs)}
                      </td>
                      <td className="px-3 py-4 text-zinc-200">{r.uptimePct}%</td>
                      <td className="px-3 py-4 text-zinc-400">
                        {formatLastCheck(r.lastCheckAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
