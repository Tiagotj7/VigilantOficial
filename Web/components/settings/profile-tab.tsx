"use client";

import { useActionState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfileName, type ProfileActionState } from "@/app/actions/profile";

export function ProfileTab({ name, email }: { name: string; email: string }) {
  const [state, formAction, pending] = useActionState<ProfileActionState, FormData>(
    updateProfileName,
    null,
  );

  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar alt={name} size={64} />
        <div>
          <div className="text-sm font-medium text-white">{name}</div>
          <div className="text-xs text-zinc-400">{email}</div>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        {state?.error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {state.error}
          </div>
        ) : null}

        {state?.success ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
            Perfil atualizado.
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">Nome</label>
            <Input name="name" defaultValue={name} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">E-mail</label>
            <Input defaultValue={email} type="email" disabled />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
