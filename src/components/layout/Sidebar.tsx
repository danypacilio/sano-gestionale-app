
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Users,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      name: "Ricevute",
      path: "/ricevute",
      icon: <FileText className="h-5 w-5" />
    },
    {
      name: "Pazienti",
      path: "/pazienti",
      icon: <Users className="h-5 w-5" />
    },
    {
      name: "Corrispettivi",
      path: "/corrispettivi",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      name: "Impostazioni",
      path: "/impostazioni",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar h-screen flex-shrink-0 border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "flex items-center h-16 px-4",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <div className="text-sidebar-foreground font-semibold text-lg">Sano Gestionale</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent/20"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
        <Separator className="bg-sidebar-border" />
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-2 py-2 rounded-md text-sidebar-foreground group transition-all",
                  location.pathname === item.path
                    ? "bg-sidebar-accent/20 text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/10"
                )}
              >
                <div className="mr-3 flex-shrink-0 text-sidebar-foreground">
                  {item.icon}
                </div>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4">
          {!collapsed && (
            <div className="text-xs text-sidebar-foreground/70 mb-2">
              Versione 1.0.0
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
