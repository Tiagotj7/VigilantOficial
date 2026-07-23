"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Mail, User } from "lucide-react";

import AuthDivider from "./auth-divider";
import AuthFooter from "./auth-footer";
import PasswordInput from "./password-input";
import SocialLogin from "./social-login";
import PasswordStrength from "./password-strength";
import LoadingButton from "./loading-button";
import { signup, type AuthActionState } from "@/app/actions/auth";

export default function RegisterForm() {
    const [password, setPassword] = useState("");
    const [state, formAction, pending] = useActionState<AuthActionState, FormData>(
        signup,
        null,
    );

    return (
        <form className="space-y-2.5" action={formAction}>

            {state?.error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                    {state.error}
                </div>
            ) : null}

            {/* Nome */}

            <div>

                <label className="mb-1 block text-sm text-zinc-300">
                    Nome completo
                </label>

                <div className="relative">

                    <User
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        name="name"
                        type="text"
                        placeholder="João da Silva"
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
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-cyan-400
            "
                    />

                </div>

            </div>

            {/* Email */}

            <div>

                <label className="mb-1 block text-sm text-zinc-300">
                    Email
                </label>

                <div className="relative">

                    <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />

                    <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
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
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-cyan-400
            "
                    />

                </div>

            </div>

            {/* Senha */}

            <div>

                <label className="mb-1 block text-sm text-zinc-300">
                    Senha
                </label>

                <PasswordInput
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha"
                    required
                />

                <PasswordStrength password={password} />

            </div>

            {/* Confirmar senha */}

            <div>

                <label className="mb-1 block text-sm text-zinc-300">
                    Confirmar senha
                </label>

                <PasswordInput name="confirmPassword" placeholder="Digite novamente" required />

            </div>

            {/* Termos */}

            <label className="flex items-start gap-3 text-sm text-zinc-400">

                <input
                    type="checkbox"
                    required
                    className="mt-1 accent-cyan-500"
                />

                <span>
                    Eu concordo com os{" "}
                    <Link
                        href="/terms"
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link
                        href="/privacy"
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Política de Privacidade
                    </Link>.
                </span>

            </label>

            {/* Botão */}

            <LoadingButton
                loading={pending}
                text="Criar Conta"
                loadingText="Criando conta..."
            />

            <AuthDivider />

            <SocialLogin text="Continuar com Google" />

            <AuthFooter
                text="Já possui uma conta?"
                action="Entrar"
                href="/login"
            />

        </form>
    );
}
