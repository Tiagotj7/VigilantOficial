import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <MobileDrawer />

      <div className="hidden min-w-0 flex-1 md:block">
        <Input placeholder="Search monitors, incidents, projects..." />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="primary">
          <Plus className="h-4 w-4" />
          New monitor
        </Button>
      </div>
    </header>
  );
}