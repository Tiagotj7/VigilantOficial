"use client";

export default function HeroBackground() {
  return (
    <>
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-[700px]
          bg-gradient-to-b
          from-cyan-500/5
          via-transparent
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />
    </>
  );
}