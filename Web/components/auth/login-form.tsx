"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useActionState } from "react";

import AuthDivider from "./auth-divider";
import AuthFooter from "./auth-footer";
import PasswordInput from "./password-input";
import SocialLogin from "./social-login";
import LoadingButton from "./loading-button";
import { login, type AuthActionState } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
    login,
    null,
  );

  return (
    <form className="space-y-4" action={formAction}>

      {state?.error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {state.error}
        </div>
      ) : null}

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
            name="email"
            type="email"
            placeholder="voce@email.com"
            required
            className="
              h-10
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
          name="password"
          placeholder="Sua senha"
          required
        />

      </div>

      {/* Entrar */}

      <LoadingButton
        loading={pending}
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