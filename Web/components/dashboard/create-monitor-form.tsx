"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const KIND_OPTIONS = [
  { value: "WEB", label: "Site / API (HTTP)" },
  { value: "DB", label: "Banco de dados" },
  { value: "VPS", label: "Servidor / VPS" },
  { value: "TCP", label: "Porta TCP" },
] as const;

export function CreateMonitorForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [kind, setKind] = useState<(typeof KIND_OPTIONS)[number]["value"]>("WEB");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setError("Sessão expirada. Faça login novamente.");
        return;
      }

      const res = await fetch(`${API_URL}/monitors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name, target, kind }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.message ?? "Não foi possível criar o monitor.");
        return;
      }

      setName("");
      setTarget("");
      onClose();
      router.refresh();
    } catch {
      setError("Erro de conexão com a API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">Novo monitor</div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Nome</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="api.minhaempresa.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Tipo</label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as typeof kind)}
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-cyan-400"
            >
              {KIND_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-zinc-900">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-zinc-400">
            Alvo (URL, host:porta ou IP)
          </label>
          <Input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="https://api.minhaempresa.com/health"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Criando..." : "Criar monitor"}
          </Button>
        </div>
      </form>
    </div>
  );
}
