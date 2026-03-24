const CACHE_NAME = 'erdhwayanad-v2';
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
];

// Install event: cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Try to cache critical assets, but don't fail if unavailable
      return cache.addAll(CRITICAL_ASSETS).catch(() => {
        console.debug('Some critical assets could not be cached');
        return cache;
      });
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: intelligent caching strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  // API requests: network-first with cache fallback
  if (url.pathname.includes('/api/') || url.hostname.includes('supabase')) {
    return event.respondWith(
      fetch(event.request, { timeout: 15000 })
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            // Return offline response if no cache available
            return new Response(
              JSON.stringify({ error: 'Network unavailable' }),
              { status: 503, headers: { 'Content-Type': 'application/json' } }
            );
          });
        })
    );
  }

  // Static assets (JS, CSS, images): cache-first with network fallback
  if (
    url.pathname.includes('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.woff2')
  ) {
    return event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        
        return fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch(() => {
            // Fallback for images
            if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              return new Response('', { status: 404 });
            }
            return new Response('', { status: 503 });
          });
      })
    );
  }

  // HTML pages: network-first
  if (url.pathname.endsWith('.html') || url.pathname === '/') {
    return event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || new Response('Offline - please check your connection', {
              status: 503,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        })
    );
  }
});
