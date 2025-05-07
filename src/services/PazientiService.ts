
// Since there's an issue with importing litedb.js, we need to modify the PazientiService
// to use localStorage for now, until the correct database dependency is available.

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
  private storageKey = 'pazienti-data';
  
  constructor() {
    // Initialize localStorage if needed
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private getAllFromStorage(): Paziente[] {
    const data = localStorage.getItem(this.storageKey) || '[]';
    return JSON.parse(data);
  }

  private saveToStorage(pazienti: Paziente[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(pazienti));
  }

  async getAll(): Promise<Paziente[]> {
    try {
      return this.getAllFromStorage();
    } catch (error) {
      console.error('Errore durante il recupero dei pazienti:', error);
      return [];
    }
  }

  async getById(id: string): Promise<Paziente | null> {
    try {
      const pazienti = this.getAllFromStorage();
      return pazienti.find(p => p.id === id) || null;
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
      
      const pazienti = this.getAllFromStorage();
      pazienti.push(paziente);
      this.saveToStorage(pazienti);
      
      return paziente;
    } catch (error) {
      console.error('Errore durante la creazione del paziente:', error);
      throw error;
    }
  }

  async update(id: string, paziente: Partial<Paziente>): Promise<Paziente | null> {
    try {
      const pazienti = this.getAllFromStorage();
      const index = pazienti.findIndex(p => p.id === id);
      
      if (index === -1) {
        return null;
      }
      
      // Aggiorna il timestamp
      paziente.updatedAt = new Date();
      
      const updatedPaziente = { ...pazienti[index], ...paziente };
      pazienti[index] = updatedPaziente;
      this.saveToStorage(pazienti);
      
      return updatedPaziente;
    } catch (error) {
      console.error(`Errore durante l'aggiornamento del paziente con ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const pazienti = this.getAllFromStorage();
      const filteredPazienti = pazienti.filter(p => p.id !== id);
      
      if (filteredPazienti.length === pazienti.length) {
        // No patient was removed
        return false;
      }
      
      this.saveToStorage(filteredPazienti);
      return true;
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
      const pazienti = this.getAllFromStorage();
      
      return pazienti.filter(paziente => 
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
