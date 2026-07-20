import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProfileTab() {
  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar alt="Thiago Santos" size={64} />
        <div>
          <div className="text-sm font-medium text-white">Thiago Santos</div>
          <div className="text-xs text-zinc-400">Administrador</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">Nome</label>
          <Input defaultValue="Thiago Santos" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-400">E-mail</label>
          <Input defaultValue="thiago.santos@empresa.com" type="email" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Salvar alterações</Button>
      </div>
    </Card>
  );
}