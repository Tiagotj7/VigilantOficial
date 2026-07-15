import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";

export default function MonitorsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Monitors"
        description="Crie e gerencie monitoramentos (em breve com backend)."
        right={<Button variant="primary">Create monitor</Button>}
      />

      <Card className="space-y-2">
        <div className="text-sm font-medium">Empty state</div>
        <p className="text-sm text-zinc-400">
          Nenhum monitor criado ainda. Clique em “Create monitor”.
        </p>
      </Card>
    </div>
  );
}