"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function NavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
          : "text-zinc-300 hover:bg-white/8 hover:text-white"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 transition",
          active ? "text-blue-300" : "text-zinc-400 group-hover:text-zinc-200"
        )}
      />
      <span className="truncate">{item.label}</span>
      {active ? (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.6)]" />
      ) : null}
    </Link>
  );
}