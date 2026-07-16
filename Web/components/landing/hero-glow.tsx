"use client";

import { motion } from "framer-motion";

export default function HeroGlow() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-52
          -translate-x-1/2
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-500/20
          blur-[160px]
        "
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [.2, .35, .2],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-80
          -translate-x-1/2
          h-[700px]
          w-[700px]
          rounded-full
          bg-violet-600/15
          blur-[220px]
        "
      />
    </>
  );
}