"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Bell,
  Globe,
  Lock,
  LineChart,
  Server,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Monitoramento 24/7",
    description:
      "Monitore continuamente sites, APIs e servidores com verificações em tempo real.",
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    icon: Bell,
    title: "Alertas Inteligentes",
    description:
      "Receba notificações instantâneas por E-mail, Discord, Slack e Webhooks.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Lock,
    title: "SSL Monitoring",
    description:
      "Acompanhe certificados SSL e seja avisado antes da expiração.",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Globe,
    title: "Status Page",
    description:
      "Compartilhe uma página pública mostrando a disponibilidade dos seus serviços.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Server,
    title: "API Monitoring",
    description:
      "Valide códigos HTTP, tempo de resposta e disponibilidade das APIs.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: LineChart,
    title: "Relatórios",
    description:
      "Visualize gráficos de uptime, incidentes e desempenho histórico.",
    gradient: "from-pink-500 to-violet-500",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-36"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
            Recursos
          </span>

          <h2 className="mt-8 text-4xl font-black text-white md:text-6xl">
            Tudo que você precisa para
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {" "}monitorar sua infraestrutura
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            O Vigilant reúne todas as ferramentas necessárias para acompanhar
            seus serviços em um único painel moderno.
          </p>
        </motion.div>

        {/* Grid */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * .08,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-cyan-400/20
                "
              >
                {/* Glow */}

                <div
                  className={`
                    absolute
                    -right-20
                    -top-20
                    h-44
                    w-44
                    rounded-full
                    bg-gradient-to-r
                    ${feature.gradient}
                    opacity-10
                    blur-3xl
                  `}
                />

                {/* Ícone */}

                <div
                  className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-r
                    ${feature.gradient}
                    shadow-lg
                  `}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-5 leading-8 text-zinc-400">
                  {feature.description}
                </p>

                <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <button
                  className="
                    mt-6
                    text-sm
                    font-semibold
                    text-cyan-400
                    transition
                    group-hover:translate-x-2
                  "
                >
                  Saiba mais →
                </button>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}