import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthBackButton() {
  return (
    <Link
      href="/"
      aria-label="Voltar para o início"
      className="
        absolute
        left-4
        top-4
        z-20
        inline-flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-white/5
        text-zinc-300
        backdrop-blur
        transition
        hover:bg-white/10
        hover:text-white
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500/60
        sm:left-6
        sm:top-6
      "
    >
      <ArrowLeft className="h-4 w-4" />
    </Link>
  );
}