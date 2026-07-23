"use client";

import { motion } from "framer-motion";
import TestimonialStars from "./testimonial-stars";

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  text: string;
}

export default function TestimonialCard({
  name,
  role,
  company,
  text,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-8
        backdrop-blur-xl
      "
    >
      <TestimonialStars />

      <p
        className="
          mt-6
          leading-8
          text-zinc-300
        "
      >
        &ldquo;{text}&rdquo;
      </p>

      <div className="mt-8 flex items-center gap-4">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-cyan-500
            to-violet-500
            text-lg
            font-bold
            text-white
          "
        >
          {name.charAt(0)}
        </div>

        <div>

          <h3 className="font-semibold text-white">
            {name}
          </h3>

          <p className="text-sm text-zinc-400">
            {role}
          </p>

          <p className="text-xs text-cyan-400">
            {company}
          </p>

        </div>

      </div>
    </motion.div>
  );
}
