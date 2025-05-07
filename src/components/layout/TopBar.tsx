
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

export function TopBar() {
  const fiscalYear = new Date().getFullYear();

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex-1 flex gap-2 items-center">
          <h2 className="text-xl font-semibold">
            Anno Fiscale: {fiscalYear}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Cambia
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Seleziona Anno</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{fiscalYear}</DropdownMenuItem>
              <DropdownMenuItem>{fiscalYear - 1}</DropdownMenuItem>
              <DropdownMenuItem>{fiscalYear - 2}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}
