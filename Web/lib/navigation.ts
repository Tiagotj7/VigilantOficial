import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Activity,
  Bell,
  Globe,
  Users,
  FileText,
  Plug,
  Settings,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Monitoramentos", href: "/monitors", icon: Activity },
  { label: "Incidentes", href: "/incidents", icon: Bell },
  { label: "Status Page", href: "/status-page", icon: Globe },
  { label: "Equipe", href: "/team", icon: Users },
  { label: "Relatórios", href: "/reports", icon: FileText },
  { label: "Integrações", href: "/integrations", icon: Plug },
  { label: "Configurações", href: "/settings", icon: Settings },
];