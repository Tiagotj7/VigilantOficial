import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto min-h-dvh max-w-3xl px-4 py-10">
      <Card className="space-y-3">
        <h1 className="text-lg font-semibold">Page not found</h1>
        <p className="text-sm text-zinc-400">
          Essa página não existe ou foi movida.
        </p>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="primary">Go home</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}