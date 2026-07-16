"use client";

import Link from "next/link";
import {
  ArrowRight,
  Menu,
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
const links = [
  {
    label: "Soluções",
    href: "#solutions",
  },
  {
    label: "Recursos",
    href: "#resources",
  },
  {
    label: "Preços",
    href: "/pricing",
  },
  {
    label: "Contato",
    href: "#contact",
  },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-6 z-50 px-6">

      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          rounded-full
          border
          border-white/10
          bg-black/55
          px-8
          backdrop-blur-2xl
          shadow-2xl
        "
      >

        <Logo />

        <nav
          className="
            hidden
            items-center
            gap-10
            lg:flex
          "
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="
                text-sm
                font-medium
                text-zinc-300
                transition
                hover:text-cyan-400
              "
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className="
            hidden
            items-center
            gap-4
            lg:flex
          "
        >
          <Link
            href="/login"
            className="
              text-sm
              text-zinc-300
              transition
              hover:text-white
            "
          >
            Entrar
          </Link>

          <Link
            href="/register"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition-all
              hover:scale-105
            "
          >
            Começar

            <ArrowRight size={17} />
          </Link>
        </div>

        <button
          className="
            rounded-xl
            p-2
            text-white
            lg:hidden
          "
        >
          <Menu />
        </button>

      </div>

    </header>
  );
}