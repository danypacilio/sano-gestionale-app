
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Paziente } from "@/services/PazientiService";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

export type PazienteFormValues = z.infer<typeof formSchema>;

interface PazienteFormProps {
  paziente: Paziente | null;
  onSubmit: (values: PazienteFormValues) => Promise<void>;
  onCancel: () => void;
}

export const PazienteForm: React.FC<PazienteFormProps> = ({
  paziente,
  onSubmit,
  onCancel,
}) => {
  const { toast } = useToast();
  
  const form = useForm<PazienteFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: paziente?.nome || "",
      cognome: paziente?.cognome || "",
      luogoNascita: paziente?.luogoNascita || "",
      dataNascita: paziente?.dataNascita || "",
      codiceFiscale: paziente?.codiceFiscale || "",
      telefono: paziente?.telefono || "",
      email: paziente?.email || "",
      indirizzo: paziente?.indirizzo || "",
      sesso: "M",
    },
  });

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

  return (
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
          <Button variant="outline" type="button" onClick={onCancel}>
            Annulla
          </Button>
          <Button type="submit">
            {paziente ? "Aggiorna Paziente" : "Salva Paziente"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
