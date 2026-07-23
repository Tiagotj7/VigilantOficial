"use client";

import { LogOut } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { appNav } from "@/lib/navigation";
import { NavLink } from "@/components/layout/nav-item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { logout } from "@/app/actions/auth";
import type { CurrentUser } from "@/components/layout/app-shell";

export function Sidebar({ user }: { user: CurrentUser }) {
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
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <Avatar alt={user.name} />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{user.name}</div>
              <div className="truncate text-xs text-zinc-400">{user.email}</div>
            </div>
          </div>

          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full border border-white/10 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </form>
        </div>

        <div className="h-2" />
      </div>
    </aside>
  );
}
