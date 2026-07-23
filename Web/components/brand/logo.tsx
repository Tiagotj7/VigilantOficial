"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <div
        className="
          relative
          h-11
          w-11
          overflow-hidden
          rounded-xl
        "
      >
        <Image
          src="/logo.png" // troque pelo nome da sua logo
          alt="Vigilant"
          fill
          sizes="44px"
          className="object-contain"
          priority
        />
      </div>

      <div className="leading-tight">
        <h2 className="text-lg font-bold text-white">
          Vigilant
        </h2>

        <p className="text-xs text-zinc-400">
          Website Monitoring
        </p>
      </div>
    </Link>
  );
}
