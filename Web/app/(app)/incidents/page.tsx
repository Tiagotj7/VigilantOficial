import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";

export default function IncidentsPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Incidents"
        description="Lista e timeline de incidentes (placeholder)."
      />

      <Card className="space-y-2">
        <div className="text-sm font-medium">No incidents</div>
        <p className="text-sm text-zinc-400">
          Quando um monitor falhar por N tentativas, um incidente aparecerá aqui.
        </p>
      </Card>
    </div>
  );
}