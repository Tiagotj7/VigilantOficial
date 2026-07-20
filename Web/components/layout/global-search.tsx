"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Globe, Database, Server, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { appNav } from "@/lib/navigation";
import { services } from "@/lib/services-data";
import { cn } from "@/lib/cn";

function ServiceIcon({ kind }: { kind: "web" | "db" | "vps" }) {
  const cls = "h-4 w-4 text-zinc-400";
  if (kind === "web") return <Globe className={cls} />;
  if (kind === "db") return <Database className={cls} />;
  return <Server className={cls} />;
}

export function GlobalSearch({
  className,
  showKbd,
}: {
  className?: string;
  showKbd?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const q = query.trim().toLowerCase();

  const matchedPages = useMemo(() => {
    if (!q) return [];
    return appNav.filter((item) => item.label.toLowerCase().includes(q));
  }, [q]);

  const matchedServices = useMemo(() => {
    if (!q) return [];
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q)
    );
  }, [q]);

  const hasResults = matchedPages.length > 0 || matchedServices.length > 0;

  // Atalho de teclado: Cmd/Ctrl + K foca a busca; Esc fecha
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

  function goTo(href: string) {
    router.push(href);
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function clear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="h-10 w-full pl-9 pr-16"
          placeholder="Pesquisar monitoramentos..."
        />

        {query ? (
          <button
            type="button"
            aria-label="Limpar busca"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : showKbd ? (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Kbd>⌘ K</Kbd>
          </div>
        ) : null}
      </div>

      {open && q ? (
        <div className="glass-popover absolute left-0 top-full z-50 mt-2 w-full max-h-[60vh] overflow-y-auto rounded-2xl p-1.5">
          {!hasResults ? (
            <div className="px-3 py-6 text-center text-sm text-zinc-400">
              Nenhum resultado para “{query}”.
            </div>
          ) : (
            <>
              {matchedPages.length > 0 ? (
                <div className="mb-1">
                  <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                    Páginas
                  </div>
                  {matchedPages.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        onClick={() => goTo(item.href)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-200 transition hover:bg-white/8"
                      >
                        <Icon className="h-4 w-4 text-zinc-400" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {matchedServices.length > 0 ? (
                <div>
                  <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                    Serviços
                  </div>
                  {matchedServices.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => goTo("/dashboard")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-200 transition hover:bg-white/8"
                    >
                      <ServiceIcon kind={s.kind} />
                      <span className="min-w-0 flex-1 truncate">{s.name}</span>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          s.status === "Online" ? "bg-emerald-400" : "bg-red-400"
                        )}
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}