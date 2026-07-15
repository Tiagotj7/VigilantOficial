"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { appNav } from "@/lib/navigation";
import { NavLink } from "@/components/layout/nav-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

  const items = useMemo(() => appNav, []);

  // trava scroll do background quando abre
  useEffect(() => {
    if (!open) return;

    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = original;
    };
  }, [open]);

  // fechar com ESC
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        className="h-10 w-10 p-0"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[100] md:hidden">
              {/* overlay */}
              <div
                className="absolute inset-0 bg-black/70"
                onClick={() => setOpen(false)}
              />

              {/* panel */}
              <div className="absolute left-0 top-0 h-full w-[88%] max-w-sm border-r border-white/10 bg-zinc-950/85 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <Logo />
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <Separator className="my-4" />

                <nav className="max-h-[calc(100dvh-7rem)] overflow-y-auto pr-1">
                  <div className="space-y-1">
                    {items.map((item) => (
                      <NavLink
                        key={item.href}
                        item={item}
                        onNavigate={() => setOpen(false)}
                      />
                    ))}
                  </div>
                </nav>

                {/* safe-area spacer */}
                <div className="h-[calc(env(safe-area-inset-bottom)+0.5rem)]" />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}