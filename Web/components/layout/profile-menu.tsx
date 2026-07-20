"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, LogOut, User } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!open) return;

    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleLogout() {
    // TODO: substituir por chamada real de logout (limpar sessão/token)
    setOpen(false);
    router.push("/login");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu do perfil"
        aria-expanded={open}
        className="rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
      >
        <Avatar alt="Thiago Santos" />
      </button>

      {open ? (
        <div
          className="
            glass-popover
            absolute
            right-0
            top-full
            z-50
            mt-2
            w-64
            overflow-hidden
            rounded-2xl
          "
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <Avatar alt="Thiago Santos" />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">
                Thiago Santos
              </div>
              <div className="truncate text-xs text-zinc-400">
                Administrador
              </div>
            </div>
          </div>

          <Separator />

          <nav className="p-1.5">
            <Link
              href="/settings?tab=perfil"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/8 hover:text-white"
            >
              <User className="h-4 w-4 text-zinc-400" />
              Meu perfil
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/8 hover:text-white"
            >
              <Settings className="h-4 w-4 text-zinc-400" />
              Configurações
            </Link>
          </nav>

          <Separator />

          <div className="p-1.5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}