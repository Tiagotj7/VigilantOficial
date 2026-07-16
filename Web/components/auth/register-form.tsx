"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";

import AuthDivider from "./auth-divider";
import AuthFooter from "./auth-footer";
import PasswordInput from "./password-input";
import SocialLogin from "./social-login";
import PasswordStrength from "./password-strength";
import LoadingButton from "./loading-button";

export default function RegisterForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        // TODO: substituir por chamada real de cadastro
        setTimeout(() => {
            router.push("/login");
        }, 600);
    }

    return (
        <form className="space-y-2.5" onSubmit={handleSubmit}>

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
                        type="text"
                        placeholder="João da Silva"
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
                        type="email"
                        placeholder="voce@email.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha"
                />

                <PasswordStrength password={password} />

            </div>

            {/* Confirmar senha */}

            <div>

                <label className="mb-1 block text-sm text-zinc-300">
                    Confirmar senha
                </label>

                <PasswordInput placeholder="Digite novamente" />

            </div>

            {/* Termos */}

            <label className="flex items-start gap-3 text-sm text-zinc-400">

                <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
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
                loading={loading}
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