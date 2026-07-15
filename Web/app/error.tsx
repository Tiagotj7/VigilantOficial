"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No futuro: enviar para Sentry / Logs
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto min-h-dvh max-w-3xl px-4 py-10">
      <Card className="space-y-3">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-zinc-400">
          Ocorreu um erro inesperado. Você pode tentar novamente.
        </p>
        <div className="flex gap-2">
          <Button variant="primary" onClick={reset}>Try again</Button>
        </div>
        <p className="text-xs text-zinc-500">
          Digest: {error.digest ?? "n/a"}
        </p>
      </Card>
    </div>
  );
}