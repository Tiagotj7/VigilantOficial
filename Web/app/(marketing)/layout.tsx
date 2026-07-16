import type { ReactNode } from "react";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#050505]
        text-white
      "
    >
      {children}
    </main>
  );
}