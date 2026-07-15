import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MarketingHome() {
  return (
    <main className="space-y-10">
      <section className="space-y-4">
        <Badge tone="blue">Vigilant • Intelligent Ops Center</Badge>

        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Monitoramento premium, em um painel único.
        </h1>

        <p className="max-w-2xl text-pretty text-sm text-zinc-400 md:text-base">
          Centralize uptime, latência, incidentes e alertas com uma experiência
          moderna e minimalista — pronta para escalar.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/dashboard">
            <Button variant="primary" className="w-full sm:w-auto">
              Open dashboard
            </Button>
          </Link>
          <Link href="/pricing">
            <Button className="w-full sm:w-auto">View pricing</Button>
          </Link>
        </div>

        {/* Teste rápido pra confirmar Tailwind funcionando */}
        <div className="text-sm text-emerald-300">
          Tailwind ativo ✅
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="text-sm font-medium">Unified Monitoring</div>
          <p className="mt-2 text-sm text-zinc-400">
            Websites e APIs em um só lugar.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-medium">Incidents</div>
          <p className="mt-2 text-sm text-zinc-400">
            Histórico, timelines e status page.
          </p>
        </Card>

        <Card>
          <div className="text-sm font-medium">Smart Alerts</div>
          <p className="mt-2 text-sm text-zinc-400">
            Email, Webhook e integrações.
          </p>
        </Card>
      </section>
    </main>
  );
}