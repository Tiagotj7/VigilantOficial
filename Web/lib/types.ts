export type MonitorKind = "WEB" | "DB" | "VPS" | "TCP";
export type MonitorStatus = "ONLINE" | "OFFLINE" | "DEGRADED" | "PAUSED";

export type Monitor = {
  id: string;
  name: string;
  target: string;
  kind: MonitorKind;
  status: MonitorStatus;
  lastCheckAt: string | null;
  lastLatencyMs: number | null;
  uptimePct: string;
  createdAt: string;
};

export type MonitorStats = {
  totalMonitors: number;
  onlineMonitors: number;
  avgLatencyMs: number | null;
  avgUptimePct: number | null;
  activeIncidents: number;
};

export type ActivityItem = {
  title: string;
  subtitle: string;
  time: string;
  tone: "ok" | "warn" | "danger" | "info";
};
