
import { useState, useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { pazientiService, Paziente } from "@/services/PazientiService";

export function usePazienti() {
  const [pazienti, setPazienti] = useState<Paziente[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingPaziente, setEditingPaziente] = useState<Paziente | null>(null);
  const [viewingPaziente, setViewingPaziente] = useState<Paziente | null>(null);
  const { toast } = useToast();

  const loadPazienti = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await pazientiService.searchPazienti(searchQuery);
      setPazienti(data);
    } catch (error) {
      console.error("Errore durante il caricamento dei pazienti:", error);
      toast({
        title: "Errore",
        description: "Impossibile caricare la lista dei pazienti",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, toast]);

  useEffect(() => {
    loadPazienti();
  }, [loadPazienti]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleDelete = async (id: string) => {
    try {
      await pazientiService.delete(id);
      toast({
        title: "Paziente eliminato",
        description: "Il paziente è stato eliminato con successo",
      });
      loadPazienti();
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Errore durante l'eliminazione del paziente:", error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare il paziente",
        variant: "destructive",
      });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copiato!",
          description: "Testo copiato negli appunti",
        });
      },
      (err) => {
        console.error("Impossibile copiare il testo:", err);
      }
    );
  };

  return {
    pazienti,
    isLoading,
    searchQuery,
    confirmDeleteId,
    editingPaziente,
    viewingPaziente,
    handleSearch,
    handleDelete,
    handleCopy,
    setConfirmDeleteId,
    setEditingPaziente,
    setViewingPaziente,
    loadPazienti,
  };
}
