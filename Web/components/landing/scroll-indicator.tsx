"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const scrollToNextSection = () => {
    const dashboard = document.getElementById("dashboard-preview");

    if (dashboard) {
      dashboard.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1.3,
        duration: 0.8,
      }}
      className="flex justify-center pb-20"
    >
      <button
        onClick={scrollToNextSection}
        className="
          group
          flex
          flex-col
          items-center
          gap-3
          text-zinc-500
          transition
          hover:text-white
        "
      >
        <span className="text-xs font-medium uppercase tracking-[0.35em]">
          Scroll
        </span>

        {/* Mouse */}

        <div
          className="
            relative
            flex
            h-14
            w-8
            items-start
            justify-center
            rounded-full
            border
            border-white/15
            bg-white/[0.03]
            backdrop-blur-xl
          "
        >
          <motion.div
            animate={{
              y: [4, 18, 4],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
            className="
              mt-2
              h-3
              w-3
              rounded-full
              bg-gradient-to-b
              from-cyan-400
              to-violet-500
            "
          />
        </div>

        {/* Arrow */}

        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        >
          <ChevronDown
            className="
              h-5
              w-5
              transition
              group-hover:text-cyan-400
            "
          />
        </motion.div>
      </button>
    </motion.div>
  );
}
