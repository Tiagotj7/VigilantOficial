"use client";

import { motion } from "framer-motion";

import IntegrationsGrid from "./integrations-grid";

export default function Integrations() {
  return (
    <section
      id="resources"
      className="py-8"
    >
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
            Integrações
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              text-white
            "
          >
            Conecte o Vigilant
            ao seu fluxo de trabalho.
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-8
              text-zinc-400
            "
          >
            Integre facilmente com as principais ferramentas
            utilizadas por equipes modernas de desenvolvimento.
          </p>

        </motion.div>

        <div className="mt-20">

          <IntegrationsGrid />

        </div>

      </div>
    </section>
  );
}