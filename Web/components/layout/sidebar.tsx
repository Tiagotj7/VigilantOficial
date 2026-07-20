"use client";

"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { appNav } from "@/lib/navigation";
import { NavLink } from "@/components/layout/nav-item";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

export function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    // TODO: substituir por chamada real de logout (limpar sessão/token)
    router.push("/login");
  }

  return (
    <aside className="hidden h-full min-h-0 md:block">
      <div className="glass no-scrollbar h-full min-h-0 w-72 overflow-y-auto rounded-3xl p-4">
        <div className="px-1">
          <Logo />
        </div>

        <Separator className="my-4" />

        <nav className="space-y-1">
          {appNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-zinc-400">Plano Pro</div>
            <div className="mt-2 text-sm text-zinc-200">
              <span className="font-medium">78%</span> utilizado
            </div>
            <Progress value={78} className="mt-3" />
            <div className="mt-3 text-[11px] text-zinc-500">Renova em 23 dias</div>
            <Button className="mt-3 w-full">Gerenciar plano</Button>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <Avatar alt="Thiago Santos" />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">Thiago Santos</div>
              <div className="text-xs text-zinc-400">Administrador</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>

        <div className="h-2" />
      </div>
    </aside>
  );
}