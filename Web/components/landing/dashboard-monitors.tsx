"use client";

import {
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const monitors = [
  {
    name: "www.vigilant.dev",
    status: "Online",
    uptime: "99.99%",
    response: "84 ms",
    online: true,
  },
  {
    name: "api.vigilant.dev",
    status: "Online",
    uptime: "99.97%",
    response: "91 ms",
    online: true,
  },
  {
    name: "status.vigilant.dev",
    status: "Online",
    uptime: "100%",
    response: "65 ms",
    online: true,
  },
  {
    name: "cdn.vigilant.dev",
    status: "Warning",
    uptime: "98.73%",
    response: "324 ms",
    online: false,
  },
];

export default function DashboardMonitors() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        overflow-hidden
      "
    >
      <div className="border-b border-white/10 px-6 py-5">

        <h2 className="font-semibold text-white">
          Active Monitors
        </h2>

      </div>

      <div>

        {monitors.map((monitor) => (

          <div
            key={monitor.name}
            className="
              grid
              items-center
              gap-4
              border-b
              border-white/5
              px-6
              py-5
              md:grid-cols-4
            "
          >

            <div>

              <h3 className="font-medium text-white">
                {monitor.name}
              </h3>

            </div>

            <div>

              <span
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  px-3
                  py-1
                  text-sm

                  ${
                    monitor.online
                      ? "bg-green-500/15 text-green-400"
                      : "bg-orange-500/15 text-orange-400"
                  }
                `}
              >

                {monitor.online ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <AlertTriangle size={15} />
                )}

                {monitor.status}

              </span>

            </div>

            <div className="flex items-center gap-2 text-zinc-400">

              <Clock3 size={16} />

              {monitor.response}

            </div>

            <div className="font-semibold text-cyan-400">

              {monitor.uptime}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}