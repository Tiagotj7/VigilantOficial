import { Logo } from "@/components/brand/logo";
import { appNav } from "@/lib/navigation";
import { NavLink } from "@/components/layout/nav-item";
import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-72 md:flex-col">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
        <Logo />
        <Separator className="my-4" />
        <nav className="space-y-1">
          {appNav
            .filter((i) => i.href !== "/security") // remova essa linha se criar a página
            .map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
        </nav>
        <Separator className="my-4" />
        <div className="text-xs text-zinc-400">
          <div className="flex items-center justify-between">
            <span>Status</span>
            <span className="text-emerald-300">Operational</span>
          </div>
          <div className="mt-2 text-[11px] leading-relaxed">
            Premium UX + arquitetura escalável.
          </div>
        </div>
      </div>
    </aside>
  );
}