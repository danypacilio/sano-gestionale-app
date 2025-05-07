
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-medical-600">404</h1>
        <h2 className="text-2xl font-bold">Pagina non trovata</h2>
        <p className="text-muted-foreground">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button asChild className="mt-4">
          <Link to="/">Torna alla Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
