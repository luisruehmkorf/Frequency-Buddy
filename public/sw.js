// Service Worker: Cache der App-Dateien, Start ohne Netz.
// Bei einer neuen Version die Zahl erhöhen. Daten in IndexedDB bleiben davon unberührt.
const CACHE = 'fb-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const base = self.registration.scope;
      let files = [];
      try {
        const res = await fetch(new URL('precache.json', base), { cache: 'no-store' });
        files = await res.json();
      } catch (e) {
        // Entwicklungsmodus: keine Liste vorhanden
      }
      const urls = ['./', 'manifest.webmanifest', ...files].map((f) => new URL(f, base).href);
      await cache.addAll(urls);
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    (async () => {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      try {
        const res = await fetch(req);
        if (res.ok) (await caches.open(CACHE)).put(req, res.clone());
        return res;
      } catch (e) {
        if (req.mode === 'navigate') {
          const shell = await caches.match(new URL('./', self.registration.scope).href);
          if (shell) return shell;
        }
        throw e;
      }
    })()
  );
});
