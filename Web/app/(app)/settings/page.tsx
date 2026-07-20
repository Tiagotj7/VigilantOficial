import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { ProfileTab } from "@/components/settings/profile-tab";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Settings"
        description="Preferências, workspace, alertas e integrações."
      />

      <SettingsTabs
        tabs={[
          { id: "perfil", label: "Perfil", content: <ProfileTab /> },
          {
            id: "workspace",
            label: "Workspace",
            content: (
              <Card className="space-y-2">
                <div className="text-sm font-medium">Workspace</div>
                <p className="text-sm text-zinc-400">
                  Configurações do workspace entram no próximo marco (Auth + Workspaces).
                </p>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}