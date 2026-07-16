"use client";

const stats = [
  {
    value: "99.99%",
    label: "Disponibilidade",
  },
  {
    value: "<100ms",
    label: "Latência",
  },
  {
    value: "24/7",
    label: "Monitoramento",
  },
];

export default function CtaStats() {
  return (
    <div
      className="
        mt-16
        grid
        gap-8
        md:grid-cols-3
      "
    >
      {stats.map((item) => (
        <div
          key={item.label}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
          "
        >
          <h3
            className="
              text-4xl
              font-black
              text-white
            "
          >
            {item.value}
          </h3>

          <p
            className="
              mt-2
              text-zinc-400
            "
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}