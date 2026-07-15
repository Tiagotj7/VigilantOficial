import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-6xl px-4 py-10">
      <header className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Link href="/pricing">
            <Button variant="ghost">Pricing</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary">Open app</Button>
          </Link>
        </div>
      </header>

      <div className="mt-10">{children}</div>
    </div>
  );
}