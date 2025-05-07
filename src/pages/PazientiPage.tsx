
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Search, Plus, MoreVertical, Eye, Edit, Trash2, Calculator, Clipboard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { pazientiService, Paziente } from "@/services/PazientiService";
import { calcolaCodiceFiscale } from "@/utils/codiceFiscale";

const formSchema = z.object({
  nome: z.string().min(1, { message: "Il nome è obbligatorio" }),
  cognome: z.string().min(1, { message: "Il cognome è obbligatorio" }),
  luogoNascita: z.string().optional(),
  dataNascita: z.string().optional(),
  codiceFiscale: z.string().min(16, { message: "Il codice fiscale deve essere di 16 caratteri" }).optional(),
  telefono: z.string().optional(),
  email: z.string().email({ message: "Formato email non valido" }).optional().or(z.string().length(0)),
  indirizzo: z.string().optional(),
  sesso: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PazientiPage() {
  const [activeTab, setActiveTab] = useState("lista");
  const [pazienti, setPazienti] = useState<Paziente[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingPaziente, setEditingPaziente] = useState<Paziente | null>(null);
  const [viewingPaziente, setViewingPaziente] = useState<Paziente | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      luogoNascita: "",
      dataNascita: "",
      codiceFiscale: "",
      telefono: "",
      email: "",
      indirizzo: "",
      sesso: "M",
    },
  });

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

  const onSubmit = async (values: FormValues) => {
    try {
      if (editingPaziente) {
        await pazientiService.update(editingPaziente.id!, values as Paziente);
        toast({
          title: "Paziente aggiornato",
          description: `${values.nome} ${values.cognome} è stato aggiornato con successo`,
        });
      } else {
        await pazientiService.create(values as Paziente);
        toast({
          title: "Paziente creato",
          description: `${values.nome} ${values.cognome} è stato aggiunto con successo`,
        });
      }
      
      form.reset();
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

  const handleEdit = (paziente: Paziente) => {
    setEditingPaziente(paziente);
    form.reset({
      nome: paziente.nome || "",
      cognome: paziente.cognome || "",
      luogoNascita: paziente.luogoNascita || "",
      dataNascita: paziente.dataNascita || "",
      codiceFiscale: paziente.codiceFiscale || "",
      telefono: paziente.telefono || "",
      email: paziente.email || "",
      indirizzo: paziente.indirizzo || "",
      sesso: "M", // Valore predefinito, andrebbe recuperato se presente
    });
    setActiveTab("nuovo");
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

  const handleView = (paziente: Paziente) => {
    setViewingPaziente(paziente);
  };

  const handleCalcolaCodiceFiscale = () => {
    const nome = form.getValues("nome");
    const cognome = form.getValues("cognome");
    const dataNascita = form.getValues("dataNascita");
    const luogoNascita = form.getValues("luogoNascita");
    const sesso = form.getValues("sesso") || "M";
    
    if (!nome || !cognome || !dataNascita || !luogoNascita) {
      toast({
        title: "Dati mancanti",
        description: "Inserisci nome, cognome, data e luogo di nascita per calcolare il codice fiscale",
        variant: "destructive",
      });
      return;
    }
    
    const cf = calcolaCodiceFiscale(nome, cognome, dataNascita, luogoNascita, sesso);
    form.setValue("codiceFiscale", cf);
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

  const handleNewPatient = () => {
    setEditingPaziente(null);
    form.reset();
    setActiveTab("nuovo");
  };

  const handleCancella = () => {
    form.reset();
    setEditingPaziente(null);
    setActiveTab("lista");
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
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-3 justify-between">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cerca paziente..."
                      className="w-full md:w-[250px] pl-8"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <div>
                    <Button className="gap-1" onClick={handleNewPatient}>
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
                              <Button variant="ghost" size="icon" onClick={() => handleCopy(paziente.codiceFiscale)}>
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
                                  <DropdownMenuItem onClick={() => handleView(paziente)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Visualizza
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEdit(paziente)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Modifica
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => setConfirmDeleteId(paziente.id)}>
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
                  {/* Paginazione */}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dialog per visualizzare un paziente */}
          <AlertDialog open={!!viewingPaziente} onOpenChange={() => setViewingPaziente(null)}>
            <AlertDialogContent className="max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {viewingPaziente?.nome} {viewingPaziente?.cognome}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Dettagli completi del paziente
                </AlertDialogDescription>
              </AlertDialogHeader>
              {viewingPaziente && (
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nome</p>
                      <p>{viewingPaziente.nome}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cognome</p>
                      <p>{viewingPaziente.cognome}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Codice Fiscale</p>
                      <p>{viewingPaziente.codiceFiscale}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data di Nascita</p>
                      <p>{viewingPaziente.dataNascita || "Non specificato"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Luogo di Nascita</p>
                      <p>{viewingPaziente.luogoNascita || "Non specificato"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Telefono</p>
                      <p>{viewingPaziente.telefono || "Non specificato"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p>{viewingPaziente.email || "Non specificato"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">Indirizzo</p>
                      <p>{viewingPaziente.indirizzo || "Non specificato"}</p>
                    </div>
                  </div>
                </div>
              )}
              <AlertDialogFooter>
                <AlertDialogAction>Chiudi</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Dialog per confermare eliminazione */}
          <AlertDialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Questa azione non può essere annullata. Il paziente e tutti i suoi dati saranno eliminati permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annulla</AlertDialogCancel>
                <AlertDialogAction onClick={() => confirmDeleteId && handleDelete(confirmDeleteId)}>
                  Elimina
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        <TabsContent value="nuovo">
          <Card>
            <CardHeader>
              <CardTitle>{editingPaziente ? "Modifica Paziente" : "Nuovo Paziente"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cognome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cognome</FormLabel>
                          <FormControl>
                            <Input placeholder="Cognome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="luogoNascita"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Luogo di Nascita</FormLabel>
                          <FormControl>
                            <Input placeholder="Luogo di Nascita" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataNascita"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data di Nascita</FormLabel>
                          <FormControl>
                            <Input placeholder="GG/MM/AAAA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sesso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sesso</FormLabel>
                          <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value="M"
                                checked={field.value === "M"}
                                onChange={() => form.setValue("sesso", "M")}
                                className="h-4 w-4"
                              />
                              <span>Maschio</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                value="F"
                                checked={field.value === "F"}
                                onChange={() => form.setValue("sesso", "F")}
                                className="h-4 w-4"
                              />
                              <span>Femmina</span>
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="codiceFiscale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Codice Fiscale</FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input placeholder="Codice Fiscale" {...field} />
                            </FormControl>
                            <Button type="button" variant="outline" onClick={handleCalcolaCodiceFiscale}>
                              <Calculator className="h-4 w-4 mr-2" />
                              Calcola
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefono</FormLabel>
                          <FormControl>
                            <Input placeholder="Telefono" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="indirizzo"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Indirizzo</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Indirizzo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={handleCancella}>
                      Annulla
                    </Button>
                    <Button type="submit">
                      {editingPaziente ? "Aggiorna Paziente" : "Salva Paziente"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
