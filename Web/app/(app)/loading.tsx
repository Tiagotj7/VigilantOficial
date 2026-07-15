import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-72" />
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-28" />
        </Card>
        <Card className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-28" />
        </Card>
        <Card className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-28" />
        </Card>
      </div>
    </div>
  );
}