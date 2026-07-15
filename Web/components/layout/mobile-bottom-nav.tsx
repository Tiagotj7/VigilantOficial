"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Activity, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

type BottomNavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: BottomNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Monitoramentos", href: "/monitors", icon: Activity },
  { label: "Alertas", href: "/incidents", icon: Bell },
  { label: "Perfil", href: "/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  // Mantém simples: ativo se for exatamente a rota
  // (Se quiser, dá para considerar subrotas depois.)
  return pathname === href;
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]"
      )}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="glass grid grid-cols-4 rounded-2xl p-2">
          {items.map((it) => {
            const active = isActivePath(pathname, it.href);
            const Icon = it.icon;

            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] transition",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  active
                    ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                )}
              >
                <Icon className={cn("h-5 w-5", active ? "text-blue-300" : "")} />
                <span className="truncate">{it.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}