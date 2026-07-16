"use client";

import {
  LayoutDashboard,
  Globe,
  Bell,
  ShieldCheck,
  Activity,
  Settings,
} from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: Globe,
    label: "Websites",
  },
  {
    icon: Activity,
    label: "APIs",
  },
  {
    icon: ShieldCheck,
    label: "SSL",
  },
  {
    icon: Bell,
    label: "Alerts",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export default function DashboardSidebar() {
  return (
    <aside
      className="
        hidden
        w-64
        border-r
        border-white/10
        bg-white/[0.02]
        xl:block
      "
    >
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-bold text-white">
          Vigilant
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Monitoring Platform
        </p>
      </div>

      <nav className="space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition

                ${
                  item.active
                    ? "bg-cyan-500/15 text-cyan-400"
                    : "text-zinc-400 hover:bg-white/5"
                }
              `}
            >
              <Icon size={18} />

              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}