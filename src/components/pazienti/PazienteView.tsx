
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Paziente } from "@/services/PazientiService";

interface PazienteViewProps {
  paziente: Paziente | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PazienteView: React.FC<PazienteViewProps> = ({
  paziente,
  isOpen,
  onClose,
}) => {
  if (!paziente) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {paziente.nome} {paziente.cognome}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Dettagli completi del paziente
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nome</p>
              <p>{paziente.nome}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cognome</p>
              <p>{paziente.cognome}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Codice Fiscale</p>
              <p>{paziente.codiceFiscale}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data di Nascita</p>
              <p>{paziente.dataNascita || "Non specificato"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Luogo di Nascita</p>
              <p>{paziente.luogoNascita || "Non specificato"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefono</p>
              <p>{paziente.telefono || "Non specificato"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{paziente.email || "Non specificato"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Indirizzo</p>
              <p>{paziente.indirizzo || "Non specificato"}</p>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction>Chiudi</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
