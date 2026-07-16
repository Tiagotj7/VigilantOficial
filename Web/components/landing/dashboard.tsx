"use client";

import { motion } from "framer-motion";

import DashboardSidebar from "./dashboard-sidebar";
import DashboardHeader from "./dashboard-header";
import DashboardMetrics from "./dashboard-metrics";
import DashboardChart from "./dashboard-chart";
import DashboardMonitors from "./dashboard-monitors";

export default function Dashboard() {
  return (
    <section
      id="dashboard"
      className="
        relative
        z-20
        pt-32
        pb-36
      "
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
          }}
          className="
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-[#090909]
            shadow-2xl
            shadow-cyan-500/10
          "
        >

          <div className="flex min-h-[850px]">

            <DashboardSidebar />

            <div className="flex-1">

              <DashboardHeader />

              <div className="space-y-8 p-8">

                <DashboardMetrics />

                <DashboardChart />

                <DashboardMonitors />

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}