import { useEffect } from "react";
import { NavLink, Outlet } from "react-router";
import { Toaster } from "sonner";
import { APP, NAV } from "@/config";
import { checkAIStatus } from "@/lib/ai";
import { cn } from "@/lib/utils";
import { AccessGate } from "./AccessGate";
import { ModeBadges } from "./ModeBadges";
import { RoleSwitcher } from "./RoleSwitcher";

export function AppShell() {
  useEffect(() => {
    checkAIStatus();
  }, []);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold">{APP.name}</span>
            <span className="text-xs text-muted-foreground">{APP.team} · prototipe lo-fi</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ModeBadges />
            <RoleSwitcher />
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <AccessGate>
          <Outlet />
        </AccessGate>
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
