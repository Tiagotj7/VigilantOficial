"use client";

import {
  GitBranch,
  Database,
  Cloud,
  Bell,
  Send,
  Container,
  Boxes,
  Server,
} from "lucide-react";

import IntegrationCard from "./integration-card";

const integrations = [
  {
    icon: GitBranch,
    title: "GitBranch",
    description:
      "Receba notificações e acompanhe incidentes diretamente em seus projetos.",
    color: "bg-slate-500",
  },
  {
    icon: Bell,
    title: "Discord",
    description:
      "Alertas instantâneos para sua equipe em canais dedicados.",
    color: "bg-indigo-500",
  },
  {
    icon: Send,
    title: "Telegram",
    description:
      "Notificações rápidas diretamente no seu celular.",
    color: "bg-sky-500",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description:
      "Compatível com bancos modernos para armazenar monitoramentos.",
    color: "bg-blue-500",
  },
  {
    icon: Container,
    title: "Docker",
    description:
      "Execute o Vigilant em qualquer ambiente utilizando containers.",
    color: "bg-cyan-500",
  },
  {
    icon: Boxes,
    title: "Kubernetes",
    description:
      "Escalabilidade e alta disponibilidade para grandes ambientes.",
    color: "bg-violet-500",
  },
  {
    icon: Cloud,
    title: "Cloud",
    description:
      "Integração com provedores modernos e infraestrutura em nuvem.",
    color: "bg-emerald-500",
  },
  {
    icon: Server,
    title: "API REST",
    description:
      "Automatize integrações através da API pública do Vigilant.",
    color: "bg-orange-500",
  },
];

export default function IntegrationsGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {integrations.map((item) => (
        <IntegrationCard
          key={item.title}
          {...item}
        />
      ))}
    </div>
  );
}