import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-7xl px-4 py-6">
      <div className="grid gap-4 md:grid-cols-[18rem_1fr]">
        <Sidebar />
        <div className="space-y-4">
          <Topbar />
          <main className="min-h-[70vh]">{children}</main>
        </div>
      </div>
    </div>
  );
}