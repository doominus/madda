# Agenda Prenotazioni — pacchetto completo aggiornato

Questo zip contiene tutto quello che serve per aggiornare il sito
`agenda.anticamaddalena.it` in un colpo solo, con tutte le novita' fatte
finora: motore offline anti-perdita-dati, installazione come app da Safari
(iPad/iPhone), avviso di conflitto quando due dispositivi modificano la
stessa prenotazione, e la correzione del bug del tavolo occupato a mano
non rispettato in Disposizione.

## Cosa contiene

- `index.html` — il file principale del sito (va a sostituire quello che
  hai online adesso).
- `manifest.json`, `sw.js`, `icons/` — i file che servono per
  l'installazione come app da Safari su iPad/iPhone ("Aggiungi a Home").
  Se li avevi gia' caricati in precedenza puoi anche lasciarli cosi' come
  sono: non sono cambiati, solo `index.html` e' stato aggiornato.

## Come pubblicarlo

Carica tutto il contenuto di questa cartella nel repository GitHub dove
tieni il sito, nella stessa posizione di sempre: `index.html` sostituisce
quello attuale, gli altri file (`manifest.json`, `sw.js`, `icons/`) vanno
accanto ad esso. Aspetta 1-2 minuti che GitHub Pages aggiorni il sito.

## E per l'app Android?

Non serve ricompilare "tutto da zero" nel senso di rifare la procedura
vista insieme: il progetto e i file di configurazione (`package.json`,
`capacitor.config.json`, il flusso `.github/workflows/build-android.yml`)
restano identici e non li devi ritoccare. Basta:

1. Nel repository `android-agenda` (quello dell'app Android), sostituisci
   solo il file `www/index.html` con questo nuovo `index.html`.
2. Il caricamento stesso fa ripartire in automatico la compilazione su
   GitHub Actions (la stessa che hai gia' visto funzionare), che prepara
   un APK nuovo con dentro tutte le ultime novita'.
3. Scarica il nuovo APK da "Artifacts" come le altre volte e installalo sul
   tablet: puoi installarlo sopra quello vecchio senza disinstallare prima,
   aggiorna semplicemente l'app esistente.

In pratica: stesso identico procedimento gia' fatto insieme, solo con
questo file al posto di quello di prima. Non serve rifare nessuna delle
configurazioni (token, Java, Android SDK...): quelle restano valide.
