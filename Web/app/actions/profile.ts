"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProfileActionState = { error?: string; success?: boolean } | null;

export async function updateProfileName(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const name = String(formData.get("name") ?? "").trim();

  if (!name || name.length < 2) {
    return { error: "Informe um nome válido." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ data: { name } });

  if (error) {
    return { error: "Não foi possível atualizar o perfil." };
  }

  revalidatePath("/settings");
  return { success: true };
}
