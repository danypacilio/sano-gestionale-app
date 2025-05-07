
import React from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Copy, MoreVertical, Search, Plus, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function RicevutePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Ricevute</h1>
        <p className="text-muted-foreground">
          Gestisci e visualizza tutte le ricevute emesse.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <span>Lista Ricevute</span>
            <a 
              href="https://sistemats4.sanita.finanze.it/simossHome/login.jsp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-normal text-primary hover:underline"
            >
              <span>Sistema Tessera Sanitaria</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3 justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cerca ricevuta..."
                    className="w-full md:w-[250px] pl-8"
                  />
                </div>
                <div>
                  <Button variant="secondary" className="space-x-2">
                    <span>Invia Tutte</span>
                  </Button>
                </div>
              </div>
              <div>
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  <span>Nuova Ricevuta</span>
                </Button>
              </div>
            </div>
            <Separator />
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>N. Ricevuta</TableHead>
                    <TableHead>Codice Fiscale</TableHead>
                    <TableHead>Paziente</TableHead>
                    <TableHead>Importo</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead className="w-[100px]">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i} className="hoverable-row">
                      <TableCell>
                        {`${10 - i}/05/2025`}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Button variant="link" className="p-0 h-auto text-primary font-medium" asChild>
                          <span className="flex items-center">
                            <FileText className="mr-1 h-4 w-4" />
                            PAC-2025-12{i}
                          </span>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>RSSMRA80A01H501U</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 show-on-hover">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>Mario Rossi</TableCell>
                      <TableCell>€ {70 + i * 10},00</TableCell>
                      <TableCell>
                        {i % 2 === 0 ? "Contanti" : "POS"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={i % 3 === 0 ? "bg-red-100 text-red-800 border-red-200" : "bg-green-100 text-green-800 border-green-200"}>
                          {i % 3 === 0 ? "Da inviare" : "Inviata"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Visualizza PDF</DropdownMenuItem>
                            <DropdownMenuItem>Modifica</DropdownMenuItem>
                            <DropdownMenuItem>Invia a TS</DropdownMenuItem>
                            <DropdownMenuItem>WhatsApp</DropdownMenuItem>
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
                Mostrando 5 di 50 ricevute
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
    </div>
  );
}
