import { apiFetch } from "@/lib/api";
import { MonitorsPageClient } from "@/components/dashboard/monitors-page-client";
import type { Monitor } from "@/lib/types";

export default async function MonitorsPage() {
  const monitors = (await apiFetch<Monitor[]>("/monitors")) ?? [];

  return <MonitorsPageClient initialMonitors={monitors} />;
}
