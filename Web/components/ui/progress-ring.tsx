import { cn } from "@/lib/cn";

type ProgressRingProps = {
  value: number; // 0..100
  size?: number; // px
  stroke?: number; // espessura
  className?: string;
};

export function ProgressRing({
  value,
  size = 110,
  stroke = 10,
  className,
}: ProgressRingProps) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-label={`Progress ${safe}%`}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(rgba(34,197,94,0.95) ${safe}%, rgba(255,255,255,0.06) 0)`,
        }}
      />
      <div
        className="absolute rounded-full bg-zinc-950/80"
        style={{
          inset: stroke,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      />
    </div>
  );
}