"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

import CtaBackground from "./cta-background";
import CtaStats from "./cta-stats";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-10">

      <CtaBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            mx-auto
            max-w-4xl
            text-center
          "
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
            Comece hoje mesmo
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              leading-tight
              text-white
              md:text-7xl
            "
          >
            Nunca mais seja surpreendido
            por indisponibilidades.
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-xl
              leading-8
              text-zinc-400
            "
          >
            Monitore websites, APIs, servidores e certificados SSL em uma única plataforma moderna, rápida e confiável.
          </p>

          <div
            className="
              mt-12
              flex
              flex-col
              justify-center
              gap-5
              sm:flex-row
            "
          >
            <Link
              href="/register"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-white
                px-8
                py-4
                font-semibold
                text-black
                transition
                hover:scale-105
              "
            >
              Criar Conta

              <ArrowRight size={18} />
            </Link>

            <Link
              href="/pricing"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur-xl
                transition
                hover:bg-white/10
              "
            >
              <PlayCircle size={18} />

              Saiba Mais
            </Link>
          </div>

          <CtaStats />

        </motion.div>

      </div>

    </section>
  );
}