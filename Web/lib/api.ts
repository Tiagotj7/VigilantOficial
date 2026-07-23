import { createClient } from "@/lib/supabase/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Chama a API (NestJS) anexando o access token da sessão Supabase atual.
 * Só deve ser usado em Server Components / Server Actions.
 */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    return null;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}
