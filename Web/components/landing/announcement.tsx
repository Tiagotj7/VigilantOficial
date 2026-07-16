"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Announcement() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .6,
      }}
      className="flex justify-center py-4"
    >
      <Link
        href="/pricing"
        className="
          group
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-cyan-500/20
          bg-cyan-500/10
          px-5
          py-3
          text-sm
          font-medium
          text-cyan-300
          backdrop-blur-xl
          transition-all
          hover:border-cyan-400/40
          hover:bg-cyan-500/20
        "
      >
        <Sparkles
          size={16}
          className="text-cyan-400"
        />

        Novo • Monitoramento Inteligente

        <ArrowRight
          size={16}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </Link>
    </motion.div>
  );
}