
import * as LiteDB from 'litedb.js';

export interface Paziente {
  id?: string;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  luogoNascita?: string;
  dataNascita?: string;
  telefono?: string;
  email?: string;
  indirizzo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class PazientiService {
  private db: LiteDB.Database;
  private collection: LiteDB.Collection<Paziente>;

  constructor() {
    this.db = new LiteDB.Database('gestionale-sanitario.db');
    this.collection = this.db.getCollection<Paziente>('pazienti');
    
    // Crea indici per migliorare le prestazioni delle query
    this.collection.ensureIndex('codiceFiscale');
    this.collection.ensureIndex('cognome');
  }

  async getAll(): Promise<Paziente[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error('Errore durante il recupero dei pazienti:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Paziente | null> {
    try {
      return await this.collection.findOne({ id });
    } catch (error) {
      console.error(`Errore durante il recupero del paziente con ID ${id}:`, error);
      return null;
    }
  }

  async create(paziente: Paziente): Promise<Paziente> {
    try {
      // Genera un ID unico se non è presente
      if (!paziente.id) {
        paziente.id = crypto.randomUUID();
      }
      
      // Aggiungi timestamp
      paziente.createdAt = new Date();
      paziente.updatedAt = new Date();
      
      await this.collection.insert(paziente);
      return paziente;
    } catch (error) {
      console.error('Errore durante la creazione del paziente:', error);
      throw error;
    }
  }

  async update(id: string, paziente: Partial<Paziente>): Promise<Paziente | null> {
    try {
      const existingPaziente = await this.getById(id);
      
      if (!existingPaziente) {
        return null;
      }
      
      // Aggiorna il timestamp
      paziente.updatedAt = new Date();
      
      const updatedPaziente = { ...existingPaziente, ...paziente };
      await this.collection.update({ id }, updatedPaziente);
      
      return updatedPaziente;
    } catch (error) {
      console.error(`Errore durante l'aggiornamento del paziente con ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.collection.remove({ id });
      return result;
    } catch (error) {
      console.error(`Errore durante l'eliminazione del paziente con ID ${id}:`, error);
      return false;
    }
  }

  async searchPazienti(query: string): Promise<Paziente[]> {
    try {
      if (!query || query.trim() === '') {
        return this.getAll();
      }
      
      const lowercaseQuery = query.toLowerCase();
      
      // Recupera tutti i pazienti e filtra lato client
      // In una soluzione più scalabile, questa logica sarebbe sul server
      const allPazienti = await this.getAll();
      
      return allPazienti.filter(paziente => 
        paziente.nome.toLowerCase().includes(lowercaseQuery) ||
        paziente.cognome.toLowerCase().includes(lowercaseQuery) ||
        paziente.codiceFiscale.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Errore durante la ricerca dei pazienti:', error);
      return [];
    }
  }
}

export const pazientiService = new PazientiService();
