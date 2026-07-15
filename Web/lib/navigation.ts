import type { LucideIcon } from "lucide-react";
import { Activity, Bell, LayoutDashboard, Shield, Wrench } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const appNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Monitors", href: "/monitors", icon: Activity },
  { label: "Incidents", href: "/incidents", icon: Bell },
  { label: "Security", href: "/security", icon: Shield },
  { label: "Settings", href: "/settings", icon: Wrench },
];