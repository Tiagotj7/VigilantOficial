"use client";

import {
  Activity,
  Globe,
  ShieldCheck,
  BellRing,
} from "lucide-react";

import StatsCard from "./stats-card";
import StatsBanner from "./stats-banner";

const stats = [
  {
    icon: Globe,
    title: "Websites Monitorados",
    value: "50K+",
    description:
      "Empresas monitorando aplicações críticas diariamente.",
    color: "bg-cyan-500",
  },
  {
    icon: Activity,
    title: "Verificações",
    value: "2B+",
    description:
      "Checks executados todos os meses em nossa infraestrutura.",
    color: "bg-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "SSL",
    value: "120K",
    description:
      "Certificados monitorados continuamente.",
    color: "bg-violet-500",
  },
  {
    icon: BellRing,
    title: "Alertas",
    value: "1.2M",
    description:
      "Alertas enviados em tempo real para clientes.",
    color: "bg-emerald-500",
  },
];

export default function Stats() {
  return (
    <section className="py-4">

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
            Estatísticas
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              text-white
            "
          >
            Números que demonstram
            nossa confiabilidade.
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-zinc-400
            "
          >
            Milhares de desenvolvedores e empresas utilizam o
            Vigilant para manter seus serviços disponíveis.
          </p>

        </div>

        <div
          className="
            mt-20
            grid
            gap-8
            lg:grid-cols-2
            xl:grid-cols-4
          "
        >
          {stats.map((item) => (
            <StatsCard
              key={item.title}
              {...item}
            />
          ))}
        </div>

        <StatsBanner />

      </div>

    </section>
  );
}