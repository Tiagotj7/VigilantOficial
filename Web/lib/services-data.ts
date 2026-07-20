export type ServiceStatus = "Online" | "Offline";

export type ServiceRow = {
  name: string;
  subtitle: string;
  status: ServiceStatus;
  latency: string;
  uptime: string;
  lastCheck: string;
  kind: "web" | "db" | "vps";
};

export const services: ServiceRow[] = [
  {
    name: "api.empresa.com",
    subtitle: "https://api.empresa.com/health",
    status: "Online",
    latency: "28ms",
    uptime: "100%",
    lastCheck: "Agora",
    kind: "web",
  },
  {
    name: "site.com",
    subtitle: "https://www.site.com",
    status: "Online",
    latency: "41ms",
    uptime: "99.99%",
    lastCheck: "Agora",
    kind: "web",
  },
  {
    name: "mysql-database",
    subtitle: "3306",
    status: "Offline",
    latency: "—",
    uptime: "0%",
    lastCheck: "2 min atrás",
    kind: "db",
  },
  {
    name: "servidor-vps-01",
    subtitle: "192.168.0.10",
    status: "Online",
    latency: "15ms",
    uptime: "100%",
    lastCheck: "Agora",
    kind: "vps",
  },
];