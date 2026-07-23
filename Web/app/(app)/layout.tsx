import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: { children: ReactNode }) {
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
    <AppShell user={{ name: displayName, email: user.email ?? "" }}>
      {children}
    </AppShell>
  );
}
