import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Client do Supabase para uso no servidor (Server Components, Server
 * Actions e Route Handlers). Lê/escreve a sessão nos cookies da request.
 *
 * Em Server Components puros a escrita de cookies falha silenciosamente
 * (Next.js não deixa um Server Component setar cookies) — por isso o
 * try/catch. Quando chamado a partir de uma Server Action ou de
 * proxy.ts, a escrita funciona normalmente e renova a sessão.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado de dentro de um Server Component — ignora.
          }
        },
      },
    },
  );
}
