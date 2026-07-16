"use client";

import {
  Globe,
  Search,
  TriangleAlert,
  BellRing,
} from "lucide-react";

import TimelineCard from "./timeline-card";
import TimelineLine from "./timeline-line";

const steps = [
  {
    icon: Globe,
    step: "01",
    title: "Cadastre seu monitor",
    description:
      "Adicione websites, APIs, servidores ou certificados SSL em poucos segundos.",
  },
  {
    icon: Search,
    step: "02",
    title: "Monitoramento contínuo",
    description:
      "O Vigilant realiza verificações automáticas em intervalos configuráveis.",
  },
  {
    icon: TriangleAlert,
    step: "03",
    title: "Detecção inteligente",
    description:
      "Problemas são identificados rapidamente antes de impactarem seus usuários.",
  },
  {
    icon: BellRing,
    step: "04",
    title: "Alertas instantâneos",
    description:
      "Receba notificações por diversos canais e acompanhe relatórios completos.",
  },
];

export default function Timeline() {
  return (
    <section className="relative py-10">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span
            className="
              rounded-full
              border
              border-cyan-500/20
              bg-cyan-500/10
              px-4
              py-2
              text-sm
              text-cyan-300
            "
          >
            Como funciona
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              text-white
            "
          >
            Configure uma vez.
            Monitore para sempre.
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-zinc-400
            "
          >
            Um fluxo simples para manter toda a sua infraestrutura
            disponível 24 horas por dia.
          </p>

        </div>

        <div className="relative mt-24">

          <TimelineLine />

          <div
            className="
              grid
              gap-8
              xl:grid-cols-4
            "
          >
            {steps.map((step) => (
              <TimelineCard
                key={step.step}
                {...step}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}