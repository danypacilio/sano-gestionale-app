
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pazientiService } from "@/services/PazientiService";
import { PazienteForm, PazienteFormValues } from "@/components/pazienti/PazienteForm";
import { PazientiTable } from "@/components/pazienti/PazientiTable";
import { PazienteView } from "@/components/pazienti/PazienteView";
import { DeleteConfirmDialog } from "@/components/pazienti/DeleteConfirmDialog";
import { usePazienti } from "@/hooks/usePazienti";
import { useToast } from "@/hooks/use-toast";

export default function PazientiPage() {
  const [activeTab, setActiveTab] = useState("lista");
  const { toast } = useToast();
  
  const {
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
  } = usePazienti();

  const handleNewPatient = () => {
    setEditingPaziente(null);
    setActiveTab("nuovo");
  };

  const handleEdit = (paziente: typeof pazienti[0]) => {
    setEditingPaziente(paziente);
    setActiveTab("nuovo");
  };

  const handleCancella = () => {
    setEditingPaziente(null);
    setActiveTab("lista");
  };

  const onSubmit = async (values: PazienteFormValues) => {
    try {
      if (editingPaziente) {
        await pazientiService.update(editingPaziente.id!, values);
        toast({
          title: "Paziente aggiornato",
          description: `${values.nome} ${values.cognome} è stato aggiornato con successo`,
        });
      } else {
        await pazientiService.create(values);
        toast({
          title: "Paziente creato",
          description: `${values.nome} ${values.cognome} è stato aggiunto con successo`,
        });
      }
      
      setEditingPaziente(null);
      setActiveTab("lista");
      loadPazienti();
    } catch (error) {
      console.error("Errore durante il salvataggio del paziente:", error);
      toast({
        title: "Errore",
        description: "Impossibile salvare il paziente",
        variant: "destructive",
      });
    }
  };

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
          <TabsTrigger value="nuovo">
            {editingPaziente ? "Modifica Paziente" : "Nuovo Paziente"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista Pazienti</CardTitle>
            </CardHeader>
            <CardContent>
              <PazientiTable 
                pazienti={pazienti}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onAddNew={handleNewPatient}
                onEdit={handleEdit}
                onView={setViewingPaziente}
                onDelete={setConfirmDeleteId}
                onCopy={handleCopy}
              />
            </CardContent>
          </Card>

          <PazienteView 
            paziente={viewingPaziente} 
            isOpen={!!viewingPaziente} 
            onClose={() => setViewingPaziente(null)} 
          />

          <DeleteConfirmDialog 
            isOpen={!!confirmDeleteId}
            onClose={() => setConfirmDeleteId(null)}
            onConfirm={() => confirmDeleteId && handleDelete(confirmDeleteId)}
          />
        </TabsContent>

        <TabsContent value="nuovo">
          <Card>
            <CardHeader>
              <CardTitle>{editingPaziente ? "Modifica Paziente" : "Nuovo Paziente"}</CardTitle>
            </CardHeader>
            <CardContent>
              <PazienteForm 
                paziente={editingPaziente}
                onSubmit={onSubmit}
                onCancel={handleCancella}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
