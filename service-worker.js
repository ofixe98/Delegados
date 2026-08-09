const CACHE = 'delegado-afl-v10-9-offline';
const APP = [
  './',
  './index.html',
  './manifest.webmanifest'
];
const DOCS = [
  './docs/RPO-26-27-FUTEBOL-11-SENIORES_v11.pdf',
  './docs/AGE-20260627-AVISO-CONVOCATORIO-SIGNED-VF-ERRATA.pdf',
  './docs/CO-001-26-27-COMUNICADO-OFICIAL-1.pdf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP.concat(DOCS)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
