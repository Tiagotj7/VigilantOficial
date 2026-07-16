"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "5M+",
    label: "Checks realizados",
  },
  {
    value: "180+",
    label: "Países",
  },
  {
    value: "99.99%",
    label: "Disponibilidade",
  },
  {
    value: "<100ms",
    label: "Tempo médio",
  },
];

export default function StatsBanner() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      className="
        mt-20
        rounded-3xl
        border
        border-white/10
        bg-gradient-to-r
        from-cyan-500/10
        via-blue-500/5
        to-violet-500/10
        p-10
      "
    >
      <div
        className="
          grid
          gap-10
          text-center
          md:grid-cols-4
        "
      >
        {metrics.map((metric) => (
          <div key={metric.label}>
            <h3
              className="
                text-5xl
                font-black
                text-white
              "
            >
              {metric.value}
            </h3>

            <p
              className="
                mt-3
                text-zinc-400
              "
            >
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}