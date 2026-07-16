"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Clock3,
  Activity,
} from "lucide-react";

import HeroGlow from "./hero-glow";
import HeroBackground from "./hero-background";
import HeroFloating from "./hero-floating";
import HeroTrust from "./hero-trust";

import Announcement from "./announcement";

const stats = [
  {
    icon: ShieldCheck,
    value: "99.99%",
    label: "Uptime",
  },
  {
    icon: Clock3,
    value: "<100ms",
    label: "Latency",
  },
  {
    icon: Activity,
    value: "24/7",
    label: "Monitoring",
  },
];

export default function Hero() {
  return (
    <section
      className="
        relative
        z-10
        flex
        min-h-screen
        items-center
        pt-28
      "
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-2">

        <Announcement />

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .8,
            delay: .2,
          }}
          className="
            mx-auto
            mt-12
            max-w-5xl
            text-center
          "
        >
          <h1
            className="
              text-5xl
              font-black
              leading-none
              tracking-tight
              text-white
              md:text-7xl
              xl:text-8xl
            "
          >
            Monitore sua infraestrutura

            <span
              className="
                mt-4
                block
                bg-gradient-to-r
                from-cyan-400
                via-sky-400
                to-violet-500
                bg-clip-text
                text-transparent
              "
            >
              em tempo real.
            </span>
          </h1>

          <p
            className="
              mx-auto
              mt-10
              max-w-3xl
              text-lg
              leading-8
              text-zinc-400
              md:text-xl
            "
          >
            O Vigilant acompanha continuamente seus sites,
            APIs, servidores e certificados SSL,
            enviando alertas instantâneos antes que seus
            clientes percebam qualquer problema.
          </p>

          <div
            className="
              mt-12
              flex
              flex-col
              items-center
              justify-center
              gap-5
              sm:flex-row
            "
          >
            <Link
              href="/register"
              className="
                flex
                h-14
                items-center
                gap-3
                rounded-2xl
                bg-white
                px-8
                font-semibold
                text-black
                transition
                hover:scale-105
              "
            >
              Começar Gratuitamente

              <ArrowRight size={18} />
            </Link>

            <Link
              href="#dashboard"
              className="
                flex
                h-14
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-8
                font-medium
                text-white
                backdrop-blur-xl
                transition
                hover:bg-white/10
              "
            >
              <PlayCircle size={20} />

              Ver Demonstração
            </Link>
          </div>

          <div
            className="
              mt-16
              grid
              gap-8
              sm:grid-cols-3
            "
          >
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                    backdrop-blur-xl
                  "
                >
                  <Icon
                    className="
                      mx-auto
                      mb-4
                      text-cyan-400
                    "
                    size={24}
                  />

                  <h3
                    className="
                      text-3xl
                      font-black
                      text-white
                    "
                  >
                    {item.value}
                  </h3>

                  <p className="mt-2 text-zinc-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

        </motion.div>

      </div>
    </section>
  );
}