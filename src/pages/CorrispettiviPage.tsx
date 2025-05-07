
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";

export default function CorrispettiviPage() {
  const months = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];
  
  const fiscalYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Corrispettivi</h1>
          <p className="text-muted-foreground">
            Visualizza e gestisci i corrispettivi mensili.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={fiscalYear.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Anno Fiscale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={fiscalYear.toString()}>{fiscalYear}</SelectItem>
              <SelectItem value={(fiscalYear - 1).toString()}>{fiscalYear - 1}</SelectItem>
              <SelectItem value={(fiscalYear - 2).toString()}>{fiscalYear - 2}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            <span>Report Annuale</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {months.map((month, index) => (
          <Card key={month}>
            <CardHeader className="pb-2">
              <CardTitle>{month}</CardTitle>
              <CardDescription>
                {index < 5 ? `${fiscalYear}` : `${fiscalYear - 1}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                € {index < 5 ? ((5 - index) * 1200 + Math.floor(Math.random() * 800)).toLocaleString() : "0,00"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {index < 5 ? `${Math.floor(10 + index * 2)} ricevute` : "Nessuna ricevuta"}
              </div>
              <div className="mt-3">
                {index < 5 ? (
                  <Button size="sm" variant="outline" className="w-full">
                    Dettagli
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" disabled>
                    Dettagli
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riepilogo {fiscalYear}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="font-medium">Totale Ricevute</div>
              <div>245</div>
            </div>
            <div className="flex items-center justify-between py-2 border-t">
              <div className="font-medium">Media Mensile</div>
              <div>€ 1.270,00</div>
            </div>
            <div className="flex items-center justify-between py-2 border-t">
              <div className="font-medium">Totale Anno {fiscalYear}</div>
              <div className="text-xl font-bold">€ 15.245,00</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
