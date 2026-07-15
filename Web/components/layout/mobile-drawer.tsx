"use client";

import { useMemo, useState } from "react";
import { X, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { appNav } from "@/lib/navigation";
import { NavLink } from "@/components/layout/nav-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => appNav.filter((i) => i.href !== "/security"),
    []
  );

  return (
    <div className="md:hidden">
      <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm border-r border-white/10 bg-zinc-950/70 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <Logo />
              <Button variant="ghost" className="h-10 w-10 p-0" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              {items.map((item) => (
                <NavLink key={item.href} item={item} onNavigate={() => setOpen(false)} />
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}