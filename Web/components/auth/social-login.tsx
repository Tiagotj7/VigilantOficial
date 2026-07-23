"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/lib/supabase/client";

interface SocialLoginProps {
  text: string;
}

export default function SocialLogin({ text }: SocialLoginProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setLoading(false);
    }
    // Em caso de sucesso o navegador é redirecionado pelo Supabase,
    // então não há necessidade de tratar o estado de sucesso aqui.
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        border
        border-white/10
        bg-white/5
        text-white
        transition
        hover:bg-white/10
        disabled:opacity-60
      "
    >
      <FcGoogle size={18} />
      {loading ? "Redirecionando..." : text}
    </button>
  );
}
