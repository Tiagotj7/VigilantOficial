"use client";

export default function DashboardChart() {
  const bars = [
    40, 55, 72, 60, 82, 96, 90, 74, 86, 95,
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-6
      "
    >
      <h3 className="text-lg font-semibold text-white">
        Response Time
      </h3>

      <div className="mt-8 flex h-56 items-end gap-3">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-gradient-to-t from-cyan-500 to-violet-500"
            style={{
              height: `${bar}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}