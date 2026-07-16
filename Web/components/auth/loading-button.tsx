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
        bg-cyan-500
        font-semibold
        text-white
        transition
        hover:bg-cyan-400
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