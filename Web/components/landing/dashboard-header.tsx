"use client";

import {
  Search,
  Bell,
  CircleUserRound,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        gap-3
        border-b
        border-white/10
        px-4
        py-4
        sm:px-6
        lg:px-8
        lg:py-5
      "
      id="solutions"
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">

        <Search
          size={18}
          className="shrink-0 text-zinc-500"
        />

        <input
          placeholder="Search monitors..."
          className="
            w-full
            min-w-0
            bg-transparent
            text-sm
            outline-none
            placeholder:text-zinc-500
          "
        />

      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-5">

        <Bell className="h-[18px] w-[18px] text-zinc-400 sm:h-5 sm:w-5" />

        <CircleUserRound className="h-7 w-7 text-cyan-400 sm:h-[34px] sm:w-[34px]" />

      </div>
    </header>
  );
}