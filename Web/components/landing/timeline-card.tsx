"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TimelineCardProps {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

export default function TimelineCard({
  icon: Icon,
  step,
  title,
  description,
}: TimelineCardProps) {
  return (
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
      transition={{
        duration: .6,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        relative
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-8
        backdrop-blur-xl
      "
    >
      <div
        className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-cyan-500/10
          border
          border-cyan-500/20
        "
      >
        <Icon
          className="text-cyan-400"
          size={28}
        />
      </div>

      <span
        className="
          inline-flex
          rounded-full
          bg-cyan-500/10
          px-3
          py-1
          text-xs
          font-semibold
          text-cyan-300
        "
      >
        {step}
      </span>

      <h3
        className="
          mt-6
          text-2xl
          font-bold
          text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-4
          leading-7
          text-zinc-400
        "
      >
        {description}
      </p>
    </motion.div>
  );
}