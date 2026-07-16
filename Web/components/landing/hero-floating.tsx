"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Bell,
  ShieldCheck,
  Activity,
} from "lucide-react";

const cards = [
  {
    icon: Globe,
    title: "Website",
    value: "Online",
  },
  {
    icon: Bell,
    title: "Alertas",
    value: "Ativos",
  },
  {
    icon: ShieldCheck,
    title: "SSL",
    value: "Seguro",
  },
  {
    icon: Activity,
    title: "API",
    value: "99.99%",
  },
];

export default function HeroFloating() {
  return (
    <>
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
              absolute
              hidden
              xl:flex
              flex-col
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-4
              backdrop-blur-xl
              ${
                index === 0
                  ? "left-20 top-56"
                  : index === 1
                  ? "right-20 top-72"
                  : index === 2
                  ? "left-28 bottom-36"
                  : "right-32 bottom-44"
              }
            `}
          >
            <Icon
              size={22}
              className="text-cyan-400"
            />

            <span className="text-xs text-zinc-400">
              {card.title}
            </span>

            <strong className="text-white">
              {card.value}
            </strong>
          </motion.div>
        );
      })}
    </>
  );
}