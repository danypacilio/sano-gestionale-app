
import React from "react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Clipboard, Edit, Eye, MoreVertical, Plus, 
  Search, Trash2 
} from "lucide-react";
import { Paziente } from "@/services/PazientiService";

interface PazientiTableProps {
  pazienti: Paziente[];
  isLoading: boolean;
  searchQuery: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddNew: () => void;
  onEdit: (paziente: Paziente) => void;
  onView: (paziente: Paziente) => void;
  onDelete: (id: string | undefined) => void;
  onCopy: (text: string) => void;
}

export const PazientiTable: React.FC<PazientiTableProps> = ({
  pazienti,
  isLoading,
  searchQuery,
  onSearch,
  onAddNew,
  onEdit,
  onView,
  onDelete,
  onCopy,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca paziente..."
            className="w-full md:w-[250px] pl-8"
            value={searchQuery}
            onChange={onSearch}
          />
        </div>
        <div>
          <Button className="gap-1" onClick={onAddNew}>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Caricamento in corso...
                </TableCell>
              </TableRow>
            ) : pazienti.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Nessun paziente trovato
                </TableCell>
              </TableRow>
            ) : (
              pazienti.map((paziente) => (
                <TableRow key={paziente.id}>
                  <TableCell>{paziente.nome}</TableCell>
                  <TableCell>{paziente.cognome}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    {paziente.codiceFiscale}
                    <Button variant="ghost" size="icon" onClick={() => onCopy(paziente.codiceFiscale)}>
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>{paziente.telefono}</TableCell>
                  <TableCell>{paziente.email}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(paziente)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Visualizza
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(paziente)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifica
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(paziente.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Elimina
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando {pazienti.length} di {pazienti.length} pazienti
        </div>
      </div>
    </div>
  );
};
