"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
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
    href: "#cta",
  },
  {
    label: "Contato",
    href: "#contact",
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-6">

      <div
        className="
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          rounded-full
          border
          border-white/10
          bg-black/55
          px-4
          backdrop-blur-2xl
          shadow-2xl
          sm:h-20
          sm:px-8
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
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="
            rounded-xl
            p-2
            text-white
            transition
            hover:bg-white/10
            lg:hidden
          "
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* Menu mobile */}
      {open ? (
        <div
          className="
            mx-auto
            mt-3
            max-w-7xl
            rounded-3xl
            border
            border-white/10
            bg-black/80
            p-4
            backdrop-blur-2xl
            shadow-2xl
            lg:hidden
          "
        >
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-zinc-300
                  transition
                  hover:bg-white/5
                  hover:text-cyan-400
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="
                flex
                h-12
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-sm
                font-medium
                text-zinc-200
                transition
                hover:bg-white/5
              "
            >
              Entrar
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                text-sm
                font-semibold
                text-black
                transition
                hover:scale-[1.02]
              "
            >
              Começar

              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      ) : null}

    </header>
  );
}