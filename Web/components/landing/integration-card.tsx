"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface IntegrationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export default function IntegrationCard({
  icon: Icon,
  title,
  description,
  color,
}: IntegrationCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: .25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-8
        backdrop-blur-xl
      "
    >
      <div
        className={`
          absolute
          -right-12
          -top-12
          h-40
          w-40
          rounded-full
          ${color}
          opacity-20
          blur-[80px]
        `}
      />

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/5
        "
      >
        <Icon
          size={30}
          className="text-cyan-400"
        />
      </div>

      <h3 className="mt-8 text-2xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-zinc-400">
        {description}
      </p>

      <div
        className="
          mt-8
          flex
          items-center
          gap-2
          font-medium
          text-cyan-400
        "
      >
        Saiba mais

        <ArrowUpRight
          size={18}
          className="
            transition-transform
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
        />
      </div>
    </motion.div>
  );
}