"use client";

const companies = [
  "GitHub",
  "Vercel",
  "Docker",
  "Cloudflare",
  "Supabase",
];

export default function HeroTrust() {
  return (
    <div className="mt-20">

      <p className="text-center text-sm uppercase tracking-[0.35em] text-zinc-500">
        Tecnologias utilizadas
      </p>

      <div
        className="
          mt-10
          flex
          flex-wrap
          justify-center
          gap-8
        "
      >
        {companies.map((company) => (
          <div
            key={company}
            className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              px-6
              py-3
              text-zinc-400
              backdrop-blur-xl
            "
          >
            {company}
          </div>
        ))}
      </div>

    </div>
  );
}