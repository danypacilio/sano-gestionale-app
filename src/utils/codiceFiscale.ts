
export function calcolaCodiceFiscale(
  nome: string,
  cognome: string,
  dataNascita: string,
  luogoNascita: string,
  sesso: string
): string {
  // Questa è una versione semplificata che illustra la logica,
  // ma non implementa l'intero algoritmo italiano
  // Per una versione completa, sarebbe necessario utilizzare
  // tabelle di codici catastali e altri calcoli più complessi
  
  // Estrai le prime 3 consonanti del cognome
  const cognomeCodice = estraiConsonanti(cognome.toUpperCase(), 3);
  
  // Estrai le prime 3 consonanti del nome
  const nomeCodice = estraiConsonanti(nome.toUpperCase(), 3);
  
  // Estrai anno, mese e giorno dalla data di nascita
  const [giorno, mese, anno] = dataNascita.split('/');
  const annoCodice = anno.substring(2);
  const meseCodice = codiceMese(parseInt(mese));
  
  // Modifica il giorno in base al sesso
  const giornoCodice = sesso.toUpperCase() === 'M' 
    ? giorno.padStart(2, '0') 
    : (parseInt(giorno) + 40).toString();
  
  // Semplificazione per il comune di nascita (in realtà dovrebbe essere un codice catastale)
  const comuneCodice = luogoNascita.substring(0, 4).toUpperCase();
  
  // Carattere di controllo (semplificato)
  const codice = `${cognomeCodice}${nomeCodice}${annoCodice}${meseCodice}${giornoCodice}${comuneCodice}`;
  const carattereControllo = 'X'; // Semplificato per scopi dimostrativi
  
  return codice + carattereControllo;
}

function estraiConsonanti(testo: string, numero: number): string {
  const consonanti = testo.replace(/[AEIOU\s]/g, '');
  const vocali = testo.replace(/[^AEIOU]/g, '');
  
  let risultato = consonanti + vocali;
  risultato = risultato.replace(/\s/g, '');
  
  return risultato.substring(0, numero).padEnd(numero, 'X');
}

function codiceMese(mese: number): string {
  const codici = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
  return codici[mese - 1] || 'A';
}
