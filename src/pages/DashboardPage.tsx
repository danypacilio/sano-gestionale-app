
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Calendar, ArrowUpRight, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Benvenuto nel gestionale per le ricevute sanitarie.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ricevute Totali</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% rispetto all'anno scorso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pazienti</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">118</div>
            <p className="text-xs text-muted-foreground">+4% rispetto all'anno scorso</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ricevute da Inviare</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Azioni richieste</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corrispettivi Mensili</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€ 15,245</div>
            <p className="text-xs text-muted-foreground">Anno in corso</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recenti">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="recenti">Ricevute Recenti</TabsTrigger>
            <TabsTrigger value="da-inviare">Da Inviare</TabsTrigger>
          </TabsList>
          <div className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary">
            <span>Visualizza tutte</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
        <TabsContent value="recenti" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium">Data</th>
                      <th className="py-3 px-4 text-left font-medium">N. Ricevuta</th>
                      <th className="py-3 px-4 text-left font-medium">Paziente</th>
                      <th className="py-3 px-4 text-left font-medium">Importo</th>
                      <th className="py-3 px-4 text-left font-medium">Stato</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">10/05/2025</td>
                      <td className="py-3 px-4">PAC-2025-124</td>
                      <td className="py-3 px-4">Mario Rossi</td>
                      <td className="py-3 px-4">€ 80,00</td>
                      <td className="py-3 px-4">
                        <span className="status-badge sent">Inviata</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">09/05/2025</td>
                      <td className="py-3 px-4">PAC-2025-123</td>
                      <td className="py-3 px-4">Giulia Bianchi</td>
                      <td className="py-3 px-4">€ 120,00</td>
                      <td className="py-3 px-4">
                        <span className="status-badge sent">Inviata</span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">08/05/2025</td>
                      <td className="py-3 px-4">PAC-2025-122</td>
                      <td className="py-3 px-4">Luca Verdi</td>
                      <td className="py-3 px-4">€ 95,00</td>
                      <td className="py-3 px-4">
                        <span className="status-badge pending">Da inviare</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-4">07/05/2025</td>
                      <td className="py-3 px-4">PAC-2025-121</td>
                      <td className="py-3 px-4">Anna Neri</td>
                      <td className="py-3 px-4">€ 150,00</td>
                      <td className="py-3 px-4">
                        <span className="status-badge sent">Inviata</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="da-inviare" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Data</th>
                    <th className="py-3 px-4 text-left font-medium">N. Ricevuta</th>
                    <th className="py-3 px-4 text-left font-medium">Paziente</th>
                    <th className="py-3 px-4 text-left font-medium">Importo</th>
                    <th className="py-3 px-4 text-left font-medium">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">08/05/2025</td>
                    <td className="py-3 px-4">PAC-2025-122</td>
                    <td className="py-3 px-4">Luca Verdi</td>
                    <td className="py-3 px-4">€ 95,00</td>
                    <td className="py-3 px-4">
                      <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Invia a TS
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">05/05/2025</td>
                    <td className="py-3 px-4">PAC-2025-119</td>
                    <td className="py-3 px-4">Paolo Gialli</td>
                    <td className="py-3 px-4">€ 75,00</td>
                    <td className="py-3 px-4">
                      <button className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                        Invia a TS
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
