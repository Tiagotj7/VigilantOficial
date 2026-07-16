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
        border-b
        border-white/10
        px-8
        py-5
      "
    >
      <div className="flex items-center gap-4">

        <Search
          size={18}
          className="text-zinc-500"
        />

        <input
          placeholder="Search monitors..."
          className="
            bg-transparent
            text-sm
            outline-none
            placeholder:text-zinc-500
          "
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell className="text-zinc-400" />

        <CircleUserRound
          size={34}
          className="text-cyan-400"
        />

      </div>
    </header>
  );
}