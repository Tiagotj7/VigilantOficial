"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import AuthDivider from "./auth-divider";
import AuthFooter from "./auth-footer";
import PasswordInput from "./password-input";
import SocialLogin from "./social-login";
import { useState } from "react";
import LoadingButton from "./loading-button";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <form className="space-y-6">

      {/* Email */}

      <div>

        <label className="mb-2 block text-sm text-zinc-300">
          Email
        </label>

        <div className="relative">

          <Mail
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            type="email"
            placeholder="voce@email.com"
            className="
              h-12
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              pl-11
              text-white
              outline-none
              transition
              placeholder:text-zinc-500
              focus:border-cyan-400
            "
          />

        </div>

      </div>

      {/* Senha */}

      <div>

        <div className="mb-2 flex justify-between">

          <label className="text-sm text-zinc-300">
            Senha
          </label>

          <Link
            href="/forgot-password"
            className="
              text-sm
              text-cyan-400
              hover:text-cyan-300
            "
          >
            Esqueceu?
          </Link>

        </div>

        <PasswordInput
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

      </div>

      {/* Entrar */}

      <LoadingButton
        loading={loading}
        text="Entrar"
        loadingText="Entrando..."
      />

      <AuthDivider />

      <SocialLogin
        text="Continuar com Google"
      />

      <AuthFooter
        text="Ainda não possui conta?"
        action="Criar conta"
        href="/register"
      />

    </form>
  );
}