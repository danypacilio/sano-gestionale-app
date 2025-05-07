
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Download } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ImpostazioniPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground">
          Gestisci le impostazioni della tua applicazione.
        </p>
      </div>

      <Tabs defaultValue="generali">
        <TabsList>
          <TabsTrigger value="generali">Generali</TabsTrigger>
          <TabsTrigger value="ricevute">Ricevute</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        <TabsContent value="generali" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Professionista</CardTitle>
              <CardDescription>
                Queste informazioni verranno utilizzate nelle ricevute generate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-professionista">Nome e Cognome</Label>
                  <Input
                    id="nome-professionista"
                    placeholder="Nome e Cognome"
                    defaultValue="Dr. Mario Rossi"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="professione">Professione</Label>
                  <Input
                    id="professione"
                    placeholder="Professione"
                    defaultValue="Psicologo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partita-iva">Partita IVA</Label>
                  <Input
                    id="partita-iva"
                    placeholder="Partita IVA"
                    defaultValue="12345678901"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codice-fiscale">Codice Fiscale</Label>
                  <Input
                    id="codice-fiscale"
                    placeholder="Codice Fiscale"
                    defaultValue="RSSMRA80A01H501U"
                  />
                </div>
                <div className="space-y-2 col-span-full">
                  <Label htmlFor="indirizzo">Indirizzo Studio</Label>
                  <Input
                    id="indirizzo"
                    placeholder="Indirizzo Studio"
                    defaultValue="Via Roma 123, 00123 Roma"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salva Modifiche</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ricevute" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formato Ricevute</CardTitle>
              <CardDescription>
                Configura il formato e la numerazione delle ricevute.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="prefisso">Prefisso Ricevuta</Label>
                <div className="flex gap-2">
                  <Input
                    id="prefisso"
                    placeholder="Prefisso"
                    className="max-w-[150px]"
                    defaultValue="PAC"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">
                    Es. PAC-2025-001
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ultimo-numero">Ultimo Numero Ricevuta</Label>
                <div className="flex gap-2">
                  <Input
                    id="ultimo-numero"
                    type="number"
                    className="max-w-[150px]"
                    defaultValue="124"
                  />
                  <span className="flex items-center text-sm text-muted-foreground">
                    Il prossimo numero sarà 125
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="reset-anno" />
                <Label htmlFor="reset-anno">Reset numerazione a inizio anno</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Salva Modifiche</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Database</CardTitle>
              <CardDescription>
                Configura e gestisci i backup del database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Frequenza Backup Automatico</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona frequenza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Giornaliero</SelectItem>
                    <SelectItem value="weekly">Settimanale</SelectItem>
                    <SelectItem value="monthly">Mensile</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Ultimo Backup</h4>
                    <p className="text-sm text-muted-foreground">10/05/2025 08:30</p>
                  </div>
                  <Button variant="outline" className="gap-1">
                    <Download className="h-4 w-4" />
                    <span>Scarica</span>
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="default">Backup Manuale</Button>
                <div className="text-sm text-muted-foreground">
                  5 backup salvati
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
