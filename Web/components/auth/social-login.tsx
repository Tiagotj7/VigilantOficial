"use client";

import { FcGoogle } from "react-icons/fc";

interface SocialLoginProps {
  text: string;
}

export default function SocialLogin({
  text,
}: SocialLoginProps) {
  return (
    <button
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
      "
    >
      <FcGoogle size={18} />

      {text}
    </button>
  );
}