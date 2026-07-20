import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Activity, Search } from "lucide-react";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { NotificationsMenu } from "@/components/layout/notifications-menu";
import { ProfileMenu } from "@/components/layout/profile-menu";

function SearchBar({
  className,
  showKbd,
}: {
  className?: string;
  showKbd?: boolean;
}) {
  return (
    <div className={className}>
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <Input
          className="h-10 w-full pl-9 pr-16"
          placeholder="Pesquisar monitoramentos..."
        />

        {showKbd ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Kbd>⌘ K</Kbd>
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
          <SearchBar
            className="w-full max-w-[640px]"  // ajuste aqui se quiser menor/maior
            showKbd
          />
        </div>

        {/* Ações (sempre à direita) */}
        <div className="ml-auto flex items-center gap-2">
          <IconButton aria-label="Activity">
            <Activity className="h-5 w-5 text-zinc-200" />
          </IconButton>

          <NotificationsMenu />

          <ProfileMenu />
        </div>
      </div>

      {/* Search MOBILE: segunda linha, full width */}
      <div className="mt-3 md:hidden">
        <SearchBar showKbd={false} />
      </div>
    </header>
  );
}