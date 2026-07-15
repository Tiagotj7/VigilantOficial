import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarProps = {
  src?: string;
  alt: string;
  size?: number;
  online?: boolean;
  className?: string;
};

export function Avatar({ src, alt, size = 36, online = true, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full border border-white/10 bg-white/5",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-full text-xs text-zinc-300">
          {alt.slice(0, 1).toUpperCase()}
        </div>
      )}

      {online ? (
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.55)]" />
      ) : null}
    </div>
  );
}