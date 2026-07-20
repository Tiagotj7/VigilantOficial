"use client";

import { useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";

type SettingsTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export function SettingsTabs({ tabs }: { tabs: SettingsTab[] }) {
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = tabs.some((t) => t.id === requestedTab)
    ? (requestedTab as string)
    : tabs[0]?.id;

  const [activeTab, setActiveTab] = useState(initialTab);
  const current = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <div className="space-y-4">
      <div className="glass flex w-fit gap-1 rounded-2xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition",
              activeTab === tab.id
                ? "bg-white/10 text-white"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {current?.content}
    </div>
  );
}