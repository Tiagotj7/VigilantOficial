"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/cn";

type NotificationTone = "alert" | "success" | "info";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  tone: NotificationTone;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "cdn.vigilant.dev está lento",
    description: "Tempo de resposta acima de 300ms nos últimos 5 minutos.",
    time: "há 2 min",
    tone: "alert",
    unread: true,
  },
  {
    id: "2",
    title: "mysql-database ficou offline",
    description: "Falha na verificação de conexão na porta 3306.",
    time: "há 12 min",
    tone: "alert",
    unread: true,
  },
  {
    id: "3",
    title: "api.empresa.com voltou ao normal",
    description: "O serviço está online novamente após 3 minutos fora do ar.",
    time: "há 1 h",
    tone: "success",
    unread: false,
  },
  {
    id: "4",
    title: "Certificado SSL renovado",
    description: "site.com teve o certificado SSL renovado automaticamente.",
    time: "ontem",
    tone: "info",
    unread: false,
  },
];

const toneStyles: Record<NotificationTone, { icon: typeof Bell; className: string }> = {
  alert: { icon: AlertTriangle, className: "bg-red-500/15 text-red-400" },
  success: { icon: CheckCircle2, className: "bg-emerald-500/15 text-emerald-400" },
  info: { icon: Info, className: "bg-blue-500/15 text-blue-400" },
};

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

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

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div ref={containerRef} className="relative">
      <IconButton
        aria-label="Notificações"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell className="h-5 w-5 text-zinc-200" />
      </IconButton>

      {unreadCount > 0 ? (
        <span className="pointer-events-none absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-[11px] font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.45)]">
          {unreadCount}
        </span>
      ) : null}

      {open ? (
        <div
          className="
            glass-popover
            absolute
            right-0
            top-full
            z-50
            mt-2
            w-[320px]
            overflow-hidden
            rounded-2xl
            sm:w-[360px]
          "
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-white">Notificações</span>

            {unreadCount > 0 ? (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-300 transition hover:text-blue-200"
              >
                Marcar tudo como lido
              </button>
            ) : null}
          </div>

          <Separator />

          <div className="no-scrollbar max-h-80 overflow-y-auto">
            {notifications.map((n) => {
              const { icon: Icon, className } = toneStyles[n.tone];

              return (
                <div
                  key={n.id}
                  className={cn(
                    "flex gap-3 border-t border-white/5 px-4 py-3 transition hover:bg-white/5",
                    n.unread && "bg-white/[0.03]"
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
                      className
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium text-zinc-100">
                        {n.title}
                      </p>
                      {n.unread ? (
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      ) : null}
                    </div>

                    <p className="mt-0.5 line-clamp-2 text-xs text-zinc-400">
                      {n.description}
                    </p>

                    <p className="mt-1 text-[11px] text-zinc-500">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}