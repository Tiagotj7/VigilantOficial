import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthContainer({
  children,
}: Props) {
  return (
    <div
      className="
        relative
        z-10
        w-full
        max-w-sm
      "
    >
      {children}
    </div>
  );
}