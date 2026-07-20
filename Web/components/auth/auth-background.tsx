"use client";

import { motion } from "framer-motion";

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Glow azul */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
          absolute
          left-0
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500
          blur-[170px]
        "
      />

      {/* Glow roxo */}

      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-0
          right-0
          h-[700px]
          w-[700px]
          rounded-full
          bg-emerald-600
          blur-[220px]
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

    </div>
  );
}