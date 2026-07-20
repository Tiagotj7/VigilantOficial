import Link from "next/link";
import { Activity } from "lucide-react";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { NotificationsMenu } from "@/components/layout/notifications-menu";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { GlobalSearch } from "@/components/layout/global-search";

export function Topbar() {
  return (
    <header className="glass rounded-3xl px-4 py-3">
      {/* Linha principal (desktop) / topo (mobile) */}
      <div className="flex items-center gap-3">
        {/* Menu mobile */}
        <div className="md:hidden">
          <MobileDrawer />
        </div>

        {/* Search DESKTOP: centralizado e com largura limitada */}
        <div className="hidden min-w-0 flex-1 md:flex">
          <GlobalSearch
            className="w-full max-w-[640px]"  // ajuste aqui se quiser menor/maior
            showKbd
          />
        </div>

        {/* Ações (sempre à direita) */}
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/monitors"
            aria-label="Ir para Monitoramentos"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            <Activity className="h-5 w-5 text-zinc-200" />
          </Link>

          <NotificationsMenu />

          <ProfileMenu />
        </div>
      </div>

      {/* Search MOBILE: segunda linha, full width */}
      <div className="mt-3 md:hidden">
        <GlobalSearch showKbd={false} />
      </div>
    </header>
  );
}