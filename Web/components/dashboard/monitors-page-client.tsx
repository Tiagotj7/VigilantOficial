"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServicesTable } from "@/components/dashboard/services-table";
import { CreateMonitorForm } from "@/components/dashboard/create-monitor-form";
import type { Monitor } from "@/lib/types";

export function MonitorsPageClient({ initialMonitors }: { initialMonitors: Monitor[] }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Monitors"
        description="Crie e gerencie seus monitoramentos."
        right={
          <Button variant="primary" onClick={() => setShowForm((v) => !v)}>
            Create monitor
          </Button>
        }
      />

      {showForm ? (
        <CreateMonitorForm onClose={() => setShowForm(false)} />
      ) : null}

      {initialMonitors.length === 0 && !showForm ? (
        <Card className="space-y-2">
          <div className="text-sm font-medium">Nenhum monitor criado ainda</div>
          <p className="text-sm text-zinc-400">
            Clique em &ldquo;Create monitor&rdquo; para começar a monitorar um
            serviço de verdade.
          </p>
        </Card>
      ) : (
        <ServicesTable monitors={initialMonitors} />
      )}
    </div>
  );
}
