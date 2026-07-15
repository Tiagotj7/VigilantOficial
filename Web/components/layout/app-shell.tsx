import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh w-full overflow-hidden">
      <div className="mx-auto h-full w-full max-w-[1680px] px-3 py-3 md:px-6 md:py-6">
        {/* Frame */}
        <div className="h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur md:rounded-[2.25rem] md:p-4">
          <div className="grid h-full min-h-0 gap-3 md:gap-5 md:grid-cols-[18rem_minmax(0,1fr)]">
            {/* Sidebar fixa */}
            <Sidebar />

            {/* Coluna direita: topbar fixa + main com scroll */}
            <div className="flex h-full min-h-0 min-w-0 flex-col gap-3 md:gap-5">
              <div className="shrink-0">
                <Topbar />
              </div>

              <main className="no-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden pb-28 md:pb-6">
                {children}
              </main>
            </div>
          </div>
        </div>

        <MobileBottomNav />
      </div>
    </div>
  );
}