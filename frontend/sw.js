// StudyPulse Service Worker (PWA Caching & Instant Launch - Cross-Platform)
const CACHE_NAME = 'studypulse-v2.1';
const STATIC_ASSETS = [
  './',
  'index.html',
  'admin.html',
  'styles.css',
  'js/api.js',
  'js/app.js',
  'js/admin.js',
  'js/live_studio.js',
  'js/qrcode.min.js',
  'manifest.json',
  'icons/icon.svg',
  'icons/icon-192.svg',
  'icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Resilient cache population: never fail install if any individual asset is unavailable
      for (const asset of STATIC_ASSETS) {
        try {
          const res = await fetch(asset, { cache: 'no-cache' });
          if (res && res.ok) {
            await cache.put(asset, res);
          }
        } catch (e) {
          // Gracefully continue
        }
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip dynamic API routes and external services
  if (url.pathname.startsWith('/api/') || !url.protocol.startsWith('http')) {
    return;
  }

  // Network-first with cache fallback
  // Guarantees iPhone / Safari gets newest deployed version when online, with instant offline fallback
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return (await caches.match('./index.html')) || (await caches.match('index.html')) || (await caches.match('./'));
        }
      })
  );
});
