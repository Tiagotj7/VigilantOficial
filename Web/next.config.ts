import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // O repositório tem mais de um package-lock.json. Sem uma raiz explícita,
  // o Turbopack pode escolher o lockfile do repositório e deixar de resolver
  // as dependências instaladas em Web/node_modules (inclusive @supabase/ssr).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
