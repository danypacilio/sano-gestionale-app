
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function PazientiPage() {
  const [activeTab, setActiveTab] = useState("lista");

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Pazienti</h1>
        <p className="text-muted-foreground">
          Gestisci e visualizza tutti i tuoi pazienti.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="lista">Lista Pazienti</TabsTrigger>
          <TabsTrigger value="nuovo">Nuovo Paziente</TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista Pazienti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3 justify-between">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cerca paziente..."
                      className="w-full md:w-[250px] pl-8"
                    />
                  </div>
                  <div>
                    <Button className="gap-1" onClick={() => setActiveTab("nuovo")}>
                      <Plus className="h-4 w-4" />
                      <span>Nuovo Paziente</span>
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cognome</TableHead>
                        <TableHead>Codice Fiscale</TableHead>
                        <TableHead>Telefono</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ricevute</TableHead>
                        <TableHead className="w-[100px]">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <TableRow key={i}>
                          <TableCell>{i % 2 === 0 ? "Mario" : "Giulia"}</TableCell>
                          <TableCell>{i % 2 === 0 ? "Rossi" : "Bianchi"}</TableCell>
                          <TableCell>
                            {i % 2 === 0 ? "RSSMRA80A01H501U" : "BNCGLI75B45H501T"}
                          </TableCell>
                          <TableCell>34{i}1234567</TableCell>
                          <TableCell>{i % 2 === 0 ? "mario.rossi@example.com" : "giulia.bianchi@example.com"}</TableCell>
                          <TableCell>{i + 3}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Visualizza</DropdownMenuItem>
                                <DropdownMenuItem>Nuova Ricevuta</DropdownMenuItem>
                                <DropdownMenuItem>Modifica</DropdownMenuItem>
                                <DropdownMenuItem>Elimina</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Mostrando 5 di 25 pazienti
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Precedente
                    </Button>
                    <Button variant="outline" size="sm">
                      Successiva
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nuovo">
          <Card>
            <CardHeader>
              <CardTitle>Nuovo Paziente</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="text-sm font-medium">
                      Nome
                    </label>
                    <Input id="nome" placeholder="Nome" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cognome" className="text-sm font-medium">
                      Cognome
                    </label>
                    <Input id="cognome" placeholder="Cognome" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="luogo-nascita" className="text-sm font-medium">
                      Luogo di Nascita
                    </label>
                    <Input id="luogo-nascita" placeholder="Luogo di Nascita" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="data-nascita" className="text-sm font-medium">
                      Data di Nascita
                    </label>
                    <Input id="data-nascita" placeholder="GG/MM/AAAA" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="codice-fiscale" className="text-sm font-medium">
                      Codice Fiscale
                    </label>
                    <div className="flex items-center gap-2">
                      <Input id="codice-fiscale" placeholder="Codice Fiscale" />
                      <Button variant="outline">Calcola</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="text-sm font-medium">
                      Telefono
                    </label>
                    <Input id="telefono" placeholder="Telefono" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Email" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="indirizzo" className="text-sm font-medium">
                      Indirizzo
                    </label>
                    <Input id="indirizzo" placeholder="Indirizzo" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("lista")}>
                    Annulla
                  </Button>
                  <Button type="submit">Salva Paziente</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
