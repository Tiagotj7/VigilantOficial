import {
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface Props {
  type: "success" | "error";
  message: string;
}

export default function AuthAlert({
  type,
  message,
}: Props) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        border
        p-4
        text-sm

        ${
          type === "success"
            ? "border-green-500/30 bg-green-500/10 text-green-300"
            : "border-red-500/30 bg-red-500/10 text-red-300"
        }
      `}
    >
      {type === "success" ? (
        <CheckCircle2 size={18} />
      ) : (
        <AlertCircle size={18} />
      )}

      {message}
    </div>
  );
}