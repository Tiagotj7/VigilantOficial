"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  color: string;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  description,
  color,
}: StatsCardProps) {
  return (
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
      transition={{
        duration: .6,
      }}
      whileHover={{
        y: -8,
      }}
      className="
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
          right-0
          top-0
          h-40
          w-40
          rounded-full
          ${color}
          opacity-20
          blur-[90px]
        `}
      />

      <div
        className="
          mb-8
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
          size={28}
          className="text-cyan-400"
        />
      </div>

      <p className="text-zinc-400">
        {title}
      </p>

      <h2
        className="
          mt-3
          text-5xl
          font-black
          text-white
        "
      >
        {value}
      </h2>

      <p
        className="
          mt-5
          leading-7
          text-zinc-500
        "
      >
        {description}
      </p>
    </motion.div>
  );
}