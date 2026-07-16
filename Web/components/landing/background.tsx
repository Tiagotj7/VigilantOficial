"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0 bg-[#050505]" />

      {/* Aurora Superior */}

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-72
          -top-72
          h-[900px]
          w-[900px]
          rounded-full
          bg-cyan-500/15
          blur-[180px]
        "
      />

      {/* Aurora Direita */}

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-300px]
          top-[120px]
          h-[800px]
          w-[800px]
          rounded-full
          bg-violet-600/15
          blur-[180px]
        "
      />

      {/* Glow Central */}

      <motion.div
        animate={{
          opacity: [.08, .15, .08],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500
          blur-[220px]
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.045]
          [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      {/* Glow Superior */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-80
          bg-gradient-to-b
          from-cyan-500/10
          to-transparent
        "
      />

      {/* Glow Inferior */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-96
          bg-gradient-to-t
          from-black
          via-black/40
          to-transparent
        "
      />

      {/* Vinheta */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.7)_100%)]
        "
      />

    </div>
  );
}