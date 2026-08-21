// Service Worker per Agenda Prenotazioni.
// Serve solo a far caricare la PAGINA stessa (l'app shell) anche a
// connessione zero: apre l'app, mostra l'interfaccia, e da li' in poi
// e' il motore offline gia' presente nella pagina (IndexedDB + coda di
// sincronizzazione) a occuparsi dei dati delle prenotazioni.
//
// Cambiare CACHE_VERSION forza tutti i dispositivi a scaricare una copia
// fresca della pagina alla prossima apertura online (utile quando pubblico
// un aggiornamento dell'app).
const CACHE_VERSION = "agenda-shell-v1";

const SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Strategia "network first, cache di riserva": se c'e' connessione prende
// sempre la versione piu' recente della pagina (e aggiorna la cache); se la
// rete non risponde, serve l'ultima copia salvata cosi' l'app si apre
// comunque. I dati veri (prenotazioni, note...) restano gestiti dal motore
// offline dentro la pagina stessa, non da questo file.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Le chiamate verso Supabase (dati) non devono mai passare da qui: le
  // gestisce gia' l'app con la sua coda offline dedicata.
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, resClone));
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
