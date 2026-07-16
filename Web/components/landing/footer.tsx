"use client";

import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import { Logo } from "@/components/brand/logo";import FooterColumn from "./footer-column";
import { ArrowUp } from "lucide-react";

const product = [
  {
    label: "Recursos",
    href: "#features",
  },
  {
    label: "Integrações",
    href: "#resources",
  },
  {
    label: "Preços",
    href: "/pricing",
  },
];

const company = [
  {
    label: "Sobre",
    href: "#",
  },
  {
    label: "Contato",
    href: "#",
  },
  {
    label: "Blog",
    href: "#",
  },
];

const legal = [
  {
    label: "Privacidade",
    href: "#",
  },
  {
    label: "Termos",
    href: "#",
  },
  {
    label: "Cookies",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-16 lg:grid-cols-5">

          <div className="lg:col-span-2">

            <Logo />

            <p
              className="
                mt-8
                max-w-md
                leading-8
                text-zinc-400
              "
            >
              Plataforma moderna para monitoramento de websites,
              APIs, servidores e certificados SSL em tempo real.
            </p>

            <div className="mt-8 flex gap-4">

              <Link
                href="#"
                className="
                  rounded-xl
                  border
                  border-white/10
                  p-3
                  text-zinc-400
                  transition
                  hover:text-white
                "
              >
                <FaGithub size={20} />
              </Link>

              <Link
                href="#"
                className="
                  rounded-xl
                  border
                  border-white/10
                  p-3
                  text-zinc-400
                  transition
                  hover:text-white
                "
              >
                <FaLinkedin size={20} />
              </Link>

              <Link
                href="#"
                className="
                  rounded-xl
                  border
                  border-white/10
                  p-3
                  text-zinc-400
                  transition
                  hover:text-white
                "
              >
                <FaXTwitter size={20} />
              </Link>

            </div>

          </div>

          <FooterColumn
            title="Produto"
            links={product}
          />

          <FooterColumn
            title="Empresa"
            links={company}
          />

          <div className="space-y-10">

            <FooterColumn
              title="Legal"
              links={legal}
            />


          </div>

        </div>

        <div
          className="
            mt-20
            flex
            flex-col
            items-center
            justify-between
            gap-6
            border-t
            border-white/10
            pt-8
            md:flex-row
          "
        >
          <p className="text-sm text-zinc-500">
            © 2026 Vigilant. Todos os direitos reservados.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-sm
              text-white
              transition
              hover:bg-white/10
            "
          >
            <ArrowUp size={18} />

            Voltar ao topo
          </button>

        </div>

      </div>

    </footer>
  );
}