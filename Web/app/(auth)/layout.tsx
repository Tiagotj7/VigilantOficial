import type { ReactNode } from "react";

import AuthBackground from "@/components/auth/auth-background";

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
        bg-[#05070B]
        px-6
        py-8
      "
    >
      <AuthBackground />

      {children}

    </main>
  );
}