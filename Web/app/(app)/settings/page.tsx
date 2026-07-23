import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { SettingsTabs } from "@/components/settings/settings-tabs";
import { ProfileTab } from "@/components/settings/profile-tab";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    (user.user_metadata?.name as string | undefined)?.trim() ||
    user.email?.split("@")[0] ||
    "Usuário";

  return (
    <div className="space-y-4">
      <PageHeader
        title="Settings"
        description="Preferências, workspace, alertas e integrações."
      />

      <SettingsTabs
        tabs={[
          {
            id: "perfil",
            label: "Perfil",
            content: <ProfileTab name={displayName} email={user.email ?? ""} />,
          },
          {
            id: "workspace",
            label: "Workspace",
            content: (
              <Card className="space-y-2">
                <div className="text-sm font-medium">Workspace</div>
                <p className="text-sm text-zinc-400">
                  Configurações do workspace entram no próximo marco (times e permissões).
                </p>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
