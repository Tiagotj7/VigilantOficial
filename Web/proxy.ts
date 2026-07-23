import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Next.js 16 renomeou middleware.ts -> proxy.ts (mesma funcionalidade).
// https://nextjs.org/docs/app/api-reference/file-conventions/proxy
//
// IMPORTANTE: isto é só uma checagem OTIMISTA (evita renderizar telas
// protegidas para quem claramente não tem cookie de sessão) para dar uma
// resposta rápida ao usuário. A verificação de verdade (que decide se os
// dados podem ser acessados) acontece em app/(app)/layout.tsx, que chama
// supabase.auth.getUser() no servidor. O Next.js recomenda não confiar só
// no proxy para autorização.
const PROTECTED_PREFIXES = ["/dashboard", "/monitors", "/incidents", "/status-page", "/team", "/reports", "/integrations", "/settings"];
const AUTH_PREFIXES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser() (em vez de getSession()) valida o token com o servidor do
  // Supabase e, se necessário, renova a sessão usando o refresh token.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PREFIXES.some((p) => pathname.startsWith(p));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
