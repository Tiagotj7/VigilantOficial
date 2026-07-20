"use client";

import { Loader2 } from "lucide-react";

interface Props {
  loading: boolean;
  text: string;
  loadingText: string;
}

export default function LoadingButton({
  loading,
  text,
  loadingText,
}: Props) {
  return (
    <button
      disabled={loading}
      className="
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-3
        rounded-xl
        bg-gradient-to-b
        from-blue-500/90
        to-blue-600/90
        font-semibold
        text-white
        shadow-[0_12px_40px_rgba(59,130,246,0.25)]
        transition
        hover:from-blue-400/90
        hover:to-blue-600/90
        disabled:opacity-70
      "
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {loading ? loadingText : text}
    </button>
  );
}