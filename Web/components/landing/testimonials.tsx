"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./testimonial-card";

const testimonials = [
  {
    name: "Crislan Silva",
    role: "CEO - Impact Academy",
    company: "Tech Solutions",
    text:
      "O Vigilant reduziu drasticamente o tempo de resposta da nossa equipe em incidentes críticos.",
  },
  {
    name: "Carlos Souza",
    role: "CTO",
    company: "Cloud Systems",
    text:
      "A configuração foi extremamente simples e os alertas chegam antes mesmo que os clientes percebam qualquer problema.",
  },
  {
    name: "Mariana Costa",
    role: "Backend Developer",
    company: "NextApps",
    text:
      "O painel é intuitivo, rápido e centraliza todas as informações importantes em um único lugar.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-8">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
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
          className="mx-auto max-w-3xl text-center"
        >
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
            Depoimentos
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              text-white
            "
          >
            Equipes confiam no Vigilant para manter seus serviços online.
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-zinc-400
            "
          >
            Desenvolvido para empresas que precisam de monitoramento confiável, rápido e inteligente.
          </p>
        </motion.div>

        <div
          className="
            mt-20
            grid
            gap-8
            lg:grid-cols-3
          "
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              {...testimonial}
            />
          ))}
        </div>

      </div>

    </section>
  );
}