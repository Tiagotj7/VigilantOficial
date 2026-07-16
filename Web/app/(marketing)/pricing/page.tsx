import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Ideal para projetos pessoais.",
    highlighted: false,
    features: [
      "5 Monitores",
      "Checks a cada 5 minutos",
      "Alertas por E-mail",
      "Dashboard",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    description: "Perfeito para startups e pequenas empresas.",
    highlighted: true,
    features: [
      "100 Monitores",
      "Checks a cada 1 minuto",
      "Status Page",
      "SSL Monitoring",
      "Webhooks",
      "Slack e Discord",
    ],
  },
  {
    name: "Business",
    price: "$99",
    description: "Escalabilidade para grandes operações.",
    highlighted: false,
    features: [
      "Monitores ilimitados",
      "Checks em 30 segundos",
      "Múltiplas equipes",
      "API",
      "Suporte prioritário",
      "Relatórios avançados",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-28">

      <div className="mx-auto max-w-3xl text-center">

        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          Pricing
        </span>

        <h1 className="mt-8 text-5xl font-black text-white">
          Escolha o plano ideal
        </h1>

        <p className="mt-6 text-lg text-zinc-400">
          Comece gratuitamente e faça upgrade quando precisar de
          mais monitoramentos e recursos.
        </p>

      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">

        {plans.map((plan) => (

          <div
            key={plan.name}
            className={`rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 ${
              plan.highlighted
                ? "border-cyan-500 bg-cyan-500/10 scale-105"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >

            <h2 className="text-2xl font-bold text-white">
              {plan.name}
            </h2>

            <p className="mt-3 text-zinc-400">
              {plan.description}
            </p>

            <div className="mt-8 flex items-end gap-2">

              <span className="text-6xl font-black text-white">
                {plan.price}
              </span>

              <span className="mb-2 text-zinc-500">
                /mês
              </span>

            </div>

            <Link
              href="/register"
              className={`mt-8 flex h-12 items-center justify-center rounded-xl font-semibold transition ${
                plan.highlighted
                  ? "bg-cyan-500 text-white hover:bg-cyan-400"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Começar Agora
            </Link>

            <div className="mt-8 space-y-4">

              {plan.features.map((feature) => (

                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <Check
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-zinc-300">
                    {feature}
                  </span>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}