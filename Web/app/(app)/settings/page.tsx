import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Settings"
        description="Preferências, workspace, alertas e integrações."
      />

      <Card className="space-y-2">
        <div className="text-sm font-medium">Workspace</div>
        <p className="text-sm text-zinc-400">
          Configurações do workspace entram no próximo marco (Auth + Workspaces).
        </p>
      </Card>
    </div>
  );
}