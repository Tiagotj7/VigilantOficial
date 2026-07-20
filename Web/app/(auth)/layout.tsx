import type { ReactNode } from "react";

import AuthBackground from "@/components/auth/auth-background";
import AuthBackButton from "@/components/auth/auth-back-button";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {
  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-x-hidden
        overflow-y-auto
        bg-zinc-950
        px-6
        py-8
      "
    >
      <AuthBackground />

      <AuthBackButton />

      {children}

    </main>
  );
}