/* Kopi Catat service worker
   - App shell di-cache supaya aplikasi terbuka walau offline.
   - Permintaan ke database cloud (domain lain / /rest/v1/) TIDAK pernah di-cache atau dicegat;
     sinkron offline sudah ditangani aplikasi lewat antrean lokal.
   Naikkan VERSION setiap kali file aplikasi berubah agar cache lama terganti. */
const VERSION = 'v2';
const SHELL = 'kopicatat-shell-' + VERSION;
const FONTS = 'kopicatat-fonts-' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [SHELL, FONTS];
    for (const k of await caches.keys()) if (k.startsWith('kopicatat-') && !keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Font Google: cache dulu, perbarui di belakang layar
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith((async () => {
      const cache = await caches.open(FONTS);
      const hit = await cache.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') cache.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })());
    return;
  }

  // Selain file aplikasi sendiri (mis. Supabase), biarkan lewat apa adanya
  if (url.origin !== location.origin) return;

  // Halaman: jaringan dulu supaya update langsung terlihat, cadangan dari cache saat offline
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const cache = await caches.open(SHELL);
        cache.put('./index.html', r.clone());
        return r;
      } catch (err) {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  // Aset statis: cache dulu, perbarui di belakang layar
  e.respondWith((async () => {
    const cache = await caches.open(SHELL);
    const hit = await cache.match(req);
    const net = fetch(req).then(r => { if (r.ok) cache.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  })());
});
