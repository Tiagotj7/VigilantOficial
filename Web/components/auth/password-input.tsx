"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput({
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">

      <Lock
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
        {...props}
        type={showPassword ? "text" : "password"}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          pl-11
          pr-12
          text-white
          outline-none
          transition
          placeholder:text-zinc-500
          focus:border-cyan-400
        "
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-zinc-500
          hover:text-white
        "
      >
        {showPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>

    </div>
  );
}