"use client";

const metrics = [
  {
    title: "Websites",
    value: "124",
    color: "text-cyan-400",
  },
  {
    title: "APIs",
    value: "56",
    color: "text-green-400",
  },
  {
    title: "SSL",
    value: "87",
    color: "text-violet-400",
  },
  {
    title: "Alerts",
    value: "12",
    color: "text-orange-400",
  },
];

export default function DashboardMetrics() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
          "
        >
          <p className="text-sm text-zinc-500">
            {metric.title}
          </p>

          <h3
            className={`mt-3 text-4xl font-black ${metric.color}`}
          >
            {metric.value}
          </h3>
        </div>
      ))}
    </div>
  );
}