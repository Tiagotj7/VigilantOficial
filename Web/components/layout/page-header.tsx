import { cn } from "@/lib/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  right?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, description, right, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-end md:justify-between", className)}>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="text-sm text-zinc-400">{description}</p> : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}